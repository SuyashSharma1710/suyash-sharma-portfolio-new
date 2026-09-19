"use client";

/**
 * SoundToggle.tsx — Minimal Tactile Sound Controller Button
 * 
 * Sits alongside ThemeToggle in the editorial navigation dock.
 * Provides instant visual state feedback and accessible control.
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
      title={soundEnabled ? "Sound effects: ON" : "Sound effects: MUTED"}
      aria-pressed={soundEnabled}
    >
      {soundEnabled ? (
        /* Audio Waves Active Icon */
        <svg
          className={styles.iconSvg}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        /* Muted / Slashed Audio Icon */
        <svg
          className={styles.iconSvg}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
