# Clase 5.5: Trabajar por slices

**Objetivo:** hacer un cambio del dashboard de punta a punta como un slice: chico, con un resultado que se ve, un plan que aprobás antes del código y un cierre con evidencia. Desde acá, todo el dashboard se trabaja así.

**Material:**
- Esta guía.
- El issue del slice: [#20 Show that the data is fictitious](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/20).
- Guía *De Figma a código con IA*, §13 (slices) y §15 (revisar el plan).

---

## 1. Qué es un slice

Un slice es una porción chica del producto con un **resultado observable** y un **criterio de cierre**. "Hacer la mitad de la pantalla" no es un slice: no se puede probar ni cerrar sola.

| Es un slice | No es un slice |
|---|---|
| El shell: sidebar, barra superior y tabs, navegables con teclado | "Arrancar el dashboard" |
| Las tarjetas de indicadores con datos ficticios y sus 6 estados | "Las tarjetas, sin los estados por ahora" |
| El aviso de datos ficticios en todas las pantallas | "Mejorar el layout" |

**Por qué chico:** un diff de 5 archivos lo revisás entero; uno de 40, no. Y si algo sale mal, se descarta un slice, no una semana.

**Una regla que no se negocia:** el agente frena al cerrar el slice. No "aprovecha" para empezar el siguiente.

---

## 2. El flujo, en cuatro momentos

Los 15 pasos de la guía (§13), agrupados:

| Momento | Pasos | Quién |
|---|---|---|
| **Antes** | Leer el estado del proyecto y el issue · inspeccionar el nodo de Figma · buscar componentes y tokens que ya existen | Claude |
| **Plan** | Alcance y fuera de alcance · estados · qué se reutiliza, extiende o crea · archivos que cambian · verificaciones | Claude lo escribe, **vos lo aprobás** |
| **Implementación** | Solo lo aprobado · lint y build · probar en el navegador · accesibilidad, consola, contenido extremo | Claude |
| **Cierre** | Diff explicado · docs de estado actualizados · ledger con evidencia · PR · frenar | Claude abre el PR, **vos lo revisás y mergeás** |

Tus dos puntos de control son la aprobación del plan y el merge. Todo lo demás lo hace el agente, pero no puede saltearse ninguno de los dos.

---

## 3. Revisar el plan: qué te toca a vos

La guía (§15) lista 13 preguntas que un plan tiene que responder. No todas son tuyas:

| Pregunta | Quién decide |
|---|---|
| ¿Cuál es el resultado observable? | **Vos** |
| ¿Qué entra y qué queda afuera? | **Vos** |
| ¿Qué estados existen? | **Vos** (vienen de Figma o del producto) |
| ¿Qué datos o acciones son ficticios? | **Vos** |
| ¿Hay una decisión de producto o diseño pendiente? | **Vos** |
| ¿Qué evidencia viene de Figma? | Claude la muestra, vos la confirmás |
| ¿Qué se está suponiendo? | Claude lo dice y nombra el riesgo |
| ¿Qué componentes se reutilizan, extienden o crean? | Claude |
| ¿Qué tokens se usan? | Claude |
| ¿Qué archivos cambian y por qué? | Claude |
| ¿Qué verificaciones se van a correr? | Claude |
| ¿Qué decisiones ya están aprobadas? | Claude las cita (ADR, issue) |

**Cómo leés un plan sin leer código:** buscá lo que no está. Un plan sin "fuera de alcance" va a crecer solo; uno sin estados va a inventarlos; uno sin supuestos los tiene igual, solo que escondidos.

---

## 4. Wireframes en ASCII

Antes de abrir Figma o escribir código, el layout se prueba en texto. Un wireframe en ASCII:

- **Es barato:** el agente lo escribe en segundos y gasta pocos tokens. Tres opciones cuestan menos que un frame de Figma.
- **Separa la estructura del estilo:** no hay colores ni tipografía, así que se discute solo dónde va cada cosa.
- **Se itera en la conversación:** "mové esto arriba" y aparece la versión nueva.

Sirve para decidir **qué va dónde**. No sirve para espaciado, jerarquía visual ni craft: eso es Figma y el navegador.

### Ejemplo resuelto: el aviso de datos ficticios

El dashboard todavía no tiene pantallas, así que los wireframes usan el layout del `PROJECT_CONTEXT.md` (sidebar, barra superior, indicadores, tabla) para ver el aviso donde va a vivir.

**A. Franja arriba de todo**

```
+------------------------------------------------------------------------+
| (i) Demo con datos ficticios. No son cifras reales de Gurises Unidos.  |
+-------------+----------------------------------------------------------+
| Gurises     | [Buscar proyecto...]          [2025 v]  [Departamento v] |
| Unidos      +----------------------------------------------------------+
|             | Niñas, niños y adolescentes alcanzados                   |
| > Proyectos | 12.480                                                   |
|   Métricas  +------------------+------------------+--------------------+
|   Benefic.  | Familias         | Docentes         | Proyectos activos  |
+-------------+------------------+------------------+--------------------+

Mobile (320px)
+--------------------------------+
| (i) Demo con datos ficticios.  |
| No son cifras reales de        |
| Gurises Unidos.                |
+--------------------------------+
| [=]  Gurises Unidos            |
+--------------------------------+
| Niñas, niños y adolescentes    |
| 12.480                         |
```

- Se ve en todas las pantallas y en mobile, con el texto completo.
- Empuja el contenido una línea (dos o tres en mobile); no tapa nada.
- Va en el layout raíz: las pantallas que vengan la tienen sin hacer nada.

**B. Etiqueta en la barra superior**

```
+-------------+----------------------------------------------------------+
| Gurises     | [Datos ficticios]  [Buscar...]    [2025 v]  [Depto. v]   |
| Unidos      +----------------------------------------------------------+
|             | Niñas, niños y adolescentes alcanzados                   |

Mobile (320px)
+--------------------------------+
| [=] Gurises Unidos  [Ficticio] |
+--------------------------------+
```

- No ocupa altura.
- Compite con la búsqueda y los selectores, que son lo más usado de la barra.
- En mobile entra una sola palabra: se pierde a quién se refiere ("¿ficticio qué?").

**C. Nota al pie del sidebar**

```
+-------------+----------------------------------------------------------+
| Gurises     | [Buscar proyecto...]          [2025 v]  [Departamento v] |
| Unidos      +----------------------------------------------------------+
| > Proyectos | Niñas, niños y adolescentes alcanzados                   |
|   Métricas  | 12.480                                                   |
|             |                                                          |
| Datos       |                                                          |
| ficticios.  |                                                          |
+-------------+----------------------------------------------------------+

Mobile (320px): el sidebar se esconde en el menú [=] y el aviso no se ve.
```

- Es la más discreta.
- **No cumple el issue:** en mobile queda escondida, y el #20 pide que se vea en desktop y en mobile.

**Recomendación: A.** Es la única que se ve siempre, en cualquier ancho, con la frase completa, sin tapar contenido. Lo que queda por decidir es tuyo: el texto y si se puede cerrar.

**Decidido (producto):** A, franja arriba. Texto: "Demo con datos ficticios. No son cifras reales de Gurises Unidos." Se puede cerrar con una X y queda cerrado en ese navegador.

**Diseñado en Figma:** componente `DemoNotice` en `02 - Components` (Section `DemoNotice`), con `state=default | hover | focus` para el botón de cerrar, un ejemplo a 320px y las anotaciones. Se sumaron los íconos `info` y `x` al set `Icon`.

---

## 5. El plan del slice (ejemplo resuelto)

Así se ve un plan completo. Cada bloque responde una de las preguntas de la sección 3.

**Issue:** #20 · **Branch:** `feat/20-demo-notice`

**Resultado observable:** en todas las pantallas (`/` y `/tokens` hoy, y las que vengan) aparece arriba de todo una franja celeste con el aviso. La X la cierra, y sigue cerrada al recargar o al cambiar de pantalla. Se ve igual que el `DemoNotice` de Figma a 1280px y a 320px.

**Alcance**

| Entra | Queda afuera |
|---|---|
| El componente `DemoNotice` y su lugar en el layout raíz | El componente `Icon` en código (#12): el aviso usa los dos SVG de Lucide adentro, y se pasan a `Icon` cuando exista |
| Cerrar y recordarlo en ese navegador | La variante de solo ícono del `Button` (#3): la X es interna |
| Teclado, foco y lector de pantalla | Volver a mostrar el aviso después de cerrarlo |
| Actualizar `CURRENT_STATE` y `PENDING_TASKS` | El shell, el favicon (#16) y el deploy (#8) |

**Estados:** visible (por defecto) y cerrado. La X tiene hover y foco visible. No hay loading ni error: no depende de datos.

**Evidencia de Figma:** Section `DemoNotice` en `02 - Components`: tokens, medidas (40px de alto en desktop, X de 32×32), alineación con la primera línea a 320px y cinco anotaciones.

**Decisiones aprobadas:** ubicación, texto y que se pueda cerrar (vos, en esta clase). Que la demo avise que los datos son ficticios ([ADR 0005](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/blob/main/docs/adr/0005-fictitious-data-no-backend.md)).

**Supuestos y su riesgo**

| Supuesto | Riesgo |
|---|---|
| Cerrado es para siempre en ese navegador (no vence) | Quien lo cerró y vuelve en meses no lo ve. Aceptable: ya lo leyó |
| La X usa `text-text-muted` y `text-text-default`, como ya hace el set `Icon` en Figma (no hay tokens `color/icon/muted`) | Si después se separan los colores de íconos, hay que cambiarlo acá |
| Sin JavaScript, el aviso se ve pero la X no hace nada | Ninguno para el objetivo: el aviso se ve igual |

**Reutilizar, extender, crear o mantener interno**

| Pieza | Decisión | Por qué |
|---|---|---|
| Tokens de color, radio, text style y espaciado | Reutilizar | Están todos en `globals.css` |
| `DemoNotice` | Crear, en `components/` | Es una pieza propia, aparece en todas las pantallas |
| Botón de cerrar | Mantener interno | Un solo uso; pasa a `Button` si aparece otro de solo ícono |
| Íconos `info` y `x` | SVG adentro del componente, por ahora | `Icon` todavía no existe en código (#12). Se anota en el #12 |

**Archivos que cambian**

| Archivo | Qué |
|---|---|
| `components/DemoNotice.tsx` (nuevo) | La franja: `<aside>` con nombre "Aviso", el texto y el `<button>` "Cerrar aviso". Es *client component* porque tiene un clic |
| `app/layout.tsx` | El aviso primero en el `<body>`. Un script mínimo en el `<head>` que, si ya se cerró, lo oculta **antes de pintar** (sin él, aparece un instante y la página salta 40px). Un contenedor para el contenido, adonde va el foco al cerrar (y que más adelante sirve para el link "Saltar al contenido") |
| `app/globals.css` | Una variante de Tailwind, `demo-dismissed:`, para ocultar el aviso cuando está cerrado |
| `docs/CURRENT_STATE.md`, `docs/PENDING_TASKS.md` | Lo hecho y lo verificado |

**Datos o acciones ficticias:** ninguna. El aviso es justamente el que lo dice.

**Verificaciones**

| Control | Cómo |
|---|---|
| Lint y build | `npm run lint`, `npm run build` |
| Igual a Figma a 1280 y 320px | Medido en Chrome (alto, paddings, colores, text style) contra el nodo |
| Cerrar y que siga cerrado | Clic en la X, recargar y pasar a `/tokens` |
| Sin salto al recargar cerrado | El aviso está oculto desde el primer pintado |
| Teclado | Tab llega a la X primero, con foco visible; Enter la cierra y el foco pasa al contenido |
| Lector de pantalla | Árbol de accesibilidad: región "Aviso", botón "Cerrar aviso", ícono oculto. Un lector real queda UNVERIFIED si no se prueba |
| Consola | Sin errores ni avisos de hidratación |
| Sin `localStorage` (modo privado estricto) | Se cierra igual en esa visita, sin errores |

**Decisión de producto pendiente:** ninguna.

**Aprobado** el 30/10/2026, sin cambios.

---

## 6. Lo que se hizo en la clase

1. **Wireframes en ASCII:** tres opciones (A, B y C). Elegiste la A, el texto corto y que se pueda cerrar. Que se pueda cerrar sumó un botón, estado en el navegador y foco; eso pasó al plan como trabajo técnico.
2. **Figma:** Claude propuso el diseño y lo armó después de tu aprobación. Íconos `info` y `x` en el set `Icon`, componente `DemoNotice` con 3 variantes, un ejemplo a 320px y las anotaciones. La auditoría de la skill dio 0 problemas.
3. **Plan:** aprobado sin cambios (sección 5).
4. **Código:** branch `feat/20-demo-notice`, 2 commits (el aviso y los docs de estado). Lint y build en verde, y medido en Chrome contra Figma. **PR #24**: lo revisaste y lo mergeaste, y el #20 se cerró solo.
5. **Deuda anotada donde se va a resolver:** en el #12, reemplazar los SVG por `Icon`; en el #7, poner el `DemoNotice` arriba de cada pantalla.
6. **El proceso pasó al repo del dashboard:** issue #25 y **PR #26** (cómo trabajar por slices en su `CLAUDE.md` y una sección nueva en la plantilla de PR). Lo mergeás vos.

**Qué hace cada archivo del diff**

| Archivo | Qué hace |
|---|---|
| `components/DemoNotice.tsx` (nuevo) | La franja: `<aside>` "Aviso", el texto fijo, los dos íconos y el `<button>` "Cerrar aviso". Al cerrarlo, guarda `dismissed` en el navegador y pasa el foco al contenido |
| `app/layout.tsx` | Pone el aviso primero en todas las pantallas y envuelve el contenido en `#content`, adonde va el foco |
| `app/globals.css` | La variante `demo-dismissed:`. Cuando el aviso está cerrado, `<html>` lleva una marca y esa variante lo oculta |

**Por qué un script en línea:** el servidor no sabe si cerraste el aviso, porque eso vive en tu navegador. Si se arregla después de pintar (con `useEffect`), el aviso aparece un instante y la página salta 40px. El script corre mientras el navegador lee el HTML, antes de llegar al aviso, y lo oculta antes de pintarlo. Es el patrón que recomienda la guía de Next.js 16 para este caso.

**Lo que salió mal y cómo se resolvió**

- **En Figma, el script se cortó a la mitad** por una función que en este modo tiene que ser async (`setTextStyleIdAsync`). Se borró lo que había quedado a medias antes de reintentar. Regla de la skill: nunca reintentar encima de restos.
- **En el ejemplo de mobile, el texto aparecía cortado.** `resize()` había dejado las variantes con alto fijo de 40px. Se vio en la captura, no en la respuesta de la API, que había dicho "ok". Regla nueva en la skill: después de `resize`, volver a Hug y probar con contenido largo.
- **Midiendo a 320px dentro de un iframe salían 3 líneas en vez de 2.** La barra de scroll del iframe ocupaba 17px. Con la barra oculta, el ancho fue 320 y el texto quedó en 232px, igual que en Figma. Antes de comparar, hay que confirmar que se mide en el mismo ancho.
- **El script cambió de lugar respecto del plan** (del layout al componente), y te lo conté recién después de implementar. Fue un cambio técnico menor, pero el plan aprobado decía otra cosa. Regla nueva, en la skill y en el `CLAUDE.md` del dashboard: un cambio que afecta el resultado se pregunta antes, y uno técnico menor se anota en el PR, en "diferencias con el plan aprobado".

---

## 7. Ledger de la clase

| Control | Resultado | Evidencia |
|---|---|---|
| Lint y build | PASS | Exit 0; `/` y `/tokens` siguen estáticas |
| Desktop igual a Figma | PASS | Alto 40, padding 4/8/4/16, gap 8, fondo `#eef6ff`, `body/sm`, X de 32×32, trazo de 1,5px |
| 320px igual a Figma | PASS | Alto 60, texto de 232px en dos líneas, ícono y X con la primera línea, sin scroll horizontal |
| Hover y foco de la X | PASS | X de `#4b5563` a `#111827`; anillo de 2px en `focus-ring` |
| Teclado | PASS | El primer Tab va a la X; Enter la cierra y el foco pasa a `#content` |
| Sigue cerrado | PASS | Al recargar, en `/tokens` y al navegar con el link |
| El script corre antes que el aviso | PASS | En el HTML servido, el script está antes del `<aside>` |
| Que no aparezca un instante al recargar, visto a ojo | UNVERIFIED | No se grabó cuadro por cuadro |
| Sin `localStorage` | PASS | Con `setItem` fallando, se cierra igual y sin errores |
| Árbol de accesibilidad | PASS | Región "Aviso", el texto, botón "Cerrar aviso"; los íconos no aparecen |
| Lector de pantalla real | UNVERIFIED | No se probó con NVDA ni VoiceOver |
| Contraste | PASS | Texto 16,3:1, X 6,9:1, anillo 3,8:1 |
| Consola en desarrollo | PASS | Sin errores ni avisos de hidratación, abierto y cerrado |
| El PR #24 cerró el #20 | PASS | Issue #20 `CLOSED` por el PR #24; branch borrada |

---

## 8. ¿Cómo sabe el agente qué color o text style usar?

Es la pregunta que hiciste durante la clase.

- **Con Figma, no lo adivina:** cada nodo tiene la variable conectada y el MCP la devuelve. Por eso las auditorías piden que no haya colores sueltos.
- **Sin Figma, lo deduce del nombre** (5.9, 6.10). `color/text/muted` suena a "texto secundario", pero el nombre no dice cuándo **no** usarlo. En esta clase pasó: no hay un gris para íconos y la X usa el gris de texto, como ya hace el set `Icon`. Es razonable, pero no está escrito: otro agente podría elegir distinto.
- **Los tokens de componente** (`button/primary/bg`) ayudan dentro de ese componente, pero no para algo nuevo, que no tiene tokens propios. Y se multiplican: componente × parte × estado. Valen cuando un componente tiene que poder cambiar sin tocar el resto, como en un sistema con varias marcas.
- **Lo que resuelve la duda es una guía de uso:** para cada token y text style, para qué es, cuándo sí y cuándo no. Va en la descripción de cada variable en Figma (el MCP la lee) y en `docs/design-system/` del repo, con una regla en `CLAUDE.md`: leerla antes de elegir. Quedó en el plan de estudio, clase 6.6, con el caso de los íconos como primer ejemplo.
