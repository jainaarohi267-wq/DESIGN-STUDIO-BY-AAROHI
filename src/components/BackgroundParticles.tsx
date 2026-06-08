import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

interface Sparkle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number; // For directional burst paths
  speed: number;
  duration: number;
}

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastSpawnTime = useRef(0);

  const [largeDiamonds] = useState([
    { id: 1, left: "8%", top: "15%", size: 140, duration: 32, color: "text-purple-500/35" },
    { id: 2, left: "80%", top: "35%", size: 240, duration: 42, color: "text-fuchsia-500/30" },
    { id: 3, left: "72%", top: "75%", size: 190, duration: 36, color: "text-fuchsia-400/30" },
    { id: 4, left: "12%", top: "62%", size: 160, duration: 28, color: "text-purple-400/25" }
  ]);

  // Generate a fixed set of background drifting sparkles on client mount
  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * 100, // percentage y
      size: Math.random() * 11 + 7, // 7px to 18px size range
      delay: Math.random() * 5,
      duration: Math.random() * 14 + 11, // 11s to 25s drift cycle
      color: i % 3 === 0 ? "text-purple-400" : i % 2 === 0 ? "text-fuchsia-400" : "text-violet-300",
    }));
    setParticles(generated);
  }, []);

  // Listen to interactive mouse events for custom cursor trail and premium click flares
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn a fine diamond trail particle if cursor moved past threshold & cooldown satisfied
      if (dist > 30 && now - lastSpawnTime.current > 60) {
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        lastSpawnTime.current = now;

        const newSparkle: Sparkle = {
          id: `trail-${now}-${Math.random()}`,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 10 + 6,
          color: Math.random() > 0.4 ? "text-purple-400" : "text-fuchsia-400",
          angle: Math.random() * 360,
          speed: Math.random() * 15 + 5,
          duration: 0.9,
        };

        setSparkles((prev) => [...prev, newSparkle].slice(-45));
      }
    };

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      const numSparkles = 8;
      const clickSparkles: Sparkle[] = [];

      // Radiate 8 beautiful 4-pointed diamonds symmetrically from clicked source coordinate
      for (let i = 0; i < numSparkles; i++) {
        const angle = (i * 360) / numSparkles + (Math.random() * 12 - 6);
        clickSparkles.push({
          id: `click-${now}-${i}-${Math.random()}`,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 14 + 10,
          color: i % 3 === 0 ? "text-white" : i % 2 === 0 ? "text-purple-400" : "text-fuchsia-400",
          angle: angle,
          speed: Math.random() * 90 + 70, // Travel length radius
          duration: 1.1,
        });
      }

      setSparkles((prev) => [...prev, ...clickSparkles].slice(-60));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#06030c]">
      {/* Deep purple radial glowing backdrop ambient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_65%)]" />

      {/* Stark architecture grid lines */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-purple-500/10" />
      <div className="absolute top-0 left-1/3 w-[1px] h-full bg-purple-500/10 animate-pulse" />
      <div className="absolute top-0 right-1/3 w-[1px] h-full bg-purple-500/10 animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Shimmer Ambient Glow Blobs with rich neon purple power */}
      <div className="absolute top-[10%] right-[-100px] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[130px]" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-[110px]" />
      <div className="absolute top-[40%] right-[20%] w-[40vh] h-[40vh] rounded-full bg-violet-600/15 blur-[140px]" />

      {/* Shimmer wave passing across the screen */}
      <motion.div
        className="absolute inset-0 -skew-y-12 bg-gradient-to-t from-transparent via-white/[0.015] to-transparent"
        animate={{
          y: ["-100%", "200%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ height: "50%" }}
      />

      {/* Grid pattern overlay (Diamond shimmer lines) */}
      <div className="absolute inset-0 opacity-[0.03] style-grid" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 100% 150%, #ffffff 24%, transparent 24%),
            radial-gradient(circle at 0% 0%, #ffffff 24%, transparent 24%)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* 2. Interactive Sparkles Layer */}
      <AnimatePresence>
        {sparkles.map((sp) => {
          const rad = (sp.angle * Math.PI) / 180;
          const targetX = Math.cos(rad) * sp.speed;
          const targetY = Math.sin(rad) * sp.speed + 20; // Subtle gravity curve element

          return (
            <motion.div
              key={sp.id}
              className={`absolute pointer-events-none ${sp.color}`}
              style={{
                left: sp.x,
                top: sp.y,
                width: sp.size,
                height: sp.size,
                filter: "drop-shadow(0 0 6px currentColor)",
              }}
              initial={{ x: 0, y: 0, scale: 0.1, opacity: 1, rotate: 0 }}
              animate={{
                x: targetX,
                y: targetY,
                scale: [0.1, 1.3, 0],
                opacity: [1, 0.8, 0],
                rotate: 270,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: sp.duration,
                ease: "easeOut",
              }}
              onAnimationComplete={() => {
                setSparkles((prev) => prev.filter((item) => item.id !== sp.id));
              }}
            >
              {/* Premium 4-pointed elegant sparkle vector */}
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* 1. Drift background passive sparkles showing elegant glowing diamonds */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute pointer-events-none z-0 ${p.color}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: "drop-shadow(0 0 8px currentColor)",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
            opacity: [0.15, 0.65, 0.15],
            scale: [0.9, 1.35, 0.9],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {/* Custom Symmetric Sparkle Diamond Vector */}
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" />
          </svg>
        </motion.div>
      ))}

      {/* 4. Large Stark Layout Wireframe Glowing Diamonds */}
      {largeDiamonds.map((d) => (
        <motion.div
          key={d.id}
          className={`absolute pointer-events-none z-0 ${d.color}`}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            filter: "drop-shadow(0 0 35px currentColor)",
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -30, 0],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{
            rotate: {
              duration: d.duration,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: d.duration / 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: d.duration / 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[1.2]">
            <polygon points="50,0 100,50 50,100 0,50" />
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <polygon points="50,20 80,50 50,80 20,50" className="opacity-40" />
            <polygon points="50,35 65,50 50,65 35,50" className="opacity-25" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
