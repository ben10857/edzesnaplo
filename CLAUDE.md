# Edzésnapló – szabályok a fejlesztéshez (Claude-nak is)

Ez Benedek saját példánya Dávid Edzésnapló appjából (DaciMeRollin/edzesnaplo).
Telefonos, offline is működő PWA; GitHub Pages teszi ki, a telefonok a következő megnyitáskor frissülnek.

## Kötelező
- Minden ingyenes: nincs fizetős szolgáltatás, API-kulcs, kártyát kérő regisztráció.
  Ha egy ingyenes csomag korlátozott (pl. elalszik inaktivitásnál), előre jelezd.
- Offline-first: internet nélkül is induljon és működjön. Ami netet kér (szinkron, AI), az opcionális.
- Adatbiztonság: frissítéskor a meglévő adat soha nem vész el. Ha változik az adatszerkezet,
  a régi adatot automatikusan alakítsd át (localStorage kulcs: `edzesnaplo.v1`, mentés formátuma: 3).
  Az export/import maradjon működőképes.
- AI-programgenerálás csak ingyen: a programot a chatben generálod, a felhasználó bemásolja (beillesztés funkció).
- Dávid repójához ne nyúlj; oda csak pull requesttel, ha Benedek kéri.

## Felépítés
- `index.html` – az egész app (HTML + CSS + JS egy fájlban).
- `sw.js` – service worker: offline indulás + „Új verzió érhető el” jelzés (etag alapján, nem kell kézzel verziózni).
- `manifest.webmanifest`, `icon-*.png` – telepíthető app adatai. Minden útvonal relatív, bármilyen repónévvel működik.

## Hogyan dolgozz
- Élesítés előtt teszteld telefonos méretben (kb. 390 px széles), valódi mentett adattal is; írd le, mit nem tudtál kipróbálni.
- Új funkciónál nézd végig a meglévőket (javaslat-motor, mobilitás fül, gond-jelzés, személyes módosítások, ábrák), hogy ne kelljen később újraírni.
- Csak akkor kérdezz, ha a döntés nehezen visszafordítható, pénzbe kerül vagy más adatait érinti.
- Mielőtt fiókhoz/repóhoz/szolgáltatáshoz hozzáférnél vagy engedélyt kérnél: mondd el, mire kell és miért.
- Válasz: magyarul, röviden – mi változott, hol találom az appban, mire figyeljek.
