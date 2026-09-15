"use client";

/**
 * Dither.tsx — Exact Port of React Bits Dithered Waves WebGL Pipeline
 * Implements Perlin cnoise 4-octave domain-warped FBM waves with 8x8 Bayer Matrix Dithering.
 * Fully adapted for the portfolio design system with light/dark theme colors.
 */

import React, { useRef, useEffect, useCallback } from "react";
import styles from "./Dither.module.css";
import { motionEngine } from "@/lib/motion/engine";

export interface DitherProps {
  className?: string;
  waveSpeed?: number; // default: 0.05
  waveFrequency?: number; // default: 3
  waveAmplitude?: number; // default: 0.3
  waveColor?: [number, number, number]; // RGB [0..1]
  backgroundColor?: [number, number, number]; // RGB [0..1]
  colorNum?: number; // default: 4
  pixelSize?: number; // default: 2
  disableAnimation?: boolean; // default: false
  enableMouseInteraction?: boolean; // default: true
  mouseRadius?: number; // default: 0.3
  opacity?: number;
}

const VERTEX_SHADER_SOURCE = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec3 backgroundColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;
uniform float colorNum;
uniform float pixelSize;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2));
}

float getBayer8x8(int x, int y) {
  int idx = y * 8 + x;
  if (idx == 0) return 0.0/64.0;
  if (idx == 1) return 48.0/64.0;
  if (idx == 2) return 12.0/64.0;
  if (idx == 3) return 60.0/64.0;
  if (idx == 4) return 3.0/64.0;
  if (idx == 5) return 51.0/64.0;
  if (idx == 6) return 15.0/64.0;
  if (idx == 7) return 63.0/64.0;
  if (idx == 8) return 32.0/64.0;
  if (idx == 9) return 16.0/64.0;
  if (idx == 10) return 44.0/64.0;
  if (idx == 11) return 28.0/64.0;
  if (idx == 12) return 35.0/64.0;
  if (idx == 13) return 19.0/64.0;
  if (idx == 14) return 47.0/64.0;
  if (idx == 15) return 31.0/64.0;
  if (idx == 16) return 8.0/64.0;
  if (idx == 17) return 56.0/64.0;
  if (idx == 18) return 4.0/64.0;
  if (idx == 19) return 52.0/64.0;
  if (idx == 20) return 11.0/64.0;
  if (idx == 21) return 59.0/64.0;
  if (idx == 22) return 7.0/64.0;
  if (idx == 23) return 55.0/64.0;
  if (idx == 24) return 40.0/64.0;
  if (idx == 25) return 24.0/64.0;
  if (idx == 26) return 36.0/64.0;
  if (idx == 27) return 20.0/64.0;
  if (idx == 28) return 43.0/64.0;
  if (idx == 29) return 27.0/64.0;
  if (idx == 30) return 39.0/64.0;
  if (idx == 31) return 23.0/64.0;
  if (idx == 32) return 2.0/64.0;
  if (idx == 33) return 50.0/64.0;
  if (idx == 34) return 14.0/64.0;
  if (idx == 35) return 62.0/64.0;
  if (idx == 36) return 1.0/64.0;
  if (idx == 37) return 49.0/64.0;
  if (idx == 38) return 13.0/64.0;
  if (idx == 39) return 61.0/64.0;
  if (idx == 40) return 34.0/64.0;
  if (idx == 41) return 18.0/64.0;
  if (idx == 42) return 46.0/64.0;
  if (idx == 43) return 30.0/64.0;
  if (idx == 44) return 33.0/64.0;
  if (idx == 45) return 17.0/64.0;
  if (idx == 46) return 45.0/64.0;
  if (idx == 47) return 29.0/64.0;
  if (idx == 48) return 10.0/64.0;
  if (idx == 49) return 58.0/64.0;
  if (idx == 50) return 6.0/64.0;
  if (idx == 51) return 54.0/64.0;
  if (idx == 52) return 9.0/64.0;
  if (idx == 53) return 57.0/64.0;
  if (idx == 54) return 5.0/64.0;
  if (idx == 55) return 53.0/64.0;
  if (idx == 56) return 42.0/64.0;
  if (idx == 57) return 26.0/64.0;
  if (idx == 58) return 38.0/64.0;
  if (idx == 59) return 22.0/64.0;
  if (idx == 60) return 41.0/64.0;
  if (idx == 61) return 25.0/64.0;
  if (idx == 62) return 37.0/64.0;
  return 21.0/64.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;

  float f = pattern(uv);

  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }

  vec3 color = mix(backgroundColor, waveColor, clamp(f, 0.0, 1.0));

  // 8x8 Bayer Dithering
  vec2 scaledCoord = floor(gl_FragCoord.xy / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = getBayer8x8(x, y) - 0.25;
  float stepVal = 1.0 / (colorNum - 1.0);
  color += threshold * stepVal;
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float bias = mix(0.2, 0.0, smoothstep(0.45, 0.8, luminance));
  color = clamp(color - bias, 0.0, 1.0);
  color = floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function Dither({
  className = "",
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor,
  backgroundColor,
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
  opacity = 1.0,
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const getThemeColors = useCallback((): { bg: [number, number, number]; wave: [number, number, number] } => {
    if (waveColor && backgroundColor) {
      return { bg: backgroundColor, wave: waveColor };
    }

    if (typeof window === "undefined") {
      return { bg: [0.05, 0.05, 0.05], wave: [0.5, 0.5, 0.5] };
    }

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      return {
        bg: backgroundColor || [0.051, 0.051, 0.051], // #0D0D0D (var(--color-paper))
        wave: waveColor || [0.502, 0.502, 0.502],     // #808080 (var(--color-muted))
      };
    } else {
      return {
        bg: backgroundColor || [0.961, 0.941, 0.91],  // #F5F0E8 (var(--color-paper))
        wave: waveColor || [0.42, 0.396, 0.376],      // #6B6560 (var(--color-ink))
      };
    }
  }, [waveColor, backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });

    if (!gl) return;

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const positionLocation = gl.getAttribLocation(program, "position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uResolution = gl.getUniformLocation(program, "resolution");
    const uTime = gl.getUniformLocation(program, "time");
    const uWaveSpeed = gl.getUniformLocation(program, "waveSpeed");
    const uWaveFrequency = gl.getUniformLocation(program, "waveFrequency");
    const uWaveAmplitude = gl.getUniformLocation(program, "waveAmplitude");
    const uWaveColor = gl.getUniformLocation(program, "waveColor");
    const uBackgroundColor = gl.getUniformLocation(program, "backgroundColor");
    const uMousePos = gl.getUniformLocation(program, "mousePos");
    const uEnableMouseInteraction = gl.getUniformLocation(program, "enableMouseInteraction");
    const uMouseRadius = gl.getUniformLocation(program, "mouseRadius");
    const uColorNum = gl.getUniformLocation(program, "colorNum");
    const uPixelSize = gl.getUniformLocation(program, "pixelSize");

    let width = 0;
    let height = 0;
    const startTime = performance.now();

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.floor(rect.width * dpr);
      height = Math.floor(rect.height * dpr);
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Pointer event
    const handlePointerMove = (e: PointerEvent) => {
      if (!enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (e.clientY - rect.top) * dpr;
    };

    const parent = canvas.parentElement || window;
    if (enableMouseInteraction) {
      parent.addEventListener("pointermove", handlePointerMove as EventListener, { passive: true });
    }

    // Visibility Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry?.isIntersecting ?? false;
        if (isVisibleRef.current && !rafIdRef.current) {
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const isReduced = disableAnimation || motionEngine.getProfile().reducedMotion;

    const render = () => {
      if (!isVisibleRef.current && !isReduced) {
        rafIdRef.current = null;
        return;
      }

      const elapsed = isReduced ? 1.0 : (performance.now() - startTime) * 0.001;
      const colors = getThemeColors();

      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uWaveSpeed, waveSpeed);
      gl.uniform1f(uWaveFrequency, waveFrequency);
      gl.uniform1f(uWaveAmplitude, waveAmplitude);
      gl.uniform3f(uWaveColor, colors.wave[0], colors.wave[1], colors.wave[2]);
      gl.uniform3f(uBackgroundColor, colors.bg[0], colors.bg[1], colors.bg[2]);
      gl.uniform2f(uMousePos, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1i(uEnableMouseInteraction, enableMouseInteraction ? 1 : 0);
      gl.uniform1f(uMouseRadius, mouseRadius);
      gl.uniform1f(uColorNum, colorNum);
      gl.uniform1f(uPixelSize, pixelSize);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!isReduced) {
        rafIdRef.current = requestAnimationFrame(render);
      } else {
        rafIdRef.current = null;
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (enableMouseInteraction) {
        parent.removeEventListener("pointermove", handlePointerMove as EventListener);
      }
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
    getThemeColors,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.ditherCanvas} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
