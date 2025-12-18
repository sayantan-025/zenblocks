"use client";

export const Footer = () => {
    return (
        <footer className="py-8 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-lg font-black tracking-tighter text-zinc-900 dark:text-white">
                    ZENBLOCKS
                </span>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    © 2024 ZenBlocks Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
