"use client";

/**
 * DecryptedText — React Bits Cryptographic Text Reveal
 * Smooth, deliberate sequential glyph resolution without chaotic flickering.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./DecryptedText.module.css";

const CHARS = "ABCDEF0123456789_#*/<>[]-=";

export interface DecryptedTextProps {
  text: string;
  speed?: number; // ms per step
  charactersPerStep?: number;
  animateOn?: "view" | "hover";
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
}

export function DecryptedText({
  text,
  speed = 65,
  charactersPerStep = 1,
  animateOn = "hover",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const startScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const length = text.length;
    let step = 0;
    const totalSteps = length + 4; // allow smooth tail-end resolution

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        let result = "";
        for (let i = 0; i < length; i++) {
          const originalChar = text[i];
          if (originalChar === " " || originalChar === "\n" || originalChar === "·") {
            result += originalChar;
            continue;
          }

          if (i < step) {
            // Already resolved character
            result += originalChar;
          } else if (i <= step + charactersPerStep) {
            // Active resolving window — show random glyph
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            // Future characters stay unchanged until reached
            result += originalChar;
          }
        }
        return result;
      });

      step += 1;

      if (step >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  }, [text, speed, charactersPerStep, isScrambling]);

  useEffect(() => {
    if (animateOn === "view") {
      const el = containerRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            startScramble();
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [animateOn, startScramble]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={`${styles.container} ${parentClassName}`}
      onMouseEnter={() => {
        if (animateOn === "hover") startScramble();
      }}
    >
      <span className={`${styles.text} ${className} ${isScrambling ? encryptedClassName : ""}`}>
        {displayText}
      </span>
    </span>
  );
}
