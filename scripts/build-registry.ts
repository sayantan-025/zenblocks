import { registry } from "../registry";
import { promises as fs } from "fs";
import path from "path";
import type { z } from "zod";
import type { registryItemFileSchema } from "@/registry/schema";

const REGISTRY_BASE_PATH = process.cwd();
const PUBLIC_FOLDER_BASE_PATH = "public/r";

type File = z.infer<typeof registryItemFileSchema>;

/* -------------------------------------------------------------------------- */
/*                                   UTILS                                    */
/* -------------------------------------------------------------------------- */

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, data, "utf-8");
  console.log(`✔ Written ${filePath}`);
}

/* -------------------------------------------------------------------------- */
/*                         REGISTRY FILE TRANSFORMER                           */
/* -------------------------------------------------------------------------- */

const getComponentFiles = async (files: File[], registryType: string) => {
  return Promise.all(
    (files ?? []).map(async (file) => {
      const rawPath = typeof file === "string" ? file : file.path;

      // 🔒 REGISTRY PATH (MUST BE RELATIVE)
      const registryPath = rawPath.replace(/^\/+/, "");

      // ✅ FILESYSTEM PATH (ABSOLUTE)
      const fsPath = path.join(REGISTRY_BASE_PATH, registryPath);

      const content = await fs.readFile(fsPath, "utf-8");
      const fileName = path.basename(registryPath);

      const resolveTarget = (type: string) => {
        switch (type) {
          case "registry:hook":
            return `hooks/${fileName}`;
          case "registry:lib":
            return `lib/${fileName}`;
          case "registry:block":
            return `blocks/${fileName}`;
          default:
            return `components/zenblocks/${fileName}`;
        }
      };

      const fileType =
        typeof file === "string" ? registryType : file.type ?? registryType;

      return {
        type: fileType,
        path: registryPath, // 🚨 NEVER STARTS WITH /
        target:
          typeof file === "string"
            ? resolveTarget(registryType)
            : (file.target ?? resolveTarget(fileType)).replace(/^\/+/, ""),
        content,
      };
    })
  );
};

/* -------------------------------------------------------------------------- */
/*                                   BUILD                                    */
/* -------------------------------------------------------------------------- */

async function main() {
  for (const component of registry) {
    if (!component.files) {
      throw new Error(`No files defined for ${component.name}`);
    }

    const files = await getComponentFiles(component.files, component.type);

    const json = JSON.stringify(
      {
        ...component,
        files,
      },
      null,
      2
    );

    const outPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;
    await writeFileRecursive(outPath, json);
  }

  console.log("✅ Registry build complete");
}

main().catch((err) => {
  console.error("❌ Registry build failed");
  console.error(err);
  process.exit(1);
});
