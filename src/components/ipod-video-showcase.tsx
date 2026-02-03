"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";

// iPod Nano video content - using images as placeholders until videos are added
// To add videos: place .mp4 files in /public/videos/ and update the src paths
const ipodContent = [
  {
    id: 1,
    title: "The Armory",
    color: "#00f0ff", // Cyan
    // video: "/videos/Armory.mp4", // Uncomment when video is available
    image: "/images/Armory Solo.JPG",
    glowColor: "rgba(0, 240, 255, 0.6)",
  },
  {
    id: 2,
    title: "JAUZ Support",
    color: "#ff00ff", // Magenta
    // video: "/videos/Jauz.mp4",
    image: "/images/Jauz Keep.JPG",
    glowColor: "rgba(255, 0, 255, 0.6)",
  },
  {
    id: 3,
    title: "Festival Energy",
    color: "#8b00ff", // Purple
    // video: "/videos/EDC.mp4",
    image: "/images/Breakaway2.JPG",
    glowColor: "rgba(139, 0, 255, 0.6)",
  },
  {
    id: 4,
    title: "Live Sets",
    color: "#00ff88", // Green
    // video: "/videos/Armory2.mp4",
    image: "/images/Boombox Keep.JPG",
    glowColor: "rgba(0, 255, 136, 0.6)",
  },
];

function IPodNano({
  item,
  index,
}: {
  item: (typeof ipodContent)[0];
  index: number;
}) {
  const ipodRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ipodRef, { once: true, margin: "-100px" });

  // Stagger rotation for visual interest
  const rotations = [-8, 5, -5, 8];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      ref={ipodRef}
      initial={{ opacity: 0, y: 100, rotate: rotation * 2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: rotation } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        y: -20,
        transition: { duration: 0.4 }
      }}
      className="relative group"
      style={{ perspective: "1000px" }}
    >
      {/* iPod Nano Body */}
      <div
        className="relative w-[180px] h-[340px] md:w-[220px] md:h-[420px] rounded-[28px] md:rounded-[32px] p-[3px] overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${item.color}, ${item.color}88, #1a1a2e)`,
          boxShadow: `
            0 0 40px ${item.glowColor},
            0 25px 50px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `,
        }}
      >
        {/* Inner body */}
        <div className="relative w-full h-full rounded-[25px] md:rounded-[29px] bg-gradient-to-b from-[#1a1a2e] via-[#0d0d15] to-[#0a0a0f] overflow-hidden">

          {/* Screen bezel */}
          <div className="absolute top-4 left-3 right-3 md:top-5 md:left-4 md:right-4 h-[55%] rounded-[8px] md:rounded-[10px] bg-black overflow-hidden border border-white/10">
            {/* Screen content - Video or Image */}
            <div className="relative w-full h-full">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* Screen reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

              {/* Play indicator overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${item.color}40`,
                    border: `2px solid ${item.color}`,
                    boxShadow: `0 0 20px ${item.color}`
                  }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 ml-1" fill={item.color} viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Title overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-[10px] md:text-xs font-medium text-white/90 truncate">{item.title}</p>
              </div>
            </div>
          </div>

          {/* Click wheel */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2">
            <div
              className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full"
              style={{
                background: `radial-gradient(circle, #1a1a2e 0%, #0d0d15 100%)`,
                boxShadow: `
                  inset 0 2px 4px rgba(0,0,0,0.5),
                  inset 0 -1px 2px rgba(255,255,255,0.05),
                  0 0 20px ${item.color}20
                `
              }}
            >
              {/* Center button */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full"
                style={{
                  background: `radial-gradient(circle, #2a2a3e 0%, #1a1a2e 100%)`,
                  boxShadow: `inset 0 2px 4px rgba(0,0,0,0.3)`
                }}
              />

              {/* Click wheel labels */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] font-bold text-white/40">MENU</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] text-white/40">▶❚❚</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] md:text-[12px] text-white/40">◀◀</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] md:text-[12px] text-white/40">▶▶</span>
            </div>
          </div>

          {/* Hold switch indicator */}
          <div className="absolute top-1.5 right-4 md:top-2 md:right-5 w-6 h-1.5 md:w-8 md:h-2 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Animated glow ring */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 30px ${item.glowColor}`,
            `0 0 60px ${item.glowColor}`,
            `0 0 30px ${item.glowColor}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-[28px] md:rounded-[32px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.div>
  );
}

export function IPodVideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        style={{ y }}
        className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-gradient-radial from-[#ff00ff]/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-gradient-radial from-[#00f0ff]/10 to-transparent rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-sm font-medium tracking-[0.3em] text-[#00f0ff] uppercase">
            Live Moments
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mt-4 tracking-tight">
            <span className="text-gradient-neon">Now Playing</span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-white/50 max-w-2xl mx-auto">
            Catch the energy from live sets and performances
          </p>
        </motion.div>

        {/* iPod Grid */}
        <motion.div
          style={{ opacity }}
          className="flex flex-wrap justify-center items-end gap-4 md:gap-8 lg:gap-12"
        >
          {ipodContent.map((item, index) => (
            <IPodNano key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* Floating music notes decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["♪", "♫", "♪", "♫"].map((note, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -100],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeOut",
              }}
              className="absolute text-4xl md:text-6xl"
              style={{
                left: `${15 + i * 25}%`,
                bottom: "20%",
                color: i % 2 === 0 ? "#00f0ff" : "#ff00ff",
                textShadow: `0 0 20px ${i % 2 === 0 ? "#00f0ff" : "#ff00ff"}`,
              }}
            >
              {note}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
