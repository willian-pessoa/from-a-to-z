"use client";

import * as Select from "@radix-ui/react-select";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import clsx from "clsx";

export interface AppSelectOption {
  value: string;
  label: string;
}

interface AppSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly AppSelectOption[];
  placeholder?: string;
  className?: string;
}

export default function AppSelect({
  value,
  onValueChange,
  options,
  placeholder,
  className,
}: AppSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={clsx(
          "flex h-10 w-full items-center justify-between rounded-lg border border-emerald-600 px-3 text-sm outline-none transition",
          "data-placeholder:text-emerald-50 data-placeholder:opacity-75",
          "focus:ring-2 focus:ring-emerald-400",
          className,
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <IconChevronDown size={18} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          className="z-50 overflow-hidden rounded-lg border border-emerald-700 bg-emerald-900 shadow-lg"
        >
          <Select.Viewport className="max-h-60 p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer select-none items-center rounded py-2 pl-8 pr-3 text-sm outline-none data-highlighted:bg-emerald-700"
              >
                <Select.ItemIndicator className="absolute left-2">
                  <IconCheck size={16} />
                </Select.ItemIndicator>

                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
