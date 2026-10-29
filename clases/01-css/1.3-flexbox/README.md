# Clase 1.3 — Flexbox = Auto Layout

**Objetivo:** traducir cualquier Auto Layout de Figma a Flexbox y detectar cuándo el CSS se comporta distinto que Figma. Es lo que más vas a revisar en el código que genera la IA.

---

## 1. Concepto

### Dos ejes
Flexbox ordena a los hijos sobre una línea, igual que un frame con Auto Layout.

- **Eje principal:** la dirección en la que se ordenan los hijos (`flex-direction`).
- **Eje cruzado:** el perpendicular.

```
flex-direction: row                 flex-direction: column

 eje principal →                     eje cruzado →
┌───┐ ┌───┐ ┌───┐                    ┌─────────┐
│ A │ │ B │ │ C │  ↓ eje cruzado     │    A    │  ↓ eje principal
└───┘ └───┘ └───┘                    ├─────────┤
                                     │    B    │
                                     └─────────┘
```

- **`justify-content`** alinea sobre el **eje principal**.
- **`align-items`** alinea sobre el **eje cruzado**.

Si cambiás la dirección, **los ejes se dan vuelta**: con `column`, `justify-content` pasa a mover las cosas de arriba a abajo.

### Auto Layout → Flexbox

| Figma (Auto Layout) | CSS |
|---|---|
| Dirección horizontal / vertical | `display: flex` + `flex-direction: row` / `column` |
| Spacing between items | `gap` |
| Spacing "Auto" | `justify-content: space-between` |
| Padding | `padding` |
| Alineación (la grilla de 9 puntos) | `justify-content` + `align-items` |
| Wrap | `flex-wrap: wrap` |
| Hijo en **Hug** | el default (el hijo mide lo que su contenido) |
| Hijo en **Fill** en el eje principal | `flex: 1` |
| Hijo en **Fill** en el eje cruzado | `align-self: stretch` (o el default, ver abajo) |
| Hijo en **Fixed** | `width: …` **+ `flex-shrink: 0`** |

### Dos diferencias con Figma
1. **En el eje cruzado, el default de CSS es estirar** (`align-items: stretch`). En Figma el default es Hug. Por eso los hijos de un flex en fila salen todos con la misma altura, aunque nadie lo haya pedido.
2. **En CSS, "Fixed" no es fijo.** Por default, los hijos se encogen si no entran (`flex-shrink: 1`). Un avatar de `width: 48px` puede terminar aplastado. Para que sea fijo de verdad le agregás `flex-shrink: 0`.

### `flex: 1`, en corto
`flex` resume tres propiedades: cuánto crece (`flex-grow`), cuánto se encoge (`flex-shrink`) y de qué tamaño parte (`flex-basis`). `flex: 1` significa "partí de 0 y repartite el espacio que sobra". Es el Fill.

---

## 2. Ejercicio: predecir

Respondé **antes** de abrir `index.html`:

1. **Caso 1:** tres cards en fila con textos de distinto largo. El contenedor no define `align-items`. ¿Las tres cards tienen la misma altura o cada una mide lo que su texto?
2. **Caso 2:** contenedor en `column`, de 240px de alto, con `justify-content: flex-end` y `align-items: center`. ¿Dónde aparecen los dos botones: arriba, al centro o abajo? ¿Y a la izquierda, al centro o a la derecha?
3. **Caso 3:** una barra de 600px de ancho con `gap: 16px` y sin padding: logo de 100px, buscador con `flex: 1` y botón de 120px. ¿Cuántos px mide el buscador?
4. **Caso 4:** una fila de 260px con un avatar de `width: 48px` y un mail larguísimo. ¿El avatar sigue midiendo 48px?

Después verificalo en DevTools. En el panel **Elements**, al lado de cada contenedor flex aparece un botón `flex`: clickealo y el navegador dibuja los ejes, el gap y el espacio sobrante. En **Computed** ves el ancho real de cada hijo.

---

## 3. Ejercicio a mano ✍️ (opcional)

Arreglá el caso 4 sin cambiar el ancho del contenedor:

1. Que el avatar sea **Fixed** de verdad (no se encoja).
2. Que el mail corte la línea en lugar de salirse de la card.

Pista: hacen falta `flex-shrink`, `min-width` y `overflow-wrap`. Si no te sale, preguntame por qué un texto dentro de un flex no se achica por debajo de su palabra más larga.

---

## 4. Para ir más lejos (opcional)
- Josh Comeau: [An Interactive Guide to Flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/)
- [web.dev/learn/css/flexbox](https://web.dev/learn/css/flexbox)
- [Flexbox Froggy](https://flexboxfroggy.com/#es): juego para practicar `justify-content` y `align-items`.
