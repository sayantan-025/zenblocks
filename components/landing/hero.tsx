"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Copy, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { OrbField } from "../zenblocks/orb-field";
import PressureTest from "../zenblocks/pressure-test";
import { Shuffle } from "../zenblocks/shuffle";


export const Hero = () => {
    const [copied, setCopied] = useState(false);
    const { resolvedTheme } = useTheme();

    const handleCopy = () => {
        navigator.clipboard.writeText("npm install zenblocks-ui");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Dynamic Colors based on Theme
    const isLight = resolvedTheme === "light";
    const orbColors = isLight
        ? [0x18181b, 0x71717a, 0xd4d4d8, 0xffffff]
        : [0xfafafa, 0xa1a1aa, 0x52525b, 0x09090b];

    return (
        <div className="relative min-h-dvh w-full flex flex-col justify-center items-center overflow-hidden bg-background text-foreground selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 font-sans">
            {/* Background OrbField */}
            <div className="absolute inset-0 z-0">
                <OrbField
                    count={60}
                    gravity={0.5}
                    friction={0.99}
                    wallBounce={0.8}
                    followCursor={true}
                    colors={orbColors}
                    ambientColor={0xffffff}
                    ambientIntensity={0.5}
                    lightIntensity={150}
                    materialParams={{
                        metalness: 0.6,
                        roughness: 0.5,
                        clearcoat: 0.1,
                        clearcoatRoughness: 0.2,
                    }}
                />
            </div>

            {/* Content Container */}
            <div className="container mx-auto relative z-20 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center pointer-events-none py-12 sm:py-24 md:py-32 min-h-[500px] justify-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="pointer-events-auto inline-flex items-center rounded-full border border-zinc-200 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-sm dark:border-zinc-800 mb-6 sm:mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                    <Shuffle text="v2.0 Now Available" />
                </motion.div>

                {/* TextPressure Animated Headline - Responsive Heights */}
                <div className="relative w-full max-w-[90vw] md:max-w-4xl h-20 sm:h-28 md:h-40 lg:h-48 xl:h-56 mb-6 sm:mb-8 pointer-events-auto flex items-center justify-center">
                    <PressureTest
                        text="ZENBLOCKS"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor={isLight ? "#18181b" : "#ffffff"}
                        minFontSize={24}
                    />
                </div>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 max-w-sm sm:max-w-xl md:max-w-2xl mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
                >
                    The enterprise-grade UI library for modern web applications.
                    <br className="hidden sm:block" />
                    Ship faster with{" "}
                    <span className="text-foreground font-semibold">
                        robust, physics-enabled components
                    </span>
                    .
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center px-4 sm:px-0"
                >
                    {/* Primary Button */}
                    <button className="group relative w-full sm:w-auto h-12 rounded-full bg-zinc-900 dark:bg-white px-8 text-white dark:text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 flex items-center justify-center gap-2">
                        <span className="font-semibold text-base">Get Started</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    {/* Secondary Button */}
                    <button
                        onClick={handleCopy}
                        className="group relative w-full sm:w-auto h-12 rounded-full bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 px-6 text-zinc-800 dark:text-zinc-200 shadow-sm transition-all hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 flex items-center justify-center gap-3 active:scale-95"
                    >
                        <span className="font-mono text-sm opacity-50 select-none">$</span>
                        <span className="font-mono text-sm font-medium truncate">
                            npm i zenblocks-ui
                        </span>
                        <div className="ml-1 p-1.5 rounded-md bg-transparent group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-colors shrink-0">
                            {copied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                                <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                            )}
                        </div>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};
