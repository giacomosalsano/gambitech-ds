import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Skeleton is the base building block for loading placeholders.
 *
 * Every primitive that supports a loading placeholder composes its own
 * `<Name>Skeleton` from this component (see e.g. `ButtonSkeleton`), reusing the
 * component's own size definitions so the placeholder occupies the exact same
 * footprint as the loaded component.
 *
 * It is purely presentational: mark the surrounding region with the appropriate
 * ARIA state (e.g. `aria-busy`) at the consumer level when needed.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
