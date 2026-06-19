# Bigadtruck Group — Website

A production-ready marketing website for **Bigadtruck Group** — a 360° advertising, marketing
& technology agency in Pune & Mumbai. Single unified group site showcasing five divisions, a
filterable portfolio, a full services taxonomy, and a lead-capture contact flow.

Built as an award-style, motion-rich experience that stays fast, accessible and SEO-sound.

---

## Tech stack

| Area        | Choice |
|-------------|--------|
| Framework   | Next.js 14 (App Router) + TypeScript (strict) |
| Styling     | Tailwind CSS + CSS-variable design tokens |
| Animation   | Framer Motion + Lenis smooth scroll (all reduced-motion safe) |
| Hero accent | Lightweight animated SVG "road/truck" (no LCP-blocking 3D) |
| Fonts       | `next/font` — Bricolage Grotesque (display) + Inter (body), self-hosted |
| Icons       | lucide-react |
| Forms       | React Hook Form + Zod, posting to `/api/contact` |
| Email       | Resend (optional) — gracefully stubs to the console in dev |
| SEO         | Metadata API, JSON-LD (Organization / LocalBusiness / Service), sitemap, robots, dynamic OG image |
| Testing     | Playwright smoke tests (desktop + mobile) |
| Quality     | ESLint + Prettier, TypeScript strict |

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. (optional) configure environment — see below
cp .env.example .env.local

# 3. Run the dev server
npm run dev
# → http://localhost:3000
```

> Note: the first `dev`/`build` downloads the fonts via `next/font` (needs network once).

### Scripts

| Command            | Does |
|--------------------|------|
| `npm run dev`      | Start the dev server |
| `npm run build`    | Production build |
| `npm run start`    | Serve the production build |
| `npm run lint`     | ESLint |
| `npm run typecheck`| `tsc --noEmit` |
| `npm run format`   | Prettier write |
| `npm test`         | Playwright smoke tests (builds + serves automatically) |
| `node scripts/gen-placeholders.mjs` | Regenerate placeholder SVG art |

> Don't run `next build` while `next dev` is running on the same folder — they share the
> `.next` directory and the dev server will break. Stop dev first (or build in a clean checkout).

---

## Environment variables

Copy `.env.example` → `.env.local`. Everything is optional for local dev.

| Variable                | Purpose | Default |
|-------------------------|---------|---------|
| `RESEND_API_KEY`        | Enables real email delivery for the contact form. If absent, submissions are **logged to the server console** (dev stub) and the form still shows success. | — |
| `CONTACT_FROM_EMAIL`    | Verified Resend sender. Use `onboarding@resend.dev` for testing. | `onboarding@resend.dev` |
| `CONTACT_TO_EMAIL`      | Where leads are delivered. | `vivek@bigadtruck.com` |
| `NEXT_PUBLIC_SITE_URL`  | Canonical site URL (sitemap, OG, JSON-LD). | `https://bigadtruck.com` |

### Wiring up real email (Resend)

1. Create a free account at [resend.com](https://resend.com) and grab an API key.
2. Verify your sending domain (e.g. `bigadtruck.com`) and set `CONTACT_FROM_EMAIL` to an address on it.
3. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in your environment (locally `.env.local`, on Vercel the
   project settings). That's it — `/api/contact` switches from console-stub to live email automatically.

Prefer Nodemailer/SMTP instead? Swap the `deliver()` helper in `app/api/contact/route.ts` — it's the
single integration point.

---

## Sanity CMS (self-editing) — optional

The site reads content through `lib/cms.ts`, which uses **Sanity** when configured and
otherwise falls back to the typed `/content` files — so it works with zero setup.

**Enable it:**

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (free). Note the
   **Project ID** and dataset (`production`).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` (in `.env.local`
   and on Vercel). Add `https://your-site/studio` and `http://localhost:3000/studio` to the
   project's **CORS origins** in sanity.io/manage.
3. Visit **`/studio`** — the embedded Studio. Editors manage Site Settings, Divisions,
   Services, Case Studies, Industries and Testimonials there. Changes appear on the site
   (60s revalidation).

**Seed the Studio with the current content (one time):**

```bash
npm run seed:export                 # writes seed.ndjson from /content
npx sanity dataset import seed.ndjson production
```

Documents import without images (the site keeps showing the local placeholder SVGs until you
upload real images in the Studio). The schemas live in `sanity/schemaTypes/`; the access layer
with fallback is `lib/cms.ts`.

---

## Deploy to bigadtruck.com (Vercel + Cloudflare)

Full step-by-step — including the exact **Cloudflare DNS records** — is in
**[`DEPLOY.md`](./DEPLOY.md)**. In short:

1. Push to Git → **Import** into [Vercel](https://vercel.com/new) (auto-detects Next.js).
2. Add env vars (`RESEND_API_KEY`, `CONTACT_*`, `NEXT_PUBLIC_SITE_URL`, optional `NEXT_PUBLIC_SANITY_*`).
3. Add `bigadtruck.com` in Vercel → Domains; create the shown **A** (`@`) and **CNAME** (`www`)
   records in **Cloudflare** with proxy = **DNS only** and SSL mode **Full (strict)**.

Netlify works too (same env vars, build `npm run build`).

---

## Project structure

```
app/                 Routes, route handlers, sitemap/robots/OG, layout
  api/contact/       Lead + newsletter endpoint (Resend or console stub)
  divisions/[slug]/  5 division detail pages (SSG)
  work/[slug]/       Case study template (SSG)
components/
  cards/             DivisionCard, ServiceCard, CaseStudyCard
  layout/            Navbar + MegaMenu + MobileDrawer, Footer, SmoothScroll, Cursor, PageTransition, Logo
  sections/          Hero, RoadAccent, Divisions, Work, Services, Stats, Process, Testimonials, CTA, ContactForm, WorkGrid
  ui/                Button, MagneticButton, ScrollReveal, Marquee, StatCounter, Eyebrow, SectionHeading, FAQAccordion
content/             site, divisions, services, caseStudies, industries, testimonials, process — all typed, edit here
lib/                 utils (cn), animations, validation (zod), seo helpers, reduced-motion hook
public/images/       Placeholder SVG art (+ README of real assets to drop in)
styles/globals.css   Design tokens (CSS variables) + base styles
tests/               Playwright smoke tests
scripts/             Placeholder-art generator
```

**All copy lives in `/content`** as typed TS files — edit those to change text, divisions, services,
case studies, industries and testimonials without touching components. The structure is CMS-ready
(Sanity/Contentlayer can be layered on later).

---

## Editing content

| To change… | Edit |
|------------|------|
| Brand facts, nav, contact, socials | `content/site.ts` |
| The five divisions | `content/divisions.ts` |
| Services taxonomy | `content/services.ts` |
| Case studies / portfolio | `content/caseStudies.ts` |
| Industries grid | `content/industries.ts` |
| Testimonials | `content/testimonials.ts` |
| Process steps | `content/process.ts` |
| Colors / fonts | `styles/globals.css` (tokens) + `app/fonts.ts` |

---

## Design & accessibility notes

- **Brand palette** is derived from the logo: deep navy surfaces, a confident brand blue accent,
  sky-blue secondary, steel-gray neutrals. Tokens live in `styles/globals.css`.
- **Motion** (smooth scroll, kinetic hero, marquees, magnetic buttons, custom cursor, pinned process
  scroll, stat counters) all respect `prefers-reduced-motion` and degrade gracefully on touch.
- **Accessibility**: semantic landmarks, skip link, keyboard nav, visible focus rings, alt text,
  ARIA on interactive widgets, AA-contrast color pairs.
- **Performance**: hero accent is pure SVG (no 3D), images via `next/image` (AVIF/WebP), static
  generation for all marketing routes, code-split client islands.

See `public/images/README.md` for the checklist of real assets to swap in before launch.
