"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../../lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                    */
/* -------------------------------------------------------------------------- */

export type FAQItem = {
  question: string;
  answer: string;
  category?: string;
};

export interface FAQProps {
  items?: FAQItem[];
  layout?: "stacked" | "grid";
  allowMultiple?: boolean;
  defaultOpen?: number[];
  showCategories?: boolean;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is the ZenBlocks Component Build Registry?",
    answer: "It's a specialized distribution system built on top of shadcn/ui that allows you to fetch production-ready, physics-enabled components directly into your own codebase with a single command.",
    category: "Core Concept",
  },
  {
    question: "How do the 'Updated Docs' help me ship faster?",
    answer: "Our documentation is automatically synchronized with the registry. When we release a performance patch or a new physics preset, the docs reflect the changes instantly, providing you with the exact code snippets you need.",
    category: "Documentation",
  },
  {
    question: "Is ZenBlocks free?",
    answer: "The core registry and all base primitives are MIT licensed and free. We offer a Pro plan for advanced enterprise templates and specialized animation blocks.",
    category: "Pricing",
  },
  {
    question: "Can I use it alongside shadcn/ui?",
    answer: "Yes, ZenBlocks is designed to be a companion to shadcn/ui. You can use shadcn for functional primitives (buttons, inputs) and ZenBlocks for high-impact, animated sections.",
    category: "Compatibility",
  },
  {
    question: "What animation libraries are required?",
    answer: "ZenBlocks leverages Framer Motion and GSAP for its physics-based interactions. These are automatically detected or installed during the component addition process.",
    category: "Installation",
  },
  {
    question: "Can I customize the registry components?",
    answer: "Absolutely. Once a component is added to your project via the CLI, it's yours. You have full ownership of the source code to modify the animations, styles, or logic.",
    category: "Customization",
  },
];

/* -------------------------------------------------------------------------- */
/*                               INTERNAL ITEM                                */
/* -------------------------------------------------------------------------- */

const FAQItemComponent = ({
  item,
  isOpen,
  onToggle,
  showDivider,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  showDivider: boolean;
  index: number;
}) => {
  const panelId = `faq-panel-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <div className="w-full">
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full items-center justify-between bg-transparent border-none cursor-pointer text-left py-5 px-0 transition-colors duration-200"
      >
        <span className="text-base font-semibold flex-1 pr-4 text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
          {item.question}
        </span>
        <Plus
          size={20}
          className={cn(
            "shrink-0 transition-transform duration-300 ease-in-out",
            isOpen 
              ? "rotate-45 text-blue-600 dark:text-blue-400" 
              : "rotate-0 text-zinc-400 dark:text-zinc-500"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-5">
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showDivider && (
        <div className="border-b border-zinc-200 dark:border-zinc-800" />
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                MAIN SECTION                                */
/* -------------------------------------------------------------------------- */

export const FAQSection = ({
  items = DEFAULT_FAQ_ITEMS,
  layout = "stacked",
  allowMultiple = false,
  defaultOpen = [],
  showCategories = false,
  className,
}: FAQProps) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set(defaultOpen));

  const handleToggle = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const renderItems = () => {
    if (layout === "grid") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 shadow-sm transition-all duration-300",
                "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <FAQItemComponent
                item={item}
                isOpen={openItems.has(index)}
                onToggle={() => handleToggle(index)}
                showDivider={false}
                index={index}
              />
            </div>
          ))}
        </div>
      );
    }

    if (showCategories) {
      const categories = Array.from(new Set(items.map((i) => i.category || "General")));
      return (
        <div className="max-w-2xl mx-auto">
          {categories.map((cat) => (
            <div key={cat} className="mb-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-blue-600 dark:text-blue-400 mb-1 mt-8">
                {cat}
              </h3>
              {items
                .map((item, originalIndex) => ({ item, originalIndex }))
                .filter(({ item }) => (item.category || "General") === cat)
                .map(({ item, originalIndex }, catIndex, filteredList) => (
                  <FAQItemComponent
                    key={originalIndex}
                    item={item}
                    isOpen={openItems.has(originalIndex)}
                    onToggle={() => handleToggle(originalIndex)}
                    showDivider={catIndex !== filteredList.length - 1}
                    index={originalIndex}
                  />
                ))}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto">
        {items.map((item, index) => (
          <FAQItemComponent
            key={index}
            item={item}
            isOpen={openItems.has(index)}
            onToggle={() => handleToggle(index)}
            showDivider={index !== items.length - 1}
            index={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {renderItems()}
    </div>
  );
};

export default FAQSection;
