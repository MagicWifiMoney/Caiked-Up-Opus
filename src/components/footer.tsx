"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Instagram, Music2, Mail, Heart, ExternalLink } from "lucide-react";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#media", label: "Media" },
  { href: "#testimonials", label: "Testimonials" },
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
    href: "https://soundcloud.com/caikedup",
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

export function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden bg-[#0a0a0f] border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-[#00f0ff]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">
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
          <p className="text-white/30 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#ff00ff] animate-pulse" /> in Minneapolis
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
