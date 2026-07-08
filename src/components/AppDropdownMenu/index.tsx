"use client";

import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

interface MenuItem {
  label: string;
  onSelect?: () => void;
  children?: React.ReactNode;
}

interface AppDropdownMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
}

export default function AppDropdownMenu({
  trigger,
  items,
}: AppDropdownMenuProps) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          side="bottom"
          align="start"
          className="min-w-48 flex flex-col rounded-lg border border-emerald-700 bg-emerald-900 p-1 shadow-lg"
        >
          {items.map((item) => (
            <DropdownMenuPrimitive.Item
              key={item.label}
              onSelect={item.onSelect}
              asChild={!!item.children}
              className="cursor-pointer rounded-lg px-3 py-2 outline-none hover:bg-emerald-800"
            >
              {item.children ?? item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
