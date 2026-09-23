"use client";

import Script from "next/script";
import { siteConfig } from "@/content/site";

// Declare window gtag types for type safety across the project
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

interface GoogleAnalyticsProps {
  gaId?: string;
}

/**
 * Google Analytics 4 (gtag.js) Component
 * - Implements measurement ID G-H80QF4E239 with fallback to NEXT_PUBLIC_GA_ID
 * - Uses Next.js Script with strategy="afterInteractive" to ensure zero CLS & non-blocking execution
 */
export function GoogleAnalytics({ gaId = siteConfig.googleAnalyticsId }: GoogleAnalyticsProps) {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Helper to dispatch custom Google Analytics events safely
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}
