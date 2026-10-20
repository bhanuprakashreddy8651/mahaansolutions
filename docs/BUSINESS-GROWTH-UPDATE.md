# Business development and compact homepage update

The three services are Software Development, Digital Marketing and Business Development. Software includes CRM development, integrations and maintenance. Business Development covers opportunity mapping, positioning, lead qualification, sales pipeline planning, partnerships and growth reviews. Shared service data drives the cards, detail pages, sitemap and enquiry options; narration and service journeys use the same service names. The old standalone CRM URL redirects permanently to Software Development on the full Next.js deployment.

At desktop widths above 1024px and heights up to 850px, the hero uses a smaller header, tighter text spacing and a bounded portrait. Primary actions and narration controls are visible at 1280 × 632 and 1366 × 650 without cropping the image. Mobile keeps its natural stacked layout.

Validation: 13 unit tests; static preview build; full Next.js build using the existing generated Prisma client; business service/filter/journey/form checks; 12 responsive sizes; sticky navigation checks. Prisma regeneration initially encountered a Windows DLL lock in the running development environment; the production compilation succeeded using the existing generated client. No schema changed.
