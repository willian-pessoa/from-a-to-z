"use client";

import { useEffect, useState } from "react";
import { IconClock } from "@tabler/icons-react";
import { cn } from "@/src/utils/cn";

interface DisplayTimerProps {
  time: number;
  onFinish?: () => void;
  config?: { iconClassName?: string; timerClassName?: string };
}

export default function DisplayTimer({
  time,
  onFinish,
  config,
}: DisplayTimerProps) {
  const [remaining, setRemaining] = useState(time);

  useEffect(() => {
    if (remaining <= 0) {
      onFinish?.();
      return;
    }

    const interval = setInterval(() => {
      setRemaining((current) => current - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining, onFinish]);

  return (
    <div className="flex items-center gap-2">
      <IconClock className={cn("text-emerald-200", config?.iconClassName)} />

      <span
        className={cn(
          "font-mono font-bold text-emerald-200",
          config?.timerClassName,
        )}
      >
        {remaining.toString().padStart(2, "0")}s
      </span>
    </div>
  );
}
