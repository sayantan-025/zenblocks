"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className={cn("w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse", className)} />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                isDark ? "bg-slate-900" : "bg-amber-100",
                className
            )}
            aria-label="Toggle Theme"
            role="switch"
            aria-checked={isDark}
            {...props}
        >
            <div className="relative h-8 w-8 overflow-hidden">
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 180 : 0,
                        scale: isDark ? 0.95 : 1
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
                    className="relative h-full w-full">
                    {/* Sun Core / Moon Body */}
                    <motion.div
                        className={cn(
                            "absolute inset-0 m-auto rounded-full transition-colors duration-500",
                            isDark ? "bg-slate-200" : "bg-amber-500"
                        )}
                        animate={{
                            width: isDark ? "75%" : "50%",
                            height: isDark ? "75%" : "50%",
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    />

                    {/* Mask for the Crescent Effect - Creates moon crescent */}
                    <motion.div
                        className="absolute rounded-full bg-slate-900"
                        style={{
                            width: "75%",
                            height: "75%",
                            top: "50%",
                            left: "50%",
                        }}
                        animate={{
                            x: isDark ? "-35%" : "-150%",
                            y: isDark ? "-65%" : "-50%",
                            opacity: isDark ? 1 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    />

                    {/* Sun Rays (Only visible in light mode) */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center text-amber-500"
                        animate={{
                            opacity: isDark ? 0 : 1,
                            rotate: isDark ? 180 : 0,
                            scale: isDark ? 0.8 : 1
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1.5 rounded-full bg-current"
                                style={{
                                    top: "0",
                                    transform: `rotate(${i * 45}deg)`,
                                    transformOrigin: "center 16px"
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Glow Effect */}
            <div className={cn(
                "absolute inset-0 rounded-full blur-xl transition-opacity duration-500 opacity-40",
                isDark ? "bg-indigo-500" : "bg-amber-400"
            )} />

        </button>
    );
}

export function ThemeSwitcherDemo() {
    return (
        <div className="flex flex-col items-center justify-center gap-8 py-12">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                Toggle Me
            </h3>
            <ThemeSwitcher />
        </div>
    );
}
