import { Icon } from "../../P.1-componentes-props-jsx/componentes/Icon";

// Figma: 02 - Components › MetricCard
// Misma lógica que en la P.1: lo único que cambia es cómo se escriben los estilos.

const TREND_ICON = {
  up: "arrow-up",
  down: "arrow-down",
  neutral: "minus",
};

// Clases completas en un mapa: Tailwind solo genera las clases que encuentra escritas enteras.
const TREND_COLOR = {
  up: "text-feedback-positive",
  down: "text-feedback-negative",
  neutral: "text-feedback-neutral",
};

function trendText(trend, trendValue) {
  if (trend === "up") return `Subió ${trendValue} respecto del período anterior`;
  if (trend === "down") return `Bajó ${trendValue} respecto del período anterior`;
  return `Sin cambios (${trendValue}) respecto del período anterior`;
}

const CARD = "flex flex-col items-start gap-3 rounded-lg border border-border-default bg-bg-surface p-5";

export function MetricCard({
  title,
  value,
  trendValue,
  icon,
  showTrend = true,
  state = "default",
  trend = "up",
}) {
  if (state === "loading") {
    return (
      <article className={CARD} aria-busy="true">
        <div className="size-10 rounded-full bg-bg-skeleton" aria-hidden="true" />
        <span className="h-5 w-40 max-w-full rounded-sm bg-bg-skeleton" aria-hidden="true" />
        <span className="h-9 w-24 rounded-sm bg-bg-skeleton" aria-hidden="true" />
        <span className="h-5 w-12 rounded-sm bg-bg-skeleton" aria-hidden="true" />
        <p className="sr-only">Cargando</p>
      </article>
    );
  }

  return (
    <article className={CARD}>
      <div
        className="grid size-10 place-items-center rounded-full bg-bg-accent-subtle text-icon-accent *:size-5"
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3 className="text-body-sm text-text-muted">{title}</h3>

      {state === "error" ? (
        <>
          <p className="text-heading-metric text-text-muted" aria-hidden="true">—</p>
          <p className="text-body-sm text-text-muted">No se pudo cargar</p>
        </>
      ) : (
        <>
          <p className="text-heading-metric tabular-nums">{value}</p>

          {showTrend && (
            <p className={`flex items-center gap-1 text-label-sm ${TREND_COLOR[trend]}`}>
              <Icon name={TREND_ICON[trend]} className="size-3.5" />
              <span aria-hidden="true">{trendValue}</span>
              <span className="sr-only">{trendText(trend, trendValue)}</span>
            </p>
          )}
        </>
      )}
    </article>
  );
}
