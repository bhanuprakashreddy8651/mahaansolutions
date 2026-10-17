# Cartoon founder presentation

The active website uses one procedural Three.js cartoon character inspired by the supplied founder photo: black wavy hair, full beard, warm brown skin, lean proportions and navy/gold clothing. It is a stylized interpretation, not a scan or an exact facial likeness.

The locally animated character arrives, waves, breathes, blinks, follows the pointer subtly and gestures beside services. One persistent canvas tracks hero, service and closing anchors. Service chapters update the optional English narration. Speaking motion follows playback state; it does not implement phoneme-level lip sync. Reduced-motion preference stops character motion; the service preview also has a pause control.

`public/images/founder/cartoon.png` is a generated visual concept and WebGL fallback, not the rigged 3D model. The rig is authored in `src/components/CartoonFounder.tsx`. No company background films are used. No cartoon likeness was submitted to Google Flow to bypass its prior identity rejection.

Verification: `node scripts/cartoon-qa.cjs` checks the persistent renderer, three service scenes, closing, pause, mobile overflow and browser errors. Screenshots: docs/cartoon-hero.png, cartoon-services.png, cartoon-closing.png, cartoon-mobile.png. Existing validation/security suite: 12 passing tests.

The hosted static preview retains direct email, phone and WhatsApp contact. Database enquiries require the server environment and configured credentials; the static enquiry form prepares a downloadable brief.
