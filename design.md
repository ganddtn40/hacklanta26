name: Hacklanta '26 Landing Page description: Dark navy, retro-psychedelic festival landing page with rainbow ribbon waves, a lanyard-badge hero, and neon-bordered cards in condensed display type. version: 1.0.0 source: reference-image-analysis fidelity_target: 99%
Design System
Source: single full-page screenshot Hacklanta__26.jpg (≈ 621 × 2576 px as supplied, aspect ≈ 1 : 4.15, likely a scaled capture of a ~1440px-wide desktop page). All pixel and HEX values are estimated unless marked confirmed. Ratios are relative to the supplied image width (621 px = 100%).
1. Design Intent
A high-energy, nostalgic "music festival" aesthetic for a student hackathon: pitch-dark canvas, thick flowing rainbow ribbons, sticker-style retro illustrations (van, dome, planet, cassette-era tech), chunky condensed display headings with hard pink offset shadow, and neon-outlined cards. Text is small and sparse; drama comes from scale contrast, color borders, and ribbons, not from fills or gradients on components.
2. Reference Fidelity
Confirmed


Page is dark (near-black navy) with rainbow ribbon waves behind several sections.

Hero is a centered hanging lanyard badge containing wordmark, 4 info tiles, illustration strip, yellow pill CTA.

Sections in order: Hero, What is Hacklanta?, Tracks (+ sponsor challenges), Prizes (+ track prizes, side quests), Sponsors (title partners, support logos), FAQ, footer.

Counts: 4 tracks, 3 sponsor challenges, 4 track prizes, 9 side quests, 2 title partners, 15 support logos, 7 FAQ items, 4 nav links.

Section headers use left heading + right paragraph two-zone layout.

Question texts of FAQ and most headings/labels are readable.
Estimated


All dimensions, HEX values, font sizes, line heights, tracking, radii, shadows.

Container ≈ 72% of width (≈ 1040px at 1440).

Typeface classes (see §4).
Inferred


Background and ribbons are decorative layers behind content (z-index below cards).

FAQ rows are expandable accordions (the "+" glyph implies it).

Illustration positions in side margins are non-interactive.
Recommended


Hover/focus/pressed states, responsive collapse rules, ARIA patterns (not visible in reference).
3. Color Tokens
Token HEX (estimated) Usage background #04050D Page canvas surface #0A0B16 Cards, tiles surface-muted #0E1020 Sponsor tiles, footer bars text-primary #FFFFFF Headings, titles, values text-secondary #C9CAD6 Body paragraphs text-muted #8B8DA3 Tiny labels, captions, "PRESENTED BY" primary (CTA) #FFD83D Launch application, Apply Now, small yellow links secondary / accent-teal #22E3C8 Eyebrows, FAQ "+", footer links, chip bullets accent-pink #FF2E88 Display heading offset shadow border #1E2033 Default hairline container border divider #1A1C2E Grid/FAQ hairlines track-social-good #2F5BFF Blue border track-creative #FF3366 Pink-red border track-ai-ml #7C4DFF Violet border track-fintech #2ECC71 Green border challenge-small-business #FF5A2A Orange-red border challenge-agents #F5B82E Gold border challenge-zero-data #3B6CFF Blue border prize-gold #F2B01E Track prize card borders side-quest-border #3B6CFF → #7C4DFF Gradient border of the 3×3 container ribbon palette orange #FF6A2B, coral #FF4B5C, magenta #E83E8C, yellow #FFD23F, green #3DDC84, teal #19C5C0, blue #2F6BFF, purple #7B4DFF Background ribbon waves success / warning / error / info not visible in reference Do not introduce; if required use #2ECC71 / #F5B82E / #FF4B5C / #3B6CFF
4. Typography Tokens
Token Description Size (est.) Weight Line height Tracking Case wordmark Rounded chunky playful lowercase display, white + colored offset shadow 40–48px (in badge) Black 1.0 -0.01em lowercase display (section h2) Ultra-bold condensed grotesque, white fill, hard pink offset shadow (~3–4px x/y) 56–64px 800–900 0.9 -0.02em UPPERCASE card-title Same family as display 22–26px 800–900 0.95 -0.01em UPPERCASE side-quest-title Same family 14–16px 800 1.0 0 UPPERCASE subheading Geometric bold sans 20–24px 700 1.2 0 lowercase body Neutral geometric sans, text-secondary 14px 400 1.6 0 sentence body-small Card descriptions 9–11px (ref-scale ≈ 5px) → ~11–12px 400 1.5 0 sentence eyebrow Tiny uppercase, wide tracking, teal, possibly mono-flavored 10–11px 600 1.2 0.14em UPPERCASE label "PRESENTED BY", "BEST USE OF …", "DATES" 9–10px 600 1.2 0.12em UPPERCASE nav Header links 10px 600 1.2 0.1em UPPERCASE button CTA label 14px (hero), 10px (Apply Now) 600–700 1.0 0 sentence / uppercase for Apply Now faq-question White small sans 12–13px 500 1.3 0 sentence
Font families are not identified; use the closest category (condensed heavy grotesque for display, rounded heavy for wordmark, neutral sans for body) and keep them estimated.
5. Spacing Tokens
Token Value (est.) Where xs 4px icon/label micro gaps sm 8px label-to-value, chip gaps md 16px card padding, card gaps lg 24px grid gutters, card padding (large) xl 40px heading-to-content 2xl 64px subheading groups 3xl 120–160px between major sections
Rhythm: 8pt base with large vertical gaps; horizontal density low, content sits inside the 72% container with wide empty margins carrying illustrations.
6. Layout Tokens
Token Value (est.) viewport (assumed) 1440px desktop container width ≈ 72% (≈ 1040px) container margins ≈ 14% each side header height 60–70px, transparent right-column anchor ≈ 50% of container right-column width ≈ 48% of container grid columns 12 gutter 16–24px hero badge width ≈ 28% of viewport (≈ 410px) hero badge aspect ≈ 1 : 1.45 (w : h) section vertical spans (% of page height) Hero 0–13; What is 15–24; Tracks 27–44; Prizes 48–67; Sponsors 70–86; FAQ 89–97; footer ≈ 99–100
7. Radius Tokens
Token Value (est.) Use none 0 dividers sm 6px info tiles md 10–12px track, challenge, prize cards lg 16–24px hero badge, grid containers xl 28px logo containers pill 999px CTA, Apply Now, Launch application
Nested radius: inner element radius = parent radius – padding (never larger than parent).
8. Elevation Tokens
Token Description level-0 Flat: grids, logo tiles, FAQ rows level-1 Hairline border only level-2 Colored 2px border with soft same-color outer glow (≈ 0 0 12–20px, 30–40% opacity): track, challenge, prize cards level-3 Hero badge: dark card with subtle warm glow plus strap/clip overlap
No drop-shadow elevation on dark surfaces except glow. No glassmorphism or backdrop blur.
9. Grid & Alignment


Container left edge anchors: section eyebrows, display headings, subheadings, card grids, FAQ heading.

Right anchor (≈ 50% of container): section paragraphs, FAQ list.

Page center axis: hero badge, lanyard strap, hero CTA.

Track row: [track card ≈ 75%] + [sponsor tile ≈ 25%] per half; two halves per row, with a gap between halves ≈ 12–16px. Left edge of row 1 and row 2 identical.

Challenge row: 3 equal columns, gap ≈ 12–16px.

Prize row: 4 equal columns.

Side quests: 3 × 3 grid inside one bordered container; equal cell width, hairline dividers.

Logo grid: 5 × 3 inside one bordered container; logos centered in cells.

Title partners: 2 equal tiles, gap ≈ 12–16px, total width = container.

Illustrations sit in left/right margins outside the container, vertically aligned to nearest section heading or card row.
10. Components
Top Navigation
Anatomy
Logo cluster (left) + MLH ribbon badge hanging from page top; centered nav links; right cluster (2 icon buttons, Log in, Apply Now pill).
Dimensions
Height 60–70px; MLH badge ≈ 50px wide × 60px tall pennant; Apply Now pill ≈ 60 × 20px at ref-scale (≈ 100 × 32px at 1440).
Typography
nav / button tokens.
Colors
Transparent background; white text; Apply Now fill #FFD83D with dark text.
Spacing
Link gap ≈ 24–32px.
Radius / Border / Elevation
Pill; no border; level-0.
States
Recommended: hover brightness; focus ring 2px teal.
Usage
Same on every scroll position (not confirmed whether sticky).
Hero Lanyard Badge
Anatomy
Strap with micro-text → metal clip → black badge card → [label row (HACKLANTA '26 + cloud, flower)] → wordmark → multicolor dash row → 2×2 info tiles → illustration strip → CTA → helper link.
Dimensions
≈ 28% viewport width; aspect ≈ 1 : 1.45; strap width ≈ 10–12px at ref-scale.
Typography
wordmark; label; value in bold sans ≈ 13–15px.
Colors
Card #07070C; border #2A2A33; tile borders tinted (yellow/teal/purple/orange est.).
Spacing
Internal padding ≈ 16px; tile gap ≈ 6–8px.
Radius
≈ 20–24px card; tiles ≈ 6px.
Border
1px dark gray, subtle warm glow.
Elevation
level-3.
States
Static (optional gentle sway is NOT in reference; do not add).
Usage
One per page.
Primary CTA ("Launch application")
Anatomy
Full-width yellow pill, centered label, black circular arrow button at right.
Dimensions
Width = badge inner width; height ≈ 28px at ref-scale (≈ 52–56px at 1440); arrow circle ≈ 70–75% of button height.
Typography
button token, dark text.
Colors
#1 fill #FFD83D; arrow circle #0A0A0A with yellow/white arrow.
Radius
pill.
States
Recommended: hover brighten, arrow nudge; focus ring; pressed scale .98; disabled not shown.
Info Tile
Anatomy
Tiny uppercase label above bold value.
Dimensions
≈ 50% of inner badge width each; height ≈ 30px ref-scale.
Colors
Fill #0B0C16; border tinted by tile (confirmed variation, exact hues estimated).
Radius
6px.
Section Heading Block
Anatomy
Eyebrow (teal) + display heading (+ optional margin illustration) | right paragraph.
Dimensions
Heading ≈ 56–64px; two-line "WHAT IS HACKLANTA?".
Spacing
Eyebrow→heading ≈ 8px; heading→content ≈ 40px.
Track Card
Anatomy
Title + description inside colored-border card, ribbon waves visible behind text, adjacent sponsor tile.
Dimensions
≈ 160 × 80 at ref-scale (≈ 370 × 185 at 1440); sponsor tile ≈ 25% of card width, same height.
Typography
card-title; body-small; label.
Colors
Fill ≈ #070812 w/ ribbon overlay (≈ 40–60% opacity); border per §3.
Spacing
Padding ≈ 16px.
Radius / Border / Elevation
md radius; 2px colored border; level-2.
States
Recommended: hover glow intensify.
Usage
4 instances: SOCIAL GOOD (blue), CREATIVE (pink-red), AI/ML (violet), FINTECH (green).
Sponsor Tile (beside track)
Anatomy
"PRESENTED BY" label + logo (Cox Automotive, Adobe) or lone sparkle icon (AI/ML violet, Fintech green).
Colors
Tinted dark fill matching the track hue at ≈ 10–15% opacity; border same hue at lower opacity.
Sponsor Challenge Card
Anatomy
Title, description, optional prize lines with star bullets, footer bar with "PRESENTED BY" + logo.
Dimensions
3 equal columns; height ≈ 115px ref-scale (≈ 265px at 1440); footer ≈ 25% of card height.
Colors
Border per §3; footer fill #0E1020.
Radius
md.
Usage
SMALL BUSINESS (Replit), AGENTS IN iMESSAGE (Photon), ZERO DATA (Shock Tracker).
Prize Card
Anatomy
Title; centered line icon in glow; track label with star bullet; footer bar.
Dimensions
4 columns; height ≈ 120px ref-scale (≈ 275px at 1440).
Colors
Gold border, dark fill, ribbon waves faintly visible.
Footer
"PRESENTED BY" + logo (Cox, Adobe) or "TRACK PRIZE" + yellow sparkle.
Side Quest Grid
Anatomy
Single container → 3×3 cells → each: sponsor logo/name, "BEST USE OF …" label, prize title.
Dimensions
Full container width; each cell ≈ 33.3% width, ≈ 65px height ref-scale.
Colors
Fill slightly blue-tinted dark (#0B1030 est.), border gradient blue→purple, hairline dividers #1A1C2E.
Radius
≈ 16px container, none inside.
Footer link
"FULL PRIZE DETAILS ON MLH ↗", right-aligned, tiny teal/white.
Logo Tiles
Title partners
2 tiles ≈ 49% width each, ≈ 58px ref-scale tall, surface #0A0B16, hairline border, radius ≈ 12px, white logo centered (Cox ≈ 60% tile width; Adobe ≈ 45%).
Support grid
Single container, 5×3 cells, monochrome gray-white logos with micro captions, hairline dividers.
FAQ Accordion
Anatomy
Question text + teal "+" at far right; hairline divider.
Dimensions
Row height ≈ 24px ref-scale (≈ 56px at 1440); list width ≈ 48% of container.
States
Collapsed (confirmed); expanded (recommended: "+" → "×", answer in body style, smooth height transition ≤ 200ms).
Footer
Single thin row; left tiny muted uppercase text "HACKLANTA '26 · ATLANTA · OCT 9–11"; right two teal tiny uppercase links (first reads MLH CODE OF CONDUCT; second link text not clearly legible).
11. Navigation


Top navigation: HOME, WHAT IS HACKLANTA, SPONSORS, FAQ (anchor links to sections).

Utility: Discord icon, Instagram icon, LOG IN, APPLY NOW.

CTA in hero repeats "Apply".

Recommended: smooth scroll to anchors; collapse to hamburger under tablet width.
12. Content Rules


Preserve copy and line counts. Where reading is uncertain, keep equivalent length (card descriptions ≈ 3–4 short lines; challenge descriptions ≈ 3–4 lines; prize labels one line).

Content density: low. Max one short paragraph (2–4 lines) beside each heading.

Headings are uppercase; subheadings lowercase.

Prize/side-quest titles uppercase and concise (2–3 words).

Do not substitute lorem ipsum.
13. Iconography


Social and UI icons: outline, ≈ 1.5px stroke, ≈ 12–16px at 1440, white.

Arrow button: filled black circle with arrow.

Sparkle/star bullets: solid 4-point sparkle, yellow or tinted to card hue.

Sponsor logos: monochrome (white/gray) inside grids; original colors only where visible (Replit, Photon white).

Illustrations: flat colorful sticker style (clouds, ringed planet, retro computer, galaxy swirl, pyramid, speakers, DJ controller, plant, music notes, van, geodesic dome, flower). Do not add new ones or change placement.
14. Imagery


No photography.

Illustrations ≈ 40–60px at ref-scale (≈ 90–140px at 1440), located in margins at: planet right of "What is"; retro computer left of Tracks; galaxy swirl right of challenges; pyramid left of Prizes; speakers right of Sponsors; DJ controller left of logo grid bottom; plant bottom right near FAQ; music notes near hero and tracks.

Background ribbon waves: thick (≈ 40–80px at 1440), layered, smoothly curving, multi-color bands; sit behind hero (both sides), behind track/prize card grids, and behind FAQ.
15. Responsive Rules (recommended; not visible in reference)
Mobile (< 640px)
Single column; hamburger nav + Apply pill; badge ≈ 80% width; section headers stacked; tracks, challenges, prizes stacked (sponsor tile under track card); side quests 1 column; logo grid 3 columns; FAQ full width; display headings 36–44px; illustrations scaled or hidden if overlapping.
Tablet (640–1024px)
Container ≈ 90%; headers stack; tracks 2 columns; prizes 2×2; side quests 2 columns; logo grid 4 columns.
Desktop (≥ 1024px)
As specified in reference.
16. Accessibility


Maintain ≥ 4.5:1 for body text; verify muted labels (#8B8DA3 on #04050D ≈ 6:1 est., acceptable) and avoid lowering.

Visible focus ring (2px teal #22E3C8 or white, 2px offset) on every interactive element.

Touch targets ≥ 44px on mobile (nav, CTA, FAQ rows).

Semantic HTML: header/nav/main/section/footer; one h1; h2 per section; FAQ as button + aria-expanded/aria-controls.

Decorative illustrations and ribbons: aria-hidden; logos with alt text; respect prefers-reduced-motion.

Do not rely on border color alone to differentiate cards (titles carry meaning).
17. Screen Specifications
Screen: Hacklanta '26 Landing Page
Purpose
Promote the event, communicate tracks/prizes/sponsors/FAQ, convert visitors to applications.
Viewport
Desktop, assumed 1440px wide; full-page height ≈ 4.15 × width (≈ 5980px at 1440, estimated).
Page Structure
Header → Hero → What is → Tracks (+ Sponsor challenges) → Prizes (+ Track prizes + Side quests) → Sponsors (Title partners + Support logos) → FAQ → Footer.
Header
Transparent, 60–70px, logo + MLH ribbon left, centered 4-link nav, right icons/login/Apply Now.
Navigation
Anchor links; no visible dropdowns.
Main Content


Hero (0–13% of height): ribbons curve across both sides; lanyard strap descends from top center; badge top at ≈ 3% of page height, bottom at ≈ 13%.

What is Hacklanta? (15–24%): eyebrow + 2-line heading at left; two paragraphs right; chip row at bottom (OCT 9–11 • ATL • 1,000+ STUDENTS ACROSS THE US • FREE FOR ACCEPTED PARTICIPANTS); planet illustration right margin; clouds.

Tracks (27–44%): eyebrow PICK YOUR STAGE; heading TRACKS; right text; 2 rows of [card + tile] pairs; subheading "sponsor challenges"; 3 challenge cards; galaxy swirl illustration.

Prizes (48–67%): eyebrow TAKE SOMETHING HOME; heading PRIZES; right text; subheading "track prizes" with sparkle; 4 prize cards; pyramid illustration; subheading "side quests"; 3×3 grid; link.

Sponsors (70–86%): eyebrow FUTURE FREQUENCIES; heading SPONSORS; right text; "title partners" 2 tiles; "with support from" 5×3 logo grid; speakers and DJ controller illustrations.

FAQ (89–97%): eyebrow TRANSMISSION RECEIVED; heading FAQ left; 7 accordion rows right; plant illustration bottom right.

Footer (≈ 99%): single thin row.
Component Positions
See §9 for anchors; hero badge on center axis; section right columns at ≈ 50% of container.
Width / Height Ratios
Container ≈ 72% width; badge ≈ 28% width; title partner tiles ≈ 49% each; track card : sponsor tile ≈ 3 : 1; prize and side-quest cells equal columns.
Spacing
Section gap ≈ 120–160px; heading→content ≈ 40px; card gaps ≈ 12–16px; card padding ≈ 16px.
Typography
See §4.
Colors
See §3.
States
Visible: default only; accordion collapsed. Recommended states in §10.
Responsive Behavior
See §15.
Fidelity Notes
Fine copy inside cards is very small in the supplied image; wording of some prize/challenge lines is estimated. Second footer link text and some sponsor logos (e.g., the ones at column 5 row 1–2 of the support grid) are not confidently identifiable.
18. Do Not Change


Section order, proportions, and two-zone header layout.

Dark navy canvas and rainbow ribbon backgrounds.

Lanyard-badge hero with yellow pill CTA.

Condensed display type with pink offset shadow; lowercase rounded wordmark.

2px neon colored card borders with per-card hue assignments.

Component counts and grid structures (4 / 3 / 4 / 9 / 2 / 15 / 7).

Margin-placed sticker illustrations.

Low text density, small body type, generous vertical whitespace.

Corner treatment: medium radius cards, pill buttons, large radius containers.

No glassmorphism, no extra gradients on cards, no added animation, no extra sections, no decorative additions.
19. Implementation Notes


Build ribbons as absolutely positioned SVG/PNG layers (z-index: 0, pointer-events: none) clipped per section; keep cards above (z-index: 1).

Display shadow: text-shadow: 3px 3px 0 #FF2E88 (estimated; adjust to match reference offset).

Card glow: box-shadow: 0 0 16px color-mix(in srgb, <hue> 35%, transparent) with border: 2px solid <hue>.

Use CSS grid with named columns: grid-template-columns: repeat(12, 1fr); right anchors via grid-column: 7 / -1.

Track pair: grid-template-columns: 3fr 1fr inside a 2-column row.

Side quests and logo grid: single bordered container, gap: 0 with hairline borders on cells.

Prefer SVG for logos (monochrome via currentColor), WebP/PNG for illustrations.

Fonts: load a condensed heavy display face and a rounded heavy face for the wordmark (final choice pending visual comparison); body in neutral sans; mark as estimated in code comments.

Run a visual regression check against the reference at 1440px: silhouette, container edges, heading positions, card counts, ribbon placement.