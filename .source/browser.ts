// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "blocks/navbar.mdx": () => import("../content/docs/blocks/navbar.mdx?collection=docs"), "blocks/pre-loader.mdx": () => import("../content/docs/blocks/pre-loader.mdx?collection=docs"), }),
};
export default browserCollections;