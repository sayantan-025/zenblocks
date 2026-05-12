"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import Image from "next/image"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion"
import { Star } from "lucide-react"
import { cn } from "../../lib/utils"

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                    */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
    text: string
    name: string
    role: string
    image?: string
    rating?: number
}

export interface TestimonialsColumnProps {
    testimonials: Testimonial[]
    duration?: number
    className?: string
    reverse?: boolean
    pauseOnHover?: boolean
    showRatings?: boolean
}

export interface TestimonialsProps {
    testimonials?: Testimonial[]
    pauseOnHover?: boolean
    showRatings?: boolean
    className?: string
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL CARD                                */
/* -------------------------------------------------------------------------- */

const TestimonialCard = ({
    testimonial,
    showRatings
}: {
    testimonial: Testimonial
    showRatings?: boolean
}) => {
    const initials = testimonial.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className="group relative rounded-xl border border-zinc-800/50 bg-zinc-900/80 backdrop-blur-xl p-5 hover:bg-zinc-800/80 hover:border-zinc-700 hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden cursor-pointer">
            {/* Glint Effect */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-700">
                        {testimonial.image ? (
                            <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-[10px] font-bold text-zinc-400">
                                {initials}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-100">
                            {testimonial.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                            {testimonial.role}
                        </span>
                    </div>
                </div>

                {/* Ratings */}
                {showRatings && testimonial.rating && (
                    <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={cn(
                                    "transition-colors",
                                    i < testimonial.rating!
                                        ? "fill-amber-400 text-amber-400"
                                        : "fill-zinc-800 text-zinc-800"
                                )}
                            />
                        ))}
                    </div>
                )}

                {/* Text */}
                <p className="text-sm leading-relaxed text-zinc-400">
                    &ldquo;{testimonial.text}&rdquo;
                </p>
            </div>
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*                                   COLUMN                                   */
/* -------------------------------------------------------------------------- */

export const TestimonialsColumn = ({
    testimonials,
    duration = 20,
    className,
    reverse = false,
    pauseOnHover = true,
    showRatings = true,
}: TestimonialsColumnProps) => {
    const [isPaused, setIsPaused] = useState(false)
    const columnRef = useRef<HTMLDivElement>(null)
    const [columnHeight, setColumnHeight] = useState(0)

    const y = useMotionValue(0)

    const duplicatedTestimonials = useMemo(() => [
        ...testimonials,
        ...testimonials,
        ...testimonials,
        ...testimonials,
    ], [testimonials])

    useEffect(() => {
        if (columnRef.current) {
            setColumnHeight(columnRef.current.scrollHeight / 4)
        }
    }, [testimonials])

    useAnimationFrame((time, delta) => {
        if (isPaused && pauseOnHover) return

        const moveAmount = (delta / 1000) * (columnHeight / duration)
        let currentY = y.get()

        if (reverse) {
            currentY += moveAmount
            if (currentY > 0) currentY = -columnHeight
        } else {
            currentY -= moveAmount
            if (currentY < -columnHeight) currentY = 0
        }

        y.set(currentY)
    })

    return (
        <div
            className={cn(
                "relative flex flex-col gap-6 max-h-[640px] overflow-hidden",
                "[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]",
                className
            )}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <motion.div
                ref={columnRef}
                style={{ y }}
                className="flex flex-col gap-6"
            >
                {duplicatedTestimonials.map((testimonial, i) => (
                    <TestimonialCard
                        key={`${testimonial.name}-${i}`}
                        testimonial={testimonial}
                        showRatings={showRatings}
                    />
                ))}
            </motion.div>
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*                                   MOSAIC                                   */
/* -------------------------------------------------------------------------- */

export function QuillTestimonials({
    testimonials,
    pauseOnHover = true,
    showRatings = true,
    className,
}: TestimonialsProps) {
    const items = (testimonials && testimonials.length > 0) ? testimonials : []

    if (items.length === 0) return null

    const col1 = items.slice(0, 3)
    const col2 = items.slice(3, 6)
    const col3 = items.slice(6, 9)

    return (
        <div
            className={cn("relative w-full max-w-5xl mx-auto", className)}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                <TestimonialsColumn
                    testimonials={col1}
                    duration={15}
                    pauseOnHover={pauseOnHover}
                    showRatings={showRatings}
                />
                <TestimonialsColumn
                    testimonials={col2}
                    duration={19}
                    className="hidden md:flex"
                    reverse={true}
                    pauseOnHover={pauseOnHover}
                    showRatings={showRatings}
                />
                <TestimonialsColumn
                    testimonials={col3}
                    duration={17}
                    className="hidden lg:flex"
                    pauseOnHover={pauseOnHover}
                    showRatings={showRatings}
                />
            </div>
        </div>
    )
}
