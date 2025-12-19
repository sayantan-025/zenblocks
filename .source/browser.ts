// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "blocks/animated-clock.mdx": () => import("../content/docs/blocks/animated-clock.mdx?collection=docs"), "blocks/bento-grid.mdx": () => import("../content/docs/blocks/bento-grid.mdx?collection=docs"), "blocks/floating-dock.mdx": () => import("../content/docs/blocks/floating-dock.mdx?collection=docs"), "blocks/image-gallery.mdx": () => import("../content/docs/blocks/image-gallery.mdx?collection=docs"), "blocks/image-trail.mdx": () => import("../content/docs/blocks/image-trail.mdx?collection=docs"), "blocks/logo-loop.mdx": () => import("../content/docs/blocks/logo-loop.mdx?collection=docs"), "blocks/navbar.mdx": () => import("../content/docs/blocks/navbar.mdx?collection=docs"), "blocks/orb-field.mdx": () => import("../content/docs/blocks/orb-field.mdx?collection=docs"), "blocks/pre-loader.mdx": () => import("../content/docs/blocks/pre-loader.mdx?collection=docs"), "blocks/pressure-test.mdx": () => import("../content/docs/blocks/pressure-test.mdx?collection=docs"), "blocks/shuffle.mdx": () => import("../content/docs/blocks/shuffle.mdx?collection=docs"), }),
};
export default browserCollections;