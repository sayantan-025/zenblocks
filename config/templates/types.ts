export interface ComponentTag {
  name: string;
  color: string;
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  codename: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  components: ComponentTag[];
  features: string[];
  demoPath: string;
  checkoutUrl: string;
  accent: string;
  screenshot: string;
}

export interface ComingSoonItem {
  id: string;
  name: string;
  codename: string;
  accent: string;
}
