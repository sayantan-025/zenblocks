# ZenBlocks

<div align="center">

**A high-performance, ownership-based UI component library for modern web applications**

[Documentation](https://zenblocks-three.vercel.app/docs) • [Components](https://zenblocks-three.vercel.app/docs/blocks) • [GitHub](https://github.com/sayantan-025/zenblocks)

</div>

---

## 🎯 Overview

**ZenBlocks** is a collection of sophisticated, physics-enabled UI components designed to vary from utility-first primitives to complex, interactive blocks. Unlike traditional npm packages, ZenBlocks leverages the **shadcn/ui CLI** to distribute code directly into your project, giving you complete ownership and control.

### ✨ Key Features

- **🔓 Ownership First**: Code is scaffolded into your `components/zenblocks` directory. You own it, you modify it.
- **🚀 Zero Runtime Lock-in**: Remove or refactor any part of the library without breaking external dependencies.
- **⚡ Modern Stack**: Built for **Tailwind CSS v4** and **React Server Components** by default.
- **🎨 Motion Centric**: Deep integrations with `framer-motion` and `gsap` for premium interactions.
- **📱 Fully Responsive**: All components are designed to work seamlessly across all device sizes.
- **🌗 Theme Support**: Built-in dark mode support using `next-themes`.

---

## 📦 Available Components

ZenBlocks includes 15+ production-ready components:

### Navigation & Layout
- **Navbar** - Responsive navigation with mobile menu and theme switching
- **Floating Dock** - macOS-style floating dock with smooth animations
- **Bento Grid** - Modern grid layout system for showcasing features

### Interactive Elements
- **Animated Button** - Button with engaging hover and click animations
- **Pressure Test** - Interactive pressure-sensitive component
- **Modal Dialog** - Accessible modal with smooth transitions
- **Toast** - Notification system with multiple variants

### Visual Components
- **Image Gallery** - GSAP-powered image gallery with smooth scrolling
- **Image Trail** - Mouse-following image trail effect
- **Logo Loop** - Infinite scrolling logo carousel
- **Orb Field** - Three.js-powered 3D particle field

### Utilities
- **Theme Switcher** - Elegant theme toggle component
- **Pre Loader** - Animated loading screen
- **Animated Clock** - Real-time animated clock display
- **Shuffle** - Text shuffling animation effect

---

## 🚀 Quick Start

### Prerequisites

Ensure your project has:

- **React 18+** or **Next.js 14+** (App Router recommended)
- **Tailwind CSS v4** (or v3 with appropriate config)
- **shadcn/ui** initialized in your project

### Installation

#### 1. Initialize shadcn/ui

ZenBlocks is built on top of shadcn/ui. Ensure it is initialized in your project:

```bash
npx shadcn@latest init
```

#### 2. Initialize Utils

Some ZenBlocks components rely on shared utilities. Run this command **once**:

```bash
npx shadcn@latest add https://zenblocks-three.vercel.app/r/utils.json
```

#### 3. Install Components

Install components individually using the CLI:

```bash
npx shadcn@latest add https://zenblocks-three.vercel.app/r/navbar.json
```

Replace `navbar` with any component name from the list above (in kebab-case).

#### 3. Use in Your Project

```tsx
import Navbar from "@/components/zenblocks/navbar";

export default function Layout() {
  return <Navbar />;
}
```

---

## 🛠️ Development

### Local Setup

```bash
# Clone the repository
git clone https://github.com/sayantan-025/zenblocks.git
cd zenblocks

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

### Project Structure

```
zenblocks/
├── app/                    # Next.js app directory
│   ├── (root)/            # Landing page
│   ├── docs/              # Documentation pages
│   └── preview/           # Component preview system
├── components/
│   ├── zenblocks/         # Core component library
│   ├── landing/           # Landing page components
│   └── mdx/               # MDX components for docs
├── content/
│   └── docs/              # Documentation content (MDX)
├── registry/              # Component registry for CLI
└── public/                # Static assets
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🎨 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://greensock.com/gsap/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Documentation**: [Fumadocs](https://fumadocs.vercel.app/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

---

## 📖 Documentation

Comprehensive documentation is available at [zenblocks-three.vercel.app/docs](https://zenblocks-three.vercel.app/docs), including:

- Installation guides
- Component API references
- Usage examples
- Customization tips
- Advanced configurations

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) architecture
- Inspired by modern design systems and component libraries
- Powered by the amazing Next.js and React ecosystems

---

<div align="center">

**Made with ❤️ by [Sayantan](https://github.com/sayantan-025)**

[⭐ Star on GitHub](https://github.com/sayantan-025/zenblocks) • [📖 Read the Docs](https://zenblocks-three.vercel.app/docs)

</div>
