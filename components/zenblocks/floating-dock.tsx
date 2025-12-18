"use client";

import React, { useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";


import {
    LayoutGrid,
    Home,
    Layers,
    Settings,
    Github,
    Twitter
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface FloatingDockItem {
    title: string;
    icon: React.ReactElement; // Using ReactElement to allow cloning for strokeWidth
    href: string;
}

const DEFAULT_DOCK_ITEMS: FloatingDockItem[] = [
    {
        title: "Home",
        icon: <Home className="h-full w-full" />,
        href: "#",
    },
    {
        title: "Components",
        icon: <LayoutGrid className="h-full w-full" />,
        href: "#",
    },
    {
        title: "Blocks",
        icon: <Layers className="h-full w-full" />,
        href: "#",
    },
    {
        title: "Twitter",
        icon: <Twitter className="h-full w-full" />,
        href: "#",
    },
    {
        title: "GitHub",
        icon: <Github className="h-full w-full" />,
        href: "#",
    },
    {
        title: "Settings",
        icon: <Settings className="h-full w-full" />,
        href: "#",
    },
];

export const FloatingDock = ({
    items = DEFAULT_DOCK_ITEMS,
    desktopClassName,
    mobileClassName,
}: {
    items?: FloatingDockItem[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: FloatingDockItem[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-4 inset-x-0 flex flex-col gap-3 items-center"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.8,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20, delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    className="h-12 w-12 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 shadow-xl"
                                >
                                    <div className="h-5 w-5">{item.icon}</div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-12 w-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-2xl transition-transform active:scale-90"
            >
                <LayoutGrid className="h-6 w-6 text-white dark:text-zinc-900" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: FloatingDockItem[];
    className?: string;
}) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden md:flex h-20 gap-4 items-end rounded-[2.5rem] bg-white/40 dark:bg-zinc-950/40 backdrop-blur-3xl px-6 pb-4 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
}: {
    mouseX: any;
    title: string;
    icon: React.ReactElement;
    href: string;
    // Fixed: Explicitly added key to the props type to resolve mapping error
    key?: React.Key;
}) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val: number) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Proximity Scaling - Iconic Zen "Liquid" feel
    let widthSync = useTransform(distance, [-150, 0, 150], [44, 90, 44]);
    let heightSync = useTransform(distance, [-150, 0, 150], [44, 90, 44]);

    // Floating Effect - Lift icons as they scale
    let ySync = useTransform(distance, [-150, 0, 150], [0, -12, 0]);

    // Dynamic Stroke - Icons get bolder when focused
    let strokeSync = useTransform(distance, [-150, 0, 150], [1.5, 2.5, 1.5]);

    let width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });
    let height = useSpring(heightSync, { mass: 0.1, stiffness: 200, damping: 15 });
    let y = useSpring(ySync, { mass: 0.1, stiffness: 200, damping: 15 });
    let strokeWidth = useSpring(strokeSync, { mass: 0.1, stiffness: 200, damping: 15 });

    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width, height, y }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center relative shadow-sm border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group/dock-item"
            >
                {/* Internal Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-zinc-200/50 to-transparent dark:from-white/5 opacity-0 group-hover/dock-item:opacity-100 transition-opacity"
                />

                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
                            animate={{ opacity: 1, y: -45, x: "-50%", scale: 1 }}
                            exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="px-3 py-1 whitespace-pre rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 absolute left-1/2 -top-8 w-fit text-[10px] font-black uppercase tracking-widest shadow-2xl z-50"
                        >
                            {title}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-zinc-950 dark:bg-white" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="flex items-center justify-center w-full h-full p-2"
                >
                    {React.cloneElement(icon, {
                        // @ts-ignore - Dynamically injecting strokeWidth for Lucide icons
                        strokeWidth: strokeWidth.get(),
                        className: cn("w-1/2 h-1/2 transition-colors", hovered ? "text-zinc-900 dark:text-white" : "text-zinc-500")
                    })}
                </motion.div>

                {/* Indicator Dot */}
                {hovered && (
                    <motion.div
                        layoutId="indicator"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-900 dark:bg-white"
                    />
                )}
            </motion.div>
        </Link>
    );
}