export default function Loading() {
  return (
    <div
      className="container"
      style={{
        paddingBlock: "var(--space-12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
      }}
      aria-live="polite"
      aria-busy="true"
    >
      <p style={{ color: "var(--color-muted)", fontSize: "var(--text-sm)" }}>
        Loading...
      </p>
    </div>
  );
}
