"use client";

import * as React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

export interface AuthProvider {
    id: string;
    label: string;
    icon?: React.ReactNode;
    onSelect?: (id: string) => void;
    disabled?: boolean;
}

export interface AuthModelProps {
    title?: React.ReactNode;
    description?: React.ReactNode;

    providers: AuthProvider[];

    loadingProviderId?: string | null;

    footer?: React.ReactNode;

    showDivider?: boolean;
    dividerText?: string;

    className?: string;

    // Design specific props
    showLogo?: boolean;

    // Secondary Auth
    secondaryPlaceholder?: string;
    onSecondaryAction?: (value: string) => void;
    secondaryContent?: React.ReactNode;
    isSecondaryLoading?: boolean;
}

export const AuthModel = React.forwardRef<
    HTMLDivElement,
    AuthModelProps
>(function AuthModel(
    {
        title = "To use ZenBlocks you must log into an existing account or create one using one of the options below",
        description,
        providers,
        loadingProviderId,
        footer,
        showDivider = false,
        dividerText = "or continue with",
        className,
        showLogo = true,
        secondaryPlaceholder = "Email or Phone",
        onSecondaryAction,
        secondaryContent,
        isSecondaryLoading = false,
    },
    ref
) {
    const [secondaryValue, setSecondaryValue] = React.useState("");

    return (
        <div
            ref={ref}
            className={cn(
                "w-full max-w-md overflow-hidden border border-zinc-800 bg-zinc-950 rounded-3xl transition-all duration-300 shadow-2xl shadow-indigo-500/10",
                className
            )}
        >
            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                {/* Logo Section - Original ZenBlocks Design */}
                {showLogo && (
                    <div className="mb-6 sm:mb-8 mt-2 sm:mt-4 w-full flex flex-col items-center">
                        <div className="flex gap-1 items-center justify-center">
                            <div className="w-3.5 h-3.5 rounded-sm bg-white animate-pulse" />
                            <div className="w-3.5 h-3.5 rounded-sm bg-zinc-500" />
                            <div className="w-3.5 h-3.5 rounded-sm bg-zinc-700" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-white mt-3 sm:mt-4 italic">
                            ZenBlocks
                        </h1>
                    </div>
                )}

                <div className="p-0 mb-6 sm:mb-8">
                    <h2 className="text-zinc-200 text-base sm:text-lg font-medium text-center justify-center leading-relaxed">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm text-zinc-400 mt-2">{description}</p>
                    )}
                </div>

                <div className="w-full space-y-2.5 sm:space-y-3">
                    <div className="text-[10px] uppercase text-zinc-500 font-medium tracking-widest mb-4">
                        Best option below
                    </div>
                    {providers.map((provider) => {
                        const isLoading = loadingProviderId === provider.id;

                        return (
                            <Button
                                key={provider.id}
                                type="button"
                                variant="outline"
                                disabled={provider.disabled || isLoading}
                                onClick={() => provider.onSelect?.(provider.id)}
                                className="w-full h-11 sm:h-12 bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all rounded-xl gap-3 text-sm sm:text-base font-semibold"
                                aria-busy={isLoading}
                            >
                                {provider.icon && (
                                    <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                                        {provider.icon}
                                    </span>
                                )}

                                {isLoading ? "Please wait..." : provider.label}
                            </Button>
                        );
                    })}
                </div>

                {showDivider && (
                    <div className="w-full">
                        <div className="relative w-full my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase text-zinc-500">
                                <span className="bg-zinc-950 px-3 tracking-wide">
                                    {dividerText}
                                </span>
                            </div>
                        </div>

                        {secondaryContent || (
                            <div className="w-full space-y-3">
                                <Input
                                    type="text"
                                    placeholder={secondaryPlaceholder}
                                    value={secondaryValue}
                                    onChange={(e) => setSecondaryValue(e.target.value)}
                                    className="h-11 sm:h-12 bg-zinc-900 border-zinc-800 text-zinc-200 rounded-xl focus-visible:ring-zinc-700"
                                />
                                <Button
                                    disabled={isSecondaryLoading}
                                    onClick={() => onSecondaryAction?.(secondaryValue)}
                                    className="w-full h-11 sm:h-12 bg-white text-black hover:bg-zinc-200 transition-all rounded-xl text-sm sm:text-base font-bold shadow-lg shadow-white/5"
                                    aria-busy={isSecondaryLoading}
                                >
                                    {isSecondaryLoading ? "Please wait..." : "Continue"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {footer ? (
                    <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-zinc-500 text-center">
                        {footer}
                    </div>
                ) : (
                    <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-zinc-500 max-w-[280px]">
                        By signing in, you accept the{" "}
                        <a
                            href="/terms"
                            className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors"
                        >
                            Terms of Service
                        </a>{" "}
                        and acknowledge our{" "}
                        <a
                            href="/privacy"
                            className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        .
                    </div>
                )}
            </div>
        </div>
    );
});
