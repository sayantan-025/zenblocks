import { Template } from "./types";

export const quillTemplate: Template = {
  id: "T001",
  slug: "quill",
  name: "Quill — AI Writing Platform",
  codename: "Premium AI Writing — v1.0",
  description:
    "A sophisticated dark-themed landing page for AI writing tools. Features smooth Lenis scroll, elegant animations, and a complete conversion-focused structure.",
  price: 29,
  originalPrice: 129,
  badge: "Featured",
  components: [
    { name: "NavBar", color: "bg-zinc-500" },
    { name: "Hero", color: "bg-zinc-600" },
    { name: "LogoBar", color: "bg-zinc-700" },
    { name: "Features", color: "bg-purple-500" },
    { name: "Testimonials", color: "bg-amber-500" },
    { name: "Pricing", color: "bg-emerald-500" },
    { name: "FAQ", color: "bg-blue-500" },
    { name: "CallToAction", color: "bg-indigo-500" },
    { name: "Footer", color: "bg-zinc-800" },
  ],
  features: [
    "9 Premium Sections",
    "Lenis Smooth Scroll",
    "Framer Motion Animations",
    "Dark Mode Optimized",
    "TypeScript Strict",
    "Industry-Level Architecture",
  ],
  demoPath: "/templates/quill",
  checkoutUrl: "https://your-store.lemonsqueezy.com/checkout/buy/quill",
  accent: "zinc",
  screenshot: "/templates/quill_preview.png",
};
