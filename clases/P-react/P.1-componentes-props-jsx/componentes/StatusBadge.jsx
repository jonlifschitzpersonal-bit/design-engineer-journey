// Figma: 02 - Components › StatusBadge
// El texto es fijo según el estado: no es una prop, así el color y el texto
// nunca se contradicen. El punto es decorativo.

const LABELS = {
  active: "Activo",
  paused: "Pausado",
  error: "Error",
};

export function StatusBadge({ status = "active" }) {
  return (
    <span className="status-badge text-label-xs" data-status={status}>
      <span className="status-badge__dot" aria-hidden="true" />
      <span className="status-badge__label">{LABELS[status]}</span>
    </span>
  );
}
