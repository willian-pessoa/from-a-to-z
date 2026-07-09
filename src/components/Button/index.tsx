import * as React from "react";
import { cn } from "@/src/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex cursor-pointer items-center rounded-lg border border-emerald-600 bg-emerald-700 px-2 py-1 outline-none hover:bg-emerald-600",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
