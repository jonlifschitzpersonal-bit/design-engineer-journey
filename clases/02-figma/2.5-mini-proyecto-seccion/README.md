# Clase 2.5 — Mini-proyecto: una sección AI-ready

**Objetivo:** juntar todo el módulo en una pieza de verdad: una **sección de pantalla** armada solo con tus componentes y tokens, que Claude pueda pasar a código en la 2.6 sin adivinar nada. Basado en la guía §6 completa, §13 (slices) y §21 (checklist "Antes de entregar Figma").

Hasta ahora diseñaste piezas sueltas. Una sección agrega lo que ninguna pieza tiene sola: **cómo se ordenan, qué contenido real llevan, cómo se adaptan al ancho y qué pasa cuando los datos no llegan.**

---

## 1. Componente vs. sección

| | Componente (`MetricCard`) | Sección (`Resumen`) |
|---|---|---|
| ¿Se reutiliza? | Sí, en muchas pantallas | No, aparece una vez |
| En Figma es | Component set con variantes | **Frame bien nombrado** (regla de la 2.1: lo que aparece una vez no es componente) |
| Tiene | Propiedades y estados propios | Instancias + layout + contenido real + estados de la sección + responsive |
| Vive en | `02 - Components` | `05 - Screens` |

Una sección es lo que la guía llama un **slice** (§13): una porción chica del producto, con un objetivo que se puede comprobar y un criterio de cierre. Por eso la 2.6 va a implementar exactamente esto y nada más.

---

## 2. Primero el brief, después el dibujo

El primer punto del checklist de la guía es "problema, usuario y alcance claros". Si eso no está escrito, Claude lo completa con lo más genérico posible.

### Ejemplo resuelto: el brief de "Resumen del proyecto"

| | |
|---|---|
| **Problema** | Quien entra al dashboard quiere saber en cinco segundos cómo viene el proyecto. |
| **Usuario** | Líder de producto o de equipo, en desktop casi siempre; a veces lo mira desde el celular. |
| **Qué muestra** | Título "Resumen" + estado del proyecto (`StatusBadge`) + período "Últimos 30 días" + botón "Exportar" + 4 métricas. |
| **Métricas** | Usuarios activos `1.284` ↑ 12% · Ingresos `$ 48.920` ↑ 8% · Conversión `3,2%` ↓ 0,4% · Pedidos `356` — 0% |
| **Fuera de alcance** | Cambiar el período, gráficos, abrir el detalle de una métrica, la exportación real. |

> Fijate que el contenido es **representativo**: números con formato argentino, un caso que sube, uno que baja, uno sin cambio. Nada de "Title" ni "1234". Así en Figma ya se prueba lo que va a pasar con datos de verdad.

### Evidencia, decisión y suposición (lo que viste en la 2.4)

| Tipo | En esta sección |
|---|---|
| **Evidencia** | La `MetricCard` tiene min width 240 y `trend: up \| down \| neutral`; el Button tiene `secondary`; el `StatusBadge` tiene `active`. |
| **Decisión a tomar** | ¿El botón "Exportar" se muestra mientras cargan los datos? ¿Deshabilitado o activo? |
| **Decisión a tomar** | `trend: down` siempre es rojo. Si sumáramos "Tickets abiertos", bajar sería bueno y se vería rojo. **Recomendación:** por ahora solo métricas donde subir es bueno, y anotarlo como límite del componente. |
| **Suposición a evitar** | Que en mobile el header queda igual que en desktop. Hay que dibujarlo. |

---

## 3. La estructura de capas

Mismas reglas de siempre: nombres por rol en camelCase, instancias renombradas, sin frames de más, Auto Layout en todo.

```
05 - Screens
└── Section "Resumen"
    ├── summary · desktop        ← frame de 1280, NO componente
    │   ├── header                  (horizontal, space-between)
    │   │   ├── heading             (vertical, gap space/1)
    │   │   │   ├── titleRow        (horizontal, gap space/3, centrado)
    │   │   │   │   ├── title           "Resumen" · heading/section
    │   │   │   │   └── projectStatus   StatusBadge · active
    │   │   │   └── period          "Últimos 30 días" · body/sm · text/muted
    │   │   └── exportButton        Button · secondary · md · "Exportar"
    │   └── metrics                 (horizontal con wrap, gap space/4)
    │       ├── activeUsers         MetricCard · up
    │       ├── revenue             MetricCard · up
    │       ├── conversion          MetricCard · down
    │       └── orders              MetricCard · neutral
    ├── summary · mobile         ← frame de 375
    ├── summary · loading
    ├── summary · partial-error
    └── annotations
```

Tres detalles que hacen la diferencia en código:

1. **`metrics` usa wrap y las cards en Fill con min width 240.** Es lo más parecido en Figma a la grilla `repeat(auto-fill, minmax(15rem, 1fr))` que anotaste en la 2.3: las cards se reparten solas según el ancho.
2. **Las instancias tienen nombre de dato** (`activeUsers`, `revenue`), no `MetricCard 1`, `MetricCard 2`. En código van a ser las claves de los datos.
3. **`header` en space-between**: el título a la izquierda y el botón a la derecha, sin un espacio fijo en el medio que se rompa con otro ancho.

### Lo que falta en el sistema (y se crea antes de usarlo)

Al mirar la sección aparecen tres cosas que tus tokens no tienen todavía:

| Falta | Para qué | Propuesta |
|---|---|---|
| Un espaciado de 24px | Padding de la sección en desktop y separación header → métricas | `space/6` = 24 |
| Un espaciado de 32px | Padding de la sección en desktop grande | `space/8` = 32 |
| Un título de sección | "Resumen" es un `<h2>`: más grande que el label, más chico que el número de la card | text style `heading/section` · Semi Bold 20/28 |

Regla de la 2.3: si no existe, **se crea el token primero**, nunca un valor suelto "por esta vez".

---

## 4. Responsive: dos anchos dibujados, uno anotado

| Ancho | Qué cambia | ¿Se dibuja? |
|---|---|---|
| **Desktop 1280** | Header en una fila; 4 cards en fila; padding `space/8` | Sí |
| **Tablet 640–1023** | 2 × 2 cards (sale solo por el min width) | No: se anota |
| **Mobile 375** | Header apilado: título arriba, botón abajo a **ancho completo**; 1 card por fila; padding `space/4` | Sí |

Mobile se dibuja porque cambia el **orden** del header, y eso no se deduce de ningún min width. La tablet no se dibuja porque lo resuelve la grilla sola.

```
Desktop                                            Mobile
┌──────────────────────────────────────────────┐   ┌─────────────────┐
│ Resumen ● Activo                 [Exportar]  │   │ Resumen ● Activo│
│ Últimos 30 días                              │   │ Últimos 30 días │
│ ┌────────┐┌────────┐┌────────┐┌────────┐     │   │ [   Exportar   ]│
│ │ 1.284  ││48.920  ││ 3,2%   ││  356   │     │   │ ┌─────────────┐ │
│ └────────┘└────────┘└────────┘└────────┘     │   │ │   1.284     │ │
└──────────────────────────────────────────────┘   │ └─────────────┘ │
                                                   │   (3 más abajo) │
                                                   └─────────────────┘
```

---

## 5. Estados de la sección

Las cards ya tienen sus estados. Lo nuevo es cómo se ven **juntas**:

| Estado | Cómo se ve | ¿Se dibuja? |
|---|---|---|
| **default** | Lo de arriba | Sí |
| **loading** | Las 4 cards en `state=loading`; el header queda igual | Sí |
| **partial-error** | Una card en `state=error` y las otras normales: una métrica que falla no tira abajo la sección | Sí |
| **Sin datos previos** | Las 4 con `showTrend` apagado (primer período) | No: se anota |

`partial-error` es el estado que más se olvida y el que más pasa en la realidad: los datos suelen venir de fuentes distintas.

---

## 6. Las anotaciones de la sección

Como siempre, dos veces: nativas para Claude y visibles en el frame `annotations`.

| Categoría | Anotación |
|---|---|
| Development | `metrics`: grilla `repeat(auto-fill, minmax(15rem, 1fr))`; 4 → 2 → 1 columna. Breakpoint del header: `sm` (640). |
| Development | Cada métrica se carga por separado: si una falla, solo esa card muestra error. |
| Accessibility | "Resumen" es el `<h2>` de la sección; los títulos de las cards son `<h3>`. La sección se nombra con su título. |
| Accessibility | El estado del proyecto se lee junto al título ("Resumen, proyecto activo"). |
| Interaction | "Exportar": fuera de alcance en esta etapa. Mientras carga, [según tu decisión]. |
| Content | Período fijo "Últimos 30 días". Números con formato `es-AR`. Solo métricas donde subir es bueno. |

---

## 7. Hacelo vos

Esta vez dirigís un proyecto completo, no un componente:

1. **El pedido.** Escribime el pedido con el prompt base de la 2.4. Podés usar el brief de la sección 2 tal cual o cambiarlo (otras métricas, otro título, otro botón). Antes de tocar nada, te voy a mostrar qué encontré, qué voy a reutilizar, extender y crear, y las decisiones que te tocan.
2. **La construcción.** Con tu aprobación armo los tokens que faltan, los 4 frames y las anotaciones en `05 - Screens`. Si querés hacer una parte vos (por ejemplo, el frame mobile), decímelo y la reviso.
3. **La revisión.** Recorrés el resultado con el checklist de abajo. Yo corro la auditoría y, si todo pasa, marcamos la Section como *ready for dev*.

---

## 8. Checklist "Antes de entregar Figma" (guía §21)

- [ ] Problema, usuario y alcance escritos (y lo que queda afuera).
- [ ] Capas con nombres semánticos; instancias nombradas por su dato.
- [ ] Auto Layout y resizing probados en 1280 y en 375.
- [ ] Solo componentes e instancias del sistema; nada desacoplado (*detach*).
- [ ] Todo con variables y text styles; lo que faltaba se creó como token.
- [ ] Estados de la sección: default, loading, error parcial (y el resto anotado).
- [ ] Responsive dibujado donde cambia el orden; anotado donde lo resuelve la grilla.
- [ ] Contenido realista: formato argentino, un caso de cada tendencia.
- [ ] Accesibilidad: jerarquía de encabezados y lectura del estado.
- [ ] Comportamiento no visual anotado (nativo + visible).
- [ ] Section marcada *ready for dev* solo si todo lo anterior se cumple.

---

## 9. Resultado (2026-10-29)

**Decisiones de Jonathan:** "Exportar" deshabilitado mientras carga · 4 íconos nuevos de Lucide · las métricas donde bajar es bueno quedan afuera (anotado en la descripción de la `MetricCard`).

**En Figma** (página `05 - Screens`, Section `Resumen`, marcada *ready for dev*):

| Frame | Qué muestra |
|---|---|
| `summary · desktop` | 1280 · 4 cards en fila |
| `summary · mobile` | 375 · header apilado, botón a ancho completo, 1 card por fila |
| `summary · loading` | 4 cards en skeleton · "Exportar" deshabilitado · mismo alto que desktop |
| `summary · partial-error` | Ingresos en `error`, las demás normales |
| `annotations` | 7 notas (también nativas, sobre cada nodo) |

**Sumado al sistema:** íconos `users`, `currency` (= `dollar-sign` de Lucide), `percent` y `package` · tokens `space/0-5` (2), `space/6` (24), `space/8` (32) · text style `heading/section` (Semi Bold 20/28).

**Bugs encontrados al armar la sección:** 18 variantes del Button (hover, focus, disabled) y 3 de la MetricCard (`neutral`, `loading`, `error`) no tenían las propiedades conectadas. En pantalla no se notaba hasta que una instancia cambiaba un texto y seguía diciendo "Guardar" o "Menciones en ChatGPT". Se conectaron, y la auditoría ahora compara las conexiones de cada variante con las de la default.

---

## 10. Para ir más lejos (opcional)
- Figma: [Guide to auto layout: wrap](https://help.figma.com/hc/en-us/articles/360040451373)
- Guía del curso: §13 "Trabajar por slices" y §21 "Checklists reutilizables"
