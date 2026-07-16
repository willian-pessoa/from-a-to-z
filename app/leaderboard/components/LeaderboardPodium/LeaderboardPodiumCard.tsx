import * as React from "react";

interface LeaderboardPodiumCardProps {
  position: 1 | 2 | 3;
  name: string;
}

const POSITION_CONFIG = {
  1: {
    nameSize: "text-2xl",
    height: "h-75",
    maxWidth: "max-w-70",
    iconSize: "h-32 w-32",
    iconColor: "text-yellow-300",
    numberSize: "text-6xl",
    border: "border-yellow-300",
    cardGlow:
      "bg-[linear-gradient(145deg,rgba(250,204,21,0.22),rgba(6,78,59,0.85)_45%,rgba(6,78,59,1))]",
    aura: "bg-[radial-gradient(circle,rgba(250,204,21,0.8)_0%,rgba(250,204,21,0.35)_35%,rgba(250,204,21,0.08)_60%,transparent_75%)]",
    iconGlow: "shadow-[0_0_50px_rgba(250,204,21,0.55)]",
  },
  2: {
    nameSize: "text-xl",
    height: "h-60",
    maxWidth: "max-w-65",
    iconSize: "h-24 w-24",
    iconColor: "text-slate-300",
    numberSize: "text-4xl",
    border: "border-slate-300",
    cardGlow:
      "bg-[linear-gradient(145deg,rgba(226,232,240,0.18),rgba(6,78,59,0.85)_45%,rgba(6,78,59,1))]",
    aura: "bg-[radial-gradient(circle,rgba(226,232,240,0.5)_0%,rgba(226,232,240,0.25)_35%,transparent_70%)]",
    iconGlow: "shadow-[0_0_30px_rgba(226,232,240,0.25)]",
  },
  3: {
    nameSize: "text-lg",
    height: "h-45",
    maxWidth: "max-w-65",
    iconSize: "h-20 w-20",
    iconColor: "text-orange-400",
    numberSize: "text-3xl",
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
    <div
      className={`
        relative
        flex flex-1 flex-col items-center justify-around
        overflow-hidden
        ${config.height}
        ${config.maxWidth}
        px-4 py-6
        rounded-lg
        border
        ${config.border}
        ${config.cardGlow}
        shadow-2xl
      `}
    >
      {/* Luz central da colocação */}
      <div
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-28
          h-80
          w-80
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          ${position === 1 ? "opacity-90" : "opacity-70"}
          animate-pulse
          ${config.aura}
        `}
      />

      {/* Reflexo superior */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-32
          bg-linear-to-b
          from-white/10
          to-transparent
        "
      />

      {/* Colocação */}
      <div
        className={`
          relative
          flex
          items-center
          justify-center
          ${config.iconSize}
          rounded-full
          border-8
          ${config.border}
          bg-emerald-950/80
          ${config.iconGlow}
        `}
      >
        <span
          className={`
            ${config.numberSize}
            font-black
            ${config.iconColor}
          `}
        >
          {position}
        </span>
      </div>

      {/* Nome */}
      <span
        className={`
          relative
          ${config.nameSize}
          font-bold
          text-emerald-50
          text-center
        `}
      >
        {name}
      </span>
    </div>
  );
}
