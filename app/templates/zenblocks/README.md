# ZenBlocks — Landing Page Template

A modern, production-ready landing page template built with 
Next.js 15, Tailwind CSS, Shadcn UI, and Framer Motion.
Fully dark mode supported. Mobile-first. Sold as a premium template.

## What's included
- 7 fully built page sections (Hero, Features, Testimonials, 
  Pricing, FAQ, CTA, Footer)
- Dark / light mode toggle
- Framer Motion scroll animations
- 39 real developer testimonials
- Fully typed with TypeScript
- All data separated into /data folder for easy editing

## Tech Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- next-themes
- Lucide React

## Prerequisites
- Node.js 18+
- npm, pnpm, or yarn

## Quick Start (3 steps)
1. `npm install`
2. `npx shadcn@latest init`
3. `npm run dev`

## Package Installation
The following packages are included in `package.json`:
- `framer-motion`
- `next-themes`
- `lucide-react`
- `tailwind-merge`
- `clsx`
- `class-variance-authority`

Shadcn UI components to add:
`npx shadcn@latest add button card badge avatar accordion sheet separator`

## Dark Mode
This template uses `next-themes` for dark mode support. The `ThemeProvider` is configured in `app/layout.tsx`. To change the default theme, modify the `defaultTheme` prop in the `ThemeProvider`.

## Customization Guide
- **Change colors**     → `tailwind.config.ts` or `app/globals.css`
- **Edit content**      → `data/` folder
- **Edit sections**     → `components/sections/`
- **Change fonts**      → `app/layout.tsx`

## Folder Guide
- `app/`: Next.js app router files and global styles.
- `components/sections/`: Main landing page sections (Hero, Features, etc.).
- `components/layout/`: Shared layout components (Navbar, Footer).
- `components/ui/`: Reusable UI primitives (Shadcn + ZenBlocks).
- `data/`: Centralized content files for easy editing.
- `lib/`: Utility functions and constants.
- `hooks/`: Custom React hooks.
- `types/`: TypeScript definitions.
- `public/`: Static assets (images, icons).

## Build for Production
```bash
npm run build
npm run start
```

## License
MIT — free for personal and commercial use.

## Author
Built by Sayantan Bera
[GitHub](https://github.com/sayantanmbera) / [LinkedIn](https://www.linkedin.com/in/sayantanmbera) / [Website](https://sayantanbera.com)
