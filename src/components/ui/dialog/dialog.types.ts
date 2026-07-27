import type * as React from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export type DialogTriggerProps = React.ComponentProps<
  typeof DialogPrimitive.Trigger
>;

export type DialogPortalProps = React.ComponentProps<
  typeof DialogPrimitive.Portal
>;

export type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;

export type DialogOverlayProps = React.ComponentProps<
  typeof DialogPrimitive.Overlay
>;

export interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  /**
   * Renders the top-right close (X) button. Defaults to `true`.
   */
  showCloseButton?: boolean;
  /**
   * When `false`, pointer interactions outside the content do not dismiss the
   * dialog. Defaults to `true`.
   */
  isOutsideDismissible?: boolean;
}

export type DialogHeaderProps = React.ComponentProps<"div">;

export type DialogFooterProps = React.ComponentProps<"div">;

export type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;

export type DialogDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;
