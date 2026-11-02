---
name: Raphael Elias
description: Editorial minimalism for a full-stack developer portfolio.
colors:
  background: "#f9f8f4"
  foreground: "#181818"
  secondary-text: "#62615d"
  border: "#ddddd5"
  muted: "#eeede7"
  dark-background: "#000"
  dark-foreground: "#fff"
  dark-secondary-text: "#a8a7a2"
  dark-border: "#393934"
  dark-muted: "#1a1a18"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(3rem,6.4vw,6rem)"
    fontWeight: 700
    lineHeight: 1.07
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2rem,3.5vw,3rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-.03em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-.025em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.8
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: ".8125rem"
  editorial:
    fontFamily: "Instrument Serif, serif"
    fontWeight: 400
rounded:
  sm: ".375rem"
  md: ".5rem"
  lg: ".75rem"
  full: "9999px"
spacing:
  compact: ".75rem"
  base: "1rem"
  group: "1.5rem"
  stack: "2rem"
  wide: "3rem"
  section: "5.5rem"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    height: "3rem"
    padding: "0 1rem"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
    height: "3rem"
    padding: "0 1rem"
  button-theme:
    rounded: "{rounded.full}"
    size: "2.75rem"
  navigation:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  article-link:
    textColor: "{colors.foreground}"
    padding: "0 0 1.5rem"
---

# Design System: Raphael Elias

## Overview

**Creative North Star: "Editorial minimalism with precise response"**

An editorial, minimal portfolio built around confident typography, generous space, and a uniform neutral canvas. Geist gives headings their structure; Manrope identifies trajectory entries and articles; Inter keeps reading and controls clear; Instrument Serif italic adds selective emphasis.

The approved raphael-design identity pairs with Apple-inspired immediate feedback and restrained motion. Content stays visible without JavaScript animation, while light and dark themes preserve the same hierarchy. Decorative glass and ornamental gradients are outside this visual direction.

**Key Characteristics:**
- Uniform neutral surfaces and fine separators.
- Expressive headings with selective italic serif emphasis.
- Open editorial grids, compact controls, and clear keyboard feedback.

## Colors

The palette is warm paper and near-black ink in light mode, with true black and white in dark mode. There is no chromatic brand accent.

### Primary

Foreground is the primary action fill, heading ink, focus outline, and selection background. Primary foreground resolves to the canvas color. These assignments invert through the existing theme variables.

### Neutral

Background is the continuous page canvas. Secondary text supports body copy, metadata, and subdued navigation. Border separates sections without boxing them in; muted supplies quiet interactive and loading surfaces. The `dark-` frontmatter entries record the `.dark` values of those same semantic roles, not additional accents.

**The Semantic Theme Rule.** Use the existing semantic variables so every surface and control follows the selected theme.

## Typography

Geist handles display headings and the wordmark; Manrope 600 handles trajectory and article titles; Inter handles prose, navigation, and controls. Instrument Serif is loaded only at italic weight 400 and appears in heading emphasis. No visible monospace role is established.

Display, headline, title, body, and label values in frontmatter capture their implemented roles. Body sizes also step down to (.9375rem) for about/contact copy and (.875rem) for section descriptions and trajectory copy. Metadata uses (.75rem) with tabular numerals; footer and upcoming-catalog notes use (.6875rem).

The contact headline uses `clamp(2.75rem,5.5vw,4.75rem)`, line-height (1.08), weight (600), and tracking (-.035em). At the mobile breakpoint the hero uses `clamp(2.5rem,9.2vw,3.7rem)`. Heading emphasis inherits its scale; hero emphasis relaxes tracking to (-.025em).

**The Selective Serif Rule.** Keep serif emphasis inside headings rather than making it the default reading face.

## Layout

Header, main, and footer share a centered container: fluid margins `clamp(24px,5vw,80px)` and a maximum content width of (1440px). Sections use an open (.8fr / 1.2fr) editorial grid with a fluid `clamp(3rem,8vw,9rem)` gap and fine top separators. Content section padding is (5.5rem) vertically. The hero starts at (6rem) and ends at (4rem); header minimum height is (104px).

At a maximum width of (1000px), the hero support row stacks and the section grid gap becomes (3rem). At (640px), the container becomes `calc(100% - 3rem)`, the grid becomes one column with a (2.5rem) gap, section padding becomes (3.5rem), and navigation takes its own full-width row. Header minimum height becomes (88px). Hero actions wrap; contact links wrap with email on its own line.

Keep reading measures purposeful: hero copy (46ch), section introductions (29ch; 40ch on mobile), and trajectory copy (65ch). This is an editorial rhythm, not a uniform card grid.

## Elevation & Depth

The approved page is flat. No decorative shadows, translucent materials, or glass layers establish hierarchy. Continuous backgrounds, whitespace, fine borders, and type scale provide depth. Button focus rings are interaction feedback, not elevation.

Motion follows the apps-portfolio reference: header entry (600ms, 6px), title lines (900ms, 70ms stagger, 18px without rotation), supporting content (600ms, 6px) and one-time section accents (600ms, 8px, opacity .8 to 1). Initial header and hero entrances run in CSS from the first paint, independently of hydration. PortfolioMotion observes only content that was below the viewport when it initialized, with cleanup; it never resets already-visible content. Scroll entrances group related content rather than animating each row: they trigger once at 12% visibility with a 48px inset from the viewport bottom. Shared diagonal arrow pairs travel in (420ms); article rows shift (4px) and reveal a line in (600ms). Theme colors transition in (360ms), and the icon retargets through a critically damped spring (650ms, no bounce). Reduced motion completes active entrances and disables displacement, transitions and smooth scrolling. No route delays or decorative gestures are introduced.

## Shapes

Buttons are pills; the portrait is circular. Existing small, medium, and large radius tokens remain available for shared UI, but editorial content is unboxed. Section rules are (1px). Do not replace open text lists with decorative rounded cards.

## Components

- **Primary action:** the local Button in large size, used for contact. Its height is (3rem), text is (.875rem) at weight (500), and icon-bearing large buttons use (1rem) horizontal padding. Hover reduces the fill to 90%; pressing scales to (.97).
- **Outline action:** the same large pill with a border. The unpublished apps action is disabled, has 50% opacity, and is accompanied by a separate status note. Do not imply that its destination is available.
- **Theme action:** the theme toggle uses the existing outline Button with a (2.75rem) square hit area, circular shape, and an accessible name.
- **Navigation:** compact text links have (.75rem) vertical padding, hover underlines, and a distinct non-link upcoming-apps label. Preserve semantic navigation and keyboard access.
- **Article link:** an unboxed anchor with metadata, heading, and reading cue. Its bottom rule grows from the left on hover or keyboard focus; its arrow translates (2px,-2px).
- **Technology list:** plain wrapping text, not chips. Keep its (.625rem / 1.5rem) row/column gaps.

Global links and buttons use a (2px) foreground outline offset by (5px). Buttons additionally carry their shared (3px) half-opacity focus ring. Keep the skip link, minimum (44px) contact-link targets, icon accessible handling, and reduced-motion overrides. No input or card primitive appears on this page; do not invent one to expand the system.

## Do's and Don'ts

### Do:
- Do use the existing semantic CSS variables for both themes.
- Do reserve Instrument Serif italic for selective heading emphasis.
- Do preserve visible focus, disabled states, and reduced-motion behavior.
- Do use open lists and separators for trajectory, technologies, and articles.

### Don't:
- Don't add decorative glass, ornamental gradients, or navigation-delaying animation.
- Don't turn every content group into a raised card.
- Don't introduce accent colors or additional font families without a new visual decision.
