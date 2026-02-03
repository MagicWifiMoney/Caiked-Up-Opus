"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Instagram, Music2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#media", label: "Media" },
  { href: "#contact", label: "Book" },
];

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*";

// Scramble text component for mobile menu
function ScrambleMenuItem({
  label,
  href,
  index,
  isMenuOpen,
  onClose,
}: {
  label: string;
  href: string;
  index: number;
  isMenuOpen: boolean;
  onClose: () => void;
}) {
  const [displayText, setDisplayText] = useState(
    label.split("").map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join("")
  );
  const [isScrambled, setIsScrambled] = useState(true);

  const unscramble = useCallback(() => {
    let iteration = 0;
    const originalText = label;

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration) {
              return originalText[idx];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
        setIsScrambled(false);
      }

      iteration += 0.5;
    }, 40);

    return () => clearInterval(interval);
  }, [label]);

  useEffect(() => {
    if (isMenuOpen) {
      // Reset to scrambled state
      setIsScrambled(true);
      setDisplayText(
        label.split("").map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]).join("")
      );

      // Start unscrambling after a delay based on index
      const timeout = setTimeout(() => {
        unscramble();
      }, 200 + index * 150);

      return () => clearTimeout(timeout);
    }
  }, [isMenuOpen, index, label, unscramble]);

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      onClick={onClose}
      className="text-3xl font-bold text-white hover:text-gradient-neon transition-all font-mono"
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          style={{
            color: isScrambled
              ? i % 2 === 0
                ? "#00f0ff"
                : "#ff00ff"
              : "inherit",
            transition: "color 0.3s",
          }}
        >
          {char}
        </span>
      ))}
    </motion.a>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark py-3" : "py-6"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/images/Logo White@2x.PNG"
                alt="Caiked Up"
                width={140}
                height={50}
                className="h-10 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Social Links + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://www.instagram.com/caiked.up"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-[#00f0ff] transition-colors"
            >
              <Instagram size={18} />
            </motion.a>
            <motion.a
              href="https://soundcloud.com/caikin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-[#ff00ff] transition-colors"
            >
              <Music2 size={18} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-5 py-2.5 bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black font-semibold text-sm rounded-full hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-shadow"
            >
              Book Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center"
          >
            {isOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="h-full flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, i) => (
                <ScrambleMenuItem
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  index={i}
                  isMenuOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                />
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-6 mt-8"
              >
                <a
                  href="https://www.instagram.com/caiked.up"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-[#00f0ff]"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://soundcloud.com/caikin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-[#ff00ff]"
                >
                  <Music2 size={24} />
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
