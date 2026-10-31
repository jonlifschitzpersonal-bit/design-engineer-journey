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
| Stack | `package.json`: framework, versión de Tailwind, librería de componentes, TypeScript | Preguntá antes de agregar dependencias. Una dependencia nueva va con versión exacta (`--save-exact`), publicada hace al menos dos semanas, y con su porqué en un ADR |
| Tokens | Archivo de tokens (`tokens.css`, `@theme`, `tailwind.config`) y variables de Figma | Proponé crearlos; no escribas valores sueltos |
| Convención de nombres de tokens | Cómo se llaman en Figma y cómo en código (y su *code syntax*) | Barras de Figma → guiones en código |
| Breakpoints | Config del proyecto o anotaciones de Figma | Los de Tailwind: 640 / 768 / 1024 / 1280 |
| Componentes existentes | La carpeta de componentes del repo | Recién ahí se crea uno nuevo |
| Librería de íconos | `package.json`, descripción del componente de íconos en Figma | Preguntá; no dibujes íconos a mano |
| Diseño | El nodo exacto de Figma por el MCP: frames, variables, descripciones y anotaciones | Pedí el link al nodo |

**Si una regla del proyecto contradice esta skill, gana la del proyecto**, y lo decís para que quede a la vista.

### Si el proyecto todavía no existe

- **Generalo con el generador oficial y la versión fija** (`create-next-app@16.4.3`, no `@latest`), con todas las opciones como flags para que no haga preguntas. Así el resultado se puede repetir y la guía o el plan coinciden con lo que aparece.
- **Si va dentro de un repo que ya existe, sin Git propio** (`--disable-git` o similar). Un repo adentro de otro hace que el de afuera no vea los archivos del de adentro.
- **La plantilla de bienvenida se reemplaza, no se construye encima.** Trae colores de la paleta del framework, hex entre corchetes, su propia fuente y un dark mode automático: nada de eso es del sistema. La página de ejemplo y los estilos globales se vacían antes de cargar los tokens.
- **Ajustá lo que la plantilla trae genérico:** `lang` al idioma del contenido (el lector de pantalla elige la pronunciación con ese dato), el `title` y la `description` de la metadata, y la fuente a la de los text styles.
- **Antes de dar el proyecto por creado, corré `lint` y `build`.** `dev` puede funcionar con errores que el deploy después rechaza.

### Documentación del proyecto para el agente

Si el proyecto no la tiene, proponela. Cada cosa va en un archivo según cuánto cambia:

| Archivo | Qué dice |
|---|---|
| `CLAUDE.md` (o `AGENTS.md`) | Reglas estables: comandos, stack, de dónde sale el diseño, tokens, convenciones, cómo trabajar, qué no tocar |
| `docs/PROJECT_CONTEXT.md` | El producto: problema, usuarios, pantallas, estados, fuentes de verdad |
| `docs/CURRENT_STATE.md` | Lo hecho **y verificado**, con evidencia |
| `docs/PENDING_TASKS.md` | Próximas tareas, decisiones de producto pendientes, deuda a propósito. Si el backlog está en issues, el orden y los links (sección 17) |
| `docs/adr/` | Una decisión de arquitectura por archivo, con un README índice |
| `docs/research/` | Comparaciones y fuentes que llevaron a cada decisión |

- **El estado no va en `CLAUDE.md`.** Lo que hoy es "falta hacer X" mañana es falso, y el agente lo sigue leyendo como regla. `CLAUDE.md` manda a leer el estado; no lo copia.
- **Si el framework escribe su propio `AGENTS.md`, `CLAUDE.md` lo importa** con una línea `@AGENTS.md`, para no duplicarlo.
- **Cada regla lleva su porqué en una línea** y el ADR tiene el completo. Una regla sin motivo ("las clases repiten palabras") el agente la "corrige".
- **Un ADR no se edita una vez aceptado:** si la decisión cambia, se escribe uno nuevo que lo reemplaza (`Superseded by NNNN`). Formato: contexto, opciones consideradas, decisión, consecuencias.
- **Al cerrar un slice se actualizan `CURRENT_STATE` y `PENDING_TASKS`**; una decisión nueva de arquitectura suma un ADR.
- **El proceso de trabajo también va en el proyecto** (plan → aprobación → código → checks → ledger → docs → frenar, sección 18), porque las skills de otro repo no se cargan en una sesión abierta en ese proyecto.
- **Probá la documentación con una sesión nueva** abierta en la carpeta del proyecto, en modo plan y con un pedido chico sin contexto: si no lee el estado, usa valores sueltos o inventa textos, falta algo en los docs.

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
- **Nunca scroll horizontal.** Probá a 320px midiendo **la página** (`document.documentElement.scrollWidth === innerWidth`), no solo el componente: un hijo con `position: absolute` puede salirse aunque el componente mida lo que dice el diseño.

## 9. Color y tokens

- **No escribas colores, espaciados ni radios sueltos.** Usá los tokens del proyecto (custom properties o el tema de Tailwind). Un valor suelto no cambia cuando cambia el sistema y rompe el dark mode.
- En los componentes, tokens **semánticos** (`--color-text-muted`), no primitivos (`--blue-500`). El semántico dice para qué sirve y es lo que cambia entre modos.
- **Los nombres de las variables de Figma se traducen sin reinterpretar**, con la convención del proyecto. Si no hay una: las barras pasan a guiones (`color/text/muted` → `--color-text-muted`). Si la variable tiene *code syntax*, usá esa. Si la escala de espaciado de Figma sigue la de Tailwind (`space/4` = 16px), traducila directo (`space/4` → `p-4`; `space/1-5` → `p-1.5`, porque Figma no acepta puntos en los nombres).
- **Generá los tokens, no los copies.** Si los tokens viven en la herramienta de diseño y en el código (y en una página de referencia), el código sale de un export (JSON en formato DTCG, el estándar del W3C) compilado con una herramienta como Style Dictionary. Tres copias a mano coinciden solo hasta el primer cambio.
  - El export se commitea como una foto del diseño y no se edita. Lo generado lleva una cabecera "generado, no editar", y un control en el lint falla si no coincide con el export: así se nota una edición a mano.
  - **El build controla el mapeo y frena si se rompe:** el nombre generado igual al *code syntax* del diseño, cada semántico como alias de un primitivo, la escala de espaciado, y un token de un grupo desconocido (que nada se pierda en silencio). Probá cada control rompiéndolo a propósito.
  - **Si el export guarda la hora** (por token o por archivo), sacala al compilar: si no, un export sin cambios ensucia el diff y los cambios reales se pierden entre líneas.
  - **Es un mapeo con control, no una sincronización:** el código se entera de un cambio solo cuando alguien exporta. Decilo así, y dejá el paso a paso en las reglas del proyecto para que cualquier agente lo repita.
  - **Para probar que un cambio "no se ve", compará el CSS compilado** antes y después (declaraciones ordenadas). Compara cada valor, no solo lo que entra en una captura.
- **La nota de uso de un token va en su descripción en la herramienta de diseño** (para qué sirve, cuándo sí y cuándo no) y baja con el export. Empezá por los que comparten valor con otro y los de uso restringido (un gris solo para deshabilitados). Una página de referencia las muestra, y **sus propias muestras las respetan**: es el ejemplo que copian los agentes.
- **Los tokens de estado siguen la agrupación que ya existe:** si dos variantes comparten el token de hover, el de apretado también es uno compartido. Y "un paso más oscuro" se mide contra el hover, no contra el default.
- **No fusiones semánticos porque hoy tengan el mismo valor.** Dos tokens que apuntan al mismo primitivo son dos decisiones: si se unifican, cambiar una rompe la otra.
- **Un text style de Figma = una clase o utilidad** (tamaño, interlineado y peso juntos). No copies `font-size` y `font-weight` sueltos de cada capa.
- **Modos (dark mode):** si las variables de Figma tienen varios modos, cada modo redefine los semánticos en código. Si el plan de Figma no permite modos (Starter: 1 por colección), el dark mode se define solo en código, redefiniendo los semánticos.
- Si no existe un token para lo que necesitás, **no lo inventes en silencio**: avisá y proponé uno.
- Contraste WCAG AA: **4.5:1** texto normal, **3:1** texto grande (24px, o 18.66px bold) y bordes de controles e íconos con significado. Los controles deshabilitados están exentos. Un borde de bajo contraste vale solo si es decorativo: el de un input vacío necesita 3:1.
- **Una superficie tintada casi igual al fondo se pierde** (un celeste muy claro sobre blanco mide ~1,1:1): en un proyector o una pantalla con mucho brillo desaparece. Si tiene que verse (un aviso, una franja), dale un borde con un token propio (`color/border/accent`), no uno de acción que casualmente tiene el mismo valor.
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
- **Lo que no es dato no se esconde mientras carga.** El título de una card llega por prop, no del servidor: si el diseño lo cambia por un skeleton, igual queda para el lector (`sr-only`) y nombra el bloque (`aria-labelledby`). Si no, el lector oye "Cargando, Cargando, Cargando" sin saber qué, y la navegación por encabezados se saltea las cards.
- **El componente se protege de los datos que el tipo no frena.** Si la anotación dice "sin dato: —", un valor vacío o `null` muestra "—" (no un párrafo vacío de alto 0). Si la flecha ya dice la dirección, un signo que venga en el dato ("+4,0 %") se saca, o el lector dice "Subió más 4,0 %". Un número largo baja de línea (`overflow-wrap: anywhere`) en lugar de salirse del borde al ancho mínimo.
- **Una variante de Figma que existe solo por obligación no es un caso a implementar.** Si la descripción dice que `loading` ignora `trend`, el componente en `loading` no renderiza tendencia.
- **Una sección se nombra por su título:** `<section aria-labelledby="…">` apuntando a su encabezado; los títulos de los bloques de adentro van un nivel abajo. Si hay un estado junto al título (un badge), se lee con él.
- **Con varias fuentes de datos, cada bloque maneja su propio loading y error.** Si uno falla, solo ese muestra error. Las acciones que dependen de los datos quedan deshabilitadas mientras cargan.
- **En HTML sin framework, los estados se arman como en Figma:** todas las capas en el markup (skeletons, mensaje de error, texto "Cargando") y un `data-state` en el contenedor que decide con CSS cuáles se ven. Lo oculto va con `display: none`, así tampoco lo lee el lector. En React, se renderiza según la prop.
- **Si no hay datos reales, los estados se muestran con un control de demo** marcado como tal, fuera del diseño y oculto si no carga JavaScript.
- `hover` solo con mouse: Tailwind v4 ya lo respeta; en CSS puro, `@media (hover: hover)`.
- **Un aviso que se puede cerrar** es una región con un nombre que diga de qué trata (`<section aria-label="Aviso de datos ficticios">`), no una alerta (`role="alert"` interrumpe al lector). Tampoco un `<aside>`: es un landmark "complementario", contenido accesorio, y el aviso es parte de la página. Un nombre genérico ("Aviso") no le dice al lector de pantalla si le importa. La X es un `<button>` con `aria-label`. **Al cerrarlo, el foco va a un destino lógico** (el contenido de la página, con `tabIndex={-1}`), no se pierde en el `<body>`. Ese destino no es interactivo, así que puede ir sin anillo de foco: es la única excepción a "nunca `outline: none`".
- Componentes interactivos complejos (dialog, menu, tabs, combobox, tooltip): **librería headless accesible** (Radix, Base UI) o shadcn/ui, no desde cero. La señal es un patrón de teclado propio (flechas, Esc, foco atrapado y devuelto). **Si el HTML nativo alcanza** (`<button>`, `<a>`, `<details>`), va el nativo, sin librería.
- Respetá `prefers-reduced-motion`.
- **Respetá los colores forzados** (alto contraste de Windows, `forced-colors: active`). Ese modo reemplaza todos los colores por los del sistema y **borra fondos y sombras**: un botón que se distingue por su relleno, un borde hecho con `box-shadow`, un skeleton o una píldora desaparecen.
  - Lo que tiene que seguir viéndose lleva un `outline` de 1px **solo en ese modo**, hacia adentro (`forced-colors:outline forced-colors:-outline-offset-1` en Tailwind). No ocupa lugar, así que nada cambia de tamaño, y el sistema le pone su color.
  - El anillo de foco declara su `outline-offset` (`focus-visible:outline-offset-0`) para no heredar el de adentro, y así se distingue del contorno.
  - Un `disabled` nativo ya sale en el gris del sistema (`GrayText`). Un punto o un ícono decorativo puede desaparecer si el texto ya dice lo mismo.
  - Se prueba emulándolo: DevTools → *Rendering* → *forced-colors*. Desde un script, con el protocolo de Chrome (`Emulation.setEmulatedMedia` con `forced-colors: active`): `emulateMediaFeatures` de Puppeteer no lo acepta. Se miden los tamaños en los dos modos y se mira la captura.
- **Un control ocupado no se ve apretado.** `:active` también se activa con Espacio, y `pointer-events: none` solo frena al mouse: el estilo de apretado va condicionado (`not-aria-disabled:active:`).
- **El resultado de una acción asíncrona lo anuncia quien la dispara**, no el botón: es el único que sabe si salió bien o mal y qué texto corresponde. Va en una zona `role="status"` (cortés: espera su turno) que **existe desde el principio**, vacía. Si aparece junto con el texto, el lector no la oye. `role="alert"` interrumpe, y se reserva para lo urgente. Tampoco una región viva dentro del botón: su contenido pasa a ser el nombre del botón.
- **`sr-only` no se combina con clases de tamaño.** Un `w-full` le gana al ancho de 1px, y como `sr-only` es `position: absolute`, el elemento oculto mide el ancho de la ventana y genera scroll horizontal. Las clases de tamaño van solo cuando el elemento se ve (`loading ? "sr-only" : "w-full"`).
- **El árbol de accesibilidad** (DevTools → *Accessibility*, o el snapshot de un script) **dice qué recibe el lector, no qué dice:** cada lector anuncia distinto, por ejemplo, el cambio de nombre de un botón con foco. Lo que depende de eso se prueba con un lector real (NVDA en Windows, VoiceOver en Mac). Si no se probó, queda UNVERIFIED, con su issue.
- Animá solo `transform` y `opacity`. Nunca `transition: all`.

## 11. Íconos

- **Los íconos usan `currentColor`** y heredan el color del texto: el mismo ícono sirve en cualquier estado sin props de color.
- **Mismo trazo que en Figma a cualquier tamaño:** `stroke-width` en px reales y `vector-effect: non-scaling-stroke` en los trazos. Sin eso, un ícono de 24 achicado a 14 queda con un trazo más fino que el diseño.
- **Si un ícono llega por prop (Instance swap), el tamaño lo pone el componente que lo recibe**, con CSS sobre su contenedor (`.card__icon-wrapper .icon`), y no quien lo usa. Si no, cada uso tiene que acordarse del tamaño y el ícono sale con el tamaño base del set (en Figma, el componente lo redimensiona adentro de la instancia).
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

- **Un Boolean que solo muestra u oculta un Instance swap no pasa como prop aparte** (`showIconStart` + `iconStart` → `iconStart` opcional). En Figma el swap siempre tiene algo adentro y necesita el booleano; en código, no pasar la prop ya es "sin ícono". Dos props para lo mismo se pueden contradecir.
- **El texto de un Text que es la etiqueta principal va como `children`** (`<Button>Exportar</Button>`), igual que en el elemento nativo.
- **Los nombres de capa son los nombres del código** (clases, subcomponentes o `data-slot`). Si una capa se llama `Frame 438`, no adivines qué es: avisá.
- **No todas las variantes de estado son props.** `hover`, `focus` y `pressed` son estilos (`:hover`, `:focus-visible`, `:active`); `disabled`, `loading`, `selected` o `error` son props.
- **Leé la descripción del componente en Figma:** ahí van las reglas que Figma no puede expresar (por ejemplo, "con `loading`, el spinner reemplaza al ícono"). En código esa lógica sí se implementa.
- **Para leer un component set por el MCP, pedí el análisis de variantes** (en Figma Console MCP, `figma_analyze_component_set`): devuelve los estados mapeados a CSS y, por variante, solo lo que cambia. Implementá una base + diferencias (con `cva` en Tailwind), no un bloque por variante.
- **Si en Figma el texto es fijo por variante, en código sale del estado** (un mapa `status → label`), no de una prop `label`.
- **Una variante con significado decide el estilo.** `trend: "up" | "down"` elige flecha y color adentro; nada de `trendColor="green"`.
- **Una sección o pantalla de Figma (un frame que no es componente) se implementa como un *slice*:** markup de página armado con los componentes existentes. Leé **todos** sus frames (anchos y estados) más sus anotaciones antes de escribir: cada frame es un caso a cubrir.
- **Los nombres de las instancias en una sección son las claves de los datos** (`activeUsers` → `{ id: "activeUsers", … }`, recorrido con `map` y el `id` como `key`).
- **Antes de crear un componente, buscá si ya existe.** Reutilizá, después extendé con una prop, y recién al final creá. **No crees un componente para algo que aparece una sola vez.**
- **Extraer a un componente del sistema pide repetición con la misma intención** (Impeccable `extract`: 3 usos o más). Dos piezas que se parecen pero se comportan distinto (un botón de cerrar cuyo hover cambia el color del ícono, y un botón ghost cuyo hover pinta el fondo) quedan separadas hasta que el diseño las unifique. Si no, el componente gana una variante que nadie diseñó.
- **Un mismo tipo de propiedad de Figma tiene la misma forma en todos los componentes.** Si un Instance swap de ícono recibe un elemento en el `Button` (`iconStart={<Icon …/>}`), también en la card. El componente que lo recibe le pone tamaño y color.
- **Un componente del sistema no envuelve los handlers que recibe** (un `handleClick` que llama a `onClick`). En Next.js eso lo obliga a ser de cliente, y deja de poder usarse desde una página de servidor. Para bloquear una acción, no se pasa el handler (`onClick={loading ? undefined : onClick}`).
- **Las props del consumidor se esparcen antes de los atributos que el componente controla** (`{...props}` y después `aria-disabled`, `type`): si van después, los pueden pisar.
- **Un botón cargando:** `aria-disabled` y no `disabled`, así no pierde el foco mientras trabaja. El ancho no cambia: el spinner ocupa el lugar del ícono, o tapa el texto, que sigue en su lugar con `opacity-0`. **Nunca `invisible`:** `visibility: hidden` también lo saca del lector de pantalla y el botón se queda sin nombre. **Si llegan `loading` y `disabled` juntos, gana `loading`:** deshabilitarlo mandaría el foco al principio de la página, justo lo que `loading` evita.
- **Un valor que ya dice su dirección** con una flecha y con texto para lector ("Subió 12%…") va sin signo; si no, se lee "Subió +12%".
- **Un componente que todavía no está en ninguna pantalla se mide en una página temporal** con todas sus variantes y estados, y la página se borra antes del commit. Cuando el proyecto tiene Storybook, esa página es una story.
- `children` o props tipo slot para contenido intercambiable.
- **No uses `useEffect` para datos derivados:** calculalos en el render. `useEffect` es para sincronizar con algo externo.
- No dupliques estado.
- En listas, `key` estable y única, nunca el índice si la lista cambia de orden.
- Toda UI con datos tiene **loading, vacío y error**.
- Next.js (App Router): componentes de servidor por default; `"use client"` solo donde hay estado, efectos o eventos, lo más abajo posible. `next/link` para navegar.
- **Estado guardado en el navegador que cambia lo que se ve al cargar** (un aviso cerrado, el tema, una sección abierta): el servidor no lo conoce. Un `useEffect` lo aplica después de pintar y se ve un salto. La solución es un **script en línea** que corre mientras se lee el HTML, antes del elemento: lee `localStorage` (con `try/catch`, porque puede estar bloqueado) y pone un atributo en `<html>`. El CSS decide con ese atributo (una variante de Tailwind con `@custom-variant`), y `<html>` lleva `suppressHydrationWarning`. En desarrollo, el doble montaje de React borra el atributo: un `useLayoutEffect` lo vuelve a poner. La página sigue siendo estática.
- **Next.js (App Router), dónde va cada cosa:** cada carpeta de `app/` con un `page.tsx` es una URL; una carpeta sin `page.tsx` solo ordena. Lo que se repite en todas las pantallas (shell, header, fuente, `lang`, metadata) va en `layout.tsx`, que envuelve a cada página con `{children}`. Si se copia en cada `page.tsx`, se desincroniza.
- **Archivos generados, no se editan a mano:** `node_modules/`, `.next/`, el lockfile (`package-lock.json`), `next-env.d.ts` y el bloque que el framework escribe en `AGENTS.md` (ese bloque se commitea tal cual: si se borra, `next dev` lo vuelve a crear). El lockfile cambia solo cuando se agrega o se actualiza una dependencia, y eso se dice.

## 14. Tailwind

- Usá la escala y los tokens del tema (`@theme` en v4). **Valores arbitrarios (`p-[22px]`, `text-[#22c55e]`) solo si no existe el token, con un comentario que diga de dónde sale el valor.** Un corchete sin explicación es la primera señal de un valor suelto.
- **En un design system, el tema deja solo los colores del sistema** (`--color-*: initial;` dentro de `@theme`, antes de los tokens). Así `text-green-600` directamente no existe y no se cuela un color de afuera.
- **Lo mismo con cualquier grupo del tema que choque con el sistema.** Tailwind ya trae `rounded-lg` (8px): si en el sistema `radius/lg` mide 12, se resetea el grupo (`--radius-*: initial;`) y se redefine. Si no, la clase existe con otro valor y se ve "casi bien", un error que solo aparece midiendo. Con los text styles, `--text-*: initial;` borra `text-sm`, `text-lg` y el resto, para que no se arme un tamaño suelto.
- **Primitivos fuera de `@theme`, semánticos adentro.** Los primitivos van como variables comunes en `:root` (`--gray-600`) y no generan clases; los semánticos van en `@theme` apuntando a ellos (`--color-text-muted: var(--gray-600)`), igual que el alias en Figma. Así un componente no puede usar `bg-gray-600`.
- **Los colores van en `@theme` sin `inline`:** la clase usa la variable (`color: var(--color-text-muted)`), y un modo (dark) puede redefinirla para que cambien todas las clases. `@theme inline` es para valores que dependen de una variable que el framework pone en el HTML, como la fuente de `next/font` (`--font-sans: var(--font-inter), …`).
- **Tailwind lee todos los archivos del repo buscando nombres de clases.** Una palabra en un script o en un JSON que no son interfaz (`transform`, `hidden`) se vuelve una clase en el CSS final. Excluí esas carpetas con `@source not "../scripts";`. Los tokens generados pueden ir en un archivo aparte importado después de Tailwind (`@import "./tokens.css";`): su `@theme` funciona igual.
- **Las clases que arma un generador van escritas enteras en el archivo generado** (`"utility": "bg-bg-surface"`), no armadas en el componente: Tailwind solo genera lo que encuentra completo.
- **El tema se verifica en el navegador, no en el archivo:** medí con `getComputedStyle` que cada clase dé el valor de Figma y que una clase de lo que se apagó (`bg-red-500`) no dé nada.
- **Text styles como `--text-<nombre>` con `--text-<nombre>--line-height` y `--text-<nombre>--font-weight`:** generan una utilidad (`text-label-md`) con los tres valores juntos, igual que el text style.
- **La escala de espaciado de Tailwind es N × 4px:** si los tokens `space/N` de Figma siguen esa escala, no se redefinen; `gap-3` ya es `space/3`.
- **Los estados de Figma son prefijos** (`hover:`, `focus-visible:`, `disabled:`) y el **responsive es mobile first**: sin prefijo es mobile y `sm:`, `md:`… suman desde ese ancho. El frame mobile es la base; el desktop, los prefijos.
- **Si el componente dimensiona un hijo que llega por prop** (un ícono por Instance swap), usá la variante de hijos en el contenedor (`*:size-5`) en lugar de pedirle el tamaño a quien lo usa.
- Variantes con **`cva`** y combinación con `cn()` (`clsx` + `tailwind-merge`).
- **`tailwind-merge` solo conoce las utilidades de Tailwind.** Si el sistema tiene utilidades propias que comparten prefijo (los text styles `text-label-md` al lado de los colores `text-text-muted`), las toma por el mismo grupo y borra una sin avisar. Extendé su configuración (`extendTailwindMerge`) con la lista generada desde los tokens, y probalo con un caso que combine las dos.
- **Un trazo interior que no suma al alto** (un botón de 40 con borde de 1px) en Tailwind v4 es `inset-ring`. Es una sombra: el modo de alto contraste de Windows (*forced colors*) la borra, así que el componente necesita un contorno para ese modo (`forced-colors:outline forced-colors:-outline-offset-1`, sección 10).
- **El texto de un botón no lleva `whitespace-nowrap` por defecto:** en Figma es Hug, pero en un contenedor más angosto que el texto tiene que bajar de línea (con `text-center`) en lugar de generar scroll horizontal.
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
- [ ] **Revisión de diseño** (sección 19) en los cambios de UI, con cada hallazgo corregido, pasado a un issue o rechazado con motivo.
- [ ] **Después del deploy, los controles se repiten sobre la URL publicada** y los archivos publicados se comparan con el repo. Hay errores que solo aparecen en producción (por ejemplo, un 404 de `favicon.ico` que abriendo el archivo local no se pide).

Al terminar, contale al usuario qué reglas aplicaste o tuviste que resolver, en lenguaje simple, para que pueda revisar el código con ese criterio.

---

## 16. Revisar un diff (propio o de otro agente)

- **Primero el pedido, después el código.** Cada bloque del diff tiene que servir a lo pedido. Lo que no, es fuera de alcance aunque "mejore" algo (un color "más visible", un hover "más lindo"): se saca o se pide aparte.
- **Leé las líneas borradas, no solo las agregadas.** Lo que se pierde no se ve en pantalla: textos para lector (`sr-only`), `aria-hidden`, tokens reemplazados por valores, estados.
- **Señales de alarma:** valores sueltos o arbitrarios sin comentario, estados que no existen en el diseño, elementos no interactivos con `onClick` (`<div>`, `<article>`) en lugar de `<a href>` o `<button>`, y cambios en archivos generados o de configuración (lockfile, `next.config`, `tsconfig`) sin un motivo que diga el pedido.
- **Las 10 señales de código poco confiable**, para recorrer con el diff abierto: valores sin token, componentes duplicados, un archivo enorme con todo junto, estados inventados, botones que no son `<button>`, texto interactivo hecho con `<div>`, datos remotos sin loading/error/vacío, `PASS` sin la prueba, cambios ajenos "de paso" y checks apagados para que dé verde. Cada una termina en "no aparece", "aparece justificada" (motivo escrito, chica, con issue si es deuda) o "aparece sin justificar" (pedir cambios).
- **Silenciar un aviso o un check** (`suppressHydrationWarning`, `eslint-disable`, `@ts-expect-error`) se acepta solo si es **puntual** (un elemento o una línea, no el proyecto), tiene el **motivo escrito al lado** y sigue una **guía oficial**. `ignoreBuildErrors` o una regla apagada en todo el proyecto, nunca.
- **Un nombre que asusta no es una señal: mirá qué entra.** `dangerouslySetInnerHTML` es peligroso con texto que escribe una persona (comentarios, URLs); con una constante del mismo archivo, no. Un `catch {}` vacío puede ser a propósito ("si falla, se muestra igual"), pero lleva el porqué en un comentario.
- **Una clase que no existe falla en silencio.** Si el tema apagó la paleta de Tailwind, `text-gray-700` no genera nada y el texto hereda el color del padre: se ve "bien" de casualidad. Revisá que cada clase de color, tamaño o radio sea del sistema.
- **En el ledger, la evidencia prueba el título de la fila, no algo parecido.** "Se oculta antes de pintarse" no se prueba con "el script va antes y al final está oculto": eso prueba el orden y el estado final. Achicá el título a lo que mediste o dejalo UNVERIFIED.
- **Todo color nuevo se mide** (contraste contra su fondo), no se juzga a ojo.
- **El resultado es un ledger por control y un veredicto** (aprobar o pedir cambios) con un comentario accionable: qué cambiar y por qué. Lo que es decisión de diseño (un estado nuevo) se devuelve a diseño, no se resuelve en el código.

---

## 17. Git, issues y pull requests

Si el proyecto tiene su propio flujo (en `CLAUDE.md`, `CONTRIBUTING.md` o plantillas en `.github/`), gana ese. Si no tiene, proponé este.

**Antes de tocar nada**
- **Confirmá el repo y la branch** (`git status`, `git branch`). Si estás en la branch principal de un proyecto compartido, no trabajes ahí: actualizala (`git pull`) y creá una branch desde ella.
- **Nombre de la branch: `tipo/issue-tema`** (`feat/15-app-shell`, `fix/`, `docs/`, `chore/`, `refactor/`). Dice qué tipo de cambio es y de qué tarea sale, sin abrir nada.
- **Una branch, un issue.** Lo que aparece en el camino y no es del pedido (un refactor, otro bug) va a un issue nuevo, no a este PR: mezclado, el diff no se puede revisar.
- **Si revisar y mergear seguido cuesta más de lo que aporta** (una sola persona revisa, muchos cambios chicos), el proyecto puede pasar a **un PR por sesión de trabajo**: una branch con un commit o más por slice, que cierra varios issues (`Closes #12`, `Closes #13`) y se mergea una vez. Los slices se siguen revisando de a uno, por commit. Lo que no tiene que ver con la sesión igual lleva su issue y se nombra en el PR.
- **Si ni eso compensa** (una sola persona, que ya aprueba el plan), se puede trabajar en la branch principal y pushear directo. Solo se pushean slices cerrados, con checks y verificación en verde. El commit que termina el issue lleva `Closes #N` (lo cierra al llegar a la principal), el ledger y las diferencias con el plan, y el ledger también se le muestra a la persona. La protección queda en no aceptar force push ni borrado, y un error se arregla con otro commit. Se pierden la revisión del diff antes de que entre y el preview por PR: lo decide la persona, no el agente.

**Mientras trabajás**
- **Leé el diff antes de cada commit** (`git diff --staged`), no solo antes del PR. Ahí aparecen archivos generados, secretos o cambios de configuración que no pidió nadie.
- **Un commit, una intención:** asunto en imperativo, en el idioma del repo, de menos de 72 caracteres, y un cuerpo que diga el porqué cuando no es obvio. Tres commits con un motivo cada uno se revisan mejor que uno que "agrega todo".

**El pull request**
- **Seguí la plantilla del proyecto.** Si no hay, cubrí: qué y por qué, alcance y lo que queda afuera a propósito, diferencias intencionales con el diseño, evidencia (checks, capturas, ledger), riesgos y decisiones pendientes, y cómo probarlo.
- **`Closes #N` si el PR termina la tarea, `Refs #N` si solo la avanza.** `Closes` cierra el issue al mergear, y solo cuando el PR va a la branch principal.
- **El ledger del PR sigue la regla de la sección 15:** lo que no se probó es UNVERIFIED. Por ejemplo, abrir un PR desde la terminal con un texto propio no prueba que la plantilla se cargue en la web.
- **No mergees tus propios PRs** salvo que el proyecto lo diga. El merge es el punto de control de la persona que revisa.
- **Con squash merge, Git dice que la branch local "no está mergeada"** porque los commits de `main` son otros. Antes de borrarla con `-D`, comprobá que el contenido es igual (`git diff --quiet <branch> main`).

**Issues y backlog**
- **Cada issue tiene un "done when" que se puede comprobar** ("sin scroll horizontal a 320px", no "que se vea bien"), su fuente (comentario o nodo de Figma, ADR, conversación) y `Blocked by #N` si depende de otro.
- **Agrupá por etapa con milestones y por tipo con labels.** Sumá un label para lo que espera una decisión de producto, así se ve qué está trabado por una persona y no por el código.
- **Si el backlog está en issues, el archivo de pendientes no repite el detalle:** guarda el orden de trabajo, lo bloqueado y el porqué de la deuda, con links. Si los dos tienen el detalle, terminan diciendo cosas distintas.
- **Si una regla del proyecto pide algo que ninguna tarea cubre** (un ADR que exige un aviso en la interfaz), creá el issue.
- **Al crear muchos issues o recursos por la API, verificá la lista al final.** Los errores pueden ser parciales y correr la numeración: las referencias entre ellos (`Blocked by #10`) se escriben cuando los números ya existen.

**Protección de la branch principal** (si te toca configurarla): PR obligatorio, sin force push ni borrado; si se pushea directo, solo sin force push ni borrado. Con una sola persona manteniendo el repo, no exijas aprobaciones: GitHub no deja aprobar el PR propio y el repo queda trabado.

---

## 18. Trabajar por slices: plan, aprobación y cierre

Un **slice** es una porción chica del producto con un **resultado observable** y un **criterio de cierre** ("done when"). "Hacer la mitad de la pantalla" no es un slice: no se puede probar ni cerrar sola. Si el proyecto usa issues: un slice = un issue, con su branch y su PR, o con sus commits dentro del PR de la sesión si el proyecto trabaja así (sección 17). Chico, porque un diff corto se revisa entero.

**Antes:** leé el estado del proyecto y la tarea, el nodo exacto de Figma (con descripción y anotaciones) y los componentes y tokens que ya existen.

**El plan, antes de escribir código.** Se presenta y **se espera la aprobación**. Responde:

| Pregunta | Quién decide |
|---|---|
| Resultado observable | Producto (el usuario) |
| Qué entra y qué queda afuera a propósito | Producto |
| Estados | Producto (salen de Figma o del brief) |
| Qué es ficticio | Producto |
| Decisiones de producto o diseño abiertas | Producto: se preguntan, no se resuelven en el código |
| Evidencia de Figma | El agente la muestra |
| Decisiones ya aprobadas (issue, ADR) | El agente las cita |
| Supuestos, cada uno con su riesgo | El agente los dice |
| Reutilizar, extender, crear o mantener interno | El agente (crear solo con reutilización real) |
| Tokens | El agente |
| Archivos que cambian y por qué | El agente |
| Verificaciones que se van a correr | El agente |

- **Un plan se revisa buscando lo que falta:** sin "fuera de alcance", el alcance crece solo; sin estados, se inventan; sin supuestos, los tiene igual, solo que escondidos.
- **Para decidir dónde va cada cosa, wireframes en ASCII** antes de Figma o del código: 2 o 3 opciones, cada una con lo que gana y lo que pierde, y una recomendación. Gastan pocos tokens y separan la estructura del estilo. No sirven para espaciado ni jerarquía visual: eso es Figma y el navegador.
- **Una opción que no cumple el "done when" se muestra igual, marcada** ("en mobile queda escondida: no cumple"), para que se vea por qué se descarta.
- **Una decisión de producto tiene consecuencias técnicas** (un aviso que se puede cerrar suma estado, un botón y foco). Decilas al confirmarla y resolvelas en el plan.

**Implementación**
- **Solo lo aprobado.** Si el plan tiene que cambiar el resultado, el alcance o el comportamiento, frená y preguntá. Un cambio técnico menor se anota en el PR ("diferencias con el plan aprobado"), o en el commit de cierre si no hay PR: no basta con contarlo después.
- **Si el framework tiene documentación local para el caso** (por ejemplo, la guía de Next.js para evitar el flash antes de hidratar), seguí ese patrón y citalo en lugar de inventar uno.

**Cierre**
- Checks estáticos, runtime medido contra Figma, accesibilidad, consola y contenido extremo, con un ledger (sección 15).
- **Un slice no se cierra con un FAIL**, ni con un control que la tarea exige en UNVERIFIED.
- Docs de estado actualizados en el mismo PR (o push). La deuda que deja el slice (un SVG en línea hasta que exista el componente de íconos) se anota en el issue que la va a resolver.
- **Frená.** No empieces el siguiente slice hasta que te lo pidan (y, con un PR por slice, hasta que esté mergeado).

---

## 19. Revisión de diseño, además del ledger

El ledger prueba que **se construyó bien** (igual a Figma). No prueba que **se construyó lo correcto**: algo idéntico al diseño puede contradecir un principio del producto, tener un texto que no cumple lo que promete un ADR o perderse contra el fondo. Para eso va una revisión de diseño aparte (por ejemplo, [Impeccable](https://impeccable.style): `critique` y `audit`) al cerrar cada slice de UI.

- **Dos miradas separadas:** el juicio de diseño (jerarquía, textos, accesibilidad, qué pasa cuando algo falla, a quién le falla) y la evidencia mecánica (detector, mediciones). El juicio va primero y sin ver al detector, para que no se ancle en lo que el detector encontró. Un detector limpio no significa un buen diseño, y sus hallazgos se clasifican: real o falso positivo, con el motivo (por ejemplo, "una sola tipografía" es una decisión del sistema, no un error).
- **Cada hallazgo termina en uno de tres lugares:** se corrige en el slice, va a un issue con su "done when", o se rechaza con el motivo escrito. Ninguno queda en el aire.
- **La revisión puede mejorar el sistema, no saltearlo.** Si pide un color, un tamaño o un estilo que no existe, se crea el token en Figma primero y después en código. Lo que es producto (qué se muestra, qué dice un texto) lo propone y lo decide la persona dueña del producto; el texto aprobado se actualiza en Figma y en los docs del proyecto.
- **Los archivos de contexto que usa la herramienta** (por ejemplo `PRODUCT.md` y `DESIGN.md`) **son copias derivadas**, no una segunda fuente de verdad: se arman desde los docs del proyecto, Figma y los tokens del código, y se regeneran cuando esos cambian. Lo nuevo que aparezca al armarlos (una decisión de voz, de marca) se escribe primero en la fuente.
- **Una automatización "activada" no es evidencia.** Un hook, un check o un detector se prueba haciéndolo fallar a propósito (un archivo con un error conocido) y viendo que avise. Si no avisa, el registro de la herramienta dice por qué (por ejemplo, un hook que ignora archivos fuera de la carpeta donde se abrió la sesión).

---

## Cómo crece esta skill

Cuando aparece una regla nueva, se suma con su **por qué**, escrita para **cualquier proyecto**: sin datos de un proyecto concreto (nombres de archivo, de tokens, de componentes, planes o librerías) salvo como ejemplo marcado. Lo específico de un proyecto va en la documentación de ese proyecto (`CLAUDE.md` o `docs/`), que la sección 0 manda a leer. Si una regla nueva contradice otra, se actualiza la existente en lugar de duplicarla.
