import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = "Suyash Sharma — Full-Stack Engineer & Systems Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0B0B0D",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.08) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)",
          color: "#F5F0E8",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          boxSizing: "border-box",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        {/* Top Bar: Telemetry & Status Badge */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Geometric Signature Mark */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M500 492C500 496.418 496.418 500 492 500H7.99999C3.58171 500 0 496.418 0 492V350.006C0 345.588 3.58172 342.006 8 342.006H89.6006L219.626 342.02C221.722 342.02 223.733 341.198 225.229 339.731L373.781 194.011C375.276 192.544 377.288 191.722 379.383 191.722H492C496.418 191.722 500 195.303 500 199.722V492ZM500 150C500 154.418 496.418 158 492 158H297.088C297.087 158 297.087 158 297.087 158.001C297.087 158.002 297.086 158.002 297.086 158.002L280.452 158C278.356 158 276.345 158.822 274.849 160.289L126.312 305.994C124.816 307.461 122.805 308.283 120.71 308.283H8C3.58173 308.283 0 304.701 0 300.283V8.00001C0 3.58173 3.58172 0 8 0H492C496.418 0 500 3.58172 500 8V150Z"
                fill="#F5F0E8"
              />
            </svg>
            <span
              style={{
                fontSize: "18px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#A1A1AA",
                fontWeight: 600,
              }}
            >
              SUYASH SHARMA · PORTFOLIO
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              fontSize: "15px",
              letterSpacing: "0.08em",
              color: "#F5F0E8",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
            <span>{siteConfig.availability.label}</span>
          </div>
        </div>

        {/* Center: Main Headline & Role Statement */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontSize: "68px",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            Suyash Sharma
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#D4D4D8",
              fontWeight: 400,
              maxWidth: "880px",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}
          >
            Full-Stack Engineer & Systems Architect building digital products where architectural rigor, design precision, and intelligent compute converge.
          </div>
        </div>

        {/* Bottom Bar: Engineering Stack & Domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "28px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {["Next.js", "React", "TypeScript", "Node.js", "Rust", "PostgreSQL", "AI / ONNX"].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: "3px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  color: "#D4D4D8",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.08em",
              color: "#A1A1AA",
              textTransform: "uppercase",
            }}
          >
            suyashsharma.dev · Delhi, India
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
