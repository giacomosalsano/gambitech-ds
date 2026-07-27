import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import type { CheckboxProps, CheckboxSkeletonProps } from "./checkbox.types";

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group flex items-center justify-center text-current transition-none"
      >
        <Check
          className="size-3.5 group-data-[state=indeterminate]:hidden"
          aria-hidden="true"
        />
        <Minus
          className="hidden size-3.5 group-data-[state=indeterminate]:block"
          aria-hidden="true"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

function CheckboxSkeleton({ className, ...props }: CheckboxSkeletonProps) {
  return (
    <Skeleton
      data-slot="checkbox-skeleton"
      className={cn("size-4 rounded-[4px]", className)}
      {...props}
    />
  );
}

export { Checkbox, CheckboxSkeleton };
export type { CheckboxProps, CheckboxSkeletonProps } from "./checkbox.types";
