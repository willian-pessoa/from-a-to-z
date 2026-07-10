"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";

import { cn } from "@/src/utils/cn";
import IconButton from "../IconButton";

export interface AppDialogProps extends Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  "title"
> {
  trigger: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
}

export const AppDialog = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  AppDialogProps
>(
  (
    {
      trigger,
      title,
      description,
      children,
      open,
      defaultOpen,
      onOpenChange,
      showCloseButton = true,
      className,
      closeOnOutsideClick = true,
      ...props
    },
    ref,
  ) => (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-emerald-600 bg-emerald-950 p-2 shadow-2xl outline-none",
            className,
          )}
          onPointerDownOutside={(event) => {
            if (!closeOnOutsideClick) {
              event.preventDefault();
            }
          }}
          {...props}
        >
          {(title || showCloseButton) && (
            <div className="mb-4 flex items-center justify-between gap-4 border-b pb-2 border-emerald-600">
              <div>
                {title && (
                  <DialogPrimitive.Title className="text-lg font-bold e ml-2">
                    {title}
                  </DialogPrimitive.Title>
                )}
              </div>

              {showCloseButton && (
                <DialogPrimitive.Close asChild>
                  <IconButton className="p-1">
                    <IconX />
                  </IconButton>
                </DialogPrimitive.Close>
              )}
            </div>
          )}

          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  ),
);

AppDialog.displayName = "AppDialog";
