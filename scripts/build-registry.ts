import { registry } from "../registry";
import { promises as fs } from "fs";
import path from "path";
import type { z } from "zod";
import type { registryItemFileSchema } from "@/registry/schema";

const ROOT = process.cwd();
const OUT_DIR = "public/r";

type File = z.infer<typeof registryItemFileSchema>;

// bun run scripts/build-registry.ts

/* -------------------------------------------------------------------------- */
/*                                   UTILS                                    */
/* -------------------------------------------------------------------------- */

async function writeFile(filePath: string, data: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, data, "utf-8");
  console.log(`✔ ${filePath}`);
}

/* -------------------------------------------------------------------------- */
/*                           REGISTRY FILE BUILDER                             */
/* -------------------------------------------------------------------------- */

async function buildFiles(files: File[], registryType: string) {
  return Promise.all(
    files.map(async (file) => {
      const rawPath = typeof file === "string" ? file : file.path;

      // 🔒 REGISTRY PATH (RELATIVE ONLY)
      const registryPath = rawPath.replace(/^\/+/, "");

      // 📁 FILESYSTEM PATH
      const fsPath = path.join(ROOT, registryPath);

      const content = await fs.readFile(fsPath, "utf-8");
      const fileName = path.basename(registryPath);

      let target: string;

      // 🔥 FORCE components under components/zenblocks
      if (
        registryType === "registry:component" ||
        registryType === "registry:block"
      ) {
        target = `components/zenblocks/${fileName}`;
      } else if (registryType === "registry:hook") {
        target = `hooks/${fileName}`;
      } else if (registryType === "registry:lib") {
        target = `lib/${fileName}`;
      } else {
        target = `components/zenblocks/${fileName}`;
      }

      return {
        type:
          typeof file === "string" ? registryType : file.type ?? registryType,
        path: registryPath, // ✅ SAFE
        target, // ✅ FORCED
        content,
      };
    })
  );
}

/* -------------------------------------------------------------------------- */
/*                                   BUILD                                    */
/* -------------------------------------------------------------------------- */

async function main() {
  for (const item of registry) {
    if (!item.files?.length) {
      throw new Error(`No files for ${item.name}`);
    }

    const files = await buildFiles(item.files, item.type);

    const output = JSON.stringify(
      {
        ...item,
        files,
      },
      null,
      2
    );

    await writeFile(`${OUT_DIR}/${item.name}.json`, output);
  }

  console.log("✅ Registry built successfully");
}

main().catch((err) => {
  console.error("❌ Registry build failed");
  console.error(err);
  process.exit(1);
});
