"use client";

/**
 * Magnet.tsx — React Bits Tactile Magnetic Wrapper
 * Subtly attracts interactive buttons/links toward the cursor.
 * Governed strictly by RULES.md Rule 10, Rule 15 (No Animation Theater), and Rule 16 (Reduced Motion).
 */
import React, { useRef, useState, useCallback } from "react";
import styles from "./Magnet.module.css";

interface MagnetProps {
  children: React.ReactNode;
  magnetStrength?: number; // max offset in px
  activeRadius?: number; // distance in px to activate
  className?: string;
}

export function Magnet({
  children,
  magnetStrength = 8,
  activeRadius = 80,
  className = "",
}: MagnetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < activeRadius) {
        const pullX = (distanceX / activeRadius) * magnetStrength;
        const pullY = (distanceY / activeRadius) * magnetStrength;
        setPosition({ x: pullX, y: pullY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [activeRadius, magnetStrength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.magnetWrapper} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
