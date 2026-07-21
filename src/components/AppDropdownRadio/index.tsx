"use client";

import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { IconCheck } from "@tabler/icons-react";
import clsx from "clsx";

export interface DropdownRadioItem<T extends string> {
  value: T;
  label: string;
}

interface AppDropdownRadioProps<T extends string> {
  trigger: React.ReactNode;
  value: T;
  onValueChange: (value: T) => void;
  items: DropdownRadioItem<T>[];
}

export default function AppDropdownRadio<T extends string>({
  trigger,
  value,
  onValueChange,
  items,
}: AppDropdownRadioProps<T>) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          side="bottom"
          align="start"
          className="min-w-48 rounded-lg border border-emerald-700 bg-emerald-900 p-1 shadow-lg"
        >
          <DropdownMenuPrimitive.RadioGroup
            value={value}
            onValueChange={(value) => onValueChange(value as T)}
          >
            {items.map((item) => (
              <DropdownMenuPrimitive.RadioItem
                key={item.value}
                value={item.value}
                className={clsx(
                  "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 outline-none",
                  "hover:bg-emerald-800 data-highlighted:bg-emerald-800",
                )}
              >
                {item.label}

                <DropdownMenuPrimitive.ItemIndicator>
                  <IconCheck size={16} />
                </DropdownMenuPrimitive.ItemIndicator>
              </DropdownMenuPrimitive.RadioItem>
            ))}
          </DropdownMenuPrimitive.RadioGroup>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
