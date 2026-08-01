/**
 * Sync nested shadcn registry catalogs from component source folders.
 *
 * Scans `src/components/ui/*` and `src/components/composites/*`, derives npm
 * and same-repo registry dependencies from imports, and writes:
 *   - src/lib/registry.json
 *   - src/styles/registry.json
 *   - src/components/ui/registry.json
 *   - src/components/composites/registry.json
 *
 * Same-repo registryDependencies use GitHub addresses
 * (`giacomosalsano/gambitech-ds/<name>`) so bare names are not mistaken for
 * official shadcn items.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const REPO = "giacomosalsano/gambitech-ds";
const SCHEMA = "https://ui.shadcn.com/schema/registry.json";

const SKIP_IMPORTS = new Set(["react", "react-dom", "react/jsx-runtime"]);

const DESCRIPTIONS = {
  utils: "Class-name helper (`cn`) shared by every component.",
  types: "Shared TypeScript types used across components.",
  styles: "Design tokens and base styles (OKLCH semantic CSS variables).",
  alert: "Inline status banner with title and description.",
  "alert-dialog": "Modal confirmation dialog that requires an explicit action.",
  badge: "Compact status and label chip with variants.",
  breadcrumb: "Navigation trail for hierarchical page location.",
  button: "Button primitive with variants, sizes, and loading state.",
  calendar: "Day picker built on react-day-picker.",
  card: "Compound surface for grouped content.",
  checkbox: "Checkbox input with checked and indeterminate states.",
  command: "Command palette / combobox primitive built on cmdk.",
  "date-picker": "Single-date picker composed from Popover, Button, and Calendar.",
  "date-picker-range": "Date range picker composed from Popover, Button, and Calendar.",
  dialog: "Modal dialog built on Radix Dialog.",
  "dropdown-menu": "Dropdown menu with items, checkboxes, and submenus.",
  input: "Text input with invalid and disabled states.",
  label: "Accessible form label.",
  pagination: "Pagination navigation built on button variants.",
  popover: "Floating popover surface.",
  "radio-group": "Single-selection radio group.",
  separator: "Visual separator for layout sections.",
  sheet: "Slide-over drawer built on Radix Dialog.",
  skeleton: "Loading placeholder primitive.",
  sonner: "Toast host and helpers powered by Sonner.",
  switch: "Toggle switch input.",
  table: "Compound table with optional sortable headers.",
  tabs: "Tabbed navigation and panels.",
  textarea: "Multiline text input with auto-grow sizing.",
  "app-shell": "Application shell with sidebar, topnav, and mobile drawer.",
  "context-switcher": "Multi-membership context toggle built on DropdownMenu.",
  "data-list": "Bordered list surface with EntityRow compounds.",
  "empty-state": "Empty region with icon, copy, and optional action.",
  "metric-card": "Metric surface with label, value, and empty state.",
  "status-badge": "Badge wrapper driven by a consumer-owned status map.",
};

function titleCase(name) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isSourceFile(name) {
  return (
    (name.endsWith(".ts") || name.endsWith(".tsx")) &&
    !name.includes(".stories.") &&
    !name.includes(".test.")
  );
}

function packageName(spec) {
  if (spec.startsWith("@")) {
    const parts = spec.split("/");
    return parts.slice(0, 2).join("/");
  }
  return spec.split("/")[0];
}

function collectImports(filePath) {
  const text = readFileSync(filePath, "utf8");
  const specs = [];
  for (const match of text.matchAll(/from\s+["']([^"']+)["']/g)) {
    specs.push(match[1]);
  }
  return specs;
}

function scanComponentDir(dirPath) {
  const name = basename(dirPath);
  const files = readdirSync(dirPath).filter(isSourceFile).sort();
  const npm = new Set();
  const registry = new Set();

  for (const file of files) {
    for (const spec of collectImports(join(dirPath, file))) {
      if (spec.startsWith("./") || spec.startsWith("../")) continue;
      if (SKIP_IMPORTS.has(spec) || spec.startsWith("react/")) continue;

      if (spec === "@/lib/utils") {
        registry.add("utils");
        continue;
      }
      if (spec === "@/lib/types") {
        registry.add("types");
        continue;
      }
      if (spec.startsWith("@/components/ui/")) {
        registry.add(spec.slice("@/components/ui/".length).split("/")[0]);
        continue;
      }
      if (spec.startsWith("@/components/composites/")) {
        registry.add(spec.slice("@/components/composites/".length).split("/")[0]);
        continue;
      }

      npm.add(packageName(spec));
    }
  }

  return { name, files, npm: [...npm].sort(), registry: [...registry].sort() };
}

function registryDep(name) {
  return `${REPO}/${name}`;
}

function componentItem({
  name,
  files,
  npm,
  registry,
  itemType,
  fileType,
  targetPrefix,
  relativeDir,
}) {
  const item = {
    name,
    type: itemType,
    title: titleCase(name),
    description: DESCRIPTIONS[name] ?? `${titleCase(name)} component.`,
    files: files.map((file) => ({
      path: join(relativeDir, file).replaceAll("\\", "/"),
      type: fileType,
      target: `${targetPrefix}/${name}/${file}`,
    })),
  };

  if (npm.length > 0) {
    item.dependencies = npm;
  }

  if (registry.length > 0) {
    item.registryDependencies = registry.map(registryDep);
  }

  return item;
}

function writeRegistry(filePath, items) {
  const payload = {
    $schema: SCHEMA,
    items,
  };
  writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(
    `Wrote ${relative(ROOT, filePath)} (${items.length} item${items.length === 1 ? "" : "s"})`,
  );
}

function main() {
  const libItems = [
    {
      name: "utils",
      type: "registry:lib",
      title: "Utils",
      description: DESCRIPTIONS.utils,
      dependencies: ["clsx", "tailwind-merge"],
      files: [
        {
          path: "utils.ts",
          type: "registry:lib",
          target: "@lib/utils.ts",
        },
      ],
    },
    {
      name: "types",
      type: "registry:lib",
      title: "Types",
      description: DESCRIPTIONS.types,
      files: [
        {
          path: "types.ts",
          type: "registry:lib",
          target: "@lib/types.ts",
        },
      ],
    },
  ];

  const styleItems = [
    {
      name: "styles",
      type: "registry:theme",
      title: "Styles",
      description: DESCRIPTIONS.styles,
      dependencies: ["tw-animate-css"],
      files: [
        {
          path: "globals.css",
          type: "registry:file",
          target: "~/src/styles/gambitech-ds.css",
        },
      ],
      docs: "Import the installed CSS (or copy tokens into your globals.css) so semantic Tailwind tokens resolve.",
    },
  ];

  const uiRoot = join(ROOT, "src/components/ui");
  const uiItems = readdirSync(uiRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => scanComponentDir(join(uiRoot, entry.name)))
    .map((scanned) =>
      componentItem({
        ...scanned,
        itemType: "registry:ui",
        fileType: "registry:ui",
        targetPrefix: "@ui",
        relativeDir: scanned.name,
      }),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const compositesRoot = join(ROOT, "src/components/composites");
  const compositeItems = readdirSync(compositesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => scanComponentDir(join(compositesRoot, entry.name)))
    .map((scanned) =>
      componentItem({
        ...scanned,
        itemType: "registry:component",
        fileType: "registry:component",
        targetPrefix: "@components/composites",
        relativeDir: scanned.name,
      }),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  writeRegistry(join(ROOT, "src/lib/registry.json"), libItems);
  writeRegistry(join(ROOT, "src/styles/registry.json"), styleItems);
  writeRegistry(join(ROOT, "src/components/ui/registry.json"), uiItems);
  writeRegistry(join(ROOT, "src/components/composites/registry.json"), compositeItems);

  console.log(
    `Synced ${libItems.length + styleItems.length + uiItems.length + compositeItems.length} registry items.`,
  );
}

main();
