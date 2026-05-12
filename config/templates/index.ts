import { Template, ComingSoonItem } from "./types";
import { quillTemplate } from "./quill";

export * from "./types";

export const TEMPLATES: Template[] = [
  quillTemplate,

];

export const COMING_SOON: ComingSoonItem[] = [
  {
    id: "T003",
    name: "Portfolio - Template ",
    codename: "Dev Portfolio",
    accent: "white"
  },
];
