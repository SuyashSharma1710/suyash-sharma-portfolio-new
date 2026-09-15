import React from "react";
import { LogoPrimary } from "./LogoPrimary";
import { LogoConvergence, LogoProps } from "./LogoConvergence";
import { LogoAperture } from "./LogoAperture";
import { LogoMonolith } from "./LogoMonolith";

export type LogoVariant = "primary" | "convergence" | "aperture" | "monolith";

export interface UnifiedLogoProps extends LogoProps {
  variant?: LogoVariant;
}

/**
 * Universal Brand Logo component for Suyash Sharma
 */
export function Logo({
  variant = "primary",
  ...props
}: UnifiedLogoProps) {
  switch (variant) {
    case "convergence":
      return <LogoConvergence {...props} />;
    case "aperture":
      return <LogoAperture {...props} />;
    case "monolith":
      return <LogoMonolith {...props} />;
    case "primary":
    default:
      return <LogoPrimary {...props} />;
  }
}
