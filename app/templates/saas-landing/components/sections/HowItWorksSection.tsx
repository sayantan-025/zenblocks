"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";

const STEPS = [
  {
    title: "Select Components",
    description: "Browse our extensive library of physics-enabled primitives.",
  },
  {
    title: "Configure Styles",
    description: "Customize everything via Tailwind CSS and our design system.",
  },
  {
    title: "Ship to Production",
    description: "Deploy with confidence on Vercel or any modern hosting provider.",
  },
];

/**
 * How it Works section with a clear step-by-step process.
 */
export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="bg-zinc-50 dark:bg-zinc-900/50">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          Get Started in Seconds
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We've streamlined the workflow so you can focus on what matters.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 hidden lg:block -translate-y-1/2" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center bg-background p-8 rounded-3xl border shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-6 shadow-xl shadow-primary/20">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
