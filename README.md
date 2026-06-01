# Canopy — Organization panel

The buyer-facing frontend for Canopy, the carbon credit marketplace. One of three
separate frontends (`farmer/`, `platform/`, `organization/`) that all talk to the
single backend in `../backend` (see `spac/001_poc.md` §7).

Built with **Next.js (App Router) + React 19 + Tailwind**. It has two distinct halves:

| Surface | Rendering | Routes |
|---|---|---|
| **Marketing site** (public, client-facing) | **SSR** (server components) | `/` |
| **Buyer app** (authenticated) | **CSR** (client components, JWT in `localStorage`) | `/login`, `/register`, `/dashboard`, `/market`, `/portfolio`, `/certificates/:id` |

The marketing page renders entirely on the server with no auth and no client
fetching. Everything under the `(app)` route group is client-rendered and fetches
from the backend in the browser, mirroring the farmer/platform panels.

## Design system

Shares the Canopy design tokens verbatim with the farmer & platform panels
(`tailwind.config.ts`): the **Organic Biophilic**, warm-paper light theme — cream
surfaces, a single confident green accent (`#15803D`), warm amber used sparingly,
Fira Code headings / Fira Sans body. Credit-state colors derive from `state.*`
tokens, never hardcoded per screen.

## Local dev

```bash
cp .env.example .env.local        # BACKEND_ORIGIN defaults to http://localhost:3000
npm install
npm run dev                       # http://localhost:5175
```

The backend must be running (`cd ../backend && npm run dev`). In dev, `/api/*` is
proxied to `BACKEND_ORIGIN` via `next.config.mjs`, so the browser only ever makes
same-origin requests.

Other scripts: `npm run build`, `npm start`, `npm run typecheck`, `npm run lint`.

## What it does (org slice of the loop, spec §7)

- **Marketplace** (`/market`) — browse listed credits with full plot provenance; buy.
- **Buy** — `POST /credits/:id/buy`; records the 70/30 split server-side.
- **Portfolio** (`/portfolio`) — credits you own; retire a credit to claim the offset.
- **Retire** — `POST /credits/:id/retire`; freezes the credit and mints a certificate.
- **Certificate** (`/certificates/:id`) — the permanent, printable proof of retirement.

Retired credits are final: per the integrity rules, the UI exposes **zero** write
affordances on a retired credit, and the server rejects any change regardless.
