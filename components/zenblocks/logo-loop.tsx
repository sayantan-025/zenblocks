"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Cpu, Globe, Zap, Shield, Database, Cloud } from "lucide-react";

export type LogoItem = {
    src?: string;
    node?: React.ReactNode;
    alt?: string;
    name?: string;
};

const DEFAULT_LOGOS: LogoItem[] = [
    { node: <Cpu size={20} className="text-blue-500" />, name: "Compute" },
    { node: <Globe size={20} className="text-emerald-500" />, name: "Edge" },
    { node: <Zap size={20} className="text-yellow-500" />, name: "Fast" },
    { node: <Shield size={20} className="text-purple-500" />, name: "Secure" },
    { node: <Database size={20} className="text-orange-500" />, name: "Storage" },
    { node: <Cloud size={20} className="text-cyan-500" />, name: "Cloud" },
];

interface LogoLoopProps {
    items?: LogoItem[];
    speed?: number;
    direction?: 'left' | 'right';
    gap?: number;
    logoHeight?: number;
    pauseOnHover?: boolean;
    className?: string;
}

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.2, // Faster response than reference
    MIN_COPIES: 2,
} as const;

/* -------------------------------------------------------------------------- */
/*                               LOGO BOX COMPONENT                           */
/* -------------------------------------------------------------------------- */

const LogoBox = ({ item, height }: { item: LogoItem; height: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, height, perspective: 1000 }}
            className="relative flex items-center justify-center px-8 py-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl group/logo transition-colors hover:bg-white dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-xl group"
        >
            {/* Glint Effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden rounded-2xl"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            </motion.div>

            {item.node ? (
                <div className="flex items-center gap-3">
                    {item.node}
                    {item.name && <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{item.name}</span>}
                </div>
            ) : (
                <img
                    src={item.src}
                    alt={item.alt || "logo"}
                    className="h-full w-auto grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100 scale-90 group-hover:scale-100"
                />
            )}
        </motion.div>
    );
};

/* -------------------------------------------------------------------------- */
/*                                MAIN LOGO LOOP                              */
/* -------------------------------------------------------------------------- */

export const LogoLoop = ({
    items = DEFAULT_LOGOS,
    speed = 100, // px per second
    direction = 'left',
    gap = 24,
    logoHeight = 40,
    pauseOnHover = true,
    className
}: LogoLoopProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLDivElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(2);
    const [isHovered, setIsHovered] = useState(false);

    // Animation State
    const offsetRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);
    const velocityRef = useRef(speed * (direction === 'left' ? 1 : -1));

    // Determine copies needed
    useEffect(() => {
        const update = () => {
            if (!containerRef.current || !seqRef.current) return;
            const cWidth = containerRef.current.offsetWidth;
            const sWidth = seqRef.current.offsetWidth + gap;
            setSeqWidth(sWidth);
            const needed = Math.ceil(cWidth / sWidth) + 2;
            setCopyCount(Math.max(2, needed));
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [items, gap]);

    // Main RAF Loop
    useEffect(() => {
        const animate = (time: number) => {
            if (lastTimeRef.current === null) {
                lastTimeRef.current = time;
                requestAnimationFrame(animate);
                return;
            }

            const delta = (time - lastTimeRef.current) / 1000;
            lastTimeRef.current = time;

            // Smooth velocity transitions
            const targetVel = isHovered && pauseOnHover ? 0 : speed * (direction === 'left' ? 1 : -1);
            const easing = 1 - Math.exp(-delta / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (targetVel - velocityRef.current) * easing;

            if (seqWidth > 0 && trackRef.current) {
                offsetRef.current += velocityRef.current * delta;
                // Wrap offset
                offsetRef.current = (offsetRef.current % seqWidth + seqWidth) % seqWidth;
                trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
            }

            requestAnimationFrame(animate);
        };

        const id = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(id);
    }, [seqWidth, isHovered, speed, direction, pauseOnHover]);

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full overflow-hidden group/loop py-10", className)}
        >
            {/* Masking Gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

            <div
                ref={trackRef}
                className="flex w-max"
                style={{ gap }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {Array.from({ length: copyCount }).map((_, i) => (
                    <div
                        key={i}
                        ref={i === 0 ? seqRef : null}
                        className="flex shrink-0"
                        style={{ gap }}
                    >
                        {items.map((item, idx) => (
                            <LogoBox key={idx} item={item} height={logoHeight} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
