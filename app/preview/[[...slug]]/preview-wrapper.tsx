"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Home, Terminal, LayoutGrid } from "lucide-react";

export default function PreviewWrapper({ componentName }: { componentName: string }) {
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Skip dynamic loading for components with manual harnesses
        if (componentName === "toast" || componentName === "modal-dialog") return;

        let mounted = true;
        const loadComponent = async () => {
            try {
                // Dynamic import
                const mod = await import(`@/components/zenblocks/${componentName}`);

                if (!mounted) return;

                // Fallback to PascalCase (named export)
                const pascalName = componentName
                    .split("/")
                    .pop()!
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join("");

                // Prioritize Demo/Preview exports if they exist
                const demoName = `${pascalName}Demo`;
                const previewName = `${pascalName}Preview`;

                if (mod[demoName]) {
                    setComponent(() => mod[demoName]);
                    return;
                }
                if (mod[previewName]) {
                    setComponent(() => mod[previewName]);
                    return;
                }

                if (mod.default) {
                    setComponent(() => mod.default);
                    return;
                }

                if (mod[pascalName]) {
                    setComponent(() => mod[pascalName]);
                    return;
                }

                setError(`Component ${componentName} not found (missing default or ${pascalName} export)`);
            } catch (err) {
                console.error("Failed to load component", err);
                if (mounted) setError("Component not found");
            }
        };

        loadComponent();

        return () => {
            mounted = false;
        };
    }, [componentName]);

    if (error) {
        return (
            <div className="flex items-center justify-center p-8 text-red-500 bg-red-50/50 rounded-xl border border-red-200">
                {error}
            </div>
        );
    }

    // Special harness for Toast
    if (componentName === "toast") {
        return (
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <ToastDemoHarness />
            </div>
        )
    }

    // Special harness for Modal Dialog
    if (componentName === "modal-dialog") {
        return (
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                <ModalDialogHarness />
            </div>
        )
    }

    if (!Component) {
        return (
            <div className="flex items-center justify-center p-12 text-zinc-400 animate-pulse">
                Loading preview...
            </div>
        );
    }

    const isPreLoader = componentName.includes("pre-loader");

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center">
            {isPreLoader && (
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <p className="text-zinc-400 dark:text-zinc-600 font-mono text-sm animate-pulse">
                        ✨ Animation Complete. Reload to replay.
                    </p>
                </div>
            )}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
                {componentName === "animated-button" ? (
                    <Component icon={<ArrowRight />}>Experience Aura</Component>
                ) : componentName === "floating-dock" ? (
                    <Component
                        items={[
                            { title: "Home", icon: <Home className="h-full w-full" />, href: "#" },
                            { title: "Products", icon: <Terminal className="h-full w-full" />, href: "#" },
                            { title: "Components", icon: <LayoutGrid className="h-full w-full" />, href: "#" },
                        ]}
                    />
                ) : (
                    <Component />
                )}
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// Internal Demo Harnesses
// ------------------------------------------------------------------

import { ToastProvider, useToast } from "@/components/zenblocks/toast";

function ToastDemoHarness() {
    return (
        <ToastProvider>
            <ToastButtons />
        </ToastProvider>
    )
}

function ToastButtons() {
    const { toast } = useToast();
    return (
        <div className="flex flex-wrap gap-4 items-center justify-center p-8">
            <button
                onClick={() => toast({ title: "Success", description: "Your file has been uploaded.", variant: "success" })}
                className="px-4 py-2 text-sm font-medium bg-emerald-100/50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 rounded-lg hover:bg-emerald-200/50 transition-colors"
                type="button"
            >
                Success
            </button>
            <button
                onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "error" })}
                className="px-4 py-2 text-sm font-medium bg-rose-100/50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 rounded-lg hover:bg-rose-200/50 transition-colors"
                type="button"
            >
                Error
            </button>
            <button
                onClick={() => toast({ title: "New Message", description: "Can we schedule a call?", variant: "default" })}
                className="px-4 py-2 text-sm font-medium bg-white text-zinc-900 border shadow-sm dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors"
                type="button"
            >
                Default
            </button>
        </div>
    )
}
// ------------------------------------------------------------------
// Modal Dialog Harness
// ------------------------------------------------------------------

import {
    ModalDialog,
} from "@/components/zenblocks/modal-dialog";
import { Sparkles } from "lucide-react";

function ModalDialogHarness() {
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
