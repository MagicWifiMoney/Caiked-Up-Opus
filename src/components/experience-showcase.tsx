"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    title: "Festival Stages",
    description: "Main stage energy at Breakaway Music Festival",
    image: "/images/Breakaway2.JPG",
    color: "#00f0ff",
    stats: "10,000+ crowd",
  },
  {
    id: 2,
    title: "Club Nights",
    description: "Intimate vibes at The Armory with Seven Lions",
    image: "/images/Armory Solo.JPG",
    color: "#ff00ff",
    stats: "Sold out shows",
  },
  {
    id: 3,
    title: "Direct Support",
    description: "Opening for SIDEPIECE at The Fillmore",
    image: "/images/Sidepiece Good.JPG",
    color: "#8b00ff",
    stats: "Industry legends",
  },
  {
    id: 4,
    title: "Brewery Series",
    description: "Community vibes with Backyard Boombox",
    image: "/images/Boombox Keep.JPG",
    color: "#ff6b35",
    stats: "12+ events",
  },
];

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group cursor-pointer"
    >
      <motion.div
        animate={{
          boxShadow: isHovered
            ? `0 30px 60px -15px ${experience.color}40, 0 0 100px -30px ${experience.color}30`
            : "0 10px 40px -15px rgba(0,0,0,0.5)",
        }}
        className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-[#0a0a0f] border border-white/5"
      >
        {/* Background Image Container - Isolated */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.7s ease-out",
            }}
            priority={index < 2}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent pointer-events-none" />

        {/* Color tint on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: experience.color }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
          {/* Stats Badge */}
          <motion.div
            initial={{ opacity: 0.7, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 10 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
            style={{ backgroundColor: `${experience.color}20`, border: `1px solid ${experience.color}40` }}
          >
            <span className="text-[10px] md:text-xs font-semibold" style={{ color: experience.color }}>
              {experience.stats}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            animate={{ y: isHovered ? 0 : 10 }}
            className="text-2xl md:text-3xl font-black text-white mb-2"
          >
            {experience.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 10 }}
            className="text-sm md:text-base text-white/70"
          >
            {experience.description}
          </motion.p>
        </div>

        {/* Decorative Border on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            border: `1px solid ${experience.color}40`,
          }}
        />

        {/* Corner Accents */}
        <motion.div
          animate={{ scale: isHovered ? 1 : 0 }}
          className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 border-t-2 border-r-2 rounded-tr-xl"
          style={{ borderColor: `${experience.color}60` }}
        />
        <motion.div
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ delay: 0.1 }}
          className="absolute bottom-4 left-4 w-12 h-12 md:w-16 md:h-16 border-b-2 border-l-2 rounded-bl-xl"
          style={{ borderColor: `${experience.color}60` }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ExperienceShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        style={{ y }}
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-radial from-[#00f0ff]/10 to-transparent rounded-full blur-3xl"
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
          <span className="text-sm font-medium tracking-[0.3em] text-[#8b00ff] uppercase">
            The Experience
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mt-4 tracking-tight">
            Where I <span className="text-gradient-neon">Perform</span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-white/50 max-w-2xl mx-auto">
            From massive festival stages to intimate club nights, every set is crafted to create unforgettable moments
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
