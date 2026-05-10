"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    ArrowRight,
    Box
} from "lucide-react";
import { cn } from "../../lib/utils";

const MotionDiv = motion.div as any;

/* -------------------------------------------------------------------------- */
/*                                 BENTOCARD                                  */
/* -------------------------------------------------------------------------- */

export interface BentoCardProps {
    children?: React.ReactNode;
    className?: string;
    /** Standard Props for Simple Mode */
    title?: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    visual?: React.ReactNode;
    /** Animation Delay */
    delay?: number;
    /** Href for making the card a link */
    href?: string;
}

/**
 * BentoCard: A versatile card with magnetic spotlight and spring/hover effects.
 * 
 * Usage Modes:
 * 1. Simple: Pass `title`, `description`, `icon`, `visual`.
 * 2. Custom: Pass `children` to render arbitrary content inside the spotlight shell.
 */
export const BentoCard = ({
    children,
    className = "",
    title,
    description,
    icon,
    visual,
    delay = 0,
    href
}: BentoCardProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const smoothX = useSpring(mouseX, { damping: 35, stiffness: 350 });
    const smoothY = useSpring(mouseY, { damping: 35, stiffness: 350 });

    const Container = href ? (motion.a as any) : MotionDiv;

    return (
        <Container
            href={href}
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
                "group relative flex flex-col overflow-visible rounded-[2rem] transition-all duration-500 text-left h-full",
                href && "cursor-pointer",
                className
            )}
        >
            {/* Dynamic Background Spotlight (Shared Logic) */}
            <div className={cn(
                "relative z-10 flex flex-col flex-1 overflow-hidden rounded-[2rem] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-700 h-full",
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
                <div className="relative z-20 flex-1 flex flex-col h-full">
                    {children ? (
                        // Custom Mode: Render children directly
                        children
                    ) : ( // Simple Mode: Render standard layout
                        <div className="flex flex-col h-full p-8 pt-12">
                            {/* Visual Placeholder Area */}
                            <div className="flex-1 w-full overflow-hidden rounded-xl mb-6 border border-zinc-200/40 dark:border-zinc-800/40 bg-zinc-100/30 dark:bg-zinc-900/30 relative flex items-center justify-center min-h-[140px]">
                                {visual || (
                                    <div className="flex flex-col items-center gap-2 opacity-20">
                                        <Box size={32} />
                                    </div>
                                )}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform ease-in-out" />
                            </div>

                            {/* Labeling & Iconography */}
                            <div className="flex items-center gap-5 text-left mt-auto">
                                <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0 shadow-sm text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950 transition-all duration-500">
                                    {icon || <ArrowRight size={14} />}
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    <h3 className="text-[13px] font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight truncate">
                                        {title}
                                    </h3>
                                    <div className="text-[11px] leading-relaxed text-zinc-400 dark:text-zinc-500 line-clamp-1 font-medium opacity-80">
                                        {description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

/* -------------------------------------------------------------------------- */
/*                            COMPOUND COMPONENTS                             */
/* -------------------------------------------------------------------------- */

export const BentoCardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h3 className={cn("text-base font-bold text-zinc-900 dark:text-zinc-100", className)}>
        {children}
    </h3>
);

export const BentoCardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p className={cn("text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed", className)}>
        {children}
    </p>
);

export const BentoCardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("p-6 flex-1", className)}>
        {children}
    </div>
);

// Namespace Attachments
(BentoCard as any).Title = BentoCardTitle;
(BentoCard as any).Description = BentoCardDescription;
(BentoCard as any).Content = BentoCardContent;

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