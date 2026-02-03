"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Instagram, Music2, Mail, Heart, ExternalLink } from "lucide-react";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#media", label: "Media" },
  { href: "#contact", label: "Book" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/caiked.up",
    icon: Instagram,
    label: "Instagram",
    color: "#ff00ff",
  },
  {
    href: "https://soundcloud.com/caikin",
    icon: Music2,
    label: "SoundCloud",
    color: "#00f0ff",
  },
  {
    href: "mailto:caikin.fortin@gmail.com",
    icon: Mail,
    label: "Email",
    color: "#8b00ff",
  },
];

// Melting ice cube component
function IceCube({ index, onMelt }: { index: number; onMelt: () => void }) {
  const startX = Math.random() * 80 + 10; // 10-90% of width
  const startDelay = index * 0.2;
  const meltDuration = 3 + Math.random() * 2;

  return (
    <motion.div
      initial={{ y: -50, x: `${startX}%`, opacity: 0, scale: 1 }}
      animate={{
        y: [0, 100, 200],
        opacity: [1, 1, 0],
        scale: [1, 0.8, 0.3],
      }}
      transition={{
        duration: meltDuration,
        delay: startDelay,
        ease: "easeIn",
      }}
      onAnimationComplete={onMelt}
      className="absolute top-0 pointer-events-none"
      style={{ left: 0 }}
    >
      {/* Ice cube body */}
      <div className="relative">
        <svg width="40" height="50" viewBox="0 0 40 50">
          {/* Ice cube shape */}
          <defs>
            <linearGradient id={`iceGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f7ff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#a8e6ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.8" />
            </linearGradient>
            <filter id={`iceGlow-${index}`}>
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main ice cube */}
          <path
            d="M5 10 L10 5 L30 5 L35 10 L35 35 L30 40 L10 40 L5 35 Z"
            fill={`url(#iceGrad-${index})`}
            stroke="#fff"
            strokeWidth="1"
            strokeOpacity="0.5"
            filter={`url(#iceGlow-${index})`}
          />

          {/* Highlight */}
          <path
            d="M8 12 L12 8 L18 8 L14 12 Z"
            fill="white"
            opacity="0.6"
          />

          {/* Big Red X through the ice cube */}
          <line x1="8" y1="8" x2="32" y2="38" stroke="#ff0000" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="8" x2="8" y2="38" stroke="#ff0000" strokeWidth="4" strokeLinecap="round" />

          {/* Dripping water drops */}
          <motion.ellipse
            cx="20"
            cy="45"
            rx="3"
            ry="4"
            fill="#7dd3fc"
            opacity="0.8"
            animate={{
              cy: [42, 50],
              opacity: [0.8, 0],
              ry: [4, 6],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
          <motion.ellipse
            cx="12"
            cy="38"
            rx="2"
            ry="3"
            fill="#7dd3fc"
            opacity="0.6"
            animate={{
              cy: [38, 48],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: 0.8,
            }}
          />
        </svg>

        {/* Sparkle effect */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute top-1 left-2 w-2 h-2 bg-white rounded-full"
          style={{ filter: "blur(1px)" }}
        />
      </div>
    </motion.div>
  );
}

function MeltingIceCubes({ isActive }: { isActive: boolean }) {
  const [cubes, setCubes] = useState<number[]>([]);

  const handleMelt = (id: number) => {
    setCubes((prev) => prev.filter((cubeId) => cubeId !== id));
  };

  // Add new cubes when activated
  useState(() => {
    if (isActive) {
      const newCubes = Array.from({ length: 8 }, (_, i) => Date.now() + i);
      setCubes(newCubes);
    }
  });

  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <IceCube key={`cube-${i}`} index={i} onMelt={() => {}} />
          ))}

          {/* Puddle at bottom */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-4 rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(125, 211, 252, 0.4) 0%, transparent 70%)",
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  const [showIceCubes, setShowIceCubes] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setShowIceCubes(true);
      setClickCount(0);
      setTimeout(() => setShowIceCubes(false), 5000);
    }
  };

  return (
    <footer className="relative py-16 overflow-hidden bg-[#0a0a0f] border-t border-white/5">
      {/* Melting Ice Cubes Easter Egg */}
      <MeltingIceCubes isActive={showIceCubes} />

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[#00f0ff]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Image
              src="/images/Logo White@2x.PNG"
              alt="Caiked Up"
              width={140}
              height={50}
              className="h-10 w-auto"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Unifying crowds with sound. High-energy DJ sets for festivals, clubs, weddings, and events throughout the Midwest.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ x: 5 }}
                  className="text-white/40 hover:text-[#00f0ff] transition-colors text-sm w-fit"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
                >
                  <social.icon
                    className="w-5 h-5 transition-colors"
                    style={{ color: social.color }}
                  />
                  <span className="text-sm">{social.label}</span>
                  {social.href.startsWith("http") && (
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Caiked Up. All rights reserved.
          </p>
          <p
            onClick={handleSecretClick}
            className="text-white/30 text-sm flex items-center gap-1 cursor-pointer hover:text-white/50 transition-colors select-none"
          >
            Made with <Heart className="w-4 h-4 text-[#ff00ff] animate-pulse" /> by Giebz in Minneapolis
            {showIceCubes && <span className="ml-2 text-[#7dd3fc]">🧊 Stay cool! 🧊</span>}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
