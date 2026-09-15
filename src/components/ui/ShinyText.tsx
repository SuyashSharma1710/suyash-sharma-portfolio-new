import React from "react";
import styles from "./ShinyText.module.css";

export interface ShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
  speed?: number;
  disabled?: boolean;
}

export function ShinyText({
  children,
  className = "",
  speed = 4,
  disabled = false,
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`${styles.shinyText} ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {children}
    </span>
  );
}
