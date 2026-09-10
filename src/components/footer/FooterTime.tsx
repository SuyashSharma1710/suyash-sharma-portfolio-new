"use client";

/**
 * FooterTime — decorative local time display
 * Client component — reads clock, updates every minute
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
        hour12: false,
      });

    setTime(format());
    const id = setInterval(() => setTime(format()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <time
      className={styles.time}
      dateTime={new Date().toISOString()}
      aria-label={`Local time in Delhi: ${time}`}
      title="Local time (IST)"
    >
      IST {time}
    </time>
  );
}
