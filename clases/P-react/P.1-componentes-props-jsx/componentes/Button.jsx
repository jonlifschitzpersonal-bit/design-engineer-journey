// Figma: 02 - Components › Button
// state=hover y state=focus existen en Figma para dibujarlos: acá son :hover y
// :focus-visible en el CSS. Con loading, el spinner va en lugar del ícono.

const TEXT_STYLE = {
  md: "text-label-md",
  sm: "text-label-sm",
};

export function Button({
  children,
  variant = "primary",
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
      className={`button button--${variant} button--${size} ${TEXT_STYLE[size]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      onClick={onClick}
    >
      {loading ? <span className="button__spinner" aria-hidden="true" /> : iconStart}
      {children}
    </button>
  );
}
