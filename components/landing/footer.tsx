"use client";

import Link from 'next/link';
import { Github, Heart } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-6 py-12 md:py-20 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                    {/* Branding */}
                    <div className="space-y-4">
                        <span className="text-xl font-black tracking-tighter text-zinc-900 dark:text-white">
                            ZENBLOCKS
                        </span>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                            Beautiful, physics-enabled UI components for modern React applications. Built for speed and delight.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <SocialLink href="https://github.com" icon={Github} label="GitHub" />
                            <SocialLink href="https://twitter.com" icon={XIcon} label="X (Twitter)" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm mb-4">Product</h4>
                            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                                <FooterLink href="/docs">Documentation</FooterLink>
                                <FooterLink href="/#components">Components</FooterLink>
                                <FooterLink href="/#pricing">Pricing</FooterLink>
                                <FooterLink href="/changelog">Changelog</FooterLink>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm mb-4">Resources</h4>
                            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                                <FooterLink href="/docs/guide">Installation</FooterLink>
                                <FooterLink href="/docs/theming">Theming</FooterLink>
                                <FooterLink href="https://github.com/zenblocks/ui">GitHub</FooterLink>
                                <FooterLink href="/showcase">Showcase</FooterLink>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm mb-4">Legal</h4>
                            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                                <FooterLink href="/terms">Terms of Service</FooterLink>
                                <FooterLink href="/license">License</FooterLink>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 font-mono">
                        © {new Date().getFullYear()} ZenBlocks UI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-500 font-mono">
                        <span>Made with</span>
                        <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-1" />
                        <span>by ZenDevs</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper Components
const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
    <Link
        href={href}
        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        aria-label={label}
    >
        <Icon className="w-5 h-5" />
    </Link>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
        <Link
            href={href}
            className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
        >
            {children}
        </Link>
    </li>
);
const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);
