"use client";

import React, { useState, useEffect } from "react";

interface ShuffleProps {
  text: string;
  className?: string;
  duration?: number;
}

export const Shuffle: React.FC<ShuffleProps> = ({ text = "Shuffle", className }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

export function ShuffleDemo() {
  return (
    <div className="flex items-center justify-center h-full w-full bg-transparent p-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white dark:bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 shadow-sm dark:border-zinc-800">
        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <Shuffle text="v2.0 Now Available" />
      </div>
    </div>
  );
}

export default ShuffleDemo;
