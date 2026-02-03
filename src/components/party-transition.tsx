"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Pre-computed confetti pieces for deterministic rendering
const CONFETTI = [
  { x: 10, delay: 0, color: "#00f0ff", size: 12, rotation: 45 },
  { x: 20, delay: 0.1, color: "#ff00ff", size: 8, rotation: -30 },
  { x: 30, delay: 0.2, color: "#8b00ff", size: 10, rotation: 60 },
  { x: 40, delay: 0.05, color: "#00f0ff", size: 14, rotation: -45 },
  { x: 50, delay: 0.15, color: "#ff00ff", size: 9, rotation: 30 },
  { x: 60, delay: 0.25, color: "#fff", size: 11, rotation: -60 },
  { x: 70, delay: 0.08, color: "#00f0ff", size: 13, rotation: 15 },
  { x: 80, delay: 0.18, color: "#ff00ff", size: 7, rotation: -15 },
  { x: 90, delay: 0.12, color: "#8b00ff", size: 10, rotation: 75 },
  { x: 15, delay: 0.22, color: "#fff", size: 8, rotation: -75 },
  { x: 25, delay: 0.03, color: "#00f0ff", size: 12, rotation: 90 },
  { x: 35, delay: 0.13, color: "#ff00ff", size: 9, rotation: -90 },
  { x: 45, delay: 0.23, color: "#8b00ff", size: 11, rotation: 20 },
  { x: 55, delay: 0.07, color: "#00f0ff", size: 10, rotation: -20 },
  { x: 65, delay: 0.17, color: "#fff", size: 14, rotation: 50 },
  { x: 75, delay: 0.27, color: "#ff00ff", size: 8, rotation: -50 },
  { x: 85, delay: 0.02, color: "#8b00ff", size: 13, rotation: 10 },
  { x: 95, delay: 0.2, color: "#00f0ff", size: 9, rotation: -10 },
];

export function PartyTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  return (
    <div
      ref={containerRef}
      className="relative h-[200px] overflow-hidden bg-[#0a0a0f]"
    >
      {/* Center burst glow */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-64 h-64 bg-gradient-radial from-[#ff00ff]/30 via-[#00f0ff]/20 to-transparent rounded-full blur-3xl"
        />
      </motion.div>

      {/* Confetti pieces */}
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
        {CONFETTI.map((piece, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -150, 0],
              rotate: [piece.rotation, piece.rotation + 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: piece.delay,
              ease: "easeOut",
            }}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              bottom: "20%",
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "2px" : "0",
              boxShadow: `0 0 10px ${piece.color}`,
            }}
          />
        ))}
      </motion.div>

      {/* Burst lines from center */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            className="absolute w-32 h-0.5 origin-left"
            style={{
              background: `linear-gradient(90deg, ${i % 2 === 0 ? "#00f0ff" : "#ff00ff"}, transparent)`,
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Party text */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-2, 2, -2],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#00f0ff]"
          style={{
            textShadow: "0 0 30px rgba(0,240,255,0.5), 0 0 60px rgba(255,0,255,0.3)",
          }}
        >
          LET&apos;S GO
        </motion.div>
      </motion.div>

      {/* Sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="absolute w-2 h-2"
          style={{
            left: `${10 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
        >
          <div className="w-full h-0.5 bg-white absolute top-1/2 -translate-y-1/2" />
          <div className="w-0.5 h-full bg-white absolute left-1/2 -translate-x-1/2" />
        </motion.div>
      ))}
    </div>
  );
}
