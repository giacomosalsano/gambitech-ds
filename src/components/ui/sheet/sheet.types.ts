import type * as React from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";
import type { VariantProps } from "class-variance-authority";

import type { sheetContentVariants } from "./sheet";

export type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export type SheetTriggerProps = React.ComponentProps<
  typeof DialogPrimitive.Trigger
>;

export type SheetCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;

export type SheetPortalProps = React.ComponentProps<
  typeof DialogPrimitive.Portal
>;

export type SheetOverlayProps = React.ComponentProps<
  typeof DialogPrimitive.Overlay
>;

export interface SheetContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {
  /**
   * Renders the top-right close (X) button. Defaults to `true`.
   */
  showCloseButton?: boolean;
  /**
   * When `false`, pointer interactions outside the content do not dismiss the
   * sheet. Defaults to `true`.
   */
  isOutsideDismissible?: boolean;
}

export type SheetHeaderProps = React.ComponentProps<"div">;

export type SheetFooterProps = React.ComponentProps<"div">;

export type SheetTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;

export type SheetDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;
