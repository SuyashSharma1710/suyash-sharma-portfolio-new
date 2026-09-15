import React from "react";
import styles from "./GradualBlur.module.css";

export interface GradualBlurProps {
  /**
   * Overall height of the blur gradient region
   * Defaults to `calc(var(--nav-height) + 2.5rem)`
   */
  height?: string;
  /**
   * Whether the blur gradient is currently active / visible
   */
  visible?: boolean;
  /**
   * Whether to render the subtle 1px hairline division
   */
  showHairline?: boolean;
  /**
   * Additional custom CSS classes
   */
  className?: string;
}

/**
 * GradualBlur — Progressive Optical Depth-of-Field Blur
 * Inspired by React Bits & Swiss editorial UI design.
 * Creates a stepped multi-layer progressive backdrop blur mask.
 */
export function GradualBlur({
  height = "calc(var(--nav-height) + 2.5rem)",
  visible = true,
  showHairline = true,
  className = "",
}: GradualBlurProps) {
  return (
    <div
      className={`${styles.blurWrapper} ${className}`}
      style={{
        height,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <div className={`${styles.layer} ${styles.layer1}`} />
      <div className={`${styles.layer} ${styles.layer2}`} />
      <div className={`${styles.layer} ${styles.layer3}`} />
      <div className={`${styles.layer} ${styles.layer4}`} />
      {showHairline && <div className={styles.hairline} />}
    </div>
  );
}
