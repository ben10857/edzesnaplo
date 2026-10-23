# Edzésnapló – szabályok a fejlesztéshez (Claude-nak is)

Benedek saját példánya Dávid Edzésnapló appjából (DaciMeRollin/edzesnaplo).
Telefonos, offline is működő PWA; GitHub Pages teszi ki (`main` ág), a telefonok a következő megnyitáskor frissülnek.

## Kötelező
- Minden ingyenes: nincs fizetős szolgáltatás, API-kulcs, kártyát kérő regisztráció. Ha egy ingyenes csomag korlátozott, előre jelezd.
- Offline-first: internet nélkül is induljon és működjön. Ami netet kér (szinkron, AI), az opcionális.
- Adatbiztonság: frissítéskor a meglévő adat nem vész el. Adatszerkezet-változásnál automatikus átalakítás (localStorage kulcs: `edzesnaplo.v1`, mentés formátuma: 3). Az export/import maradjon működőképes.
- AI-programgenerálás csak ingyen: a programot a chatben generálod, a felhasználó bemásolja (beillesztés funkció).
- Dávid repójához ne nyúlj; oda csak pull requesttel, ha Benedek kéri.
- Többen használják az appot, mindenkinek külön adata van; más adatához ne nyúlj.

## Hogyan dolgozz
- Token-takarékosság: az `index.html` ~2900 sor (~320 KB). **Ne olvasd be egészben.** Keress rá a függvény nevére (`grep -n`), és csak a releváns sávot olvasd (`Read` offset/limit). Egy téma = egy munkamenet.
- Élesítés előtt teszteld telefonos méretben (kb. 390 px), valódi mentett adattal is; írd le, mit nem tudtál kipróbálni.
- Új funkciónál nézd végig a meglévőket (javaslat-motor, mobilitás fül, gond-jelzés, személyes módosítások, ábrák).
- Csak akkor kérdezz, ha a döntés nehezen visszafordítható, pénzbe kerül vagy más adatait érinti; egyébként dönts, és a végén jelezd.
- Mielőtt fiókhoz/repóhoz/szolgáltatáshoz hozzáférnél vagy engedélyt kérnél: mondd el, mire kell és miért.
- Válasz: magyarul, röviden – mi változott, hol találom az appban, mire figyeljek. Technikai részlet csak kérésre.
- Commit → push `main`-re → ~1 perc múlva a telefonokon „Új verzió érhető el”. Verziószámot nem kell írni.

## Fájlok
- `index.html` – az egész app (HTML + CSS + JS). `sw.js` – offline + frissítés-jelzés (etag). `manifest.webmanifest`, `icon-*.png`. Minden útvonal relatív.
- `docs/projekt.md` – részletes háttér (felépítés, program-JSON formátum, ismert korlátok). `docs/programok.md` – generált programok. Csak akkor olvasd, ha kell.

## Kódtérkép – `index.html` (sorszámok kb., a függvénynevekre keress)
- **CSS** 20–480: szakaszok `/* header */`, `/* active session */`, `/* rest timer */`, `/* history */`, `/* progress */`, `/* info */`, `/* saját program szerkesztő */`, `/* animált ábrák */`, `/* gyakorlat-útmutatók */`, `/* mobilitás + naptár */`.
- **HTML váz** 482–503: `#view` (ide renderel mindent a `render()`), tab-sáv (`data-tab`: edzes, mob, elozmeny, haladas, info), `#timer`, `#toast`.
- **Programok** 506–752: `BUILTIN` (PPL, AB, UL, CAL), `PHASE`, `finalize`, `buildProgram`, `blankDraft`, `draftFrom`.
- **Állapot/mentés** 754–826: `LS`, `normSettings` (adatmigráció), `S`, `rebuildPrograms`, `ui`, `saveLocal`, `doBackup`, `doRestore`, `initPwa`.
- **Segédfüggvények** 827–880: `$`, `esc`, `P()`, `PS()`, `target`, `e1rm`, `lastFor`, `sessExList`.
- **Javaslat-motor** 880–1008 és 2440: `recommendBase`, `recSec`, `recAssist`, `recCali`, `coreGym`; a belépő: `recommend` (~2440). Lépésközök: `DEFAULT_STEP`, `stepFor`. Szabályok (izometria, asszisztált húzódzkodás, calisthenics) a `recSec`/`recAssist`/`recCali` kommentjeiben.
- **Nézetek**: `render` 1022 · `viewHome` 1073 · `viewActive` 1115 · `viewSummary` 1172 · `viewHistory` 1373 · `viewProgress` 1427 / `viewProgressEro` 1439 / `viewBodyweight` 1502 (+ `chartSVG` 1531) · `viewInfo` 1560 · `viewEditor` 1600 · `viewAI` 1813 · `viewMob` 2104 / `viewMobActive` 2063 / `viewMobProgress` 2142 / `viewCalendar` 2166.
- **Fókusz-mód edzés közben** 1213–1372: `fSteps`, `fCur`, `fBlock`, `fCard`, `fRow`, `fAction`.
- **Időzítő / ébren tartás** 1691–1736: `startTimer`, `tick`, `keepAwake`.
- **AI-program beillesztés** 1737–1849: `aiPrompt`, `draftFromAI` (formátum-ellenőrzés), `aiGenerate`.
- **Mobilitás** 1850–2236: `AREAS`, `MLIB` (gyakorlatok), `MTESTS` (felmérések), `genRoutine`, `startMob`, `finishMob`, `mobAction`.
- **Pálcikaember-ábrák** 2237–2411: pózok (`STAND`, `SQUAT`…), `FIGS`, `figFK`, `figSVG`, `figHTML`, `figTick`.
- **Gond-jelzés + személyes módosítás** 2412–2563: `issueBox`, `lastIssueFor`, `applyMods`, `modBox`, `setSwap`, `adaptAction`.
- **Gyakorlat-útmutatók** 2564–2774: `GUIDES`, `GUIDE_MATCH` (regex-sorrend számít: szűkebb előbb), `guideKey`, `guideThumb`. Új gyakorlatnévnél ellenőrizd: `guideKey({name})`.
- **Edzés indítása/lezárása** 2775–2790: `startSession`, `finishSession`.
- **Eseménykezelők + CSV + indulás** 2790–2908: `click`/`input`/`change`/`keydown` delegálás (`data-act` attribútumok), `exportCsv`.
