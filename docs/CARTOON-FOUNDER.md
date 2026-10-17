# Founder illustrated presenter

The active founder uses the generated likeness artwork rather than the previous procedural Three.js model. Face, hair, beard, lean build and navy suit follow the detailed reference. Three poses welcome visitors, demonstrate services and invite contact.

One persistent DOM presenter interpolates position and size between hero, services and closing. Poses crossfade. Entrance replay, subtle breathing motion, captions and optional English browser narration provide the presentation. Pause and reduced-motion preferences stop decorative motion. No WebGL is required.

This is a 2D illustrated presentation with motion, not a rigged 3D character or lip-synced video. The founder voice is not recorded or cloned. No likeness was submitted to Google Flow to bypass its previous rejection.

Assets: public/images/founder/presenter-sheet.png and presenter-{welcome,present,invite}.webp. Built-in ImageGen produced the artwork. Sharp crops and optimizes sprites, preserving alpha. The prompt is in docs/PRESENTER-PROMPT.txt.

Verification: scripts/cartoon-qa.cjs checks loaded artwork, removal of the primitive canvas, entrance replay, all three service scenes, closing, pause, mobile overflow and browser errors. Screenshots in docs/cartoon-*.png show the tested appearance.

The static enquiry form prepares a downloadable brief. Direct email, phone and WhatsApp contact remain available. Database submission needs configured server credentials.

## Continuous puppet animation update

FounderPuppet.tsx now renders a textured triangle mesh from the likeness artwork. Weighted deformation moves the wave independently around the elbow, nods the head, shifts body weight, and moves the service-presenting hand. Brief eyelid closures and playback-driven mouth shapes add facial motion. A CSS landing sequence handles entrance; the character continues animating afterward. No video service or identity filter workaround is used.

This is a local 2D mesh puppet, not a fully modeled 3D body. Mouth motion is stylized and playback-driven, not phoneme-accurate lip sync. The original artwork is retained and animated at runtime.

scripts/puppet-qa.cjs compares actual canvas pixels across frames, checks narration-to-mouth state, service scenes, frozen pixels on pause, reduced motion, and mobile overflow. Browser narration is stubbed in this test to make playback-state testing deterministic. docs/founder-motion-demo.webm records the live canvas, showing actual motion. The earlier scripts/cartoon-qa.cjs checks the superseded still-pose version; use puppet-qa.cjs for the current renderer.

## Homepage landing, crossing and speech

The introduction button now replays a 5.2-second entrance: land at the left (0–1.1 seconds), cross the stage with alternating leg movement (1.1–4.8 seconds), then settle at the right. Optional English browser speech begins 1.2 seconds after the button press, following landing and during the crossing. It does not autoplay audio on first load. Reduced-motion skips the crossing and plays speech without the entrance delay.

scripts/entrance-qa.cjs verifies delayed speech, walking state, increasing horizontal position, settled introduction and reduced motion. Existing puppet checks cover rendered-frame changes, speech state, services, pause and mobile overflow. Mouth motion remains stylized rather than phoneme-accurate.
