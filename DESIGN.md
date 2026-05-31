# Luxe Artisan Pants — Design Brief

## Tone & Positioning
Refined luxury, editorial sophistication, scarcity messaging. Customer feels privileged to access an exclusive, handcrafted collection. Museum-quality presentation emphasizing artisan heritage.

## Visual Differentiation
- Museum-quality product detail narratives with close-up stitching photography
- Prominent artisan storytelling & handcraft emphasis
- Scarcity & limited edition messaging throughout
- Editorial lifestyle photography as primary visual language
- Generous whitespace creating breathing room & visual luxury

## Color Palette (OKLCH)
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary (Deep Charcoal/Navy) | 0.20 0.03 25 | 0.85 0.02 50 | Headers, CTAs, authority |
| Secondary (Cream/Ivory) | 0.92 0.02 45 | 0.20 0.02 25 | Backgrounds, secondary actions |
| Accent (Deep Gold/Bronze) | 0.55 0.11 45 | 0.70 0.12 45 | Highlights, rarity signals, active states |
| Muted (Warm Grey) | 0.88 0.01 40 | 0.25 0.02 25 | Borders, dividers, UI elements |
| Background | 0.98 0.01 50 | 0.12 0.02 25 | Page background (light cream / dark charcoal) |

## Typography
- **Display Font:** Instrument Serif (italic for headers — editorial sophistication)
- **Body Font:** Plus Jakarta Sans (clean, modern, luxury feel)
- **Mono:** JetBrains Mono (functional, code blocks)
- **Line Height:** 1.7 (generous, premium spacing)
- **Letter Spacing:** +0.025em (refined, opened up text)

## Structural Zones
| Zone | Treatment | Details |
|------|-----------|----------|
| Header/Navigation | bg-primary text-primary-foreground border-b border-muted | Logo premium-sized, nav minimal, contact link |
| Hero Section | bg-background with lifestyle imagery | Full-width image with brand narrative overlay |
| Product Grid | bg-secondary/40 alternating with bg-background | Card-based with hover scale, shadow-luxury on interact |
| Product Detail | bg-card shadow-elevated | Large imagery, stitching close-ups, artisan narrative |
| Footer | bg-primary text-primary-foreground border-t border-muted | Editorial tone, links, newsletter signup |
| Modals/Overlays | bg-popover with shadow-elevated, scrim 0.5 opacity | Centered, slow fade-in animation |

## Spacing & Rhythm
- **Desktop:** 80px vertical margins, 60px horizontal padding
- **Tablet:** 60px vertical, 40px horizontal
- **Mobile:** 40px vertical, 20px horizontal
- **Component gaps:** 24px (card spacing), 16px (section spacing), 8px (element spacing)

## Component Patterns
- **Buttons:** Minimal borders, generous padding (12px 32px), text-accent on hover, transition-luxury, shadow-luxury on active
- **Cards:** bg-card, rounded-lg, subtle border border-muted, shadow-luxury baseline, shadow-elevated on hover, transition-luxury
- **Links:** text-accent, no underline, underline on hover, transition-luxury
- **Inputs:** bg-input border border-muted, focus:border-accent focus:ring-1 ring-accent, transition-luxury
- **Badges:** bg-accent text-accent-foreground, rounded-full, text-xs font-semibold

## Motion & Interaction
- **Default transition:** transition-luxury (0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94))
- **Fade-in:** opacity 0→1 over 0.5s (for images, modals, lazy-loaded sections)
- **Slide-up:** translateY(10px) + opacity 0→1 over 0.6s (for product cards, detail reveals)
- **Hover states:** scale 1.02, shadow-elevated, text accent highlight
- **No bouncing, no elastic ease — all cubic-bezier for luxury feel**

## Constraints
- **No rainbow palettes** — strictly 4-color system (charcoal, cream, gold, grey)
- **No arbitrary colors** — all via CSS tokens
- **No blur/glow shadows** — clean, deliberate shadows only
- **No generic blue CTAs** — use accent gold for all primary actions
- **Serif only for display** — body is sans-serif for readability
- **Whitespace over decoration** — clean, museum-like presentation

## Signature Detail
**Artisan stitching detail photography.** Close-up, macro-style images of the 6000-stitch handcraft work displayed throughout product pages. This is the visual differentiator — not just pants, but visible proof of craftsmanship. Paired with narrative text about artisan process.

## Accessibility
- Contrast: AA+ (0.7+ lightness diff between text/background)
- Focus indicators: ring accent, visible at 2px
- Typography: 16px+ base, max 75ch line width
- Motion: no autoplay animations, respect prefers-reduced-motion
