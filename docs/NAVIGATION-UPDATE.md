# Navigation and floating call control

The previous text widget is replaced by FloatingCall.tsx: an icon-only circular link to tel:+919959929328. It is hidden while the home hero is visible beneath the sticky navigation, appears after the hero passes out of view, and hides when returning. The link has an accessible phone label and tooltip; it opens the device's phone handler and does not initiate a call without the customer's action.

The header is sticky. ResizeObserver publishes its actual height to --nav-height. Global scroll padding accounts for the header plus a small reading gap; section scroll margins subtract the section's existing top padding so it is not added twice. Desktop/tablet gap: 20px; mobile: 16px. Mobile menus remain below the header and scroll independently if needed.

scripts/navigation-qa.cjs exercises all four main links and the contact link at 1440, 1024 and 390px widths, verifies the call link, circular shape, visibility threshold and return behavior, and checks overflow and browser errors. It does not place a phone call. docs/navigation-qa.json records actual measured gaps.
