"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SectionTransitionProps {
  fromColor?: string;
  toColor?: string;
  variant?: "wave" | "diagonal" | "dots" | "laser";
}

export function SectionTransition({
  fromColor = "#0a0a0f",
  toColor = "#0a0a0f",
  variant = "wave",
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  if (variant === "wave") {
    return (
      <div
        ref={containerRef}
        className="relative h-40 overflow-hidden"
        style={{ background: fromColor }}
      >
        <motion.svg
          style={{ y, opacity }}
          viewBox="0 0 1440 320"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,144C960,128,1056,128,1152,144C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === "diagonal") {
    return (
      <div
        ref={containerRef}
        className="relative h-32 overflow-hidden"
        style={{ background: fromColor }}
      >
        <motion.div
          style={{ opacity }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 -skew-y-2 origin-top-left"
            style={{
              background: `linear-gradient(90deg, #00f0ff20, #ff00ff20)`,
            }}
          />
        </motion.div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        ref={containerRef}
        className="relative h-24 overflow-hidden"
        style={{ background: fromColor }}
      >
        <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center gap-8">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? "#00f0ff" : "#ff00ff",
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  if (variant === "laser") {
    return (
      <div
        ref={containerRef}
        className="relative h-20 overflow-hidden"
        style={{ background: fromColor }}
      >
        <motion.div style={{ opacity }} className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute h-[1px] w-40"
              style={{
                top: `${20 + i * 15}%`,
                background: `linear-gradient(90deg, transparent, ${
                  i % 2 === 0 ? "#00f0ff" : "#ff00ff"
                }, transparent)`,
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return null;
}
