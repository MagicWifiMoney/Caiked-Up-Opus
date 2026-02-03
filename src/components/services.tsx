"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import { Music2, Heart, Building2, Mic2 } from "lucide-react";

const services = [
  {
    id: "festivals",
    title: "Festival & Club Sets",
    description:
      "High-energy performances that unite massive crowds. From Breakaway Music Festival main stages to intimate club nights, delivering unforgettable experiences.",
    icon: Music2,
    image: "/images/Sidepiece Good.JPG",
    color: "#00f0ff",
    venues: ["The Armory", "The Fillmore", "Breakaway Festival", "The Vault"],
    imagePosition: "center 20%",
  },
  {
    id: "weddings",
    title: "Wedding DJ Services",
    description:
      "Your special day deserves the perfect soundtrack. Expertly blending ceremony elegance with reception energy to create moments you'll remember forever.",
    icon: Heart,
    image: "/images/J Worra.JPG",
    color: "#ff00ff",
    venues: ["Custom song selection", "MC services", "Sound equipment", "Lighting options"],
    imagePosition: "center 35%", // Lower to show her face
  },
  {
    id: "corporate",
    title: "Corporate & Brand Events",
    description:
      "Professional entertainment for corporate gatherings, brand activations, and private events. Elevating your event with sophisticated sound curation.",
    icon: Building2,
    image: "/images/Twins.JPG",
    color: "#8b00ff",
    venues: ["Lifetime Fitness", "Twins Stadium", "Allianz Field", "Brand activations"],
    imagePosition: "center 20%",
  },
  {
    id: "support",
    title: "Direct Support Acts",
    description:
      "Opening and supporting major touring artists. Setting the stage for memorable nights alongside industry legends.",
    icon: Mic2,
    image: "/images/Jauz Keep.JPG",
    color: "#ff6b35",
    venues: ["Seven Lions", "JAUZ", "SIDEPIECE", "J. Worra"],
    imagePosition: "center 20%",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4 }}
        className="relative h-full rounded-3xl overflow-hidden bg-[#0d0d15] border border-white/5"
      >
        {/* Image Container - Taller aspect ratio for vertical images */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0f]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ objectPosition: service.imagePosition }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d15] via-[#0d0d15]/30 to-transparent" />

          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
            className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: `${service.color}30`, border: `1px solid ${service.color}50` }}
          >
            <service.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: service.color }} />
          </motion.div>

          {/* Hover Color Tint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: service.color }}
          />
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gradient-neon transition-all duration-300">
            {service.title}
          </h3>
          <p className="text-sm md:text-base text-white/60 leading-relaxed">{service.description}</p>

          {/* Venues/Features */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 pt-2">
            {service.venues.map((venue) => (
              <span
                key={venue}
                className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full bg-white/5 text-white/50 border border-white/10"
              >
                {venue}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-1 origin-left"
          style={{
            background: `linear-gradient(90deg, ${service.color}, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// Comic speech bubble component
function ComicBubble({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 10
      }}
      transition={{ duration: 0.3, ease: "backOut" }}
      className="absolute -right-4 top-0 md:-right-8 md:-top-2 z-10 pointer-events-none"
    >
      <div className="relative">
        {/* Speech bubble */}
        <div
          className="bg-white text-black px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[10px] md:text-xs font-bold whitespace-nowrap"
          style={{
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
        >
          Other than bring all the vibes ✨
        </div>
        {/* Bubble tail */}
        <div
          className="absolute -bottom-2 left-4 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "10px solid white",
          }}
        />
      </div>
    </motion.div>
  );
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <motion.div
        style={{ y }}
        className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#00f0ff]/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-[#ff00ff]/10 to-transparent rounded-full blur-3xl"
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
          <div className="relative inline-block">
            <span
              className="text-sm font-medium tracking-[0.3em] text-[#ff00ff] uppercase cursor-pointer"
              onMouseEnter={() => setIsHoveringTitle(true)}
              onMouseLeave={() => setIsHoveringTitle(false)}
            >
              What I Do
            </span>
            <ComicBubble isVisible={isHoveringTitle} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mt-4 tracking-tight">
            <span className="text-gradient-neon">Services</span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-white/50 max-w-2xl mx-auto px-4">
            From festival stages to intimate celebrations, bringing the perfect energy to every moment
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] rounded-full font-bold text-sm md:text-base text-black hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-shadow"
          >
            Get a Custom Quote
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
