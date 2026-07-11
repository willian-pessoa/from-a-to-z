import clsx from "clsx";

export interface LoaderProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({
  text = "",
  className,
  size = "md",
}: LoaderProps) {
  const spinnerSize = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-4 py-8",
        className,
      )}
    >
      <div
        className={clsx(
          "animate-spin rounded-full border-emerald-700 border-t-emerald-300",
          spinnerSize[size],
        )}
      />

      {text && <span className="text-sm text-emerald-200">{text}</span>}
    </div>
  );
}
