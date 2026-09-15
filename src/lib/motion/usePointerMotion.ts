"use client";

/**
 * Centralized Motion System — usePointerMotion Hook
 * 
 * Binds any DOM element to the unified RAF engine and pointer physics:
 * - Direct DOM transform/CSS variable mutation (zero React re-renders)
 * - Independent per-property spring physics (delay, damping, stiffness, multiplier)
 * - Velocity injection on cursor exit for realistic momentum
 * - Deliberately handles desktop fine pointers vs touch coarse inputs
 * - Fully respects OS prefers-reduced-motion
 */

import { useEffect, useRef, useId } from "react";
import {
  MotionPropertyConfigs,
  MotionOutputFormat,
  MotionOutputValues,
  MotionChannelState,
  MotionProperty,
  PointerState,
} from "./types";
import { motionEngine } from "./engine";
import {
  createChannelState,
  setChannelTarget,
  injectVelocity,
  stepChannel,
} from "./spring";
import { createEmptyPointerState, updateScopedPointer } from "./pointer";

export interface UsePointerMotionOptions {
  /** Map of property configurations (stiffness, damping, delay, multiplier, etc.) */
  properties?: MotionPropertyConfigs;
  /** Format to write output to the target element */
  outputFormat?: MotionOutputFormat;
  /** 3D Perspective in pixels (Default: 800) */
  perspective?: number;
  /** Max magnetic displacement multiplier (Default: 0.3) */
  magneticStrength?: number;
  /** Max 3D tilt in degrees (Default: 12) */
  maxTilt?: number;
  /** Whether to dynamically skew proportional to pointer velocity */
  enableVelocitySkew?: boolean;
  /** Multiplier for velocity skew (Default: 1.5) */
  velocitySkewMultiplier?: number;
  /** Custom direct update callback */
  onUpdate?: (values: MotionOutputValues, pointer: Readonly<PointerState>) => void;
  /** Callback fired on pointer enter */
  onPointerEnter?: (pointer: Readonly<PointerState>) => void;
  /** Callback fired on pointer leave */
  onPointerLeave?: (pointer: Readonly<PointerState>) => void;
  /** Whether to disable the motion hook */
  disabled?: boolean;
}

const ALL_PROPERTIES: MotionProperty[] = [
  "x",
  "y",
  "z",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY",
  "opacity",
  "blur",
];

export function usePointerMotion<T extends HTMLElement | SVGElement = HTMLElement>(
  elementRef: React.RefObject<T | null>,
  options: UsePointerMotionOptions = {}
): {
  getPointerState: () => Readonly<PointerState>;
  getValues: () => Readonly<MotionOutputValues>;
  reset: () => void;
} {
  const instanceId = useId();
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const pointerStateRef = useRef<PointerState>(createEmptyPointerState());
  const channelStatesRef = useRef<Record<MotionProperty, MotionChannelState>>({
    x: createChannelState(0),
    y: createChannelState(0),
    z: createChannelState(0),
    rotateX: createChannelState(0),
    rotateY: createChannelState(0),
    rotateZ: createChannelState(0),
    scale: createChannelState(1),
    scaleX: createChannelState(1),
    scaleY: createChannelState(1),
    skewX: createChannelState(0),
    skewY: createChannelState(0),
    opacity: createChannelState(1),
    blur: createChannelState(0),
  });

  const outputValuesRef = useRef<MotionOutputValues>({
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    skewX: 0,
    skewY: 0,
    opacity: 1,
    blur: 0,
  });

  useEffect(() => {
    const el = elementRef.current;
    if (!el || options.disabled) return;

    const channels = channelStatesRef.current;
    const pointer = pointerStateRef.current;
    const output = outputValuesRef.current;
    const outputFormat = optionsRef.current.outputFormat ?? "transform";

    let isHovered = false;

    // Direct DOM write helper — strictly uses GPU-accelerated transform3d, opacity, filter
    const applyToDOM = () => {
      if (!el) return;

      if (outputFormat === "transform") {
        const p = optionsRef.current.perspective ?? 800;
        const scaleVal = output.scale !== 1 ? output.scale : (output.scaleX + output.scaleY) / 2;
        
        let transformStr = `perspective(${p}px) translate3d(${output.x.toFixed(2)}px, ${output.y.toFixed(2)}px, ${output.z.toFixed(2)}px)`;
        if (output.rotateX !== 0 || output.rotateY !== 0 || output.rotateZ !== 0) {
          transformStr += ` rotateX(${output.rotateX.toFixed(2)}deg) rotateY(${output.rotateY.toFixed(2)}deg) rotateZ(${output.rotateZ.toFixed(2)}deg)`;
        }
        if (scaleVal !== 1) {
          transformStr += ` scale(${scaleVal.toFixed(3)})`;
        }
        if (output.skewX !== 0 || output.skewY !== 0) {
          transformStr += ` skew(${output.skewX.toFixed(2)}deg, ${output.skewY.toFixed(2)}deg)`;
        }

        el.style.transform = transformStr;

        if (output.opacity !== 1) {
          el.style.opacity = output.opacity.toFixed(3);
        }
        if (output.blur > 0) {
          el.style.filter = `blur(${output.blur.toFixed(1)}px)`;
        }
      } else if (outputFormat === "css-variables") {
        el.style.setProperty("--motion-x", `${output.x.toFixed(2)}px`);
        el.style.setProperty("--motion-y", `${output.y.toFixed(2)}px`);
        el.style.setProperty("--motion-rot-x", `${output.rotateX.toFixed(2)}deg`);
        el.style.setProperty("--motion-rot-y", `${output.rotateY.toFixed(2)}deg`);
        el.style.setProperty("--motion-scale", output.scale.toFixed(3));
        el.style.setProperty("--motion-skew-x", `${output.skewX.toFixed(2)}deg`);
        el.style.setProperty("--motion-opacity", output.opacity.toFixed(3));
      }
    };

    // RAF subscriber callback
    const unsubscribeEngine = motionEngine.subscribe(instanceId, (dt, now, profile) => {
      const props = optionsRef.current.properties ?? {};
      let anyMoving = false;

      ALL_PROPERTIES.forEach((prop) => {
        const channel = channels[prop];
        if (!channel.isSettled) {
          const config = props[prop];
          const isMoving = stepChannel(channel, config, dt, now, profile);
          if (isMoving) anyMoving = true;
        }
        output[prop] = channel.current;
      });

      if (anyMoving) {
        applyToDOM();
        optionsRef.current.onUpdate?.(output, pointer);
      }

      return anyMoving;
    });

    // Pointer Event Listeners (passive for 60fps)
    const handlePointerEnter = (e: PointerEvent) => {
      const profile = motionEngine.getProfile();
      // On coarse touch devices, skip hover tracking to prevent stuck states
      if (profile.isCoarse && e.pointerType === "touch") return;

      isHovered = true;
      const rect = el.getBoundingClientRect();
      const pType = (e.pointerType as "mouse" | "touch" | "pen") || "mouse";
      updateScopedPointer(pointer, e.clientX, e.clientY, rect, true, pType, performance.now());
      optionsRef.current.onPointerEnter?.(pointer);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const profile = motionEngine.getProfile();
      if (profile.isCoarse && e.pointerType === "touch") return;

      const now = performance.now();
      const rect = el.getBoundingClientRect();
      const pType = (e.pointerType as "mouse" | "touch" | "pen") || "mouse";
      updateScopedPointer(pointer, e.clientX, e.clientY, rect, true, pType, now);

      const props = optionsRef.current.properties ?? {};
      const mag = optionsRef.current.magneticStrength ?? 0.25;
      const maxTilt = optionsRef.current.maxTilt ?? 12;

      // Magnetic displacement targets
      const targetX = pointer.normX * (rect.width * mag * 0.5);
      const targetY = pointer.normY * (rect.height * mag * 0.5);

      // 3D Tilt targets
      const targetRotX = -pointer.normY * maxTilt;
      const targetRotY = pointer.normX * maxTilt;

      // Velocity skew targets
      let targetSkewX = 0;
      let targetSkewY = 0;
      if (optionsRef.current.enableVelocitySkew) {
        const skewMult = optionsRef.current.velocitySkewMultiplier ?? 1.5;
        targetSkewX = -Math.max(-15, Math.min(15, pointer.vx * skewMult * 8));
        targetSkewY = Math.max(-15, Math.min(15, pointer.vy * skewMult * 8));
      }

      // Update spring channel targets
      setChannelTarget(channels.x, targetX, props.x, now);
      setChannelTarget(channels.y, targetY, props.y, now);
      setChannelTarget(channels.rotateX, targetRotX, props.rotateX, now);
      setChannelTarget(channels.rotateY, targetRotY, props.rotateY, now);
      setChannelTarget(channels.skewX, targetSkewX, props.skewX, now);
      setChannelTarget(channels.skewY, targetSkewY, props.skewY, now);

      // Wake the central engine
      motionEngine.wake();
    };

    const handlePointerLeave = (e: PointerEvent) => {
      if (!isHovered) return;
      isHovered = false;

      const now = performance.now();
      const rect = el.getBoundingClientRect();
      const pType = (e.pointerType as "mouse" | "touch" | "pen") || "mouse";
      updateScopedPointer(pointer, e.clientX, e.clientY, rect, false, pType, now);

      const props = optionsRef.current.properties ?? {};

      // Inject release velocity into spring to preserve natural momentum
      injectVelocity(channels.x, pointer.vx * 15);
      injectVelocity(channels.y, pointer.vy * 15);

      // Reset targets to natural resting positions
      setChannelTarget(channels.x, 0, props.x, now);
      setChannelTarget(channels.y, 0, props.y, now);
      setChannelTarget(channels.rotateX, 0, props.rotateX, now);
      setChannelTarget(channels.rotateY, 0, props.rotateY, now);
      setChannelTarget(channels.skewX, 0, props.skewX, now);
      setChannelTarget(channels.skewY, 0, props.skewY, now);
      setChannelTarget(channels.scale, 1, props.scale, now);

      optionsRef.current.onPointerLeave?.(pointer);
      motionEngine.wake();
    };

    el.addEventListener("pointerenter", handlePointerEnter as EventListener, { passive: true });
    el.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    el.addEventListener("pointerleave", handlePointerLeave as EventListener, { passive: true });

    return () => {
      unsubscribeEngine();
      el.removeEventListener("pointerenter", handlePointerEnter as EventListener);
      el.removeEventListener("pointermove", handlePointerMove as EventListener);
      el.removeEventListener("pointerleave", handlePointerLeave as EventListener);
      
      // Clean up styles
      el.style.transform = "";
      el.style.opacity = "";
      el.style.filter = "";
    };
  }, [instanceId, options.disabled, elementRef]);

  return {
    getPointerState: () => pointerStateRef.current,
    getValues: () => outputValuesRef.current,
    reset: () => {
      const channels = channelStatesRef.current;
      ALL_PROPERTIES.forEach((prop) => {
        const ch = channels[prop];
        ch.current = prop === "scale" || prop === "scaleX" || prop === "scaleY" || prop === "opacity" ? 1 : 0;
        ch.target = ch.current;
        ch.velocity = 0;
        ch.isSettled = true;
      });
      if (elementRef.current) {
        elementRef.current.style.transform = "";
      }
    },
  };
}
