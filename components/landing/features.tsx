"use client";

import React from "react";
import { MoveRight, Zap, Shield, Smartphone, Box, Layers, Component } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div as any;

const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 350 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 350 });

    const background = useTransform(
        [smoothX, smoothY],
        ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, var(--spotlight-color), transparent 80%)`
    );

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            className="group relative flex flex-col p-8 rounded-[2.8rem] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
            style={{
                "--spotlight-color": "rgba(16, 185, 129, 0.15)" // Emerald spotlight
            } as React.CSSProperties}
        >
            {/* Spotlight Overlay */}
            <MotionDiv
                className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background }}
            />

            {/* Content */}
            <div className="relative z-20 flex flex-col gap-6">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white shadow-sm group-hover:scale-110 transition-transform duration-300 ease-spring">
                    {feature.icon}
                </div>

                <div className="space-y-3">
                    <h4 className="text-lg font-bold font-sans tracking-tight text-zinc-900 dark:text-zinc-100">
                        {feature.title}
                    </h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                        {feature.description}
                    </p>
                </div>
            </div>
        </MotionDiv>
    );
};

const FEATURES = [
    {
        title: "Weightless Physics",
        description: "Spring-based interactions that feel completely natural and responsive.",
        icon: <Zap className="w-4 h-4" />,
    },
    {
        title: "Type Safe",
        description: "Written in TypeScript with complete definitions for every prop.",
        icon: <Shield className="w-4 h-4" />,
    },
    {
        title: "Mobile First",
        description: "Touch-optimized gestures ensuring 60fps on all devices.",
        icon: <Smartphone className="w-4 h-4" />,
    },
    {
        title: "Framework Agnostic",
        description: "Core logic decoupled from rendering for maximum portability.",
        icon: <Box className="w-4 h-4" />,
    },
    {
        title: "Composition Ready",
        description: "Designed to be composed into complex, nested UIs easily.",
        icon: <Layers className="w-4 h-4" />,
    },
    {
        title: "Theme Aware",
        description: "Automatic dark mode support with CSS variable tokens.",
        icon: <Component className="w-4 h-4" />,
    },
];

export const Features = () => {
    return (
        <section className="relative py-32 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 border-dashed overflow-hidden">
            {/* Subtle Background Grids */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:96px_96px]" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col items-center gap-20">
                    {/* Header */}
                    <div className="flex flex-col items-center justify-center gap-6 text-center w-full">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8]"
                        >
                            Built for <br />
                            <span className="text-zinc-300 dark:text-zinc-800 italic">Perfection.</span>
                        </motion.h3>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm"
                        >
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                Core_Specs_v2
                            </span>
                        </motion.div>

                        <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl font-medium">
                            Every component is engineered to handle edge cases, race conditions, and heavy animation loads without dropping a frame.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((feature, i) => (
                            <FeatureCard key={i} feature={feature} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
