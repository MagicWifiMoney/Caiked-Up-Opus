"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Pre-computed bar heights for deterministic animation
const BAR_PATTERNS = [
  [0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6, 0.3],
  [0.5, 0.4, 0.8, 0.6, 0.9, 0.3, 0.7, 0.5],
  [0.7, 0.9, 0.4, 0.7, 0.5, 0.8, 0.4, 0.9],
  [0.4, 0.6, 0.9, 0.3, 0.7, 0.5, 0.9, 0.6],
];

export function AudioWaveTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  // Responsive bar count - fewer on mobile
  const barCountDesktop = 32;
  const barCountMobile = 16;

  return (
    <div
      ref={containerRef}
      className="relative h-[200px] md:h-[300px] overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background glow */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-full h-24 md:h-32 bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Boombox frame */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Frame top */}
          <div className="absolute -top-2 md:-top-4 left-1/2 -translate-x-1/2 w-3/4 h-1 md:h-2 bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent rounded-full" />

          {/* Main equalizer container */}
          <div className="relative glass rounded-2xl md:rounded-3xl p-4 md:p-8 border border-[#00f0ff]/20">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#00f0ff]/5 to-transparent pointer-events-none" />

            {/* Speaker grills - left (hidden on mobile) */}
            <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-[#00f0ff]/20 items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#00f0ff]/30">
                <div className="w-full h-full rounded-full bg-gradient-radial from-[#00f0ff]/20 to-transparent" />
              </div>
            </div>

            {/* Speaker grills - right (hidden on mobile) */}
            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-[#ff00ff]/20 items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#ff00ff]/30">
                <div className="w-full h-full rounded-full bg-gradient-radial from-[#ff00ff]/20 to-transparent" />
              </div>
            </div>

            {/* Mobile speaker indicators */}
            <div className="flex md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-[#00f0ff]/30 items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#00f0ff]/20" />
            </div>
            <div className="flex md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-[#ff00ff]/30 items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#ff00ff]/20" />
            </div>

            {/* Equalizer bars - Desktop */}
            <div className="hidden md:flex items-end justify-center gap-1 h-32 px-20">
              {[...Array(barCountDesktop)].map((_, i) => {
                const patternIndex = i % BAR_PATTERNS.length;
                const heightIndex = i % BAR_PATTERNS[patternIndex].length;
                const baseHeight = BAR_PATTERNS[patternIndex][heightIndex];

                const progress = i / (barCountDesktop - 1);
                const color =
                  progress < 0.33
                    ? "#00f0ff"
                    : progress < 0.66
                    ? "#8b00ff"
                    : "#ff00ff";

                return (
                  <motion.div
                    key={i}
                    animate={{
                      height: [
                        `${baseHeight * 100}%`,
                        `${baseHeight * 40}%`,
                        `${baseHeight * 80}%`,
                        `${baseHeight * 50}%`,
                        `${baseHeight * 100}%`,
                      ],
                    }}
                    transition={{
                      duration: 0.8 + (i % 5) * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (i % 8) * 0.05,
                    }}
                    className="w-2 rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                      minHeight: "8px",
                    }}
                  />
                );
              })}
            </div>

            {/* Equalizer bars - Mobile */}
            <div className="flex md:hidden items-end justify-center gap-[3px] h-20 px-8">
              {[...Array(barCountMobile)].map((_, i) => {
                const patternIndex = i % BAR_PATTERNS.length;
                const heightIndex = i % BAR_PATTERNS[patternIndex].length;
                const baseHeight = BAR_PATTERNS[patternIndex][heightIndex];

                const progress = i / (barCountMobile - 1);
                const color =
                  progress < 0.33
                    ? "#00f0ff"
                    : progress < 0.66
                    ? "#8b00ff"
                    : "#ff00ff";

                return (
                  <motion.div
                    key={i}
                    animate={{
                      height: [
                        `${baseHeight * 100}%`,
                        `${baseHeight * 40}%`,
                        `${baseHeight * 80}%`,
                        `${baseHeight * 50}%`,
                        `${baseHeight * 100}%`,
                      ],
                    }}
                    transition={{
                      duration: 0.8 + (i % 5) * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (i % 8) * 0.05,
                    }}
                    className="w-[6px] rounded-full"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}`,
                      minHeight: "6px",
                    }}
                  />
                );
              })}
            </div>

            {/* Reflection line */}
            <div className="absolute bottom-0 left-8 right-8 md:left-20 md:right-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Frame bottom */}
          <div className="absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-1 md:h-2 bg-gradient-to-r from-transparent via-[#ff00ff]/30 to-transparent rounded-full" />

          {/* Decorative screws - hidden on mobile */}
          <div className="hidden md:flex absolute top-2 left-[15%] w-3 h-3 rounded-full border border-[#00f0ff]/30 items-center justify-center">
            <div className="w-1.5 h-0.5 bg-[#00f0ff]/50 rounded-full" />
          </div>
          <div className="hidden md:flex absolute top-2 right-[15%] w-3 h-3 rounded-full border border-[#ff00ff]/30 items-center justify-center">
            <div className="w-1.5 h-0.5 bg-[#ff00ff]/50 rounded-full" />
          </div>
          <div className="hidden md:flex absolute bottom-2 left-[15%] w-3 h-3 rounded-full border border-[#00f0ff]/30 items-center justify-center">
            <div className="w-1.5 h-0.5 bg-[#00f0ff]/50 rounded-full rotate-90" />
          </div>
          <div className="hidden md:flex absolute bottom-2 right-[15%] w-3 h-3 rounded-full border border-[#ff00ff]/30 items-center justify-center">
            <div className="w-1.5 h-0.5 bg-[#ff00ff]/50 rounded-full rotate-90" />
          </div>
        </div>
      </motion.div>

      {/* Animated sound waves - smaller on mobile */}
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 2],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[50px] md:h-[100px] border border-[#00f0ff]/30 rounded-full"
          />
        ))}
      </motion.div>

      {/* Floating music notes - fewer on mobile */}
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none overflow-hidden">
        {["♪", "♫", "♪"].map((note, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -80],
              x: [0, (i % 2 === 0 ? 1 : -1) * 20],
              opacity: [0, 1, 0],
              rotate: [0, (i % 2 === 0 ? 1 : -1) * 20],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeOut",
            }}
            className="absolute text-xl md:text-3xl"
            style={{
              left: `${20 + i * 30}%`,
              bottom: "30%",
              color: i % 2 === 0 ? "#00f0ff" : "#ff00ff",
              textShadow: `0 0 10px ${i % 2 === 0 ? "#00f0ff" : "#ff00ff"}`,
            }}
          >
            {note}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
