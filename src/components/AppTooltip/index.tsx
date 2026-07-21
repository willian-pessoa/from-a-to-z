"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";

export interface AppTooltipProps extends React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
> {
  children: React.ReactNode;
  text: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  maxWidthClassName?: string;
}

export const AppTooltip = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  AppTooltipProps
>(
  (
    {
      children,
      text,
      open,
      defaultOpen,
      onOpenChange,
      side = "top",
      align = "center",
      maxWidthClassName = "max-w-xs",
      ...props
    },
    ref,
  ) => (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          side={side}
          align={align}
          className={clsx(
            "rounded-md bg-emerald-900 px-3 py-2 text-sm text-emerald-50 shadow-lg whitespace-normal break-words",
            maxWidthClassName,
            props.className,
          )}
          {...props}
        >
          {text}
          <TooltipPrimitive.Arrow className="fill-emerald-900" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  ),
);

AppTooltip.displayName = "AppTooltip";
