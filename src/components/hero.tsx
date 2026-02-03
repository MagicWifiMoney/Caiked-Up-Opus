"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import { ChevronDown, Play, Headphones } from "lucide-react";

function FloatingOrb({
  className,
  delay = 0,
  color = "cyan"
}: {
  className?: string;
  delay?: number;
  color?: "cyan" | "magenta" | "purple";
}) {
  const colorMap = {
    cyan: "from-[#00f0ff]/30 to-[#00f0ff]/5",
    magenta: "from-[#ff00ff]/30 to-[#ff00ff]/5",
    purple: "from-[#8b00ff]/30 to-[#8b00ff]/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
      className={`absolute rounded-full bg-gradient-radial ${colorMap[color]} blur-3xl animate-float ${className}`}
    />
  );
}

function LaserBeam({ angle, delay }: { angle: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: [0, 0.6, 0.3], scaleX: 1 }}
      transition={{ delay, duration: 2, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 h-[2px] w-[150vw] origin-left"
      style={{
        transform: `rotate(${angle}deg)`,
        background: `linear-gradient(90deg, transparent, ${angle % 2 === 0 ? '#00f0ff' : '#ff00ff'} 20%, transparent 80%)`,
      }}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [0, 300]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
  const textY = useTransform(smoothProgress, [0, 0.5], [0, -100]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating Orbs */}
      <FloatingOrb className="w-96 h-96 -top-20 -left-20" color="cyan" delay={0.2} />
      <FloatingOrb className="w-[500px] h-[500px] top-1/3 -right-40" color="magenta" delay={0.4} />
      <FloatingOrb className="w-72 h-72 bottom-20 left-1/4" color="purple" delay={0.6} />

      {/* Laser Beams */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <LaserBeam angle={15} delay={1} />
        <LaserBeam angle={-10} delay={1.2} />
        <LaserBeam angle={25} delay={1.4} />
        <LaserBeam angle={-20} delay={1.6} />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
      >
        {/* Floating Image */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          className="relative mb-8 animate-float"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Glow Ring */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px rgba(0,240,255,0.3)",
                  "0 0 80px rgba(255,0,255,0.4)",
                  "0 0 60px rgba(0,240,255,0.3)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10">
              <Image
                src="/images/Headshot.JPG"
                alt="Caiked Up"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          style={{ y: textY }}
          className="text-center space-y-6 max-w-4xl"
        >
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center gap-3"
          >
            <Headphones className="w-5 h-5 text-[#00f0ff]" />
            <span className="text-sm md:text-base font-medium tracking-[0.3em] text-white/60 uppercase">
              Minneapolis / Midwest
            </span>
            <Headphones className="w-5 h-5 text-[#ff00ff]" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
          >
            <span className="text-gradient-neon">CAIKED</span>
            <span className="text-white"> UP</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-white/60 font-light tracking-wide"
          >
            DJ. Creator. <span className="text-[#00f0ff]">Vibe.</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-sm md:text-base text-white/40 max-w-xl mx-auto"
          >
            Unifying crowds with sound — festivals, clubs, weddings & live events
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] rounded-full font-bold text-black overflow-hidden"
            >
              <span className="relative z-10">Book Your Event</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            <motion.a
              href="#media"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-8 py-4 glass rounded-full font-medium text-white hover:border-[#00f0ff]/50 transition-colors"
            >
              <Play className="w-5 h-5 text-[#00f0ff] group-hover:animate-pulse" />
              Listen to Mixes
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/30 tracking-wider uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5 text-[#00f0ff]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  );
}
