# Mahaan Solutions portfolio

## Current version — company-first navy and gold

The active homepage uses one founder appearance, a single-film integration, company-focused information, interactive brand artwork, animated marketing/CRM/software previews, and a brand-led closing section. Repeated founder portraits and the portrait style selector were removed from the active page. `src/styles/brand-v3.css` now follows representative colours sampled from the supplied logo: navy `#183048`, metallic gold `#d8a848`, deep blue backgrounds, and pearl-white surfaces. The light header keeps the navy subtitle legible.

The user selected Google Flow and approved its image-rights prompt. One realistic entrance/self-introduction render was attempted. **Flow rejected it with its prominent-people policy check; no founder video exists.** Its refund message was shown, but refund completion was not verified. See `docs/FLOW-RENDER-STATUS.md` for the project link, exact status, pending shot sequence, and legitimate completion routes. The site deliberately remains in poster mode until an actual reviewed film is supplied.

Active components: `HomeHero.tsx`, `FounderPerformance.tsx`, `CompanySections.tsx`, `CompanyCore.tsx`, `ServicesExperience.tsx`, and `SolutionVisual.tsx`. The earlier founder-gallery components remain in source history/reference but are not rendered on the homepage. `FounderPerformance` moves one actual video element from the hero to a small service dock when a film is configured; it does not duplicate the person in every section. CompanyCore has a persistent CSS brand fallback for devices or captures where the WebGL layer cannot be displayed.

Checks for the active design: `node scripts/company-qa.cjs` against localhost:3001, in addition to the existing enquiry/security tests and browser workflow checks. The earlier `founder-qa.cjs` targets the superseded portrait-gallery design and should not be used to validate this version.

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

## Founder presentation v2

The home page now includes three AI-styled founder portraits, an interactive style selector, scroll-linked shrinking in the hero, a smaller sticky service presenter, service-aware captions, optional English browser narration, and a new closing contact scene. Browser narration is a generic device/browser voice, not a recording or clone of the founder. Google Flow videos are not included; the player and media-error fallbacks are ready for reviewed exports.

Use `src/data/founder-scenes.ts` for scripts and video/caption sources. Components are split across `FounderHero.tsx`, `FounderVoice.tsx`, `ServiceShowcase.tsx`, and `FounderClosing.tsx`; presentation CSS is in `src/styles/founder-experience.css`. High-resolution references are saved in `output/flow-images/`; full image prompts are in `docs/FOUNDER-IMAGE-PROMPTS.json`.

## Visual/media notes

The original founder photograph is preserved. The generated portraits change wardrobe, lighting and pose while aiming to preserve identity; they are styled likenesses, not an exact human reconstruction. Mouse movement adds mild depth; procedural Three.js orbits load on capable desktop browsers only. Reduced-motion users get static visuals. The supplied logo has an edited derivative. See `docs/FOUNDER-VIDEO.md` for Google Flow shot prompts, English scripts, and video integration instructions.

## Hosted preview

`node scripts/build-preview.cjs` exports a static Next.js preview to `out/`, temporarily excluding server API routes and restoring them in a `finally` block. The preview includes the complete visual experience, service pages, direct contact links, and downloadable briefs. Server enquiries and admin storage require the Node deployment described above. The static preview intentionally keeps enquiry submission disabled. Do not confuse a hosted static preview with a configured live enquiry backend.

## Verification limits

Live PostgreSQL persistence, provider email receipt, and authenticated administration require external credentials. No Lighthouse scores are claimed. Privacy and terms are draft copy requiring business/legal review. Detailed scope and sample process copy need business review. Do not represent the concept gallery as client work. Browser verification results are recorded in `docs/browser-qa.json`.
