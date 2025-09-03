'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ParticleImageSplash() {
  const canvasRef = useRef(null);
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const textParticlesRef = useRef([]);
  const animationPhase = useRef('scatter'); // 'scatter', 'forming', 'formed'
  const animationTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Create text "27 digital" and extract particle positions
    const createTextParticles = () => {
      const text = "plus27 digital";
      const fontSize = 80;
      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);
      
      // Set font
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Create temporary canvas to get text pixels
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = 600;
      tempCanvas.height = 200;
      tempCtx.font = `bold ${fontSize}px Arial, sans-serif`;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillStyle = 'white';
      tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);
      
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const particles = [];
      
      // Extract particles from text
      for (let y = 0; y < tempCanvas.height; y += 3) {
        for (let x = 0; x < tempCanvas.width; x += 3) {
          const index = (y * tempCanvas.width + x) * 4;
          const alpha = imageData.data[index + 3];
          
          if (alpha > 100) {
            particles.push({
              targetX: centerX + (x - tempCanvas.width / 2),
              targetY: centerY + (y - tempCanvas.height / 2),
              x: centerX + (Math.random() - 0.5) * 1000,
              y: centerY + (Math.random() - 0.5) * 1000,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              size: Math.random() * 2 + 1,
              color: 'white',
              life: 1
            });
          }
        }
      }
      
      return particles;
    };

    // Initialize particles
    textParticlesRef.current = createTextParticles();

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationTime.current += 0.016; // ~60fps
      
      let allParticlesInPlace = true;
      
      textParticlesRef.current.forEach(particle => {
        if (animationPhase.current === 'scatter') {
          // Scatter phase - particles move randomly
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.98;
          particle.vy *= 0.98;
          
          // Switch to forming phase after 2 seconds
          if (animationTime.current > 2) {
            animationPhase.current = 'forming';
          }
        } else if (animationPhase.current === 'forming') {
          // Forming phase - particles move towards their target positions
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 2) {
            allParticlesInPlace = false;
            particle.x += dx * 0.1;
            particle.y += dy * 0.1;
          } else {
            particle.x = particle.targetX;
            particle.y = particle.targetY;
          }
        }
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Check if all particles are in place
      if (animationPhase.current === 'forming' && allParticlesInPlace) {
        animationPhase.current = 'formed';
        // Wait 2 seconds then navigate
        setTimeout(() => {
          setIsAnimating(false);
          router.push('/home');
        }, 2000);
      }
      
      if (animationPhase.current !== 'formed') {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation
    setTimeout(() => {
      animate();
    }, 300);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      {!isAnimating && (
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500" />
      )}
    </div>
  );
}
