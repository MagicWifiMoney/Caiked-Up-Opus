"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const originalText = text;

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return originalText[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (isHovering) {
      const cleanup = scramble();
      return cleanup;
    } else {
      setDisplayText(text);
    }
  }, [isHovering, scramble, text]);

  return (
    <motion.span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`cursor-pointer inline-block ${className}`}
      style={{ fontFamily: "inherit" }}
    >
      {displayText.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{
            color: isHovering
              ? i % 2 === 0
                ? "#00f0ff"
                : "#ff00ff"
              : "inherit",
          }}
          transition={{ duration: 0.1 }}
          style={{ display: "inline-block", minWidth: char === " " ? "0.25em" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
