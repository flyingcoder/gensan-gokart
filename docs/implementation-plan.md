# GenSan GoKart — Implementation Plan

## Project Overview

A static-first Astro marketing website for GenSan GoKart, an off-road go-kart experience in General Santos City. The site is conversion-focused: drive visitors from curiosity to a confirmed booking.

**Hosted on:** Netlify  
**Database:** Supabase Postgres (leads and bookings)  
**Analytics:** GA4 + Meta Pixel  

---

## Phase 1 — Project Scaffold

**Goal:** Working Astro + Tailwind project deployed to Netlify with CI/CD wired up.

### Tasks

1. Initialize Astro project (`npm create astro@latest`)
2. Install and configure Tailwind CSS via `@astrojs/tailwind`
3. Configure `astro.config.mjs` for static output
4. Set up Netlify adapter (`@astrojs/netlify`) and `netlify.toml`
5. Push to GitHub; connect repo to Netlify for CI/CD
6. Set Netlify environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GA4_MEASUREMENT_ID`
   - `META_PIXEL_ID`
7. Add CSS design tokens to `src/styles/tokens.css`:
   ```
   Deep Racing Red:   #A80E0E
   Burnt Red:         #7E0A0A
   Speed Orange:      #FF6A1A
   Track Yellow:      #FFC928
   Asphalt Dark:      #2A120D
   Clean White:       #FFFFFF
   Warm Cream:        #FFF4E8
   Charcoal Text:     #221815
   Muted Gray:        #6E625D
   Action Blue:       #1FA9FF
   Action Blue Hover: #0077CC
   ```
8. Extend Tailwind config with brand color aliases

**Deliverable:** Astro dev server runs; empty site deploys to Netlify preview URL.

---

## Phase 2 — Layout and Shared Components

**Goal:** Reusable shell that every page inherits.

### Components

| Component | File | Notes |
|-----------|------|-------|
| Base layout | `src/layouts/BaseLayout.astro` | Head, SEO meta, GA4/Pixel scripts, font preload |
| Nav | `src/components/Nav.astro` | Mobile hamburger, links to all pages |
| Footer | `src/components/Footer.astro` | Address, social links, booking CTA, copyright |
| Button | `src/components/ui/Button.astro` | Primary (blue), secondary (outlined), variants |
| SectionWrapper | `src/components/ui/SectionWrapper.astro` | Consistent vertical padding / max-width |

### SEO Defaults

- `<title>`, `<meta name="description">`, Open Graph tags in `BaseLayout`
- `LocalBusiness` JSON-LD schema injected in layout
- `robots.txt` and `sitemap.xml` via `@astrojs/sitemap`

**Deliverable:** All pages share a consistent shell; nav and footer render on every route.

---

## Phase 3 — Home Page (Primary Conversion Page)

**Goal:** Full visitor flow from Hero to Footer CTA in a single page.

### Sections (in order)

#### 3.1 Hero
- Full-viewport background: racing photo or dirt-track visual
- Headline: punchy, localized (e.g., "General Santos' Wildest Off-Road Go-Kart Track")
- Supporting subtext (1–2 lines)
- **Primary CTA:** `Book Your Ride` → `/booking`
- **Secondary CTA:** `View Promos` → `/packages`

#### 3.2 Experience Preview
- 3–4 feature cards: Off-road Racing, Family Bonding, Barkada Challenge, Team Building
- Short emotional copy per card
- Action-focused imagery or icons

#### 3.3 Promo Packages (Preview)
- 3 package cards side-by-side (stacked on mobile):
  - Family Package (3–6 pax)
  - Barkadahan Package (7–10 pax)
  - Team Building Package (10+ pax)
- Each card: who it's for, key inclusions, **CTA:** `Reserve This Package`
- Link to full `/packages` page

#### 3.4 Latest Announcement
- Automatically pulls the most recent blog/news post
- Shows: section label "Latest Announcement", title, excerpt, date, featured image, `Read More` CTA
- Placed between Packages and FAQ

#### 3.5 Safety / FAQ
- Accordion-style FAQ:
  - Is it safe?
  - Is it beginner-friendly?
  - What should riders wear?
  - Is booking required?
  - Age/height requirements

#### 3.6 Booking Form (Inline)
- Fields: Name, Phone/Messenger, Preferred Date, Number of Riders, Package Selection
- Submit → Netlify Function → Supabase
- Success message shown inline; no page redirect

#### 3.7 Footer CTA
- Bold prompt to book or message on Facebook/Messenger

**Deliverable:** Home page renders all sections; form submits without errors.

---

## Phase 4 — Supporting Pages

### 4.1 Packages Page (`/packages`)

- Full package breakdown for all three tiers
- Side-by-side comparison table
- Per-package `Reserve This Package` CTAs linking to `/booking?package=...`

### 4.2 Booking Page (`/booking`)

- Standalone booking form (same fields as home inline form)
- Pre-selects package if `?package=` query param is present
- Form submits to Netlify Function → Supabase

### 4.3 About / Experience Page (`/about`)

- Off-road go-kart concept explanation
- Family, barkada, and team-building positioning
- Safety-focused narrative
- Photos/visuals of the track

### 4.4 Events Page (`/events`)

- "Coming Soon" layout
- Teaser text for future events, races, and private bookings
- Facebook follow CTA + email subscription prompt

### 4.5 Blog / News Page (`/blog`)

- List of posts: title, excerpt, date, featured image
- Posts are Astro Content Collections (Markdown)
- Pagination if needed

### 4.6 Single Post Page (`/blog/[slug]`)

- Title, date, featured image, full content
- CTA at the bottom: `Book Now` or `View Packages`

### 4.7 Contact / Location Page (`/contact`)

- Embedded Google Map
- Address, phone, opening hours
- Facebook and Messenger links
- Inquiry CTA

**Deliverable:** All routes return 200; content is readable and mobile-correct.

---

## Phase 5 — Supabase Integration

**Goal:** Form submissions stored securely in Postgres.

### Database Schema

```sql
CREATE TABLE bookings (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text NOT NULL,
  phone          text NOT NULL,
  preferred_date date,
  riders         int,
  package        text,
  notes          text,
  created_at     timestamptz DEFAULT now()
);
```

### Netlify Function (`netlify/functions/submit-booking.ts`)

1. Validate required fields (name, phone)
2. Insert row via Supabase service-role client
3. Return `200 { success: true }` or `400/500` with error message
4. Trigger email notification (see Phase 6)

### Security

- Service role key lives only in Netlify env vars — never in frontend bundle
- Enable Row Level Security on `bookings` table
- Public policy: INSERT only; no anonymous SELECT

**Deliverable:** Form submission creates a row in Supabase; RLS is active.

---

## Phase 6 — Notifications and CRM

**Goal:** Owner receives an alert for every new booking.

### Options (choose one)

| Option | Cost | Effort |
|--------|------|--------|
| Brevo (free tier) | Free | Low |
| Supabase Edge Function + Resend | Free tier | Medium |
| Zapier webhook | Free tier | Low |

**Recommended:** Brevo SMTP — call from the Netlify Function immediately after the Supabase insert. Send a plain-text email to the owner with booking details.

**Deliverable:** Owner receives email within 60 seconds of a form submission.

---

## Phase 7 — Analytics

**Goal:** Track key conversion events.

### GA4 Events

| Event | Trigger |
|-------|---------|
| `book_now_click` | Any "Book Your Ride" / "Book Now" button |
| `view_packages_click` | "View Promos" / "View Packages" button |
| `reserve_package_click` | Per-package CTA |
| `form_submission` | Booking form success |
| `faq_expand` | FAQ accordion open |

### Meta Pixel Events

| Event | Trigger |
|-------|---------|
| `ViewContent` | Packages page view |
| `InitiateCheckout` | Booking page view |
| `Lead` | Form submission success |

### Implementation

- GA4 and Meta Pixel scripts injected in `BaseLayout` from env vars
- Event fires triggered via `gtag()` / `fbq()` calls in `<script>` tags co-located with the relevant components

**Deliverable:** GA4 DebugView and Meta Pixel Helper confirm events fire correctly.

---

## Phase 8 — SEO and Performance

**Goal:** Pass Core Web Vitals; rank for local go-kart searches.

### SEO

- Unique `<title>` and `<meta name="description">` per page
- `LocalBusiness` JSON-LD on homepage and contact page
- `FAQPage` JSON-LD on homepage FAQ section
- Canonical URLs via `@astrojs/sitemap`
- `alt` text on every image

### Images

- Convert all images to WebP/AVIF at build time via `@astrojs/image` or `sharp`
- Explicit `width` and `height` on every `<img>`
- `fetchpriority="high"` on hero image only; `loading="lazy"` everywhere else

### Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FCP | < 1.5s |
| JS bundle (gzipped) | < 80kb (microsite budget) |

**Deliverable:** Lighthouse score ≥ 90 on mobile for Home and Booking pages.

---

## Phase 9 — Pre-Launch Checklist

- [ ] All images converted to WebP/AVIF
- [ ] RLS enabled on Supabase `bookings` table
- [ ] GA4 measurement ID set in Netlify env
- [ ] Meta Pixel ID set in Netlify env
- [ ] `LocalBusiness` + `FAQPage` schema validated via Google's Rich Results Test
- [ ] `robots.txt` allows crawling; `sitemap.xml` submitted to Google Search Console
- [ ] Form submission tested end-to-end (dev → Netlify preview → production)
- [ ] Email notification confirmed on real booking
- [ ] Mobile viewport tested at 320px, 375px, 768px
- [ ] Facebook and Instagram links confirmed
- [ ] Custom domain configured in Netlify; HTTPS active
- [ ] No hardcoded secrets in source code

---

## Build Order Summary

```
Phase 1  →  Scaffold (Astro + Tailwind + Netlify CI/CD)
Phase 2  →  Shared layout, Nav, Footer, UI primitives
Phase 3  →  Home page (all 7 sections)
Phase 4  →  Supporting pages (Packages, Booking, About, Events, Blog, Contact)
Phase 5  →  Supabase schema + Netlify Function
Phase 6  →  Email notifications
Phase 7  →  GA4 + Meta Pixel events
Phase 8  →  SEO hardening + image optimization
Phase 9  →  Pre-launch audit
```

Each phase should be committed and deployed to a Netlify preview branch before advancing.
