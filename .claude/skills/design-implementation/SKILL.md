---
name: design-implementation
description: Buenas prácticas de craft para implementar diseños en código (HTML, CSS, Tailwind, React, Next.js), en especial desde Figma. Usala SIEMPRE que vayas a escribir, generar, modificar o revisar estilos o markup de una interfaz — al implementar un diseño de Figma, maquetar una página o componente, pasar un mock a código, ajustar layout, tipografía o espaciado, o revisar código de UI generado por IA — aunque el pedido no mencione "buenas prácticas" ni esta skill.
---

# Implementación de diseño con craft

Reglas para que lo implementado **se vea y se comporte igual al diseño**, sea predecible para quien lo lea después y no genere bugs de layout difíciles de rastrear. Cada regla explica **por qué** existe, para aplicarla con criterio y no de memoria.

Son reglas **generales**: valen para cualquier proyecto. Los nombres que aparecen (`MetricCard`, `color/text/muted`, Lucide) son **ejemplos**, no datos del proyecto en el que estás. Lo que cambia de un proyecto a otro se lee del proyecto (sección 0).

La skill `figma-ai-ready` cubre la otra mitad: cómo preparar el archivo de Figma para que esto se pueda implementar sin adivinar.

---

## 0. Antes de empezar: leé el proyecto

Ningún proyecto es igual. Antes de escribir código, averiguá:

| Qué | Dónde mirarlo | Si no existe |
|---|---|---|
| Reglas del proyecto | `CLAUDE.md`, `AGENTS.md`, `docs/`, `README` | Seguí esta skill |
| Stack | `package.json`: framework, versión de Tailwind, librería de componentes, TypeScript | Preguntá antes de agregar dependencias |
| Tokens | Archivo de tokens (`tokens.css`, `@theme`, `tailwind.config`) y variables de Figma | Proponé crearlos; no escribas valores sueltos |
| Convención de nombres de tokens | Cómo se llaman en Figma y cómo en código (y su *code syntax*) | Barras de Figma → guiones en código |
| Breakpoints | Config del proyecto o anotaciones de Figma | Los de Tailwind: 640 / 768 / 1024 / 1280 |
| Componentes existentes | La carpeta de componentes del repo | Recién ahí se crea uno nuevo |
| Librería de íconos | `package.json`, descripción del componente de íconos en Figma | Preguntá; no dibujes íconos a mano |
| Diseño | El nodo exacto de Figma por el MCP: frames, variables, descripciones y anotaciones | Pedí el link al nodo |

**Si una regla del proyecto contradice esta skill, gana la del proyecto**, y lo decís para que quede a la vista.

---

## 1. HTML base

- Incluí `<html lang="…">` y `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. Sin `viewport`, mobile renderiza la página como desktop achicado.
- Usá elementos semánticos: `<main>`, `<header>`, `<nav>`, `<section>`, `<h1>`–`<h6>` en orden, `<p>`, `<button>` para acciones y `<a>` para navegación. Un `<div>` clickeable no es accesible por teclado ni por lector de pantalla.

## 2. Especificidad y cascada

- Estilá con **clases**, con especificidad baja y pareja. Así cualquier regla nueva se puede sobreescribir sin escalar.
- **No uses IDs para estilar.** Un ID (1-0-0) le gana a cualquier cantidad de clases y obliga a pelear con más especificidad.
- **No uses `!important`.** Si parece necesario, casi siempre hay un problema de especificidad mal resuelto. La única excepción razonable es pisar CSS de terceros; en ese caso, dejá un comentario explicando por qué.
- Evitá selectores descendientes largos (`.page .card .body p`): suben la especificidad y acoplan el estilo a la estructura del HTML.
- Cuando un estilo "no se aplica", revisá en DevTools qué regla lo pisa (aparece tachada) antes de agregar especificidad.

## 3. Reset base

Si el proyecto **no usa Tailwind** (su *preflight* ya lo trae), empezá el CSS con:

```css
*, *::before, *::after {
  box-sizing: border-box;
}

button, input, select, textarea {
  font: inherit;
  color: inherit;
}
```

- **`border-box`:** el `width` incluye padding y border, igual que un frame de Figma de ancho fijo. Con `content-box`, una card de `width: 200px` con `padding: 20px` y `border: 5px` mide 250px.
- **`font: inherit` en controles:** los navegadores les ponen fuente y color propios, así que **no heredan** la tipografía de la página.

## 4. Unidades

| Uso | Unidad | Por qué |
|---|---|---|
| Tamaño de texto y espaciado | `rem` | Relativo a la raíz: predecible y respeta el zoom de texto del usuario. |
| Espaciado que escala con el texto de un componente (padding de un botón, ícono junto al texto) | `em` | Crece en proporción si cambia el tamaño de fuente del componente. |
| Bordes, hairlines, sombras, trazos | `px` | Detalles finos que no tienen que escalar. |
| Ancho de bloques de lectura | `ch` | Se mide en caracteres. |
| Anchos dentro de un contenedor | `%` | Relativo al padre. |

- **Nunca uses `em` para `font-size` en elementos anidados:** se acumula (`1.5em` dentro de `1.5em` da 36px, no 24px).
- Con Tailwind, usá la escala del sistema (`text-lg`, `p-4`, `gap-6`) y evitá valores arbitrarios en px (`text-[17px]`), salvo que el diseño lo justifique y no exista el token.

## 5. Espaciado entre elementos

- Para separar hermanos, usá **`gap`** en Flexbox o Grid en lugar de márgenes. Funciona como el *spacing* del Auto Layout y evita el colapso de márgenes.
- Si usás márgenes, en **una sola dirección**. Los márgenes verticales que se tocan **se colapsan** (20 + 30 = 30, no 50).

## 6. Tipografía de lectura

- Bloques de texto con **`max-width: 65ch`** (45–75 caracteres por línea), centrados con `margin-inline: auto`.
- **`line-height`:** ~`1.5`–`1.6` para texto corrido y ~`1.1`–`1.2` para títulos grandes.
- **`text-wrap: balance`** en títulos, para que no quede una palabra sola.
- `font-family` con **lista de respaldo** que termine en una familia genérica (`…, sans-serif`).
- Padding lateral en el contenedor principal para que en mobile el texto no toque el borde.
- **`font-variant-numeric: tabular-nums`** en números que se comparan o cambian (tablas, métricas, contadores), para que los dígitos no "bailen".

## 7. Layout: de Auto Layout a Flexbox y Grid

| Figma | CSS / Tailwind |
|---|---|
| Horizontal / vertical | `display: flex` + `flex-direction` (`flex`, `flex-col`) |
| Spacing between items | `gap` |
| Spacing "Auto" | `justify-content: space-between` |
| Hug | el default del hijo |
| Fill (eje principal) | `flex: 1` (`flex-1`) |
| Fixed | ancho fijo **+ `flex-shrink: 0`** (`shrink-0`) |
| Wrap + hijos en Fill con min width | **Grid** `repeat(auto-fill, minmax(<min>, 1fr))`, no `flex-wrap` |

- **En el eje cruzado, CSS estira por default** (`align-items: stretch`); Figma no. Si el diseño muestra hijos en Hug, declará `align-items`.
- **Un ancho fijo dentro de un flex se puede encoger:** íconos, avatares y botones de ancho fijo llevan `flex-shrink: 0`.
- **Un texto dentro de un flex no se achica por debajo de su palabra más larga** (`min-width: auto`). Si puede recibir contenido largo, agregá `min-width: 0` y `overflow-wrap: anywhere` o `truncate`.
- **Flexbox** para una dimensión; **Grid** para dos o para alinear columnas entre filas.
- **El ancho fijo de un componente en Figma suele ser solo el de muestra.** Lo que pasa a código es su *min/max width*: una card de 280 con min width 240 no lleva `width: 280px`; la dimensiona su contenedor (`minmax(15rem, 1fr)`).
- **Una fila con *wrap* cuyos hijos van en Fill con min width es una grilla.** Con `flex-wrap`, la última fila estira sus cards y quedan de otro ancho que las de arriba.
- **Título a un lado y acción al otro (espaciado "Auto") es `justify-between`**, sin un espacio fijo en el medio. Si en mobile se apila, la base es la columna y el breakpoint la pasa a fila.
- **Un stroke de Figma se traduce según si suma al layout.** Leé `strokesIncludedInLayout` por el MCP, no lo supongas:

  | Stroke en Figma | En código | Ejemplo |
  |---|---|---|
  | Incluido en el layout | `border` real | card de 194 = 1 + 20 + 152 + 20 + 1 |
  | *Inside* que no suma | `box-shadow: inset 0 0 0 1px …` | botón de 40 que con `border` mediría 42 |
  | *Outside* (anillo de foco) | `outline` | foco de 2px |

- **No fijes alturas** en contenedores con texto. Usá `min-height` o dejá que el contenido defina la altura.

## 8. Responsive

- **Mobile first:** el estilo base es para pantallas chicas y los breakpoints suman.
- Usá **los breakpoints del proyecto** (sección 0). Si el diseño dibuja un ancho y anota otro, respetá las anotaciones.
- `clamp()` para títulos que escalan entre un mínimo y un máximo.
- Container queries si un componente cambia según su espacio y no según la pantalla.
- `min-h-dvh` en lugar de `100vh` para pantallas completas en mobile.
- **Nunca scroll horizontal.** Probá a 320px.

## 9. Color y tokens

- **No escribas colores, espaciados ni radios sueltos.** Usá los tokens del proyecto (custom properties o el tema de Tailwind). Un valor suelto no cambia cuando cambia el sistema y rompe el dark mode.
- En los componentes, tokens **semánticos** (`--color-text-muted`), no primitivos (`--blue-500`). El semántico dice para qué sirve y es lo que cambia entre modos.
- **Los nombres de las variables de Figma se traducen sin reinterpretar**, con la convención del proyecto. Si no hay una: las barras pasan a guiones (`color/text/muted` → `--color-text-muted`). Si la variable tiene *code syntax*, usá esa. Si la escala de espaciado de Figma sigue la de Tailwind (`space/4` = 16px), traducila directo (`space/4` → `p-4`; `space/1-5` → `p-1.5`, porque Figma no acepta puntos en los nombres).
- **No fusiones semánticos porque hoy tengan el mismo valor.** Dos tokens que apuntan al mismo primitivo son dos decisiones: si se unifican, cambiar una rompe la otra.
- **Un text style de Figma = una clase o utilidad** (tamaño, interlineado y peso juntos). No copies `font-size` y `font-weight` sueltos de cada capa.
- **Modos (dark mode):** si las variables de Figma tienen varios modos, cada modo redefine los semánticos en código. Si el plan de Figma no permite modos (Starter: 1 por colección), el dark mode se define solo en código, redefiniendo los semánticos.
- Si no existe un token para lo que necesitás, **no lo inventes en silencio**: avisá y proponé uno.
- Contraste WCAG AA: **4.5:1** texto normal, **3:1** texto grande (24px, o 18.66px bold) y bordes de controles e íconos con significado. Los controles deshabilitados están exentos. Un borde de bajo contraste vale solo si es decorativo: el de un input vacío necesita 3:1.
- **Ningún significado solo con color**, y lo visual tampoco alcanza para el lector: una tendencia "↑ 12%" se anuncia como texto ("Subió 12% respecto del período anterior") y la flecha se oculta.

## 10. Accesibilidad e interacción

- **`<button>` para acciones, `<a href>` para navegar.** Nunca un `<div onClick>`.
- Foco visible con `:focus-visible` y un anillo claro. **Nunca** `outline: none` sin reemplazo.
- Todo input con `<label>`; los errores junto al campo y conectados con `aria-describedby`.
- Botones solo con ícono llevan `aria-label`. Íconos decorativos, `aria-hidden="true"`.
- Imágenes con `alt` descriptivo, o `alt=""` si son decorativas.
- Áreas táctiles de al menos **24×24px**, idealmente 44×44px en mobile.
- Implementá **todos los estados** del diseño (default, hover, focus-visible, active, disabled y, si aplica, loading y error). No inventes los que faltan: preguntá.
- **Leé las anotaciones de Figma antes de implementar.** Ahí está lo que el dibujo no muestra: estados sin variante, grilla responsive, formato de datos, textos para lector. Si una anotación contradice el dibujo, preguntá.
- **El skeleton de loading ocupa lo mismo que el contenido final**, para que el layout no salte. Anunciá la carga (`aria-busy` en el contenedor).
- **Una variante de Figma que existe solo por obligación no es un caso a implementar.** Si la descripción dice que `loading` ignora `trend`, el componente en `loading` no renderiza tendencia.
- **Una sección se nombra por su título:** `<section aria-labelledby="…">` apuntando a su encabezado; los títulos de los bloques de adentro van un nivel abajo. Si hay un estado junto al título (un badge), se lee con él.
- **Con varias fuentes de datos, cada bloque maneja su propio loading y error.** Si uno falla, solo ese muestra error. Las acciones que dependen de los datos quedan deshabilitadas mientras cargan.
- **En HTML sin framework, los estados se arman como en Figma:** todas las capas en el markup (skeletons, mensaje de error, texto "Cargando") y un `data-state` en el contenedor que decide con CSS cuáles se ven. Lo oculto va con `display: none`, así tampoco lo lee el lector. En React, se renderiza según la prop.
- **Si no hay datos reales, los estados se muestran con un control de demo** marcado como tal, fuera del diseño y oculto si no carga JavaScript.
- `hover` solo con mouse: Tailwind v4 ya lo respeta; en CSS puro, `@media (hover: hover)`.
- Componentes interactivos complejos (dialog, menu, tabs, combobox, tooltip): **librería headless accesible** (Radix, Base UI) o shadcn/ui, no desde cero.
- Respetá `prefers-reduced-motion`.
- Animá solo `transform` y `opacity`. Nunca `transition: all`.

## 11. Íconos

- **Los íconos usan `currentColor`** y heredan el color del texto: el mismo ícono sirve en cualquier estado sin props de color.
- **Mismo trazo que en Figma a cualquier tamaño:** `stroke-width` en px reales y `vector-effect: non-scaling-stroke` en los trazos. Sin eso, un ícono de 24 achicado a 14 queda con un trazo más fino que el diseño.
- **Usá la librería de íconos del proyecto**, con el nombre que indique la equivalencia documentada en Figma. No dibujes íconos a mano.
- **Verificá la equivalencia por la forma, no por el nombre:** un `arrow-up` de Figma puede ser `move-up` en la librería. Compará la geometría antes de usarlo.

## 12. Imágenes y contenido

- Toda imagen con dimensiones (`width`/`height` o `aspect-ratio`). En Next.js, `next/image`.
- Probá con contenido real y extremo: textos larguísimos, vacíos, un ítem, cien ítems.

## 13. Componentes y React

- **Un componente por responsabilidad, con el nombre del componente de Figma.** Si un archivo supera ~200 líneas, probablemente son dos.
- **Las propiedades de Figma son las props**, con los mismos nombres y valores, tipadas con uniones de strings:

  | Figma | Código |
  |---|---|
  | Variant | unión de strings (`variant: "primary" \| "secondary"`) |
  | Text | `string` o `children` |
  | Boolean | prop booleana opcional |
  | Instance swap | prop que recibe un elemento (`iconStart={<Icon …/>}`) |
  | Slot | `children` |

- **Los nombres de capa son los nombres del código** (clases, subcomponentes o `data-slot`). Si una capa se llama `Frame 438`, no adivines qué es: avisá.
- **No todas las variantes de estado son props.** `hover`, `focus` y `pressed` son estilos (`:hover`, `:focus-visible`, `:active`); `disabled`, `loading`, `selected` o `error` son props.
- **Leé la descripción del componente en Figma:** ahí van las reglas que Figma no puede expresar (por ejemplo, "con `loading`, el spinner reemplaza al ícono"). En código esa lógica sí se implementa.
- **Para leer un component set por el MCP, pedí el análisis de variantes** (en Figma Console MCP, `figma_analyze_component_set`): devuelve los estados mapeados a CSS y, por variante, solo lo que cambia. Implementá una base + diferencias (con `cva` en Tailwind), no un bloque por variante.
- **Si en Figma el texto es fijo por variante, en código sale del estado** (un mapa `status → label`), no de una prop `label`.
- **Una variante con significado decide el estilo.** `trend: "up" | "down"` elige flecha y color adentro; nada de `trendColor="green"`.
- **Una sección o pantalla de Figma (un frame que no es componente) se implementa como un *slice*:** markup de página armado con los componentes existentes. Leé **todos** sus frames (anchos y estados) más sus anotaciones antes de escribir: cada frame es un caso a cubrir.
- **Los nombres de las instancias en una sección son las claves de los datos** (`activeUsers` → `{ id: "activeUsers", … }`, recorrido con `map` y el `id` como `key`).
- **Antes de crear un componente, buscá si ya existe.** Reutilizá, después extendé con una prop, y recién al final creá. **No crees un componente para algo que aparece una sola vez.**
- `children` o props tipo slot para contenido intercambiable.
- **No uses `useEffect` para datos derivados:** calculalos en el render. `useEffect` es para sincronizar con algo externo.
- No dupliques estado.
- En listas, `key` estable y única, nunca el índice si la lista cambia de orden.
- Toda UI con datos tiene **loading, vacío y error**.
- Next.js (App Router): componentes de servidor por default; `"use client"` solo donde hay estado, efectos o eventos, lo más abajo posible. `next/link` para navegar.

## 14. Tailwind

- Usá la escala y los tokens del tema (`@theme` en v4). Valores arbitrarios solo si no existe el token, y avisando.
- Variantes con **`cva`** y combinación con `cn()` (`clsx` + `tailwind-merge`).
- **No concatenes clases dinámicas** (`` `bg-${color}-500` ``): Tailwind no las genera. Usá un mapa de clases completas.
- Orden de clases consistente; si hay `prettier-plugin-tailwindcss`, que lo haga él.

---

## 15. Verificación antes de cerrar

Revisá esto y, si algo no se cumple, corregilo o explicá por qué:

- [ ] Leíste el contexto del proyecto (sección 0) y seguiste sus convenciones.
- [ ] HTML semántico, `lang` y `viewport`.
- [ ] Sin IDs para estilar ni `!important` (o justificado).
- [ ] `border-box` y reset de controles (o preflight).
- [ ] Texto y espaciado en `rem`; ningún `font-size` en `em` anidado.
- [ ] Espaciado con `gap`, o márgenes en una sola dirección.
- [ ] Layout: Hug/Fill/Fixed bien traducidos; strokes según si suman al layout; textos largos no desbordan.
- [ ] Ningún color, espaciado ni radio suelto.
- [ ] Contraste AA, foco visible, labels, `aria-label` en botones de ícono.
- [ ] Estados del diseño implementados, sin inventar los que faltan; en secciones, errores por bloque.
- [ ] Responsive probado a 320px sin scroll horizontal.
- [ ] Componentes reutilizados antes que creados; props con los nombres de Figma.
- [ ] **Comparado contra Figma midiendo en el navegador** (`getBoundingClientRect`, `getComputedStyle`) en los anchos de los frames, con capturas a la misma escala que las de Figma. No a ojo.
- [ ] **Ledger de verificación** con PASS / FAIL / UNVERIFIED / OUT OF SCOPE y su evidencia. Lo que no se pudo probar es UNVERIFIED, nunca PASS.
- [ ] **Después del deploy, los controles se repiten sobre la URL publicada** y los archivos publicados se comparan con el repo. Hay errores que solo aparecen en producción (por ejemplo, un 404 de `favicon.ico` que abriendo el archivo local no se pide).

Al terminar, contale al usuario qué reglas aplicaste o tuviste que resolver, en lenguaje simple, para que pueda revisar el código con ese criterio.

---

## Cómo crece esta skill

Cuando aparece una regla nueva, se suma con su **por qué**, escrita para **cualquier proyecto**: sin datos de un proyecto concreto (nombres de archivo, de tokens, de componentes, planes o librerías) salvo como ejemplo marcado. Lo específico de un proyecto va en la documentación de ese proyecto (`CLAUDE.md` o `docs/`), que la sección 0 manda a leer. Si una regla nueva contradice otra, se actualiza la existente en lugar de duplicarla.
