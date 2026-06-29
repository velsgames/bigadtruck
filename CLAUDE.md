# CLAUDE.md

Guidance for Claude Code (and humans) working in this repo.

## What this is

The **Bigadtruck Group** marketing website — a 360° advertising, marketing & technology
agency (Pune & Mumbai; Buzzmore arm in Nagpur). Founder/CEO: Apoorva Vyas. Domain: **bigadtruck.com**.

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
  footer, smooth scroll, custom cursor, page transitions, the WhatsApp button, the "Truck" chat
  assistant + JSON-LD). URLs are unaffected by the group.
- `app/studio/[[...tool]]/` — embedded Sanity Studio (full-screen, outside the marketing chrome).
- `app/api/contact/` — lead + newsletter endpoint (delivers via `lib/leads.ts`).
- `app/api/chat/` — the "Truck" AI assistant endpoint (lead-capturing chatbot). Keyless by
  default (`lib/assistant.ts`); upgrades to Claude when `ANTHROPIC_API_KEY` is set. See below.
- `app/layout.tsx` — root: `<html>/<body>`, fonts, site metadata only.
- `components/` — `cards/`, `layout/`, `sections/`, `ui/`. Client components carry `'use client'`.
- `content/*.ts` — **all editable copy** (site, divisions, services, caseStudies, industries,
  testimonials, process). Edit these, not the components.
- `lib/` — `cms.ts` (content access w/ Sanity fallback), `leads.ts` (shared lead delivery),
  `assistant.ts` (keyless chat engine), `seo.ts`, `validation.ts` (zod), `animations.ts`,
  `utils.ts` (cn), `useReducedMotion.ts`, `sanity/` (client + queries).
- `sanity/` — Studio schemas + env. `sanity.config.ts` at root.
- `styles/globals.css` — design tokens as CSS variables. `app/fonts.ts` — next/font.

## Content & CMS

- Content flows through **`lib/cms.ts`**: uses **Sanity** when `NEXT_PUBLIC_SANITY_PROJECT_ID`
  is set (editable at `/studio`), otherwise falls back to the typed `/content` files. The site
  works fully with zero CMS config — never break that fallback.
- To change text/divisions/services/work/industries/testimonials, edit `content/*.ts`.
- Brand colors/fonts: `styles/globals.css` tokens + `app/fonts.ts`.

## AI assistant ("Truck") & leads

- The chat widget (`components/layout/ChatAssistant.tsx`) posts to **`/api/chat`**. It is
  **keyless and automatic by default**: with no `ANTHROPIC_API_KEY`, the route runs the local
  rule-based engine in `lib/assistant.ts` (answers common questions, extracts name/email/phone,
  runs a lead-capture flow) — no external API, no per-message cost. When `ANTHROPIC_API_KEY`
  **is** set, the route instead drives **Claude** (`@anthropic-ai/sdk`, model `claude-opus-4-8`)
  with a `submit_lead` tool in a short manual tool loop. Don't break the keyless path.
- **Both** the contact form (`/api/contact`) and the assistant (`/api/chat`) deliver enquiries
  through **`lib/leads.ts`** → Resend if `RESEND_API_KEY` is set, else a server-console stub.
  Every lead lands in the same inbox (`CONTACT_TO_EMAIL`, default `vivek@bigadtruck.com`).
- The 3D case-study showcase (`components/sections/CaseStudies3D.tsx` + `…3DScene.tsx`) uses
  three.js / `@react-three/fiber` / `drei`, loaded via `next/dynamic({ ssr: false })` so it stays
  out of the initial bundle. It has an accessible SSR/no-JS static grid fallback and is disabled
  under `prefers-reduced-motion` — keep all three behaviours intact.

## Conventions

- TypeScript strict; no `any` (the CMS adapter is the one justified, eslint-disabled exception).
- Respect `prefers-reduced-motion` everywhere; custom cursor + magnetic buttons are
  desktop/fine-pointer only. Keep the **hero accent SVG-based** (no LCP-blocking 3D); the only
  3D on the site is the below-the-fold case-study scene, lazy-loaded with a static fallback.
- **Entrance reveals must never hide content behind JS.** Use the CSS-driven reveal system
  (`.reveal` / `.reveal-line` / `.reveal-group`+`.reveal-item` in `styles/globals.css`, driven
  by `ScrollReveal`/`ScrollRevealGroup`/`ScrollRevealItem` via IntersectionObserver). The base
  state is **visible**; the `js` class (set by an inline script in `app/layout.tsx` before paint)
  opts into the animation, which runs as a **CSS transition on the compositor** — so it survives a
  throttled `requestAnimationFrame` (iOS Low Power Mode froze framer's JS reveals and left mobile
  visitors on a blank page). Don't gate first-paint or above-the-fold visibility on a framer
  `initial={{ opacity: 0 }}`; `PageTransition` only animates on client-side route changes.
- Mobile-first Tailwind. Keep First Load JS lean — never import three.js / `next-sanity` into a
  shared/initial bundle (both are dynamically/server-only loaded; see Gotchas).
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
- **Remote images:** `next.config.mjs` only allows `images.unsplash.com`, `plus.unsplash.com`
  and `cdn.sanity.io`. Add a host there before using its images, or the build/render fails.
- **Security headers** live in two places — `next.config.mjs` `headers()` (HSTS, X-Frame-Options,
  CSP for SVGs, Permissions-Policy, etc.) **and** `vercel.json`. Keep them in sync when editing.
- Placeholder images are branded SVGs in `public/images/`; real assets go in the same paths
  (see `public/images/README.md`).
- **Logo:** the real badge is `public/brand/logo.png` (used full-size in the footer via `<Logo>`).
  The dark navbar needs a light/white version (a navy-on-white badge looks like a tile on dark) —
  navbar uses `<Wordmark>` / a white logo variant from `components/layout/Logo.tsx`. Keep navbar +
  footer visually consistent with the real mark.

## Deploy — LIVE

**Live at https://bigadtruck.com** (HTTPS valid). Hosting + pipeline:
- **GitHub:** `velsgames/bigadtruck` (public). `git push` to `main` **auto-deploys** to Vercel prod.
- **Vercel:** project `bigadtruck` under the **"ERP LMS" (Hobby)** workspace — that IS the personal
  account (Hobby = personal, just renamed; there is no separate Personal scope on this account).
  Region `bom1`. Local `.vercel/project.json` links it; `vercel --prod` also deploys from local.
- **Cloudflare DNS** (zone for bigadtruck.com): apex `A → 216.198.79.1, 64.29.17.1`,
  `www CNAME → cname.vercel-dns.com`, all **DNS-only** (grey cloud). Email MX/SPF left intact.
  `vercel.json` now 301-redirects `www → apex`.
- **To ship a change:** commit + `git push` (auto-deploys), or `vercel --prod`.

Env vars (set in Vercel project settings): `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`,
`CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`, optional `ANTHROPIC_API_KEY` (upgrades the chat
assistant to Claude) and `NEXT_PUBLIC_SANITY_*`. See `.env.example`. Full DNS/setup steps: **`DEPLOY.md`**.

> ⚠️ **Email delivery is off until `RESEND_API_KEY` is set** — without it, both `/api/contact`
> and the assistant return success but only log leads server-side. Add the key + redeploy to make
> leads reach `vivek@bigadtruck.com`. (The chat assistant works either way — it's keyless.)

## Key facts (don't fabricate beyond these)

- Founder & CEO: **Apoorva Vyas** (set in `content/site.ts` → `site.founder`; flows to the About
  page, JSON-LD and the chat assistant). Contact: `vivek@bigadtruck.com`, phone **+91 79723 61076**.
  Offices: Pune & Mumbai (city-level only — no street address); Buzzmore operates from Nagpur.
- Divisions: Bigadtruck (core), Buzzmore Media (digital marketing + lead gen, Nagpur),
  DPR Creation, Architectural Services, Project Management.
- Case-study clients/metrics are illustrative placeholders. Don't publish real client names
  without explicit permission.
