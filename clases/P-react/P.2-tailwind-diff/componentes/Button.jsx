// Figma: 02 - Components › Button (acá solo la variante secondary, la que usa Resumen)
// state=hover y state=focus de Figma → prefijos hover: y focus-visible:
// state=disabled → prop disabled + prefijo disabled:

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2.5 " +
  "focus-visible:outline-2 focus-visible:outline-focus-ring " +
  "disabled:cursor-not-allowed disabled:text-text-disabled";

const VARIANTS = {
  secondary:
    "text-action-secondary-text inset-ring inset-ring-action-secondary-border " +
    "hover:bg-action-subtle-bg-hover focus-visible:inset-ring-0 " +
    "disabled:bg-transparent disabled:inset-ring-action-disabled-bg",
};

const TEXT_STYLE = {
  md: "text-label-md",
  sm: "text-label-sm",
};

export function Button({
  children,
  variant = "secondary",
  size = "md",
  iconStart,
  loading = false,
  disabled = false,
  className = "",
  onClick,
}) {
  return (
    <button
      type="button"
      className={`${BASE} ${VARIANTS[variant]} ${TEXT_STYLE[size]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      onClick={onClick}
    >
      {loading ? <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" /> : iconStart}
      {children}
    </button>
  );
}
