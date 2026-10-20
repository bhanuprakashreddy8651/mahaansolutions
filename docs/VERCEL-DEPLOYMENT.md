# Vercel deployment

1. Import `bhanuprakashreddy8651/mahaansolutions` in Vercel after the source push succeeds.
2. Select the `main` branch, Next.js framework, root directory `.`, install command `npm ci`, build command `npm run build`, and the default Output Directory.
3. Do not enable `SITES_STATIC_PREVIEW`; Vercel deploys the full Next.js application, not the separate static Sites export.
4. Deploy. The portfolio and direct email, phone, and WhatsApp links work without a database. The form stays in downloadable-brief mode.
5. Set `NEXT_PUBLIC_SITE_URL` to your public HTTPS origin and redeploy. This sets canonical metadata and sitemap links. Share that public URL to finish the Dussehra poster's QR code. Check that visitors can open it in a signed-out browser; Vercel deployment protection must not restrict the customer-facing URL.

Optional live enquiries require `DATABASE_URL`, `ADMIN_PASSWORD` (at least 16 characters), `ADMIN_SESSION_SECRET` (at least 32 characters), `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`. Use a verified sender and provision the Prisma schema in the intended database before enabling enquiries. Admin remains protected and credentials are never embedded into client code. `.env.example` is a template, not production configuration.

The existing build command runs `prisma generate` before `next build`. Vercel's native Next.js deployment should keep that step so cached installations do not retain an outdated Prisma client.

Official references:
- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://vercel.com/docs/git
- https://www.prisma.io/docs/orm/v7/more/troubleshooting/nextjs
