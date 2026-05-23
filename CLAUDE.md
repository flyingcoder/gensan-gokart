# GenSan GoKart

Astro marketing site — static-first, mobile-first, hosted on Netlify.

## Dev commands

```bash
npm run dev        # Astro dev server → http://localhost:4321
npm run build      # production build
npm run preview    # preview production build locally
```

## Stack

- **Framework**: Astro (static-first, SSG)
- **Styling**: Tailwind CSS
- **Hosting**: Netlify (CI/CD from GitHub, environment variables)
- **Database**: Supabase Postgres (leads, bookings, form submissions)
- **Form handling**: Netlify Functions
- **Analytics**: GA4 + Meta Pixel

## Site structure

Visitor flow (`docs/visitor-flow.md`):
Hero → Experience Preview → Promo Packages → Safety / FAQ → Booking Form → Footer CTA

Packages: Family (3–6 pax), Barkadahan (7–10 pax), Team Building (10+ pax)

## Design references

- `docs/color-pallete-design-guide.md` — red/orange brand palette; blue for CTAs only
- `docs/visitor-flow.md` — section content and conversion intent
- `docs/tech-stack.md` — architecture decisions

## Environment variables (Netlify dashboard only — never commit)

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY` (replaces service role key — use for client-side and Netlify Functions)
- `GA4_MEASUREMENT_ID`
- `META_PIXEL_ID`

> Supabase no longer uses `SUPABASE_SERVICE_ROLE_KEY`. Use `SUPABASE_PUBLISHABLE_KEY` or a direct connection string. Rely on RLS policies for row-level security.

## Social links

- Facebook: https://www.facebook.com/gensangokart
- Messenger: https://m.me/gensangokart
- Instagram: https://www.instagram.com/gensangokart _(confirm handle before going live)_

## Before going live

- Enable Supabase RLS on all tables
- Add GA4 measurement ID and Meta Pixel ID
- Add LocalBusiness + FAQ schema to Astro SEO config
- Convert all images to WebP or AVIF

## Archive

Original vanilla HTML/CSS/JS prototype is in `archive/`. Do not edit it.
