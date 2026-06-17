---
name: Serene Path
colors:
  surface: '#f6fafb'
  surface-dim: '#d6dbdc'
  surface-bright: '#f6fafb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4f5'
  surface-container: '#eaefef'
  surface-container-high: '#e5e9ea'
  surface-container-highest: '#dfe3e4'
  on-surface: '#171c1d'
  on-surface-variant: '#404849'
  inverse-surface: '#2c3132'
  inverse-on-surface: '#edf1f2'
  outline: '#70797a'
  outline-variant: '#c0c8c9'
  surface-tint: '#33666c'
  primary: '#306369'
  on-primary: '#ffffff'
  primary-container: '#4a7c82'
  on-primary-container: '#f6feff'
  inverse-primary: '#9ccfd6'
  secondary: '#516261'
  on-secondary: '#ffffff'
  secondary-container: '#d1e3e2'
  on-secondary-container: '#556665'
  tertiary: '#625b51'
  on-tertiary: '#ffffff'
  tertiary-container: '#7b7469'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b8ecf2'
  primary-fixed-dim: '#9ccfd6'
  on-primary-fixed: '#001f23'
  on-primary-fixed-variant: '#174e53'
  secondary-fixed: '#d4e6e5'
  secondary-fixed-dim: '#b8cac9'
  on-secondary-fixed: '#0e1e1e'
  on-secondary-fixed-variant: '#3a4a49'
  tertiary-fixed: '#ebe1d4'
  tertiary-fixed-dim: '#cfc5b9'
  on-tertiary-fixed: '#1f1b13'
  on-tertiary-fixed-variant: '#4c463c'
  background: '#f6fafb'
  on-background: '#171c1d'
  surface-variant: '#dfe3e4'
  ocean-muted: '#5A8C92'
  soft-mist: '#F4F7F7'
  warm-sand: '#F9F6F2'
  sage-highlight: '#8BA8A1'
typography:
  display-lg:
    fontFamily: manrope
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: manrope
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: openSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: openSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: openSans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: openSans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  section-gap-desktop: 120px
  section-gap-mobile: 64px
  container-max: 1140px
  gutter: 24px
  margin-mobile: 20px
---

## Brand & Style

The design system is centered on the concepts of psychological safety, clarity, and restorative healing. It targets individuals seeking professional mental health support, requiring a UI that feels like a "digital breath of fresh air." 

The design style is **Modern Minimalism with Soft Tonal Layers**. It prioritizes heavy whitespace to reduce cognitive load and uses gentle transitions to guide the user through the therapeutic process. The aesthetic avoids the clinical coldness of traditional medical sites, opting instead for a warm, human-centric professional atmosphere. Key visual drivers include soft-focus imagery, subtle gradients, and an unhurried layout rhythm.

## Colors

The palette is rooted in nature-inspired tones to evoke tranquility and trust. 

- **Primary (Ocean Muted):** A sophisticated teal-blue used for primary actions, headings, and key brand moments. It represents stability and professional depth.
- **Secondary (Soft Mist):** A very light, desaturated teal used for large background sections to provide a "clean" feel without the harshness of pure white.
- **Tertiary (Warm Sand):** A gentle neutral used to add human warmth to cards or secondary sections, preventing the site from feeling too "cool" or detached.
- **Neutral:** A deep charcoal-gray with a hint of blue-green, used for body text to ensure high readability while maintaining the soft color story.

## Typography

This design system utilizes a pairing of **Manrope** and **Open Sans**. 

**Manrope** is chosen for headlines for its modern, geometric, yet soft construction. It feels professional and contemporary. **Open Sans** is used for body copy due to its exceptional legibility and friendly, open letterforms that feel approachable in a therapeutic context.

To maintain a serene feel, line heights are intentionally generous (1.6x for body text) to provide "breathing room" within paragraphs. Headlines use a tighter letter-spacing to appear more grounded and authoritative.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to keep content centered and focused, reducing visual distraction. 

- **Desktop (1440px+):** 12-column grid with a 1140px max-width container. 120px vertical spacing between major sections to emphasize the "generous whitespace" philosophy.
- **Tablet (768px - 1024px):** 8-column grid with 40px side margins.
- **Mobile (Under 768px):** 4-column grid with 20px side margins and reduced vertical gaps (64px) to keep the scroll length manageable while maintaining a sense of openness.

Rhythm is maintained using a strict 8px baseline. All padding and margins should be multiples of 8 to ensure a structured, harmonious flow.

## Elevation & Depth

To maintain the "Serene Path" aesthetic, traditional heavy shadows are avoided. Instead, depth is conveyed through **Tonal Layers** and **Subtle Ambient Shadows**.

- **Surfaces:** Use slightly different shades of neutrals (`soft-mist` vs `warm-sand`) to differentiate sections.
- **Elevated Elements (Cards):** Use a "Low-Contrast Outline" approach combined with an extremely soft, diffused shadow (15% opacity of the primary color, 20px blur, 4px offset). This creates a "lifted" effect that feels light and airy rather than heavy or industrial.
- **Interactions:** Subtle backdrop blurs (glassmorphism) may be used for navigation bars to maintain context of the content underneath while providing a clear focus layer.

## Shapes

The shape language is consistently **Rounded**. 

Avoid sharp 90-degree corners, as they can feel aggressive or overly formal. Standard buttons and input fields use a `0.5rem` radius. Larger containers like cards or image frames use `1rem` (rounded-lg) to soften the visual impact of large blocks. Interactive icons may use a circular (pill) background to feel more organic and inviting.

## Components

- **Buttons:** Primary buttons use a solid `ocean-muted` fill with white text. Secondary buttons use a ghost style with an `ocean-muted` border. All buttons have a subtle transition on hover, slightly increasing the background saturation.
- **Input Fields:** Designed with a very light `soft-mist` background and a 1px border that darkens only when focused. Labels always sit outside the field for maximum accessibility.
- **Cards:** Used for service descriptions or blog posts. They should feature `1rem` corner radius, a 1px `warm-sand` border, and no heavy shadows unless hovered.
- **Chips:** Small, rounded labels for categories (e.g., "Anxiety," "Depression") using the `tertiary` color with darkened text for high contrast and a gentle feel.
- **Lists:** Use custom icons (like a soft checkmark or a simple dot) instead of standard bullets to maintain the branded aesthetic.
- **Testimonials:** Large-format typography, centered, with a light `warm-sand` background to differentiate the human element from clinical information.