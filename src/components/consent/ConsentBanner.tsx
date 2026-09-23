"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredConsent, updateConsentState } from "@/lib/consent";
import styles from "./ConsentBanner.module.css";

export function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Granular preference state
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [adsAllowed, setAdsAllowed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();

    if (!stored) {
      // Delay banner display slightly so it doesn't collide with preloader or hero intro
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsAllowed(stored.analytics);
      setAdsAllowed(stored.ads);
    }

    // Listen for manual trigger from Footer or other components
    const handleOpenSettings = () => {
      const current = getStoredConsent();
      if (current) {
        setAnalyticsAllowed(current.analytics);
        setAdsAllowed(current.ads);
      }
      setShowPreferences(true);
      setIsOpen(true);
    };

    window.addEventListener("portfolio-open-consent-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("portfolio-open-consent-settings", handleOpenSettings);
    };
  }, []);

  if (!mounted || !isOpen) return null;

  const handleAcceptAll = () => {
    updateConsentState({ analytics: true, ads: true });
    setAnalyticsAllowed(true);
    setAdsAllowed(true);
    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleEssentialOnly = () => {
    updateConsentState({ analytics: false, ads: false });
    setAnalyticsAllowed(false);
    setAdsAllowed(false);
    setIsOpen(false);
    setShowPreferences(false);
  };

  const handleSaveCustom = () => {
    updateConsentState({ analytics: analyticsAllowed, ads: adsAllowed });
    setIsOpen(false);
    setShowPreferences(false);
  };

  return (
    <aside
      className={styles.bannerContainer}
      role="region"
      aria-label="Privacy and Cookie Consent"
    >
      <div className={styles.bannerCard}>
        <div className={styles.headerRow}>
          <div className={styles.protocolBadge}>
            <span className={styles.pulseDot} aria-hidden="true" />
            <span>PRIVACY &amp; TELEMETRY // v2</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className={styles.closeButton}
            aria-label="Close consent banner"
          >
            ✕
          </button>
        </div>

        <h2 className={styles.title}>Privacy &amp; Analytics Choices</h2>
        <p className={styles.description}>
          This portfolio uses telemetry (Google Analytics 4 with Consent Mode v2) to measure performance and diagnostic signals. Read our{" "}
          <Link href="/privacy" className={styles.policyInlineLink} onClick={() => setIsOpen(false)}>
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className={styles.policyInlineLink} onClick={() => setIsOpen(false)}>
            Cookie Policy
          </Link>
          , or customize your preferences below.
        </p>

        {showPreferences && (
          <div className={styles.preferencesDrawer}>
            <div className={styles.preferenceItem}>
              <div className={styles.preferenceInfo}>
                <span className={styles.preferenceLabel}>Essential &amp; System State</span>
                <span className={styles.preferenceSub}>Theme, sound engine state, and page routing</span>
              </div>
              <div className={styles.toggleWrapper}>
                <span className={styles.alwaysActiveTag}>Required</span>
              </div>
            </div>

            <div className={styles.preferenceItem}>
              <div className={styles.preferenceInfo}>
                <span className={styles.preferenceLabel}>Analytics Telemetry</span>
                <span className={styles.preferenceSub}>Anonymous interaction metrics and error diagnosis</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  aria-label="Allow Analytics Telemetry"
                />
                <span className={styles.slider} />
              </label>
            </div>

            <div className={styles.preferenceItem}>
              <div className={styles.preferenceInfo}>
                <span className={styles.preferenceLabel}>Ad Personalization</span>
                <span className={styles.preferenceSub}>Ad storage &amp; user data (disabled by default)</span>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={adsAllowed}
                  onChange={(e) => setAdsAllowed(e.target.checked)}
                  aria-label="Allow Ad Personalization"
                />
                <span className={styles.slider} />
              </label>
            </div>
          </div>
        )}

        <div className={styles.actionsRow}>
          <button
            type="button"
            onClick={() => setShowPreferences((prev) => !prev)}
            className={styles.btnCustomize}
          >
            {showPreferences ? "Hide Settings" : "Configure"}
          </button>
          <button
            type="button"
            onClick={handleEssentialOnly}
            className={styles.btnEssential}
          >
            Essential Only
          </button>
          {showPreferences ? (
            <button
              type="button"
              onClick={handleSaveCustom}
              className={styles.btnAccept}
            >
              Save Preferences
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAcceptAll}
              className={styles.btnAccept}
            >
              Accept All
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
