"use client";

import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import styles from "./Positioning.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
}

interface SubPoint {
  num: string;
  label: string;
}

interface PillarItem {
  id: string;
  number: string;
  title: string;
  description: string;
  subPoints: SubPoint[];
}

const pillarsData: PillarItem[] = [
  {
    id: "product-engineering",
    number: "01.",
    title: "Product Engineering",
    description:
      "Translating complex product vision into high-impact digital experiences. I engineer scalable web applications where intuitive design systems, fluid micro-interactions, and verified business logic operate in seamless cohesion.",
    subPoints: [
      { num: "01", label: "Design Systems & Component Architecture" },
      { num: "02", label: "Fluid Motion & Micro-Interactions" },
      { num: "03", label: "Responsive & Accessible UX Patterns" },
    ],
  },
  {
    id: "ai-systems",
    number: "02.",
    title: "AI & Intelligent Systems",
    description:
      "Integrating reasoning models, retrieval-augmented pipelines, and autonomous agent workflows. I construct systems where AI delivers tangible product leverage—semantic search, contextual agents, and high-throughput vector pipelines without gimmicks.",
    subPoints: [
      { num: "01", label: "RAG & Vector Retrieval Architectures" },
      { num: "02", label: "LLM Tool Calling & Multi-Agent Flows" },
      { num: "03", label: "Semantic Search & Embeddings Pipelines" },
    ],
  },
  {
    id: "fullstack-architecture",
    number: "03.",
    title: "Full-Stack Architecture",
    description:
      "Engineering resilient foundations from relational database schemas to low-latency edge APIs. Building end-to-end cloud infrastructure that scales effortlessly while maintaining strict type safety, data integrity, and developer velocity.",
    subPoints: [
      { num: "01", label: "Type-Safe REST & GraphQL APIs" },
      { num: "02", label: "PostgreSQL Schema Design & Migrations" },
      { num: "03", label: "Edge Deployment & CI/CD Pipelines" },
    ],
  },
  {
    id: "performance-systems",
    number: "04.",
    title: "Performance & Systems",
    description:
      "Optimizing every millisecond across the critical rendering path and server runtime. Eliminating hydration bottlenecks, minimizing JavaScript payload, and engineering sub-second page transitions with zero cumulative layout shift.",
    subPoints: [
      { num: "01", label: "Core Web Vitals & Zero-CLS Engineering" },
      { num: "02", label: "React Server Component Streaming" },
      { num: "03", label: "Bundle Optimization & Memory Profiling" },
    ],
  },
];

export function PositioningAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  const isManualTransition = useRef(false);
  const lockTimer = useRef<NodeJS.Timeout | null>(null);

  // Smooth click selection decoupled from ScrollTrigger feedback loop
  const selectIndex = useCallback((index: number) => {
    setActiveIndex(index);
    isManualTransition.current = true;

    if (lockTimer.current) clearTimeout(lockTimer.current);

    if (scrollTriggerInstance.current && window.innerWidth >= 960) {
      const st = scrollTriggerInstance.current;
      const progress = index / (pillarsData.length - 1);
      const targetScroll = st.start + progress * (st.end - st.start);

      gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          lockTimer.current = setTimeout(() => {
            isManualTransition.current = false;
          }, 80);
        },
      });
    } else {
      lockTimer.current = setTimeout(() => {
        isManualTransition.current = false;
      }, 350);
    }
  }, []);

  // GSAP ScrollTrigger sticky pinning & scrubbing
  useGSAP(
    () => {
      const isMobile = window.innerWidth < 960;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isMobile || prefersReducedMotion || !trackRef.current || !stickyContainerRef.current) {
        return;
      }

      const totalItems = pillarsData.length;

      const st = ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: `+=${totalItems * 420}px`,
        pin: stickyContainerRef.current,
        pinSpacing: true,
        scrub: 0.35,
        onUpdate: (self) => {
          if (isManualTransition.current) return;
          const progress = self.progress;
          const step = Math.min(
            totalItems - 1,
            Math.max(0, Math.floor(progress * totalItems))
          );
          setActiveIndex((prev) => (prev === step ? prev : step));
        },
      });

      scrollTriggerInstance.current = st;

      return () => {
        st.kill();
      };
    },
    { scope: trackRef }
  );

  const progressPercent = (activeIndex / (pillarsData.length - 1)) * 100;

  return (
    <div ref={trackRef} className={styles.stickyTrack}>
      <div ref={stickyContainerRef} className={styles.stickyWrapper}>
        <div className="container">
          {/* Top Scrubber Progress Bar */}
          <div className={styles.scrubberContainer} aria-hidden="true">
            <div className={styles.scrubberLine}>
              <div
                className={styles.scrubberDot}
                style={{ left: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className={styles.inner}>
            {/* Left Column: Statement & Meta */}
            <div className={styles.leftCol}>
              <div className={styles.labelRow}>
                <p className={styles.label}>Position</p>
                <span className={styles.stepCounter}>
                  {String(activeIndex + 1).padStart(2, "0")} / 04
                </span>
              </div>

              <h2 className={styles.statement}>
                <span className={styles.statementLine}>
                  <span className={styles.statementLineInner}>I build products</span>
                </span>
                <span className={styles.statementLine}>
                  <span className={styles.statementLineInner}>where engineering,</span>
                </span>
                <span className={styles.statementLine}>
                  <span className={styles.statementLineInner}>design and</span>
                </span>
                <span className={styles.statementLine}>
                  <span className={styles.statementLineInner}>intelligence meet.</span>
                </span>
              </h2>

              <p className={styles.supporting}>
                From AI-powered platforms to scalable web applications, I turn
                complex technical problems into products that feel clear, fast,
                and intuitive.
              </p>
            </div>

            {/* Right Column: Fluid 4-Pillar Editorial Accordion */}
            <div className={styles.rightCol}>
              <div className={styles.accordion}>
                {pillarsData.map((item, index) => {
                  const isOpen = activeIndex === index;
                  const panelId = `pillar-panel-${item.id}`;
                  const triggerId = `pillar-trigger-${item.id}`;

                  return (
                    <div
                      key={item.id}
                      className={`${styles.item} ${isOpen ? styles.open : styles.closed}`}
                    >
                      <h3 className={styles.itemHeading}>
                        <button
                          id={triggerId}
                          type="button"
                          className={styles.itemHeader}
                          onClick={() => selectIndex(index)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                        >
                          <div className={styles.itemHeaderMain}>
                            <span className={styles.itemNumber}>{item.number}</span>
                            <span className={styles.itemTitle}>{item.title}</span>
                          </div>

                          <span className={styles.arrowIcon} aria-hidden="true">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="17" y1="7" x2="7" y2="17" />
                              <polyline points="17 17 7 17 7 7" />
                            </svg>
                          </span>
                        </button>
                      </h3>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        className={styles.panel}
                      >
                        <div className={styles.panelInner}>
                          <p className={styles.description}>{item.description}</p>
                          <ul className={styles.subList} aria-label={`${item.title} deliverables`}>
                            {item.subPoints.map((sub) => (
                              <li key={sub.num} className={styles.subItem}>
                                <span className={styles.subNum}>{sub.num}</span>
                                <span className={styles.subLabel}>{sub.label}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
