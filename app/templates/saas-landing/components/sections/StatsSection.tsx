"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { AnimatedCounter } from "../ui/AnimatedCounter";

const STATS = [
  { label: "Active Users", value: 50000, suffix: "+" },
  { label: "Components", value: 150, suffix: "+" },
  { label: "Performance", value: 100, suffix: "%" },
  { label: "Stars", value: 12000, suffix: "" },
];

/**
 * Stats section with animated counters to show scale.
 */
export function StatsSection() {
  return (
    <SectionWrapper className="bg-primary text-primary-foreground">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl md:text-5xl font-bold mb-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm md:text-base opacity-70 font-medium uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
