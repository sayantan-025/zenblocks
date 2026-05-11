import { Template, ComingSoonItem } from "./types";
import { saasLandingTemplate } from "./saas-landing";

export * from "./types";

export const TEMPLATES: Template[] = [
  saasLandingTemplate,
];

export const COMING_SOON: ComingSoonItem[] = [
  { 
    id: "T003", 
    name: "Portfolio - Template ", 
    codename: "Dev Portfolio", 
    accent: "white" 
  },
];
