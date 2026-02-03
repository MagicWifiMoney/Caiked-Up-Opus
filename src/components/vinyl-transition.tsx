"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function VinylTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <div
      ref={containerRef}
      className="relative h-[250px] overflow-hidden bg-[#0a0a0f]"
    >
      {/* Center vinyl record */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          style={{ rotate }}
          className="relative w-48 h-48"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-4 border-[#222]" />

          {/* Grooves */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#333]"
              style={{
                inset: `${10 + i * 8}%`,
              }}
            />
          ))}

          {/* Label */}
          <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00ff] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#0a0a0f]" />
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
        </motion.div>

        {/* Tonearm */}
        <motion.div
          style={{
            rotate: useTransform(scrollYProgress, [0, 0.5], [-30, 0]),
          }}
          className="absolute w-32 h-2 bg-gradient-to-r from-[#333] to-[#666] rounded-full origin-right"
          initial={{ right: "calc(50% + 60px)", top: "calc(50% - 40px)" }}
        >
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#00f0ff]" style={{ boxShadow: "0 0 10px #00f0ff" }} />
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
        {/* Left decor */}
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute left-[10%] top-1/2 -translate-y-1/2 text-6xl opacity-20"
          style={{ color: "#00f0ff" }}
        >
          ◀◀
        </motion.div>

        {/* Right decor */}
        <motion.div
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-[10%] top-1/2 -translate-y-1/2 text-6xl opacity-20"
          style={{ color: "#ff00ff" }}
        >
          ▶▶
        </motion.div>
      </motion.div>
    </div>
  );
}
