"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const DEFAULT_IMAGES = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop",
];

interface ImageTrailProps {
    images?: string[];
    className?: string;
    containerClassName?: string;
}

export const ImageTrail = ({
    images = DEFAULT_IMAGES,
    className,
    containerClassName,
}: ImageTrailProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement[]>([]);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const zIndex = useRef(1);
    const activeIndex = useRef(0);

    // Initial setup: hide all images
    useGSAP(() => {
        gsap.set(imagesRef.current, {
            opacity: 0,
            scale: 0.5,
            xPercent: -50,
            yPercent: -50,
            visibility: "hidden"
        });
    }, { scope: containerRef });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate distance from last drop
        const dist = Math.hypot(x - lastX.current, y - lastY.current);

        if (dist > 60) {
            const img = imagesRef.current[activeIndex.current];
            if (img) {
                zIndex.current += 1;

                // Reset and clear any existing animation on this specific element
                gsap.killTweensOf(img);

                // Animate from cursor position
                gsap.fromTo(img,
                    {
                        x: x,
                        y: y,
                        scale: 0.5,
                        opacity: 0,
                        visibility: "visible",
                        rotate: Math.random() * 30 - 15,
                        zIndex: zIndex.current
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: "back.out(2)",
                        onComplete: () => {
                            // Fade out after a short delay
                            gsap.to(img, {
                                opacity: 0,
                                scale: 0.8,
                                delay: 1,
                                duration: 0.8,
                                ease: "power2.inOut",
                                onComplete: () => {
                                    gsap.set(img, { visibility: "hidden" });
                                }
                            });
                        }
                    }
                );

                // Update trackers
                activeIndex.current = (activeIndex.current + 1) % images.length;
                lastX.current = x;
                lastY.current = y;
            }
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative w-full h-[600px] overflow-hidden bg-zinc-50 dark:bg-zinc-950 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 cursor-crosshair group",
                containerClassName
            )}
        >
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none select-none">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                    Visual <span className="text-blue-500">Echo</span>
                </h2>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 opacity-60">
                    Trace the movement
                </p>
            </div>

            {/* Trail Elements */}
            {images.map((src, i) => (
                <div
                    key={i}
                    ref={(el) => { if (el) imagesRef.current[i] = el; }}
                    className={cn(
                        "absolute pointer-events-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-white dark:border-zinc-800 transition-transform duration-300 hover:scale-110",
                        className
                    )}
                    style={{ width: '200px', height: '260px' }}
                >
                    <img
                        src={src}
                        alt="echo"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};
