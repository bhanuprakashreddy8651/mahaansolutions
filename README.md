# Mahaan Solutions portfolio

Next.js App Router / React / strict TypeScript / Tailwind 4 / React Three Fiber / PostgreSQL + Prisma / Zod. A responsive editorial portfolio with the supplied founder portrait, optional WebGL orbit scene, three confirmed service routes, interactive concept previews, process tabs, FAQs, enquiry preparation, and protected administration.

## Run

Requires Node 20.19+.

```sh
npm install
npx prisma generate
npm run dev
```

Open http://localhost:3000. `npm run build` and `npm start` run production. `npm test` tests validation and session boundaries. `npm run typecheck` checks TypeScript.

## Company content

Edit `src/data/company.ts` to curate services, process steps, concepts, and business information. The owner confirmed digital marketing, CRM development and maintenance, software development, founder PULLURU BHANU PRAKASH REDDY, email BHANU8651@GMAIL.COM, and phone 9959929328. The Indian +91 country code is used for callable links. No client results, endorsements, or addresses are invented. Scope details and process copy are suggested and agreed for each project.

The navy-and-gold logo is an edited derivative of the supplied main logo with “Marketing” removed from its subtitle. Originals are preserved under `public/images/brand/`. The generated derivative is not a pixel-identical reconstruction. Use the supplied source artwork for any future vector/master logo production.

The protected admin interface supports private company/service editorial drafts. Drafts are stored in PostgreSQL, intentionally not auto-published. Public data remains source-controlled and needs editorial review before publication. This distinction is shown in the admin UI.

## Enable live enquiries

1. Copy `.env.example` to `.env.local` and configure a PostgreSQL database, random admin password (at least 16 characters), random session secret (at least 32 characters), and Resend sender/recipient/API key. Verify the sender domain in Resend.
2. Run `npm run db:push` to provision the schema for initial setup. Use reviewed migrations for an established production database.
3. Review privacy/terms drafts with the business, publish the real privacy contact and retention period, confirm services, and set `NEXT_PUBLIC_SITE_URL` to the deployment origin.
4. Deploy on a Node-capable Next.js platform, configure the same environment variables there, and run a real end-to-end enquiry before launch.

The public form stays in download-only preview mode until all delivery settings are present. The server validates all input, rejects other origins, enforces a honeypot and PostgreSQL-backed rate limits, saves a unique reference, then attempts an email notification. Email failure does not erase a persisted lead; admin shows notification status. Add an operational alert or retry job for failed notifications before relying on email alone.

Admin is at `/admin`. Authentication uses a signed eight-hour HttpOnly SameSite=Strict cookie (Secure in production), constant-time password comparison, server-side checks on every protected endpoint, origin checks for mutations, and database-backed login rate limits. This is a single owner role, not a multi-user RBAC product. Deploy behind HTTPS. Configure trusted-proxy IP handling only if your platform overwrites the forwarded header; otherwise rate limiting is shared across visitors. Review logs without recording personal form payloads.

## Operations and retention

Admin can search/filter up to 500 leads, update status and internal notes, export the displayed records as CSV, and permanently delete records for retention/privacy requests. CSV formula prefixes are neutralised. Review retention with the owner. Periodically delete expired `RateLimit` rows (`resetAt < NOW()`) and apply the approved lead retention schedule through an authenticated operations job. No campaign analytics or CRM integration is installed.

## Visual/media notes

The founder photograph is supplied by the user and is displayed without altering the face. Mouse movement adds mild depth; a separate procedural Three.js orbital scene loads on capable desktop browsers only. CSS supplies the visual fallback. Reduced-motion users receive static visuals. No Google Flow video, full human GLB, or logo was supplied. See `docs/FOUNDER-VIDEO.md` for shot prompts and integration instructions.

## Hosted preview

`node scripts/build-preview.cjs` exports a static Next.js preview to `out/`, temporarily excluding server API routes and restoring them in a `finally` block. The preview includes the complete visual experience, service pages, direct contact links, and downloadable briefs. Server enquiries and admin storage require the Node deployment described above. The static preview intentionally keeps enquiry submission disabled. Do not confuse a hosted static preview with a configured live enquiry backend.

## Verification limits

Live PostgreSQL persistence, provider email receipt, and authenticated administration require external credentials. No Lighthouse scores are claimed. Privacy and terms are draft copy requiring business/legal review. Detailed scope and sample process copy need business review. Do not represent the concept gallery as client work. Browser verification results are recorded in `docs/browser-qa.json`.
