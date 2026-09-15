"use client";

/**
 * Centralized Motion System — useSpring Hook
 * 
 * Standalone physics spring controller for numeric values:
 * - Subscribes directly to the centralized motionEngine
 * - Zero React re-renders during continuous interpolation
 * - Supports delay, duration/easing, stiffness, damping, mass, multiplier, velocity injection
 */

import { useEffect, useRef, useId, useCallback } from "react";
import { SpringConfig } from "./types";
import { motionEngine } from "./engine";
import {
  createChannelState,
  setChannelTarget,
  injectVelocity,
  stepChannel,
} from "./spring";

export interface SpringController {
  /** Get instantaneous value without triggering React re-render */
  get: () => number;
  /** Set new target value */
  set: (target: number) => void;
  /** Inject external velocity */
  inject: (velocity: number) => void;
  /** Subscribe a listener to value updates */
  onChange: (callback: (value: number) => void) => () => void;
  /** Check if spring has reached equilibrium */
  isSettled: () => boolean;
}

export function useSpring(
  initialValue = 0,
  config: SpringConfig = {}
): SpringController {
  const instanceId = useId();
  const configRef = useRef(config);
  configRef.current = config;

  const channelRef = useRef(createChannelState(initialValue));
  const listenersRef = useRef(new Set<(val: number) => void>());

  useEffect(() => {
    const channel = channelRef.current;

    const unsubscribe = motionEngine.subscribe(instanceId, (dt, now, profile) => {
      if (channel.isSettled) return false;

      const isMoving = stepChannel(channel, configRef.current, dt, now, profile);
      const val = channel.current;

      listenersRef.current.forEach((cb) => {
        try {
          cb(val);
        } catch (e) {
          console.error("[useSpring] Listener error:", e);
        }
      });

      return isMoving;
    });

    return () => {
      unsubscribe();
    };
  }, [instanceId]);

  const get = useCallback(() => channelRef.current.current, []);

  const set = useCallback((target: number) => {
    setChannelTarget(channelRef.current, target, configRef.current, performance.now());
    motionEngine.wake();
  }, []);

  const inject = useCallback((vel: number) => {
    injectVelocity(channelRef.current, vel);
    motionEngine.wake();
  }, []);

  const onChange = useCallback((callback: (value: number) => void) => {
    listenersRef.current.add(callback);
    return () => {
      listenersRef.current.delete(callback);
    };
  }, []);

  const isSettled = useCallback(() => channelRef.current.isSettled, []);

  return {
    get,
    set,
    inject,
    onChange,
    isSettled,
  };
}
