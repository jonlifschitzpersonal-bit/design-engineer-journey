// Control de demo: muestra los estados de la sección que en una app real
// llegarían de la API. No es parte del diseño de Figma.

const summary = document.querySelector(".summary");
const exportButton = summary.querySelector(".summary__export");
const cards = summary.querySelectorAll(".metric-card");
const demo = document.querySelector(".demo");

function applyState(state) {
  summary.dataset.state = state;

  // Decisión de la 2.5: "Exportar" deshabilitado mientras carga
  exportButton.disabled = state === "loading";

  for (const card of cards) {
    let cardState = "default";
    if (state === "loading") cardState = "loading";
    // Cada métrica se carga por separado: en el ejemplo falla solo Ingresos
    if (state === "partial-error" && card.dataset.metric === "revenue") cardState = "error";

    card.dataset.state = cardState;
    card.dataset.showTrend = String(state !== "no-history");
    card.setAttribute("aria-busy", String(cardState === "loading"));
  }
}

demo.addEventListener("change", (event) => applyState(event.target.value));

// Sin JavaScript la sección se ve en su estado normal y el control no aparece
demo.hidden = false;
