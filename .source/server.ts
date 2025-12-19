// @ts-nocheck
import * as __fd_glob_12 from "../content/docs/blocks/shuffle.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/blocks/pressure-test.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/blocks/pre-loader.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/blocks/orb-field.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/blocks/navbar.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/blocks/logo-loop.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/blocks/image-trail.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/blocks/image-gallery.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/blocks/floating-dock.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/blocks/bento-grid.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/blocks/animated-clock.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content\docs", {"meta.json": __fd_glob_0, }, {"index.mdx": __fd_glob_1, "blocks/animated-clock.mdx": __fd_glob_2, "blocks/bento-grid.mdx": __fd_glob_3, "blocks/floating-dock.mdx": __fd_glob_4, "blocks/image-gallery.mdx": __fd_glob_5, "blocks/image-trail.mdx": __fd_glob_6, "blocks/logo-loop.mdx": __fd_glob_7, "blocks/navbar.mdx": __fd_glob_8, "blocks/orb-field.mdx": __fd_glob_9, "blocks/pre-loader.mdx": __fd_glob_10, "blocks/pressure-test.mdx": __fd_glob_11, "blocks/shuffle.mdx": __fd_glob_12, });