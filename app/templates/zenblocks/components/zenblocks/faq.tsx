"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                    */
/* -------------------------------------------------------------------------- */

export type FAQItem = {
  question: string;
  answer: string;
  category?: string;
};

export type FAQCTA = {
  title: string;
  description: string;
  buttons: {
    label: string;
    href: string;
    target?: string;
  }[];
};

export interface FAQProps {
  items?: FAQItem[];
  layout?: "stacked" | "grid";
  allowMultiple?: boolean;
  defaultOpen?: number[];
  showCategories?: boolean;
  className?: string;
  cta?: FAQCTA | null;
}

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

export const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Is ZenBlocks free?",
    answer: "Core library is MIT licensed and completely free forever. Pro plan unlocks premium blocks, templates, and the Figma kit.",
    category: "Pricing",
  },
  {
    question: "Does it work with Vite and Remix?",
    answer: "Works with any React-based framework including Next.js, Vite, Remix, and Gatsby. The shadcn CLI handles all setup automatically.",
    category: "Compatibility",
  },
  {
    question: "Can I use it alongside shadcn/ui?",
    answer: "Fully compatible — both use Tailwind CSS so you can freely mix ZenBlocks animation components with shadcn functional primitives.",
    category: "Compatibility",
  },
  {
    question: "Does it work on mobile?",
    answer: "Mobile-first is a core principle. Every component is touch-optimized and tested for 60fps on iOS and Android.",
    category: "Compatibility",
  },
  {
    question: "What animation libraries are required?",
    answer: "GSAP and Framer Motion are the main dependencies. They are installed automatically when you run the CLI install command.",
    category: "Installation",
  },
  {
    question: "Is there a Figma kit?",
    answer: "Yes — a complete Figma design kit with all components, variants, and design tokens is included in the Pro plan.",
    category: "Pricing",
  },
  {
    question: "Can I customize components after installing?",
    answer: "Absolutely. The CLI copies source code directly into your project. You own it completely and can modify anything freely.",
    category: "Customization",
  },
  {
    question: "How do I update a component to the latest version?",
    answer: "Re-run the CLI install command for that component. It will overwrite the existing file with the latest version.",
    category: "Installation",
  },
];

const DEFAULT_CTA: FAQCTA = {
  title: "Still have questions?",
  description: "Join our Discord or open a GitHub issue.",
  buttons: [
    { label: "Join Discord", href: "#" },
    { label: "GitHub Issues", href: "#" },
  ],
};

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
  cta = DEFAULT_CTA,
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

      {/* BOTTOM CTA */}
      {cta && (
        <div className="mt-16 text-center">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {cta.title}
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {cta.description}
          </p>
          <div className="flex gap-3 justify-center mt-5">
            {cta.buttons.map((button, i) => (
              <Link
                key={i}
                href={button.href}
                target={button.target}
                rel={button.target === "_blank" ? "noopener noreferrer" : undefined}
                className="border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl px-5 py-2 text-sm font-medium transition-colors duration-200"
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQSection;
