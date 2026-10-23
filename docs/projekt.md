# Edzésnapló – projekt-háttér

> Másolat a claude.ai „Edzés” projekt `claude/edzesnaplo-projekt.md` dokumentumából (frissítve: 2026-10-23).
> Csak akkor olvasd, ha a feladat tényleg kéri (új ember programja, hozzáférés, ismert korlátok). A napi fejlesztéshez a `CLAUDE.md` elég.

## Hol van mi
| Mi | Hol | Megjegyzés |
| --- | --- | --- |
| **Benedek appja (éles, ezt fejlesztjük)** | https://ben10857.github.io/edzesnaplo/ | telefonon „Edzésnapló B” néven |
| Benedek repója | GitHub: `ben10857/edzesnaplo` (Dávid repójának forkja) | ide megy minden fejlesztés |
| Dávid appja | https://dacimerollin.github.io/edzesnaplo/ · repó: `DaciMeRollin/edzesnaplo` | **nem nyúlunk hozzá**; csak pull requesttel, ha Benedek kéri |
| Régi Claude-os fejlesztői oldal | https://claude.ai/code/artifact/a464b1c3-cd31-4012-aec2-b2d2c3830136 | Dávid és Benedek közös artifactja; Dávid is szerkeszti; a telefonos apptól eltér (nincs benne az Upper/Lower program) |
| Használati útmutató új felhasználóknak | Claude Docs: https://claude.ai/artifact/AuhbmZZ2eaAjhop6q3ZuRk | telepítés iPhone/Android, minden funkció; a Docs connectorral szerkeszthető |

## Hozzáférés a repóhoz egy új (chat) beszélgetésből
1. Előbb egy mondatban mondd el Benedeknek, mire kérsz engedélyt és miért (ez a kérése).
2. `add_repo(owner="ben10857", repo="edzesnaplo", access="push")`, majd
   `git clone --depth 1 https://github.com/ben10857/edzesnaplo /home/claude/edzesnaplo`.
   A Claude GitHub App telepítve van erre a repóra, így a push működik.
3. Commit: `git config user.email noreply@anthropic.com && git config user.name Claude`.
   Push a `main` ágra → a GitHub Pages ~1 perc alatt kiteszi → a telefonokon „Új verzió érhető el” felirat.
4. A GitHub API (pl. Pages-beállítás) a proxyn nem érhető el; azt Benedek kattintja.
5. A repóban lévő `CLAUDE.md` a fejlesztési szabályokat tartalmazza (ingyenes, offline, adatbiztonság, rövid magyar válasz).

## Felépítés (index.html, minden egy fájlban; sw.js; manifest; ikonok)
A függvények helyét a `CLAUDE.md` kódtérképe mutatja.
- **Tárolás:** csak a telefonon, `localStorage` kulcs `edzesnaplo.v1`. Biztonsági mentés JSON (`app:"edzesnaplo"`, `format:3`: settings, sessions, programs, mob), visszatöltés, CSV export. Nincs szerver, nincs fiók.
- **Frissítés:** `sw.js` etag alapján jelzi az új verziót; verziószámot nem kell kézzel írni. Minden útvonal relatív.
- **Beépített programok (`BUILTIN`):** PPL (gördülő, heti 4), AB (full-body, heti 3), UL (Upper/Lower, heti 4), CAL (calisthenics). Gyakorlat-tuple: `[id, név, szett, ismétlés, RIR, pihenő mp (0 = szuperszett 'a' tag), alternatíva, végrehajtás, {opciók}]`.
- **Javaslat-motor (AI nélkül):** `recommend → recommendBase → coreGym / recCali / recSec`; RIR-korrigált Epley e1RM + kettős progresszió; `lastFor` (csak `r>0` szettek), fázisok: intro (RIR +1), normal, peak, deload.
- **Gond-jelzés + személyes módosítás:** `issueBox`, `lastIssueFor` (fájdalom → −15%, ROM/technika → nincs emelés), `applyMods` (gyakorlatcsere, szuperszett bontása; `settings.mods`).
- **Mobilitás fül:** bemelegítés / nyújtás / mobilizáció / felmérés (`MLIB`, `MTESTS`, `genRoutine`), animált pálcikaember-ábrák (`FIGS`, `figFK`, `figSVG`).
- **Gyakorlat-ábrák:** `GUIDES` (gép + mozgó figura + lépések + gyakori hiba), név alapú felismerés `GUIDE_MATCH` regexekkel (a sorrend számít: a szűkebb minta előbb). Új gyakorlatnévnél nézd meg, hogy kap-e ábrát (`guideKey({name})`), és ha nem, adj hozzá útmutatót.
- **Fókusz-mód edzés közben:** `fBlock` / `fCard`, pihenőgyűrű, képernyő ébren tartása (`keepAwake`).
- **Testsúly:** opcionális, 2 tizedes, heti átlag a Haladás fülön.

## Program generálása új embernek (ingyenes út)
A chatben generált JSON-t a felhasználó az appban beilleszti: **Program fül → ✨ Program AI-val → Program beillesztése → Betöltés a szerkesztőbe → Program mentése**.
Formátum (`draftFromAI` ellenőrzi):
```
{"title":"≤60 kar.","label":"≤14 kar.","perWeek":3,"phases":["intro","normal","normal","peak","deload"],"notes":"≤700 kar.",
 "days":[{"name":"A nap","sub":"rövid leírás","col":"red|blue|yellow|green",
   "ex":[{"name":"Gyakorlat","sets":3,"reps":"8–12","rir":"1–2","rest":120,"ssNext":false,"alt":"≤80 kar.","tip":"≤400 kar."}]}]}
```
- `reps` és `rir` csak szám vagy tartomány („8–12”, „2”); „/láb”, „mp” nem mehet bele (oldalanként → a tippbe).
- `ssNext:true` = szuperszett a következővel (csak párok). Max 7 nap, napi 14 gyakorlat, 1–8 szett, pihenő 0–600 mp.
- A gyakorlatnevek legyenek olyanok, amikre van ábra (pl. „Gépi mellnyomás”, „Mellhez húzás”, „Román felhúzás (RDL)”, „Lábtoló”, „Ülő lábhajlítás”, „Face pull kötéllel”, „Pallof-prés kábellel”).
- Kérdőív új embernek: cél, testrész, határidő, heti alkalom, perc/edzés, fix napok, tapasztalat, jelenlegi súlyok, szabadsúly-ismeret, terem/felszerelés, gépek távolsága, sérülés, merev mozdulat, orvosi kizáró ok, kor/magasság/súly, alvás/stressz, egyéb sport, kedvelt/kerülendő, egyéb.
- Generált programok: lásd `docs/programok.md`.

## Ismert korlátok
- Zárolt képernyőn visszaszámlálás / szettbeírás webappként nem lehetséges (natív app kellene, fizetős Apple-fiók) – eldöntve, nem csináljuk.
- Telefonon valódi eszközön nem teszteltünk; a tesztek Playwright-tal, 390 px széles nézetben futnak (`python3 -m http.server` + Chromium).
