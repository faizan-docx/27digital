"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "motion/react";
import FallingStarsBg from "@/components/ui/falling-stars-bg";

export function HeroSection() {
  return (
    <div className="h-screen w-full px-8 bg-neutral-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
      
      {/* Falling Stars Background */}
      <div className="absolute inset-0 z-0">
        <FallingStarsBg 
          className="bg-neutral-950"
          color="#FFF"
          count={200}
        />
      </div>

      {/* Background Beams (layer above stars) */}
      <div className="absolute inset-0 z-10">
        <BackgroundBeams />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-5xl pt-16 p-4">
        <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:text-[89px] text-4xl font-extrabold text-center text-white relative z-20
                       bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-500 bg-clip-text text-transparent animate-gradient"
          >
            Digital Marketing &amp; Solutions
          </motion.h1>

          {/* Sparkle Line */}
          <div className="w-full h-5 relative mt-4">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
