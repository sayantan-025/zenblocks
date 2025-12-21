import { ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";
import XIcon from "../icons/x-icon";

interface HeaderContent {
  text: string;
  productName: string;
  link: string;
}

export function HeaderPro() {
  const content: HeaderContent = {
    text: "Build apps faster",
    productName: "ZenBlocks Boilerplate",
    link: "#",
  };

  return (
    <div className="hidden md:flex items-center gap-3">
      {/* PROMO PILL */}
      <Link
        href={content.link}
        target="_blank"
        className="
          group inline-flex items-center gap-3
          px-4 py-2
          rounded-2xl
          text-sm font-medium
          backdrop-blur-xl
          transition-all duration-300
          bg-white/80 dark:bg-zinc-950/80
          border border-zinc-200 dark:border-zinc-800
          hover:border-zinc-300 dark:hover:border-zinc-700
          hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_-6px_rgba(255,255,255,0.05)]
        "
      >
        {/* icon */}
        <div className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-amber-500 dark:text-amber-400">
          <Zap className="w-3.5 h-3.5 fill-current" />
        </div>

        {/* text */}
        <span className="text-zinc-600 dark:text-zinc-400 tracking-tight group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
          {content.text}
        </span>

        {/* product tag */}
        <span
          className="
            inline-flex items-center gap-1.5
            px-2.5 py-0.5
            rounded-md
            text-[11px] font-bold tracking-wide uppercase
            bg-zinc-100 text-zinc-900
            dark:bg-zinc-900 dark:text-zinc-100
            border border-zinc-200 dark:border-zinc-800
          "
        >
          {content.productName}
          <ArrowUpRight className="w-3 h-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>

      {/* GITHUB */}
      <Link
        href="#"
        target="_blank"
        className="
          hidden md:inline-flex items-center justify-center
          p-2.5 rounded-2xl
          border border-zinc-200 dark:border-zinc-800
          bg-white/80 dark:bg-zinc-950/80
          backdrop-blur-md
          hover:bg-zinc-50 dark:hover:bg-zinc-900
          hover:border-zinc-300 dark:hover:border-zinc-700
          transition-all duration-300
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
          fill="currentColor"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </Link>

      {/* X */}
      <Link
        href="#"
        target="_blank"
        className="
          hidden md:inline-flex items-center justify-center
          p-2.5 rounded-2xl
          border border-zinc-200 dark:border-zinc-800
          bg-white/80 dark:bg-zinc-950/80
          backdrop-blur-md
          hover:bg-zinc-50 dark:hover:bg-zinc-900
          hover:border-zinc-300 dark:hover:border-zinc-700
          transition-all duration-300
        "
      >
        <XIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />
      </Link>
    </div>
  );
}
