import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}

/**
 * Standard section wrapper with consistent spacing and optional ID for navigation.
 */
export function SectionWrapper({
  children,
  id,
  className,
  containerClassName,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 overflow-hidden",
        className
      )}
    >
      <div className={cn("container px-4 mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
