import type { Registry } from "./schema";

export const block: Registry = [
  {
    name: "navbar",
    type: "registry:block",
    dependencies: ["lucide-react", "framer-motion", "next-themes"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/navbar.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pre-loader",
    type: "registry:block",
    dependencies: ["framer-motion", "gsap"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/pre-loader.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "animated-clock",
    type: "registry:block",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/animated-clock.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "bento-grid",
    type: "registry:block",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/bento-grid.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "floating-dock",
    type: "registry:block",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/floating-dock.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "image-gallery",
    type: "registry:block",
    dependencies: ["framer-motion", "gsap"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/image-gallery.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "image-trail",
    type: "registry:block",
    dependencies: ["gsap"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/image-trail.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "logo-loop",
    type: "registry:block",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/logo-loop.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "orb-field",
    type: "registry:block",
    dependencies: ["three", "@react-three/fiber", "@react-three/drei"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/orb-field.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pressure-test",
    type: "registry:block",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/pressure-test.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "shuffle",
    type: "registry:block",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/shuffle.tsx",
        type: "registry:component",
      },
    ],
  },
];
