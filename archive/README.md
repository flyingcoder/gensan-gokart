# GenSan GoKart – Marketing site

Mobile-first, single-page marketing website for GenSan GoKart.

## Run locally

- **Option A:** Open `index.html` in a browser (some features like Maps embed may be restricted over `file://`).
- **Option B:** Serve the folder with any static server, e.g.  
  `npx serve .` or `python3 -m http.server 8000` then open `http://localhost:8000`.

## Before going live

1. **Replace placeholders**
   - `YOUR_PAGE` in Messenger/FB and social links (e.g. `https://m.me/YOUR_PAGE`, Facebook/Instagram URLs).
2. **Pricing / Notify me**
   - Form is front-only; hook it to your backend or a service (e.g. Formspree, Supabase) to store name + phone.
3. **Gallery**
   - Swap the two placeholder slides for real poster-style images (same folder or paths in HTML).
4. **Countdown**
   - Default target is end of March; change the date in `main.js` (`target` in `updateCountdown`) if needed.

## Assets

- `assets/logo.png` – GS GK logo
- `assets/hero-banner.png` – Hero background

Design: Deep Red → Crimson, Orange/Yellow accents, Bebas Neue/Anton headings, Inter body, angled dividers, halftone, speed streaks, thick white stroke on badges.
