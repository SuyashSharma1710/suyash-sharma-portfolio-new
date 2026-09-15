"use client";

/**
 * Centralized Motion System — Desktop Cursor Tracker
 * 
 * Adheres strictly to RULES.md Rule 26:
 * - Desktop enhancement only (hidden on touch / coarse pointer / reduced motion)
 * - Single DOM element + shared pointer listener + requestAnimationFrame + transform
 * - Zero React state used for high-frequency coordinates
 * - Velocity-aware dynamic stretch along trajectory
 */

import React, { useEffect, useRef } from "react";
import styles from "./CursorTracker.module.css";
import { motionEngine } from "../engine";
import { globalPointer } from "../pointer";
import { createChannelState, setChannelTarget, stepChannel } from "../spring";
import { motionPresets } from "../presets";

export function CursorTracker() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const xSpring = useRef(createChannelState(0));
  const ySpring = useRef(createChannelState(0));
  const scaleSpring = useRef(createChannelState(1));
  const stretchSpring = useRef(createChannelState(1));
  const isVisible = useRef(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const profile = motionEngine.getProfile();
    if (profile.isCoarse || profile.reducedMotion) return;

    const springConfig = {
      stiffness: 420,
      damping: 32,
      mass: 0.7,
      restDelta: 0.01,
      restSpeed: 0.01,
    };

    const unsubscribePointer = globalPointer.subscribe((pointer) => {
      if (!isVisible.current && pointer.clientX > 0 && pointer.clientY > 0) {
        isVisible.current = true;
        el.classList.add(styles.cursorVisible || "cursorVisible");
      }

      const now = performance.now();
      // Target centered on cursor
      setChannelTarget(xSpring.current, pointer.clientX - 10, springConfig, now);
      setChannelTarget(ySpring.current, pointer.clientY - 10, springConfig, now);

      // Velocity-aware stretch (subtle elongation when moving fast)
      const speed = pointer.speed; // px / ms
      const stretch = Math.min(1.4, 1 + speed * 0.15);
      setChannelTarget(stretchSpring.current, stretch, motionPresets.snappy, now);

      motionEngine.wake();
    });

    const unsubscribeEngine = motionEngine.subscribe("cursor-tracker", (dt, now, currentProfile) => {
      if (currentProfile.isCoarse || currentProfile.reducedMotion) {
        el.classList.add(styles.cursorHidden || "cursorHidden");
        return false;
      }

      const moveX = stepChannel(xSpring.current, springConfig, dt, now, currentProfile);
      const moveY = stepChannel(ySpring.current, springConfig, dt, now, currentProfile);
      const moveScale = stepChannel(scaleSpring.current, motionPresets.snappy, dt, now, currentProfile);
      const moveStretch = stepChannel(stretchSpring.current, motionPresets.snappy, dt, now, currentProfile);

      const x = xSpring.current.current;
      const y = ySpring.current.current;
      const scale = scaleSpring.current.current;
      const stretch = stretchSpring.current.current;
      const angle = globalPointer.getState().angle;

      let transformStr = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (stretch > 1.02) {
        transformStr += ` rotate(${angle.toFixed(3)}rad) scale(${stretch.toFixed(3)}, ${(1 / stretch).toFixed(3)}) scale(${scale.toFixed(3)})`;
      } else if (scale !== 1) {
        transformStr += ` scale(${scale.toFixed(3)})`;
      }

      el.style.transform = transformStr;

      return moveX || moveY || moveScale || moveStretch;
    });

    return () => {
      unsubscribePointer();
      unsubscribeEngine();
    };
  }, []);

  return <div ref={cursorRef} className={styles.cursorRoot} aria-hidden="true" />;
}
