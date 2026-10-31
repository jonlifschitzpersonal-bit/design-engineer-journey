# Clase 6.3: Accesibilidad de componentes

**Objetivo:** que los componentes del sistema no solo se vean como en Figma, sino que **funcionen** para quien usa lector de pantalla, solo teclado o el alto contraste de Windows. Se arregla una vez en el componente y queda arreglado en cada pantalla que lo use.

**Material:**
- Esta guía.
- Los commits del dashboard: [`675545e`](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/commit/675545e) (`Button` y la X del aviso, #37) y [`6dd3e75`](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/commit/6dd3e75) (`MetricCard` y `StatusBadge`, #40).
- El [ADR 0009](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/blob/main/docs/adr/0009-async-action-feedback.md): quién anuncia el resultado de una acción.
- Guía *De Figma a código con IA*, §16 (señales de alarma) y §17 (ledger).
- [NVDA](https://www.nvaccess.org/download/) (lector de pantalla gratis para Windows) y [Radix Primitives](https://www.radix-ui.com/primitives) / [Base UI](https://base-ui.com) como referencia.

---

## 1. La idea: cuatro cosas y dos modos

Un componente accesible cumple con cuatro cosas. Las cuatro ya estaban en la 6.2, y esta clase las prueba de verdad:

| Qué | Qué significa | En el sistema |
|---|---|---|
| **Semántica** | El elemento HTML correcto. El navegador ya le da rol, teclado y foco | `Button` es un `<button>`; el título de la `MetricCard`, un `<h3>`; el aviso, una `<section>` con nombre |
| **Nombre** | Lo que el lector dice que es | "Cerrar aviso", "Guardar, cargando", "Subió 12% respecto del período anterior" |
| **Teclado** | Todo se usa sin mouse: Tab para moverse, Enter o Espacio para apretar | El botón cargando no se puede volver a apretar, tampoco con Espacio |
| **Foco** | Siempre se ve dónde estás | El anillo de 2px (`focus-ring`) |

Además, la persona puede activar **modos del sistema**, y el componente los tiene que respetar:

| Modo | Qué hace | En el sistema |
|---|---|---|
| **Movimiento reducido** | Pide menos animaciones | El spinner solo gira con `motion-safe:` (ya estaba) |
| **Colores forzados** (alto contraste de Windows) | Reemplaza **todos** los colores por los del sistema (por ejemplo, texto blanco sobre negro) y **borra fondos y sombras** | Lo que se dibujaba con un fondo o con `box-shadow` desaparece. Es el centro de esta clase |

## 2. Radix y Base UI: cuándo sí y cuándo no

Radix y Base UI son librerías **headless**: traen el comportamiento resuelto (teclado, foco, atributos ARIA) y nada de estilo. El estilo lo ponés vos, con tus tokens.

| Componente | ¿Hace falta? | Por qué |
|---|---|---|
| `Button`, `StatusBadge`, `MetricCard`, `Icon` | **No** | El HTML ya resuelve todo: un `<button>` nativo tiene teclado y foco gratis |
| Modal de "Nuevo proyecto" (#10) | **Sí** | Hay que atrapar el foco adentro, cerrar con Esc, devolver el foco al botón que lo abrió y esconder el resto al lector. Hecho a mano, se olvida alguna |
| Tabs, selectores, menús (#18) | **Sí** | Se navegan con las flechas, no con Tab, y cada uno tiene su patrón ARIA (WAI-ARIA Authoring Practices) |

Regla: **si el HTML nativo alcanza, se usa el nativo.** Si el componente tiene un patrón de teclado propio (flechas, Esc, foco atrapado), va una librería headless y no se programa desde cero. La librería se elige en el slice que la necesite, con un ADR.

## 3. Ejemplo resuelto: el slice del #37

La revisión de la 6.2 dejó cuatro problemas del `Button`. Así quedó cada uno:

### 3.1 Alto contraste: los botones se veían como texto suelto

**Antes** (alto contraste emulado en Chrome): el primary pierde el fondo, el secondary pierde el borde (era un `inset-ring`, o sea una sombra) y el ghost nunca tuvo borde. Los tres quedan como texto.

**Después:** un contorno de 1px que **solo aparece en ese modo**:

```ts
"forced-colors:outline forced-colors:-outline-offset-1",
"focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus-ring",
```

- `forced-colors:` es el prefijo de Tailwind para ese modo. Fuera de él no cambia nada.
- Es un `outline` y no un `border` porque el `outline` no ocupa lugar: el botón sigue midiendo 40px (y 32 el chico). `-outline-offset-1` lo dibuja hacia adentro.
- El color no se elige: Windows lo fuerza al color de texto del sistema.
- Con foco, el anillo pasa a 2px y hacia afuera (`outline-offset-0`), así que se distingue del contorno.
- La X del aviso recibió lo mismo.

Medido en Chrome: los seis botones miden igual en los dos modos, y en alto contraste todos tienen un contorno sólido de 1px. El deshabilitado sale en el gris del sistema (`GrayText`), sin hacer nada: Windows ya lo pinta así.

### 3.2 Teclado mientras carga

**Antes:** con Espacio apretado, el botón que cargaba se pintaba como "apretado", aunque no iba a hacer nada. `pointer-events: none` frena solo al mouse, no al teclado.

**Después:** el color de apretado tiene una condición: `not-aria-disabled:active:` ("apretado, solo si no está ocupado").

Medido: con Espacio, el secondary normal toma el color de apretado y el que carga queda transparente.

### 3.3 `disabled` y `loading` a la vez

En Figma, `loading` es un booleano y `disabled` es un valor de `state`, así que se pueden combinar. Quedó definido así: **gana `loading`**. Si el botón quedara deshabilitado mientras trabaja, el foco saltaría al principio de la página. Medido: con los dos, el botón sigue enfocable y se lee "…, cargando".

### 3.4 Anunciar la carga y su fin

El botón cargando se llama "Guardar, cargando". El problema es el final: vuelve a "Guardar", que no dice si salió bien.

**La decisión (ADR 0009):** el botón solo dice que está ocupado. **El resultado lo anuncia la pantalla que lo usa**, porque es la única que sabe si salió bien o mal y qué texto corresponde. Lo anuncia en una zona `role="status"`:

```tsx
<Button loading={guardando} onClick={guardar}>Guardar</Button>
{/* Existe desde el principio, vacía. Si aparece junto con el texto, el lector no la oye. */}
<p role="status">{mensaje}</p>   {/* "Cambios guardados" cuando termina */}
```

- `role="status"` es **cortés**: espera a que el lector termine lo que está diciendo. `role="alert"` interrumpe, y se reserva para errores urgentes.
- Si el lector no anuncia el cambio de nombre al empezar ("Guardar, cargando"), la zona de estado también dice "Guardando". Eso lo decide una prueba con NVDA, que quedó en el issue [#39](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/39).

### 3.5 Figma

En el `Button` se sumaron dos anotaciones de *Accessibility* (alto contraste, y anuncio con `loading` y `disabled`), nativas y en el frame `annotations`. En el `DemoNotice`, la del contorno de la X.

## 4. Cómo se prueba sin lector de pantalla

| Qué | Cómo | Qué prueba |
|---|---|---|
| Alto contraste | DevTools → `⋮` → *More tools* → *Rendering* → *Emulate CSS media feature forced-colors* → `active` | Que cada control tenga borde y el foco se vea |
| Árbol de accesibilidad | DevTools → *Elements* → pestaña *Accessibility* | Rol, nombre y estado (`disabled`) de cada elemento, igual que los recibe el lector |
| Teclado | Tab, Shift+Tab, Enter, Espacio | Orden, foco visible, que no quede nada sin alcanzar |

El árbol dice **qué recibe** el lector, no **qué dice**: cada lector lo lee distinto. Por eso al final se prueba con uno real.

## 5. Práctica: NVDA (no se hizo; queda en el #39)

Decidiste no hacerla en esta clase. Lo que se probó en Chrome está en el ledger; lo que dice un lector real quedó como UNVERIFIED en el issue [#39](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/39), para hacerlo con las stories de Storybook (6.4). La guía queda para ese momento.


La página de prueba temporal ya se borró: la prueba se hace sobre las stories de la 6.4.

**Preparar**
1. Bajá NVDA de [nvaccess.org/download](https://www.nvaccess.org/download/). Si pide donación, se puede poner 0. Instalalo.
2. Abrilo con **Ctrl+Alt+N**. La tecla de NVDA es **Insert**.
3. Abrí el visor de voz: **Insert+N** → *Herramientas* → *Visor de voz*. Muestra en texto todo lo que dice.
4. Para apagarlo: **Insert+Q**. Para callarlo un momento: **Ctrl**.

**Recorrer** (en Chrome, con la página de prueba abierta)
1. **Tab** desde arriba hasta el final. Fijate qué dice en cada botón y si aparece "no disponible" en los deshabilitados y en los que cargan.
2. En **"Guardar"**, apretá **Enter**. Anotá qué dice en el momento y qué dice a los 3 segundos.
3. Volvé al principio (**Ctrl+Inicio**) y recorré con la **flecha abajo** las cards de "Indicadores": el título, el valor, la tendencia, la card que carga y la del error.
4. Apretá **H** varias veces: salta de título en título. Fijate si aparecen los títulos de las cards.

**Alto contraste**
5. En DevTools, emulá `forced-colors: active` (sección 4) y mirá los botones, las cards y los estados.

**Qué se entrega:** una captura del visor de voz (o el texto copiado) del paso 2 y lo que llamó la atención en el resto. Con eso se cierra el #39 y se decide si la zona de estado también anuncia "Guardando".

## 6. Ejemplo resuelto: slice 2, `MetricCard`, `StatusBadge` e `Icon` (#40)

| Hallazgo | Arreglo | Medido |
|---|---|---|
| En alto contraste, la card que carga era una caja vacía (skeletons y círculo del ícono son rellenos) | El mismo contorno de 1px, solo en ese modo, en cada forma | Las 4 formas con contorno; la card sigue midiendo 194px |
| En alto contraste, el badge perdía la píldora y el punto | Contorno de 1px en la píldora. El punto no se recupera: es decorativo y el estado lo dice el texto | 64/78/56×24 en los dos modos |
| **`harden` encontró un bug:** con una card cargando, toda la página tenía scroll horizontal (1228px de ancho en una pantalla de 800) | El título oculto tenía `w-full` y `sr-only` juntos. `w-full` le ganaba al ancho de 1px de `sr-only`, y como `sr-only` es `position: absolute`, el título medía el ancho de la ventana. Ahora `w-full` va solo cuando el título se ve | Sin scroll a 800 ni a 320 |
| `Icon` y las flechas | Nada: usan `currentColor` y Windows les pone su color | Se ven en la captura |
| Contenido extremo: un título de 76 caracteres y "1.234.567.890" | Nada: bajan de línea dentro de 288px | Medido a 320 |

**La lección del bug:** en la 6.2 se midió el ancho de la card (194px, igual a Figma) y pasó. El problema no estaba en la card sino en la página. Por eso el control es "la página no tiene scroll horizontal" (`scrollWidth` igual al ancho de la ventana), no "el componente mide lo que dice Figma".

`audit`: `Button` 17/20, `MetricCard` y `StatusBadge` 18/20. El detector solo marcó Inter, que es la tipografía del sistema (falso positivo). Figma: una anotación de *Accessibility* en cada componente.

## 7. Lo que sigue

- **6.4 Storybook:** las stories de cada variante y estado, con el addon de accesibilidad. Ahí se puede hacer la prueba con NVDA del #39.
- Lo de diseño sigue en tus manos: #36 (`Button`) y #38 (`MetricCard`).
