# Founder illustrated presenter

The active founder uses the generated likeness artwork rather than the previous procedural Three.js model. Face, hair, beard, lean build and navy suit follow the detailed reference. Three poses welcome visitors, demonstrate services and invite contact.

One persistent DOM presenter interpolates position and size between hero, services and closing. Poses crossfade. Entrance replay, subtle breathing motion, captions and optional English browser narration provide the presentation. Pause and reduced-motion preferences stop decorative motion. No WebGL is required.

This is a 2D illustrated presentation with motion, not a rigged 3D character or lip-synced video. The founder voice is not recorded or cloned. No likeness was submitted to Google Flow to bypass its previous rejection.

Assets: public/images/founder/presenter-sheet.png and presenter-{welcome,present,invite}.webp. Built-in ImageGen produced the artwork. Sharp crops and optimizes sprites, preserving alpha. The prompt is in docs/PRESENTER-PROMPT.txt.

Verification: scripts/cartoon-qa.cjs checks loaded artwork, removal of the primitive canvas, entrance replay, all three service scenes, closing, pause, mobile overflow and browser errors. Screenshots in docs/cartoon-*.png show the tested appearance.

The static enquiry form prepares a downloadable brief. Direct email, phone and WhatsApp contact remain available. Database submission needs configured server credentials.
