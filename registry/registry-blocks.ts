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
];
