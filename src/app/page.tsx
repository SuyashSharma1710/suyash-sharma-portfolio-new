export default function HomePage() {
  return (
    <main id="main-content" className="container" style={{ paddingBlock: "var(--space-12)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 600 }}>
          Suyash
        </h1>
        <p style={{ color: "var(--color-muted)", fontSize: "var(--text-lg)" }}>
          Foundation initialized. Ready for Phase 1.
        </p>
      </div>
    </main>
  );
}
