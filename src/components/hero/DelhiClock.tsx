"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export function DelhiClock() {
  const [timeStr, setTimeStr] = useState<string | null>(null);

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      // Format time in Delhi timezone (Asia/Kolkata)
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTimeStr(formatted);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={styles.clockValue} suppressHydrationWarning>
      {timeStr ? `${timeStr} IST` : "12:00:00 IST"}
    </span>
  );
}
