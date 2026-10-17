# Founder film: Google Flow production and integration

> Current v3 status: Google Flow was opened and a founder entrance render was attempted after the user confirmed image rights. Flow rejected it with its prominent-people policy check; no video was created. See `FLOW-RENDER-STATUS.md` for the actual project, outcome and completion routes. The current homepage uses one founder appearance and company-led service visuals. The earlier three-portrait direction below is retained as reference material, not the active homepage specification. The current single-film player is `FounderPerformance.tsx`.

## Delivered and pending

Implemented: three ImageGen portrait treatments from the supplied photograph, portrait style switching, a hero that recedes while scrolling, a smaller sticky service presenter, service-aware captions, an optional English voice tour, and a founder-led contact finale. Original photo preserved. These are generated likenesses and layered 2.5D effects, not a body scan or rigged 3D human.

Google Flow is not connected here. No talking video or cloned founder voice is included. Browser narration is an optional guide, not a recording of the founder. Nothing speaks before the visitor presses Play. Stop, replay, and stopping on tab visibility changes are implemented.

## Reference analysis and image assets

Keep the original thick wavy black hair, connected full beard and moustache, warm skin tone, facial proportions, and lean build. Improve presentation through tailoring, posture, lighting, and framing. A single photograph cannot establish accurate unseen anatomy. The generated full-length pose is a styled interpretation, not a reconstruction.

| Purpose | High-resolution Flow reference | Optimised website image |
| --- | --- | --- |
| Cinematic introduction, navy blazer | `output/flow-images/01-cinematic-introduction.png` | `public/images/founder/hero.webp` |
| Full-length service presenter | `output/flow-images/02-service-presenter.png` | `public/images/founder/guide.webp` |
| Warm editorial closing, ivory shirt | `output/flow-images/03-warm-closing.png` | `public/images/founder/closing.webp` |

Built-in ImageGen was used. Exact image prompts: `docs/FOUNDER-IMAGE-PROMPTS.json`. Identity reference: `public/images/founder.png`. The service reference includes atmospheric lighting; not every pixel outside the person is fully transparent.

## Google Flow workflow

Google documents start frames and image Ingredients in its [Create videos in Flow guide](https://support.google.com/flow/answer/16353334?hl=en). [Speech from Frames to Video](https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-adds-speech-expands/) is also described by Google. Available options depend on your account and chosen model. Identity, dialogue, pronunciation, and lip sync must be reviewed; prompts do not guarantee an exact result.

1. Create a founder project and upload the original photo and the three styled references.
2. Use the matching styled image as the start frame. If Ingredients are available, retain the original as a character reference.
3. Use the same navy blazer through introduction and services; reserve ivory for the closing. Choose a supported portrait ratio, normally 9:16, and confirm the crop. Keep the head and hands inside the safe area.
4. Generate the short shots below separately, using an audio-capable setting available in Flow. Use natural English delivery with Indian pronunciation. This is a delivery direction, not a clone of the founder’s real voice. Matching his voice requires a supplied recording and an authorised voice workflow.
5. Review each shot for identity, name pronunciation, mouth motion, fingers, and exact dialogue. Retry individual failed shots.
6. Concatenate introduction A+B as `intro.mp4`, closing A+B as `closing.mp4`, and export each service separately. Leave a clean pause at both ends. Do not loop or reverse spoken footage.

## Shared direction — append to every prompt

> Preserve the reference founder’s facial proportions, wavy black hair, full beard, skin tone, and lean build. Photorealistic anatomy and skin texture; no face reshaping. Natural breathing, occasional blink, restrained head movement, relaxed shoulders, realistic hands and fingers. Warm professional English delivery with natural Indian pronunciation. Mouth movement follows only the quoted dialogue. No extra words, subtitles, logos, UI graphics, or other people. Maintain a consistent voice across clips. Website brand text and buttons will be separate HTML overlays.

## Copy-ready shot prompts

### Introduction A — about 8 seconds

Reference: `01-cinematic-introduction.png`.

> A photorealistic founder in a midnight navy tailored blazer and ivory open-collar shirt, in a dark navy architectural studio. Neutral soft face lighting, champagne rim lighting, subtle blue shadow fill. Head-to-mid-thigh portrait framing, direct eye contact, hands relaxed. Extremely slow short dolly in, warm slight smile. He says exactly: “Hello, I'm Pulluru Bhanu Prakash Reddy, founder of Mahaan Solutions Private Limited.” End with a natural pause. [Append shared direction.]

### Introduction B — about 8 seconds

Reference: last clean frame of A if a start-frame workflow is offered.

> Continue the exact founder, outfit, voice, studio, lighting and framing from Introduction A. Almost still camera, one small conversational hand movement. He says exactly: “We bring digital marketing, CRM development and maintenance, and software development together around your vision.” Finish facing the camera with a natural smile. [Append shared direction.]

### Software development — about 8 seconds

Reference: `02-service-presenter.png`.

> The same founder, full-length, navy blazer and ivory shirt, in a dark navy studio with a subtle champagne-lit arch. Balanced stance and one small open-palm gesture toward the viewer’s left. Locked camera, stable scale, the entire person stays within frame. He says exactly: “Have an idea for a digital product? Let’s build software around your business.” [Append shared direction.]

### Digital marketing — about 8 seconds

Reference: `02-service-presenter.png`.

> Same full-length founder, outfit, studio, framing and voice as the software shot. Gentle open-palm gesture, small confident nod, locked camera. He says exactly: “Let’s make your business easier to discover, with digital marketing shaped around your audience.” No performance promises. [Append shared direction.]

### CRM development and maintenance — about 8 seconds

Reference: `02-service-presenter.png`.

> Same founder, full-length framing, navy outfit, studio, and voice. Subtle conversational gesture suggesting connection, no floating graphics. Locked camera. He says exactly: “Let’s connect your customer information with CRM development and maintenance that supports your team.” [Append shared direction.]

### Closing A — about 8 seconds

Reference: `03-warm-closing.png`.

> Same founder in the tailored ivory open-collar shirt, in a warm pearl architectural studio with champagne light. Waist-up framing, direct eye contact, welcoming smile, one gentle open-hand invitation near the waist. Minimal dolly in. He says exactly: “Your next chapter starts with a conversation. Tell me what you want to build.” [Append shared direction.]

### Closing B — 6–8 seconds

Reference: last clean frame of Closing A, when offered.

> Continue the exact founder, ivory shirt, warm studio, voice and framing. He says exactly: “Your vision. Our solutions. Let’s explore the possibilities together.” End on a calm smile and a short quiet hold. No animated text. [Append shared direction.]

## Connect the reviewed exports

Place these files under `public/videos/founder/`:

```text
intro.mp4
software-development.mp4
digital-marketing.mp4
crm-development-and-maintenance.mp4
closing.mp4
```

Add accurate English WebVTT captions under `public/captions/founder/`, with matching names. Time them to the final edit; do not guess timestamps. Set the corresponding `video` and `captions` fields in `src/data/founder-scenes.ts`, for example:

```ts
video: '/videos/founder/intro.mp4',
captions: '/captions/founder/intro.vtt',
```

`FounderMedia` registers the video with the tour controller. Configured video audio replaces browser narration. The controller pauses the prior player on chapter changes, supports replay/stop, stops on tab hiding, handles ended state, and shows a tap-to-continue message if playback is blocked. Media errors restore the image and stop the tour. All content remains readable without audio.

Use H.264 MP4 for a studio-background film. **MP4 is not a transparent presenter layer in this application.** A seamless cutout requires an appropriately matted alpha WebM and browser compatibility testing; otherwise keep the video as a cinematic studio panel. CSS masks soften edges but do not remove backgrounds. No chroma-key extraction is claimed.

Keep the actor’s rendered scale stable. The website controls shrinking, layout, pointer depth, and scroll transitions. Do not scrub speech backwards with scroll: sections select a clip, while dialogue plays forward in real time.

## Before enabling a clip

Founder approval of identity and delivery; exact words and time-aligned captions; safe mobile framing; no duplicate browser speech; playback-denial handling; media-error fallback; reduced-motion checks; and no unverified business claims. No Google Flow render is included until an actual reviewed file is supplied.
