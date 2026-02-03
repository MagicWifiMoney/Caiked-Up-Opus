"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicVisualizer() {
  const [isActive, setIsActive] = useState(true);

  return (
    <motion.button
      onClick={() => setIsActive(!isActive)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 glass rounded-full group"
    >
      {/* Sound Bars */}
      <div className="flex items-end gap-[3px] h-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={
              isActive
                ? {
                    height: [8, 16, 12, 18, 8],
                  }
                : { height: 4 }
            }
            transition={{
              duration: 0.5,
              repeat: isActive ? Infinity : 0,
              delay: i * 0.1,
              repeatType: "reverse",
            }}
            className="w-[3px] rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? "#00f0ff" : "#ff00ff",
            }}
          />
        ))}
      </div>

      {/* Icon */}
      {isActive ? (
        <Volume2 className="w-4 h-4 text-[#00f0ff]" />
      ) : (
        <VolumeX className="w-4 h-4 text-white/50" />
      )}

      {/* Label */}
      <span className="text-xs text-white/50 group-hover:text-white transition-colors">
        {isActive ? "Vibing" : "Muted"}
      </span>

      {/* Pulse Ring */}
      {isActive && (
        <motion.div
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full border border-[#00f0ff]"
        />
      )}
    </motion.button>
  );
}
