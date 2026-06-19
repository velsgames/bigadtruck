# Deploying bigadtruck.com (Vercel + Cloudflare DNS)

This site is a standard Next.js app. Recommended host: **Vercel**. Your DNS is in
**Cloudflare**, so the domain is pointed with two records.

> Heads-up: I can't deploy to your Vercel/Cloudflare accounts for you — those need
> your login. Either follow the steps below, or in this session run
> `! npx vercel login` and tell me, and I'll drive the `vercel` deploy from here.

---

## 1. Push the code

```bash
cd bigadtruck
git init && git add -A && git commit -m "Bigadtruck Group website"
# create an empty repo on GitHub, then:
git remote add origin https://github.com/<you>/bigadtruck.git
git push -u origin main
```

## 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repo.
2. Framework preset auto-detects **Next.js** — leave build settings default
   (`next build`). The included `vercel.json` pins the `bom1` (Mumbai) region.
3. Add **Environment Variables** (Project → Settings → Environment Variables):

   | Variable | Value |
   |----------|-------|
   | `RESEND_API_KEY` | your Resend key (for the contact form) |
   | `CONTACT_FROM_EMAIL` | e.g. `no-reply@bigadtruck.com` (verified in Resend) |
   | `CONTACT_TO_EMAIL` | `vivek@bigadtruck.com` |
   | `NEXT_PUBLIC_SITE_URL` | `https://bigadtruck.com` |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | (optional) your Sanity project id |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |

4. **Deploy.** You'll get a `*.vercel.app` URL — verify the site there first.

## 3. Add the domain in Vercel

Project → **Settings → Domains** → add `bigadtruck.com` **and** `www.bigadtruck.com`.
Vercel will show the exact DNS records to create. They're typically:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` (bigadtruck.com) | `76.76.21.21` *(use the IP Vercel shows)* |
| `CNAME` | `www` | `cname.vercel-dns.com` *(use the value Vercel shows)* |

## 4. Set the records in Cloudflare

In Cloudflare → **DNS → Records**:

1. Add the **A** record (`@` → the Vercel IP) and the **CNAME** (`www` → `cname.vercel-dns.com`).
2. **Set Proxy status to "DNS only" (grey cloud)** for both records while Vercel
   issues the TLS certificate. This avoids the Cloudflare proxy fighting Vercel's SSL.
3. In Cloudflare → **SSL/TLS → Overview**, set the encryption mode to **Full (strict)**.
4. Wait for Vercel's Domains panel to show **Valid Configuration** (a few minutes;
   DNS can take longer). Vercel auto-provisions HTTPS.

> Optional: once the cert is valid you *can* switch the records back to the orange
> "Proxied" cloud for Cloudflare's CDN/WAF — keep SSL mode on **Full (strict)**. If
> you hit redirect loops, go back to "DNS only". The simplest reliable setup is to
> leave them **DNS only** and let Vercel serve directly.

## 5. Redirect www → apex (or vice-versa)

In Vercel → Settings → Domains, set one as primary and Vercel adds the redirect.

---

## Going live checklist

- [ ] `*.vercel.app` preview looks correct
- [ ] Env vars set (esp. `RESEND_API_KEY` so the contact form emails)
- [ ] DNS records added in Cloudflare (A + CNAME), proxy = DNS only
- [ ] Cloudflare SSL/TLS = Full (strict)
- [ ] Vercel Domains shows "Valid Configuration" + HTTPS active
- [ ] Submit a test enquiry on `/contact` → confirms email arrives at `vivek@bigadtruck.com`
- [ ] Real images dropped into `public/images/` (see its README)
- [ ] (Optional) Sanity configured + seeded — see README "Sanity CMS"
