"use client";

import { motion } from "framer-motion";

export default function FilterBar({
  filters,
  activeFilter,
  setActiveFilter,
}: {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-4 mt-12 hide-scrollbar w-full max-w-7xl mx-auto">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap border
              ${
                isActive
                  ? "text-[var(--btn-primary-text)] border-transparent"
                  : "text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--border-hover)] bg-transparent"
              }`}
            style={{ zIndex: 1 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterBg"
                className="absolute inset-0 bg-[var(--btn-primary-bg)] rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {filter}
          </button>
        );
      })}
    </div>
  );
}
