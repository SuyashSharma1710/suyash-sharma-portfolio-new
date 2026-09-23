/**
 * Google Consent Mode v2 State Management
 * Follows official Google Tag Platform specifications:
 * - ad_storage
 * - ad_user_data
 * - ad_personalization
 * - analytics_storage
 */

export const CONSENT_STORAGE_KEY = "portfolio_cookie_consent_v2";

export interface ConsentPreferences {
  analytics: boolean;
  ads: boolean;
  timestamp: string;
}

export const DEFAULT_CONSENT: ConsentPreferences = {
  analytics: false,
  ads: false,
  timestamp: "",
};

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPreferences;
  } catch {
    return null;
  }
}

/**
 * Updates Google Consent Mode v2 parameters and persists user preference
 */
export function updateConsentState(preferences: { analytics: boolean; ads: boolean }) {
  if (typeof window === "undefined") return;

  const payload = {
    ad_storage: preferences.ads ? ("granted" as const) : ("denied" as const),
    ad_user_data: preferences.ads ? ("granted" as const) : ("denied" as const),
    ad_personalization: preferences.ads ? ("granted" as const) : ("denied" as const),
    analytics_storage: preferences.analytics ? ("granted" as const) : ("denied" as const),
  };

  // Push update to Google Tag Manager / gtag.js
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", payload);
  }

  const record: ConsentPreferences = {
    analytics: preferences.analytics,
    ads: preferences.ads,
    timestamp: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch (err) {
    console.error("Could not save consent preferences to localStorage", err);
  }

  // Notify components about consent update
  window.dispatchEvent(new CustomEvent("portfolio-consent-updated", { detail: record }));
}

/**
 * Programmatically open the consent modal/banner from anywhere (e.g. Footer)
 */
export function openConsentSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("portfolio-open-consent-settings"));
}
