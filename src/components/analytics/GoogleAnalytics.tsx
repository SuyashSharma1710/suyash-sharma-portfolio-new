"use client";

import Script from "next/script";
import { siteConfig } from "@/content/site";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";

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
 * Google Analytics 4 (gtag.js) Component with Google Consent Mode v2
 * - Implements measurement ID G-H80QF4E239 with fallback to NEXT_PUBLIC_GA_ID
 * - Implements official Google Consent Mode v2:
 *   - ad_storage ('denied' by default)
 *   - ad_user_data ('denied' by default)
 *   - ad_personalization ('denied' by default)
 *   - analytics_storage ('denied' by default)
 *   - wait_for_update: 500
 *   - ads_data_redaction: true
 *   - url_passthrough: true
 * - Restores prior user consent from localStorage immediately on boot
 * - Uses Next.js Script with strategy="afterInteractive" to guarantee zero CLS & non-blocking execution
 */
export function GoogleAnalytics({ gaId = siteConfig.googleAnalyticsId }: GoogleAnalyticsProps) {
  if (!gaId) return null;

  return (
    <>
      {/* 1. Google Consent Mode v2 Defaults Initialization (Must execute before tag config) */}
      <Script
        id="google-consent-mode-v2-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Check if user has previously made a consent choice
            var savedConsent = null;
            try {
              var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
              if (raw) savedConsent = JSON.parse(raw);
            } catch(e) {}

            if (savedConsent) {
              gtag('consent', 'default', {
                'ad_storage': savedConsent.ads ? 'granted' : 'denied',
                'ad_user_data': savedConsent.ads ? 'granted' : 'denied',
                'ad_personalization': savedConsent.ads ? 'granted' : 'denied',
                'analytics_storage': savedConsent.analytics ? 'granted' : 'denied',
                'wait_for_update': 500
              });
            } else {
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
              });
            }

            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `,
        }}
      />

      {/* 2. Load Google Tag Manager / gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />

      {/* 3. Configure Google Analytics */}
      <Script
        id="google-analytics-config"
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
