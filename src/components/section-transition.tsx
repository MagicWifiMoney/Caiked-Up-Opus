"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SectionTransitionProps {
  fromColor?: string;
  toColor?: string;
  variant?: "wave" | "diagonal" | "dots" | "laser";
}

// Pride rainbow colors
const prideColors = ["#E40303", "#FF8C00", "#FFED00", "#008026", "#24408E", "#732982"];

function PrideEasterEgg({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
    >
      <div className="flex flex-col gap-1">
        {prideColors.map((color, i) => (
          <motion.div
            key={color}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isVisible ? 1 : 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="h-2 md:h-3 w-32 md:w-48 rounded-full origin-left"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 15px ${color}80`,
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.4 }}
        className="absolute -bottom-8 text-xs text-white/60 font-medium"
      >
        🏳️‍🌈 Love is love 🏳️‍🌈
      </motion.div>
    </motion.div>
  );
}

export function SectionTransition({
  fromColor = "#0a0a0f",
  toColor = "#0a0a0f",
  variant = "wave",
}: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showPride, setShowPride] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Secret: click 3 times to reveal pride flag
  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setShowPride(true);
      setTimeout(() => {
        setShowPride(false);
        setClickCount(0);
      }, 4000);
    }
  };

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
        onClick={handleSecretClick}
        className="relative h-24 overflow-hidden cursor-pointer"
        style={{ background: fromColor }}
      >
        <PrideEasterEgg isVisible={showPride} />

        {/* Hint text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: clickCount > 0 ? 0.6 : 0.3 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="text-[10px] text-white/30 tracking-widest">
            tap x3 for some love
          </span>
        </motion.div>

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
                background: showPride ? prideColors[i % prideColors.length] : (i % 2 === 0 ? "#00f0ff" : "#ff00ff"),
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
