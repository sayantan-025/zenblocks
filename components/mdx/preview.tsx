"use client";

import { cn } from "@/lib/utils";
import PreviewContent from "./preview-content";
import { useEffect, useState } from "react";

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
  isPremium?: boolean;
  link: string;
  useIframe?: boolean;
  height?: string;
  compact?: boolean;
  comment?: string[];
  isBlock?: boolean;
}

export function Preview({
  children,
  className = "",
  link,
  useIframe = false,
  height,
  compact = false,
  comment = [],
  isBlock = false,
}: PreviewProps) {
  const [prePath, setPrePath] = useState("http://localhost:3000");

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setPrePath(window.location.origin);
    } else {
      const prodUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
      setPrePath(prodUrl ? `https://${prodUrl}` : "https://zenblocks-three.vercel.app");
    }
  }, []);

  console.log(prePath + link);
  return (
    <>
      <div className={cn("w-full overflow-hidden", className)}>
        <PreviewContent link={link} prePath={prePath} isBlock={isBlock} />

        {useIframe ? (
          <div className="w-full my-4 border rounded-2xl border-zinc-400 dark:border-zinc-700">
            <div
              className="relative w-full overflow-hidden"
              style={{ height: height || "400px" }}
            >
              <iframe
                title={link}
                src={`${prePath}/preview/${link}?hideTheme=true`}
                className="w-full h-full overflow-y-auto list-none"
                style={{
                  border: "none",
                  transform: "scale(0.95)",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "p-4 md:p-8 flex justify-center items-center relative border rounded-2xl my-4 border-zinc-200 dark:border-zinc-800 not-prose bg-zinc-50/50 dark:bg-zinc-950/50 transform-gpu",
              compact ? "min-h-[150px]" : "min-h-[300px] md:min-h-[400px]",
              isBlock ? "p-0 md:p-0 overflow-hidden" : ""
            )}
          >
            {children}
          </div>
        )}
        {comment.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-6">
            {comment.map((text, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm font-medium bg-purple-100 dark:bg-purple-950/30 rounded-lg text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 shadow-xs hover:bg-purple-200/70 dark:hover:bg-purple-950/50 transition-colors"
              >
                {text}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
