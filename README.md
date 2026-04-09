# Stræva

> Roelig bevegelse, omsorg og små seire — uten press.

**Stræva** er et fritt, lokalt-første app for skånsom bevegelse, energiskaring og omsorgshandlinger. Appen er bygd som en PWA med full offline-støtte og en valgfri Convex-backend for tverrenhetssynkronisering.

## Funksjoner

- **Energisjekk-in** — Femnivås emosjonell sjekk-in hver dag
- **Bevegelsessjoner** — Rolig, tilpasset timer uten målingspress
- **Seire og omsorg** — Logging av mikrohandlinger som teller
- **Adaptive anbefalinger** — Realistiske forslag basert på energi og historikk
- **Streak / kontinuitet** — Visuelt sporing uten strafffølelse
- **Programmer** — 5 strukturerte, veiledede forløp
- **Innsikt** — Ukentlig oppsummering og mønstergjenkjenning
- **100% offline** — Alle data lagres lokalt
- **Valgfri Convex-sync** — Krypteringsbasert tverrenhetsynkronisering

## Tech Stack

- **Next.js 14** (App Router, TypeScript, statisk eksport)
- **Dexie.js** (IndexedDB) for lokal lagring
- **Zustand** for tilstandshåndtering
- **Convex** (valgfritt) for sky-synkronisering
- **Workbox** for service worker / PWA
- **CSS Custom Properties** for design system

## Kom i gang

```bash
# Klon repoet
git clone https://github.com/Ola-Turmo/straeva-pwa.git
cd straeva-pwa/straeva-app

# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev

# Bygg for produksjon
npm run build
```

Appen kjører på `http://localhost:3000`.

## Arkitektur

```
straeva-app/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (app)/       # App-skall (pålogging, navigasjon)
│   │   ├── (marketing)/ # Marketingsider (landing, FAQ, blogg)
│   │   └── globals.css   # Design system
│   ├── components/       # Gjenbrukbare React-komponenter
│   ├── lib/              # Kjerne-logikk (tilstand, anbefalinger, innsikt)
│   └── convex/           # Convex schema og funksjoner
└── public/               # PWA manifest, service worker, ikoner
```

## Lisens

- Kode: **AGPL-3.0**
- Innhold/markedsføring: **CC BY-NC-SA 4.0**

## Bidrag

Alle bidrag er velkomne. Åpne en issue eller send en pull request på GitHub.
