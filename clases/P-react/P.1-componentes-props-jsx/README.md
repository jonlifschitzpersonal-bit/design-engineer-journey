# Clase P.1 — Componentes, props y JSX

**Objetivo:** poder leer un componente de React y explicar qué hace, comparándolo con el componente de Figma del que salió. Desde el módulo 5, Claude escribe la interfaz en React. Vos no lo escribís (eso es el módulo 4): lo leés y decidís si respeta el diseño.

**Material:**
- `componentes/`: la sección Resumen de la 2.6, ahora en React (`Icon`, `MetricCard`, `StatusBadge`, `Button`, `Summary`).
- `vista-previa.html`: el HTML que generan esos componentes, con el CSS de la 2.6. Abrilo en el navegador: se ve igual a la sección publicada.

---

## 1. El problema que resuelve React

En el `index.html` de la 2.6, la card está **copiada 4 veces**, unas 20 líneas cada una. Si mañana cambia el texto de error, hay que cambiarlo en 4 lugares (y en una app real, en 40).

En Figma esto nunca te pasó: tenés **un componente principal** y **muchas instancias**. React hace lo mismo en código:

```
Figma                                   React
─────────────────────────────           ─────────────────────────────
MetricCard (componente principal)  →    function MetricCard(...) { ... }   ← se escribe una vez
4 instancias en "Resumen"          →    <MetricCard title="Ingresos" ... /> ← se usa 4 veces
Panel de propiedades               →    props: title, value, trend...
```

**Un componente es una función que recibe datos (props) y devuelve interfaz.**

---

## 2. JSX: parece HTML, pero vive en JavaScript

Lo que está adentro del `return` se llama **JSX**. Se lee casi como HTML, con estas diferencias:

| En JSX | En HTML | Por qué |
|---|---|---|
| `className="metric-card"` | `class="metric-card"` | `class` es una palabra reservada de JavaScript |
| `{title}` | — | Las llaves meten un dato de JavaScript en el markup |
| `<span ... />` | `<span ...></span>` | Toda etiqueta se cierra; si está vacía, con `/>` |
| `<MetricCard />` (mayúscula) | — | **Mayúscula = componente tuyo.** Minúscula = etiqueta de HTML (`<article>`, `<p>`) |
| `<> ... </>` | — | Un "envoltorio invisible" para agrupar sin agregar una capa (como agrupar sin frame) |

`aria-hidden`, `data-state`, `id` y el resto de los atributos se escriben igual que en HTML.

---

## 3. De propiedades de Figma a props

Estas son las propiedades reales de la `MetricCard` (leídas por el MCP) y en qué se convirtieron:

| Figma | Tipo en Figma | Prop en React | Default |
|---|---|---|---|
| `title` | Text | `title` | — |
| `value` | Text | `value` | — |
| `trendValue` | Text | `trendValue` | — |
| `icon` | Instance swap | `icon` (recibe un `<Icon />`) | — |
| `showTrend` | Boolean | `showTrend` | `true` |
| `state` | Variant: default · loading · error | `state` | `"default"` |
| `trend` | Variant: up · down · neutral | `trend` | `"up"` |

**Mismos nombres, mismos valores, mismos defaults.** Ese es el resultado de haber nombrado bien en la 2.1: el código no inventa nada. (El `#1006:79` que Figma le pega a algunos nombres es un id interno y no pasa al código.)

---

## 4. Ejemplo resuelto: leer `MetricCard.jsx` en 4 pasos

Abrí [`componentes/MetricCard.jsx`](componentes/MetricCard.jsx) al lado de este README.

### Paso 1 · La firma: es el panel de propiedades

```jsx
export function MetricCard({
  title,
  value,
  trendValue,
  icon,
  showTrend = true,
  state = "default",
  trend = "up",
}) {
```

- `export function MetricCard`: "acá se define el componente MetricCard, y otros archivos lo pueden usar".
- Lo que está entre `{ }` son las props. Si tiene `=`, es el **valor por defecto**: si quien usa la card no dice nada de `trend`, vale `"up"`. Igual que el default de una variante en Figma.

### Paso 2 · Lo de arriba de la función: datos fijos y reglas

```jsx
const TREND_ICON = {
  up: "arrow-up",
  down: "arrow-down",
  neutral: "minus",
};
```

Un **mapa**: "si `trend` es `up`, el ícono es `arrow-up`". Es la regla que en Figma resolviste con una variante: `trend` decide la flecha y el color, nadie elige el ícono a mano.

```jsx
function trendText(trend, trendValue) {
  if (trend === "up") return `Subió ${trendValue} respecto del período anterior`;
  ...
}
```

Una función chica que arma el texto para el lector de pantalla. `===` significa "es igual a"; `${trendValue}` mete el dato adentro del texto. Es la anotación de accesibilidad de la 2.3, convertida en código.

### Paso 3 · Las condiciones: qué capas se ven en cada caso

Es lo más importante para revisar, porque acá están los **estados**. En la 2.6 todas las capas estaban en el HTML y el CSS ocultaba las que no iban. En React, **lo que no va, directamente no se dibuja**. Hay tres formas de escribirlo:

| Forma | Se lee | Equivale en Figma a |
|---|---|---|
| `if (state === "loading") { return (...) }` | "si está cargando, devolvé esta otra versión y no sigas" | Una variante con otra estructura (`state=loading`) |
| `{state === "error" ? (A) : (B)}` | "si hay error, mostrá A; si no, B" | Dos capas que se alternan |
| `{showTrend && (...)}` | "si `showTrend` es verdadero, mostrá esto" | Una propiedad Boolean que muestra u oculta una capa |

Y el texto de la descripción del componente en Figma ("en loading y error no hay tendencia; en error el valor es —") está escrito arriba del archivo y **aplicado** en esas condiciones: en la rama de error no hay `trend`.

### Paso 4 · El `return`: es el árbol de capas

```jsx
<article className="metric-card" data-state={state} data-trend={trend}>
  <div className="metric-card__icon-wrapper" aria-hidden="true">
    {icon}
  </div>
  <h3 className="metric-card__title text-body-sm">{title}</h3>
  ...
</article>
```

Se lee de afuera hacia adentro, como el panel de capas: un `article` que contiene el wrapper del ícono, el título, el valor y la tendencia. Las clases repiten los nombres de capa de Figma (`icon`, `title`, `value`, `trend`) y los text styles (`text-body-sm`). Donde dice `{title}`, va lo que se haya pasado en la prop.

---

## 5. Usar el componente: `Summary.jsx`

Una instancia, escrita a mano, se ve así:

```jsx
<MetricCard
  title="Ingresos"
  value="$ 48.920"
  trend="up"
  trendValue="8%"
  icon={<Icon name="currency" />}
/>
```

Es tu instancia de Figma con sus overrides: cada línea es una propiedad del panel. `icon` recibe otro componente, igual que el Instance swap.

En [`componentes/Summary.jsx`](componentes/Summary.jsx) las cards no están escritas 4 veces: hay una **lista de datos** y una línea que dice "por cada dato, dibujá una card":

```jsx
const metrics = [
  { id: "activeUsers", title: "Usuarios activos", value: "1.284", ... },
  { id: "revenue", title: "Ingresos", value: "$ 48.920", ... },
  ...
];

{metrics.map((metric) => (
  <MetricCard key={metric.id} title={metric.title} ... />
))}
```

- Los `id` son los nombres de tus instancias en Figma (2.5).
- `.map` recorre la lista (lo vas a ver a fondo en el módulo 3). Para leerlo alcanza con: "una card por cada métrica".
- `key` es el DNI de cada card: React lo usa para saber cuál es cuál si la lista cambia.

---

## 6. La prueba: mismo resultado que la 2.6

Los componentes se ejecutaron y generaron [`vista-previa.html`](vista-previa.html), con el mismo CSS de la sección publicada. Arriba está la sección; abajo, **la misma `MetricCard` con otras props** (`state="loading"`, `state="error"`, `showTrend={false}`, `trend="down"`). Un solo componente, cuatro resultados distintos.

**Lo que apareció al verificar:** el ícono de la card salía de 16px (el tamaño del `Icon` en Figma) y en la card mide 20px. Como el ícono llega por prop, el tamaño lo tiene que poner la card, no quien la usa. Se resolvió con una regla de CSS en la card (`vista-previa.css`). Es el tipo de diferencia que se encuentra midiendo, no mirando el código.

---

## 7. Cómo leer cualquier componente (la receta)

1. **Nombre y props** → ¿coinciden con el componente y las propiedades de Figma? ¿Los defaults son los mismos?
2. **Datos y reglas de arriba** → ¿están las reglas de la descripción de Figma?
3. **Condiciones** → ¿cada estado de Figma tiene su caso? ¿Hay estados que Figma no tiene (inventados)?
4. **El `return`** → ¿la estructura y los nombres siguen las capas? ¿Los textos para el lector están?

No hace falta entender cada símbolo. Hace falta poder decir **qué muestra en cada caso** y **si coincide con el diseño**.

> **Adelanto:** en el repo real (módulo 5) las props van a tener tipos de TypeScript, por ejemplo `trend: "up" | "down" | "neutral"`. Se lee como la lista de opciones de una variante en Figma. Lo vemos en P.2 y a fondo en 4.7.

---

## 8. Más ejemplos resueltos

### `StatusBadge.jsx`: entra un estado, sale un badge

```jsx
const LABELS = { active: "Activo", paused: "Pausado", error: "Error" };

export function StatusBadge({ status = "active" }) {
  return (
    <span className="status-badge text-label-xs" data-status={status}>
      <span className="status-badge__dot" aria-hidden="true" />
      <span className="status-badge__label">{LABELS[status]}</span>
    </span>
  );
}
```

- `LABELS` es una tabla: a la izquierda el valor de la variante, a la derecha el texto. El texto es fijo por estado (decisión de la 2.4), así el color y el texto nunca se contradicen.
- `{ status = "active" }`: una sola prop, con el mismo default que en Figma.
- El `return` tiene las mismas capas que Figma: contenedor, `dot` y `label`.
- `{LABELS[status]}` se lee "buscá en la tabla la fila de `status`".

Entra `<StatusBadge status="paused" />` y sale:

```html
<span class="status-badge text-label-xs" data-status="paused">
  <span class="status-badge__dot" aria-hidden="true"></span>
  <span class="status-badge__label">Pausado</span>
</span>
```

### `Button.jsx`: lo que pasa directo, lo que cambia y lo que se suma

| Figma | React | Por qué |
|---|---|---|
| `variant`, `size`, `loading` | Las mismas props | Pasan directo. `size` además elige el text style (`md` → `label/md`, `sm` → `label/sm`). |
| `iconStart` (Instance swap) | `iconStart={<Icon name="plus" />}` | Recibe otro componente. |
| `showIconStart` (Boolean) | — | En Figma el Instance swap siempre tiene un ícono, por eso hace falta el booleano para ocultarlo. En código, si no pasás `iconStart`, no hay ícono: dos propiedades se vuelven una. |
| `label` (Text) | `children`: `<Button>Exportar</Button>` | El texto va entre las etiquetas, como en un botón de HTML. |
| `state=hover` / `focus` | — | Los aplica el navegador con `:hover` y `:focus-visible` en el CSS. En Figma existen para dibujarlos. |
| `state=disabled` | `disabled` | Lo decide quien usa el botón: es prop. |
| — | `onClick` | El comportamiento al apretar, que Figma no dibuja. |
| — | `className` | Para que la sección lo ubique (en Resumen, `summary__export`). |

Con `loading` en verdadero:
- `{loading ? spinner : iconStart}` muestra el spinner **en lugar del** ícono (regla de la descripción en Figma). El texto queda.
- `disabled={disabled || loading}` lo deshabilita (`||` es "o") para que no se apriete dos veces.
- `aria-busy` le avisa al lector de pantalla que está ocupado.
