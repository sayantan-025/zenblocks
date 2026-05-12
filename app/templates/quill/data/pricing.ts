// Pricing section data for Quill landing page
import type { PricingData } from "../types";

export const PRICING_DATA: PricingData = {
  badge: "Pricing",
  title: "Simple, transparent pricing.",
  subtitle: "Start free. Scale when ready. No hidden fees.",
  plans: [
    {
      name: "Solo",
      price: "0",
      description:
        "Perfect for individual creators getting started.",
      features: [
        "10,000 words / month",
        "5 tone profiles",
        "Basic analytics",
        "3 languages",
        "Community support",
      ],
      cta: "Start free",
    },
    {
      name: "Pro",
      price: "39",
      description: "For power users and small content teams.",
      features: [
        "Unlimited words",
        "Unlimited tone profiles",
        "Advanced analytics",
        "50+ languages",
        "Priority support",
        "Custom templates",
      ],
      cta: "Get Pro",
      highlight: true,
    },
    {
      name: "Team",
      price: "Custom",
      description: "Enterprise-grade for large organizations.",
      features: [
        "Everything in Pro",
        "SSO & team management",
        "Dedicated account manager",
        "Custom AI fine-tuning",
        "SLA & compliance docs",
      ],
      cta: "Talk to sales",
    },
  ],
};
