"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const LampEffect = ({
  delay = 0.5,
  duration = 0.8,
  className,
  children,
}) => {
  const durationInSeconds = `${duration}s`;
  const delayInSeconds = `${delay}s`;

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        {/* Conic Gradient */}
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="animate-conic-gradient bg-gradient-conic absolute inset-auto right-1/2 h-56 w-60 overflow-visible from-cyan-500 via-transparent to-transparent text-white opacity-50 [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-transparent [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-transparent [mask-image:linear-gradient(to_right,white,transparent)]" />
        </div>

        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="animate-conic-gradient bg-gradient-conic absolute inset-auto left-1/2 h-56 w-60 from-transparent via-transparent to-cyan-500 text-white opacity-50 [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-transparent [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-transparent [mask-image:linear-gradient(to_top,white,transparent)]" />
        </div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-transparent blur-2xl"></div>

        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>

        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>

        {/* Spotlight */}
        <div
          style={{
            animationDelay: delayInSeconds,
            animationDuration: durationInSeconds,
          }}
          className="animate-spotlight absolute inset-auto z-30 h-36 w-32 -translate-y-24 rounded-full bg-cyan-400 blur-2xl"
        ></div>

        {/* Glowing Line */}
        <div
          style={{
            animationDelay: delayInSeconds,
            animationDuration: durationInSeconds,
          }}
          className="animate-glowing-line absolute inset-auto z-50 h-0.5 w-60 -translate-y-28 bg-cyan-400"
        ></div>

        <div className="absolute inset-auto z-40 h-44 w-full translate-y-[-12.5rem] bg-transparent"></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
