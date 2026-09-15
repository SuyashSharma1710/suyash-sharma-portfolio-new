"use client";

/**
 * ParallaxImage.tsx — High-Precision GSAP Scroll-Driven Parallax Image
 * Applies subtle, fluid vertical parallax to large editorial imagery.
 * Governed strictly by:
 * - gsap-react & gsap-scrolltrigger skills
 * - RULES.md Rule 15 (No animation theater — subtle, purposeful motion)
 * - RULES.md Rule 16 (Strict prefers-reduced-motion compliance)
 */

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ParallaxImage.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface ParallaxImageProps extends Omit<ImageProps, "className"> {
  speed?: number; // Parallax intensity: default 0.15 (subtle, 15% travel)
  scale?: number; // Scale to prevent clipping: default 1.12
  containerClassName?: string;
  imageClassName?: string;
  aspectRatio?: string;
}

export function ParallaxImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  sizes,
  speed = 0.15,
  scale = 1.12,
  containerClassName,
  imageClassName,
  aspectRatio,
  style,
  ...rest
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const imageWrapper = imageRef.current;
      if (!container || !imageWrapper) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMotionAllowed: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isMotionAllowed } = (context.conditions || {}) as { isMotionAllowed?: boolean };

          if (isMotionAllowed) {
            // Calculate pixel travel based on container height & speed factor
            const yTravel = Math.max(20, Math.min(80, container.clientHeight * speed));

            gsap.fromTo(
              imageWrapper,
              {
                y: -yTravel,
                scale: scale,
              },
              {
                y: yTravel,
                scale: scale,
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        }
      );
    },
    { scope: containerRef, dependencies: [speed, scale] }
  );

  return (
    <div
      ref={containerRef}
      className={`${styles.parallaxContainer} ${containerClassName || ""}`}
      style={{
        aspectRatio: aspectRatio,
        ...style,
      }}
    >
      <div ref={imageRef} className={styles.imageWrapper}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          className={`${styles.image} ${imageClassName || ""}`}
          {...rest}
        />
      </div>
    </div>
  );
}
