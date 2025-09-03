"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const PATTERN_BACKGROUND_DIRECTION = {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
};

export const PATTERN_BACKGROUND_VARIANT = {
  BigDot: "big-dot",
  SmallDot: "small-dot",
  Line: "line",
  Grid: "grid",
};

export const PATTERN_BACKGROUND_SPEED = {
  Slow: "slow",
  Medium: "medium",
  Fast: "fast",
};

export const PATTERN_BACKGROUND_MASK = {
  None: "none",
  EllipseTop: "ellipse-top",
  EllipseBottom: "ellipse-bottom",
  EllipseLeft: "ellipse-left",
  EllipseRight: "ellipse-right",
};

export const PatternBackground = ({
  animate = true,
  direction = PATTERN_BACKGROUND_DIRECTION.Bottom,
  variant = PATTERN_BACKGROUND_VARIANT.BigDot,
  speed = PATTERN_BACKGROUND_SPEED.Slow,
  mask = PATTERN_BACKGROUND_MASK.None,
  className,
  children,
}) => {
  const getPatternClass = () => {
    const baseClass = "absolute inset-0";
    
    if (variant === PATTERN_BACKGROUND_VARIANT.BigDot) {
      return cn(
        baseClass,
        "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)]",
        "bg-[size:20px_20px]"
      );
    }
    
    if (variant === PATTERN_BACKGROUND_VARIANT.SmallDot) {
      return cn(
        baseClass,
        "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]",
        "bg-[size:10px_10px]"
      );
    }
    
    if (variant === PATTERN_BACKGROUND_VARIANT.Line) {
      return cn(
        baseClass,
        "bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]",
        "bg-[size:100px_100px]"
      );
    }
    
    if (variant === PATTERN_BACKGROUND_VARIANT.Grid) {
      return cn(
        baseClass,
        "bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]",
        "bg-[size:20px_20px]"
      );
    }
    
    return baseClass;
  };

  const getAnimationClass = () => {
    if (!animate) return "";
    
    const speedClass = speed === PATTERN_BACKGROUND_SPEED.Slow ? "animate-pattern-slow" :
                      speed === PATTERN_BACKGROUND_SPEED.Medium ? "animate-pattern-medium" :
                      "animate-pattern-fast";
    
    const directionClass = direction === PATTERN_BACKGROUND_DIRECTION.Top ? "animate-pattern-up" :
                          direction === PATTERN_BACKGROUND_DIRECTION.Bottom ? "animate-pattern-down" :
                          direction === PATTERN_BACKGROUND_DIRECTION.Left ? "animate-pattern-left" :
                          "animate-pattern-right";
    
    return cn(speedClass, directionClass);
  };

  const getMaskClass = () => {
    if (mask === PATTERN_BACKGROUND_MASK.None) return "";
    
    if (mask === PATTERN_BACKGROUND_MASK.EllipseTop) {
      return "mask-[radial-gradient(ellipse_at_top,black_50%,transparent_100%)]";
    }
    
    if (mask === PATTERN_BACKGROUND_MASK.EllipseBottom) {
      return "mask-[radial-gradient(ellipse_at_bottom,black_50%,transparent_100%)]";
    }
    
    if (mask === PATTERN_BACKGROUND_MASK.EllipseLeft) {
      return "mask-[radial-gradient(ellipse_at_left,black_50%,transparent_100%)]";
    }
    
    if (mask === PATTERN_BACKGROUND_MASK.EllipseRight) {
      return "mask-[radial-gradient(ellipse_at_right,black_50%,transparent_100%)]";
    }
    
    return "";
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className={cn(getPatternClass(), getAnimationClass(), getMaskClass())} />
      {children}
    </div>
  );
};
