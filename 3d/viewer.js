// Edzésnapló 3D-nézegető: függőség nélküli, kis méretű (Canvas 2D + perspektíva).
// Bemenet: gyakorlat-adat (pózok, izomcsoportok); forgatható, animált.
const PARTS = {
  abs:    { hu: 'Has' },
  chest:  { hu: 'Mellkas' },
  back:   { hu: 'Hát' },
  glutes: { hu: 'Far' },
  quads:  { hu: 'Comb (elöl)' },
  hams:   { hu: 'Combhajlító' },
  calves: { hu: 'Vádli' },
  delts:  { hu: 'Váll' },
  arms:   { hu: 'Kar' },
  fore:   { hu: 'Alkar' },
};
export const MAIN = '#e8590c', SUPPORT = '#f2b134', BODY = '#7d8794', DARK = '#2b3138';

function shade(hex, k) { // k>0 világosít, k<0 sötétít
  const n = parseInt(hex.slice(1), 16);
  const f = c => Math.max(0, Math.min(255, Math.round(k > 0 ? c + (255 - c) * k : c * (1 + k))));
  return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, '0')).join('');
}
const lerp = (a, b, t) => a + (b - a) * t;
const ease = k => (k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

export function mount(host, data, opt = {}) {
  const dark = !!opt.dark;
  const cv = document.createElement('canvas');
  cv.style.cssText = 'width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab;border-radius:12px';
  host.appendChild(cv);
  const ctx = cv.getContext('2d');
  const Z = Object.assign({ sh: 9, hip: 6, hand: 9, foot: 7 }, data.zs || {});
  const frames = data.frames, n = frames.length;
  const roles = {};
  for (const m of data.muscles || []) for (const p of m.parts) roles[p] = Math.max(roles[p] || 0, m.role === 'main' ? 2 : 1);

  // világ-pozíció: x előre, y fel, z oldalra (N oldal +)
  const names = Object.keys(frames[0].J);
  function world(J) {
    const W = {};
    for (const k of names) {
      const [x, y] = J[k]; const f = k.endsWith('N') ? 1 : k.endsWith('F') ? -1 : 0;
      let z = 0;
      if (f) {
        if (/^(sh|el|wr)/.test(k)) z = Z.sh * f;
        else if (/^ha/.test(k)) z = Z.hand * f;
        else if (/^hip/.test(k)) z = Z.hip * f;
        else z = Z.foot * f;
      }
      W[k] = [x, -y, z];
    }
    return W;
  }
  const FW = frames.map(f => world(f.J));
  // időzítés: oda (d, h) és vissza, mint a 2D ábránál
  const seq = [];
  for (let i = 0; i < n - 1; i++) seq.push([i, i + 1, frames[i + 1].d ?? 900, frames[i + 1].h ?? 600]);
  if (n > 1) for (let i = n - 1; i > 0; i--) seq.push([i, i - 1, frames[i].d ?? 900, frames[0].h ?? 500]);
  const total = seq.reduce((a, s) => a + s[2] + s[3], 0) || 1;
  function at(ms) {
    if (n === 1) return { W: FW[0], k: 0 };
    let t = ms % total;
    for (const [a, b, dur, hold] of seq) {
      if (t < dur) { const e = ease(t / dur); const W = {}; for (const k of names) W[k] = [0, 1, 2].map(i => lerp(FW[a][k][i], FW[b][k][i], e)); return { W, k: e * (b > a ? 1 : -1) }; }
      t -= dur; if (t < hold) return { W: FW[b], k: 0 };
      t -= hold;
    }
    return { W: FW[0], k: 0 };
  }
  // középpont, méret
  let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
  for (const W of FW) for (const k of names) for (let i = 0; i < 3; i++) { mn[i] = Math.min(mn[i], W[k][i]); mx[i] = Math.max(mx[i], W[k][i]); }
  const C = [(mn[0] + mx[0]) / 2, (mn[1] + mx[1]) / 2, 0];
  const R = Math.max(30, Math.hypot(mx[0] - mn[0], mx[1] - mn[1]) / 2 + 12);
  const floorY = mn[1] - 3;

  const view = { yaw: data.cam && data.cam.yaw != null ? data.cam.yaw : 35, pitch: data.cam && data.cam.pitch != null ? data.cam.pitch : 14, auto: opt.auto !== false, zoom: 1 };
  const goal = { yaw: view.yaw, pitch: view.pitch };
  let W0 = 0, H0 = 0, dpr = 1, raf = 0, t0 = performance.now(), dead = false, dragging = false;

  function resize() {
    const r = cv.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1);
    W0 = Math.max(120, r.width); H0 = Math.max(120, r.height);
    cv.width = Math.round(W0 * dpr); cv.height = Math.round(H0 * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function project(p) {
    const th = view.yaw * Math.PI / 180, ph = view.pitch * Math.PI / 180;
    const x = p[0] - C[0], y = p[1] - C[1], z = p[2];
    const xr = x * Math.cos(th) - z * Math.sin(th);
    const d = -(x * Math.sin(th) + z * Math.cos(th));
    const yu = y * Math.cos(ph) + d * Math.sin(ph);
    const dp = d * Math.cos(ph) - y * Math.sin(ph);
    const F = 5 * R, s = F / (F + dp) * Math.min(W0, H0) / (1.75 * R) * view.zoom;
    return [W0 / 2 + xr * s, H0 / 2 - yu * s, dp, s];
  }

  function draw(now) {
    if (dead) return;
    if (!cv.isConnected) { dead = true; return; }
    if (cv.getClientRects().length === 0) { raf = requestAnimationFrame(draw); return; }
    if (cv.width === 0 || Math.abs(cv.getBoundingClientRect().width - W0) > 1) resize();
    if (!dragging) {
      if (view.auto) goal.yaw += 0.18;
      view.yaw += (goal.yaw - view.yaw) * (view.auto ? 1 : .12); view.pitch += (goal.pitch - view.pitch) * .12;
    }
    const { W, k } = at(now - t0), pulse = Math.max(0, Math.abs(k));
    ctx.clearRect(0, 0, W0, H0);
    // padló: rács + árnyék
    ctx.lineWidth = 1; ctx.strokeStyle = dark ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.12)';
    const L = R * 1.1, step = L / 4;
    ctx.beginPath();
    for (let i = -4; i <= 4; i++) {
      let a = project([C[0] + i * step, floorY, -L]), b = project([C[0] + i * step, floorY, L]); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
      a = project([C[0] - L, floorY, i * step]); b = project([C[0] + L, floorY, i * step]); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
    }
    ctx.stroke();
    const pc = project([W.pelvis[0], floorY, 0]);
    ctx.fillStyle = dark ? 'rgba(0,0,0,.35)' : 'rgba(0,0,0,.10)'; ctx.beginPath(); ctx.ellipse(pc[0], pc[1], R * 0.9 * pc[3] * .6, R * 0.22 * pc[3] * .6 + 2, 0, 0, 7); ctx.fill();

    const mid = (a, b, t) => [0, 1, 2].map(i => lerp(a[i], b[i], t));
    const prims = [];
    const col = part => { const r = roles[part] || 0; return r === 2 ? MAIN : r === 1 ? SUPPORT : BODY; };
    const seg = (a, b, r, part) => prims.push({ t: 's', a: project(a), b: project(b), r, c: col(part), act: roles[part] === 2 ? pulse : 0 });
    const sph = (a, r, part) => prims.push({ t: 'o', a: project(a), r, c: col(part), act: roles[part] === 2 ? pulse : 0 });
    const abs = mid(W.pelvis, W.neck, .5), nk = W.neck;
    seg(W.pelvis, abs, 7.5, 'abs'); seg(abs, nk, 8.5, roles.chest ? 'chest' : 'back'); sph(W.pelvis, 7.5, 'glutes');
    seg(W.shN, W.shF, 4, 'delts'); sph(W.shN, 5, 'delts'); sph(W.shF, 5, 'delts');
    seg(nk, W.head, 3, 'back'); sph(W.head, 8, 'none');
    seg(W.hipN, W.hipF, 5, 'glutes');
    for (const s of ['N', 'F']) {
      seg(W['sh' + s], W['el' + s], 4.2, 'arms'); seg(W['el' + s], W['wr' + s], 3.6, 'fore'); seg(W['wr' + s], W['ha' + s], 3, 'fore'); sph(W['el' + s], 3.9, 'arms');
      seg(W['hip' + s], W['kn' + s], 6, 'quads'); seg(W['kn' + s], W['an' + s], 4.5, 'calves'); seg(W['an' + s], W['to' + s], 3.2, 'none'); sph(W['kn' + s], 5, 'quads');
    }
    prims.forEach(p => { p.z = p.t === 's' ? (p.a[2] + p.b[2]) / 2 : p.a[2]; });
    prims.sort((a, b) => b.z - a.z);
    for (const p of prims) {
      const base = p.act ? shade(p.c, .12 * p.act) : p.c;
      if (p.t === 's') {
        const w = p.r * 2 * (p.a[3] + p.b[3]) / 2; ctx.lineCap = 'round';
        ctx.strokeStyle = shade(base, -.45); ctx.lineWidth = w + 2; ctx.beginPath(); ctx.moveTo(p.a[0], p.a[1]); ctx.lineTo(p.b[0], p.b[1]); ctx.stroke();
        ctx.strokeStyle = base; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(p.a[0], p.a[1]); ctx.lineTo(p.b[0], p.b[1]); ctx.stroke();
        ctx.strokeStyle = shade(base, .35); ctx.lineWidth = w * .32; ctx.beginPath(); ctx.moveTo(p.a[0] - w * .16, p.a[1] - w * .16); ctx.lineTo(p.b[0] - w * .16, p.b[1] - w * .16); ctx.stroke();
      } else {
        const rr = p.r * p.a[3], g = ctx.createRadialGradient(p.a[0] - rr * .35, p.a[1] - rr * .35, rr * .1, p.a[0], p.a[1], rr);
        g.addColorStop(0, shade(base, .4)); g.addColorStop(1, shade(base, -.25));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.a[0], p.a[1], rr, 0, 7); ctx.fill(); ctx.strokeStyle = shade(base, -.45); ctx.lineWidth = 1.5; ctx.stroke();
      }
    }
    raf = requestAnimationFrame(draw);
  }

  // forgatás húzással (vízszintes húzás = forgatás, függőleges = lap-görgetés)
  let lx = 0, ly = 0;
  cv.addEventListener('pointerdown', e => { dragging = true; view.auto = false; lx = e.clientX; ly = e.clientY; cv.style.cursor = 'grabbing'; try { cv.setPointerCapture(e.pointerId); } catch (_) {} });
  cv.addEventListener('pointermove', e => { if (!dragging) return; view.yaw += (e.clientX - lx) * .6; goal.yaw = view.yaw; if (e.pointerType === 'mouse') { view.pitch = Math.max(-5, Math.min(89, view.pitch + (e.clientY - ly) * .4)); goal.pitch = view.pitch; } lx = e.clientX; ly = e.clientY; });
  const up = () => { dragging = false; cv.style.cursor = 'grab'; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('wheel', e => { e.preventDefault(); view.zoom = Math.max(.6, Math.min(2.5, view.zoom * (e.deltaY < 0 ? 1.1 : .91))); }, { passive: false });

  resize(); raf = requestAnimationFrame(draw);
  return {
    setView(name) { view.auto = false; const v = { side: [0, 8], front: [90, 8], top: [0, 85], angle: [35, 14] }[name] || [35, 14]; goal.yaw = Math.round(view.yaw / 360) * 360 + v[0]; goal.pitch = v[1]; },
    spin(on) { view.auto = on; goal.yaw = view.yaw; },
    destroy() { dead = true; cancelAnimationFrame(raf); cv.remove(); },
    parts: PARTS,
  };
}
export { PARTS };
