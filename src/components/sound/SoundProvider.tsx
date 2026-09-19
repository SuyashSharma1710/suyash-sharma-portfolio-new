"use client";

/**
 * SoundProvider.tsx — Centralized Interactive Audio & Global Interaction Orchestrator
 * 
 * Features:
 * - High-fidelity Web Audio API playback via soundEngine.
 * - Global event delegation for seamless hover & click feedback across all interactive elements.
 * - LocalStorage persistence for user sound preference (`portfolio:sound-enabled`).
 * - Auto-unlocks AudioContext on first user gesture.
 * - Zero lag & non-blocking.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { soundEngine, type SoundType } from "@/lib/sound/soundEngine";

interface SoundContextValue {
  soundEnabled: boolean;
  toggleSound: () => void;
  play: (type: SoundType, options?: { volume?: number; pitchOffset?: number }) => void;
}

const SoundContext = createContext<SoundContextValue>({
  soundEnabled: true,
  toggleSound: () => {},
  play: () => {},
});

export const useSound = () => useContext(SoundContext);

const STORAGE_KEY = "portfolio:sound-enabled";

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const lastHoveredElementRef = useRef<EventTarget | null>(null);

  // 1. Initialize state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const isEnabled = stored === "true";
        setSoundEnabled(isEnabled);
        soundEngine.setMuted(!isEnabled);
      } else {
        // Default enabled
        soundEngine.setMuted(false);
      }
    } catch {
      // localStorage fallback
    }
  }, []);

  // 2. Toggle Sound Controller
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.setMuted(!next);
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // localStorage fallback
      }
      if (next) {
        soundEngine.play("toggle", { volume: 0.9 });
      }
      return next;
    });
  }, []);

  // 3. Play helper
  const play = useCallback((type: SoundType, options?: { volume?: number; pitchOffset?: number }) => {
    soundEngine.play(type, options);
  }, []);

  // 4. Unlock AudioContext on first user interaction
  useEffect(() => {
    const handleFirstGesture = () => {
      soundEngine.unlock();
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };

    window.addEventListener("pointerdown", handleFirstGesture, { passive: true });
    window.addEventListener("keydown", handleFirstGesture, { passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };
  }, []);

  // 5. Global Delegated Listener for Hovers & Clicks
  useEffect(() => {
    const handlePointerOver = (e: PointerEvent) => {
      // Touch/coarse pointers shouldn't fire hover audio
      if (e.pointerType === "touch") return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest interactive element
      const interactive = target.closest<HTMLElement>(
        'a, button, [role="button"], [role="tab"], summary, [data-hover-sound], input[type="submit"]'
      );

      if (!interactive) {
        lastHoveredElementRef.current = null;
        return;
      }

      // Avoid refiring if moving inside the same element
      if (interactive === lastHoveredElementRef.current) return;
      lastHoveredElementRef.current = interactive;

      // Opt-out check
      if (interactive.getAttribute("data-sound") === "none") return;
      if (interactive.closest('[data-sound="none"]')) return;
      if ((interactive as HTMLButtonElement).disabled) return;

      soundEngine.play("hover");
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest<HTMLElement>(
        'a, button, [role="button"], [role="tab"], summary, input[type="submit"]'
      );

      if (!interactive) return;

      // Opt-out check
      if (interactive.getAttribute("data-sound") === "none") return;
      if (interactive.closest('[data-sound="none"]')) return;
      if ((interactive as HTMLButtonElement).disabled) return;

      // Check for custom specified sound
      const customSound = interactive.getAttribute("data-sound");
      if (customSound && customSound !== "none") {
        soundEngine.play(customSound as SoundType);
      } else {
        soundEngine.play("click");
      }
    };

    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("click", handleClick, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, play }}>
      {children}
    </SoundContext.Provider>
  );
}
