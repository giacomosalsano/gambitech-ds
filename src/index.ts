/**
 * Public entry point for @gambitech/ds.
 *
 * Primitives are added here as they are implemented (see docs/ai/EPICS.md),
 * using explicit named exports only.
 */

export { cn } from "./lib/utils";

export {
  Alert,
  AlertDescription,
  AlertSkeleton,
  AlertTitle,
  alertVariants,
} from "./components/ui/alert";
export type {
  AlertDescriptionProps,
  AlertProps,
  AlertSkeletonProps,
  AlertTitleProps,
} from "./components/ui/alert";
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
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSkeleton,
  CardTitle,
} from "./components/ui/card";
export type {
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardSkeletonProps,
  CardTitleProps,
} from "./components/ui/card";
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
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
export type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuPortalProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
} from "./components/ui/dropdown-menu";
export { Input, InputSkeleton } from "./components/ui/input";
export type { InputProps, InputSkeletonProps } from "./components/ui/input";
export { Label } from "./components/ui/label";
export type { LabelProps } from "./components/ui/label";
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
export type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "./components/ui/popover";
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
export { Separator } from "./components/ui/separator";
export type { SeparatorProps } from "./components/ui/separator";
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
export { Toaster, toast } from "./components/ui/sonner";
export type { ToasterProps } from "./components/ui/sonner";
export { Switch, SwitchSkeleton } from "./components/ui/switch";
export type { SwitchProps, SwitchSkeletonProps } from "./components/ui/switch";
export { Textarea, TextareaSkeleton } from "./components/ui/textarea";
export type { TextareaProps, TextareaSkeletonProps } from "./components/ui/textarea";
