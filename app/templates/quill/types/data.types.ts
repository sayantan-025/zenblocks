// Types for Quill Landing Page Data

export interface NavLink {
  href: string;
  label: string;
}

export interface NavData {
  links: NavLink[];
  cta: { label: string; href: string };
}

export interface Headline {
  part1: string;
  part2: string;
}

export interface CTAButtons {
  primary: string;
  secondary: string;
}

export interface SocialProof {
  rating: string;
  count: string;
  label: string;
  avatars: string[];
}

export interface HeroData {
  badge: string;
  headline: Headline;
  subheadline: string;
  cta: CTAButtons;
  socialProof: SocialProof;
}

export interface Partner {
  name: string;
  icon: string;
  color: string;
}

export interface ImpactData {
  title: string;
  subtitle: string;
  description: string;
  partners: Partner[];
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  className: string;
  icon: string;
}

export interface FeaturesData {
  badge: string;
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface PricingData {
  badge: string;
  title: string;
  subtitle: string;
  plans: PricingPlan[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQData {
  badge: string;
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface CTAType {
   badge: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterData {
  description: string;
  columns: FooterColumn[];
  builtBy?: {
    name: string;
    url: string;
    description?: string;
  };
}

export interface QuillData {
  brand: string;
  nav: NavData;
  hero: HeroData;
  impact: ImpactData;
  features: FeaturesData;
  testimonials: Testimonial[];
  pricing: PricingData;
  faq: FAQData;
  cta: CTAType;
  footer: FooterData;
}
