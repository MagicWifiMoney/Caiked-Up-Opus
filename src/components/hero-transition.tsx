"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";

// Minneapolis skyline as graffiti-style SVG path
function MinneapolisSkyline() {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 0 20px #00f0ff) drop-shadow(0 0 40px #00f0ff)" }}
    >
      <defs>
        <linearGradient id="skylineGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* IDS Tower */}
      <path
        d="M100,300 L100,80 L110,75 L120,80 L120,300"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* Wells Fargo */}
      <path
        d="M140,300 L140,100 L145,95 L150,90 L155,95 L160,100 L160,300"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* Capella Tower */}
      <path
        d="M180,300 L180,60 L200,40 L220,60 L220,300"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* Foshay Tower */}
      <path
        d="M240,300 L240,70 L250,50 L260,70 L260,300 M250,50 L250,40"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* US Bank Stadium */}
      <path
        d="M300,300 L300,150 L340,100 L380,150 L380,300 M320,150 L340,120 L360,150"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* 225 South Sixth */}
      <path
        d="M420,300 L420,90 L430,85 L440,90 L440,300"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* AT&T Tower */}
      <path
        d="M470,300 L470,110 L490,100 L510,110 L510,300"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* Campbell Mithun Tower */}
      <path
        d="M540,300 L540,130 L560,120 L580,130 L580,300"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* Smaller buildings */}
      <path
        d="M610,300 L610,180 L640,180 L640,300"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      <path
        d="M660,300 L660,200 L700,200 L700,300"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="3"
        filter="url(#glow)"
      />
      {/* Stone Arch Bridge hint */}
      <path
        d="M50,280 Q150,250 250,280 Q350,250 450,280"
        fill="none"
        stroke="url(#skylineGradient)"
        strokeWidth="2"
        strokeDasharray="5,5"
        filter="url(#glow)"
        opacity="0.5"
      />
    </svg>
  );
}

// Graffiti-style MPLS text
function GraffitiMPLS() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <linearGradient id="graffitiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff00ff" />
          <stop offset="50%" stopColor="#ff1493" />
          <stop offset="100%" stopColor="#ff00ff" />
        </linearGradient>
        <filter id="graffitiGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Spray paint texture */}
        <filter id="sprayPaint">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </defs>

      {/* Drop shadow / 3D effect */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="90"
        fontWeight="900"
        fontFamily="Arial Black, sans-serif"
        fill="#000"
        opacity="0.3"
        transform="translate(4, 4)"
        style={{ letterSpacing: "-0.05em" }}
      >
        MPLS
      </text>

      {/* Main text with gradient */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="90"
        fontWeight="900"
        fontFamily="Arial Black, sans-serif"
        fill="url(#graffitiGradient)"
        filter="url(#graffitiGlow)"
        style={{ letterSpacing: "-0.05em" }}
      >
        MPLS
      </text>

      {/* Outline for graffiti effect */}
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="90"
        fontWeight="900"
        fontFamily="Arial Black, sans-serif"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.5"
        style={{ letterSpacing: "-0.05em" }}
      >
        MPLS
      </text>

      {/* Drip effects */}
      <path
        d="M95,130 Q95,160 90,180"
        fill="none"
        stroke="url(#graffitiGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#graffitiGlow)"
      />
      <path
        d="M175,135 Q178,155 175,175"
        fill="none"
        stroke="url(#graffitiGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#graffitiGlow)"
      />
      <path
        d="M310,130 Q312,165 308,190"
        fill="none"
        stroke="url(#graffitiGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#graffitiGlow)"
      />
    </svg>
  );
}

export function HeroTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animations for skyline and MPLS
  const leftX = useTransform(scrollYProgress, [0, 0.4], [-300, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], [300, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.7, 1]);

  // Center arrows
  const arrowLeftX = useTransform(scrollYProgress, [0.2, 0.6], [-150, -30]);
  const arrowRightX = useTransform(scrollYProgress, [0.2, 0.6], [150, 30]);
  const arrowOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const arrowScale = useTransform(scrollYProgress, [0.2, 0.5], [0.5, 1]);

  // Staggered chevrons
  const chevronCount = 7;

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Center glow burst */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[600px] h-[600px] bg-gradient-radial from-[#00f0ff]/20 via-[#ff00ff]/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Minneapolis Skyline - Left Side */}
      <motion.div
        style={{ x: leftX, opacity, scale }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[300px]"
      >
        <MinneapolisSkyline />
      </motion.div>

      {/* Graffiti MPLS - Right Side */}
      <motion.div
        style={{ x: rightX, opacity, scale }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[200px]"
      >
        <GraffitiMPLS />
      </motion.div>

      {/* Left side animated arrows */}
      <motion.div
        style={{ x: leftX, opacity }}
        className="absolute left-[30%] top-0 bottom-0 flex items-center"
      >
        <div className="flex items-center gap-3">
          {[...Array(chevronCount)].map((_, i) => (
            <motion.div
              key={`left-${i}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1 - i * 0.12, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="text-[#00f0ff]"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="rotate-[-90deg]"
                style={{
                  filter: `drop-shadow(0 0 ${15 - i * 2}px #00f0ff)`,
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right side animated arrows */}
      <motion.div
        style={{ x: rightX, opacity }}
        className="absolute right-[30%] top-0 bottom-0 flex items-center"
      >
        <div className="flex items-center gap-3">
          {[...Array(chevronCount)].map((_, i) => (
            <motion.div
              key={`right-${i}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1 - i * 0.12, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="text-[#ff00ff]"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="rotate-90"
                style={{
                  filter: `drop-shadow(0 0 ${15 - i * 2}px #ff00ff)`,
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Center converging big arrows */}
      <motion.div
        style={{ opacity: arrowOpacity, scale: arrowScale }}
        className="absolute inset-0 flex items-center justify-center gap-12"
      >
        {/* Left arrow pointing right */}
        <motion.div style={{ x: arrowLeftX }}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 25px #00f0ff) drop-shadow(0 0 50px #00f0ff)" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* Center pulse orb */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-8 h-8 rounded-full bg-white relative"
          style={{
            boxShadow: "0 0 30px #fff, 0 0 60px #00f0ff, 0 0 90px #ff00ff, 0 0 120px #00f0ff",
          }}
        >
          {/* Inner rings */}
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-white"
          />
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="absolute inset-0 rounded-full border border-[#00f0ff]"
          />
        </motion.div>

        {/* Right arrow pointing left */}
        <motion.div style={{ x: arrowRightX }}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff00ff"
            strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 0 25px #ff00ff) drop-shadow(0 0 50px #ff00ff)" }}
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Animated line traces */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <motion.line
          x1="0%"
          y1="50%"
          x2="50%"
          y2="50%"
          stroke="#00f0ff"
          strokeWidth="3"
          style={{
            pathLength: useTransform(scrollYProgress, [0.1, 0.5], [0, 1]),
            opacity: arrowOpacity,
            filter: "drop-shadow(0 0 10px #00f0ff)",
          }}
        />
        <motion.line
          x1="100%"
          y1="50%"
          x2="50%"
          y2="50%"
          stroke="#ff00ff"
          strokeWidth="3"
          style={{
            pathLength: useTransform(scrollYProgress, [0.1, 0.5], [0, 1]),
            opacity: arrowOpacity,
            filter: "drop-shadow(0 0 10px #ff00ff)",
          }}
        />
      </svg>

      {/* Bottom chevrons pointing down - positioned higher on mobile */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
            style={{ opacity: 1 - i * 0.25 }}
          >
            <ChevronDown
              className="w-8 h-8"
              style={{
                color: i === 0 ? "#00f0ff" : i === 1 ? "#fff" : "#ff00ff",
                filter: `drop-shadow(0 0 8px ${i === 0 ? "#00f0ff" : i === 1 ? "#fff" : "#ff00ff"})`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
