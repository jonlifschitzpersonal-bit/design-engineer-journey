# Clase 2.3 — Estados, responsive, accesibilidad y anotaciones

**Objetivo:** que tu archivo de Figma responda las preguntas que hoy Claude tendría que adivinar: qué pasa cuando no hay datos, cómo se ve en mobile, cómo lo usa alguien con teclado o lector de pantalla y qué hace cada cosa al tocarla. Basado en la guía §6.7–6.11.

> Regla de oro: **si no está en Figma, Claude lo inventa.** Y lo que inventa suele ser el estado ideal, sin errores ni casos raros.

---

## 1. Estados: diseñar más allá del caso feliz

La guía lista los estados posibles (§6.7):

```
default · hover · focus visible · pressed · disabled · loading · success
error y reintento · vacío inicial · sin resultados · sin permisos
datos parciales · contenido corto, largo y extremo
```

**No todos los componentes necesitan todos.** Se eligen según lo que el componente *hace*. Un botón no tiene "sin resultados"; una card de datos no tiene "hover" si no es clickeable.

### Ejemplo resuelto: qué estados le faltan a la `MetricCard`

La card muestra un dato que viene de una API. Recorriendo la lista, estos son los que aplican:

| Estado | ¿Pasa en la realidad? | Cómo se ve | En Figma |
|---|---|---|---|
| Sube / baja | Sí | ↑ verde / ↓ rojo | Ya existe: `trend: up \| down` |
| **Sin cambio** | Sí: 0% respecto del período anterior | `— 0%` en gris | Agregar `trend: neutral` |
| **Sin comparación** | Sí: el primer período no tiene contra qué comparar | Sin la fila de tendencia | Booleano `showTrend` |
| **Loading** | Sí: mientras llega la API | Bloques grises (*skeleton*) en lugar de título, valor y tendencia | Variante `state: loading` |
| **Error** | Sí: la API falla | Valor `—` y el texto "No se pudo cargar" | Variante `state: error` |
| Contenido extremo | Sí | Título de 2 líneas, valor de 9 dígitos | Ya lo probamos en la 2.2 ✓ |
| Hover / focus | **No**, la card no es clickeable | — | No se agrega |

API resultante:

```
MetricCard
├── state: default | loading | error     ← Variant
├── trend: up | down | neutral           ← Variant
├── showTrend: true | false              ← Boolean
├── icon, title, value, trendValue       ← (ya existen)
```

Combinaciones: 3 × 3 = 9. Pero `loading` y `error` no muestran tendencia, así que en la práctica solo hacen falta **5**: los 3 `trend` en `default`, más `loading` y `error`. **No crees las combinaciones que no existen** (`state=loading, trend=down` no significa nada).

> **Por qué "skeleton" y no un spinner:** el skeleton tiene la forma del contenido final, así que cuando llegan los datos la card no salta de tamaño.

### Y el `Button`

Ya tiene default, hover, focus, disabled y loading. Le falta **pressed** (`:active`). No lo agregamos como variante: es un cambio de un instante (un poco más oscuro) y alcanza con una **anotación**. Así no sumás 6 variantes más para algo que se resuelve en una línea de CSS.

---

## 2. Responsive: un frame desktop no demuestra mobile

Para cada componente o pantalla, decidí y dejá escrito (§6.8):

- qué se apila, qué cambia de orden, qué se oculta;
- qué conserva ancho fijo y qué se estira;
- qué pasa con la navegación y las tablas;
- de dónde salen los breakpoints.

**Breakpoints:** usá los de Tailwind, así no se inventan nuevos: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280.

### Ejemplo resuelto: la fila de `MetricCard` en el dashboard

```
Desktop ≥1024px          Tablet 640–1023px       Mobile <640px
┌────┐┌────┐┌────┐┌────┐  ┌──────┐┌──────┐         ┌────────────┐
│ 1  ││ 2  ││ 3  ││ 4  │  │  1   ││  2   │         │     1      │
└────┘└────┘└────┘└────┘  └──────┘└──────┘         └────────────┘
                          ┌──────┐┌──────┐         ┌────────────┐
                          │  3   ││  4   │         │     2      │
                          └──────┘└──────┘         └────────────┘
                                                   (3 y 4 abajo)
```

No hace falta dibujar los tres: como la card tiene **min width 240**, la grilla `repeat(auto-fill, minmax(15rem, 1fr))` pasa sola de 4 a 2 a 1 columna. Lo que sí hace falta es **anotarlo** para que Claude no ponga `grid-cols-4` fijo.

**El Button en mobile:** dentro de un formulario conviene que ocupe todo el ancho (`w-full`) y tenga un área táctil de 44px. El `md` mide 40px de alto: alcanza para el mínimo de 24px, pero en mobile se le agrega área con padding. Se anota.

---

## 3. Accesibilidad desde el diseño

La guía pide revisar como mínimo (§6.9): contraste, orden de lectura, jerarquía de encabezados, área táctil, foco visible, teclado, labels, errores comprensibles, no depender solo del color y zoom.

### Ejemplo resuelto: contraste real de tus tokens

Lo medí con la fórmula de WCAG. Mínimos: **4.5:1** texto normal, **3:1** texto grande y elementos gráficos necesarios para entender algo (íconos, anillo de foco).

| Combinación | Contraste | ¿Pasa? |
|---|---|---|
| `text/default` sobre `action/primary/bg` | 11.60 | ✅ |
| `action/secondary/text` sobre blanco | 10.77 | ✅ |
| `text/muted` sobre blanco (título de la card) | 7.56 | ✅ |
| `feedback/positive` sobre blanco (↑ 12%) | 5.02 | ✅ justo; no lo aclares más |
| `feedback/negative` sobre blanco (↓ 8%) | 6.47 | ✅ |
| `focus/ring` sobre blanco | 4.13 | ✅ (pide 3:1) |
| `text/disabled` sobre blanco | 2.54 | ✅ exento: WCAG no exige contraste en controles deshabilitados |
| `action/secondary/border` sobre blanco | 1.53 | ✅ en este caso: el botón se identifica por su texto, el borde es decorativo |
| `border/default` sobre blanco (borde de la card) | 1.24 | ✅ decorativo; ⚠️ no sirve para el borde de un **input** (ahí sí pide 3:1) |

Los dos últimos son el matiz importante: un borde bajo está bien **si no es lo único que muestra que algo es un control**. En un input vacío, el borde es lo único que dice "acá se escribe", así que tendría que llegar a 3:1. Cuando hagamos inputs, vamos a necesitar un token `border/strong`.

### Lo que no se ve pero hay que definir

| Tema | MetricCard | Button |
|---|---|---|
| **Rol / semántica** | `title` es un encabezado (`<h3>`, debajo del `<h2>` de la sección del dashboard) | `<button>`; si navega, `<a>` |
| **Solo color** | La tendencia ya usa flecha + color ✓. Pero la flecha es visual: el lector de pantalla tiene que oír "Subió 12% respecto del período anterior" | — |
| **Íconos** | Decorativos → se ocultan al lector | Decorativo si hay texto; si el botón es solo ícono, necesita un nombre ("Agregar") |
| **Teclado** | No es interactiva: no recibe foco | Tab llega, Enter y Espacio activan, foco visible con el anillo |
| **Estados** | `loading` → se anuncia "Cargando"; `error` → el mensaje se lee | `disabled` → no recibe foco; `loading` → `aria-busy` y no se puede volver a apretar |

---

## 4. Anotaciones: lo que no se deduce mirando

Figma tiene una herramienta de **anotaciones** con categorías (*Development*, *Interaction*, *Accessibility* y *Content*). Sirven para escribir **al lado del componente** lo que el dibujo no puede decir (§6.10):

- qué pasa al hacer clic, qué se actualiza, qué persiste;
- qué mensaje aparece ante un error;
- si hay confirmación o se puede deshacer;
- qué queda fuera del alcance.

Claude las lee por el MCP, igual que lee las capas.

> **Ojo en el plan Starter:** las anotaciones nativas se guardan y el MCP las lee, pero se muestran en **Dev Mode**, que Starter no incluye, así que vos no las ves. La solución: cada anotación va dos veces, la nativa (para Claude) y una **nota visible** en un frame `annotations` dentro de la Section, debajo del componente (para vos y cualquiera que abra el archivo).

### Ejemplo resuelto: las anotaciones de tus componentes

**MetricCard**

| Categoría | Anotación |
|---|---|
| Development | En el dashboard va en una grilla `repeat(auto-fill, minmax(15rem, 1fr))`: 4 → 2 → 1 columna. No usar columnas fijas. |
| Development | `value` usa números tabulares para que no salten al actualizarse. |
| Content | `value` viene formateado con separador de miles en español (`1.284`). Si no hay dato: `—`. |
| Accessibility | `title` es un `<h3>`. La tendencia se anuncia como texto: "Subió 12% respecto del período anterior". Ícono y flecha, ocultos al lector. |
| Interaction | No es clickeable: sin hover ni foco. |

**Button**

| Categoría | Anotación |
|---|---|
| Interaction | Pressed (`:active`): fondo un paso más oscuro. No tiene variante propia. |
| Interaction | Con `loading`: no se puede volver a apretar y el ancho no cambia. |
| Accessibility | Si se usa solo con ícono, necesita un nombre para el lector (`aria-label`). |
| Development | En mobile, dentro de formularios: ancho completo y área táctil de 44px. |

**Regla para escribirlas:** una anotación dice **qué** tiene que pasar, no **cómo** programarlo. "La tendencia se anuncia como texto" es mejor que "usar `<span class="sr-only">`": la técnica la decide quien implementa (y la skill).

---

## 5. "Ready for development" con criterio

Una pantalla o componente está listo cuando (§6.11):

- [ ] el flujo y el alcance están aprobados;
- [ ] los componentes están identificados;
- [ ] los estados necesarios existen o están anotados;
- [ ] responsive está definido o marcado como fuera de alcance;
- [ ] el contenido es representativo (no "Lorem ipsum" ni "Title");
- [ ] no quedan decisiones importantes sin escribir;
- [ ] lo que se aparta del sistema está justificado.

En Figma, marcalo con **Mark as ready for dev** sobre la Section (funciona en tu plan Starter; lo probé). La marca solo vale si el checklist se cumple: marcar algo "listo" con estados faltantes es la forma más rápida de que Claude los invente.

---

## 6. Hacelo en Figma

1. **MetricCard:** agregá `state: default | loading | error`, `trend: neutral` y el booleano `showTrend`. Solo las 5 combinaciones que existen. Para `neutral`, el ícono `minus` (sumalo al `Icon`) y un token `color/feedback/neutral` → `gray/600`.
2. **Anotaciones:** cargá las de la sección 4 en la MetricCard y el Button.
3. **Ready for dev:** pasá el checklist de la sección 5 por los dos componentes.

Como en la 2.2: si querés, hacé uno o dos pasos vos para entender el mecanismo y pedime el resto por el MCP.

**Cuando termines:** avisame y reviso estados, anotaciones y contraste por el MCP.

---

## 7. Checklist

- [ ] Cada componente tiene los estados que su comportamiento necesita, y no más.
- [ ] Ninguna combinación de variantes que no exista en la realidad.
- [ ] Responsive definido o anotado (con breakpoints de Tailwind).
- [ ] Contraste verificado; los bordes bajos son solo decorativos.
- [ ] Ningún significado depende solo del color.
- [ ] Anotaciones con lo que no se ve: interacción, contenido, accesibilidad, desarrollo.
- [ ] "Ready for dev" solo si se cumple el checklist.

---

## 8. Para ir más lejos (opcional)
- Figma: [Add measurements and annotations in Dev Mode](https://help.figma.com/hc/en-us/articles/20774752502935)
- W3C: [Understanding WCAG 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- W3C: [Understanding WCAG 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
