"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function FallingStarsBg({ 
  color = "#FFF", 
  count = 200, 
  className 
}) {
  const starsCanvasRef = useRef(null);
  const perspectiveRef = useRef(0);
  const starsRef = useRef([]);
  const ctxRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    const hexToRgb = () => {
      let hex = color.replace(/^#/, "");

      // If the hex code is 3 characters, expand it to 6 characters
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((char) => char + char)
          .join("");
      }

      // Parse the r, g, b values from the hex string
      const bigint = parseInt(hex, 16);
      const r = (bigint >> 16) & 255; // Extract the red component
      const g = (bigint >> 8) & 255; // Extract the green component
      const b = bigint & 255; // Extract the blue component

      return { r, g, b };
    };

    // Function to draw a star with a sharp line and blurred trail
    const drawStar = (star) => {
      const canvas = starsCanvasRef.current;
      if (!canvas) return;

      const ctx = ctxRef.current;
      if (!ctx) return;

      const scale = perspectiveRef.current / (perspectiveRef.current + star.z); // 3D perspective scale
      const x2d = canvas.width / 2 + star.x * scale;
      const y2d = canvas.height / 2 + star.y * scale;
      const size = Math.max(scale * 3, 0.5); // Size based on perspective

      // Previous position for a trail effect
      const prevScale = perspectiveRef.current / (perspectiveRef.current + star.z + star.speed * 15); // Longer trail distance
      const xPrev = canvas.width / 2 + star.x * prevScale;
      const yPrev = canvas.height / 2 + star.y * prevScale;

      const rgb = hexToRgb();

      // Draw blurred trail (longer, with low opacity)
      ctx.save(); // Save current context state for restoring later
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
      ctx.lineWidth = size * 2.5; // Thicker trail for a blur effect
      ctx.shadowBlur = 35; // Add blur to the trail
      ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;
      ctx.beginPath();
      ctx.moveTo(x2d, y2d);
      ctx.lineTo(xPrev, yPrev); // Longer trail
      ctx.stroke();
      ctx.restore(); // Restore context state to remove blur from the main line

      // Draw sharp line (no blur)
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
      ctx.lineWidth = size; // The line width is the same as the star's size
      ctx.beginPath();
      ctx.moveTo(x2d, y2d);
      ctx.lineTo(xPrev, yPrev); // Sharp trail
      ctx.stroke();

      // Draw the actual star (dot)
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
      ctx.beginPath();
      ctx.arc(x2d, y2d, size / 4, 0, Math.PI * 2); // Dot with size matching the width
      ctx.fill();
    };

    // Function to animate the stars
    const animate = () => {
      const canvas = starsCanvasRef.current;
      if (!canvas) return;

      const ctx = ctxRef.current;
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for each frame

      starsRef.current.forEach((star) => {
        drawStar(star);

        // Move star towards the screen (decrease z)
        star.z -= star.speed;

        // Reset star when it reaches the viewer (z = 0)
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * 2 * canvas.width;
          star.y = (Math.random() - 0.5) * 2 * canvas.height;
        }
      });

      animationIdRef.current = requestAnimationFrame(animate); // Continue animation
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Call it initially to set correct size

    ctxRef.current = canvas.getContext("2d");
    perspectiveRef.current = canvas.width / 2;
    starsRef.current = [];

    // Initialize stars
    for (let i = 0; i < count; i++) {
      starsRef.current.push({
        x: (Math.random() - 0.5) * 2 * canvas.width,
        y: (Math.random() - 0.5) * 2 * canvas.height,
        z: Math.random() * canvas.width,
        speed: Math.random() * 5 + 2, // Speed for falling effect
      });
    }

    animate(); // Start animation

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [color, count]);

  return (
    <canvas
      ref={starsCanvasRef}
      className={cn("absolute inset-0 w-full h-full", className)}
    />
  );
}