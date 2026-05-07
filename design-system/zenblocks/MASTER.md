# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** ZenBlocks
**Generated:** 2026-05-07
**Aesthetic:** Enterprise-grade Modernism (Clean, Robust, Physics-enabled)
**Core Library:** Tailwind CSS + Framer Motion
**Iconography:** Lucide-react

---

## Global Rules

### Color Palette (Zinc/Monochrome with Blue Accents)

| Role | Hex | CSS Variable | Tailwind Class |
|------|-----|--------------|----------------|
| Primary (Light) | `#18181b` | `--primary` | `bg-zinc-900` |
| Primary (Dark) | `#ffffff` | `--primary` | `dark:bg-white` |
| Background | `#ffffff` | `--background` | `bg-white` |
| Foreground | `#09090b` | `--foreground` | `text-zinc-950` |
| Muted | `#71717a` | `--muted-foreground` | `text-zinc-500` |
| Accent | `#3b82f6` | `--blue-500` | `bg-blue-500` |
| Border | `#e4e4e7` | `--border` | `border-zinc-200` |

**Color Notes:** High-contrast Zinc scale. Blue is used sparingly for active states or pulse indicators.

### Typography

- **Sans Font:** Geist Sans (Standard system-ui fallback)
- **Mono Font:** Geist Mono (Monospace fallback)
- **Mood:** Professional, Clean, Accessible, Modern
- **Scale:** 
  - Hero Title: `text-5xl md:text-7xl lg:text-8xl` (font-black, tracking-tighter)
  - Subheadline: `text-lg md:text-xl`
  - Body: `text-base`

---

## Component Specs

### Action Buttons
- **Style:** Pill-shaped (rounded-full), high-contrast.
- **Sizing:** `h-12` height, `sm:w-64` consistent width for balanced primary/secondary pairs.
- **Primary:** Zinc-900 bg (Light) / White bg (Dark). High shadow, interactive scaling (`active:scale-95`).
- **Secondary/Ghost:** Glass effect (`bg-white/40`), backdrop-blur, subtle borders.

### Layout & Containers
- **Max Width:** `max-w-7xl`
- **Padding:** `px-6` (Container), `py-32` (Sections)
- **Grid:** Subtle background grids (`opacity-4` to `opacity-8`) for technical depth.

---

## Style Guidelines

**Style:** Modern Enterprise UI

**Keywords:** Physics-enabled, clean, robust, enterprise-grade, high-performance.

**Key Effects:** 
- `backdrop-blur` for overlays.
- `framer-motion` for physics-based entry animations.
- Interactive particles/fields (OrbField) for background depth.
- No arrows in primary action buttons.

---

## Anti-Patterns (Do NOT Use)

- ❌ **Emoji Icons** — Always use `lucide-react` icons.
- ❌ **Sharp Corners on Buttons** — Use `rounded-full` for all action buttons.
- ❌ **Low Contrast** — Maintain high readability (Zinc-500 minimum for muted text).
- ❌ **Inconsistent Button Widths** — When pairing primary/secondary buttons, always match widths (standard: `sm:w-64`).

---

## Pre-Delivery Checklist

- [ ] Lucide icons used for all actions.
- [ ] `cursor-pointer` on all interactive elements.
- [ ] Responsive behavior verified (mobile-first approach).
- [ ] Dark mode support checked (Zinc-950 background).
- [ ] Smooth transitions (200-300ms) on hover.
- [ ] Button sizing matches `sm:w-64` for paired actions.
