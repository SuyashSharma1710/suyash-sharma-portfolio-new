import Link from "next/link";

export default function NotFound() {
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
    >
      <h1>404 — Page Not Found</h1>
      <p style={{ color: "var(--color-muted)" }}>
        The page you are looking for does not exist.
      </p>
      <div>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "var(--space-2) var(--space-4)",
            backgroundColor: "var(--color-surface-light)",
            color: "var(--color-ink)",
            border: "1px solid var(--color-line)",
            borderRadius: "4px",
          }}
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
