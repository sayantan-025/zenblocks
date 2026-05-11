"use client";

interface PricingToggleProps {
  /** Whether yearly billing is selected */
  isYearly: boolean;
  /** Callback when toggle changes */
  onChange: (isYearly: boolean) => void;
}

/**
 * Toggle switch for monthly/yearly pricing selection.
 */
export function PricingToggle({ isYearly, onChange }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
        Monthly
      </span>
      <button
        onClick={() => onChange(!isYearly)}
        className="relative w-12 h-6 rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        role="switch"
        aria-checked={isYearly}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-primary transition-transform duration-200 ease-in-out ${
            isYearly ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
        Yearly
        <span className="ml-1.5 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          Save 20%
        </span>
      </span>
    </div>
  );
}
