# Cinematic media pipeline

No generated founder video or reconstructed human model is included. The supplied image is used unchanged, with layered CSS framing and a separate procedural WebGL orbit scene. This is 2.5D presentation, not a 3D reconstruction.

The Instagram reference could not be fetched. No footage from it was analysed.

## Google Flow / Veo shot prompts

Use the original supplied portrait as the identity reference. Generate clips in Google Flow; no Google Flow account integration is configured here. Keep the original facial proportions, hairstyle, beard, skin tone, clothing, and anatomy. Avoid face deformation, speech, or invented branding. Add all company typography as HTML overlays in the website.

1. **Founder introduction, 6–8 seconds:** The person in the reference photograph stands naturally in a dark architectural studio. Slow, subtle camera dolly in. Warm champagne rim light, soft neutral key light, restrained atmospheric depth. Natural expression and breathing. No dialogue, text, logo, or facial transformation. Static posture with minimal movement. Preserve reference identity.
2. **Brand reveal, 5 seconds:** Abstract obsidian architectural space. One thin champagne metallic orbit slowly catches the light. Fine particles, extremely restrained motion, generous negative space on the left. No text or logo.
3. **Digital services, 6 seconds:** Sculptural floating interface planes in a dark studio. Soft warm metallic edges, physically plausible reflections, slow lateral camera motion. Blank abstract interfaces, no legible fake metrics or logos.
4. **Company vision, 6 seconds:** Monumental modern architecture opens into warm natural light. Charcoal stone, brushed champagne details, a slow steady forward camera move. Understated atmosphere. No people, signage, or text.
5. **Contact transition, 4 seconds:** A warm light gently sweeps across a near-black surface, resolving into quiet negative space. Slow movement suitable behind readable HTML content.

## Integration

Export WebM and H.264 MP4, short and silent, with a compressed poster. Add files to `public/videos/founder/` and posters to `public/posters/`. Replace only the visual layer in `src/components/Experience.tsx` with a `<video muted playsInline loop>` that has source fallbacks and a poster. Use `preload="none"`; start only on intersection, and skip autoplay for reduced motion or data-saving users. Keep the current photograph as an error fallback. Do not replace semantic headings and CTAs with video text.

Full rigged avatars require a supplied, licensed GLB model and suitable multi-angle references. None is fabricated from this image.
