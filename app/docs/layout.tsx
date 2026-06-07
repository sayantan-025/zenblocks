import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { source } from "@/lib/source";
import type { ReactNode } from "react";

import { Github } from "lucide-react";
import Link from "next/link";

import type { Metadata } from "next";

import "./docs-layout.css";
import { baseOptions } from "@/lib/layout.shared";

export const metadata: Metadata = {
  title: {
    template: "%s | zenblocks - Free UI Components to build beautiful websites",
    default: "zenblocks - Free UI Components to build beautiful websites",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  const { nav, ...base } = baseOptions;

  return (
    <div className="zenblocks-docs-layout flex flex-col min-h-screen bg-transparent">
      {/* Global Background Pattern */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <div className="flex-1">
        <DocsLayout
          tree={source.pageTree}
          tabMode="navbar"
          nav={{ ...nav, mode: "top" }}
          containerProps={{
            className: "max-w-none w-full px-0",
          }}
          {...base}
          sidebar={{
            defaultOpenLevel: 1,
            collapsible: true,
            footer: (
              <div className="flex items-center gap-3 px-2 md:hidden">
                <Link
                  href="https://github.com/sayantan-025/zenblocks"
                  target="_blank"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                >
                  <Github className="size-5" />
                </Link>
              </div>
            ),
          }}
        >
          {children}
        </DocsLayout>
      </div>
    </div>
  );
}
