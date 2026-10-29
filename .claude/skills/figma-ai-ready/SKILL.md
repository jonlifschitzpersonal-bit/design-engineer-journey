---
name: figma-ai-ready
description: Buenas prácticas para crear, editar o revisar archivos de Figma de forma que un agente pueda leerlos sin adivinar (estructura, nombres, componentes, variantes, variables y tokens, estados, responsive, accesibilidad, anotaciones y "ready for dev"). Usala SIEMPRE que vayas a tocar o revisar Figma, en especial con un MCP de Figma (Figma Console MCP o el oficial: ejecutar código, capturas, variables, componentes, anotaciones) — aunque el pedido sea algo chico como "arreglá el botón", "agregá un estado" o "chequeá el archivo".
---

# Figma AI-ready

Reglas para que un archivo de Figma funcione como **especificación** y no solo como imagen. El agente lee el árbol de capas, los nombres, las propiedades, las variables y las anotaciones: todo eso pasa casi directo al código. Lo que no está escrito en Figma, el agente lo inventa, y suele inventar solo el caso ideal.

Son reglas **generales**: valen para cualquier archivo. Los nombres que aparecen (`MetricCard`, `color/action/primary/bg`, `space/4`, Lucide) son **ejemplos**, no datos del archivo en el que estás. Las convenciones de cada archivo se leen del archivo y del proyecto (sección 0).

La skill `design-implementation` cubre la otra mitad: cómo se traduce todo esto a código.

---

## 0. Antes de empezar: leé el archivo y el proyecto

| Qué | Dónde mirarlo | Si no existe |
|---|---|---|
| Reglas del proyecto | `CLAUDE.md`, `AGENTS.md` o `docs/` del repo | Seguí esta skill |
| Plan de Figma | El proyecto o el usuario | Asumí el más limitado y verificalo (ver sección 8) |
| Páginas y Sections | El archivo | Proponé la convención de la sección 1 |
| Convención de variables | Colecciones, nombres, escalas y *code syntax* existentes | Proponé la de la sección 4 |
| Text styles | Los estilos locales | Creá estilos antes de usar tamaños sueltos |
| Librería de íconos | Descripción del componente de íconos | Preguntá cuál usar |
| Componentes existentes | Búsqueda en el archivo y en las librerías | Recién ahí se crea uno nuevo |

**Seguí la convención que ya tiene el archivo**, aunque no sea la de esta skill. Si no hay ninguna, proponela antes de aplicarla. Si algo del archivo contradice una regla de calidad (un color suelto, una capa `Frame 12`), avisá en lugar de copiarlo.

---

## 1. Estructura y nombres

- **Páginas con orden obvio.** Si no hay convención: `00 - Cover`, `01 - Foundations`, `02 - Components`, `05 - Screens`, `99 - Archive`. Antes de crear una página, revisá que no exista.
- **Cada componente vive dentro de una Section con su nombre**, nunca suelto en el canvas. Ubicá lo nuevo al costado de lo existente, sin superponer.
- **Nombrá por lo que es, no por cómo se dibujó:** PascalCase para componentes (`MetricCard`) y camelCase con el rol para capas internas (`icon`, `title`, `trendValue`). Ninguna capa puede llamarse `Frame …`, `Group …`, `Rectangle …`, `Vector` ni `Ellipse`.
- **Las instancias se renombran por su rol** (`iconStart`, `trendIcon`). Si hay dos íconos en un componente, el nombre es lo único que los distingue.
- **Propiedades en camelCase, con el nombre que tendrá la prop en código** (`showIconStart`, `iconStart`), y valores de variantes en minúscula (`primary`, `arrow-right`). Así la API de Figma y la del código son la misma.
- **Sin frames intermedios sin función.** Cada nivel extra es un `<div>` más que el agente tiene que interpretar.
- **Una sección o pantalla es un frame, no un componente.** Va en la página de pantallas, dentro de una Section con su nombre, y sus frames dicen qué caso muestran (`summary · desktop`, `summary · mobile`, `summary · loading`).
- **En una sección, las instancias se nombran por el dato que muestran** (`activeUsers`, `revenue`), no `MetricCard 1`. En código pasan a ser las claves de los datos.

## 2. Componentes, propiedades y variantes

- **Componente solo con reutilización real.** Lo que aparece una vez queda como capa bien nombrada.
- **Tipo de propiedad correcto:** Variant para diferencias discretas (`variant`, `size`, `state`); Text para textos editables; Boolean para mostrar u ocultar; Instance swap para íconos o subcomponentes.
- **Conectá cada capa a su propiedad.** Crear la propiedad no alcanza: el texto vinculado (`componentPropertyReferences.characters`), el booleano a la visibilidad, el instance swap a la instancia.
- **Revisá las conexiones en todas las variantes, no solo en la default.** Al crear variantes duplicando o por código, las conexiones se pierden sin aviso: la instancia sigue mostrando el texto de muestra aunque se le cambie la propiedad. Si una variante deja algo sin conectar **a propósito** (un texto fijo por estado, una capa oculta en `loading`), escribilo en la descripción.
- **Las variantes se multiplican, los booleanos no** (3 × 2 × 4 = 24). Usá booleanos para lo que solo se muestra u oculta.
- **No crees combinaciones que no existen.** Si `loading` no muestra tendencia, no hagas `loading × up/down/neutral`: creá una sola (Figma exige un valor por propiedad) y aclaralo en la descripción.
- **Si el texto depende del estado, no lo hagas editable** (un badge `active` siempre dice "Activo"). Aclaralo en la descripción y en una anotación de *Content*.
- **Si un componente necesita un tamaño que los text styles no tienen, creá el estilo**, en lugar de forzar el padding o escribir el tamaño suelto.
- **Lo que Figma no puede expresar va en la descripción del componente** (por ejemplo, que un booleano apaga a otro).
- **Íconos:** un component set con `name` como variante, tamaño y trazo fijos para todo el set, constraints *Scale*, y todas las capas de trazo con el mismo nombre (`path`): así el color que se le cambia a una instancia se mantiene al cambiar de ícono.
- **Íconos nuevos, de la librería del proyecto, no dibujados a mano.** Para adaptarlos al tamaño del set, importá el SVG con el tamaño final y el `stroke-width` en proporción (Lucide: grilla 24, trazo 2 → a 16px con trazo 1,5 = `stroke-width="2.25"`), aplaná círculos y líneas a vectores y renombrá las capas. Nombrá la variante por su significado y, si difiere del nombre en la librería, **anotá la equivalencia en la descripción del set**. Verificala por la forma, no por el nombre: un `arrow-up` puede ser `move-up` en la librería.
- **`hover`, `focus` y `pressed` son para dibujar y documentar;** en código los maneja el navegador. Un estado de un instante (pressed) puede ir en una anotación en lugar de sumar variantes.

## 3. Auto Layout con intención

- Para cada contenedor, decidí a propósito: dirección, gap, padding, alineación, Hug/Fill/Fixed y min/max width.
- **El ancho fijo de un componente es el de muestra; lo que importa es el min width.** Una card que va en grilla lleva min width para que el código use `minmax()`.
- **Decidí a propósito si el stroke suma al layout** (*include stroke in layout*): cambia el alto real y se traduce distinto en código (`border` o borde interno). Si dos componentes lo tienen distinto, que sea por una razón.
- **Una grilla de cards es una fila con *wrap* y las cards en Fill con min width;** se reparten solas como `repeat(auto-fill, minmax())`. Título y acción en los extremos usan espaciado "Auto", no un gap fijo.
- **Probá con contenido extremo** (título de dos líneas, número largo, el ancho mínimo) con una instancia temporal, y borrala después.

## 4. Variables y tokens

- **Tres niveles:** primitivos (cómo se ve: `blue/200`), semánticos (para qué sirve: `color/action/primary/bg`, alias de un primitivo) y de componente solo si hace falta.
- **Los componentes usan solo semánticos.** Ningún hex suelto, ningún primitivo directo.
- **Scopes:** primitivos de color sin scopes (no aparecen en el selector); espaciado con `GAP`, radios con `CORNER_RADIUS`, semánticos con el de su uso (`TEXT_FILL`, `FRAME_FILL`, `STROKE_COLOR`…).
- **Mismo valor no es mismo token:** un color con dos funciones son dos semánticos. Al revés, dos valores casi iguales sin razón de diseño se unifican en un primitivo.
- **Escala de espaciado:** seguí la del proyecto. Si no hay, `space/N` = N × 4px (la de Tailwind). **Figma no acepta puntos en los nombres de variables:** `space/1-5`, no `space/1.5`.
- **Code syntax WEB en los semánticos** (`var(--color-text-muted)`), con la convención del código del proyecto.
- **Tipografía con text styles**, no con tamaño y peso sueltos.
- **Si una anotación pide algo del texto, ponelo en el text style** (por ejemplo, números tabulares en el estilo de las métricas). Si solo está en la anotación, Figma y el código se ven distintos.
- **Si un estado necesita un color que no existe, creá el token** (primitivo + semántico) antes de usarlo.

## 5. Estados, responsive y accesibilidad

- **Antes de dibujar una sección, escribí el brief:** problema, usuario, contenido representativo (formato local, un caso de cada variante) y lo que queda **fuera de alcance**.
- **Elegí los estados por lo que el componente hace**, no de una lista: una card de datos necesita `loading`, `error` y sin comparación; no necesita `hover` si no es clickeable.
- **Estados de una sección:** `default`, `loading` (con las acciones que dependen de los datos deshabilitadas) y `partial-error` (un bloque falla, el resto sigue), además de los de cada componente.
- **El skeleton de `loading` respeta el tamaño final.** Verificá que todas las variantes de estado midan lo mismo.
- **Responsive:** se dibuja el ancho donde cambia el orden y se anota el que resuelve la grilla sola. Breakpoints: los del proyecto; si no hay, los de Tailwind (640 / 768 / 1024 / 1280).
- **Contraste calculado, no estimado:** 4.5:1 texto normal, 3:1 texto grande, íconos con significado y anillo de foco. Deshabilitados exentos. Un borde bajo solo vale si es decorativo; el de un input necesita 3:1.
- **Ningún significado solo con color,** y el texto para lector de pantalla se anota.

## 6. Anotaciones y "ready for dev"

- **Anotá lo que no se deduce mirando**, con las categorías: *Development*, *Interaction*, *Accessibility*, *Content*.
- **Cada anotación va sobre el nodo exacto al que se refiere**, no todas sobre el frame principal.
- **Una anotación dice qué tiene que pasar, no cómo programarlo.**
- **Si el plan no muestra las anotaciones nativas** (en Starter solo se ven en Dev Mode, que no está incluido), cada una va **dos veces**: nativa (para el agente) y como nota visible en un frame `annotations` dentro de la Section, con tokens y text styles. Si cambiás una, actualizá la otra.
- **No digas que algo "funciona" si solo verificaste que la API lo aceptó.** Confirmalo con una captura o aclará qué no pudiste verificar.
- **"Ready for dev" solo si se cumple el checklist:** estados, responsive definido o anotado, contenido representativo, sin valores sueltos ni nombres genéricos.

## 7. Trabajar con un agente por MCP

- **Antes de crear o modificar, inspeccioná y proponé; no toques nada sin aprobación**, aunque el pedido sea corto. La propuesta incluye: qué encontraste, el plan, qué vas a reutilizar, extender o crear, y las decisiones pendientes con tu recomendación.
- **Las decisiones técnicas las tomás vos y las explicás; las de producto son del usuario:** qué se muestra, qué dice, qué significa un color, si algo es editable, si un componente merece existir.
- **Separá evidencia, decisión aprobada y suposición.**
- **Si el pedido no tiene resultado observable,** tomalo del contexto y decilo explícitamente para que lo confirmen.
- **Comentarios → backlog:** juntá duplicados, clasificá (bug, pregunta de diseño, contenido, componente nuevo), convertí cada pregunta en una tarea y marcá quién decide. No respondas vos las preguntas de diseño.
- **Leé antes de tocar:** recorré el árbol (nombres, tipos, Auto Layout, propiedades, referencias) y sacá una captura. Los IDs de nodos cambian entre sesiones: no reutilices IDs de otra conversación.
- **Después de cada cambio visual: captura y revisión.** Si algo falla a mitad de camino, borrá lo que quedó a medias antes de reintentar.
- **Contale al usuario qué cambiaste y por qué**, en lenguaje simple.

### Figma Console MCP (plugin Desktop Bridge)

- **Al empezar, chequeá la conexión** (`figma_get_status` con `probe: true`) y confirmá el nombre del archivo.
- **Si se pierde la conexión,** probá `figma_reconnect` una vez; si sigue, pedí que reabran el plugin en el archivo correcto. No reintentes en loop.
- **Con `documentAccess: dynamic-page`,** usá las APIs async: `getNodeByIdAsync`, `getMainComponentAsync`, `getLocalVariablesAsync`, `setTextStyleIdAsync`.
- **Para vincular variables:** `setBoundVariableForPaint` en rellenos y trazos; `setBoundVariable` en padding, gap y radios (las cuatro esquinas por separado).
- **`setProperties` sobre una instancia no avisa si la propiedad no está conectada en esa variante:** devuelve OK y la instancia sigue con el texto de muestra. Por eso la captura después de armar es obligatoria.
- **Al terminar, corré esta auditoría** sobre los component sets y Sections que tocaste, y no des el trabajo por cerrado si encuentra algo. Las únicas excepciones válidas son las que figuran en la descripción del componente:

```js
// ROOT_IDS: component sets y Sections tocadas. Devuelve [] si todo está bien.
const issues = [];
for (const id of ROOT_IDS) {
  const root = await figma.getNodeByIdAsync(id);
  // No entrar en instancias (se auditan en su componente) ni en el marco del component set
  const nodes = root.findAll(n => {
    let p = n.parent;
    while (p && p.id !== root.id) { if (p.type === 'INSTANCE') return false; p = p.parent; }
    return n.type !== 'COMPONENT_SET';
  });
  for (const n of nodes) {
    for (const k of ['fills', 'strokes'])
      if (k in n && n[k] !== figma.mixed)
        for (const p of n[k])
          if (p.type === 'SOLID' && !p.boundVariables?.color) issues.push([n.name, k, 'color suelto']);
    if (n.layoutMode && n.layoutMode !== 'NONE')
      for (const f of ['paddingTop', 'paddingLeft', 'itemSpacing'])
        if (n[f] > 0 && !n.boundVariables?.[f] && !(f === 'itemSpacing' && n.primaryAxisAlignItems === 'SPACE_BETWEEN'))
          issues.push([n.name, f, 'espaciado suelto']);
    if (n.type === 'TEXT' && !n.textStyleId) issues.push([n.name, 'sin text style']);
    if (/^(Frame|Group|Rectangle|Vector|Ellipse)\b/.test(n.name)) issues.push([n.name, 'nombre genérico']);
  }
  // Cada variante tiene que tener las mismas conexiones que la default
  if (root.type === 'COMPONENT_SET') {
    const refs = v => new Set(v.findAll(n => n.componentPropertyReferences && Object.keys(n.componentPropertyReferences).length)
      .flatMap(n => Object.keys(n.componentPropertyReferences).map(f => n.name + '.' + f)));
    const base = refs(root.defaultVariant);
    for (const v of root.children) {
      const miss = [...base].filter(x => !refs(v).has(x));
      if (miss.length) issues.push([v.name, 'sin conectar: ' + miss.join(', ')]);
    }
  }
}
return issues;
```

## 8. Según el plan de Figma

Verificá lo que el plan permite antes de diseñar algo que dependa de eso:

| Función | Starter / Free | Professional y superiores |
|---|---|---|
| Modos por colección de variables | 1 (el dark mode va en código o en otra colección) | Varios |
| Anotaciones nativas | Se guardan y el MCP las lee, pero no se ven sin Dev Mode → duplicarlas visibles | Visibles en Dev Mode |
| "Ready for dev" (`devStatus`) | Funciona | Funciona |
| MCP oficial de Figma | Muy pocas llamadas por mes; sin escritura en el canvas | Más llamadas |
| Code Connect | No disponible → mapeo Figma ↔ código documentado | Disponible en planes con Dev Mode |

Los límites cambian: si algo no coincide con esta tabla, comprobalo con la API y actualizala.

---

## Cómo crece esta skill

Cuando aparece una regla nueva, se suma con su **por qué**, escrita para **cualquier archivo**: sin datos de un proyecto concreto (nombres de archivo, de tokens o de componentes, IDs) salvo como ejemplo marcado. Lo específico de un proyecto va en su `CLAUDE.md` o `docs/`, que la sección 0 manda a leer. Si una regla nueva contradice otra, se actualiza la existente en lugar de duplicarla.
