"use client"

import React from "react"
import * as LucideIcons from "lucide-react"
import { FEATURES_DATA } from "../data"
import { BentoCard, BentoGrid } from "../components/zenblocks"
import { cn } from "../lib/utils"

const getIcon = (iconName: string) => {
    const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
    const IconComponent = icons[iconName]
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null
}

const getColSpan = (index: number) => {
    const spans = ["md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-3"]
    return spans[index] || "md:col-span-2"
}

export function Features() {
    return (
        <section id="features" className="relative px-6 py-24">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-zinc-950" />

            <div className="relative max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">
                        {FEATURES_DATA.badge}
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        <span className="text-zinc-100 block">{FEATURES_DATA.title.split(" ").slice(0, 3).join(" ")}</span>
                        <span className="bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                            {FEATURES_DATA.title.split(" ").slice(3).join(" ")}
                        </span>
                    </h2>
                    <p className="text-zinc-500 max-w-xl mx-auto text-balance text-lg">
                        {FEATURES_DATA.subtitle}
                    </p>
                </div>

                {/* Bento Grid */}
                <BentoGrid>
                    {FEATURES_DATA.items.map((feature, index) => (
                        <BentoCard
                            key={feature.id}
                            title={feature.title}
                            description={feature.description}
                            icon={getIcon(feature.icon)}
                            className={cn(getColSpan(index), "col-span-1")}
                            delay={index * 0.1}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    )
}
