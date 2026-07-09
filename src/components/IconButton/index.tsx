import * as React from "react";

export interface IIconButtonProps {
  children: React.ReactNode;
}

export default function IconButton({ children, ...props }: IIconButtonProps) {
  return (
    <button
      className="flex items-center p-2 rounded-lg bg-emerald-700 cursor-pointer border-emerald-600 hover:bg-emerald-600 outline-none"
      {...props}
    >
      {children}
    </button>
  );
}
