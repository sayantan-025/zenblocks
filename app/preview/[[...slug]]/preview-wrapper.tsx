"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Home, Terminal, LayoutGrid } from "lucide-react";

export default function PreviewWrapper({ componentName }: { componentName: string }) {
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Skip dynamic loading for components with manual harnesses
        if (componentName === "toast" || componentName === "modal-dialog" || componentName === "bento-grid") return;

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

    // Special harness for BentoGrid
    if (componentName === "bento-grid") {
        return (
            <div className="relative z-10 w-full min-h-screen bg-white dark:bg-zinc-950">
                <BentoGridHarness />
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

// ------------------------------------------------------------------
// BentoGrid Harness
// ------------------------------------------------------------------

import { BentoGrid, BentoCard } from "@/components/zenblocks/bento-grid";
import { Zap, Activity, Component as ComponentIcon, Layers, Monitor } from "lucide-react";

function BentoGridHarness() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">
            <div>
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Simple Mode</h2>
                <BentoGrid>
                    <BentoCard
                        title="Core Architecture"
                        description="The primary structural foundation."
                        className="md:col-span-2 md:row-span-2"
                        icon={<Layers size={14} />}
                    />
                    <BentoCard
                        title="Telemetry Data"
                        description="Real-time process monitoring."
                        className="md:col-span-1 md:row-span-1"
                        icon={<Activity size={14} />}
                    />
                    <BentoCard
                        title="Motion Engine"
                        description="Advanced physics-based interaction."
                        className="md:col-span-1 md:row-span-1"
                        icon={<Zap size={14} />}
                    />
                </BentoGrid>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Custom Content Mode</h2>
                <BentoGrid>
                    {/* Edge-to-Edge Image */}
                    <BentoCard className="md:col-span-1 md:row-span-2 p-0 overflow-hidden">
                        <div className="relative w-full h-full min-h-[300px]">
                            <img
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
                                alt="Abstract"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-white font-bold text-lg mb-1">Visual Arts</h3>
                                <p className="text-zinc-300 text-xs">Edge-to-edge media integration</p>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Interactive Widget */}
                    <BentoCard className="md:col-span-2 p-0">
                        <div className="flex flex-col h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Analytics Review</h3>
                                    <p className="text-xs text-zinc-500">Live user tracking metrics</p>
                                </div>
                                <Monitor className="text-indigo-500" />
                            </div>
                            <div className="flex gap-2 items-end h-[60px] flex-1 pb-2">
                                {[40, 70, 35, 90, 55, 80, 45].map((h, i) => (
                                    <div key={i} className="flex-1 bg-indigo-500/20 rounded-sm relative group/bar overflow-hidden">
                                        <div
                                            className="absolute bottom-0 left-0 w-full bg-indigo-500 transition-all duration-500 group-hover/bar:bg-indigo-400"
                                            style={{ height: `${h}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard
                        title="Component Library"
                        description="Drag and drop ready."
                        className="md:col-span-2"
                        icon={<ComponentIcon size={14} />}
                    />
                </BentoGrid>
            </div>
        </div>
    );
}
