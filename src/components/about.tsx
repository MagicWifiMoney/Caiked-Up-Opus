"use client";

import { useRef, useState } from "react";
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

// Curated photos for the About section - her best shots
const featuredPhotos = [
  { src: "/images/Headshot.JPG", alt: "Caikin portrait", featured: true },
  { src: "/images/Boombox Keep.JPG", alt: "Boombox performance" },
  { src: "/images/Armory Solo.JPG", alt: "The Armory show" },
  { src: "/images/J Worra.JPG", alt: "With J. Worra" },
  { src: "/images/Breakaway2.JPG", alt: "Breakaway Festival" },
];

function PhotoMosaic() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mosaicRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={mosaicRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative h-[500px] md:h-[600px]"
    >
      {/* Main featured photo - center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[280px] md:w-[280px] md:h-[350px] z-20"
      >
        <motion.div
          animate={{
            scale: hoveredIndex === 0 ? 1.05 : 1,
            rotate: hoveredIndex === 0 ? 0 : -2,
          }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{
            boxShadow: hoveredIndex === 0
              ? "0 0 60px rgba(0,240,255,0.5), 0 0 100px rgba(255,0,255,0.3)"
              : "0 25px 50px rgba(0,0,0,0.5)",
          }}
        >
          <Image
            src={featuredPhotos[0].src}
            alt={featuredPhotos[0].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />

          {/* Glow border effect */}
          <motion.div
            animate={{ opacity: hoveredIndex === 0 ? 1 : 0 }}
            className="absolute inset-0 rounded-3xl"
            style={{
              boxShadow: "inset 0 0 30px rgba(0,240,255,0.4)",
            }}
          />
        </motion.div>

        {/* Decorative frame corners */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#00f0ff]/50 rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#ff00ff]/50 rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#ff00ff]/50 rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#00f0ff]/50 rounded-br-lg" />
      </motion.div>

      {/* Top left photo */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: -30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="absolute left-0 top-0 md:left-4 md:top-8 w-[130px] h-[160px] md:w-[180px] md:h-[220px] z-10"
      >
        <motion.div
          animate={{
            scale: hoveredIndex === 1 ? 1.1 : 1,
            rotate: hoveredIndex === 1 ? 0 : -8,
            y: hoveredIndex === 1 ? -10 : 0,
          }}
          className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#00f0ff]/30 animate-float"
          style={{
            boxShadow: hoveredIndex === 1
              ? "0 0 40px rgba(0,240,255,0.4)"
              : "0 15px 30px rgba(0,0,0,0.4)",
          }}
        >
          <Image
            src={featuredPhotos[1].src}
            alt={featuredPhotos[1].alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Top right photo */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: -30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="absolute right-0 top-8 md:right-4 md:top-16 w-[120px] h-[150px] md:w-[160px] md:h-[200px] z-10"
      >
        <motion.div
          animate={{
            scale: hoveredIndex === 2 ? 1.1 : 1,
            rotate: hoveredIndex === 2 ? 0 : 6,
            y: hoveredIndex === 2 ? -10 : 0,
          }}
          className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#ff00ff]/30 animate-float-delayed"
          style={{
            boxShadow: hoveredIndex === 2
              ? "0 0 40px rgba(255,0,255,0.4)"
              : "0 15px 30px rgba(0,0,0,0.4)",
          }}
        >
          <Image
            src={featuredPhotos[2].src}
            alt={featuredPhotos[2].alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Bottom left photo */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="absolute left-4 bottom-8 md:left-8 md:bottom-16 w-[110px] h-[140px] md:w-[150px] md:h-[180px] z-10"
      >
        <motion.div
          animate={{
            scale: hoveredIndex === 3 ? 1.1 : 1,
            rotate: hoveredIndex === 3 ? 0 : 10,
            y: hoveredIndex === 3 ? -10 : 0,
          }}
          className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#8b00ff]/30"
          style={{
            boxShadow: hoveredIndex === 3
              ? "0 0 40px rgba(139,0,255,0.4)"
              : "0 15px 30px rgba(0,0,0,0.4)",
            animation: "float 6s ease-in-out infinite 1s",
          }}
        >
          <Image
            src={featuredPhotos[3].src}
            alt={featuredPhotos[3].alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Bottom right photo */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 30 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7 }}
        onMouseEnter={() => setHoveredIndex(4)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="absolute right-0 bottom-0 md:right-0 md:bottom-8 w-[130px] h-[160px] md:w-[170px] md:h-[210px] z-10"
      >
        <motion.div
          animate={{
            scale: hoveredIndex === 4 ? 1.1 : 1,
            rotate: hoveredIndex === 4 ? 0 : -5,
            y: hoveredIndex === 4 ? -10 : 0,
          }}
          className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[#00f0ff]/30"
          style={{
            boxShadow: hoveredIndex === 4
              ? "0 0 40px rgba(0,240,255,0.4)"
              : "0 15px 30px rgba(0,0,0,0.4)",
            animation: "float 6s ease-in-out infinite 0.5s",
          }}
        >
          <Image
            src={featuredPhotos[4].src}
            alt={featuredPhotos[4].alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Connecting lines/decorative elements */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
        <motion.line
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          x1="15%"
          y1="20%"
          x2="40%"
          y2="35%"
          stroke="#00f0ff"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <motion.line
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.9 }}
          x1="85%"
          y1="25%"
          x2="60%"
          y2="38%"
          stroke="#ff00ff"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <motion.line
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 1 }}
          x1="20%"
          y1="80%"
          x2="42%"
          y2="65%"
          stroke="#8b00ff"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <motion.line
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.1 }}
          x1="80%"
          y1="85%"
          x2="58%"
          y2="65%"
          stroke="#00f0ff"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Floating particles around photos */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[30%] left-[25%] w-2 h-2 bg-[#00f0ff] rounded-full opacity-60" style={{ boxShadow: "0 0 10px #00f0ff" }} />
        <div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 bg-[#ff00ff] rounded-full opacity-60" style={{ boxShadow: "0 0 10px #ff00ff" }} />
        <div className="absolute bottom-[35%] left-[30%] w-1 h-1 bg-[#8b00ff] rounded-full opacity-60" style={{ boxShadow: "0 0 8px #8b00ff" }} />
        <div className="absolute bottom-[25%] right-[25%] w-2 h-2 bg-[#00f0ff] rounded-full opacity-60" style={{ boxShadow: "0 0 10px #00f0ff" }} />
      </motion.div>
    </motion.div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
      className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]"
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
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-sm font-medium tracking-[0.3em] text-[#00f0ff] uppercase">
            The Artist
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mt-4 tracking-tight">
            Meet <span className="text-gradient-neon">Caikin</span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Photo Mosaic Side */}
          <PhotoMosaic />

          {/* Text Side */}
          <motion.div
            ref={textRef}
            style={{ y: textY }}
            className="space-y-6 md:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isTextInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
                <span className="text-[#00f0ff] font-semibold">Caiked Up</span> is a dynamic DJ
                known for blending various house and bass trap flavors into high-energy sets
                that cater to diverse musical desires.
              </p>
              <p className="text-base md:text-lg text-white/60 leading-relaxed">
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
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 py-6 md:py-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isTextInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-3 md:p-4 text-center group cursor-default"
                >
                  <stat.icon
                    className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 transition-transform group-hover:scale-110"
                    style={{ color: stat.color }}
                  />
                  <div className="text-xl md:text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">
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
              className="space-y-3 md:space-y-4"
            >
              <h3 className="text-xs md:text-sm font-medium tracking-[0.2em] text-white/40 uppercase">
                Shared the Stage With
              </h3>
              <div className="flex flex-wrap gap-2">
                {artistSupports.map((artist, i) => (
                  <motion.span
                    key={artist}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTextInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                    className="px-3 md:px-4 py-1.5 md:py-2 glass rounded-full text-xs md:text-sm text-white/70 hover:text-white hover:border-[#00f0ff]/30 transition-all cursor-default"
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
