"use client";

/**
 * HeroHUD — System Architecture & Capabilities Schematic
 * Features:
 * - True vector beam shifting / transferring animation between subsystems
 * - Gliding targeting reticle & orbital telemetry rings
 * - Animated data packet dispatch along active connection vector
 * - Decrypted data transfer transition on the specification ledger
 * - Plain, accessible language with zero obscure jargon
 * - Full reduced-motion & mobile touch safety
 */

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

gsap.registerPlugin(useGSAP);

interface SystemNode {
  id: string;
  badge: string;
  name: string;
  label: string;
  category: string;
  metric: string;
  stack: string;
  x: number;
  y: number;
}

const NODES: SystemNode[] = [
  {
    id: "ai",
    badge: "AI",
    name: "Glint AI Search Engine",
    label: "AI & SMART SEARCH",
    category: "Smart Search & AI Workflows",
    metric: "Instant Search (<18ms) · Local AI",
    stack: "Rust · Local AI · Fast Search",
    x: 140,
    y: 95,
  },
  {
    id: "speed",
    badge: "SPEED",
    name: "PixelSpace Desktop App",
    label: "HIGH-SPEED DESKTOP APPS",
    category: "High-Performance Desktop Software",
    metric: "94% Smaller File Sizes · Zero Lag",
    stack: "C++ · Electron · Image Processing",
    x: 620,
    y: 95,
  },
  {
    id: "web",
    badge: "WEB",
    name: "Pitchery Web Platform",
    label: "FULL-STACK WEB APPS",
    category: "Modern Scalable Web Applications",
    metric: "Sub-Second Load · Global Cloud",
    stack: "Next.js · React · PostgreSQL Database",
    x: 140,
    y: 345,
  },
  {
    id: "cloud",
    badge: "CLOUD",
    name: "Cloud Infrastructure & DevOps",
    label: "CLOUD INFRASTRUCTURE",
    category: "High-Availability Production Systems",
    metric: "99.9% Uptime · Automated Deployments",
    stack: "TypeScript · Python · Docker · Cloud",
    x: 620,
    y: 345,
  },
];

const HUB = { x: 380, y: 220 };

export function HeroHUD() {
  const [activeNode, setActiveNode] = useState<SystemNode>(NODES[0]!);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG refs for continuous transferring animation
  const beamRef = useRef<SVGLineElement>(null);
  const pulsePacketRef = useRef<SVGCircleElement>(null);
  const reticleRef = useRef<SVGGElement>(null);
  const hubRingRef = useRef<SVGCircleElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);

  // Position vector tracking
  const currentPos = useRef({ x: NODES[0]!.x, y: NODES[0]!.y });

  // GSAP Context Safe Actions
  const { contextSafe } = useGSAP({ scope: containerRef });

  const transferToNode = contextSafe((targetNode: SystemNode) => {
    setActiveNode(targetNode);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      if (beamRef.current) {
        beamRef.current.setAttribute("x2", String(targetNode.x));
        beamRef.current.setAttribute("y2", String(targetNode.y));
      }
      if (reticleRef.current) {
        gsap.set(reticleRef.current, { x: targetNode.x, y: targetNode.y });
      }
      currentPos.current = { x: targetNode.x, y: targetNode.y };
      return;
    }

    // 1. Smoothly shift & transfer the active beam endpoint
    if (beamRef.current) {
      gsap.to(currentPos.current, {
        x: targetNode.x,
        y: targetNode.y,
        duration: 0.5,
        ease: "power3.inOut",
        onUpdate: () => {
          if (beamRef.current) {
            beamRef.current.setAttribute("x2", String(currentPos.current.x));
            beamRef.current.setAttribute("y2", String(currentPos.current.y));
          }
        },
      });
    }

    // 2. Glide the targeting reticle across orbital space
    if (reticleRef.current) {
      gsap.to(reticleRef.current, {
        x: targetNode.x,
        y: targetNode.y,
        duration: 0.55,
        ease: "expo.out",
        overwrite: "auto",
      });
    }

    // 3. Dispatch an energy pulse packet shooting from Hub to Target Node
    if (pulsePacketRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        pulsePacketRef.current,
        {
          attr: { cx: HUB.x, cy: HUB.y, r: 4.5 },
          opacity: 1,
        },
        {
          attr: { cx: targetNode.x, cy: targetNode.y, r: 3 },
          opacity: 0.9,
          duration: 0.42,
          ease: "power2.inOut",
        }
      ).to(pulsePacketRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "power1.out",
      });
    }

    // 4. Hub pulse effect on dispatch
    if (hubRingRef.current) {
      gsap.fromTo(
        hubRingRef.current,
        { attr: { r: 54 }, opacity: 0.9 },
        { attr: { r: 68 }, opacity: 0, duration: 0.45, ease: "power2.out" }
      );
    }

    // 5. Shift transition on the ledger readouts
    if (ledgerRef.current) {
      const readoutEls = ledgerRef.current.querySelectorAll("[data-telemetry-readout]");
      gsap.fromTo(
        readoutEls,
        { y: 6, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.03, ease: "power2.out" }
      );
    }
  });

  // Auto-transfer cycle (every 4.5s unless hovered)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveNode((prev) => {
        const currentIndex = NODES.findIndex((n) => n.id === prev.id);
        const nextIndex = (currentIndex + 1) % NODES.length;
        const nextNode = NODES[nextIndex]!;
        transferToNode(nextNode);
        return nextNode;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, transferToNode]);

  // Initial positioning of reticle and beam on mount
  useGSAP(
    () => {
      if (reticleRef.current) {
        gsap.set(reticleRef.current, { x: NODES[0]!.x, y: NODES[0]!.y });
      }
      if (beamRef.current) {
        beamRef.current.setAttribute("x2", String(NODES[0]!.x));
        beamRef.current.setAttribute("y2", String(NODES[0]!.y));
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={styles.openArchCanvas}
      aria-label="Interactive architecture capabilities schematic"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Bar */}
      <div className={styles.archHeader}>
        <div className={styles.archHeaderLeft}>
          <span className={styles.archDot} aria-hidden="true" />
          <span className={styles.archTitle}>SYSTEM ARCHITECTURE · CAPABILITIES</span>
        </div>
        <div className={styles.archStatus}>
          <span className={styles.archStatusText}>[ ACTIVE 2026 · ALL SYSTEMS LIVE ]</span>
        </div>
      </div>

      {/* Interactive SVG Schematic */}
      <div className={styles.archSvgWrapper}>
        <svg
          viewBox="0 0 760 440"
          className={styles.hudSvg}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Technical Grid Hairlines */}
          <line
            x1="40"
            y1="220"
            x2="720"
            y2="220"
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray="2 6"
            strokeOpacity="0.6"
          />
          <line
            x1="380"
            y1="30"
            x2="380"
            y2="410"
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray="2 6"
            strokeOpacity="0.6"
          />

          {/* Corner Precision Calipers */}
          <path d="M 20 40 L 20 20 L 40 20" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M 740 40 L 740 20 L 720 20" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M 20 400 L 20 420 L 40 420" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M 740 400 L 740 420 L 720 420" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Crosshair precision marks */}
          <g stroke="var(--color-line)" strokeWidth="1" opacity="0.7">
            <line x1="75" y1="95" x2="85" y2="95" />
            <line x1="80" y1="90" x2="80" y2="100" />
            <line x1="675" y1="95" x2="685" y2="95" />
            <line x1="680" y1="90" x2="680" y2="100" />
            <line x1="75" y1="345" x2="85" y2="345" />
            <line x1="80" y1="340" x2="80" y2="350" />
            <line x1="675" y1="345" x2="685" y2="345" />
            <line x1="680" y1="340" x2="680" y2="350" />
          </g>

          {/* Large Outer Radar Guide Ring */}
          <circle
            cx="380"
            cy="220"
            r="150"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray="1 8"
            strokeOpacity="0.6"
          />

          {/* 4 Passive Dashed Connection Lines */}
          {NODES.map((node) => (
            <line
              key={`passive-${node.id}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={node.x}
              y2={node.y}
              stroke="var(--color-line)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
          ))}

          {/* Dynamic Active Vector Beam (Smoothly Shifts Endpoint) */}
          <line
            ref={beamRef}
            x1={HUB.x}
            y1={HUB.y}
            x2={NODES[0]!.x}
            y2={NODES[0]!.y}
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            className={styles.dynamicBeam}
          />

          {/* Animated Transfer Pulse Packet along the Beam */}
          <circle
            ref={pulsePacketRef}
            cx={HUB.x}
            cy={HUB.y}
            r="0"
            fill="var(--color-ink)"
            opacity="0"
            className={styles.pulsePacket}
          />

          {/* Center Hub Architecture */}
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="78"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          {/* Dispatch Ripple Ring */}
          <circle
            ref={hubRingRef}
            cx={HUB.x}
            cy={HUB.y}
            r="54"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1.5"
            opacity="0"
          />
          {/* Solid Center Hub Circle */}
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r="54"
            fill="var(--color-paper)"
            stroke="var(--color-ink)"
            strokeWidth="2.25"
          />
          <text
            x={HUB.x}
            y={HUB.y - 6}
            textAnchor="middle"
            fill="var(--color-ink)"
            fontSize="12"
            fontWeight="800"
            fontFamily="var(--font-mono)"
            letterSpacing="0.14em"
          >
            SUYASH.DEV
          </text>
          <text
            x={HUB.x}
            y={HUB.y + 12}
            textAnchor="middle"
            fill="var(--color-muted)"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.1em"
          >
            CORE STACK
          </text>

          {/* Gliding Target Reticle Group */}
          <g ref={reticleRef} className={styles.glidingReticle}>
            {/* Dotted Radar Orbit Ring */}
            <circle
              cx="0"
              cy="0"
              r="40"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="1.5"
              strokeDasharray="3 4"
              className={styles.reticleOrbitRing}
            />
            {/* Ambient Aura Ring */}
            <circle
              cx="0"
              cy="0"
              r="46"
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1"
              strokeDasharray="1 6"
              opacity="0.7"
            />
            {/* Corner Caliper Ticks */}
            <path d="M -36 -28 L -36 -36 L -28 -36" stroke="var(--color-ink)" strokeWidth="1.5" />
            <path d="M 36 -28 L 36 -36 L 28 -36" stroke="var(--color-ink)" strokeWidth="1.5" />
            <path d="M -36 28 L -36 36 L -28 36" stroke="var(--color-ink)" strokeWidth="1.5" />
            <path d="M 36 28 L 36 36 L 28 36" stroke="var(--color-ink)" strokeWidth="1.5" />
          </g>

          {/* 4 Satellite Nodes */}
          {NODES.map((node) => {
            const isActive = activeNode.id === node.id;
            const isTop = node.y < 220;
            return (
              <g
                key={node.id}
                className={styles.nodeGroup}
                onMouseEnter={() => transferToNode(node)}
                onClick={() => transferToNode(node)}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${node.name}`}
              >
                {/* Generous Click / Hover Hit Target */}
                <circle cx={node.x} cy={node.y} r="48" fill="transparent" />

                {/* Satellite Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="30"
                  fill={isActive ? "var(--color-ink)" : "var(--color-paper)"}
                  stroke={isActive ? "var(--color-ink)" : "var(--color-line)"}
                  strokeWidth="2"
                  className={styles.nodeCircle}
                  style={{
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    transformOrigin: `${node.x}px ${node.y}px`,
                  }}
                />

                {/* Node Badge */}
                <text
                  x={node.x}
                  y={node.y + 4.5}
                  textAnchor="middle"
                  fill={isActive ? "var(--color-paper)" : "var(--color-ink)"}
                  fontSize="9.5"
                  fontWeight="800"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  className={styles.nodeText}
                >
                  {node.badge}
                </text>

                {/* Category Title Label */}
                <text
                  x={node.x}
                  y={isTop ? node.y - 44 : node.y + 52}
                  textAnchor="middle"
                  fill={isActive ? "var(--color-ink)" : "var(--color-muted)"}
                  fontSize="9.5"
                  fontWeight={isActive ? "800" : "600"}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.1em"
                  className={styles.nodeLabelText}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Specification Ledger with Clear Readouts */}
      <div ref={ledgerRef} className={styles.archLedger}>
        <div className={styles.ledgerColumnsGrid}>
          <div className={styles.ledgerGridCol}>
            <span className={styles.telemetryLabel}>SELECTED FOCUS</span>
            <span data-telemetry-readout className={styles.telemetryValue}>
              {activeNode.name}
            </span>
          </div>
          <div className={styles.ledgerGridCol}>
            <span className={styles.telemetryLabel}>KEY RESULT / METRIC</span>
            <span data-telemetry-readout className={styles.telemetryHighlight}>
              {activeNode.metric}
            </span>
          </div>
          <div className={styles.ledgerGridCol}>
            <span className={styles.telemetryLabel}>CORE TECH STACK</span>
            <span data-telemetry-readout className={styles.telemetryValue}>
              {activeNode.stack}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
