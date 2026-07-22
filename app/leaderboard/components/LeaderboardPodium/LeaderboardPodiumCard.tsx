import * as React from "react";
import clsx from "clsx";

interface LeaderboardPodiumCardProps {
  position: 1 | 2 | 3;
  name: string;
}

const POSITION_CONFIG = {
  1: {
    nameSize: "text-2xl",
    height: "h-32 sm:h-75",
    width: "sm:w-52 lg:w-68",
    iconSize: "h-22 w-22 sm:h-32 sm:w-32",
    iconColor: "text-yellow-300",
    numberSize: "text-4xl sm:text-6xl",
    border: "border-yellow-300",
    cardGlow:
      "bg-[linear-gradient(145deg,rgba(250,204,21,0.22),rgba(6,78,59,0.85)_45%,rgba(6,78,59,1))]",
    aura: "bg-[radial-gradient(circle,rgba(250,204,21,0.8)_0%,rgba(250,204,21,0.35)_35%,rgba(250,204,21,0.08)_60%,transparent_75%)]",
    iconGlow: "shadow-[0_0_50px_rgba(250,204,21,0.55)]",
  },
  2: {
    nameSize: "text-xl",
    height: "h-28 sm:h-60",
    width: "sm:w-46 lg:w-60",
    iconSize: "h-20 w-20 sm:h-24 sm:w-24",
    iconColor: "text-slate-300",
    numberSize: "text-3xl sm:text-4xl",
    border: "border-slate-300",
    cardGlow:
      "bg-[linear-gradient(145deg,rgba(226,232,240,0.18),rgba(6,78,59,0.85)_45%,rgba(6,78,59,1))]",
    aura: "bg-[radial-gradient(circle,rgba(226,232,240,0.5)_0%,rgba(226,232,240,0.25)_35%,transparent_70%)]",
    iconGlow: "shadow-[0_0_30px_rgba(226,232,240,0.25)]",
  },
  3: {
    nameSize: "text-lg",
    height: "h-24 sm:h-45",
    width: "sm:w-46 lg:w-52",
    iconSize: "h-18 w-18 sm:h-20 sm:w-20",
    iconColor: "text-orange-400",
    numberSize: "text-2xl sm:text-3xl",
    border: "border-orange-400",
    cardGlow:
      "bg-[linear-gradient(145deg,rgba(251,146,60,0.22),rgba(6,78,59,0.85)_45%,rgba(6,78,59,1))]",
    aura: "bg-[radial-gradient(circle,rgba(251,146,60,0.5)_0%,rgba(251,146,60,0.25)_35%,transparent_70%)]",
    iconGlow: "shadow-[0_0_30px_rgba(251,146,60,0.3)]",
  },
};

export default function LeaderboardPodiumCard({
  position,
  name,
}: LeaderboardPodiumCardProps) {
  const config = POSITION_CONFIG[position];

  return (
    <>
      <DesktopCard config={config} position={position} name={name} />

      <MobileCard config={config} position={position} name={name} />
    </>
  );
}

interface CardProps extends LeaderboardPodiumCardProps {
  config: (typeof POSITION_CONFIG)[1];
}

function DesktopCard({ config, position, name }: CardProps) {
  return (
    <div
      className={clsx(
        "hidden sm:flex relative flex-1 flex-col items-center justify-between overflow-hidden rounded-lg border px-4 py-6 shadow-2xl",
        config.height,
        config.width,
        config.border,
        config.cardGlow,
      )}
    >
      <div
        className={clsx(
          "pointer-events-none absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse",
          position === 1 ? "opacity-90" : "opacity-70",
          config.aura,
        )}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white/10 to-transparent" />

      <div
        className={clsx(
          "relative flex items-center justify-center rounded-full border-8 bg-emerald-950/80",
          config.iconSize,
          config.border,
          config.iconGlow,
        )}
      >
        <span
          className={clsx(config.numberSize, "font-black", config.iconColor)}
        >
          {position}
        </span>
      </div>

      <span
        className={clsx(
          config.nameSize,
          "relative text-center font-bold text-emerald-50",
        )}
      >
        {name}
      </span>
    </div>
  );
}

function MobileCard({ config, position, name }: CardProps) {
  return (
    <div
      className={clsx(
        "flex sm:hidden w-full items-center gap-4 rounded-lg border px-4 py-3 shadow-xl",
        config.border,
        config.cardGlow,
        config.height,
      )}
    >
      <div
        className={clsx(
          "flex shrink-0 items-center justify-center rounded-full border-4 bg-emerald-950",
          config.border,
          config.iconGlow,
          config.iconSize,
        )}
      >
        <span
          className={clsx("font-black", config.iconColor, config.numberSize)}
        >
          {position}
        </span>
      </div>

      <span className="flex-1 truncate text-lg font-bold text-emerald-50">
        {name}
      </span>
    </div>
  );
}
