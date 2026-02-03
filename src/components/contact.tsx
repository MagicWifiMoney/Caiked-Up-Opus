"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Instagram,
  Music2,
  Send,
  Sparkles,
  Calendar,
  MapPin,
  User,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const eventTypes = [
  "Wedding",
  "Festival/Club",
  "Corporate Event",
  "Private Party",
  "Other",
];

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("eventType", selectedEventType);

    try {
      const response = await fetch("https://formspree.io/f/xwpkgjbp", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        style={{ y }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#00f0ff]/10 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute top-20 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#ff00ff]/10 to-transparent rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-[0.3em] text-[#00f0ff] uppercase">
            Let&apos;s Connect
          </span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 tracking-tight">
            Book <span className="text-gradient-neon">Caiked Up</span>
          </h2>
          <p className="mt-6 text-lg text-white/50 max-w-xl mx-auto">
            Ready to bring unforgettable energy to your event? Let&apos;s make it happen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
              <p className="text-white/60">
                Available for festivals, club shows, weddings, corporate events, and private parties throughout the Midwest.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-4">
              <motion.a
                href="mailto:caikin.fortin@gmail.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-[#00f0ff]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <div>
                  <div className="text-sm text-white/40">Email</div>
                  <div className="text-white group-hover:text-[#00f0ff] transition-colors">
                    caikin.fortin@gmail.com
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/caiked.up"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-[#ff00ff]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ff00ff]/10 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[#ff00ff]" />
                </div>
                <div>
                  <div className="text-sm text-white/40">Instagram</div>
                  <div className="text-white group-hover:text-[#ff00ff] transition-colors">
                    @caiked.up
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://soundcloud.com/caikedup"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 p-4 glass rounded-xl hover:border-[#8b00ff]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8b00ff]/10 flex items-center justify-center">
                  <Music2 className="w-5 h-5 text-[#8b00ff]" />
                </div>
                <div>
                  <div className="text-sm text-white/40">SoundCloud</div>
                  <div className="text-white group-hover:text-[#8b00ff] transition-colors">
                    Caiked Up
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-white/40">
              <MapPin className="w-5 h-5" />
              <span>Minneapolis, MN / Midwest</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center glass rounded-3xl p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00ff] flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Message Sent!
                </h3>
                <p className="text-white/60 max-w-sm">
                  Thanks for reaching out! I&apos;ll get back to you within 24-48 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-6 py-3 glass rounded-full text-white/70 hover:text-white transition-colors"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/70 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00f0ff] focus:ring-[#00f0ff]/20"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/70 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00f0ff] focus:ring-[#00f0ff]/20"
                    />
                  </div>
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <Label className="text-white/70 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Event Type
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        onClick={() => setSelectedEventType(type)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedEventType === type
                            ? "bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] text-black font-semibold"
                            : "glass text-white/70 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-white/70 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Event Date
                    </Label>
                    <Input
                      id="date"
                      name="eventDate"
                      type="date"
                      className="bg-white/5 border-white/10 text-white focus:border-[#00f0ff] focus:ring-[#00f0ff]/20"
                    />
                  </div>

                  {/* Venue */}
                  <div className="space-y-2">
                    <Label htmlFor="venue" className="text-white/70 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Venue / Location
                    </Label>
                    <Input
                      id="venue"
                      name="venue"
                      placeholder="Venue name or city"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00f0ff] focus:ring-[#00f0ff]/20"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/70 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Tell me about your event
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share details about your event, vibe you're going for, expected attendance, etc."
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00f0ff] focus:ring-[#00f0ff]/20 resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#00f0ff] to-[#ff00ff] rounded-xl font-bold text-black flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] transition-shadow disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Inquiry
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-white/30">
                  I typically respond within 24-48 hours
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
