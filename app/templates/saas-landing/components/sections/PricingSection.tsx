"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { PricingToggle } from "../ui/PricingToggle";
import { PRICING_PLANS } from "../../data/pricing";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

/**
 * Pricing section with monthly/yearly toggle and highlighted plans.
 */
export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <SectionWrapper id="pricing" className="bg-zinc-50 dark:bg-zinc-900/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Choose the plan that fits your needs. No hidden fees.
        </p>
        <PricingToggle isYearly={isYearly} onChange={setIsYearly} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col p-8 rounded-3xl border bg-background transition-all duration-300 hover:shadow-xl ${
              plan.isPopular ? "border-primary ring-1 ring-primary scale-105 z-10" : "border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full rounded-full h-12"
              variant={plan.isPopular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
