# Clase 1.2 — Box model y unidades

**Objetivo:** saber exactamente cuánto mide cada elemento y elegir la unidad correcta. Es la base para maquetar pixel-perfect.

---

## 1. Concepto

### El box model
Todo elemento en la web es una caja con 4 capas, de adentro hacia afuera:

```
┌─────────── margin (espacio afuera, transparente) ───────────┐
│  ┌──────── border (el borde) ─────────────────────────────┐ │
│  │  ┌───── padding (espacio adentro) ──────────────────┐  │ │
│  │  │        content (el contenido)                    │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### `box-sizing`: ¿qué mide `width`?
- **`content-box`** (el default del navegador): `width` mide **solo el contenido**. El padding y el border se **suman** por fuera.
- **`border-box`**: `width` mide **todo, incluidos padding y border**. El contenido se achica para que entre.

> **Analogía Figma:** `border-box` es como un frame de ancho fijo con Auto Layout y stroke *inside*: agregás padding y el frame sigue midiendo lo mismo. Por eso casi todos los proyectos (y Tailwind) ponen `border-box` en todo.

### Márgenes verticales que se "colapsan"
Cuando dos márgenes **verticales** se tocan, no se suman: queda **el más grande**. Pasa solo arriba/abajo, nunca a los costados, y no pasa dentro de Flexbox ni de Grid.

### Unidades

| Unidad | Relativa a… | Uso típico |
|---|---|---|
| `px` | nada (fija) | bordes, sombras, detalles finos |
| `rem` | tamaño de texto **raíz** (normalmente 16px) | tipografía y espaciado |
| `em` | tamaño de texto **del propio elemento / su padre** | espaciado que escala con el texto de un componente (padding de un botón) |
| `%` | el **padre** | anchos dentro de un contenedor |
| `vw` / `vh` | ancho / alto de la **ventana** | secciones a pantalla completa |
| `ch` | ancho del carácter "0" de la fuente | ancho de lectura (`max-width: 65ch`) |

`em` se **acumula**: un `1.5em` dentro de otro `1.5em` multiplica dos veces. `rem` siempre mira la raíz y no se acumula.

---

## 2. Ejercicio: predecir

Respondé **antes** de abrir `index.html`:

1. **Caso 1 (content-box):** `width: 200px`, `padding: 20px`, `border: 5px`. ¿Cuánto mide de ancho la caja **en pantalla**?
2. **Caso 2 (border-box):** las mismas medidas. ¿Cuánto mide en pantalla? ¿Y cuánto le queda de ancho al **contenido**?
3. **Caso 3:** el primer párrafo tiene `margin-bottom: 20px` y el segundo `margin-top: 30px`. ¿Cuánto espacio queda entre ellos?
4. **Caso 4:** tamaño base 16px. ¿Cuántos px mide el texto de **"Hijo em"**? ¿Y el de **"Hijo rem"**?

Después verificalo en DevTools: click derecho → **Inspeccionar** → pestaña **Computed**, donde está el dibujo del box model con los números exactos.

---

## 3. Ejercicio a mano ✍️ (opcional)

Agregá al principio del `<style>` el reset que usan casi todos los proyectos, y fijate qué cambia en la caja A:

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

---

## 4. Para ir más lejos (opcional)
- [web.dev/learn/css/box-model](https://web.dev/learn/css/box-model)
- [web.dev/learn/css/sizing](https://web.dev/learn/css/sizing)
- Josh Comeau: [Rules of Margin Collapse](https://www.joshwcomeau.com/css/rules-of-margin-collapse/)
