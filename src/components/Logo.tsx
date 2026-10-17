import { useId } from "react";

export default function Logo({ className = "" }: { className?: string }) {
  const id = useId();
  const loop = `${id}-loop`;
  const flame = `${id}-flame`;

  return (
    <span className={`inline-flex items-center gap-2 sm:gap-3 ${className}`}>
      <svg
        viewBox="0 0 80 44"
        className="h-8 w-auto sm:h-10 md:h-11 shrink-0"
        role="img"
        aria-label="RocketsRobotics logo"
      >
        <defs>
          <linearGradient id={loop} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f46e5" />
            <stop offset="0.55" stopColor="#7c3aed" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id={flame} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#f97316" />
          </linearGradient>
        </defs>

        {/* Infinity loop */}
        <path
          d="M40 22 C32 8 8 6 8 22 C8 38 32 36 40 22 C48 8 72 6 72 22 C72 38 48 36 40 22 Z"
          fill="none"
          stroke={`url(#${loop})`}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Rocket, tilted across the crossing point */}
        <g transform="translate(40 22) rotate(45)">
          <path d="M-3 9 L0 19 L3 9 Z" fill={`url(#${flame})`} />
          <path d="M-5 3 L-10 11 L-4 9 Z M5 3 L10 11 L4 9 Z" fill="#f97316" />
          <path
            d="M0 -16 C6 -10 6 3 4 10 L-4 10 C-6 3 -6 -10 0 -16 Z"
            fill="#ffffff"
            stroke="#312e81"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M0 -16 C3 -13 4.4 -9.5 4.9 -6 L-4.9 -6 C-4.4 -9.5 -3 -13 0 -16 Z" fill="#f97316" />
          <circle cx="0" cy="-0.5" r="2.8" fill="#06b6d4" stroke="#312e81" strokeWidth="1.2" />
        </g>
      </svg>

      <span className="flex flex-col leading-none">
        <span className="text-lg sm:text-2xl font-bold tracking-tight whitespace-nowrap">
          <span className="text-indigo-600">Rockets</span>
          <span className="bg-linear-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            Robotics
          </span>
        </span>
        <span className="mt-1 hidden sm:block text-[0.6rem] font-medium uppercase tracking-[0.32em] text-gray-500">
          To infinity and beyond
        </span>
      </span>
    </span>
  );
}
