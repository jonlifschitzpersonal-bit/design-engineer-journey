---
name: design-implementation
description: Buenas prácticas de craft para implementar diseños en código (HTML, CSS, Tailwind, React, Next.js). Usala SIEMPRE que vayas a escribir, generar, modificar o revisar estilos o markup de una interfaz en este repo — al implementar un diseño de Figma, maquetar una página o componente, pasar un mock a código, ajustar layout/tipografía/espaciado, o revisar código de UI generado por IA — aunque el pedido no mencione "buenas prácticas" ni esta skill.
---

# Implementación de diseño con craft

Reglas de craft para el código de UI de este repo. Cada una explica **por qué** existe, para que puedas aplicarla con criterio y no de memoria.

La marca al final de cada regla indica su origen:
- *(1.2)*: Jonathan la aprendió en esa clase del curso.
- *(ref → 4.3)*: buena práctica de una fuente de referencia (Vercel Web Interface Guidelines, WAI-ARIA APG, react.dev, MDN). El número es la clase donde Jonathan la va a estudiar. Aplicala igual: el curso va primero por el flujo Figma → código y vuelve a los fundamentos después.

El objetivo es que lo implementado **se vea y se comporte igual al diseño**, sea predecible para quien lo lea después y no genere bugs de layout difíciles de rastrear.

---

## 1. HTML base

- Incluí `<html lang="…">` y `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. Sin `viewport`, mobile renderiza la página como desktop achicado. *(0.1)*
- Usá elementos semánticos: `<main>`, `<header>`, `<nav>`, `<section>`, `<h1>`–`<h6>` en orden, `<p>`, `<button>` para acciones y `<a>` para navegación. Un `<div>` clickeable no es accesible por teclado ni por lector de pantalla. *(0.1)*

## 2. Especificidad y cascada

- Estilá con **clases**, con especificidad baja y pareja. Así cualquier regla nueva se puede sobreescribir sin escalar. *(1.1)*
- **No uses IDs para estilar.** Un ID (1-0-0) le gana a cualquier cantidad de clases y obliga a pelear con más especificidad. *(1.1)*
- **No uses `!important`.** Si parece necesario, casi siempre hay un problema de especificidad mal resuelto. La única excepción razonable es pisar CSS de terceros que no controlás; en ese caso, dejá un comentario explicando por qué. *(1.1)*
- Evitá selectores descendientes largos (`.page .card .body p`). Suben la especificidad y acoplan el estilo a la estructura del HTML. *(1.1)*
- Cuando un estilo "no se aplica", revisá en DevTools qué regla lo está pisando (aparece tachada) antes de agregar más especificidad. *(1.1)*

## 3. Reset base

Si el proyecto **no usa Tailwind** (Tailwind ya lo trae en su *preflight*), empezá el CSS con:

```css
*, *::before, *::after {
  box-sizing: border-box;
}

button, input, select, textarea {
  font: inherit;
  color: inherit;
}
```

- **`border-box`:** hace que `width` incluya padding y border, igual que un frame de Figma de ancho fijo con stroke *inside*. Con el default (`content-box`), una card de `width: 200px` con `padding: 20px` y `border: 5px` mide 250px y rompe el layout. *(1.2)*
- **`font: inherit` en controles de formulario:** los navegadores les ponen fuente y color propios, así que **no heredan** la tipografía de la página. Sin este reset, los botones e inputs se ven con la fuente del sistema. *(1.1)*

## 4. Unidades

| Uso | Unidad | Por qué |
|---|---|---|
| Tamaño de texto y espaciado | `rem` | Relativo a la raíz: predecible y respeta el zoom de texto del usuario (accesibilidad). *(1.2)* |
| Espaciado que debe escalar con el texto de un componente (padding de un botón, tamaño de un ícono junto al texto) | `em` | Crece en proporción si el componente cambia de tamaño de fuente. *(1.2)* |
| Bordes, hairlines, sombras | `px` | Son detalles finos que no tienen que escalar. *(1.2)* |
| Ancho de bloques de lectura | `ch` | Se mide en caracteres. *(0.1, 1.2)* |
| Anchos dentro de un contenedor | `%` | Relativo al padre. *(1.2)* |

- **Nunca uses `em` para `font-size` en elementos anidados.** `em` se acumula: un `1.5em` dentro de otro `1.5em` da 36px, no 24px. Para tamaños de texto usá `rem`. *(1.2)*
- En Tailwind, usá la escala del sistema (`text-lg`, `p-4`, `gap-6`, que está en `rem`) y evitá valores arbitrarios en px como `text-[17px]` o `p-[13px]`, salvo que el diseño lo justifique y no exista un token. *(1.2)*

## 5. Espaciado entre elementos

- Para separar elementos hermanos, usá **`gap`** dentro de Flexbox o Grid en lugar de márgenes. Funciona como el *spacing* del Auto Layout de Figma y evita el colapso de márgenes. *(1.2)*
- Si usás márgenes, usá **una sola dirección** (por ejemplo, solo `margin-bottom`). Los márgenes verticales que se tocan **se colapsan**: 20px + 30px dan 30px, no 50px, y el espacio no coincide con el diseño. *(1.2)*

## 6. Tipografía de lectura

- Limitá los bloques de texto a **`max-width: 65ch`** (entre 45 y 75 caracteres por línea). Las líneas más largas cansan la lectura. Centralo con `margin-inline: auto`. *(0.1)*
- **`line-height`:** alrededor de `1.5`–`1.6` para texto corrido y `1.1`–`1.2` para títulos grandes. A mayor tamaño de letra, menos interlineado proporcional; si no, el título se ve desarmado. *(0.1)*
- Usá **`text-wrap: balance`** en títulos para que las líneas queden parejas y no quede una palabra sola. *(0.1)*
- Declará `font-family` con una **lista de respaldo** que termine en una familia genérica (`…, sans-serif`). El navegador usa la primera fuente disponible. *(0.1)*
- Agregá padding lateral al contenedor principal (por ejemplo `padding-inline: 1.5rem`) para que en mobile el texto no quede pegado al borde. *(0.1)*
- Usá `font-variant-numeric: tabular-nums` (`tabular-nums` en Tailwind) en números que se comparan o cambian: tablas, métricas, contadores. Así los dígitos no "bailan". *(ref → 1.7)*

## 7. Layout: Flexbox y Grid

Traducí el Auto Layout de Figma así:

| Figma | CSS / Tailwind |
|---|---|
| Horizontal / vertical | `display: flex` + `flex-direction` (`flex`, `flex-col`) |
| Spacing between items | `gap` |
| Spacing "Auto" | `justify-content: space-between` |
| Hug | el default del hijo |
| Fill (eje principal) | `flex: 1` (`flex-1`) |
| Fixed | ancho fijo **+ `flex-shrink: 0`** (`shrink-0`) |
| Wrap | `flex-wrap: wrap` |

- **En el eje cruzado, CSS estira por default** (`align-items: stretch`); Figma no. Si el diseño muestra hijos en Hug, declará `align-items` explícito. *(ref → 1.3)*
- **Un ancho fijo dentro de un flex se puede encoger.** Íconos, avatares y botones de ancho fijo llevan `flex-shrink: 0`. *(ref → 1.3)*
- **Un texto dentro de un flex no se achica por debajo de su palabra más larga** (`min-width: auto`). Si puede recibir contenido largo (mails, URLs, nombres), agregá `min-width: 0` al hijo y `overflow-wrap: anywhere` o `truncate`. *(ref → 1.3)*
- Usá **Flexbox** para una dimensión (una fila o una columna) y **Grid** para dos dimensiones o para alinear columnas entre filas (cards en grilla, layouts de página, formularios con labels alineados). *(ref → 1.4)*
- Para grillas de cards responsivas sin media queries: `grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr))`. *(ref → 1.4)*
- **El ancho fijo de un componente en Figma suele ser solo el de muestra.** Mirá su *min/max width*: eso es lo que pasa a código. Una card de 280px con min width 240 no lleva `width: 280px`; la dimensiona su contenedor (`minmax(15rem, 1fr)` en una grilla). *(2.2)*
- **No fijes alturas** en contenedores con texto (`height: 200px`). Si el contenido crece, se desborda. Usá `min-height` o dejá que el contenido defina la altura. *(ref → 1.6)*

## 8. Responsive

- Escribí **mobile first**: el estilo base es para pantallas chicas y los breakpoints suman (`md:`, `lg:` en Tailwind). *(ref → 1.6)*
- Usá `clamp()` para tamaños de título que escalan entre un mínimo y un máximo, en lugar de varios breakpoints. *(ref → 1.6)*
- Si un componente cambia según el espacio que tiene (no según la pantalla), usá container queries. *(ref → 1.6)*
- Usá `min-h-dvh` en lugar de `100vh` para pantallas completas en mobile: `vh` no descuenta la barra del navegador. *(ref → 1.6)*
- Nunca debe aparecer scroll horizontal en la página. Probá a 320px de ancho. *(ref → 8.5)*

## 9. Color y tokens

- **No escribas colores, espaciados ni radios sueltos** (`#3b82f6`, `13px`). Usá los tokens del proyecto: custom properties (`var(--color-text-muted)`) o la escala de Tailwind definida en `@theme`. Un valor suelto no cambia cuando cambia el sistema, y rompe el dark mode. *(ref → 1.7, 5.2)*
- Usá tokens **semánticos** en los componentes (`--color-surface`, `--color-text-muted`), no primitivos (`--blue-500`). El primitivo dice cómo se ve; el semántico dice para qué sirve, y es lo que cambia entre modos. *(2.2)*
- **Los nombres de variables de Figma se traducen sin reinterpretar:** las barras pasan a guiones (`color/text/muted` → `--color-text-muted`) y la escala `space/N` es la de Tailwind (`space/4` → `p-4`; `space/1-5` → `p-1.5`, porque Figma no acepta puntos en los nombres). Si la variable tiene *code syntax* en Dev Mode, usá esa. *(2.2)*
- **No fusiones tokens semánticos porque hoy tengan el mismo valor.** `color/action/primary/bg` y `color/action/secondary/border` apuntan los dos a `blue/200`, pero son decisiones distintas: si se unifican en código, cambiar una rompe la otra. *(2.2)*
- **Tipografía: un estilo de texto de Figma = una clase o utilidad en código** (`label/md` → tamaño, interlineado y peso juntos). No copies `font-size` y `font-weight` sueltos de cada capa. *(2.2)*
- El archivo del curso está en Figma Starter, que permite **1 modo por colección**: el dark mode no viene de modos de Figma, se define en código redefiniendo los tokens semánticos. *(2.2, ref → 6.5)*
- Si no existe un token para el valor que necesitás, **no lo inventes en silencio**: avisá y proponé uno. *(guía §16)*
- Contraste mínimo WCAG AA: **4.5:1** para texto normal, **3:1** para texto grande (desde 24px, o 18.66px en bold) y para bordes de controles e íconos con significado. Los controles deshabilitados están exentos. Un borde de bajo contraste vale solo si es decorativo: el borde de un input vacío es lo único que dice "acá se escribe" y necesita 3:1. *(2.3)*
- No comuniques información **solo con color** (error en rojo sin ícono ni texto). Y lo visual tampoco alcanza para el lector de pantalla: una tendencia "↑ 12%" se anuncia como texto ("Subió 12% respecto del período anterior") y la flecha se oculta. *(2.3)*

## 10. Accesibilidad e interacción

- **`<button>` para acciones, `<a href>` para navegar.** Nunca un `<div onClick>`: no recibe foco ni responde a Enter o Espacio. *(0.1)*
- Todo control tiene que verse enfocado: usá `:focus-visible` con un anillo claro (`focus-visible:ring-2` en Tailwind). **Nunca** `outline: none` sin reemplazo. *(ref → 8.3)*
- Todo input tiene un `<label>` asociado (no alcanza con el placeholder, que desaparece al escribir). Los errores van junto al campo y conectados con `aria-describedby`. *(ref → 8.3)*
- Botones solo con ícono llevan `aria-label`. Los íconos decorativos llevan `aria-hidden="true"`. *(ref → 6.3)*
- Imágenes con `alt` descriptivo; si son decorativas, `alt=""`. *(ref → 8.3)*
- Áreas táctiles de al menos **24×24px**, idealmente 44×44px en mobile. Si el ícono es chico, agrandá el área con padding. *(ref → 6.3)*
- Diseñá **todos los estados** de un control: default, hover, focus-visible, active, disabled y, si aplica, loading y error. No inventes estados que el diseño no tiene: si faltan, preguntá. *(guía §6.7)*
- **Leé las anotaciones de Figma antes de implementar** (por el MCP). Ahí está lo que el dibujo no muestra: estados como pressed que no tienen variante, la grilla responsive, el formato de los datos y los textos para lector de pantalla. Si una anotación contradice el dibujo, preguntá. *(2.3)*
- **El skeleton de loading ocupa lo mismo que el contenido final** (cada barra con la altura del interlineado que reemplaza), para que el layout no salte al llegar los datos. Anunciá la carga al lector (`aria-busy` en el contenedor). *(2.3)*
- **Una variante de Figma que existe solo por obligación no es un caso a implementar.** Si la descripción dice que `state=loading` ignora `trend`, el componente con `loading` no renderiza tendencia, sin importar qué `trend` reciba. *(2.3)*
- `hover` solo en dispositivos con mouse: en Tailwind v4 `hover:` ya lo respeta; en CSS puro usá `@media (hover: hover)`. *(ref → 7.2)*
- Componentes interactivos complejos (dialog, menu, tabs, combobox, tooltip) **no se escriben desde cero**: usá una librería headless accesible (Radix, Base UI) o shadcn/ui. Manejar foco, teclado y ARIA a mano es donde más errores se cometen. *(ref → 6.3)*
- Respetá `prefers-reduced-motion`: animaciones grandes o de desplazamiento se reducen o se desactivan (`motion-safe:` / `motion-reduce:` en Tailwind). *(ref → 7.4)*
- Animá solo `transform` y `opacity`: son baratas para el navegador. Animar `width`, `height` o `top` genera saltos. Nunca `transition: all`. *(ref → 7.2)*

## 11. Imágenes y contenido

- Toda imagen lleva dimensiones (`width`/`height` o `aspect-ratio`) para que la página no salte al cargar. En Next.js usá `next/image`. *(ref → 8.5)*
- Probá con contenido real y extremo: textos larguísimos, vacíos, un solo ítem, cien ítems. El diseño ideal casi nunca es el caso real. *(guía §6.7, ref → 8.5)*

## 12. React

- **Un componente por responsabilidad**, con el mismo nombre que en Figma (`MetricCard`, `StatusBadge`). Si un archivo supera ~200 líneas, probablemente son dos componentes. *(ref → 4.1, guía §16)*
- **Las propiedades de Figma se convierten en props** con los mismos nombres y valores (`variant: "primary" | "secondary"`, `size: "sm" | "md"`). Tipalas con TypeScript usando uniones de strings, no `string` suelto. *(2.1, ref → 4.2, 4.7)*
- **Cada tipo de propiedad de Figma tiene su traducción:** Variant → unión de strings; Text → `string` o `children`; Boolean → prop booleana opcional; Instance swap → prop que recibe un elemento (`iconStart={<Icon name="plus" />}`); Slot → `children`. Así la API del componente en código es la misma que ve el diseñador. *(2.1)*
- **Los nombres de capa de Figma son los nombres del código.** El componente se llama como el componente de Figma (`MetricCard`) y las partes internas como sus capas (`title`, `value`, `trend`): úsalos en clases, subcomponentes o `data-slot`. Si una capa se llama `Frame 438` o `Group 12`, no adivines qué es: avisá. *(2.1)*
- **Las variantes de estado de Figma no son todas props.** `hover`, `focus` y `pressed` se traducen a estilos (`:hover`, `:focus-visible`, `:active`), porque los maneja el navegador. `disabled`, `loading`, `selected` o `error` sí son props, porque los decide la app. *(2.1)*
- **Leé la descripción del componente en Figma.** Ahí van las reglas que Figma no puede expresar, por ejemplo: un booleano no puede apagar a otro, así que "con `loading`, el spinner reemplaza al ícono" figura solo en la descripción. En código esa lógica sí se implementa: con `loading`, mostrá el spinner en lugar del ícono, deshabilitá el botón y agregá `aria-busy="true"`. *(2.1)*
- **Una variante con significado decide el estilo; no pases el estilo como prop.** `trend: "up" | "down"` elige flecha y color adentro del componente. No uses `trendColor="green"`: el color es una consecuencia del significado, no una decisión de quien usa el componente. *(2.1)*
- **Los íconos usan `currentColor`** (`stroke="currentColor"`) y heredan el color del texto del padre: el mismo `Icon` sirve en un botón primario, en uno deshabilitado o en una tendencia roja sin props de color. Es el equivalente de nombrar igual las capas del ícono en Figma para que el color se mantenga al cambiarlo. *(2.1)*
- Antes de crear un componente, **buscá si ya existe** en el repo. Reutilizá, después extendé con una prop, y recién al final creá uno nuevo. **No crees un componente para algo que aparece una sola vez** (un hero, una ilustración): queda como sección o markup dentro de la página, armado con componentes que sí se reutilizan. *(2.1, guía §6.3)*
- Usá `children` (o props tipo slot) para contenido intercambiable, en lugar de una prop por cada variación. *(ref → 4.6)*
- **No uses `useEffect` para calcular datos derivados** de props o estado: calculalos durante el render. `useEffect` es para sincronizar con algo externo (APIs, eventos del navegador). *(ref → 4.5)*
- No dupliques estado: si un valor se puede calcular de otro, no lo guardes aparte. *(ref → 4.3)*
- En listas, usá una `key` estable y única (un `id`), nunca el índice si la lista se reordena o filtra. *(ref → 4.4)*
- Toda UI que depende de datos tiene **estados de loading, vacío y error**, no solo el de éxito. *(ref → 4.4, guía §18)*
- En Next.js (App Router), los componentes son de servidor por default. Agregá `"use client"` solo en los que usan estado, efectos o eventos, lo más abajo posible en el árbol. Usá `next/link` para navegar. *(ref → 5.1)*

## 13. Tailwind

- Usá la escala y los tokens del tema (`@theme` en Tailwind v4). Evitá valores arbitrarios (`p-[13px]`, `text-[#333]`) salvo que no exista el token y lo avises. *(1.2, ref → 5.2)*
- Las variantes de un componente se definen con **`cva`** (class-variance-authority) y se combinan con `cn()` (`clsx` + `tailwind-merge`), como hace shadcn/ui. *(ref → 6.2)*
- **No armes clases concatenando strings dinámicos** (`` `bg-${color}-500` ``): Tailwind no las detecta y no se generan. Usá un mapa de clases completas. *(ref → 5.2)*
- Ordená las clases de forma consistente (layout → tamaño → espaciado → tipografía → color → estados). Si el proyecto tiene `prettier-plugin-tailwindcss`, que lo haga él. *(ref → 5.2)*

---

## Antes de dar por terminada una implementación

Revisá esto y, si algo no se cumple, corregilo o explicá por qué:

- [ ] HTML semántico, `lang` y `viewport` presentes.
- [ ] Sin IDs para estilar y sin `!important` (o justificado con comentario).
- [ ] `border-box` y reset de controles de formulario (o Tailwind preflight).
- [ ] Texto y espaciado en `rem`; ningún `font-size` en `em` anidado.
- [ ] Espaciado entre hermanos con `gap`, o márgenes en una sola dirección.
- [ ] Bloques de lectura con ancho máximo e interlineado adecuado al tamaño.
- [ ] Layout: Hug/Fill/Fixed traducidos bien; anchos fijos con `shrink-0`; textos largos no desbordan.
- [ ] Sin colores, espaciados ni radios sueltos: todo sale de tokens.
- [ ] Contraste AA, foco visible, labels en inputs, `aria-label` en botones de ícono.
- [ ] Estados del diseño implementados (hover, focus, disabled, loading, error, vacío), sin inventar los que faltan.
- [ ] Responsive probado a 320px sin scroll horizontal.
- [ ] React: componentes reutilizados antes que creados, props tipadas con los nombres de Figma, sin `useEffect` para datos derivados.
- [ ] Si hay diseño de referencia: medidas, tipografía y espaciados comparados contra Figma.

Cuando termines, contale a Jonathan qué reglas de esta skill aplicaste o tuviste que resolver, para que pueda revisar el código con ese criterio. Si aplicaste una regla marcada *(ref → …)*, explicala en una línea simple: todavía no la vio en clase.

---

## Cómo crece esta skill

Al cerrar cada clase del curso, el tutor agrega las reglas nuevas, con su **por qué** y la clase de origen. Cuando Jonathan estudia una regla marcada *(ref → X.Y)*, la marca pasa a *(X.Y)*. Si una regla nueva contradice otra, se actualiza la existente en lugar de duplicarla.
