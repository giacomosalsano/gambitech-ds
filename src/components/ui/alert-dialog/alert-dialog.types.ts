import type * as React from "react";
import type * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

export type AlertDialogProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Root
>;

export type AlertDialogTriggerProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Trigger
>;

export type AlertDialogPortalProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Portal
>;

export type AlertDialogOverlayProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Overlay
>;

export interface AlertDialogContentProps
  extends React.ComponentProps<typeof AlertDialogPrimitive.Content> {
  /**
   * Renders the top-right close (X) button. Defaults to `false` — alert
   * dialogs should be dismissed via explicit action buttons.
   */
  showCloseButton?: boolean;
  /**
   * When `false` (default), outside pointer interactions do not dismiss the
   * alert. Opt in with `true` to allow overlay-click dismiss (Radix AlertDialog
   * omits native outside-dismiss handlers, so this is wired via the overlay).
   */
  isOutsideDismissible?: boolean;
}

export type AlertDialogHeaderProps = React.ComponentProps<"div">;

export type AlertDialogFooterProps = React.ComponentProps<"div">;

export type AlertDialogTitleProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>;

export type AlertDialogDescriptionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>;

export type AlertDialogActionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Action
>;

export type AlertDialogCancelProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Cancel
>;
