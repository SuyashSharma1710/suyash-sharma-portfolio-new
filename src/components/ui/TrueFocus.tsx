"use client";

/**
 * TrueFocus.tsx — React Bits Editorial Focus Interaction
 * Keeps the hovered word/segment sharp with an animated focus bracket
 * while gently softening non-focused words.
 * Strictly adheres to RULES.md Rule 10 (Editorial aesthetic) & Rule 15.
 */
import React, { useState, useRef, useEffect } from "react";
import styles from "./TrueFocus.module.css";

interface TrueFocusProps {
  sentence: string;
  blurAmount?: number;
  animationDuration?: number;
  className?: string;
}

export function TrueFocus({
  sentence,
  blurAmount = 2.5,
  animationDuration = 0.35,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(" ");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusBox, setFocusBox] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  useEffect(() => {
    if (hoveredIndex !== null && wordRefs.current[hoveredIndex] && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const targetRect = wordRefs.current[hoveredIndex]!.getBoundingClientRect();

      setFocusBox({
        x: targetRect.left - containerRect.left - 4,
        y: targetRect.top - containerRect.top - 2,
        width: targetRect.width + 8,
        height: targetRect.height + 4,
        visible: true,
      });
    } else {
      setFocusBox((prev) => ({ ...prev, visible: false }));
    }
  }, [hoveredIndex]);

  return (
    <p
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Editorial Focus Bracket Indicator */}
      <span
        className={styles.focusBracket}
        style={{
          transform: `translate3d(${focusBox.x}px, ${focusBox.y}px, 0)`,
          width: `${focusBox.width}px`,
          height: `${focusBox.height}px`,
          opacity: focusBox.visible ? 1 : 0,
          transition: `transform ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1), width ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease`,
        }}
        aria-hidden="true"
      >
        <span className={`${styles.corner} ${styles.topLeft}`} />
        <span className={`${styles.corner} ${styles.topRight}`} />
        <span className={`${styles.corner} ${styles.bottomLeft}`} />
        <span className={`${styles.corner} ${styles.bottomRight}`} />
      </span>

      {/* Words rendered with clean spacing */}
      {words.map((word, i) => {
        const isHovered = hoveredIndex === i;
        const isAnotherHovered = hoveredIndex !== null && !isHovered;

        return (
          <React.Fragment key={`${word}-${i}`}>
            <span
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className={styles.word}
              style={{
                filter: isAnotherHovered ? `blur(${blurAmount}px)` : "blur(0px)",
                opacity: isAnotherHovered ? 0.4 : 1,
                transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {word}
            </span>
          </React.Fragment>
        );
      })}
    </p>
  );
}
