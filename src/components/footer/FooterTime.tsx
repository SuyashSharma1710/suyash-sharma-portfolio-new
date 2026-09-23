"use client";

/**
 * FooterTime — live local time and location telemetry display
 * Updates smoothly every second with IST timezone accuracy
 */
import { useEffect, useState } from "react";
import styles from "./Footer.module.css";

export function FooterTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <span className={styles.telemetryTime}>
        <span className={styles.telemetryPulse} aria-hidden="true" />
        <span>DELHI, IN · IST</span>
      </span>
    );
  }

  return (
    <div className={styles.telemetryTime} title="Live Local Time in Delhi, India (IST)">
      <span className={styles.telemetryPulse} aria-hidden="true" />
      <time dateTime={new Date().toISOString()} aria-label={`Local time in Delhi: ${time} IST`}>
        DELHI, IN · IST {time}
      </time>
    </div>
  );
}
