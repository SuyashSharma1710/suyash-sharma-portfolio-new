"use client";

/**
 * PixelBlast — React Bits Retro Pixel Particle Shockwave
 * High-performance HTML5 canvas particle explosion.
 * Spawns crisp geometric pixel blocks on click/pointer interaction with zero idle CPU.
 */

import React, { useRef, useEffect, useCallback } from "react";
import styles from "./PixelBlast.module.css";
import { motionEngine } from "@/lib/motion/engine";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export interface PixelBlastProps {
  className?: string;
  particleCount?: number;
  pixelSize?: number;
  speed?: number;
  trigger?: "click" | "move" | "both";
  color?: string;
  disabled?: boolean;
}

export function PixelBlast({
  className = "",
  particleCount = 18,
  pixelSize = 3,
  speed = 3.2,
  trigger = "click",
  color,
  disabled = false,
}: PixelBlastProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isRunningRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const getThemeColor = useCallback(() => {
    if (color) return color;
    if (typeof window === "undefined") return "#111111";
    const computed = getComputedStyle(document.documentElement);
    return computed.getPropertyValue("--color-ink").trim() || "#111111";
  }, [color]);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isRunningRef.current = false;
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      isRunningRef.current = false;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]!;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.94; // air drag
      p.vy *= 0.94;
      p.life += 1;
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);

      if (p.alpha <= 0 || p.life >= p.maxLife) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      // Draw crisp 8-bit square pixel
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      ctx.restore();
    }

    if (particles.length > 0) {
      rafIdRef.current = requestAnimationFrame(tick);
    } else {
      isRunningRef.current = false;
    }
  }, []);

  const addBurst = useCallback(
    (clientX: number, clientY: number, count = particleCount) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const originX = clientX - rect.left;
      const originY = clientY - rect.top;
      const particleColor = getThemeColor();

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const velocity = (Math.random() * 0.75 + 0.5) * speed;
        const maxLife = Math.floor(Math.random() * 20 + 25);

        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() > 0.6 ? pixelSize * 1.5 : pixelSize,
          alpha: 1,
          life: 0,
          maxLife,
          color: particleColor,
        });
      }

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        tick();
      }
    },
    [particleCount, pixelSize, speed, getThemeColor, tick]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || disabled) return;

    const profile = motionEngine.getProfile();
    if (profile.reducedMotion) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const handleClick = (e: MouseEvent) => {
      if (trigger === "click" || trigger === "both") {
        addBurst(e.clientX, e.clientY, particleCount);
      }
    };

    let moveThrottle = 0;
    const handlePointerMove = (e: PointerEvent) => {
      if (trigger === "move" || trigger === "both") {
        const now = performance.now();
        if (now - moveThrottle > 80) {
          moveThrottle = now;
          addBurst(e.clientX, e.clientY, Math.round(particleCount * 0.35));
        }
      }
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener("click", handleClick as EventListener, { passive: true });
    if (trigger === "move" || trigger === "both") {
      parent.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      parent.removeEventListener("click", handleClick as EventListener);
      if (trigger === "move" || trigger === "both") {
        parent.removeEventListener("pointermove", handlePointerMove as EventListener);
      }
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [trigger, particleCount, disabled, addBurst]);

  return <canvas ref={canvasRef} className={`${styles.canvas} ${className}`} aria-hidden="true" />;
}
