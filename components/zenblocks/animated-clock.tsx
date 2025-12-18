"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface DigitProps {
    value: string | number;
    className?: string;
}

const Digit = ({ value, className }: DigitProps) => {
    return (
        <div className={cn("relative h-[1.2em] w-[0.6em] overflow-hidden flex items-center justify-center font-mono text-4xl md:text-6xl font-black tracking-tighter", className)}>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={value}
                    initial={{ y: "100%", opacity: 0, filter: "blur(10px)", scale: 0.8 }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)", scale: 1 }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(10px)", scale: 0.8 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 0.5,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

const Separator = ({ className }: { className?: string }) => (
    <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className={cn("text-4xl md:text-6xl font-bold px-1", className)}
    >
        :
    </motion.div>
);

export const AnimatedClock = ({ className }: { className?: string }) => {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 3D Motion Values
    const x = useMotionValue(0);
    // ... (rest of the motion values)
    const y = useMotionValue(0);

    // Smooth springs for tilt
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Normalize mouse position for 3D tilt (-0.5 to 0.5)
        const relativeX = (event.clientX - rect.left) / rect.width;
        const relativeY = (event.clientY - rect.top) / rect.height;
        x.set(relativeX - 0.5);
        y.set(relativeY - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (!mounted) {
        return (
            <div className={cn(
                "group relative flex items-center justify-center gap-1 p-12 rounded-[3.5rem] bg-white/5 dark:bg-zinc-950/20 backdrop-blur-2xl border border-white/10 dark:border-white/5 shadow-2xl transition-all duration-500 w-[350px] h-[150px] mx-auto opacity-0",
                className
            )} />
        );
    }

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");

    return (
        <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "group relative flex items-center justify-center gap-1 p-12 rounded-[3.5rem] bg-white/20 dark:bg-zinc-950/20 backdrop-blur-2xl border border-white/40 dark:border-white/5 shadow-2xl transition-all duration-500 w-fit mx-auto cursor-default overflow-hidden",
                className
            )}
        >
            <div className="flex items-center" style={{ transform: "translateZ(50px)" }}>
                <Digit value={hours[0]} className="text-zinc-950 dark:text-white" />
                <Digit value={hours[1]} className="text-zinc-950 dark:text-white" />
            </div>

            <Separator className="text-zinc-400 dark:text-zinc-600" />

            <div className="flex items-center" style={{ transform: "translateZ(50px)" }}>
                <Digit value={minutes[0]} className="text-zinc-950 dark:text-white" />
                <Digit value={minutes[1]} className="text-zinc-950 dark:text-white" />
            </div>

            <Separator className="text-zinc-400 dark:text-zinc-600" />

            <div className="flex items-center" style={{ transform: "translateZ(50px)" }}>
                <Digit value={seconds[0]} className="text-zinc-500 opacity-50" />
                <Digit value={seconds[1]} className="text-zinc-500 opacity-50" />
            </div>
        </motion.div>
    );
};
