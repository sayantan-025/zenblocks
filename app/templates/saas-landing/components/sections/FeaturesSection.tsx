"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "../ui/SectionWrapper";
import { FEATURES } from "../../data/features";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Palette, Smartphone, Moon } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Zap: Zap,
  Palette: Palette,
  Smartphone: Smartphone,
  Moon: Moon,
};

/**
 * Features section displaying key capabilities in a grid.
 */
export function FeaturesSection() {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          Everything You Need to Scale
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          High-performance primitives designed for the modern web. 
          Stop reinventing the wheel and start building.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, index) => {
          const Icon = ICON_MAP[feature.icon || "Zap"];
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-zinc-200 dark:border-zinc-800 bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
