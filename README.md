# Mahaan Solutions portfolio

Responsive Next.js portfolio for MAHAAN SOLUTIONS PRIVATE LIMITED.

The current design uses ivory, navy and metallic gold, a seated AI-assisted founder portrait with a full-image viewer, interactive service journeys, concept previews, process tabs, FAQs, and direct contact links. The floating phone button appears after the homepage hero. No human puppet or generated founder video is mounted.

## Local development

```sh
npm ci
npx prisma generate
npm run dev
```

Open http://localhost:3000. Run `npm test` for validation/security checks. `npm run build` generates Prisma Client and builds the complete Next.js application; `npm start` serves production.

## Deploy to Vercel

Import this repository, select **Next.js**, use root directory `.`, build command `npm run build`, and leave Output Directory at the framework default. `vercel.json` records the framework/build settings. Do not set `SITES_STATIC_PREVIEW=true` on Vercel and do not use `out` as the Output Directory.

The public portfolio can launch without database or email credentials. The enquiry form then prepares a downloadable brief; direct email, phone and WhatsApp links remain available. Add `NEXT_PUBLIC_SITE_URL` with the public HTTPS deployment origin after the first deployment and redeploy so metadata and sitemap use the public domain.

See [docs/VERCEL-DEPLOYMENT.md](docs/VERCEL-DEPLOYMENT.md) for the optional live-enquiry setup. Never commit actual secrets. `.env.example` contains placeholders only.

## Confirmed company details

- Founder: PULLURU BHANU PRAKASH REDDY
- Services: Digital Marketing; Software Development; CRM Development & Maintenance
- Email: BHANU8651@GMAIL.COM
- Phone: +91 99599 29328

Public content is maintained in `src/data/company.ts`. Showcase work is explicitly illustrative, not verified client work. The founder studio portrait is AI-assisted, based on the supplied original photograph. Original assets and generation prompts are retained.

## Verification and hosting notes

Current browser checks: `scripts/editorial-qa.cjs`, `scripts/navigation-qa.cjs`, and `scripts/portrait-layout-qa.cjs`, using localhost:3001. Older puppet/gallery checks target superseded designs.

`scripts/build-preview.cjs` creates the separate static Sites preview while retaining backend source. `.openai/hosting.json` belongs to that existing private preview; it is not required by Vercel. Build output, node_modules, local environment files, and temporary build folders are ignored.
