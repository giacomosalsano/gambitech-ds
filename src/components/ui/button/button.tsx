import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /**
   * Render the button as its single child element (Radix `Slot`), merging props.
   * When `asChild` is set, the loading spinner is not injected automatically —
   * the consumer owns the rendered subtree.
   */
  asChild?: boolean;
  /**
   * Loading state. The button stays visually active but announces `aria-busy`,
   * shows a spinner (non-`asChild`), and suppresses click interaction to prevent
   * duplicate submissions. Use `disabled` for the greyed-out, inert state.
   */
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  return (
    <Comp
      data-slot="button"
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={asChild ? undefined : disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={handleClick}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
          {children}
        </>
      )}
    </Comp>
  );
}

const buttonSkeletonVariants = cva("", {
  variants: {
    // Heights and radius mirror `buttonVariants` sizes so the placeholder
    // occupies the same vertical footprint as the loaded button. Widths are
    // content-dependent, so sensible defaults are provided and can be overridden
    // via `className`.
    size: {
      default: "h-9 w-20 rounded-md",
      sm: "h-8 w-16 rounded-md",
      lg: "h-10 w-24 rounded-md",
      icon: "size-9 rounded-md",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ButtonSkeletonProps
  extends React.ComponentProps<typeof Skeleton>,
    VariantProps<typeof buttonSkeletonVariants> {}

/**
 * Loading placeholder that matches the footprint of a `Button` for a given size.
 */
function ButtonSkeleton({ className, size, ...props }: ButtonSkeletonProps) {
  return (
    <Skeleton
      data-slot="button-skeleton"
      className={cn(buttonSkeletonVariants({ size }), className)}
      {...props}
    />
  );
}

export { Button, ButtonSkeleton, buttonVariants };
export type { ButtonProps, ButtonSkeletonProps };
