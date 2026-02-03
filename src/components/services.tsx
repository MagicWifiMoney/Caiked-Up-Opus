"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Image from "next/image";
import { Music2, PartyPopper, Heart, Dumbbell, Building2, Mic2 } from "lucide-react";

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
  },
  {
    id: "weddings",
    title: "Wedding DJ Services",
    description:
      "Your special day deserves the perfect soundtrack. Expertly blending ceremony elegance with reception energy to create moments you'll remember forever.",
    icon: Heart,
    image: "/images/Know Good.JPG",
    color: "#ff00ff",
    venues: ["Custom song selection", "MC services", "Sound equipment", "Lighting options"],
  },
  {
    id: "corporate",
    title: "Corporate & Brand Events",
    description:
      "Professional entertainment for corporate gatherings, brand activations, and private events. Elevating your event with sophisticated sound curation.",
    icon: Building2,
    image: "/images/EDM EC Good.JPG",
    color: "#8b00ff",
    venues: ["Lifetime Fitness", "Twins Stadium", "Allianz Field", "Brand activations"],
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
        className="relative h-full glass rounded-3xl overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />

          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
            className="absolute top-4 right-4 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${service.color}20` }}
          >
            <service.icon className="w-6 h-6" style={{ color: service.color }} />
          </motion.div>

          {/* Hover Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${service.color}20 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-gradient-neon transition-all duration-300">
            {service.title}
          </h3>
          <p className="text-white/60 leading-relaxed">{service.description}</p>

          {/* Venues/Features */}
          <div className="flex flex-wrap gap-2 pt-2">
            {service.venues.map((venue) => (
              <span
                key={venue}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/50 border border-white/10"
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

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-32 overflow-hidden bg-[#0a0a0f]"
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

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium tracking-[0.3em] text-[#ff00ff] uppercase">
            What I Do
          </span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 tracking-tight">
            <span className="text-gradient-neon">Services</span>
          </h2>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
            From festival stages to intimate celebrations, bringing the perfect energy to every moment
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
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
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] rounded-full font-bold text-black hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-shadow"
          >
            Get a Custom Quote
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
