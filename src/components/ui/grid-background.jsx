import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0 bg-white dark:bg-black",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#e8e8e8_0.5px,transparent_0.5px),linear-gradient(to_bottom,#e8e8e8_0.5px,transparent_0.5px)]",
        "dark:[background-image:linear-gradient(to_right,#333333_0.5px,transparent_0.5px),linear-gradient(to_bottom,#333333_0.5px,transparent_0.5px)]"
      )} />
  );
}
