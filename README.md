# GenSan GoKart

Marketing website for GenSan GoKart — an off-road go-kart experience in General Santos City, Philippines. Built with Astro for fast static delivery and optimized for local search and booking conversions.

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Astro (SSG, static-first) |
| Styling | Tailwind CSS v4 |
| Hosting | Netlify (CI/CD from GitHub) |
| Database | Supabase Postgres |
| Functions | Netlify Functions (form handling) |
| Analytics | GA4 + Meta Pixel |

## Dev Commands

```bash
npm run dev        # start dev server → http://localhost:4321
npm run build      # production build
npm run preview    # preview production build locally
```

## Project Structure

```
src/
├── components/    # Astro components (Nav, Footer, Hero, sections, UI)
├── layouts/       # BaseLayout with SEO, GA4, Meta Pixel
├── pages/         # Home, /packages, /booking, /about, /events, /blog, /contact
└── styles/        # tokens.css (brand design tokens)
netlify/
└── functions/     # submit-booking.ts (Supabase insert + email notification)
docs/              # Design guides, visitor flow, tech spec, implementation plan
archive/           # Original vanilla HTML/CSS/JS prototype — do not edit
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — Hero → Experience → Packages → FAQ → Booking form |
| `/packages` | Full package comparison (Family / Barkadahan / Team Building) |
| `/booking` | Standalone booking form; pre-selects package via `?package=` |
| `/about` | Track concept, safety narrative, visuals |
| `/events` | Coming soon — future races and private bookings |
| `/blog` | News and announcements (Astro Content Collections) |
| `/contact` | Map, address, hours, social links |

## Environment Variables

Store in Netlify dashboard. Never commit to source control.

```bash
# copy from .env.example
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=   # Netlify Functions only — never in frontend bundle
GA4_MEASUREMENT_ID=
META_PIXEL_ID=
```

## Booking Flow

```
Booking form → Netlify Function (submit-booking.ts)
            → Supabase Postgres (bookings table)
            → Email notification to owner (Brevo / Resend)
```

Supabase Row Level Security is required: INSERT-only for public, no anonymous SELECT.

## Brand Colors

| Token | Hex | Use |
|-------|-----|-----|
| Deep Racing Red | `#A80E0E` | Primary backgrounds |
| Speed Orange | `#FF6A1A` | Highlights, energy accents |
| Track Yellow | `#FFC928` | Secondary highlights |
| Asphalt Dark | `#2A120D` | Outlines, shadows |
| Clean White | `#FFFFFF` | Content areas |
| Warm Cream | `#FFF4E8` | Soft backgrounds |
| Action Blue | `#1FA9FF` | Buttons, links, CTAs **only** |

Blue is reserved for interactive/clickable elements. Do not use it decoratively.

## Pre-Launch Checklist

- [ ] All images converted to WebP/AVIF
- [ ] Supabase RLS enabled on `bookings` table
- [ ] GA4 and Meta Pixel IDs set in Netlify env
- [ ] `LocalBusiness` + `FAQPage` JSON-LD validated
- [ ] `sitemap.xml` submitted to Google Search Console
- [ ] Form submission tested end-to-end on Netlify preview
- [ ] Email notification confirmed on real booking
- [ ] Mobile viewports tested: 320px, 375px, 768px
- [ ] Facebook and Instagram links verified
- [ ] Custom domain + HTTPS active on Netlify

## Social

- Facebook: https://www.facebook.com/gensangokart
- Messenger: https://m.me/gensangokart
- Instagram: https://www.instagram.com/gensangokart *(confirm handle before going live)*
