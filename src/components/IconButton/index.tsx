import * as React from "react";

import { cn } from "@/src/utils/cn";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function IconButton({
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "flex justify-center cursor-pointer items-center rounded-lg border border-emerald-600 bg-emerald-700 p-2 outline-none transition-colors hover:bg-emerald-600",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
