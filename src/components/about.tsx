"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import { Sparkles, Users, Music, Heart } from "lucide-react";

const stats = [
  { icon: Music, value: "50+", label: "Events", color: "#00f0ff" },
  { icon: Users, value: "10K+", label: "People Moved", color: "#ff00ff" },
  { icon: Sparkles, value: "7+", label: "Years DJing", color: "#8b00ff" },
  { icon: Heart, value: "100%", label: "Vibes Only", color: "#ff6b35" },
];

const artistSupports = [
  "Seven Lions",
  "John Summit",
  "SIDEPIECE",
  "JAUZ",
  "J. Worra",
  "Dr. Fresch",
  "Aluna",
  "JAWNS",
  "Know Good",
  "Just A Gent",
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });
  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <motion.div
        style={{ y: imageY }}
        className="absolute -top-40 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#00f0ff]/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-gradient-radial from-[#ff00ff]/10 to-transparent rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-[0.3em] text-[#00f0ff] uppercase">
            The Artist
          </span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 tracking-tight">
            Meet <span className="text-gradient-neon">Caikin</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={isImageInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/Twins.JPG"
                  alt="Caikin - Caiked Up"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              </div>

              {/* Floating Accent Images */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isImageInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute -right-8 top-20 w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-float"
              >
                <Image
                  src="/images/Armory Solo.JPG"
                  alt="The Armory"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isImageInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -left-8 bottom-32 w-40 h-40 rounded-2xl overflow-hidden border-2 border-[#ff00ff]/30 shadow-[0_0_30px_rgba(255,0,255,0.3)] animate-float-delayed"
              >
                <Image
                  src="/images/Breakaway2.JPG"
                  alt="Breakaway Festival"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#00f0ff]/20 rounded-2xl" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-[#ff00ff]/20 rounded-xl" />
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            ref={textRef}
            style={{ y: textY }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                <span className="text-[#00f0ff] font-semibold">Caiked Up</span> is a dynamic DJ
                known for blending various house and bass trap flavors into high-energy sets
                that cater to diverse musical desires.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                Beyond the beats, Caiked Up strives to promote{" "}
                <span className="text-[#ff00ff]">unity and inclusivity</span> through sound.
                Her mission as a DJ is to take listeners on an emotional journey, creating
                moments of connection and expression that resonate long after the music fades.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isTextInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-4 text-center group cursor-default"
                >
                  <stat.icon
                    className="w-6 h-6 mx-auto mb-2 transition-transform group-hover:scale-110"
                    style={{ color: stat.color }}
                  />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Artist Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-medium tracking-[0.2em] text-white/40 uppercase">
                Shared the Stage With
              </h3>
              <div className="flex flex-wrap gap-2">
                {artistSupports.map((artist, i) => (
                  <motion.span
                    key={artist}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTextInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                    className="px-4 py-2 glass rounded-full text-sm text-white/70 hover:text-white hover:border-[#00f0ff]/30 transition-all cursor-default"
                  >
                    {artist}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
