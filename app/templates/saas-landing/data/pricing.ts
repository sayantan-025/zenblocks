import type { PricingPlan } from "../types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for hobbyists and side projects.",
    features: ["5 Components", "Standard Support", "Basic Customization"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "The complete toolkit for serious builders.",
    features: ["All Components", "Priority Support", "Advanced Animations", "Source Files"],
    cta: "Upgrade to Pro",
    isPopular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For teams requiring maximum scale and control.",
    features: ["Unlimited Seats", "Custom Development", "SLA Support", "SSO & Security"],
    cta: "Contact Sales",
  },
];
