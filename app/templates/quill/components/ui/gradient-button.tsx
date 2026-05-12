"use client"

import type { HTMLAttributes, ReactNode } from "react"
import Link from "next/link"

interface GradientButtonProps {
    children?: ReactNode
    href?: string
    onClick?: () => void
    disabled?: boolean
    className?: string
}

const GradientButton = ({
    children,
    href,
    className = "",
    onClick,
    disabled = false,
}: GradientButtonProps) => {
    return (
        <>
            <style>{`
                @keyframes rotateGradient {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
            `}</style>
            {href && !disabled ? (
                <Link
                    href={href}
                    className={`gradient-btn inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-zinc-100 hover:opacity-90 transition-opacity ${className}`}
                >
                    <span className="relative z-10">{children}</span>
                </Link>
            ) : (
                <div
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    className={`gradient-btn inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-zinc-100 hover:opacity-90 transition-opacity ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
                    onClick={disabled ? undefined : onClick}
                    aria-disabled={disabled}
                >
                    <span className="relative z-10">{children}</span>
                </div>
            )}
        </>
    )
}

export default GradientButton
