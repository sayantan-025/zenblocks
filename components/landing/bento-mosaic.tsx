"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    LayoutGrid,
    ArrowRight,
    Layers,
    Box,
    Zap,
    Activity,
    Terminal,
    Monitor,
    Component
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import ZenBlocks
import { ImageGallery, DEFAULT_IMAGES } from "../zenblocks/image-gallery";
import { AnimatedClock } from "../zenblocks/animated-clock";
import PressureTest from "../zenblocks/pressure-test";
import { LogoLoop } from "../zenblocks/logo-loop";
import { ImageTrail } from "../zenblocks/image-trail";
import Link from "next/link";

const MotionDiv = motion.div as any;

/* -------------------------------------------------------------------------- */
/*                                 BENTOCARD                                  */
/* -------------------------------------------------------------------------- */

interface BentoCardProps {
    children?: React.ReactNode;
    className?: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    delay?: number;
    index?: number;
    visual?: React.ReactNode;
}

/**
 * BentoCard: The foundational wrapper for each grid item.
 * Includes magnetic spotlight, technical metadata, and spring-based interactions.
 */
const BentoCard: React.FC<BentoCardProps> = ({
    children,
    className = "",
    title,
    description,
    icon,
    delay = 0,
    index = 0,
    visual
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const smoothX = useSpring(mouseX, { damping: 35, stiffness: 350 });
    const smoothY = useSpring(mouseY, { damping: 35, stiffness: 350 });

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8 }}
            transition={{
                y: { type: "spring", stiffness: 200, damping: 20 },
                opacity: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
            }}
            onMouseMove={handleMouseMove}
            className={cn(
                "group relative flex flex-col overflow-visible rounded-[2.8rem] transition-all duration-500 cursor-pointer",
                className
            )}
        >
            {/* Dynamic Background Spotlight (Shared Logic) */}
            <div className={cn(
                "relative z-10 flex flex-col flex-1 overflow-hidden rounded-[2.8rem] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-700",
                "group-hover:border-zinc-400 dark:group-hover:border-zinc-100/30",
                "group-hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_48px_96px_-24px_rgba(255,255,255,0.03)]"
            )}>

                {/* Technical Data Overlays */}
                <div className="absolute top-6 left-10 z-30 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 flex gap-6 pointer-events-none font-mono">
                    <span className="text-[7px] font-black dark:text-white uppercase tracking-[0.3em]">REF_{index + 1}</span>
                    <span className="text-[7px] font-black dark:text-white uppercase tracking-[0.3em]">UNIT_{title.toUpperCase().replace(/\s+/g, '_')}</span>
                </div>

                {/* Spotlights */}
                <MotionDiv
                    className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [smoothX, smoothY],
                            ([x, y]: any[]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(0,0,0,0.03), transparent 70%)`
                        ),
                    }}
                />
                <MotionDiv
                    className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-1000 group-hover:dark:opacity-100 hidden dark:block"
                    style={{
                        background: useTransform(
                            [smoothX, smoothY],
                            ([x, y]: any[]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.04), transparent 70%)`
                        ),
                    }}
                />

                {/* Main Content Body */}
                <div className="relative z-20 flex-1 flex flex-col p-8 pt-12">
                    {/* Visual Placeholder Area */}
                    <div className="flex-1 w-full overflow-hidden rounded-[2rem] mb-6 border border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-100/30 dark:bg-zinc-900/30 relative flex items-center justify-center min-h-[140px]">
                        {visual || (
                            <div className="flex flex-col items-center gap-2 opacity-20">
                                <LayoutGrid size={32} />
                                <span className="text-[8px] font-black uppercase tracking-widest">Visual Module</span>
                            </div>
                        )}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform ease-in-out" />
                    </div>

                    {/* Labeling & Iconography */}
                    <div className="flex items-center gap-5 text-left">
                        <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0 shadow-sm text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950 transition-all duration-500">
                            {icon || <Box size={14} />}
                        </div>
                        <div className="space-y-1 overflow-hidden">
                            <h3 className="text-[13px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight truncate">
                                {title}
                            </h3>
                            <p className="text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500 line-clamp-1 font-medium opacity-80">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};

/* -------------------------------------------------------------------------- */
/*                                 BENTOGRID                                  */
/* -------------------------------------------------------------------------- */

const ITEMS = [
    {
        title: "Visual Gallery",
        description: "Immersive image interactions and seamless transitions.",
        className: "md:col-span-2 md:row-span-2",
        icon: <Layers size={14} />,
        visual: <ImageGallery items={DEFAULT_IMAGES} className="bg-transparent" />
    },
    {
        title: "Chronos Motion",
        description: "Real-time process monitoring and 3D time tracking.",
        className: "md:col-span-1 md:row-span-1",
        icon: <Activity size={14} />,
        visual: <AnimatedClock className="scale-75 shadow-none border-none bg-transparent" />
    },
    {
        title: "Typography Physics",
        description: "Interactive variable font dynamics.",
        className: "md:col-span-1 md:row-span-1",
        icon: <Zap size={14} />,
        visual: <PressureTest text="BLOCKS" className="text-zinc-900 dark:text-white p-4" />
    },
    {
        title: "Partner Ecosystem",
        description: "Smooth infinite ribbon of integrated technologies.",
        className: "md:col-span-3 md:row-span-1",
        icon: <Monitor size={14} />,
        visual: <LogoLoop logoHeight={40} gap={32} className="py-0" />
    },
    {
        title: "Visual Echo",
        description: "The infinite ribbon of atomic image building blocks.",
        className: "md:col-span-3 md:row-span-1",
        icon: <Component size={14} />,
        visual: <ImageTrail containerClassName="h-[300px] rounded-none border-none bg-transparent" />
    },
];

export const BentoMosaic = () => {
    return (
        <section className="relative py-32 bg-white dark:bg-zinc-950 overflow-hidden font-sans border-t border-zinc-200 dark:border-zinc-800 border-dashed">

            {/* Subtle Background Grids */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:96px_96px]" />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">

                {/* Section Header */}
                <div className="mb-32 flex flex-col items-center text-center gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                            10+ and counting
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8] mb-4 text-center"
                    >
                        The Modern <br />
                        <span className="text-zinc-300 dark:text-zinc-800 italic">Mosaic.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed font-medium mt-2"
                    >
                        A high-performance mosaic structure for showcasing modular library elements.
                        Engineered with absolute precision for the modern design ecosystem.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-6"
                    >
                        <Link href="/docs" className="flex items-center gap-3 group text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white border-b-2 border-zinc-200 dark:border-zinc-800 pb-2 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all">
                            Documentation
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* 3-Column Bento Mosaic */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:auto-rows-[28rem]">
                    {ITEMS.map((item, i) => (
                        <BentoCard
                            key={i}
                            index={i}
                            title={item.title}
                            description={item.description}
                            className={item.className}
                            icon={item.icon}
                            delay={i * 0.05}
                            visual={item.visual}
                        />
                    ))}
                </div>

                {/* Brand Signoff */}
                <div className="mt-48 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <div className="h-[1px] w-24 bg-zinc-200 dark:bg-zinc-800" />
                        <span className="text-[10px] font-black tracking-[0.8em] text-zinc-400 dark:text-zinc-600 uppercase">
                            Engineered by ZenBlocks
                        </span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
