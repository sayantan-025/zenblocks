import { Template } from "./types";

export const saasLandingTemplate: Template = {
  id: "T002",
  slug: "saas-landing",
  name: "SaaS Landing — Pro Template",
  codename: "Modern SaaS Foundation — v1.0",
  description:
    "A complete, high-performance SaaS landing page featuring 10+ essential sections. Optimized for conversion with elite UI components and clean architecture.",
  price: 49,
  originalPrice: 79,
  badge: "New",
  components: [
    { name: "Hero", color: "bg-blue-500" },
    { name: "Pricing", color: "bg-emerald-500" },
    { name: "Features", color: "bg-purple-500" },
    { name: "Testimonials", color: "bg-amber-500" },
  ],
  features: [
    "10+ Conversion Sections",
    "Full Source Code Included",
    "Modern SaaS Aesthetic",
    "Responsive & Dark Mode Ready",
    "Optimized Performance",
    "Commercial License",
  ],
  demoPath: "/templates/saas-landing",
  checkoutUrl: "https://your-store.lemonsqueezy.com/checkout/buy/saas-landing",
  accent: "blue",
  screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
};
