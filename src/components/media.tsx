"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ExternalLink, Music2, Volume2, X } from "lucide-react";

const mixes = [
  {
    id: 1,
    title: "SHARK GOT YOUR TONGUE?",
    subtitle: "Direct support set for JAUZ",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/caikedup/shark-got-your-tongue&color=%2300f0ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    color: "#00f0ff",
  },
  {
    id: 2,
    title: "COLD AS ICE MIXTAPE",
    subtitle: "Winter vibes collection",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/caikedup/cold-as-ice-mixtape&color=%23ff00ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    color: "#ff00ff",
  },
  {
    id: 3,
    title: "EXPRESS LANE MIXTAPE",
    subtitle: "High-energy house mix",
    embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/caikedup/express-lane-mixtape&color=%238b00ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
    color: "#8b00ff",
  },
];

const galleryImages = [
  { src: "/images/Boombox Keep.JPG", alt: "Boombox performance", span: "col-span-2 row-span-2" },
  { src: "/images/EDM EC3.JPG", alt: "EDC performance", span: "col-span-1 row-span-1" },
  { src: "/images/Cantina.JPG", alt: "Cantina show", span: "col-span-1 row-span-1" },
  { src: "/images/Halloween DA Keep.JPG", alt: "Halloween Dance Agenda", span: "col-span-1 row-span-2" },
  { src: "/images/Pre Party Breakaway.JPG", alt: "Breakaway Pre Party", span: "col-span-2 row-span-1" },
  { src: "/images/Sorry Papi Keep.JPG", alt: "Sorry Papi event", span: "col-span-1 row-span-1" },
  { src: "/images/IMG_1553.JPG", alt: "Live performance", span: "col-span-1 row-span-1" },
  { src: "/images/Keep Sidepiece.JPG", alt: "SIDEPIECE support", span: "col-span-1 row-span-1" },
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

function GalleryImage({
  image,
  index,
}: {
  image: (typeof galleryImages)[0];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef, { once: true, margin: "-50px" });

  return (
    <>
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: index * 0.08 }}
        onClick={() => setIsOpen(true)}
        className={`relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer group ${image.span}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center">
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-[#00f0ff]" />
          </div>
        </motion.div>

        {/* Border Glow on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none rounded-xl md:rounded-2xl"
          style={{
            boxShadow: "inset 0 0 30px rgba(0,240,255,0.3)",
          }}
        />
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white z-10"
              onClick={() => setIsOpen(false)}
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
                src={image.src}
                alt={image.alt}
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

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden space-y-8">
          {/* Mixes Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <Music2 className="w-5 h-5 text-[#ff00ff]" />
              <h3 className="text-xl font-bold">Featured Mixes</h3>
            </motion.div>

            <div className="space-y-3">
              {mixes.map((mix, index) => (
                <MixEmbed key={mix.id} mix={mix} index={index} />
              ))}
            </div>

            {/* SoundCloud Link */}
            <motion.a
              href="https://soundcloud.com/caikedup"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-2 p-3 glass rounded-xl text-white/60 hover:text-[#ff00ff] transition-colors text-sm"
            >
              <span>View all on SoundCloud</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Gallery Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <Volume2 className="w-5 h-5 text-[#00f0ff]" />
              <h3 className="text-xl font-bold">Live Moments</h3>
            </motion.div>

            <div className="grid grid-cols-2 auto-rows-[100px] gap-2">
              {galleryImages.map((image, index) => (
                <GalleryImage key={image.src} image={image} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Two Column */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-12">
          {/* Mixes Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <Music2 className="w-6 h-6 text-[#ff00ff]" />
              <h3 className="text-2xl font-bold">Featured Mixes</h3>
            </motion.div>

            <div className="space-y-4">
              {mixes.map((mix, index) => (
                <MixEmbed key={mix.id} mix={mix} index={index} />
              ))}
            </div>

            {/* SoundCloud Link */}
            <motion.a
              href="https://soundcloud.com/caikedup"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center gap-2 p-4 glass rounded-xl text-white/60 hover:text-[#ff00ff] transition-colors"
            >
              <span>View all on SoundCloud</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Gallery Section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <Volume2 className="w-6 h-6 text-[#00f0ff]" />
              <h3 className="text-2xl font-bold">Live Moments</h3>
            </motion.div>

            <div className="grid grid-cols-3 auto-rows-[120px] gap-3">
              {galleryImages.map((image, index) => (
                <GalleryImage key={image.src} image={image} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
