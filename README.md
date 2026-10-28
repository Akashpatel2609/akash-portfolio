# Akash Patel Portfolio

Akash's Toronto data and applied-AI portfolio, using the approved Porcelain Signal design: ivory and burgundy typography, sculptural artwork, inline project case studies, and light/dark themes.

## Run locally

Requires Node.js 20.9 or later.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. For production, run `npm run build` and `npm start`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Structure

- `src/components/portfolio.jsx`: page sections, theme preference, scoped GSAP motion and motion control.
- `src/components/EditorialProjectList.jsx`: accessible case-study disclosure, adapted from ibrandify's Editorial service list on 21st.dev, using shadcn/Radix primitives.
- `src/data/portfolio.js`: project descriptions, outcomes, destinations and résumé link.
- `src/app/globals.css`: responsive layout, local Inter font, theme tokens and reduced-motion styles.
- `src/app/layout.tsx`: server-rendered metadata and initial theme setup.
- `public/assets/`: optimized artwork and the navbar portrait. Sculpture images are conceptual artwork, not screenshots of private company data.

The frontend uses Next.js App Router, React, Tailwind CSS, GSAP, shadcn/Radix and Phosphor icons. The original Next.js deployment entry points remain compatible with Vercel. Existing project-page URLs redirect to the new inline case studies.

Theme choice persists locally. Motion respects the operating-system preference and can be paused from the footer. The site requires no API keys or backend credentials.

## Repository cleanup

The retired Pocket Ledger application, old portfolio components, unused PNG/SVG project artwork, outdated routes/tests and their unused dependencies have been removed. Prototype screenshots, generated-image originals, temporary provider responses and local build artifacts are not part of this repository. Earlier versions remain recoverable from Git history.
