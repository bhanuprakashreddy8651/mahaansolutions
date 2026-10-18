# Compact spacing update

The hero no longer stretches a narrow, height-limited portrait inside an oversized grid cell. It uses a bounded text column, a portrait-sized column and an explicit 28–46px gutter. Forced viewport minimum height and absolute baseline spacing are removed. The original full photograph remains contained at 4:5 proportions.

Section padding is reduced to 64px desktop, 56px tablet and 42px mobile. Section labels and the discipline strip have tighter spacing. Matching --section-inset values preserve the navigation's existing 20px/16px heading alignment.

The service explorer chooses the card crossing the viewport focus line on scroll, rather than relying on whichever IntersectionObserver entry happened to change last. This keeps the service journey aligned with cards after their spacing and heights change.

Existing scripts/portrait-layout-qa.cjs, navigation-qa.cjs and editorial-qa.cjs cover portrait framing, navigation, call visibility, service interactions and mobile overflow.
