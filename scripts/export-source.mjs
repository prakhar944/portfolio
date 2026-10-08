import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const extensions = new Set([".tsx", ".ts", ".css", ".svg", ".mjs"]);
async function walk(directory) {
  const entries = await readdir(join(root, directory), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(file)));
    else if (extensions.has(extname(file))) files.push(file);
  }
  return files.sort();
}

const files = [
  "package.json",
  "tsconfig.json",
  "vite.config.ts",
  "vitest.config.ts",
  "index.html",
  ".gitignore",
  ".env.example",
  "vercel.json",
  "public/_redirects",
  ...(await walk("public")),
  ...(await walk("src")),
  ...(await walk("scripts")),
  "README.md",
];
const sections = [
  "# Complete portfolio implementation",
  "Every path below is relative to the portfolio project root. Each code block contains the complete file, including imports. Run `npm install` followed by `npm run dev`. See README.md for the folder structure, installation commands, deployment and integration notes.",
  "The supplied binary artwork is available at `public/prakhar-profile.jpg`. The complete npm-generated dependency lockfile is available at `package-lock.json`; neither is duplicated inside this text document.",
];
for (const file of files) {
  const path = relative(root, join(root, file)).replaceAll("\\", "/");
  const language =
    {
      ".tsx": "tsx",
      ".ts": "ts",
      ".css": "css",
      ".svg": "xml",
      ".mjs": "js",
      ".json": "json",
      ".html": "html",
      ".md": "markdown",
    }[extname(file)] ?? "text";
  sections.push(
    `## ${path}\n\n\`\`\`\`${language}\n${(await readFile(join(root, file), "utf8")).trimEnd()}\n\`\`\`\``,
  );
}
await writeFile(join(root, "IMPLEMENTATION.md"), sections.join("\n\n") + "\n");
console.log(
  `Exported ${files.length} complete source and configuration files to IMPLEMENTATION.md`,
);
