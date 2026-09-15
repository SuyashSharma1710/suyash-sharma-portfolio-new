/**
 * Positioning — Section 02
 * Editorial positioning statement with interactive sticky scroll accordion
 */
import styles from "./Positioning.module.css";
import { PositioningAccordion } from "./PositioningAccordion";

export function Positioning() {
  return (
    <section id="positioning" className={styles.section} aria-label="Positioning">
      <PositioningAccordion />
    </section>
  );
}
