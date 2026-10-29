import { Button } from "./Button";
import { Icon } from "./Icon";
import { MetricCard } from "./MetricCard";
import { StatusBadge } from "./StatusBadge";

// Datos de ejemplo. Cada `id` es el nombre de la instancia en Figma.
const metrics = [
  { id: "activeUsers", title: "Usuarios activos", value: "1.284", trend: "up", trendValue: "12%", icon: "users" },
  { id: "revenue", title: "Ingresos", value: "$ 48.920", trend: "up", trendValue: "8%", icon: "currency" },
  { id: "conversion", title: "Conversión", value: "3,2%", trend: "down", trendValue: "0,4%", icon: "percent" },
  { id: "orders", title: "Pedidos", value: "356", trend: "neutral", trendValue: "0%", icon: "package" },
];

// Figma: 05 - Screens › Resumen › summary · desktop
// Es una sección de una sola vez: se arma con componentes, no es un componente del sistema.
export function Summary() {
  return (
    <section className="summary" aria-labelledby="summary-title">
      <header className="summary__header">
        <div className="summary__heading">
          <h2 id="summary-title" className="summary__title text-heading-section">
            Resumen
            <span className="visually-hidden">, proyecto</span>
            <StatusBadge status="active" />
          </h2>
          <p className="summary__period text-body-sm">Últimos 30 días</p>
        </div>

        <Button variant="secondary" className="summary__export">
          Exportar
        </Button>
      </header>

      <div className="summary__metrics">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            trendValue={metric.trendValue}
            icon={<Icon name={metric.icon} />}
          />
        ))}
      </div>
    </section>
  );
}
