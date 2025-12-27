import type { Registry } from "./schema";

export const block: Registry = [
  {
    name: "utils",
    type: "registry:lib",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },
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
  {
    name: "animated-button",
    type: "registry:block",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/animated-button.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "modal-dialog",
    type: "registry:block",
    dependencies: ["framer-motion", "lucide-react", "react-dom"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/modal-dialog.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "theme-switcher",
    type: "registry:block",
    dependencies: ["framer-motion", "next-themes", "lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/theme-switcher.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "toast",
    type: "registry:block",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "components/zenblocks/toast.tsx",
        type: "registry:component",
      },
    ],
  },
];
