import { Icon } from "../../P.1-componentes-props-jsx/componentes/Icon";
import { Button } from "./Button";
import { MetricCard } from "./MetricCard";
import { StatusBadge } from "./StatusBadge";

const metrics = [
  { id: "activeUsers", title: "Usuarios activos", value: "1.284", trend: "up", trendValue: "12%", icon: "users" },
  { id: "revenue", title: "Ingresos", value: "$ 48.920", trend: "up", trendValue: "8%", icon: "currency" },
  { id: "conversion", title: "Conversión", value: "3,2%", trend: "down", trendValue: "0,4%", icon: "percent" },
  { id: "orders", title: "Pedidos", value: "356", trend: "neutral", trendValue: "0%", icon: "package" },
];

// Figma: 05 - Screens › Resumen (summary · desktop y summary · mobile)
export function Summary() {
  return (
    <section
      className="mx-auto flex max-w-7xl flex-col gap-6 bg-bg-surface p-4 sm:p-8"
      aria-labelledby="summary-title"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 id="summary-title" className="flex flex-wrap items-center gap-3 text-heading-section">
            Resumen
            <span className="sr-only">, proyecto</span>
            <StatusBadge status="active" />
          </h2>
          <p className="text-body-sm text-text-muted">Últimos 30 días</p>
        </div>

        <Button variant="secondary" className="w-full sm:w-auto">
          Exportar
        </Button>
      </header>

      {/* min width 240 de la card en Figma: 15rem. No hay token para esto, por eso va entre corchetes. */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
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
