# CLAUDE.md

Guidance for Claude Code (and humans) working in this repo.

## What this is

The **Bigadtruck Group** marketing website — a 360° advertising, marketing & technology
agency (Pune & Mumbai; Buzzmore arm in Nagpur). Founder/CEO: V. Vyas. Domain: **bigadtruck.com**.

Bespoke **Next.js 14 (App Router) + TypeScript** site. Award-style motion, navy/blue/steel-gray
brand (derived from the logo — NOT amber/orange). Holmes (Qode) theme is *loose* inspiration only.

## Commands

```bash
npm run dev         # dev server (http://localhost:3000)
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # tsc --noEmit (must stay green)
npm run lint        # eslint (must stay green)
npm test            # Playwright smoke tests (desktop + mobile)
npm run placeholders # regenerate placeholder SVG art
npm run seed:export  # export /content -> seed.ndjson for Sanity import
```

After any change, keep **typecheck + lint + build** green and run the **Playwright** suite
(`npm test`, 28 tests across desktop + Pixel-7 mobile).

## Architecture

- `app/(marketing)/` — public pages (route group; the group `layout.tsx` holds the navbar,
  footer, smooth scroll, custom cursor, page transitions + JSON-LD). URLs are unaffected by the group.
- `app/studio/[[...tool]]/` — embedded Sanity Studio (full-screen, outside the marketing chrome).
- `app/api/contact/` — lead + newsletter endpoint (Resend if `RESEND_API_KEY`, else console stub).
- `app/layout.tsx` — root: `<html>/<body>`, fonts, site metadata only.
- `components/` — `cards/`, `layout/`, `sections/`, `ui/`. Client components carry `'use client'`.
- `content/*.ts` — **all editable copy** (site, divisions, services, caseStudies, industries,
  testimonials, process). Edit these, not the components.
- `lib/` — `cms.ts` (content access w/ Sanity fallback), `seo.ts`, `validation.ts` (zod),
  `animations.ts`, `utils.ts` (cn), `useReducedMotion.ts`.
- `sanity/` — Studio schemas + env. `sanity.config.ts` at root.
- `styles/globals.css` — design tokens as CSS variables. `app/fonts.ts` — next/font.

## Content & CMS

- Content flows through **`lib/cms.ts`**: uses **Sanity** when `NEXT_PUBLIC_SANITY_PROJECT_ID`
  is set (editable at `/studio`), otherwise falls back to the typed `/content` files. The site
  works fully with zero CMS config — never break that fallback.
- To change text/divisions/services/work/industries/testimonials, edit `content/*.ts`.
- Brand colors/fonts: `styles/globals.css` tokens + `app/fonts.ts`.

## Conventions

- TypeScript strict; no `any` (the CMS adapter is the one justified, eslint-disabled exception).
- Respect `prefers-reduced-motion` everywhere; custom cursor + magnetic buttons are
  desktop/fine-pointer only. Keep the hero accent SVG-based (no LCP-blocking 3D).
- Mobile-first Tailwind. Keep First Load JS lean (home target ~157 KB).
- Real, plain-spoken, outcome-led copy in the "truck delivers a full load to every destination"
  voice — used sparingly.

## Gotchas (read before you trip on them)

- **Don't run `next build` while `next dev` is running** on this folder — they share `.next` and
  it corrupts the dev server. Stop dev first.
- **Sanity client:** import `createClient` from **`@sanity/client`**, NEVER from `next-sanity`
  — the next-sanity barrel re-exports `'use client'` preview components that leak ~185 KB into
  every route's client bundle. `lib/sanity/client.ts` and `lib/cms.ts` are `server-only`.
- **npm cache:** the global `~/.npm` cache has root-owned files (EACCES). Use a local cache:
  `npm install --cache ./.npm-cache ...` (or `sudo chown -R 501:20 ~/.npm` to fix permanently).
- **Fonts** (Bricolage Grotesque + Inter) download via next/font at build — needs network once.
- Placeholder images are branded SVGs in `public/images/`; real assets go in the same paths
  (see `public/images/README.md`). Official logo → `public/brand/` then swap `LogoBadge`.

## Deploy

Vercel (region `bom1`) + Cloudflare DNS. Full steps incl. exact DNS records: **`DEPLOY.md`**.
Env vars: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`,
optional `NEXT_PUBLIC_SANITY_*`. See `.env.example`.

## Key facts (don't fabricate beyond these)

- Contact: `vivek@bigadtruck.com`, phone **+91 79723 61076**. Offices: Pune & Mumbai (city-level
  only — no street address); Buzzmore operates from Nagpur.
- Divisions: Bigadtruck (core), Buzzmore Media (digital marketing + lead gen, Nagpur),
  DPR Creation, Architectural Services, Project Management.
- Case-study clients/metrics are illustrative placeholders. Don't publish real client names
  without explicit permission.
