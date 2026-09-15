"use client";

/**
 * Capabilities — Section 04
 * Interactive Full-Section Mask Clipping Architecture & Bespoke 3D Editorial Renders
 * Governed strictly by RULES.md Rule 10.1 (Zero-Box Policy) & Centralized Motion System
 */
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { capabilities } from "@/content/capabilities";
import styles from "./Capabilities.module.css";

gsap.registerPlugin(useGSAP);

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeBgIdRef = useRef<string | null>(null);
  const zIndexCounter = useRef(10);

  const { contextSafe } = useGSAP({ scope: sectionRef });

  const getCoords = (
    e?: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    cardEl?: HTMLElement | null
  ) => {
    if (!sectionRef.current) return { x: 0, y: 0, maxRadius: 1800 };
    const secRect = sectionRef.current.getBoundingClientRect();

    let x = secRect.width / 2;
    let y = secRect.height / 2;

    if (e && "clientX" in e && typeof e.clientX === "number" && !isNaN(e.clientX) && e.clientX > 0) {
      x = Math.round(e.clientX - secRect.left);
      y = Math.round(e.clientY - secRect.top);
    } else if (cardEl) {
      const cardRect = cardEl.getBoundingClientRect();
      x = Math.round(cardRect.left + cardRect.width / 2 - secRect.left);
      y = Math.round(cardRect.top + cardRect.height / 2 - secRect.top);
    }

    // Generously calculate radius to guarantee 100% edge-to-edge coverage across all viewports
    const secHypot = Math.ceil(Math.hypot(secRect.width, secRect.height));
    const maxRadius = Math.max(secHypot * 1.5, 2400);

    return { x, y, maxRadius };
  };

  const handleCardEnter = contextSafe(
    (id: string, e?: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>) => {
      if (!sectionRef.current) return;

      const currentCard =
        (e?.currentTarget as HTMLElement) ||
        sectionRef.current.querySelector<HTMLElement>(`[data-card-id="${id}"]`);
      const targetBg = sectionRef.current.querySelector<HTMLElement>(`[data-bg-id="${id}"]`);
      const targetImg = targetBg?.querySelector<HTMLElement>(`.${styles.bgImage}`);
      const allCards = sectionRef.current.querySelectorAll<HTMLElement>("[data-card-id]");
      const allBgs = sectionRef.current.querySelectorAll<HTMLElement>("[data-bg-id]");

      if (!targetBg) return;

      // Avoid re-triggering if already active and visible
      if (activeBgIdRef.current === id && gsap.getProperty(targetBg, "opacity") === 1) {
        return;
      }

      activeBgIdRef.current = id;
      sectionRef.current.setAttribute("data-has-active", "true");

      // 1. Apple-level sibling dimming and typographic highlight
      allCards.forEach((card) => {
        if (card === currentCard) {
          card.setAttribute("data-active", "true");
          gsap.to(card, {
            opacity: 1,
            duration: 0.45,
            ease: "expo.out",
            overwrite: "auto",
          });
        } else {
          card.removeAttribute("data-active");
          gsap.to(card, {
            opacity: 0.28,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });

      // 2. Kill active tweens on the target background to prevent race conditions
      gsap.killTweensOf(targetBg);
      if (targetImg) gsap.killTweensOf(targetImg);

      const { x, y, maxRadius } = getCoords(e, currentCard);
      zIndexCounter.current += 1;

      // Bring target background to topmost layer and enable visibility for GPU compositing
      gsap.set(targetBg, {
        zIndex: zIndexCounter.current,
        opacity: 1,
        visibility: "visible",
      });

      // 3. Cinematic, slow radial circular wave expansion (clearly observable)
      gsap.fromTo(
        targetBg,
        {
          clipPath: `circle(0px at ${x}px ${y}px)`,
          webkitClipPath: `circle(0px at ${x}px ${y}px)`,
        },
        {
          clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
          webkitClipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
          duration: 1.85,
          ease: "power2.out",
          overwrite: "auto",
        }
      );

      // 4. Majestic optical camera zoom settle in sync with slow mask
      if (targetImg) {
        gsap.fromTo(
          targetImg,
          {
            scale: 1.08,
          },
          {
            scale: 1.01,
            duration: 2.2,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      }

      // 5. Silky cross-fade for inactive background layers underneath
      const inactiveBgs = Array.from(allBgs).filter((bg) => bg !== targetBg);
      if (inactiveBgs.length > 0) {
        gsap.to(inactiveBgs, {
          opacity: 0,
          duration: 1.35,
          ease: "power1.out",
          overwrite: "auto",
          onComplete: () => {
            inactiveBgs.forEach((bg) => {
              if (bg !== sectionRef.current?.querySelector(`[data-bg-id="${activeBgIdRef.current}"]`)) {
                gsap.set(bg, {
                  zIndex: 1,
                  visibility: "hidden",
                  clipPath: "circle(0px at 50% 50%)",
                  webkitClipPath: "circle(0px at 50% 50%)",
                });
                const img = bg.querySelector<HTMLElement>(`.${styles.bgImage}`);
                if (img) gsap.set(img, { x: 0, y: 0, scale: 1 });
              }
            });
          },
        });
      }
    }
  );

  const handleSectionLeave = contextSafe(() => {
    if (!sectionRef.current) return;

    activeBgIdRef.current = null;
    sectionRef.current.removeAttribute("data-has-active");

    const allCards = sectionRef.current.querySelectorAll<HTMLElement>("[data-card-id]");
    const allBgs = sectionRef.current.querySelectorAll<HTMLElement>("[data-bg-id]");

    // Restore all cards to resting state with smooth easing
    allCards.forEach((card) => {
      card.removeAttribute("data-active");
      gsap.to(card, {
        opacity: 1,
        duration: 0.85,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    // Clean, elegant fade-out of all background layers
    gsap.killTweensOf(allBgs);
    gsap.to(allBgs, {
      opacity: 0,
      duration: 1.05,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        if (!activeBgIdRef.current && sectionRef.current) {
          gsap.set(allBgs, {
            zIndex: 1,
            visibility: "hidden",
            clipPath: "circle(0px at 50% 50%)",
            webkitClipPath: "circle(0px at 50% 50%)",
          });
          allBgs.forEach((bg) => {
            const img = bg.querySelector<HTMLElement>(`.${styles.bgImage}`);
            if (img) gsap.set(img, { x: 0, y: 0, scale: 1 });
          });
          zIndexCounter.current = 10;
        }
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className={styles.section}
      onMouseLeave={handleSectionLeave}
      aria-label="What I build"
    >
      {/* Full-Section Masked Background Canvas */}
      <div className={styles.sectionBgLayer} aria-hidden="true">
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            data-bg-id={cap.id}
            className={styles.bgItem}
          >
            {cap.image && (
              <Image
                src={cap.image}
                alt={cap.title}
                fill
                priority
                sizes="100vw"
                className={styles.bgImage}
              />
            )}
            <div className={styles.bgOverlay} />
          </div>
        ))}
      </div>

      <div className={`container ${styles.containerRel}`}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.label}>Capability · What I Build</p>
            <h2 className={styles.heading}>What I Build</h2>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerBadge}>[ 04 CORE DISCIPLINES ]</span>
          </div>
        </div>

        {/* Open Editorial 2-Column Grid (Zero-Box Policy) */}
        <div className={styles.grid} aria-label="Capability areas">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              data-card-id={cap.id}
              className={styles.item}
              onMouseEnter={(e) => handleCardEnter(cap.id, e)}
              onFocus={(e) => handleCardEnter(cap.id, e)}
              tabIndex={0}
              id={`capability-${cap.id}`}
            >
              <div className={styles.topRow}>
                <div className={styles.numberBadge}>
                  <span className={styles.itemNumber}>{cap.number}</span>
                  <span className={styles.numberDot} aria-hidden="true" />
                </div>
                {cap.tagline && <span className={styles.tagline}>{cap.tagline}</span>}
                <span className={styles.cornerIcon} aria-hidden="true">
                  ↗
                </span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.itemTitle}>{cap.title}</h3>
                <p className={styles.itemDescription}>{cap.description}</p>
              </div>

              <div className={styles.bottomRow}>
                <ul className={styles.itemTechs} aria-label={`Technologies for ${cap.title}`}>
                  {cap.technologies.map((tech) => (
                    <li key={tech} className={styles.techTag}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

