# Portrait framing and full-image viewer

The founder image now keeps the generated photograph's full 4:5 aspect ratio. The previous fixed-height cover crop is replaced with contain sizing. The desktop portrait width responds to available viewport height; short desktop viewports use more compact hero spacing and typography. The hero can grow naturally rather than clipping its contents.

PortraitViewer.tsx provides a native modal dialog with the complete image, a close button, Escape dismissal and browser-managed focus restoration. The portrait remains an AI-assisted image; no new generation or identity modification was needed for this update.

scripts/portrait-layout-qa.cjs checks the reference screenshot size (1279x648), 1440x900, 1024x600 and mobile 390x844. It verifies full-image sizing, short desktop visibility, no horizontal overflow, viewer opening, Escape dismissal and focus return. Navigation and phone visibility are checked by scripts/navigation-qa.cjs.
