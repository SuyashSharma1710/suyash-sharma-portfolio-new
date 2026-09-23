"use client";

/**
 * SoundToggle.tsx — Animated Equalizer (EQ) Sound Controller Button
 * 
 * Sits alongside ThemeToggle, GitHub, and LinkedIn in the editorial navigation dock.
 * Displays live dancing audio equalizer bars when sound is ON, settling flat when muted.
 */

import React from "react";
import { useSound } from "./SoundProvider";
import styles from "./SoundToggle.module.css";

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <button
      id="sound-toggle"
      type="button"
      className={styles.soundToggle}
      onClick={toggleSound}
      data-sound="none"
      aria-label={soundEnabled ? "Mute interactive sounds" : "Enable interactive sounds"}
      title={soundEnabled ? "Sound effects: ON (Equalizer Active)" : "Sound effects: MUTED"}
      aria-pressed={soundEnabled}
    >
      <svg
        className={styles.eqSvg}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect
          className={`${styles.eqBar} ${styles.eqBar1}${soundEnabled ? ` ${styles.active}` : ""}`}
          x="3.5"
          y="3"
          width="2.8"
          height="18"
          rx="1.4"
        />
        <rect
          className={`${styles.eqBar} ${styles.eqBar2}${soundEnabled ? ` ${styles.active}` : ""}`}
          x="8.8"
          y="3"
          width="2.8"
          height="18"
          rx="1.4"
        />
        <rect
          className={`${styles.eqBar} ${styles.eqBar3}${soundEnabled ? ` ${styles.active}` : ""}`}
          x="14.1"
          y="3"
          width="2.8"
          height="18"
          rx="1.4"
        />
        <rect
          className={`${styles.eqBar} ${styles.eqBar4}${soundEnabled ? ` ${styles.active}` : ""}`}
          x="19.4"
          y="3"
          width="2.8"
          height="18"
          rx="1.4"
        />
      </svg>
    </button>
  );
}
