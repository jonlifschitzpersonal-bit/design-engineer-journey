// Figma: 02 - Components › StatusBadge

const LABELS = {
  active: "Activo",
  paused: "Pausado",
  error: "Error",
};

// Cada estado usa sus tokens de feedback (leídos de las variantes en Figma)
const COLORS = {
  active: "bg-feedback-positive-subtle text-feedback-positive",
  paused: "bg-feedback-neutral-subtle text-feedback-neutral",
  error: "bg-feedback-negative-subtle text-feedback-negative",
};

export function StatusBadge({ status = "active" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-label-xs ${COLORS[status]}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      <span>{LABELS[status]}</span>
    </span>
  );
}
