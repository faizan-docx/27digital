"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const LiquidGlass = ({
  containerClass,
  children,
  className,
}) => {
  return (
    <div className={cn("relative", containerClass)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl",
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:via-white/5 before:to-white/20",
          "before:opacity-0 before:transition-opacity before:duration-1000 before:ease-out",
          "hover:before:opacity-100",
          "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent",
          "after:translate-x-[-100%] after:transition-transform after:duration-1000 after:ease-out",
          "hover:after:translate-x-[100%]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
