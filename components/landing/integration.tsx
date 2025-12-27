"use client";

import React from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";

export const Integration = () => {
    return (
        <section className="py-32 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 border-dashed">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center">

                {/* Header */}
                <div className="mb-20 text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm mx-auto"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                            Quick_Start
                        </span>
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.8]"
                    >
                        Drop it <br />
                        <span className="text-zinc-300 dark:text-zinc-800 italic">in.</span>
                    </motion.h3>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
                        Works with your existing React stack. No complex config.
                    </p>
                </div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                >
                    {/* Terminal Title Bar */}
                    <div className="flex items-center px-4 py-3 bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/5 gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">install.sh</span>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-8 font-mono text-sm space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                                <span className="text-emerald-500 font-bold">$</span>
                                <span>npx shadcn@latest init</span>
                            </div>
                            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                                <span className="text-emerald-500 font-bold">$</span>
                                <span className="break-all">npx shadcn@latest add https://zenblocks-three.vercel.app/r/utils.json</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                                <span className="text-emerald-500 font-bold">$</span>
                                <span className="text-zinc-400 dark:text-zinc-500"># Install dependencies</span>
                            </div>
                            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                                <span className="text-emerald-500 font-bold">$</span>
                                <span>npm install gsap @gsap/react clsx tailwind-merge</span>
                            </div>

                            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 pt-4">
                                <span className="text-emerald-500 font-bold">$</span>
                                <span className="text-zinc-400 dark:text-zinc-500"># Start using components immediately</span>
                            </div>
                            <div className="text-zinc-800 dark:text-zinc-300 pl-4 border-l-2 border-emerald-500/20">
                                <span className="text-purple-600 dark:text-purple-400">import</span> {"{"} ImageGallery {"}"} <span className="text-purple-600 dark:text-purple-400">from</span> <span className="text-green-600 dark:text-green-400">"@/components/zenblocks/image-gallery"</span>;
                                <br />
                                <br />
                                <span className="text-purple-600 dark:text-purple-400">export default function</span> <span className="text-blue-600 dark:text-blue-400">App</span>() {"{"}
                                <br />
                                &nbsp;&nbsp;<span className="text-purple-600 dark:text-purple-400">return</span> (
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-amber-600 dark:text-yellow-400">ImageGallery</span>
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-600 dark:text-orange-400">items</span>={"{"}<span className="text-blue-600 dark:text-blue-400">[]</span>{"}"}
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;/&gt;
                                <br />
                                &nbsp;&nbsp;);
                                <br />
                                {"}"}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-emerald-500 pt-4">
                            <Check className="w-4 h-4" />
                            <span>Components installed successfully</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section >
    );
};
