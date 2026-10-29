# Clase 2.1 — Estructura, nombres, componentes y variantes

**Objetivo:** armar un archivo de Figma que un agente pueda leer sin adivinar. Basado en la guía §5 y §6.1–6.4.

---

## 1. Por qué importa para la IA

Cuando Claude lee tu archivo con el MCP (clase 2.4), no "mira" el diseño como vos: lee el **árbol de capas**, los nombres, los componentes y sus propiedades. Todo eso pasa casi directo al código.

| En Figma | En el código que genera Claude |
|---|---|
| Capa `MetricCard` | Componente `<MetricCard>` |
| Capa `Frame 438` | Un `<div>` sin nombre: Claude tiene que adivinar qué es |
| Componente + instancias | Un componente reutilizado |
| Grupo copiado y pegado 5 veces | 5 bloques de código duplicados |
| Propiedad `variant: primary \| secondary` | Prop `variant="primary"` |

Una captura perfecta puede ser una especificación pobre. Un archivo estructurado explica **cómo está construida** la interfaz, no solo cómo se ve.

---

## 2. Páginas

Cualquier persona nueva (o un agente) tiene que encontrar la fuente correcta sin preguntar:

```
00 — Cover y contexto
01 — Foundations        colores, tipografía, espaciado
02 — Components
03 — Patterns           combinaciones de componentes (un formulario, una tabla con filtros)
04 — Flows
05 — Screens
06 — Ready for development
99 — Archive
```

No hace falta copiar los nombres exactos. Lo importante es que el orden sea obvio.

---

## 3. Nombres: qué es, no cómo se dibujó

- ✅ `Topbar`, `SearchInput`, `ProjectRow`, `StatusBadge`, `ErrorMessage`
- ❌ `Frame 438`, `Group 12`, `Rectangle 91`, `Copy 4`

**Convención:** PascalCase para componentes (`MetricCard`) y nombres de rol en minúscula para las capas internas (`icon`, `title`, `value`). Son los nombres que después vas a ver en React.

**Ejemplo resuelto.** Una card de métrica con un ícono en un círculo, el título "Menciones en ChatGPT", el valor "1.284" y una tendencia "↑ 12%":

```
Antes                     Después
Frame 438                 MetricCard
├── Group 12              ├── iconWrapper
│   ├── Rectangle 91      │   ├── background
│   └── Vector            │   └── icon
├── Text                  ├── title
├── Text copy             ├── value
└── Frame 9               └── trend
    ├── Vector 2              ├── trendIcon
    └── Text copy 2           └── trendValue
```

Con el árbol de la derecha, Claude sabe que `trend` es un bloque propio (probablemente con color según suba o baje) sin que se lo expliques.

---

## 4. ¿Componente o no?

Antes de crear uno, revisá (guía §6.3):
1. ¿Ya existe algo equivalente en Figma?
2. ¿Ya existe en código, aunque no esté en Figma?
3. ¿Sirve reutilizarlo tal cual?
4. ¿Conviene extenderlo con una propiedad o variante?
5. ¿Es algo de una sola pantalla que debería quedar interno?

No todo grupo visual es un componente. Se crea cuando hay **reutilización real**.

| Caso | ¿Componente? | Por qué |
|---|---|---|
| Botón primario en 14 pantallas | Sí | Reutilización obvia. Si cambia, cambia en todos lados. |
| Hero de la landing, aparece una vez | No | Es una sección de una pantalla. Se arma con componentes (botones, badges) adentro. |
| Fila de tabla que se repite 20 veces | Sí | Es la misma pieza con distintos datos. En código va a ser un `.map()` sobre una lista. |
| Badge de estado en la tabla y en el detalle | Sí | Se usa en dos lugares, con variantes `active`, `paused`, `error`. |
| Ilustración del empty state de una pantalla | No | No se reutiliza. Queda como capa con buen nombre. |

---

## 5. Propiedades y variantes

| Tipo de propiedad en Figma | Para qué | En React |
|---|---|---|
| **Variant** | Diferencias discretas y aprobadas (`primary`, `secondary`) | `variant: "primary" \| "secondary"` |
| **Text** | Texto editable | `label: string` o `children` |
| **Boolean** | Mostrar u ocultar algo | prop opcional o `true`/`false` |
| **Instance swap** | Cambiar un ícono o subcomponente | `iconStart={<IconPlus />}` |
| **Slot** | Contenido libre adentro | `children` |

**Cada variante se multiplica.** 3 variantes × 3 tamaños × 5 estados = **45 combinaciones** para mantener en Figma y en código. No crees combinaciones que nadie va a usar.

### Ejemplo resuelto: la API del `Button`

Requisitos: primario, secundario y ghost; dos tamaños; ícono opcional a la izquierda; deshabilitado; loading.

```
Button
├── variant: primary | secondary | ghost     ← Variant
├── size: sm | md                            ← Variant
├── state: default | hover | focus | disabled ← Variant
├── loading: true | false                    ← Boolean (muestra un spinner en lugar del ícono)
├── showIconStart: true | false              ← Boolean
├── iconStart: Icon                          ← Instance swap
└── label: "Guardar"                         ← Text
```

Combinaciones: 3 × 2 × 4 = **24**. `loading` y el ícono son booleanos, así que no multiplican variantes.

**¿Por qué `hover` y `focus` son variantes en Figma, si en código no son props?** En Figma los necesitás para dibujarlos, documentarlos y prototipar. En código **no** son props: los maneja el navegador con `:hover` y `:focus-visible`. Cuando Claude lea el componente, la skill le indica traducirlos a estilos y no a props. `disabled` y `loading` sí pasan a props, porque los decide la app.

---

## 6. Hacelo en Figma

1. Creá un archivo nuevo en tus drafts: **`Design Engineer Journey`**. Lo vas a usar en todo el módulo 2 y es el que vamos a conectar con el MCP.
2. Armá las páginas `00 — Cover`, `01 — Foundations`, `02 — Components`, `05 — Screens` y `99 — Archive`. Las demás las sumás cuando haga falta.
3. En `02 — Components`, creá un componente **`Icon`** de 16×16 con 3 variantes (`name: plus | arrow-right | check`).
4. Creá el **`Button`** con la API del punto 5. Usá Auto Layout con padding y gap (lo vemos a fondo en la 2.2).
5. Creá la **`MetricCard`** con el árbol de capas del punto 3.
6. Revisá que ninguna capa se llame `Frame …`, `Group …` ni `Rectangle …`.

**Cuando termines:** mandame el link del archivo (o capturas del árbol de capas y del panel de propiedades del `Button`) y lo reviso.

---

## 7. Checklist

- [ ] Páginas con nombres que se entienden sin preguntar.
- [ ] Capas con nombres semánticos, sin `Frame`/`Group`/`Rectangle`.
- [ ] Componentes solo donde hay reutilización real.
- [ ] Propiedades con el tipo correcto (variant, text, boolean, instance swap).
- [ ] Sin combinaciones de variantes que nadie va a usar.

---

## 8. Para ir más lejos (opcional)
- Figma: [Guide to components](https://help.figma.com/hc/en-us/articles/360038662654)
- Figma: [Create and use component properties](https://help.figma.com/hc/en-us/articles/5579474826519)
