"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="container"
      style={{
        paddingBlock: "var(--space-12)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        minHeight: "50vh",
        justifyContent: "center",
      }}
      role="alert"
    >
      <h1>Something went wrong</h1>
      <p style={{ color: "var(--color-muted)" }}>
        An unexpected error occurred.
      </p>
      <div>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: "var(--space-2) var(--space-4)",
            backgroundColor: "var(--color-surface-light)",
            color: "var(--color-ink)",
            border: "1px solid var(--color-line)",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
