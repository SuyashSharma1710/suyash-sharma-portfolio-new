import React from "react";
import type { LogoProps } from "./LogoConvergence";

/**
 * Primary Brand Logo for Suyash Sharma
 * Source: public/logos/logo.svg
 */
export function LogoPrimary(props: LogoProps) {
  const {
    size = 28,
    className = "",
    showTelemetry,
    strokeWidth,
    ...rest
  } = props;
  void showTelemetry;
  void strokeWidth;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Suyash Sharma Logo"
      {...rest}
    >
      <path
        d="M500 492C500 496.418 496.418 500 492 500H7.99999C3.58171 500 0 496.418 0 492V350.006C0 345.588 3.58172 342.006 8 342.006H89.6006L219.626 342.02C221.722 342.02 223.733 341.198 225.229 339.731L373.781 194.011C375.276 192.544 377.288 191.722 379.383 191.722H492C496.418 191.722 500 195.303 500 199.722V492ZM500 150C500 154.418 496.418 158 492 158H297.088C297.087 158 297.087 158 297.087 158.001C297.087 158.002 297.086 158.002 297.086 158.002L280.452 158C278.356 158 276.345 158.822 274.849 160.289L126.312 305.994C124.816 307.461 122.805 308.283 120.71 308.283H8C3.58173 308.283 0 304.701 0 300.283V8.00001C0 3.58173 3.58172 0 8 0H492C496.418 0 500 3.58172 500 8V150Z"
        fill="currentColor"
      />
    </svg>
  );
}
