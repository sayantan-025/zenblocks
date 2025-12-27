"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon, ArrowRight } from "lucide-react";

/**
 * AnimatedButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 */
export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Optional icon component to display after the label */
    icon?: LucideIcon;
    /** Accent color for the glow and border effects (e.g., #6366f1) */
    accentColor?: string;
    /** Intensity of the magnetic pull (0 to 1) */
    effectStrength?: number;
}

/**
 * AnimatedButton
 * 
 * A signature ZenBlocks component featuring a tactile magnetic hover attraction.
 * It uses spring-physics to pull the entire button towards the cursor within its bounds.
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    children,
    className,
    icon: Icon,
    accentColor = "#6366f1", // Default indigo-500
    effectStrength = 1,
    onMouseMove,
    onMouseLeave,
    ...props
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Motion values for magnetic displacement
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for high-end feel
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Parallax secondary movement for internal content
    const contentX = useTransform(springX, (val) => val * 0.4);
    const contentY = useTransform(springY, (val) => val * 0.4);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Calculate magnetic pull (max 15px displacement)
        x.set(distanceX * 0.3 * effectStrength);
        y.set(distanceY * 0.3 * effectStrength);

        if (onMouseMove) onMouseMove(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        x.set(0);
        y.set(0);
        if (onMouseLeave) onMouseLeave(e);
    };

    // Destructure to separate motion-conflicting props
    const {
        onDrag, onDragStart, onDragEnd,
        onAnimationStart, onDragOver, onDragEnter, onDragLeave,
        ...filteredProps
    } = props;

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: springX,
                y: springY,
            }}
            className={cn(
                "group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl",
                "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800",
                "text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-[0.2em] text-[10px]",
                "transition-colors duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-900",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
                className
            )}
            {...filteredProps}
        >
            {/* Dynamic Glow Overlay */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl pointer-events-none"
                style={{ backgroundColor: accentColor }}
            />

            {/* Inner Content with Parallax */}
            <motion.div
                className="relative z-10 flex items-center justify-center gap-3"
                style={{
                    x: contentX,
                    y: contentY,
                }}
            >
                <span className="relative">{children}</span>
                {Icon && (
                    <Icon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                )}
            </motion.div>

            {/* Accent Border Reveal */}
            <div
                className="absolute inset-[-1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border"
                style={{ borderColor: accentColor }}
            />
        </motion.button>
    );
};

export function AnimatedButtonDemo() {
    return (
        <div className="flex flex-col items-center justify-center p-24 rounded-xl border bg-zinc-50 dark:bg-zinc-950 overflow-hidden min-h-[500px] w-full">
            <AnimatedButton icon={ArrowRight}>Experience Aura</AnimatedButton>
            <div className="mt-8 text-[10px] uppercase tracking-widest text-zinc-400 font-bold opacity-50">
                Hover to feel the pull
            </div>
        </div>
    );
}

export default AnimatedButton;
