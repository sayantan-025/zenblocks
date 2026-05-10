import { ZenBlocksLogo } from "../../../../components/branding/zenblocks-logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Github } from "lucide-react";
import Link from "next/link";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <ZenBlocksLogo />
        </div>
      </div>
    ),
  },
  links: [
    {
      text: "Docs",
      url: "/docs",
      active: "nested-url",
    },
    {
      text: "Components",
      url: "/docs/blocks/navbar",
      active: "nested-url",
    },
    {
      text: "Templates",
      url: "/templates",
      active: "nested-url",
    },
    {
      type: "custom",
      children: (
        <Link
          href="https://github.com/sayantan-025/zenblocks"
          target="_blank"
          className="hidden md:block text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
        >
          <Github className="size-5" />
        </Link>
      ),
    },
  ],

};
