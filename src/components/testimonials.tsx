"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

// NOTE: These testimonials need to be replaced with real quotes from clients
// The current quotes are placeholders for layout purposes
const testimonials = [
  {
    id: 1,
    quote: "Eau Claire you are a TIME to be had. The energy was absolutely unmatched.",
    author: "Event Recap",
    role: "Stones Throw Headline",
    rating: 5,
  },
  {
    id: 2,
    quote: "The dance floor was packed from start to finish!",
    author: "Happy Couple",
    role: "Wedding Reception",
    rating: 5,
  },
  {
    id: 3,
    quote: "Professional, high-energy, and exactly what our event needed.",
    author: "Corporate Client",
    role: "Brand Activation",
    rating: 5,
  },
];

const marqueeVenues = [
  "The Armory",
  "The Fillmore",
  "Breakaway Festival",
  "The Vault",
  "Twins Stadium",
  "Allianz Field",
  "The Varsity",
  "Modist Brewery",
  "Dayblock",
  "Buck Hill",
  "Stones Throw",
];

function TestimonialCard({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
      className={`relative p-6 md:p-8 lg:p-12 glass rounded-3xl ${
        isActive ? "border-[#00f0ff]/30" : ""
      }`}
    >
      {/* Quote Icon */}
      <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#00f0ff]/30 mb-4 md:mb-6" />

      {/* Rating */}
      <div className="flex gap-1 mb-4 md:mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 md:w-5 md:h-5 fill-[#ff00ff] text-[#ff00ff]"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-white leading-relaxed mb-6 md:mb-8">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00ff] flex items-center justify-center font-bold text-sm md:text-base text-black">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-white text-sm md:text-base">{testimonial.author}</div>
          <div className="text-xs md:text-sm text-white/50">{testimonial.role}</div>
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 border-t-2 border-r-2 border-[#00f0ff]/20 rounded-tr-3xl" />
    </motion.div>
  );
}

function VenueMarquee({ direction = "left" }: { direction?: "left" | "right" }) {
  return (
    <div className="relative py-4 md:py-8 overflow-hidden">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />

      <motion.div
        animate={{ x: direction === "left" ? [0, -50 * marqueeVenues.length] : [-50 * marqueeVenues.length, 0] }}
        transition={{
          duration: direction === "left" ? 30 : 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-4 md:gap-8 whitespace-nowrap"
      >
        {[...marqueeVenues, ...marqueeVenues].map((venue, i) => (
          <span
            key={`${venue}-${i}`}
            className="text-2xl md:text-4xl lg:text-6xl font-black text-white/5 hover:text-white/20 transition-colors cursor-default"
          >
            {venue}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Auto-advance testimonials
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextTestimonial = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-[#ff00ff]/10 to-transparent rounded-full blur-3xl"
      />

      {/* Venue Marquee */}
      <VenueMarquee direction="left" />

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-sm font-medium tracking-[0.3em] text-[#ff00ff] uppercase">
            The Experience
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mt-4 tracking-tight">
            What People <span className="text-gradient-neon">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={testimonials[currentIndex].id}
              testimonial={testimonials[currentIndex]}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-[#00f0ff] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentIndex(i);
                  }}
                  animate={{
                    width: i === currentIndex ? 32 : 8,
                    backgroundColor: i === currentIndex ? "#00f0ff" : "rgba(255,255,255,0.2)",
                  }}
                  className="h-2 rounded-full transition-all"
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-[#00f0ff] transition-colors"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Second Marquee (reversed) */}
      <div className="mt-10 md:mt-16">
        <VenueMarquee direction="right" />
      </div>
    </section>
  );
}
