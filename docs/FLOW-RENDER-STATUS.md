# Founder performance — actual generation status

Project: [Mahaan Solutions — Founder Entrance & Company Film](https://flow.google.com/project/abb10d27-fa11-4286-bf32-fe5342b981dc).

The user selected Google Flow and signed in. The full-length styled founder reference was uploaded. The user explicitly confirmed the “Rights to use this image” agreement.

One 8-second, 720p, portrait 9:16, single-output generation was submitted using the Quality video setting available in Flow. It requested two natural entrance steps, a realistic weight settle, and the exact English line: “Hello, I'm Bhanu Prakash Reddy, founder of Mahaan Solutions.”

**Flow rejected the render. No founder video was created.** The displayed reason was: “This prompt might violate our policies about generating prominent people.” Flow said the generation would be refunded; refund completion was not verified. This is a platform classification, not a claim that the founder is a prominent person. No altered-identity or renamed-person retry was attempted.

## Intended film

| Shot | Intended action | Exact dialogue |
| --- | --- | --- |
| A, about 8 seconds | Enter from the right, take two natural steps, settle both feet onto a real studio floor, make eye contact | “Hello, I'm Bhanu Prakash Reddy, founder of Mahaan Solutions.” |
| B, about 8 seconds | Same outfit, camera, studio, and voice; small conversational hand gesture | “We offer digital marketing, CRM development and maintenance, and software development. Your vision, our solutions.” |
| C, about 8 seconds | Gentle downward open-hand gesture, then a welcoming expression | “To explore our services, scroll down and take a look. Let's discuss your next idea.” |

Use the supplied identity and lean body proportions; navy tailoring and ivory shirt; a deep-navy architectural studio with metallic-gold accents; realistic hands, blinking, breathing and lip sync. No superhuman landing, flying, foot sliding, body morphing, captions or embedded branding. Keep the original face. All titles and CTAs belong in the website, not in the render.

These are pending shot directions, not completed media. Further generation requires the platform restriction to be resolved through its legitimate account/review process. Alternatively, real recorded founder footage can provide the actual movement and speech without a generated likeness.

## Application integration

The redesigned site uses one founder appearance in the hero. Services have animated product/system visuals; company and closing sections have brand-led 3D/typographic artwork, not more founder portraits.

After a real reviewed film exists, concatenate approved shots into `public/videos/founder/intro.mp4`, produce accurately timed captions at `public/captions/founder/intro.vtt`, then set `founderScenes.intro.video` and `.captions` in `src/data/founder-scenes.ts`.

`FounderPerformance.tsx` uses one persistent video element: muted arrival playback when motion preferences permit; click-to-play with sound; forward-only speech; a service-section mini dock; a scroll-invitation CTA at the end; replay/stop through the voice controls; and a poster on media failure. Until the real file is provided, the source remains empty and the site intentionally identifies the hero as poster mode.

This is a film-based human presentation plus interactive 3D brand/system artwork. It is not a rigged 360-degree 3D reconstruction of the founder.
