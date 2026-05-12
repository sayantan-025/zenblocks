"use client"

import React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
    ArrowRight,
    Box
} from "lucide-react"
import { cn } from "../../lib/utils"

/* -------------------------------------------------------------------------- */
/*                                 BENTOCARD                                  */
/* -------------------------------------------------------------------------- */

export interface BentoCardProps {
    children?: React.ReactNode
    className?: string
    title?: string
    description?: React.ReactNode
    icon?: React.ReactNode
    visual?: React.ReactNode
    delay?: number
    href?: string
}

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
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const smoothX = useSpring(mouseX, { damping: 35, stiffness: 350 })
    const smoothY = useSpring(mouseY, { damping: 35, stiffness: 350 })

    const Container = href ? motion.a : motion.div

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
                "group relative flex flex-col overflow-visible rounded-2xl transition-all duration-500 text-left h-full",
                href && "cursor-pointer",
                className
            )}
        >
            {/* Background */}
            <div className={cn(
                "relative z-10 flex flex-col flex-1 overflow-hidden rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 transition-all duration-700 h-full",
                "group-hover:border-zinc-700",
                "group-hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.3)]"
            )}>
                {/* Spotlights */}
                <motion.div
                    className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                    style={{
                        background: useTransform(
                            [smoothX, smoothY],
                            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.04), transparent 70%)`
                        ),
                    }}
                />

                {/* Content */}
                <div className="relative z-20 flex-1 flex flex-col h-full">
                    {children ? (
                        children
                    ) : (
                        <div className="flex flex-col h-full p-6 pt-8">
                            {/* Visual */}
                            <div className="flex-1 w-full overflow-hidden rounded-xl mb-6 border border-zinc-800/40 bg-zinc-800/20 relative flex items-center justify-center min-h-[120px]">
                                {visual || (
                                    <div className="flex flex-col items-center gap-2 opacity-20">
                                        <Box size={28} />
                                    </div>
                                )}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform ease-in-out" />
                            </div>

                            {/* Labeling */}
                            <div className="flex items-center gap-4 text-left mt-auto">
                                <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 shrink-0 shadow-sm text-zinc-400 group-hover:bg-white group-hover:text-zinc-900 transition-all duration-500">
                                    {icon || <ArrowRight size={14} />}
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                    <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-tight truncate">
                                        {title}
                                    </h3>
                                    <div className="text-xs leading-relaxed text-zinc-500 line-clamp-2">
                                        {description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    )
}

/* -------------------------------------------------------------------------- */
/*                            COMPOUND COMPONENTS                             */
/* -------------------------------------------------------------------------- */

export const BentoCardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h3 className={cn("text-base font-bold text-zinc-100", className)}>
        {children}
    </h3>
)

export const BentoCardDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p className={cn("text-sm text-zinc-400 leading-relaxed", className)}>
        {children}
    </p>
)

export const BentoCardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("p-6 flex-1", className)}>
        {children}
    </div>
)

// Compound component pattern
type BentoCardComponent = React.FC<BentoCardProps> & {
    Title: typeof BentoCardTitle
    Description: typeof BentoCardDescription
    Content: typeof BentoCardContent
}

;(BentoCard as BentoCardComponent).Title = BentoCardTitle
;(BentoCard as BentoCardComponent).Description = BentoCardDescription
;(BentoCard as BentoCardComponent).Content = BentoCardContent

/* -------------------------------------------------------------------------- */
/*                                 BENTOGRID                                  */
/* -------------------------------------------------------------------------- */

export interface BentoGridProps {
    children: React.ReactNode
    className?: string
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-5 gap-4 md:auto-rows-[20rem]",
            className
        )}>
            {children}
        </div>
    )
}
