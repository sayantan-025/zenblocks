"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, AlertOctagon, Info, AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastData {
    id: string;
    title?: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
}

interface ToastContextValue {
    toasts: ToastData[];
    toast: (props: Omit<ToastData, "id">) => void;
    dismiss: (id: string) => void;
}

/* -------------------------------------------------------------------------- */
/*                                  CONTEXT                                   */
/* -------------------------------------------------------------------------- */

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*                                  REDUCER                                   */
/* -------------------------------------------------------------------------- */

type Action =
    | { type: "ADD_TOAST"; toast: ToastData }
    | { type: "DISMISS_TOAST"; id: string };

const toastReducer = (state: ToastData[], action: Action): ToastData[] => {
    switch (action.type) {
        case "ADD_TOAST":
            return [action.toast, ...state].slice(0, 5); // Limit to 5 toasts
        case "DISMISS_TOAST":
            return state.filter((t) => t.id !== action.id);
        default:
            return state;
    }
};

/* -------------------------------------------------------------------------- */
/*                                 PROVIDER                                   */
/* -------------------------------------------------------------------------- */

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, dispatch] = useReducer(toastReducer, []);

    const toast = (props: Omit<ToastData, "id">) => {
        const id = Math.random().toString(36).substring(2, 9);
        dispatch({ type: "ADD_TOAST", toast: { ...props, id } });
    };

    const dismiss = (id: string) => {
        dispatch({ type: "DISMISS_TOAST", id });
    };

    return (
        <ToastContext.Provider value={{ toasts, toast, dismiss }}>
            {children}
            <ToastViewport />
        </ToastContext.Provider>
    );
};

/* -------------------------------------------------------------------------- */
/*                                   HOOK                                     */
/* -------------------------------------------------------------------------- */

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

/* -------------------------------------------------------------------------- */
/*                                 VIEWPORT                                   */
/* -------------------------------------------------------------------------- */

function ToastViewport() {
    const { toasts } = useToast();

    return (
        <div
            className="fixed bottom-0 right-0 z-[100] flex flex-col gap-3 p-6 w-full max-w-[420px] pointer-events-none"
            aria-live="polite"
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} />
                ))}
            </AnimatePresence>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                TOAST ITEM                                  */
/* -------------------------------------------------------------------------- */

const VARIANT_STYLES: Record<ToastVariant, string> = {
    default: "border-zinc-200/50 bg-white/60 dark:bg-zinc-900/60 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    success: "border-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 shadow-lg shadow-emerald-500/20",
    error: "border-rose-500/20 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 shadow-lg shadow-rose-500/20",
    warning: "border-amber-500/20 bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 shadow-lg shadow-amber-500/20",
    info: "border-sky-500/20 bg-sky-50/80 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100 shadow-lg shadow-sky-500/20",
};

const VARIANT_ICONS: Record<ToastVariant, React.ReactNode> = {
    default: <Sparkles className="w-5 h-5 text-indigo-500" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shadow-sm" />,
    error: <AlertOctagon className="w-5 h-5 text-rose-500 shadow-sm" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shadow-sm" />,
    info: <Info className="w-5 h-5 text-sky-500 shadow-sm" />,
};

function ToastItem({ toast }: { toast: ToastData }) {
    const { dismiss } = useToast();
    const [paused, setPaused] = useState(false);
    const duration = toast.duration || 5000;

    useEffect(() => {
        if (paused) return;
        const timer = setTimeout(() => {
            dismiss(toast.id);
        }, duration);

        return () => clearTimeout(timer);
    }, [toast.id, duration, paused, dismiss]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 100, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 25, mass: 1 }}
            className={cn(
                "pointer-events-auto relative flex w-full items-start gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden group",
                VARIANT_STYLES[toast.variant || "default"]
            )}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            role="status"
        >
            {/* Animated Progress Bar */}
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: paused ? 1 : 0 }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className={cn(
                    "absolute bottom-0 left-0 w-full h-[2px] opacity-30 origin-left",
                    toast.variant === "error" ? "bg-rose-500" :
                        toast.variant === "success" ? "bg-emerald-500" :
                            toast.variant === "warning" ? "bg-amber-500" :
                                "bg-indigo-500"
                )}
            />

            {VARIANT_ICONS[toast.variant || "default"] && (
                <div className="shrink-0 pt-0.5">
                    {VARIANT_ICONS[toast.variant || "default"]}
                </div>
            )}
            <div className="flex-1 grid gap-1 relative z-10">
                {toast.title && <div className="text-sm font-bold leading-none tracking-tight">{toast.title}</div>}
                {toast.description && <div className="text-xs opacity-80 leading-relaxed font-medium">{toast.description}</div>}
            </div>
            <button
                onClick={() => dismiss(toast.id)}
                className="shrink-0 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/5 dark:hover:bg-white/10 focus:opacity-100 focus:outline-none"
                aria-label="Close"
            >
                <X className="w-4 h-4 opacity-50" />
            </button>

            {/* Background Gradient Blob */}
            <div className="absolute -z-10 -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent blur-2xl rounded-full pointer-events-none" />
        </motion.div>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   DEMO                                     */
/* -------------------------------------------------------------------------- */

export function ToastDemo() {
    return (
        <ToastProvider>
            <ToastDemoContent />
        </ToastProvider>
    );
}

function ToastDemoContent() {
    const { toast } = useToast();

    return (
        <div className="flex flex-wrap gap-4 items-center justify-center p-8 border rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 border-dashed border-zinc-200 dark:border-zinc-800">
            <button
                onClick={() => toast({ title: "Success", description: "Your file has been uploaded.", variant: "success" })}
                className="px-4 py-2 text-sm font-medium bg-emerald-100/50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 rounded-lg hover:bg-emerald-200/50 transition-colors"
            >
                Success
            </button>
            <button
                onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "error" })}
                className="px-4 py-2 text-sm font-medium bg-rose-100/50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 rounded-lg hover:bg-rose-200/50 transition-colors"
            >
                Error
            </button>
            <button
                onClick={() => toast({ title: "New Message", description: "Can we schedule a call?", variant: "default" })}
                className="px-4 py-2 text-sm font-medium bg-white text-zinc-900 border shadow-sm dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors"
            >
                Default
            </button>
        </div>
    );
}
