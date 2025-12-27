"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    useCallback,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface ModalContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    titleId: string;
    descriptionId: string;
}

/* -------------------------------------------------------------------------- */
/*                                  CONTEXT                                   */
/* -------------------------------------------------------------------------- */

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("Modal compound components must be used within <ModalDialog>");
    }
    return context;
}

/* -------------------------------------------------------------------------- */
/*                                ROOT COMPONENT                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*   Fix: Explicitly type children as ReactNode to avoid framer-motion clash   */
/* -------------------------------------------------------------------------- */

interface ModalDialogProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
}

export function ModalDialog({
    children,
    open: controlledOpen,
    onOpenChange,
    defaultOpen = false,
}: ModalDialogProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
        (newOpen: boolean) => {
            if (!isControlled) {
                setInternalOpen(newOpen);
            }
            onOpenChange?.(newOpen);
        },
        [isControlled, onOpenChange]
    );

    const titleId = React.useId();
    const descriptionId = React.useId();

    return (
        <ModalContext.Provider value={{ open: !!open, setOpen, titleId, descriptionId }}>
            {children}
        </ModalContext.Provider>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   TRIGGER                                  */
/* -------------------------------------------------------------------------- */

export function ModalTrigger({
    children,
    asChild = false,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
    const { setOpen } = useModal();

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: (e: React.MouseEvent) => {
                (children as React.ReactElement<any>).props.onClick?.(e);
                setOpen(true);
            },
            ...props,
        });
    }

    return (
        <button onClick={() => setOpen(true)} className={className} {...props}>
            {children}
        </button>
    );
}

/* -------------------------------------------------------------------------- */
/*                                   PORTAL                                   */
/* -------------------------------------------------------------------------- */

function Portal({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted || typeof document === "undefined") return null;
    return createPortal(children, document.body);
}

/* -------------------------------------------------------------------------- */
/*                                   CONTENT                                  */
/* -------------------------------------------------------------------------- */

interface ModalContentProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    overlayClassName?: string;
    hideCloseButton?: boolean;
    spotlightColor?: string;
}

export function ModalContent({
    children,
    className,
    overlayClassName,
    hideCloseButton = false,
    spotlightColor = "rgba(255, 255, 255, 0.1)",
    ...props
}: ModalContentProps) {
    const { open, setOpen, titleId, descriptionId } = useModal();
    const contentRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Update spotlight on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = contentRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    // Focus Trap
    useEffect(() => {
        if (!open) return;
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = contentRef.current;
        if (!modal) return;

        const firstElement = modal.querySelectorAll<HTMLElement>(focusableElements)[0];
        const timer = setTimeout(() => firstElement?.focus(), 50);

        const handleTab = (e: KeyboardEvent) => {
            if (e.key === "Tab") {
                const focusable = modal.querySelectorAll<HTMLElement>(focusableElements);
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last?.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first?.focus();
                    }
                }
            }
        };

        modal.addEventListener("keydown", handleTab);
        return () => {
            modal.removeEventListener("keydown", handleTab);
            clearTimeout(timer);
        };
    }, [open]);

    // Scroll Lock
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [open]);

    // Escape Key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                setOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, setOpen]);

    return (
        <Portal>
            <AnimatePresence>
                {open && (
                    <>
                        {/* Spotlight Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "fixed inset-0 z-[100] bg-zinc-950/60 backdrop-blur-md",
                                overlayClassName
                            )}
                            onClick={() => setOpen(false)}
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
                        </motion.div>

                        {/* Dialog */}
                        <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4">
                            <motion.div
                                ref={contentRef}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby={titleId}
                                aria-describedby={descriptionId}
                                initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={cn(
                                    "pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl isolate",
                                    className
                                )}
                                onMouseMove={handleMouseMove}
                                {...props}
                            >
                                {/* Spotlight Cursor Effect */}
                                <div
                                    className="absolute -inset-px pointer-events-none opacity-50 transition-opacity duration-300"
                                    style={{
                                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`
                                    }}
                                />

                                <div className="relative z-10 bg-zinc-950/90 h-full w-full">
                                    {children}
                                </div>

                                {!hideCloseButton && (
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute right-4 top-4 z-50 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </button>
                                )}
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
}

/* -------------------------------------------------------------------------- */
/*                                SUBCOMPONENTS                               */
/* -------------------------------------------------------------------------- */

export function ModalHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col space-y-1.5 p-6 pb-2 text-center sm:text-left", className)} {...props} />
    );
}

export function ModalTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const { titleId } = useModal();
    return (
        <h2 id={titleId} className={cn("text-xl font-bold tracking-tight text-white flex items-center gap-2", className)} {...props}>
            {props.children}
        </h2>
    );
}

export function ModalDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    const { descriptionId } = useModal();
    return (
        <p id={descriptionId} className={cn("text-sm text-zinc-400 leading-relaxed", className)} {...props} />
    );
}

export function ModalFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 px-6 pb-6 pt-4 bg-zinc-900/50 border-t border-white/5", className)} {...props} />
    );
}

export function ModalClose({ children, asChild, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
    const { setOpen } = useModal();

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: (e: React.MouseEvent) => {
                (children as React.ReactElement<any>).props.onClick?.(e);
                setOpen(false);
            },
            ...props,
        });
    }

    return (
        <button onClick={() => setOpen(false)} className={className} {...props}>
            {children}
        </button>
    );
}

// Namespace exports for easier imports
ModalDialog.Trigger = ModalTrigger;
ModalDialog.Content = ModalContent;
ModalDialog.Header = ModalHeader;
ModalDialog.Title = ModalTitle;
ModalDialog.Description = ModalDescription;
ModalDialog.Footer = ModalFooter;
ModalDialog.Close = ModalClose;

/* -------------------------------------------------------------------------- */
/*                                   DEMO                                     */
/* -------------------------------------------------------------------------- */

export function ModalDialogDemo() {
    return (
        <div className="flex items-center justify-center p-12">
            <ModalDialog>
                <ModalDialog.Trigger className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300">
                    Open Spotlight Dialog
                </ModalDialog.Trigger>
                <ModalDialog.Content>
                    <ModalDialog.Header>
                        <ModalDialog.Title>
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                            Upgrade Plan
                        </ModalDialog.Title>
                        <ModalDialog.Description>
                            Unlock premium features and take your productivity to the next level.
                        </ModalDialog.Description>
                    </ModalDialog.Header>

                    <div className="p-6 space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-indigo-500/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    🚀
                                </div>
                                <div>
                                    <div className="font-medium text-white">Pro Plan</div>
                                    <div className="text-xs text-zinc-500">$19/month</div>
                                </div>
                            </div>
                            <div className="w-4 h-4 rounded-full border border-zinc-600 group-hover:border-indigo-500 group-hover:bg-indigo-500 transition-colors" />
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-indigo-500/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    🏢
                                </div>
                                <div>
                                    <div className="font-medium text-white">Team Plan</div>
                                    <div className="text-xs text-zinc-500">$49/month</div>
                                </div>
                            </div>
                            <div className="w-4 h-4 rounded-full border border-zinc-600 group-hover:border-indigo-500 group-hover:bg-indigo-500 transition-colors" />
                        </div>
                    </div>

                    <ModalDialog.Footer>
                        <ModalDialog.Close className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Maybe Later
                        </ModalDialog.Close>
                        <button className="px-6 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors" onClick={() => alert("Upgraded!")}>
                            Confirm Upgrade
                        </button>
                    </ModalDialog.Footer>
                </ModalDialog.Content>
            </ModalDialog>
        </div>
    );
}
