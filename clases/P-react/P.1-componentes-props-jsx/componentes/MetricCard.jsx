import { Icon } from "./Icon";

// Figma: 02 - Components › MetricCard
// Reglas que salen de la descripción del componente:
// - En loading y en error no hay tendencia (ignoran trend y showTrend).
// - En loading tampoco se ve el ícono.
// - En error, el valor es fijo: "—".

const TREND_ICON = {
  up: "arrow-up",
  down: "arrow-down",
  neutral: "minus",
};

// Lo que escucha el lector de pantalla en lugar de la flecha y el color
function trendText(trend, trendValue) {
  if (trend === "up") return `Subió ${trendValue} respecto del período anterior`;
  if (trend === "down") return `Bajó ${trendValue} respecto del período anterior`;
  return `Sin cambios (${trendValue}) respecto del período anterior`;
}

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
      <article className="metric-card" data-state="loading" aria-busy="true">
        <div className="metric-card__icon-wrapper" aria-hidden="true" />
        <span className="metric-card__skeleton metric-card__skeleton--title" aria-hidden="true" />
        <span className="metric-card__skeleton metric-card__skeleton--value" aria-hidden="true" />
        <span className="metric-card__skeleton metric-card__skeleton--trend" aria-hidden="true" />
        <p className="metric-card__loading visually-hidden">Cargando</p>
      </article>
    );
  }

  return (
    <article className="metric-card" data-state={state} data-trend={trend}>
      <div className="metric-card__icon-wrapper" aria-hidden="true">
        {icon}
      </div>

      <h3 className="metric-card__title text-body-sm">{title}</h3>

      {state === "error" ? (
        <>
          <p className="metric-card__empty text-heading-metric" aria-hidden="true">—</p>
          <p className="metric-card__error text-body-sm">No se pudo cargar</p>
        </>
      ) : (
        <>
          <p className="metric-card__value text-heading-metric">{value}</p>

          {showTrend && (
            <p className="metric-card__trend text-label-sm">
              <Icon name={TREND_ICON[trend]} className="metric-card__trend-icon" />
              <span className="metric-card__trend-value" aria-hidden="true">{trendValue}</span>
              <span className="visually-hidden">{trendText(trend, trendValue)}</span>
            </p>
          )}
        </>
      )}
    </article>
  );
}
