import * as React from "react";
import clsx from "clsx";

export interface AppTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

export default function AppTextInput({
  leftSection,
  rightSection,
  className,
  ...props
}: AppTextInputProps) {
  return (
    <div
      className={clsx(
        "flex h-10 items-center gap-2 rounded-lg border border-emerald-600 px-3 transition-colors",
        "focus-within:border-emerald-400",
        className,
      )}
    >
      {leftSection && <div className="text-emerald-50">{leftSection}</div>}

      <input
        {...props}
        className={clsx(
          "flex-1 bg-transparent outline-none",
          "placeholder:text-emerald-50 placeholder:opacity-75",
          "[-webkit-text-fill-color:white]",
          "[transition:background-color_9999s_ease-in-out_0s]",
        )}
      />

      {rightSection && <div className="text-emerald-50">{rightSection}</div>}
    </div>
  );
}
