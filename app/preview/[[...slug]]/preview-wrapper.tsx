"use client";

import React, { useEffect, useState } from "react";

export default function PreviewWrapper({ componentName }: { componentName: string }) {
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const loadComponent = async () => {
            try {
                // Dynamic import
                const mod = await import(`@/components/zenblocks/${componentName}`);

                if (!mounted) return;

                // Check for default export first
                if (mod.default) {
                    setComponent(() => mod.default);
                    return;
                }

                // Fallback to PascalCase (named export)
                const pascalName = componentName
                    .split("/")
                    .pop()!
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join("");

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
            <div className="relative z-10 w-full h-full">
                <Component />
            </div>
        </div>
    );
}
