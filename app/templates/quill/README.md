# Quill - AI Writing Platform Landing Page

A premium, production-ready landing page template for AI writing tools and SaaS products. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-FF0054)

---

## 🚀 Features

- **Modern Stack** — Next.js 14 App Router, TypeScript, Tailwind CSS
- **Premium Typography** — Manrope, Cal Sans, and Instrument Sans fonts
- **Dark Theme** — Beautiful dark mode design with oklch color space
- **Fully Responsive** — Mobile-first design that looks great on all devices
- **Accessible** — WCAG AA compliant with proper ARIA attributes
- **Performant** — Optimized images, lazy loading, and GPU-accelerated animations
- **Easy Customization** — All content separated in `/data/` files, no code changes needed

---

## 📦 Prerequisites

- **Node.js** 18.17 or later
- **pnpm** 8.0 or later (recommended) or npm/yarn
- **Git** for version control

---

## 🛠️ Installation

1. **Clone or copy the template folder**

```bash
# If using as part of a larger project, the folder is already set up
# Navigate to the quill template folder
cd app/templates/quill
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Start the development server**

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. **Open in browser**

Navigate to [http://localhost:3000/templates/quill](http://localhost:3000/templates/quill)

---

## ✏️ Customizing Content

All content is separated into data files in the `/data/` folder. Update these files to customize your landing page without touching component code.

### Data Files Overview

| File | Content |
|------|---------|
| `data/nav.ts` | Navigation links and CTA button |
| `data/hero.ts` | Hero section headline, subheadline, CTAs, social proof |
| `data/logos.ts` | Partner/brand logos for the logo bar |
| `data/features.ts` | Feature cards with icons, titles, descriptions |
| `data/testimonials.ts` | Customer testimonials with ratings |
| `data/pricing.ts` | Pricing plans with features |
| `data/faq.ts` | FAQ questions and answers |
| `data/footer.ts` | Footer columns and links |
| `data/cta.ts` | Call-to-action section text and buttons |

### Example: Changing the Hero Headline

Edit `data/hero.ts`:

```typescript
export const HERO_DATA: HeroData = {
  headline: {
    part1: "Your Brand",
    part2: "Goes Here",
  },
  // ... rest of the data
};
```

---

## 🎨 Customizing Colors & Theme

Colors are defined in `globals.css` using CSS variables with oklch color space:

```css
:root {
  --background: oklch(0.09 0 0);
  --foreground: oklch(0.95 0 0);
  --primary: oklch(0.95 0 0);
  /* ... */
}
```

To change the theme, modify these CSS variables. The template supports both light and dark modes.

---

## 📱 Adding/Removing Sections

Sections are composed in `page.tsx`. To reorder, add, or remove sections:

```typescript
export default function QuillLandingPage() {
  return (
    <main>
      <NavBar />
      <Hero />
      {/* Add or remove sections here */}
      <Footer />
    </main>
  )
}
```

---

## 🖼️ Assets

### Favicon
Replace `public/icon.svg` with your brand icon (32x32 PNG for favicon.ico).

### OG Image
Replace `public/og-image.png` with a 1200x630px image for social sharing.

### Logo
Replace `public/logo.svg` with your SVG logo.

---

## 🌐 Browser & Device Support

- **Modern browsers** — Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Devices** — Desktop, Tablet, Mobile (responsive design)
- **No IE11 support**

---

## 📄 License

This template is provided for personal and commercial use. See LICENSE file for details.

---

## 🤝 Support

For questions or issues, please open an issue on the GitHub repository or contact the template author.

---

Built with ❤️ for the developer community
