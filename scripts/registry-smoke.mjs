/**
 * Smoke-test consumer installation via `shadcn add`.
 *
 * 1. Builds the registry into `public/r/`
 * 2. Copies items into `.tmp/registry-smoke/r/` and rewrites same-repo
 *    GitHub registryDependencies to local HTTP URLs (so we can validate
 *    without publishing)
 * 3. Serves that directory and runs `shadcn add` into a temp consumer
 * 4. Asserts expected files landed under the consumer aliases
 */

import { spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import http from "node:http";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const REPO = "giacomosalsano/gambitech-ds";
const TMP = join(ROOT, ".tmp/registry-smoke");
const REGISTRY_DIR = join(TMP, "r");
const CONSUMER_DIR = join(TMP, "consumer");
const PORT = Number(process.env.REGISTRY_SMOKE_PORT ?? 4873);

const SMOKE_ITEMS = ["button", "app-shell"];

const EXPECTED_FILES = [
  "src/lib/utils.ts",
  "src/lib/types.ts",
  "src/components/ui/skeleton/skeleton.tsx",
  "src/components/ui/button/button.tsx",
  "src/components/ui/button/index.ts",
  "src/components/ui/sheet/sheet.tsx",
  "src/components/composites/app-shell/app-shell.tsx",
  "src/components/composites/app-shell/index.ts",
];

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

function rewriteAllRegistryDependencies(dir, baseUrl) {
  for (const file of readdirSync(dir).filter((name) => name.endsWith(".json"))) {
    const path = join(dir, file);
    const item = JSON.parse(readFileSync(path, "utf8"));
    if (!Array.isArray(item.registryDependencies)) continue;

    item.registryDependencies = item.registryDependencies.map((dep) => {
      const prefix = `${REPO}/`;
      if (typeof dep === "string" && dep.startsWith(prefix)) {
        const name = dep.slice(prefix.length);
        return `${baseUrl}/${name}.json`;
      }
      return dep;
    });

    writeFileSync(path, `${JSON.stringify(item, null, 2)}\n`);
  }
}

function writeConsumerScaffold(dir) {
  mkdirSync(join(dir, "src/app"), { recursive: true });
  mkdirSync(join(dir, "src/components/ui"), { recursive: true });
  mkdirSync(join(dir, "src/lib"), { recursive: true });

  writeFileSync(
    join(dir, "package.json"),
    `${JSON.stringify(
      {
        name: "gambitech-ds-registry-smoke",
        private: true,
        type: "module",
        dependencies: {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
        },
      },
      null,
      2,
    )}\n`,
  );

  writeFileSync(
    join(dir, "tsconfig.json"),
    `${JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          jsx: "react-jsx",
          moduleResolution: "Bundler",
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
          strict: true,
          skipLibCheck: true,
        },
        include: ["src"],
      },
      null,
      2,
    )}\n`,
  );

  writeFileSync(
    join(dir, "components.json"),
    `${JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "",
          css: "src/app/globals.css",
          baseColor: "neutral",
          cssVariables: true,
          prefix: "",
        },
        iconLibrary: "lucide",
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
        registries: {
          "@gambitech": `http://127.0.0.1:${PORT}/{name}.json`,
        },
      },
      null,
      2,
    )}\n`,
  );

  writeFileSync(join(dir, "src/app/globals.css"), `@import "tailwindcss";\n`);
}

function startStaticServer(dir, port) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", `http://127.0.0.1:${port}`);
    const relativePath = decodeURIComponent(url.pathname.replace(/^\//, ""));
    const filePath = join(dir, relativePath);
    if (!filePath.startsWith(dir) || !existsSync(filePath)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "not found", path: url.pathname }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(readFileSync(filePath));
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

function assertExpectedFiles(consumerDir) {
  const missing = EXPECTED_FILES.filter((rel) => !existsSync(join(consumerDir, rel)));
  if (missing.length > 0) {
    throw new Error(`Smoke install missing files:\n${missing.map((f) => `  - ${f}`).join("\n")}`);
  }

  const button = readFileSync(join(consumerDir, "src/components/ui/button/button.tsx"), "utf8");
  if (!button.includes('from "@/lib/utils"')) {
    throw new Error("Installed button.tsx does not import @/lib/utils");
  }
  if (!button.includes("export function Button") && !button.includes("function Button")) {
    throw new Error("Installed button.tsx does not define Button");
  }
}

async function main() {
  console.log("→ Building registry…");
  await run("pnpm", ["build:registry"], { cwd: ROOT });

  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(REGISTRY_DIR, { recursive: true });
  cpSync(join(ROOT, "public/r"), REGISTRY_DIR, { recursive: true });

  const baseUrl = `http://127.0.0.1:${PORT}`;
  rewriteAllRegistryDependencies(REGISTRY_DIR, baseUrl);

  writeConsumerScaffold(CONSUMER_DIR);

  console.log("→ Installing consumer base deps…");
  // Keep the smoke consumer outside the monorepo workspace resolution.
  writeFileSync(join(CONSUMER_DIR, ".npmrc"), "ignore-workspace-root-check=true\n");
  await run("pnpm", ["install", "--ignore-workspace"], { cwd: CONSUMER_DIR });

  console.log(`→ Serving registry at ${baseUrl} …`);
  const server = await startStaticServer(REGISTRY_DIR, PORT);

  try {
    console.log(`→ shadcn add ${SMOKE_ITEMS.map((item) => `@gambitech/${item}`).join(" ")}`);
    await run(
      "pnpm",
      [
        "dlx",
        "shadcn@latest",
        "add",
        ...SMOKE_ITEMS.map((item) => `@gambitech/${item}`),
        "--yes",
        "--overwrite",
      ],
      { cwd: CONSUMER_DIR },
    );

    assertExpectedFiles(CONSUMER_DIR);
    console.log("✔ Registry smoke passed:");
    for (const file of EXPECTED_FILES) {
      console.log(`  - ${file}`);
    }
  } finally {
    server.close();
  }
}

main().catch((error) => {
  console.error("✖ Registry smoke failed:", error.message);
  process.exitCode = 1;
});
