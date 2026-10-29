# Clase 2.2 — Auto Layout con intención + variables y tokens

**Objetivo:** que tus componentes digan *cómo se comportan* (Auto Layout) y *qué decisión representa cada valor* (variables). Basado en la guía §6.5 y §6.6.

---

## 1. Auto Layout con intención

En la 2.1 usaste Auto Layout para que las cosas "queden bien". Ahora la idea es que cada contenedor responda a una pregunta: **¿qué pasa cuando cambia el contenido o el ancho?**

Para cada frame con Auto Layout decidís (guía §6.5):

| Decisión | Opciones en Figma | En CSS |
|---|---|---|
| Dirección | Horizontal / vertical | `flex-direction: row / column` |
| Separación | Spacing between items | `gap` |
| Padding | Padding | `padding` |
| Alineación | Alignment | `align-items`, `justify-content` |
| Tamaño | Hug / Fill / Fixed | contenido / `flex: 1` / ancho fijo + `flex-shrink: 0` |
| Límites | Min / max width | `min-width` / `max-width` |

**La prueba:** agarrá el frame del borde y estiralo, achicalo, poné un texto larguísimo. Si se rompe en Figma, la IA tampoco puede deducir cómo adaptarlo.

### Ejemplo resuelto: auditoría de la `MetricCard`

Así quedó la card en la 2.1, contenedor por contenedor:

```
MetricCard            vertical · padding 20 · gap 12 · ancho Fixed 280
├── iconWrapper       Fixed 40×40 (sin Auto Layout: el ícono va encima del círculo)
├── title             Fill · alto Hug → si el texto es largo, baja de línea
├── value             Hug
└── trend             horizontal · gap 4 · Hug · centrado vertical
```

Lo que está bien y lo que conviene cambiar:

| Contenedor | Hoy | Problema | Mejor |
|---|---|---|---|
| `MetricCard` | Fixed 280 | En el dashboard las cards van en una grilla: si la grilla mide 900px, no van a llenar el espacio. | **Fill** dentro de la grilla, con **min width 240** para que no se aplaste. En código: `grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr))`. |
| `title` | Fill | Nada: un título largo baja de línea sin romper la card. | Igual. |
| `value` | Hug | Un número como `1.284.567` podría ser más ancho que la card en mobile. | Fill + truncar, o dejarlo así y anotarlo para la 2.3 (contenido extremo). |
| `trend` | Hug | Nada. | Igual. |

> **Ojo con una diferencia:** en Figma, un hijo en Hug no se estira en el eje cruzado. En CSS sí (`align-items: stretch` es el default). Por eso la skill le pide a Claude declarar `align-items` explícito. Lo ves a fondo en la 1.3.

**El Button**, en cambio, está bien en Hug: el ancho lo define el texto. Lo único que se agrega a veces es un **min width** para que "OK" no quede como un botón minúsculo.

---

## 2. Variables y tokens: tres niveles

Hoy el Button tiene el celeste `#A8D6FF` escrito a mano en 6 lugares. Si mañana cambia el color de marca, tenés que encontrarlos todos. Peor: Claude lee `#A8D6FF` y no sabe si es "el color de acción", "un fondo decorativo" o una casualidad.

La guía propone tres niveles (§6.6):

| Nivel | Ejemplo | Qué dice |
|---|---|---|
| **Primitivo** | `blue/200` = `#A8D6FF` | *Cómo se ve.* La paleta disponible. |
| **Semántico** | `color/action/primary/bg` → `blue/200` | *Para qué sirve.* Una decisión de diseño. |
| **Componente** | `button/primary/bg` → `color/action/primary/bg` | Una decisión que solo vale para un componente. **Solo si hace falta.** |

> `#2563EB` explica un color. `color-action-primary` explica una decisión.

**Los componentes usan semánticos, nunca primitivos.** Si el Button usa `blue/200` directo y mañana el color de acción pasa a violeta, tenés que cambiar el Button. Si usa `color/action/primary/bg`, cambiás un alias y listo.

**¿Cuándo el nivel componente?** Cuando un componente necesita salirse del sistema en algo puntual. Para el Button y la MetricCard **no hace falta**: los semánticos alcanzan. Empezá sin ese nivel.

### Analogía

```
Primitivo        Semántico                    Componente
(la pintura)     (para qué se usa)            (dónde exactamente)

blue/200  ◄───── color/action/primary/bg ◄─── (no hace falta)
                        ▲
                        └── lo usa el Button primary
```

Cambiar la pintura cambia todo. Cambiar un semántico cambia solo esa decisión.

---

## 3. Ejemplo resuelto: tus colores actuales en tokens

Junté todos los colores que hoy tienen el Button y la MetricCard. Primero, una limpieza: **`#EEF6FF` (hover) y `#EAF4FF` (fondo del ícono) son casi iguales**. No hay razón de diseño para tener dos, así que se unifican en `blue/50`. Esto pasa siempre al tokenizar: aparecen valores duplicados que nadie decidió.

### Colección `Primitives`

| Variable | Valor | Dónde aparece hoy |
|---|---|---|
| `white` | `#FFFFFF` | Fondo de la card |
| `gray/200` | `#E5E7EB` | Borde de la card, fondo disabled |
| `gray/400` | `#9CA3AF` | Texto disabled |
| `gray/600` | `#4B5563` | Título de la card |
| `gray/900` | `#111827` | Texto principal, íconos |
| `blue/50` | `#EEF6FF` | Hover de secondary y ghost, fondo del ícono |
| `blue/200` | `#A8D6FF` | Fondo primary, borde secondary |
| `blue/300` | `#8CC7FF` | Hover primary |
| `blue/600` | `#2B7FD4` | Anillo de foco |
| `blue/900` | `#0B3F6E` | Texto secondary, ícono de la card |
| `green/700` | `#15803D` | Tendencia que sube |
| `red/700` | `#B91C1C` | Tendencia que baja |

### Colección `Semantic` (cada una es un **alias** de un primitivo)

| Variable | Apunta a | Para qué |
|---|---|---|
| `color/bg/surface` | `white` | Fondo de cards y superficies |
| `color/bg/accent-subtle` | `blue/50` | Fondos suaves de acento (círculo del ícono) |
| `color/text/default` | `gray/900` | Texto principal |
| `color/text/muted` | `gray/600` | Texto secundario (título de la card) |
| `color/text/disabled` | `gray/400` | Texto e íconos deshabilitados |
| `color/icon/accent` | `blue/900` | Ícono de la MetricCard |
| `color/border/default` | `gray/200` | Bordes neutros |
| `color/action/primary/bg` | `blue/200` | Fondo del botón principal |
| `color/action/primary/bg-hover` | `blue/300` | Hover del principal |
| `color/action/secondary/border` | `blue/200` | Borde del secundario |
| `color/action/secondary/text` | `blue/900` | Texto e ícono del secundario |
| `color/action/subtle/bg-hover` | `blue/50` | Hover de secondary y ghost |
| `color/action/disabled/bg` | `gray/200` | Fondo y borde deshabilitados |
| `color/focus/ring` | `blue/600` | Anillo de foco |
| `color/feedback/positive` | `green/700` | Tendencia que sube |
| `color/feedback/negative` | `red/700` | Tendencia que baja |

Pasa lo mismo con `blue/900`: es el texto del secundario y el ícono de la card. Mismo color, dos decisiones, dos semánticos.

Fijate que `blue/200` aparece en dos semánticos (`primary/bg` y `secondary/border`). Hoy son el mismo color, pero son **dos decisiones distintas**: si mañana el borde del secundario pasa a gris, cambiás uno solo.

### Espaciado y radios (variables de tipo *Number*)

Para espaciado alcanza una escala de primitivos: la escala ya es semántica ("chico, mediano, grande").

| Variable | Valor | Uso hoy |
|---|---|---|
| `space/1` | 4 | gap de `trend` |
| `space/1-5` | 6 | padding vertical del Button sm, gap sm |
| `space/2` | 8 | gap del Button md |
| `space/2-5` | 10 | padding vertical del Button md |
| `space/3` | 12 | padding horizontal sm, gap de la card |
| `space/4` | 16 | padding horizontal md |
| `space/5` | 20 | padding de la card |
| `radius/sm` | 6 | Button sm |
| `radius/md` | 8 | Button md |
| `radius/lg` | 12 | MetricCard |

La escala `space/N` = N × 4px es la misma de Tailwind (`p-4` = 16px), así el mapeo a código es directo. Figma no acepta puntos en los nombres de variables, por eso `space/1-5` en lugar de `space/1.5`; en código vuelve a ser `p-1.5`.

### Cómo llega esto al código

```
Figma                              CSS                              Tailwind
color/text/muted        →   --color-text-muted: #4B5563    →   text-text-muted
color/action/primary/bg →   --color-action-primary-bg      →   bg-action-primary-bg
space/4                 →   (escala de Tailwind)            →   p-4
```

Las barras `/` en Figma arman **grupos** en el panel y se convierten en guiones en código. Esto lo armamos de verdad en la 5.2 y la 6.1.

---

## 4. Tres detalles de Figma que importan

1. **Scopes (alcance).** A cada variable le podés decir dónde se puede usar. A los **primitivos les sacás todos los scopes**: así no aparecen al elegir un color y te obligás a usar semánticos. A los de espaciado, solo *Gap* y *Padding*; a los de radio, solo *Corner radius*.
2. **Modos: tu plan permite 1 por colección.** Lo probé en tu archivo: al agregar un segundo modo Figma responde *"Limited to 1 modes only"*. Consecuencia: el **dark mode no se arma con modos en Figma**. Se resuelve en código (clase 6.5) y, si querés mostrarlo en Figma, con una colección aparte (`Semantic Dark`).
3. **Variables para colores y números, estilos para tipografía.** Las variables guardan un valor suelto (un color, un número). Un estilo de texto guarda la combinación completa (fuente + tamaño + interlineado + peso). Para la tipografía usá **text styles**:

| Estilo | Fuente | Uso |
|---|---|---|
| `label/md` | Inter Medium 14/20 | Button md |
| `label/sm` | Inter Medium 13/20 | Button sm, `trendValue` |
| `body/sm` | Inter Regular 14/20 | `title` de la card |
| `heading/metric` | Inter Semi Bold 28/36 | `value` de la card |

---

## 5. Hacelo en Figma

1. **Primitivos.** Abrí *Local variables* y creá la colección `Primitives` con los 12 colores de la tabla. Sacales todos los scopes.
2. **Semánticos.** Creá la colección `Semantic` con las 16 variables. En cada una, en lugar de escribir el color, elegí el primitivo (click derecho en el valor → *Create alias*, o elegilo de la lista).
3. **Números.** En `Primitives`, creá `space/…` y `radius/…` (tipo *Number*) con sus scopes.
4. **Text styles.** Creá los 4 estilos de texto.
5. **Aplicalos.** Reemplazá en el Button y la MetricCard cada color, padding, gap, radio y texto por su variable o estilo. Tip: seleccioná el component set entero y mirá *Selected colors* en el panel derecho; ahí podés cambiar un color en todas las variantes de una vez.
6. **Auto Layout.** Pasá la `MetricCard` a min width 240 y probá estirarla y meterle un título largo.

Si te cansa la parte repetitiva (crear 38 variables a mano), hacé los primitivos y 3 o 4 semánticos vos para entender el mecanismo, y pedime que termine el resto por el MCP. Igual lo vamos a usar así en la 2.4.

**Cuando termines:** avisame y reviso por el MCP que ningún componente tenga colores sueltos.

---

## 6. Checklist

- [ ] Cada contenedor tiene dirección, gap, padding, alineación y tamaño decididos a propósito.
- [ ] Estiré los componentes y metí contenido largo: no se rompen.
- [ ] Primitivos sin scopes; semánticos como alias de primitivos.
- [ ] Los componentes usan solo variables semánticas (ningún hex suelto).
- [ ] Nombres con `/` que se traducen directo a código.
- [ ] Tipografía con text styles.

---

## 7. Para ir más lejos (opcional)
- Figma: [Guide to variables](https://help.figma.com/hc/en-us/articles/15339657135383)
- Figma: [Variable scopes](https://help.figma.com/hc/en-us/articles/15145852043927)
- Figma: [Guide to auto layout](https://help.figma.com/hc/en-us/articles/360040451373)
