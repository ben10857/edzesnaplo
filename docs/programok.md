# Edzésnapló – generált programok

> Másolat a claude.ai „Edzés” projekt `claude/edzesnaplo-programok.md` dokumentumából. A repó nyilvános lehet, ezért a személyes adatokat (életkor, testsúly, magasság) kihagytuk; a teljes leírás a projektben van.
> Csak akkor olvasd, ha új programot generálsz vagy a meglévőt módosítod.

A beillesztés helye az appban: Program fül → ✨ Program AI-val → Program beillesztése.

## FB3 – Full-body 3 nap, visszatérő (2026-10-18)
Kinek: középkorú, 3 év crossfit + 1 év gépezés után 1 év kihagyás; cél izomépítés + általános fittség, egységesen; heti 3×, max 1,5 óra; teljes edzőterem, közeli gépek; nincs sérülés; merev fej fölé nyúlás; futópadot nem szereti. Kezdősúlyok: a régiek 70–80%-a.

```
{"title":"Full-body 3 nap – visszatérő","label":"FB3","perWeek":3,"phases":["intro","intro","normal","normal","normal","deload"],
"notes":"Heti 3 teljes testes edzés (A–B–C), minden izom hetente 2–3× kap ingert. Az első 2 hét bevezető: 1 év kihagyás után a régi súlyok kb. 70–80%-ával kezdj (pl. mellnyomó gép ~30–32 kg, lábtoló ~55 kg, mellhez húzás ~42–45 kg), utána az app javasol. Összetett gyakorlatok 2–3 ismétlés tartalékkal, nem bukásig. Kardió futópad helyett: edzés végén 8–10 perc szobabicikli, evezőgép vagy lépcsőgép, beszélgetős tempóban. A merev fej fölé nyúlásra: Mobilitás fül → Mobilizáció, fókusz: Váll, heti 2–3×; edzés előtt a Bemelegítést is indítsd el.",
"days":[
{"name":"A nap","sub":"guggolás · fekvenyomás · evezés","col":"red","ex":[
 {"name":"Guggolás rúddal","sets":3,"reps":"6–8","rir":"2–3","rest":180,"ssNext":false,"alt":"Hack guggolás / Smith guggolás","tip":"Fő láb-gyakorlat. Kontrollált (2 mp) leengedés, olyan mélyre, amíg a hát semleges marad. Kihagyás után inkább a technika, a súly később jön."},
 {"name":"Fekvenyomás rúddal","sets":3,"reps":"6–10","rir":"2","rest":150,"ssNext":false,"alt":"Gépi mellnyomás","tip":"Fő mell-gyakorlat. Lapockák hátra-le, rúd a mellkas alsó részére, könyök kb. 45°-ban."},
 {"name":"Mellkas-támaszos gépi evezés","sets":3,"reps":"8–12","rir":"1–2","rest":120,"ssNext":false,"alt":"Ülő kábeles evezés","tip":"A mellkas-támasz kíméli a derekat, így tisztán a hát dolgozik. Elöl teljes nyújtás, hátul lapocka össze."},
 {"name":"Ülő lábhajlítás","sets":3,"reps":"10–12","rir":"1–2","rest":90,"ssNext":false,"alt":"Fekvő lábhajlítás","tip":"Combhajlító hosszú izomhosszon. Lassú visszaengedés."},
 {"name":"Oldalemelés kábelen","sets":3,"reps":"12–15","rir":"1","rest":0,"ssNext":true,"alt":"Gépi oldalemelés","tip":"Szuperszett a tricepsszel. Kis súly, a könyök vezet, vállmagasságig."},
 {"name":"Tricepsz letolás kötéllel","sets":3,"reps":"10–15","rir":"1","rest":75,"ssNext":false,"alt":"Tricepsz gép","tip":"Könyök a test mellett marad, alul teljesen nyújtsd ki."},
 {"name":"Álló vádliemelés","sets":3,"reps":"10–15","rir":"1","rest":60,"ssNext":false,"alt":"Lábtolón vádli","tip":"Alul 1–2 mp megállás nyújtott helyzetben."},
 {"name":"Kábeles hasprés (cable crunch)","sets":3,"reps":"10–15","rir":"1–2","rest":60,"ssNext":false,"alt":"Fekvő lábemelés","tip":"A gerinc gördül, nem a csípő hajlik. A kezek a fej mellett maradnak."}]},
{"name":"B nap","sub":"felhúzás · lehúzás · ferde nyomás","col":"blue","ex":[
 {"name":"Román felhúzás (RDL)","sets":3,"reps":"6–10","rir":"2–3","rest":150,"ssNext":false,"alt":"45°-os csípőfeszítés","tip":"Csípőből told hátra a fenekedet, a rúd a combon csúszik, a hát végig egyenes. Combhajlító + far."},
 {"name":"Mellhez húzás, semleges fogás","sets":3,"reps":"8–12","rir":"1–2","rest":120,"ssNext":false,"alt":"Asszisztált húzódzkodás","tip":"Fent teljes nyújtás, a könyököt a csípő felé húzd. A teljes karnyújtás fent a fej fölé nyúlást is javítja."},
 {"name":"Ferde nyomás kézisúlyzóval (30°)","sets":3,"reps":"8–12","rir":"1–2","rest":120,"ssNext":false,"alt":"Ferde gépi nyomás","tip":"Felső mell hangsúly. Alul mély, kontrollált nyújtás."},
 {"name":"Lábtoló","sets":3,"reps":"10–15","rir":"1–2","rest":120,"ssNext":false,"alt":"Hack guggolás","tip":"Mélység csak addig, amíg a medence a háttámlán marad."},
 {"name":"Face pull kötéllel","sets":3,"reps":"12–20","rir":"1","rest":0,"ssNext":true,"alt":"Fordított tárogatás gépen","tip":"Szuperszett a bicepsszel. Húzás szemmagasságba, könyök kifelé, a végén kifelé forgatás. Váll-egészség."},
 {"name":"Bicepsz curl ferde padon","sets":3,"reps":"10–12","rir":"1","rest":75,"ssNext":false,"alt":"Kábeles bicepsz curl","tip":"A kar a test mögött lóg, így a bicepsz nyújtott helyzetből dolgozik."},
 {"name":"Lábnyújtás","sets":2,"reps":"12–15","rir":"1","rest":75,"ssNext":false,"alt":"—","tip":"Négyfejű kiegészítés, fent 1 mp tartás."},
 {"name":"Pallof-prés kábellel","sets":2,"reps":"10–12","rir":"2","rest":60,"ssNext":false,"alt":"Oldalsó támasz","tip":"Oldalanként. Kábel oldalt mellmagasságban, told ki előre és tartsd 2 mp-ig úgy, hogy a törzs ne forduljon el."}]},
{"name":"C nap","sub":"egylábas láb · gépi nyomás · evezés","col":"green","ex":[
 {"name":"Bolgár guggolás kézisúlyzóval","sets":3,"reps":"8–10","rir":"2","rest":120,"ssNext":false,"alt":"Kitörés helyben","tip":"Lábanként (a súly a kézisúlyzók együtt). Hátsó láb a padon, elöl mély térdhajlítás. Egyensúlyhoz kapaszkodhatsz."},
 {"name":"Hip thrust (gép vagy rúd)","sets":3,"reps":"8–12","rir":"1–2","rest":120,"ssNext":false,"alt":"Farizom-gép (kickback)","tip":"Fent bordák le, far összeszorít, 1 mp tartás. Ne a derék feszítsen."},
 {"name":"Gépi mellnyomás","sets":3,"reps":"8–12","rir":"1","rest":120,"ssNext":false,"alt":"Fekvőtámasz súlymellénnyel","tip":"Fogantyú mellközépen, hátul teljes nyújtás. Gépen biztonságosan közel mehetsz a bukáshoz."},
 {"name":"Ülő kábeles evezés","sets":3,"reps":"10–12","rir":"1","rest":120,"ssNext":false,"alt":"Egykezes evezés kézisúlyzóval","tip":"Elöl engedd előre a lapockát, hátul húzd össze. A törzs nem lendül."},
 {"name":"Gépi vállnyomás","sets":2,"reps":"8–12","rir":"2","rest":120,"ssNext":false,"alt":"Landmine nyomás","tip":"A merev fej fölé nyúlás miatt csak fájdalommentes tartományban, a háttámlán maradva. Ahogy javul a mobilitás, nőhet a mozgás."},
 {"name":"Fekvő lábhajlítás","sets":3,"reps":"10–15","rir":"1","rest":0,"ssNext":true,"alt":"Ülő lábhajlítás","tip":"Szuperszett a vádlival. A csípő a párnán marad."},
 {"name":"Ülő vádliemelés","sets":3,"reps":"12–20","rir":"1","rest":75,"ssNext":false,"alt":"Álló vádliemelés","tip":"Ülve a mélyebb vádliizom dolgozik. Alul 1–2 mp megállás."},
 {"name":"Oldalemelés kábelen","sets":3,"reps":"12–15","rir":"1","rest":0,"ssNext":true,"alt":"Gépi oldalemelés","tip":"Szuperszett a hátsó vállal."},
 {"name":"Fordított tárogatás gépen","sets":2,"reps":"12–20","rir":"1","rest":75,"ssNext":false,"alt":"Face pull","tip":"Hátsó váll. Nyújtott, de nem zárt könyökkel, a lapocka nem húzódik össze teljesen."}]}
]}
```
