"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { gsap, Observer } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { cn } from "@/lib/utils";

/**
 * ImageGallery Component
 * A premium, library-ready animated gallery featuring:
 * - Seamless infinite horizontal scrolling (auto-drift)
 * - Interactive scroll/drag via GSAP Observer
 * - 3D Tilt perspective hover effects
 * - Subtle internal parallax for images
 * - "Full Box" coverage with oversized images
 */

gsap.registerPlugin(Observer);

const IMAGES = [
    {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
        title: "Ethereal Valley",
        tag: "Nature"
    },
    {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
        title: "Mist Peaks",
        tag: "Atmosphere"
    },
    {
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
        title: "Infinite Forest",
        tag: "Serenity"
    },
    {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
        title: "Glass Lake",
        tag: "Reflection"
    },
    {
        url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200&auto=format&fit=crop",
        title: "Zen Bridge",
        tag: "Path"
    },
    {
        url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop",
        title: "Crimson Horizon",
        tag: "Twilight"
    },
];

interface ImageGalleryProps {
    className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Triple the images to ensure seamless infinite looping with zero pop-in
    const displayImages = useMemo(() => [...IMAGES, ...IMAGES, ...IMAGES], []);

    useGSAP(() => {
        if (!containerRef.current || !trackRef.current) return;

        const track = trackRef.current;
        const items = gsap.utils.toArray<HTMLElement>('.gallery-item');

        // Configuration
        const itemWidth = 288; // w-72 (288px)
        const gap = 32;       // gap-8 (32px)
        const totalStep = itemWidth + gap;
        const loopWidth = IMAGES.length * totalStep;

        gsap.set(track, { x: 0 });

        let xPos = 0;
        let isMoving = false;

        const updateLoop = () => {
            // Precise wrapping logic
            xPos = gsap.utils.wrap(-loopWidth, 0, xPos);
            gsap.set(track, { x: xPos });

            // Advanced Parallax & Perspective
            items.forEach((item) => {
                const img = item.querySelector('.parallax-img');
                if (img) {
                    const rect = item.getBoundingClientRect();
                    const containerRect = containerRef.current!.getBoundingClientRect();
                    const centerX = containerRect.left + containerRect.width / 2;
                    const itemCenterX = rect.left + rect.width / 2;

                    // Ratio of distance from center (-1 to 1)
                    const distRatio = (itemCenterX - centerX) / (containerRect.width / 2);

                    // Parallax: Move image opposite to scroll
                    // Using xPercent: 10 with scale-150 provides safe coverage
                    gsap.set(img, { xPercent: distRatio * 10 });
                }
            });
        };

        const observer = Observer.create({
            target: containerRef.current,
            type: "wheel,touch,pointer",
            onPress: (self: any) => (self.target as HTMLElement).style.cursor = 'grabbing',
            onRelease: (self: any) => (self.target as HTMLElement).style.cursor = 'grab',
            onChange: (self: any) => {
                const delta = self.deltaX || self.deltaY;
                isMoving = true;

                gsap.to({}, {
                    duration: 0.6,
                    ease: "power2.out",
                    onUpdate: function () {
                        const progress = this.progress();
                        xPos += (delta * 0.4) * (1 - progress);
                        updateLoop();
                    },
                    onComplete: () => { isMoving = false; }
                });
            }
        });

        // "Zen" Auto-Drift
        const drift = gsap.to({}, {
            duration: 1,
            repeat: -1,
            onUpdate: () => {
                if (!observer.isDragging && !observer.isPressed && !isMoving) {
                    xPos -= 0.6;
                    updateLoop();
                }
            }
        });

        // Entrance Animation
        gsap.fromTo(items,
            { y: 100, opacity: 0, rotationX: -20 },
            { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }
        );

        // Localized Card Interactions (3D perspective + localized glint)
        items.forEach((item) => {
            const card = item as HTMLElement;
            const img = item.querySelector('.parallax-img');
            const overlay = item.querySelector('.gallery-overlay');
            const title = item.querySelector('.gallery-title');
            const glint = item.querySelector('.card-glint') as HTMLElement;

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    zIndex: 20,
                    duration: 0.4,
                    ease: "power2.out"
                });
                gsap.to(img, { scale: 1.4, duration: 0.8, ease: "power2.out" });
                gsap.to(overlay, { opacity: 1, duration: 0.4 });
                gsap.to(title, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 });
                gsap.to(glint, { opacity: 1, duration: 0.3 });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    zIndex: 1,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.4
                });
                gsap.to(img, { scale: 1.6, duration: 0.8 });
                gsap.to(overlay, { opacity: 0, duration: 0.3 });
                gsap.to(title, { y: 20, opacity: 0, duration: 0.3 });
                gsap.to(glint, { opacity: 0, duration: 0.3 });
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const dx = x - xc;
                const dy = y - yc;

                // 3D Tilt
                gsap.to(card, {
                    rotationY: dx / 15,
                    rotationX: -dy / 15,
                    duration: 0.4,
                    ease: "power2.out"
                });

                // Localized Glint movement
                gsap.to(glint, {
                    x: x - 150, // Half of glint size
                    y: y - 150,
                    duration: 0.2,
                    ease: "power1.out"
                });
            });
        });

        return () => {
            observer.kill();
            drift.kill();
        };
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full h-[600px] overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex items-center cursor-grab active:cursor-grabbing select-none perspective-1000",
                className
            )}
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none" />

            <div
                ref={trackRef}
                className="flex gap-8 px-24 will-change-transform"
            >
                {displayImages.map((imgData, i) => (
                    <div
                        key={i}
                        className="gallery-item relative flex-shrink-0 w-72 aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-zinc-200/50 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-500 hover:shadow-black/5 dark:hover:shadow-white/5"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* The "Full Box" Image with internal parallax */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                            <img
                                src={imgData.url}
                                alt={imgData.title}
                                className="parallax-img absolute inset-0 w-full h-full object-cover scale-160 grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>

                        {/* Premium Overlay (Consistent Dark for contrast) */}
                        <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 flex flex-col justify-end p-8 z-20 pointer-events-none">
                            <div className="gallery-title translate-y-5 opacity-0 transition-all duration-500">
                                <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-2 block">
                                    {imgData.tag}
                                </span>
                                <h3 className="text-xl font-medium text-white tracking-tight drop-shadow-sm">
                                    {imgData.title}
                                </h3>
                                <div className="w-12 h-[1px] bg-white/30 mt-4 overflow-hidden">
                                    <div className="w-full h-full bg-white origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100" />
                                </div>
                            </div>
                        </div>

                        {/* Card Glint Effect */}
                        <div className="card-glint absolute w-[300px] h-[300px] bg-white/20 rounded-full blur-[80px] opacity-0 pointer-events-none z-30" style={{ transform: 'translate(0, 0)' }} />

                        {/* Reflection Highlight */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                    </div>
                ))}
            </div>

            {/* Cinematic Vignettes */}
            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-zinc-50 via-zinc-50/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40 dark:to-transparent z-30 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-zinc-50 via-zinc-50/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40 dark:to-transparent z-30 pointer-events-none" />

            {/* Instruction Overlay (Optional hint) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500/60 dark:text-white/20 uppercase tracking-[0.4em] z-30 pointer-events-none animate-pulse">
                Scroll or Drag to Explore
            </div>

        </div>
    );
};
