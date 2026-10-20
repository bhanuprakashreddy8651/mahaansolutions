# Responsive layout verification — 20 October 2026

The hero uses screen width to size its two columns and portrait. Short laptop screens scroll naturally instead of shrinking the entire composition. The complete 4:5 portrait uses object-fit: contain and has a full-image dialog.

Navigation changes to a menu at 1024px. Phone layouts stack the hero, service explorer and contact fields. Form input text is at least 16px. Headings and card links wrap without horizontal overflow. Wide desktop content is capped at 1280px for readability.

Verified production static output at 320, 360, 390, 430, 768, 820, 1024, 1280, 1366, 1440, 1920 and 2560px widths. All passed: no horizontal overflow, uncropped portrait within its section, navigation, service journey, scroll-triggered phone link, form sizing and portrait dialog. Navigation anchors leave approximately 20px below the sticky header on desktop/tablet and 16px on phones.

Validation: full Next.js production build including API routes; static preview build; 12 unit tests; scripts/responsive-qa.cjs; scripts/navigation-qa.cjs; scripts/portrait-layout-qa.cjs. Browser checks use Edge/Chromium emulation rather than physical devices.

Public website and poster QR destination: https://mahaansolutions.vercel.app. Set NEXT_PUBLIC_SITE_URL to this origin in Vercel for canonical metadata and sitemap generation.
