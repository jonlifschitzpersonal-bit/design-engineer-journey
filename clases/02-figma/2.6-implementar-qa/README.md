# Clase 2.6 — De Figma a código: implementar, verificar y publicar

**Objetivo:** pasar la sección "Resumen" de la 2.5 a HTML y CSS leyéndola por el MCP, compararla con Figma y publicarla. Es el primer ciclo completo del curso: **Figma → plan → código → verificación → deploy**. Basado en la guía §13 (slices), §16 (implementar) y §17 (verificación).

Vos no escribís el código: lo dirigís, lo revisás y decidís cuándo está listo. Para eso alcanza con saber **qué se tradujo a qué** y **qué se comprobó de verdad**.

---

## 1. El ciclo de un slice

La guía tiene 15 pasos (§13). Para esta clase se resumen en 6:

```
1. Leer       →  Claude inspecciona la Section por el MCP: frames, capas, tokens, anotaciones
2. Planear    →  qué archivos, qué traduce a qué, qué estados, qué queda afuera
3. Aprobar    →  vos decidís lo pendiente
4. Construir  →  solo lo aprobado
5. Verificar  →  comparación con Figma + controles, con evidencia
6. Publicar   →  commit, push y Vercel
```

La regla es la misma que en Figma: **nada se construye sin plan aprobado, y nada se da por bueno sin evidencia.**

---

## 2. Ejemplo resuelto: cómo se traduce la sección

Todo lo que cuidaste en el módulo 2 tiene un destino concreto en el código. Esta es la traducción de "Resumen":

| En Figma | En código | Por qué así |
|---|---|---|
| Section `Resumen`, frame `summary · desktop` | `<section class="summary" aria-labelledby="summary-title">` | Es una sección de una vez: markup, no componente (2.1). Se nombra por su título (anotación). |
| `title` "Resumen" · `heading/section` | `<h2 id="summary-title" class="text-heading-section">` | El text style es una clase (2.2); el `<h2>` sale de la anotación. |
| `header` horizontal, espaciado "Auto" | `display: flex; justify-content: space-between` | Space-between, no un gap fijo (2.5). |
| `summary · mobile`: `header` apilado | Base en columna; desde 640px, en fila | Mobile first: la base es lo chico, el breakpoint suma (anotación: `sm`). |
| `metrics` con wrap, cards Fill + min 240 | `grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr))` | 240px = 15rem. 4 → 2 → 1 columna sin media queries (2.3). |
| Instancias `activeUsers`, `revenue`… | `<article class="metric-card" data-metric="activeUsers">` | El nombre de la instancia es el nombre del dato (2.5). |
| `space/8`, `color/text/muted` | `var(--space-8)`, `var(--color-text-muted)` | Mismos nombres, barras por guiones (2.2). |
| Icon `currency` | SVG de `dollar-sign` de Lucide, con `stroke="currentColor"` | Equivalencia anotada en la descripción del `Icon` (2.5). |
| `trend=up` + "12%" | Flecha y texto visibles para la vista; "Subió 12% respecto del período anterior" para el lector | Ningún significado solo con color ni solo con una flecha (2.3). |
| `state=loading` | Barras de skeleton del mismo alto + `aria-busy="true"` | La card no salta cuando llegan los datos (2.3). |
| `exportButton` deshabilitado en `loading` | `<button type="button" disabled>` | Tu decisión de la 2.5. |

### Así se ve una card

```html
<article class="metric-card" data-metric="activeUsers">
  <div class="metric-card__icon" aria-hidden="true"><svg>…users…</svg></div>
  <h3 class="metric-card__title text-body-sm">Usuarios activos</h3>
  <p class="metric-card__value text-heading-metric">1.284</p>
  <p class="metric-card__trend text-label-sm" data-trend="up">
    <svg aria-hidden="true">…arrow-up…</svg>
    <span aria-hidden="true">12%</span>
    <span class="visually-hidden">Subió 12% respecto del período anterior</span>
  </p>
</article>
```

Fijate cómo se lee: las clases repiten los nombres de capa de Figma (`icon`, `title`, `value`, `trend`). Si mañana alguien busca "trendValue" en Figma y en el código, encuentra lo mismo.

---

## 3. Los tokens: de variables de Figma a CSS

Las variables de Figma pasan a un archivo `tokens.css` con **custom properties**: variables de CSS que todo el resto usa.

```css
:root {
  /* Primitivos: cómo se ve */
  --gray-600: #4b5563;
  --space-8: 2rem;        /* space/8 = 32px */

  /* Semánticos: para qué sirve (apuntan a primitivos) */
  --color-text-muted: var(--gray-600);
}
```

Mismo esquema de tres niveles que en Figma: los componentes solo usan semánticos. Los valores salen **leídos de Figma por el MCP**, no copiados a ojo.

---

## 4. Los estados en una página sin datos

En una app real, `loading` y `partial-error` aparecen solos según lo que responda la API. Esta página no tiene API: los datos están escritos en el HTML. Para que los estados se puedan **ver y verificar**, hay que decidir cómo mostrarlos. Es una decisión tuya, y va a aparecer en el plan.

---

## 5. QA visual: comparar contra Figma

Comparar "a ojo" no es QA. Se compara **a la misma escala, en los mismos anchos, punto por punto**:

| Qué se compara | Cómo |
|---|---|
| Medidas | Alto de la card (194), padding de la sección (32 / 16), gaps (24, 16) |
| Tipografía | Tamaño, peso e interlineado de cada text style |
| Color | Cada color sale de un token, no de un hex escrito a mano |
| Layout | 4 columnas a 1280, 1 a 375, 2 en el medio |
| Estados | `loading` mide lo mismo que `default`; el error parcial afecta a una sola card |

Y se registra en un **ledger** (guía §17): una tabla donde cada control tiene un estado y su evidencia.

| Estado | Significa |
|---|---|
| `PASS` | Se comprobó y pasó, con evidencia |
| `FAIL` | Se comprobó y falló |
| `UNVERIFIED` | No se pudo comprobar. **No es PASS.** |
| `OUT OF SCOPE` | Se dejó afuera a propósito, con aprobación |

### Ejemplo

| Control | Estado | Evidencia |
|---|---|---|
| 4 columnas a 1280px | PASS | captura a 1280 al lado de la de Figma |
| Alto de la card = 194px | FAIL | mide 198: el título tiene interlineado 1.5 en lugar de 20px → corregido → PASS |
| Lector de pantalla | UNVERIFIED | no se probó con NVDA; se revisaron los textos ocultos en el HTML |
| Exportar de verdad | OUT OF SCOPE | decidido en la 2.5 |

La fila del medio es la más valiosa: un FAIL encontrado y corregido es exactamente para lo que existe el QA.

---

## 6. Publicar

Igual que en la 0.2: cada carpeta publicada es un **proyecto de Vercel** apuntando a una carpeta del repo (*Root Directory*). La sección va a vivir en `proyectos/00-seccion-resumen/`, así que vas a crear un proyecto nuevo con ese Root Directory. Desde ahí, cada `git push` la vuelve a publicar.

---

## 7. Hacelo vos

1. **Pedí el plan.** Usá el prompt de la guía §16 para cuando no hay reglas armadas:

   ```text
   Implementá la Section "Resumen" de 05 - Screens en HTML y CSS,
   en proyectos/00-seccion-resumen/, siguiendo la skill design-implementation.

   Antes de escribir código:
   1. inspeccioná la Section exacta en Figma (frames, tokens, anotaciones);
   2. definí estados y criterios de aceptación;
   3. listá los archivos que vas a crear;
   4. presentá el plan con las decisiones pendientes y esperá mi aprobación.

   No agregues dependencias ni inventes comportamiento.
   ```

2. **Aprobá o corregí el plan.**
3. **Construcción y QA:** escribo el código, lo abro en el navegador a 1280 y 375, lo comparo con las capturas de Figma y te entrego el ledger.
4. **Tu revisión:** abrís la página, la recorrés con Tab (¿el foco se ve en "Exportar"?), achicás la ventana y mirás cómo pasa de 4 a 2 a 1 columna.
5. **Deploy:** creás el proyecto en Vercel (Root Directory: `proyectos/00-seccion-resumen`) y me pasás la URL.

---

## 8. Checklist

- [ ] El plan se aprobó antes de escribir código.
- [ ] Cada nombre de Figma (capas, tokens, text styles) se reconoce en el código.
- [ ] Ningún color, espaciado ni tamaño suelto: todo sale de `tokens.css`.
- [ ] Los 4 frames de Figma tienen su caso visible en la página.
- [ ] Ledger con evidencia; ningún `UNVERIFIED` presentado como `PASS`.
- [ ] Publicada en Vercel con URL propia.

---

## 9. Para ir más lejos (opcional)
- MDN: [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- MDN: [`repeat()` y `minmax()` en Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)
- Guía del curso: §16 "Implementar dentro del código real" y §17 "Verificación obligatoria"
