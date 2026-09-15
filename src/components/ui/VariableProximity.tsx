"use client";

/**
 * VariableProximity.tsx — React Bits Variable Font Physics
 * Dynamically interpolates fontVariationSettings ('wght', 'opsz', etc.) on each letter
 * based on cursor proximity and falloff dynamics.
 */

import React, {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  type RefObject,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import styles from "./VariableProximity.module.css";
import { motionEngine } from "@/lib/motion/engine";

function useAnimationFrame(callback: () => void, isEnabled = true) {
  useEffect(() => {
    if (!isEnabled) return;
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback, isEnabled]);
}

function useMousePositionRef(containerRef?: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: clientX - rect.left, y: clientY - rect.top };
      } else {
        positionRef.current = { x: clientX, y: clientY };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

export interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  fromFontWeight?: number;
  toFontWeight?: number;
  containerRef?: RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (props, ref) => {
    const {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      fromFontWeight = 400,
      toFontWeight = 800,
      containerRef,
      radius = 160,
      falloff = "gaussian",
      className = "",
      onClick,
      style,
      ...restProps
    } = props;

    const fromSettingsStr = fromFontVariationSettings || `'wght' ${fromFontWeight}`;
    const toSettingsStr = toFontVariationSettings || `'wght' ${toFontWeight}`;

    const localRef = useRef<HTMLSpanElement>(null);
    const resolvedContainerRef = containerRef || localRef;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mousePositionRef = useMousePositionRef(resolvedContainerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const parsedSettings = useMemo(() => {
      const parseSettings = (settingsStr: string) =>
        new Map(
          settingsStr
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((s) => {
              const [name, value] = s.split(" ");
              return [name!.replace(/['"]/g, ""), parseFloat(value || "400")];
            })
        );

      const fromSettings = parseSettings(fromSettingsStr);
      const toSettings = parseSettings(toSettingsStr);

      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromSettingsStr, toSettingsStr]);

    const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
      Math.hypot(x2 - x1, y2 - y1);

    const calculateFalloff = (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      switch (falloff) {
        case "exponential":
          return Math.pow(norm, 2);
        case "gaussian":
          return Math.exp(-Math.pow(distance / (radius * 0.45), 2));
        case "linear":
        default:
          return norm;
      }
    };

    useAnimationFrame(() => {
      if (typeof window === "undefined") return;
      if (motionEngine.getProfile().reducedMotion) return;

      const currentContainer = resolvedContainerRef.current;
      if (!currentContainer) return;

      const { x, y } = mousePositionRef.current;
      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
        return;
      }
      lastPositionRef.current = { x, y };
      const containerRect = currentContainer.getBoundingClientRect();

      letterRefs.current.forEach((letterRef) => {
        if (!letterRef) return;

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const distance = calculateDistance(
          mousePositionRef.current.x,
          mousePositionRef.current.y,
          letterCenterX,
          letterCenterY
        );

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromSettingsStr;
          letterRef.style.fontWeight = `${fromFontWeight}`;
          letterRef.style.transform = "none";
          return;
        }

        const falloffValue = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = Math.round(fromValue + (toValue - fromValue) * falloffValue);
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(", ");

        const currentWeight = Math.round(fromFontWeight + (toFontWeight - fromFontWeight) * falloffValue);
        const yOffset = -falloffValue * 2.5;

        letterRef.style.fontVariationSettings = newSettings;
        letterRef.style.fontWeight = `${currentWeight}`;
        letterRef.style.transform = `translateY(${yOffset.toFixed(2)}px)`;
      });
    });

    const words = label.split(" ");
    let letterIndex = 0;

    return (
      <span
        ref={(el) => {
          localRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = el;
        }}
        onClick={onClick}
        style={{
          display: "inline",
          ...style,
        }}
        className={`${styles.container} ${className}`}
        {...restProps}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className={styles.word}>
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++;
              return (
                <span
                  key={currentLetterIndex}
                  ref={(el) => {
                    letterRefs.current[currentLetterIndex] = el;
                  }}
                  className={styles.char}
                  style={{
                    display: "inline-block",
                    fontVariationSettings: fromSettingsStr,
                    fontWeight: fromFontWeight,
                    willChange: "font-variation-settings, font-weight, transform",
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              );
            })}
            {wordIndex < words.length - 1 && <span className={styles.space}>&nbsp;</span>}
          </span>
        ))}
        <span className={styles.srOnly}>{label}</span>
      </span>
    );
  }
);

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
