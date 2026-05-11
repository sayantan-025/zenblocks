/**
 * Navigation item type definition
 */
export interface NavItem {
  /** Label to display */
  label: string;
  /** Link href */
  href: string;
  /** Whether the link is an external one */
  isExternal?: boolean;
}

/**
 * Feature item type definition
 */
export interface Feature {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Icon name or component */
  icon?: string;
  /** Image or video URL */
  media?: string;
}

/**
 * Testimonial item type definition
 */
export interface Testimonial {
  /** Author name */
  name: string;
  /** Author role or company */
  role: string;
  /** Testimonial text */
  content: string;
  /** Author avatar URL */
  avatar?: string;
}

/**
 * Pricing plan type definition
 */
export interface PricingPlan {
  /** Plan name */
  name: string;
  /** Monthly price */
  monthlyPrice: number;
  /** Yearly price */
  yearlyPrice: number;
  /** Plan description */
  description: string;
  /** List of features included */
  features: string[];
  /** Button text */
  cta: string;
  /** Whether this plan is highlighted */
  isPopular?: boolean;
}

/**
 * FAQ item type definition
 */
export interface FaqItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
}
