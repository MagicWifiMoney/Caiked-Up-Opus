"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Media } from "@/components/media";
import { IPodVideoShowcase } from "@/components/ipod-video-showcase";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SectionTransition } from "@/components/section-transition";
import { ExperienceShowcase } from "@/components/experience-showcase";
import { HeroTransition } from "@/components/hero-transition";
import { AudioWaveTransition } from "@/components/audio-wave-transition";
import { VinylTransition } from "@/components/vinyl-transition";
import { PartyTransition } from "@/components/party-transition";

// Pre-computed particle positions to avoid hydration mismatch
const PARTICLE_DATA = [
  { ix: -120, iy: 45, ax: 80, ay: -30, dur: 2.5, del: 0.1 },
  { ix: 95, iy: -80, ax: -60, ay: 100, dur: 3.2, del: 0.4 },
  { ix: -45, iy: 120, ax: 130, ay: -45, dur: 2.8, del: 0.7 },
  { ix: 130, iy: 20, ax: -90, ay: 75, dur: 3.5, del: 1.0 },
  { ix: -80, iy: -100, ax: 45, ay: 110, dur: 2.3, del: 1.3 },
  { ix: 60, iy: 90, ax: -120, ay: -60, dur: 3.8, del: 0.2 },
  { ix: -140, iy: -30, ax: 100, ay: 40, dur: 2.6, del: 0.5 },
  { ix: 25, iy: -140, ax: -70, ay: 130, dur: 3.1, del: 0.8 },
  { ix: 110, iy: 70, ax: -40, ay: -90, dur: 2.9, del: 1.1 },
  { ix: -90, iy: 60, ax: 75, ay: -120, dur: 3.4, del: 1.4 },
  { ix: 40, iy: -60, ax: -130, ay: 50, dur: 2.4, del: 0.3 },
  { ix: -55, iy: 140, ax: 110, ay: -80, dur: 3.6, del: 0.6 },
  { ix: 145, iy: -45, ax: -55, ay: 95, dur: 2.7, del: 0.9 },
  { ix: -100, iy: -110, ax: 85, ay: 65, dur: 3.3, del: 1.2 },
  { ix: 70, iy: 115, ax: -100, ay: -35, dur: 2.2, del: 1.5 },
  { ix: -30, iy: -75, ax: 140, ay: 25, dur: 3.7, del: 0.15 },
  { ix: 85, iy: 35, ax: -80, ay: 145, dur: 2.55, del: 0.45 },
  { ix: -115, iy: 95, ax: 55, ay: -140, dur: 3.25, del: 0.75 },
  { ix: 50, iy: -130, ax: -145, ay: 70, dur: 2.85, del: 1.05 },
  { ix: -70, iy: 25, ax: 95, ay: -55, dur: 3.45, del: 1.35 },
];

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#0a0a0f] flex items-center justify-center"
    >
      <div className="relative">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-black"
            animate={{
              textShadow: [
                "0 0 20px rgba(0,240,255,0)",
                "0 0 40px rgba(0,240,255,0.5)",
                "0 0 20px rgba(0,240,255,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-gradient-neon">CAIKED</span>
            <span className="text-white"> UP</span>
          </motion.h1>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] rounded-full"
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute -inset-40 pointer-events-none">
          {PARTICLE_DATA.map((p, i) => (
            <motion.div
              key={i}
              initial={{
                x: p.ix,
                y: p.iy,
                scale: 0,
              }}
              animate={{
                x: p.ax,
                y: p.ay,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                delay: p.del,
              }}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "#00f0ff" : "#ff00ff",
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      setIsPointer(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      );
    };

    // Use RAF for smooth cursor movement
    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(${isPointer ? 1.5 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouseX - 20}px, ${mouseY - 20}px, 0) scale(${isPointer ? 1.5 : 1})`;
      }
      rafId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isPointer]);

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 rounded-full bg-[#00f0ff] pointer-events-none z-[200] hidden md:block will-change-transform"
        style={{
          boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff',
        }}
      />

      {/* Cursor Ring */}
      <div
        ref={ringRef}
        className="fixed w-10 h-10 rounded-full pointer-events-none z-[199] hidden md:block will-change-transform transition-transform duration-100"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)',
          border: '1px solid rgba(0,240,255,0.3)',
        }}
      />
    </>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen cursor-none md:cursor-none">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Navigation />
        <Hero />
        <HeroTransition />
        <About />
        <AudioWaveTransition />
        <Services />
        <SectionTransition variant="dots" />
        <ExperienceShowcase />
        <IPodVideoShowcase />
        <VinylTransition />
        <Media />
        <SectionTransition variant="diagonal" />
        <PartyTransition />
        <Contact />
        <Footer />
      </motion.div>

      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[150] opacity-[0.015]">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </main>
  );
}
