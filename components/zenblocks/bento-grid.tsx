"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    ArrowRight,
    Box,
    LayoutGrid,
    Layers,
    Activity,
    Zap,
    Terminal,
    Monitor,
    Component
} from "lucide-react";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div as any;

/* -------------------------------------------------------------------------- */
/*                                 BENTOCARD                                  */
/* -------------------------------------------------------------------------- */

export interface BentoCardProps {
    children?: React.ReactNode;
    className?: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    delay?: number;
    visual?: React.ReactNode;
}

/**
 * BentoCard: The foundational wrapper for each grid item.
 * Includes magnetic spotlight, technical metadata, and spring-based interactions.
 */
export const BentoCard: React.FC<BentoCardProps> = ({
    children,
    className = "",
    title,
    description,
    icon,
    delay = 0,
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
                "group relative flex flex-col overflow-visible rounded-[2.8rem] transition-all duration-500 cursor-pointer text-left",
                className
            )}
        >
            {/* Dynamic Background Spotlight (Shared Logic) */}
            <div className={cn(
                "relative z-10 flex flex-col flex-1 overflow-hidden rounded-[2.8rem] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-700",
                "group-hover:border-zinc-400 dark:group-hover:border-zinc-100/30",
                "group-hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_48px_96px_-24px_rgba(255,255,255,0.03)]"
            )}>

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

export interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8 md:auto-rows-[22rem]",
            className
        )}>
            {children}
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/*                                DEMO EXPORT                                 */
/* -------------------------------------------------------------------------- */

const TEMPLATE_ITEMS = [
    {
        title: "Core Architecture",
        description: "The primary structural foundation for all modular units.",
        className: "md:col-span-2 md:row-span-2",
        icon: <Layers size={14} />,
    },
    {
        title: "Telemetry Data",
        description: "Real-time process monitoring and flow statistics.",
        className: "md:col-span-1 md:row-span-1",
        icon: <Activity size={14} />,
    },
    {
        title: "Motion Engine",
        description: "Advanced physics-based interaction models.",
        className: "md:col-span-1 md:row-span-1",
        icon: <Zap size={14} />,
    },
    {
        title: "Interface Terminal",
        description: "Low-level system access for configuration.",
        className: "md:col-span-1 md:row-span-1",
        icon: <Terminal size={14} />,
    },
    {
        title: "Liquid Navigation",
        description: "Proximity-aware elastic UI components.",
        className: "md:col-span-2 md:row-span-1",
        icon: <Monitor size={14} />,
    },
    {
        title: "Primitive Stream",
        description: "The infinite ribbon of atomic layout building blocks.",
        className: "md:col-span-3 md:row-span-1",
        icon: <Component size={14} />,
    },
];

const BentoGridDemo = () => {
    return (
        <section className="relative py-24 bg-white dark:bg-zinc-950 overflow-hidden font-sans">
            {/* Subtle Background Grids */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:96px_96px]" />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <BentoGrid>
                    {TEMPLATE_ITEMS.map((item, i) => (
                        <BentoCard
                            key={i}
                            title={item.title}
                            description={item.description}
                            className={item.className}
                            icon={item.icon}
                            delay={i * 0.05}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    )
}

export default BentoGridDemo;