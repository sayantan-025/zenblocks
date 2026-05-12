"use client"

import React from "react"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { PRICING_DATA } from "../data"
import GradientButton from "../components/ui/gradient-button"
import { cn } from "../lib/utils"

export function Pricing() {
    return (
        <section id="pricing" className="relative px-6 py-24">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-zinc-950" />

            <div className="relative max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                        {PRICING_DATA.badge}
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        <span className="text-zinc-100 block">{PRICING_DATA.title.split(" ").slice(0, 2).join(" ")}</span>
                        <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                            {PRICING_DATA.title.split(" ").slice(2).join(" ")}
                        </span>
                    </h2>
                    <p className="text-zinc-500 max-w-xl mx-auto text-balance text-lg">
                        {PRICING_DATA.subtitle}
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-6 md:items-stretch">
                    {PRICING_DATA.plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col rounded-2xl border p-6 transition-all duration-500 cursor-pointer",
                                plan.highlight
                                    ? "bg-gradient-to-b from-zinc-100 via-zinc-50 to-white border-zinc-300 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.25)] scale-[1.02]"
                                    : "bg-zinc-900/80 backdrop-blur-xl border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900"
                            )}
                        >
                            {/* Popular Badge */}
                            {plan.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 text-zinc-100 text-xs font-semibold uppercase tracking-wider">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3 className={cn(
                                    "text-lg font-bold mb-2",
                                    plan.highlight ? "text-zinc-900" : "text-zinc-100"
                                )}>
                                    {plan.name}
                                </h3>
                                <p className={cn(
                                    "text-sm",
                                    plan.highlight ? "text-zinc-600" : "text-zinc-500"
                                )}>
                                    {plan.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    {plan.price !== "Custom" && plan.price !== "0" && (
                                        <span className={cn(
                                            "text-lg",
                                            plan.highlight ? "text-zinc-600" : "text-zinc-500"
                                        )}>
                                            $
                                        </span>
                                    )}
                                    <span className={cn(
                                        "font-display text-5xl font-bold",
                                        plan.highlight ? "text-zinc-900" : "text-zinc-100"
                                    )}>
                                        {plan.price === "0" ? "Free" : plan.price}
                                    </span>
                                    {plan.price !== "Custom" && plan.price !== "0" && (
                                        <span className={cn(
                                            "text-sm",
                                            plan.highlight ? "text-zinc-600" : "text-zinc-500"
                                        )}>
                                            /month
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className={cn(
                                "h-px mb-6",
                                plan.highlight ? "bg-zinc-200" : "bg-zinc-800/50"
                            )} />

                            {/* Features */}
                            <ul className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <div className={cn(
                                            "mt-0.5 p-1 rounded-md",
                                            plan.highlight
                                                ? "bg-zinc-200 text-zinc-900"
                                                : "bg-zinc-800 text-zinc-400"
                                        )}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className={cn(
                                            "text-sm leading-relaxed",
                                            plan.highlight ? "text-zinc-700" : "text-zinc-400"
                                        )}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <GradientButton
                                href="#"
                                className={cn(
                                    "w-full",
                                    plan.highlight && "opacity-90"
                                )}
                            >
                                {plan.cta}
                            </GradientButton>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
