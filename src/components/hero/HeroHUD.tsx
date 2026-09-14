"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

interface SystemNode {
  id: string;
  name: string;
  label: string;
  category: string;
  metric: string;
  stack: string;
  coord: string;
  x: number;
  y: number;
}

const NODES: SystemNode[] = [
  {
    id: "ai",
    name: "Glint AI Engine",
    label: "AI & RAG PIPELINE",
    category: "Vector & Lexical Search",
    metric: "Latency: <18ms · Local ONNX",
    stack: "Rust · ONNX · BM25 Search",
    coord: "LOC · 38.2°N 0x1A",
    x: 140,
    y: 95,
  },
  {
    id: "perf",
    name: "PixelSpace Engine",
    label: "C++ HIGH-PERFORMANCE",
    category: "High-Throughput SIMD",
    metric: "-94.2% Compression Ratio",
    stack: "C++ · Electron · Sharp SIMD",
    coord: "LOC · 72.5°E 0x2B",
    x: 620,
    y: 95,
  },
  {
    id: "fullstack",
    name: "Pitchery Platform",
    label: "FULL-STACK CLOUD",
    category: "Distributed Web Architecture",
    metric: "Edge-Rendered · Zero Cold Start",
    stack: "Next.js 15 · Neon · React 19",
    coord: "LOC · 14.8°S 0x3C",
    x: 140,
    y: 345,
  },
  {
    id: "infra",
    name: "System Reliability",
    label: "CORE INFRASTRUCTURE",
    category: "Reliable Production Systems",
    metric: "99.9% Pipeline Uptime",
    stack: "TypeScript · Python · Docker",
    coord: "LOC · 91.0°W 0x4D",
    x: 620,
    y: 345,
  },
];

export function HeroHUD() {
  const [activeNode, setActiveNode] = useState<SystemNode>(NODES[0]!);

  return (
    <div className={styles.openArchCanvas} aria-label="Interactive architecture telemetry schematic">
      {/* Top Header Bar */}
      <div className={styles.archHeader}>
        <div className={styles.archHeaderLeft}>
          <span className={styles.archDot} aria-hidden="true" />
          <span className={styles.archTitle}>SYSTEM ARCHITECTURE · TELEMETRY</span>
        </div>
        <div className={styles.archStatus}>
          <span className={styles.archStatusText}>[ ACTIVE 2026 · ALL SUBSYSTEMS NOMINAL ]</span>
        </div>
      </div>

      {/* Expanded Proportional SVG Architecture Schematic (760x440 viewBox) */}
      <div className={styles.archSvgWrapper}>
        <svg
          viewBox="0 0 760 440"
          className={styles.hudSvg}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Technical Grid Hairlines */}
          <line x1="40" y1="220" x2="720" y2="220" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 6" strokeOpacity="0.6" />
          <line x1="380" y1="30" x2="380" y2="410" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 6" strokeOpacity="0.6" />

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

          {/* Large Outer Radar / Orbital Guide Ring */}
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

          {/* Connection Lines from Hub to Satellites */}
          {NODES.map((node) => {
            const isActive = activeNode.id === node.id;
            return (
              <g key={`connection-${node.id}`}>
                {/* Background dashed line */}
                <line
                  x1="380"
                  y1="220"
                  x2={node.x}
                  y2={node.y}
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                />
                {/* Active connecting vector line */}
                {isActive && (
                  <line
                    x1="380"
                    y1="220"
                    x2={node.x}
                    y2={node.y}
                    stroke="var(--color-ink)"
                    strokeWidth="2.5"
                    className={styles.svgLine}
                  />
                )}
              </g>
            );
          })}

          {/* Center Hub Architecture */}
          {/* Orbital dashed ring with degree ticks */}
          <circle
            cx="380"
            cy="220"
            r="78"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          {/* Solid Center Hub Circle */}
          <circle
            cx="380"
            cy="220"
            r="54"
            fill="var(--color-paper)"
            stroke="var(--color-ink)"
            strokeWidth="2.25"
          />
          <text
            x="380"
            y="214"
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
            x="380"
            y="232"
            textAnchor="middle"
            fill="var(--color-muted)"
            fontSize="8"
            fontWeight="700"
            fontFamily="var(--font-mono)"
            letterSpacing="0.1em"
          >
            CORE SYSTEM
          </text>

          {/* 4 Interactive Satellite Nodes */}
          {NODES.map((node) => {
            const isActive = activeNode.id === node.id;
            const isTop = node.y < 220;
            return (
              <g
                key={node.id}
                className={styles.nodeGroup}
                onMouseEnter={() => setActiveNode(node)}
                onClick={() => setActiveNode(node)}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${node.name}`}
              >
                {/* Generous Click / Hover Hit Target */}
                <circle cx={node.x} cy={node.y} r="48" fill="transparent" />

                {/* Active Outer Pulsing Orbit Ring */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="40"
                    fill="none"
                    stroke="var(--color-ink)"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                  />
                )}

                {/* Main Satellite Badge */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="30"
                  fill={isActive ? "var(--color-ink)" : "var(--color-paper)"}
                  stroke={isActive ? "var(--color-ink)" : "var(--color-line)"}
                  strokeWidth="2"
                  className={styles.nodeCircle}
                />

                {/* Node Acronym */}
                <text
                  x={node.x}
                  y={node.y + 4.5}
                  textAnchor="middle"
                  fill={isActive ? "var(--color-paper)" : "var(--color-ink)"}
                  fontSize="9.5"
                  fontWeight="800"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                >
                  {node.id.toUpperCase()}
                </text>

                {/* Satellite Category Title Label */}
                <text
                  x={node.x}
                  y={isTop ? node.y - 42 : node.y + 50}
                  textAnchor="middle"
                  fill={isActive ? "var(--color-ink)" : "var(--color-muted)"}
                  fontSize="9"
                  fontWeight={isActive ? "800" : "600"}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.1em"
                >
                  {node.label}
                </text>

                {/* Subsystem Coordinate Identifier */}
                <text
                  x={node.x}
                  y={isTop ? node.y - 56 : node.y + 64}
                  textAnchor="middle"
                  fill="var(--color-muted)"
                  fontSize="7"
                  fontWeight="500"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  opacity={isActive ? "0.9" : "0.5"}
                >
                  {node.coord}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Specification Ledger — Unified full-width architectural telemetry display */}
      <div className={styles.archLedger}>
        <div className={styles.ledgerColumnsGrid}>
          <div className={styles.ledgerGridCol}>
            <span className={styles.telemetryLabel}>INSPECTED SUBSYSTEM</span>
            <span className={styles.telemetryValue}>{activeNode.name}</span>
          </div>
          <div className={styles.ledgerGridCol}>
            <span className={styles.telemetryLabel}>DOMAIN / METRIC</span>
            <span className={styles.telemetryHighlight}>{activeNode.metric}</span>
          </div>
          <div className={styles.ledgerGridCol}>
            <span className={styles.telemetryLabel}>TECH ARCHITECTURE</span>
            <span className={styles.telemetryValue}>{activeNode.stack}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
