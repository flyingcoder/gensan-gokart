Use the following tech stack and architecture for the marketing website:

Frontend Framework:
- Use Astro for the website.
- Build the site as a fast, static-first marketing website.
- Use Astro components for reusable sections such as hero, promos, booking, FAQ, and footer.

Styling:
- Use Tailwind CSS for all layout, spacing, colors, typography, buttons, and responsive design.
- Keep the design lightweight, clean, mobile-first, and conversion-focused.

Hosting:
- Host the website on Netlify.
- Use Netlify for static hosting, deploy previews, environment variables, and CI/CD from GitHub.

Pages:
- Generate static marketing pages using Astro.
- Pages should load fast, be SEO-friendly, and use minimal JavaScript.

Booking / Lead Form:
- Add a booking or lead form on the website.
- When the form is submitted, send the data to Supabase Postgres.

Backend Handling:
- Prefer Netlify Functions for form submission handling because it works well with Netlify hosting.
- Use Astro server endpoints only if they are simpler and supported by the deployment setup.
- Choose the free or cheaper option whenever possible.

Database:
- Use Supabase Postgres to store leads, bookings, customer inquiries, promo selections, and form submissions.

Security:
- Do not expose private Supabase service keys in frontend code.
- Store private keys only in Netlify environment variables.
- Use Row Level Security in Supabase.

Notifications:
- After a successful form submission, trigger an email notification or CRM automation.

CRM / Automation:
- Connect Supabase form data to email, CRM, or automation tools when needed.
- Possible tools: Brevo, Mailchimp, HubSpot, GoHighLevel, Zapier, Make, or Supabase Edge Functions.

Analytics:
- Add GA4 and Meta Pixel for traffic and conversion tracking.
- Track button clicks, form submissions, booking intent, and promo interest.

SEO:
- Use Astro SEO best practices.
- Add LocalBusiness schema and FAQ schema.
- Optimize images as WebP or AVIF.

Architecture Flow:
Astro Website
→ Static marketing pages hosted on Netlify
→ Booking / lead form
→ Netlify Function or Astro server endpoint
→ Supabase Postgres
→ Email notification / CRM automation
