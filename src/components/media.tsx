"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ExternalLink, Music2, Volume2, X, Play } from "lucide-react";

const mixes = [
  {
    id: 1,
    title: "SEVEN LIONS SUPPORT SET",
    subtitle: "The Armory Minneapolis",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/caikin/caiked-up-x-armory-x-seven-lions&color=%2300f0ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    color: "#00f0ff",
  },
  {
    id: 2,
    title: "JAWNS CLOSING SET",
    subtitle: "Backyard Boombox x Modist",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/caikin/jawns-closing-set-modist-brewery&color=%23ff00ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    color: "#ff00ff",
  },
  {
    id: 3,
    title: "EXPRESS LANE MIXTAPE",
    subtitle: "High-energy house mix",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/caikin/fargo-fnked-up-productions&color=%238b00ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    color: "#8b00ff",
  },
];

const galleryImages = [
  { src: "/images/Boombox Keep.JPG", alt: "Boombox performance", title: "Backyard Boombox" },
  { src: "/images/EDM EC3.JPG", alt: "EDC performance", title: "Festival Energy" },
  { src: "/images/Cantina.JPG", alt: "Cantina show", title: "Cantina Nights" },
  { src: "/images/Halloween DA Keep.JPG", alt: "Halloween Dance Agenda", title: "Halloween Set" },
  { src: "/images/Pre Party Breakaway.JPG", alt: "Breakaway Pre Party", title: "Breakaway Pre-Party" },
  { src: "/images/Sorry Papi Keep.JPG", alt: "Sorry Papi event", title: "Sorry Papi" },
];

function MixEmbed({ mix, index }: { mix: (typeof mixes)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl p-3 md:p-4 space-y-3"
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${mix.color}20` }}
        >
          <Music2 className="w-5 h-5" style={{ color: mix.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-white text-sm md:text-base truncate">{mix.title}</h4>
          <p className="text-white/50 text-xs truncate">{mix.subtitle}</p>
        </div>
      </div>

      {/* SoundCloud Embed */}
      <div className="rounded-xl overflow-hidden bg-black/30">
        <iframe
          width="100%"
          height="120"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={mix.embedUrl}
          className="w-full"
        />
      </div>
    </motion.div>
  );
}

function AccordionGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: true, margin: "-50px" });

  return (
    <>
      <motion.div
        ref={galleryRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex h-[400px] md:h-[500px] gap-2 md:gap-3"
      >
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setLightboxImage(image.src)}
            className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group"
            style={{
              flex: activeIndex === index ? 4 : activeIndex === null ? 1 : 0.5,
              transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Neon border glow on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
              style={{
                boxShadow: `inset 0 0 30px ${index % 2 === 0 ? 'rgba(0,240,255,0.4)' : 'rgba(255,0,255,0.4)'}`,
                border: `2px solid ${index % 2 === 0 ? 'rgba(0,240,255,0.5)' : 'rgba(255,0,255,0.5)'}`,
              }}
            />

            {/* Title at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                y: activeIndex === index ? 0 : 20
              }}
              className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
            >
              <h4 className="text-lg md:text-xl font-bold text-white">{image.title}</h4>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: index % 2 === 0 ? 'rgba(0,240,255,0.3)' : 'rgba(255,0,255,0.3)',
                    border: `1px solid ${index % 2 === 0 ? '#00f0ff' : '#ff00ff'}`
                  }}
                >
                  <Play className="w-4 h-4" style={{ color: index % 2 === 0 ? '#00f0ff' : '#ff00ff' }} />
                </div>
                <span className="text-xs text-white/60">Click to expand</span>
              </div>
            </motion.div>

            {/* Number indicator */}
            <motion.div
              animate={{
                opacity: activeIndex === index || activeIndex === null ? 0.8 : 0.3,
              }}
              className="absolute top-4 left-4 text-4xl md:text-6xl font-black text-white/20"
              style={{
                textShadow: activeIndex === index
                  ? `0 0 20px ${index % 2 === 0 ? '#00f0ff' : '#ff00ff'}`
                  : 'none'
              }}
            >
              0{index + 1}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white z-10"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-5 h-5" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-[80vh] aspect-video"
            >
              <Image
                src={lightboxImage}
                alt="Expanded view"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Media() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      id="media"
      className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        style={{ y }}
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-radial from-[#00f0ff]/10 to-transparent rounded-full blur-3xl"
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
            Hear the Vibe
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mt-4 tracking-tight">
            <span className="text-gradient-neon">Media</span> & Mixes
          </h2>
        </motion.div>

        {/* Gallery Section - Accordion Slider */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-[#00f0ff]" />
            <h3 className="text-xl md:text-2xl font-bold">Live Moments</h3>
          </motion.div>

          <AccordionGallery />
        </div>

        {/* Mixes Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Music2 className="w-5 h-5 md:w-6 md:h-6 text-[#ff00ff]" />
            <h3 className="text-xl md:text-2xl font-bold">Featured Mixes</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {mixes.map((mix, index) => (
              <MixEmbed key={mix.id} mix={mix} index={index} />
            ))}
          </div>

          {/* SoundCloud Link */}
          <motion.a
            href="https://soundcloud.com/caikin"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-2 p-4 glass rounded-xl text-white/60 hover:text-[#ff00ff] transition-colors max-w-md mx-auto"
          >
            <span>View all on SoundCloud</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
