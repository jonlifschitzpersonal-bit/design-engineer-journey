# Clase P.2 — Leer Tailwind y un diff de React

**Objetivo:** leer las clases de Tailwind de un componente como si fueran el panel de Figma, y revisar un diff (lo que cambió en un pull request) para decidir si respeta el diseño.

**Material:**
- `componentes/`: la misma sección Resumen de la P.1, con los estilos escritos en Tailwind.
- `componentes/theme.css`: los tokens de Figma cargados en Tailwind (cómo se arma se ve en la 5.2).
- `vista-previa.html`: el resultado compilado. Se ve igual a la 2.6.
- `cambio-del-agente.diff`: un cambio que un agente le hizo a la `MetricCard`, para revisar.

---

## 1. Qué es Tailwind

En la 2.6 y la P.1, los estilos estaban en un archivo aparte, con nombres inventados por nosotros:

```css
/* styles.css */
.metric-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-5);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background: var(--color-bg-surface);
}
```

Con Tailwind, **cada clase es una sola propiedad** y se escribe directo en el JSX:

```jsx
<article className="flex flex-col items-start gap-3 rounded-lg border border-border-default bg-bg-surface p-5">
```

Son las mismas 8 propiedades, en una línea. No hay que inventar nombres ni saltar entre archivos: lo que ves en el componente es todo lo que tiene.

---

## 2. Leer las clases como el panel de Figma

| Clase | CSS | En Figma |
|---|---|---|
| **Layout** | | |
| `flex` · `flex-col` | `display: flex` · `flex-direction: column` | Auto Layout vertical |
| `flex-row` | `flex-direction: row` | Auto Layout horizontal |
| `items-start` · `items-center` | `align-items` | Alineación en el eje cruzado |
| `justify-between` | `justify-content: space-between` | Espaciado "Auto" |
| `gap-3` | `gap: 12px` | Espaciado entre elementos: 12 |
| `grid` · `place-items-center` | Grilla, contenido centrado | Ícono centrado en su contenedor |
| **Espaciado** (número × 4px, igual que `space/N`) | | |
| `p-5` | `padding: 20px` | Padding 20 en los 4 lados |
| `px-4` · `py-2.5` | Padding horizontal 16 · vertical 10 | Padding horizontal / vertical |
| **Tamaño** | | |
| `size-10` | `width` y `height: 40px` | Frame fijo de 40×40 |
| `w-40` · `h-5` | `width: 160px` · `height: 20px` | Ancho / alto fijo |
| `w-full` | `width: 100%` | Fill container |
| `max-w-7xl` | `max-width: 1280px` | Max width |
| **Forma** | | |
| `rounded-lg` · `rounded-full` | `border-radius` | `radius/lg` · `radius/full` |
| `border` | Borde de 1px | Stroke de 1 |
| **Color** (prefijo = qué se pinta, el resto = el token) | | |
| `bg-bg-surface` | `background: var(--color-bg-surface)` | Fill `color/bg/surface` |
| `text-text-muted` | `color: var(--color-text-muted)` | Color de texto `color/text/muted` |
| `border-border-default` | `border-color: …` | Stroke `color/border/default` |
| **Tipografía** | | |
| `text-body-sm` | Tamaño, interlineado y peso | Text style `body/sm` |
| `tabular-nums` | `font-variant-numeric: tabular-nums` | Números tabulares |
| **Accesibilidad** | | |
| `sr-only` | Oculto a la vista, lo lee el lector | La `visually-hidden` de la 2.6 |

> **Por qué `text-text-muted` repite la palabra:** el primer `text-` dice qué se pinta (el texto) y `text-muted` es el nombre del token. Se ve raro, pero mantiene los nombres de Figma. En la 5.2 decidimos si lo dejamos así.

---

## 3. Prefijos: cuándo se aplica una clase

Una clase con prefijo solo se aplica en ese caso. Se leen como "**cuando** pasa X, aplicá esto":

| Prefijo | Se lee | En Figma |
|---|---|---|
| `hover:bg-action-subtle-bg-hover` | Cuando el mouse está encima, cambiá el fondo | Variante `state=hover` |
| `focus-visible:outline-2` | Cuando se llega con el teclado, mostrá el anillo | Variante `state=focus` |
| `disabled:text-text-disabled` | Cuando está deshabilitado, texto gris | Variante `state=disabled` |
| `sm:flex-row` | **Desde 640px para arriba**, en fila | El frame desktop |
| `*:size-5` | A los hijos directos, tamaño 20 | El ícono de la card redimensionado (el detalle de la P.1) |

Lo más útil para leer responsive: **sin prefijo es mobile, y cada prefijo suma desde ese ancho para arriba.** El header de `Summary.jsx`:

```jsx
<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
```

"En mobile, vertical con 16 de espacio. Desde 640, horizontal, centrado y con espaciado Auto". Es tu frame `summary · mobile` y tu frame `summary · desktop` en una línea.

---

## 4. Señales de alarma en las clases

| Señal | Ejemplo | Por qué preocupa |
|---|---|---|
| **Corchetes con un valor suelto** | `text-[#22c55e]`, `p-[22px]` | No sale de un token: si el diseño cambia, este valor no cambia. Preguntá si existe el token. |
| Colores de la paleta de Tailwind | `text-green-600` | Es un color de Tailwind, no del sistema. (En este repo ni existen: el `theme.css` deja solo los nuestros.) |
| Clases armadas por pedazos | `` `text-${color}` `` | Tailwind solo genera las clases que encuentra escritas enteras: esa no va a funcionar. Se usa un mapa, como `TREND_COLOR`. |
| Estados que Figma no tiene | `hover:shadow-lg` en una card | Alguien inventó diseño. |

**No todo corchete es un error.** En `Summary.jsx` está `grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]`: es la grilla de la 2.6, no hay un token para eso y tiene un comentario que dice de dónde sale. La pregunta siempre es: **¿existe el token? ¿está explicado?**

---

## 5. Qué es un diff

Un diff muestra **qué cambió** en un archivo. Es lo que vas a revisar en cada pull request desde el módulo 5. En GitHub está en la pestaña *Files changed*, con colores.

```diff
diff --git a/componentes/MetricCard.jsx b/componentes/MetricCard.jsx   ← qué archivo
@@ -11,7 +11,7 @@ const TREND_ICON = {                                    ← dónde: desde la línea 11
 const TREND_COLOR = {                                                  ← sin signo: no cambió (contexto)
-  up: "text-feedback-positive",                                        ← rojo (-): se borró
+  up: "text-[#22c55e]",                                                ← verde (+): se agregó
   down: "text-feedback-negative",
```

Una línea que "se modificó" aparece como una roja (la versión vieja) y una verde (la nueva). Las líneas sin signo están solo para que entiendas dónde estás.

---

## 6. Ejemplo resuelto: revisar el cambio de un agente

**El pedido fue:** "Que cada card lleve a la página de detalle de su métrica".

Este es el diff que entregó el agente (`cambio-del-agente.diff`):

```diff
@@ -11,7 +11,7 @@ const TREND_ICON = {
 const TREND_COLOR = {
-  up: "text-feedback-positive",
+  up: "text-[#22c55e]",
   down: "text-feedback-negative",
   neutral: "text-feedback-neutral",
 };
@@ -32,6 +32,7 @@ export function MetricCard({
   trend = "up",
+  href,
 }) {
@@ -46,7 +47,10 @@ export function MetricCard({
   return (
-    <article className={CARD}>
+    <article
+      className={`${CARD} cursor-pointer hover:shadow-lg`}
+      onClick={() => (window.location.href = href)}
+    >
@@ -68,8 +72,7 @@ export function MetricCard({
               <Icon name={TREND_ICON[trend]} className="size-3.5" />
-              <span aria-hidden="true">{trendValue}</span>
-              <span className="sr-only">{trendText(trend, trendValue)}</span>
+              <span>{trendValue}</span>
```

### La revisión, bloque por bloque

**Bloque 1 · el color de la tendencia → FAIL**
- Cambió el token `text-feedback-positive` por un valor suelto, `text-[#22c55e]`.
- Nadie lo pidió: está **fuera de alcance**.
- Además es peor: ese verde sobre blanco da **2,28:1** de contraste, y el texto necesita 4,5:1. El token da 5,02:1.

**Bloque 2 · la prop `href` → PASS**
- Es lo que se pidió, con el nombre estándar para un link.

**Bloque 3 · la card clickeable → FAIL**
- Puso un `onClick` en un `<article>`: con el mouse anda, pero **con teclado no se puede llegar** y el lector de pantalla no lo anuncia como link. Tampoco se puede abrir en otra pestaña. Para navegar se usa `<a href>` (regla de la 2.3).
- `hover:shadow-lg` es un **estado inventado**: la `MetricCard` en Figma no tiene hover. Es una decisión de diseño: primero se diseña en Figma.

**Bloque 4 · el texto para el lector → FAIL**
- **Borró** el texto oculto ("Subió 12% respecto del período anterior") y le sacó el `aria-hidden` al número. Ahora el lector dice "12%" sin decir si subió o bajó.
- Este es el más fácil de pasar por alto: **las líneas rojas también son cambios.** Lo que se borra no se ve en la pantalla.

### El ledger y el veredicto

| Control | Estado | Evidencia |
|---|---|---|
| Hace lo pedido (lleva al detalle) | FAIL | Lo hace con `onClick`; no es un link |
| Solo toca lo pedido | FAIL | Cambió el color de la tendencia |
| Colores desde tokens | FAIL | `text-[#22c55e]` |
| Contraste del texto | FAIL | 2,28:1 (mínimo 4,5:1) |
| Accesible por teclado | FAIL | `<article onClick>` |
| Estados según Figma | FAIL | `hover:shadow-lg` no existe en Figma |
| Texto para lector en la tendencia | FAIL | Se borró |
| Nombre de la prop | PASS | `href` |

**Veredicto: pedir cambios.** El comentario para el agente:

> Usá un `<a href>` para el link en lugar de `onClick`. Volvé `up` a `text-feedback-positive` y restaurá el `sr-only` de la tendencia con el `aria-hidden` del número. Sacá `hover:shadow-lg`: el hover de la card lo diseño primero en Figma.

---

## 7. Receta para leer un diff

1. **¿Qué archivos tocó?** ¿Tienen que ver con el pedido?
2. **Bloque por bloque:** qué se borró (rojo) y qué se agregó (verde).
3. **¿Hace solo lo pedido?** Todo lo demás está fuera de alcance, aunque "mejore" algo.
4. **Señales de alarma:** valores sueltos, estados inventados, `<div>` o `<article>` clickeables.
5. **Las líneas rojas:** ¿se perdió algo? Textos para el lector, tokens, estados.

---

## 8. Práctica

Abrí `vista-previa.html` y mirá Tailwind funcionando:

1. **Es la misma sección**, ahora con Tailwind. Compará con la publicada: https://design-engineer-journey-00-seccion.vercel.app/
2. **Achicá la ventana** por debajo de 640px: el header se apila y "Exportar" ocupa todo el ancho. Es `flex-col sm:flex-row` y `w-full sm:w-auto` en acción.
3. **Inspeccioná "Exportar"** con DevTools (clic derecho → Inspeccionar): vas a ver sus clases de Tailwind en el HTML y, en *Styles*, el CSS que genera cada una.
