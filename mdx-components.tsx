import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: Partial<MDXComponents>): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...(components as MDXComponents),
  };
}
