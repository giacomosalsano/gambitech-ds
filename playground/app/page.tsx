import { cn } from "@gambitech/ds";

const swatches = [
  { name: "primary", className: "bg-primary text-primary-foreground" },
  { name: "secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "muted", className: "bg-muted text-muted-foreground" },
  { name: "accent", className: "bg-accent text-accent-foreground" },
  { name: "destructive", className: "bg-destructive text-destructive-foreground" },
  { name: "success", className: "bg-success text-success-foreground" },
  { name: "warning", className: "bg-warning text-warning-foreground" },
  { name: "info", className: "bg-info text-info-foreground" },
] as const;

export default function Home() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Gambitech Design System</h1>
        <p className="text-sm text-muted-foreground">
          Foundation playground. Tokens are consumed from{" "}
          <code className="rounded bg-muted px-1 py-0.5">@gambitech/ds/styles.css</code>.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map((swatch) => (
          <div
            key={swatch.name}
            className={cn(
              "flex h-20 items-end rounded-lg border border-border p-3 text-xs font-medium",
              swatch.className,
            )}
          >
            {swatch.name}
          </div>
        ))}
      </section>
    </main>
  );
}
