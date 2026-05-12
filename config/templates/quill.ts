import { Template } from "./types";

export const quillTemplate: Template = {
  id: "T001",
  slug: "quill",
  name: "Quill — AI Writing Platform",
  codename: "Premium AI Writing — v1.0",
  description:
    "A sophisticated dark-themed landing page for AI writing tools. Features smooth Lenis scroll, elegant animations, and a complete conversion-focused structure.",
  price: 79,
  originalPrice: 129,
  badge: "Featured",
  components: [
    { name: "Hero", color: "bg-zinc-500" },
    { name: "Pricing", color: "bg-emerald-500" },
    { name: "Features", color: "bg-purple-500" },
    { name: "Testimonials", color: "bg-amber-500" },
    { name: "FAQ", color: "bg-blue-500" },
  ],
  features: [
    "8+ Premium Sections",
    "Lenis Smooth Scroll",
    "Framer Motion Animations",
    "Dark Mode Optimized",
    "TypeScript Strict",
    "Industry-Level Architecture",
  ],
  demoPath: "/templates/quill",
  checkoutUrl: "https://your-store.lemonsqueezy.com/checkout/buy/quill",
  accent: "zinc",
  screenshot: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
};
