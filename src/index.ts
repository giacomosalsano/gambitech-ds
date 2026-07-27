/**
 * Public entry point for @gambitech/ds.
 *
 * Primitives are added here as they are implemented (see docs/ai/EPICS.md),
 * using explicit named exports only.
 */

export { cn } from "./lib/utils";

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
export type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogOverlayProps,
  AlertDialogPortalProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from "./components/ui/alert-dialog";
export { Badge, BadgeSkeleton, badgeVariants } from "./components/ui/badge";
export type { BadgeProps, BadgeSkeletonProps } from "./components/ui/badge";
export { Button, ButtonSkeleton, buttonVariants } from "./components/ui/button";
export type { ButtonProps, ButtonSkeletonProps } from "./components/ui/button";
export { Checkbox, CheckboxSkeleton } from "./components/ui/checkbox";
export type { CheckboxProps, CheckboxSkeletonProps } from "./components/ui/checkbox";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./components/ui/dialog";
export { Input, InputSkeleton } from "./components/ui/input";
export type { InputProps, InputSkeletonProps } from "./components/ui/input";
export { Label } from "./components/ui/label";
export type { LabelProps } from "./components/ui/label";
export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemSkeleton,
} from "./components/ui/radio-group";
export type {
  RadioGroupProps,
  RadioGroupItemProps,
  RadioGroupItemSkeletonProps,
} from "./components/ui/radio-group";
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  sheetContentVariants,
} from "./components/ui/sheet";
export type {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetPortalProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps,
} from "./components/ui/sheet";
export { Skeleton } from "./components/ui/skeleton";
export type { SkeletonProps } from "./components/ui/skeleton";
export { Switch, SwitchSkeleton } from "./components/ui/switch";
export type { SwitchProps, SwitchSkeletonProps } from "./components/ui/switch";
export { Textarea, TextareaSkeleton } from "./components/ui/textarea";
export type { TextareaProps, TextareaSkeletonProps } from "./components/ui/textarea";
