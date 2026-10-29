---
name: figma-ai-ready
description: Buenas prácticas para crear, editar o revisar archivos de Figma de forma que un agente pueda leerlos sin adivinar (estructura, nombres, componentes, variantes, variables y tokens, estados, responsive, accesibilidad, anotaciones y "ready for dev"). Usala SIEMPRE que vayas a tocar o revisar Figma en este repo, en especial con las herramientas de Figma Console MCP (figma_execute, figma_take_screenshot, variables, componentes, anotaciones) — aunque el pedido sea algo chico como "arreglá el botón", "agregá un estado" o "chequeá el archivo".
---

# Figma AI-ready

Reglas para que un archivo de Figma funcione como **especificación** y no solo como imagen. El agente lee el árbol de capas, los nombres, las propiedades, las variables y las anotaciones: todo eso pasa casi directo al código. Lo que no está escrito en Figma, el agente lo inventa, y suele inventar solo el caso ideal.

La marca al final de cada regla indica la clase del curso donde Jonathan la aprendió. La skill de código (`design-implementation`) cubre la otra mitad: cómo se traduce todo esto a HTML, CSS, Tailwind y React.

---

## 1. Estructura y nombres

- **Páginas con orden obvio:** `00 — Cover`, `01 — Foundations`, `02 — Components`, `05 — Screens`, `99 — Archive`. Antes de crear una página, revisá que no exista. *(2.1)*
- **Cada componente vive dentro de una Section con su nombre** (`Icon`, `Button`, `MetricCard`), nunca suelto en el canvas. Ubicá lo nuevo al costado de lo existente, sin superponer. *(2.1)*
- **Nombrá por lo que es, no por cómo se dibujó:** PascalCase para componentes (`MetricCard`) y camelCase con el rol para capas internas (`icon`, `title`, `iconWrapper`, `trendValue`). Ninguna capa puede llamarse `Frame …`, `Group …`, `Rectangle …`, `Vector` ni `Ellipse`. *(2.1)*
- **Las instancias también se renombran por su rol.** Al insertar un `Icon`, la capa se llama `Icon`; renombrala por lo que hace ahí (`iconStart`, `trendIcon`). Si hay dos íconos en un componente, el nombre es lo único que los distingue. *(2.1)*
- **Nombres de propiedades en camelCase y con el nombre que tendrá la prop en código** (`showIconStart`, `iconStart`, `trendValue`), y valores de variantes en minúscula (`primary`, `arrow-right`). Así la API de Figma y la de React son la misma. *(2.1)*
- **No dejes frames intermedios sin función.** Un ícono es `componente > path`, no `componente > frame > vector`: cada nivel extra es un `<div>` más que el agente tiene que interpretar. *(2.1)*
- **Una sección o pantalla es un frame, no un componente:** vive en `05 - Screens`, dentro de una Section con su nombre (`Resumen`), y sus frames se llaman `summary · desktop`, `summary · mobile`, `summary · loading`, etc. *(2.5)*
- **En una sección, las instancias se nombran por el dato que muestran** (`activeUsers`, `revenue`, `orders`), no `MetricCard 1`. En código pasan a ser las claves de los datos. *(2.5)*

## 2. Componentes, propiedades y variantes

- **Componente solo con reutilización real.** Lo que aparece una vez (un hero, una ilustración) queda como capa bien nombrada. *(2.1)*
- **Tipo de propiedad correcto:** Variant para diferencias discretas (`variant`, `size`, `state`); Text para textos editables; Boolean para mostrar u ocultar; Instance swap para íconos o subcomponentes. *(2.1)*
- **Conectá cada capa a su propiedad.** Crear la propiedad no alcanza: el texto tiene que estar vinculado (`componentPropertyReferences.characters`), el booleano a la visibilidad y el instance swap a la instancia. Una propiedad sin vincular no hace nada y es fácil no notarlo. *(2.1)*
- **Las conexiones se revisan en todas las variantes, no solo en la default.** Al crear variantes duplicando o por código, las conexiones se pueden perder: en la 2.5 aparecieron 18 variantes del Button y 3 de la MetricCard sin ninguna conexión, y la instancia mostraba el texto de muestra ("Guardar", "Menciones en ChatGPT") aunque se le cambiara la propiedad. Si una variante deja algo sin conectar **a propósito** (texto fijo "—" en `error`, tendencia oculta en `loading`), escribilo en la descripción. *(2.5)*
- **Las variantes se multiplican, los booleanos no.** 3 × 2 × 4 = 24 en el Button. Usá booleanos para lo que solo se muestra u oculta. *(2.1)*
- **No crees combinaciones que no existen en la realidad.** Si `state=loading` no muestra tendencia, no hagas `loading × up/down/neutral`: creá solo `state=loading, trend=up` (Figma exige un valor para cada propiedad) y aclaralo en la descripción del componente. *(2.3)*
- **Si el texto depende del estado, no lo hagas editable.** En el `StatusBadge`, `status=active` siempre dice "Activo": sin propiedad de texto, un badge rojo nunca puede decir "Activo". Aclaralo en la descripción y en una anotación de *Content*. *(2.4)*
- **Si un componente necesita un tamaño que los text styles no permiten, creá el estilo** (`label/xs` 12/16 para un badge de 24px) en lugar de forzar el padding a 0 o escribir el tamaño suelto. *(2.4)*
- **Lo que Figma no puede expresar va en la descripción del componente.** Ejemplo: un booleano no puede apagar a otro, así que "con `loading`, apagá `showIconStart`" va en la descripción. *(2.1)*
- **Íconos:** un component set `Icon` con `name` como variante, 16×16, trazo de 1,5px con puntas redondeadas y constraints *Scale*. Todas las capas de trazo se llaman igual (`path`): así el color que se le cambia a una instancia se mantiene al cambiar de ícono, porque Figma conserva los cambios entre capas con el mismo nombre. *(2.1)*
- **Íconos nuevos: de Lucide, no dibujados a mano.** Lucide usa una grilla de 24 y trazo de 2; para llevarlo a 16 con trazo de 1,5, importá el SVG con `width/height=16` y `stroke-width=2.25`, aplaná círculos y líneas a vectores, y renombrá cada capa `path`. Nombrá la variante por su significado (`currency`) y, si difiere del nombre de Lucide (`dollar-sign`), anotá la equivalencia en la descripción del `Icon`. *(2.5)* **Verificá la equivalencia por la forma, no por el nombre:** las flechas del archivo resultaron ser `move-up`, `move-down` y `move-right` de Lucide, no `arrow-*`. *(2.6)*
- **Los estados `hover`, `focus` y `pressed` son para dibujar y documentar**; en código los maneja el navegador. Un estado de un instante (pressed) puede resolverse con una anotación en lugar de sumar variantes. *(2.1, 2.3)*

## 3. Auto Layout con intención

- Para cada contenedor, decidí a propósito: dirección, gap, padding, alineación, Hug/Fill/Fixed y min/max width. *(2.2)*
- **El ancho fijo de un componente es el de muestra; lo que importa es el min width.** Una card que va en grilla lleva min width (240) para que el código use `minmax()` en lugar de un ancho fijo. *(2.2)*
- **Decidí a propósito si el stroke suma al layout** (*include stroke in layout*). Cambia el alto real (la card mide 194 con el borde incluido; el botón, 40 sin incluirlo) y se traduce distinto en código (`border` o borde interno). Si dos componentes lo tienen distinto, que sea por una razón. *(2.6)*
- **Una grilla de cards en Figma es una fila con *wrap* y las cards en Fill con min width.** Así las cards se reparten solas según el ancho, igual que `repeat(auto-fill, minmax())` en código. Un header con título y acción en los extremos usa espaciado "Auto" (space-between), no un gap fijo. *(2.5)*
- **Probá con contenido extremo antes de dar algo por terminado:** título de dos líneas, número de muchos dígitos, el ancho mínimo. Si se rompe en Figma, el agente no puede deducir cómo adaptarlo. Hacelo con una instancia temporal y borrala después. *(2.2)*

## 4. Variables y tokens

- **Tres niveles:** primitivos (cómo se ve: `blue/200`), semánticos (para qué sirve: `color/action/primary/bg`, alias de un primitivo) y de componente solo si hace falta. *(2.2)*
- **Los componentes usan solo semánticos.** Ningún hex suelto, ningún primitivo directo. *(2.2)*
- **Primitivos de color sin scopes**, así no aparecen en el selector. Espaciado con scope `GAP`, radios con `CORNER_RADIUS`, semánticos con el scope de su uso (`TEXT_FILL`, `FRAME_FILL`, `STROKE_COLOR`…). *(2.2)*
- **Mismo valor no es mismo token.** Si un color cumple dos funciones (fondo primario y borde secundario), son dos semánticos. Al revés, dos valores casi iguales sin razón de diseño (`#EEF6FF` y `#EAF4FF`) se unifican en un primitivo. *(2.2)*
- **Escala de espaciado `space/N` = N × 4px**, la misma de Tailwind. **Figma no acepta puntos en los nombres de variables:** `space/1-5`, no `space/1.5`. *(2.2)*
- **Code syntax WEB en los semánticos** (`var(--color-text-muted)`): las barras pasan a guiones. *(2.2)*
- **Tipografía con text styles** (`label/md`, `body/sm`, `heading/metric`), no con tamaño y peso sueltos en cada capa. *(2.2)*
- **Si una anotación pide algo del texto, ponelo en el text style.** Los números tabulares de las métricas van activados en `heading/metric` (Type details → Numbers → Tabular); si solo están en la anotación, Figma y el código se ven distintos y el QA lo marca. *(2.6)*
- Si un estado necesita un color que no existe (neutral, skeleton), **creá el token** (primitivo + semántico) antes de usarlo; no pongas el hex directo. *(2.3)*

## 5. Estados, responsive y accesibilidad

- **Elegí los estados por lo que el componente hace**, no de una lista: una card de datos necesita `loading`, `error`, sin cambio y sin comparación; no necesita `hover` si no es clickeable. *(2.3)*
- **El skeleton de `loading` respeta el tamaño final:** cada barra mide lo que el interlineado del texto que reemplaza, para que la card no salte cuando llegan los datos. Verificá que todas las variantes de estado midan lo mismo. *(2.3)*
- **Responsive:** si no se dibuja cada tamaño, se anota (qué se apila, cuántas columnas, ancho completo en mobile). Breakpoints de Tailwind: 640 / 768 / 1024 / 1280. *(2.3)*
- **Contraste:** 4.5:1 texto normal, 3:1 texto grande, íconos con significado y anillo de foco. Los controles deshabilitados están exentos. Un borde bajo solo es válido si es decorativo: el borde de un input tiene que llegar a 3:1. Calculá el contraste, no lo estimes a ojo. *(2.3)*
- **Ningún significado solo con color:** la tendencia lleva flecha + color, y su texto para lector se anota. *(2.3)*
- **Antes de dibujar una sección, escribí el brief:** problema, usuario, contenido representativo (formato argentino, un caso de cada variante: sube, baja, sin cambio) y lo que queda **fuera de alcance**. Lo que no está escrito, el agente lo completa con lo más genérico. *(2.5)*
- **Estados de una sección, además de los de cada componente:** `default`, `loading` (todo en skeleton, con las acciones que dependen de los datos deshabilitadas) y `partial-error` (un bloque falla, el resto sigue). El error parcial es el que más se olvida y el que más pasa. *(2.5)*
- **Responsive de una sección: se dibuja el ancho donde cambia el orden** (mobile, si el header se apila) y se anota el que resuelve la grilla sola (tablet). *(2.5)*

## 6. Anotaciones y "ready for dev"

- **Anotá lo que no se deduce mirando**, con las categorías nativas: *Development* (grilla, comportamiento técnico), *Interaction* (qué pasa al tocar), *Accessibility* (roles, textos para lector), *Content* (formato de datos, vacíos). *(2.3)*
- **En el plan Starter, las anotaciones nativas no se ven** (se muestran en Dev Mode, que Starter no incluye): Jonathan no las ve aunque estén guardadas y el MCP las lea. Por eso, cada anotación va **dos veces**: nativa (para el agente) y como nota visible en un frame `annotations` dentro de la Section, debajo del componente (encabezado "Anotaciones · Componente" y, por nota, categoría + texto, con tokens y text styles). Si cambiás una, actualizá la otra. *(2.3)*
- **No digas que algo "funciona" en Figma si solo verificaste que la API lo aceptó.** Confirmá que se ve en pantalla (captura) o aclará qué no pudiste verificar. *(2.3)*
- **En una sección, cada anotación nativa va sobre el nodo exacto al que se refiere** (la grilla sobre `metrics`, la del botón sobre `exportButton`, la de error parcial sobre su frame), no todas sobre el frame principal. Así el agente sabe a qué parte del código aplica cada una. *(2.5)*
- **Una anotación dice qué tiene que pasar, no cómo programarlo.** "La tendencia se anuncia como texto" sí; "usar `sr-only`" no. *(2.3)*
- **"Ready for dev" solo si se cumple el checklist:** estados necesarios, responsive definido o anotado, contenido representativo, sin valores sueltos ni nombres genéricos. Se marca con `devStatus = { type: 'READY_FOR_DEV' }` en la Section (funciona en Starter). *(2.3)*

## 7. Trabajar con Figma Console MCP

- **Antes de crear o modificar, inspeccioná y proponé; no toques nada sin aprobación**, aunque el pedido sea corto ("hacé un StatusBadge"). La propuesta tiene: qué encontraste, el plan (árbol de capas y API), qué vas a reutilizar, extender o crear (tokens, estilos, componentes), y las **decisiones pendientes con tu recomendación** y su porqué. Las decisiones de producto (colores con significado, si algo es editable, si un componente merece existir) son de Jonathan. *(2.4)*
- **Separá evidencia, decisión aprobada y suposición** cuando informes lo que leíste. Las suposiciones que nadie ve son las que terminan en bugs. *(2.4)*
- **Si un pedido no tiene resultado observable, tomalo del contexto (README de la clase, anotaciones) y decilo explícitamente**, para que Jonathan lo confirme o lo corrija. *(2.4)*
- **Comentarios → backlog:** al leer comentarios de Figma, juntá los duplicados, clasificá (bug, pregunta de diseño, contenido, componente nuevo), convertí cada pregunta en una tarea y marcá quién decide. No respondas vos las preguntas de diseño. *(2.4)*
- **Al empezar, chequeá el estado** (`figma_get_status` con `probe: true`) y confirmá el nombre del archivo antes de cualquier cambio.
- **Leé antes de tocar:** recorré el árbol de la página (nombres, tipos, Auto Layout, propiedades, referencias) y sacá una captura. Los IDs de nodos cambian entre sesiones: no reutilices IDs de otra conversación.
- **Con `documentAccess: dynamic-page`** usá las versiones async: `getNodeByIdAsync`, `getMainComponentAsync`, `getLocalVariablesAsync`, `setTextStyleIdAsync`.
- **Para variables, usá `setBoundVariableForPaint`** en rellenos y trazos y `setBoundVariable` en padding, gap y radios (las cuatro esquinas por separado).
- **Plan Starter:** 1 modo por colección (el dark mode va en código o en una colección aparte). "Ready for dev" funciona. Las anotaciones nativas se guardan y el MCP las lee, pero no se ven sin Dev Mode: duplicalas como notas visibles (ver sección 6).
- **Si el MCP pierde la conexión** ("Cannot connect to Figma Desktop"), probá `figma_reconnect` una vez; si sigue, pedile a Jonathan que reabra el plugin (Plugins → Development → Figma Desktop Bridge) en el archivo correcto. No reintentes en loop.
- **Después de cada cambio visual: captura y revisión** (alineación, espaciado, proporciones). Si algo falla a mitad de camino, borrá lo que quedó a medias antes de reintentar.
- **`setProperties` sobre una instancia no avisa si la propiedad no está conectada en esa variante:** devuelve OK y la instancia sigue con el texto de muestra. Por eso la captura después de armar es obligatoria: así aparecieron los bugs de conexión de la 2.5. *(2.5)*
- **Al terminar, corré una auditoría** sobre los component sets y las Sections que tocaste, y no des el trabajo por cerrado si encuentra algo. Las únicas excepciones válidas son las que figuran en la descripción del componente:

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

- **Contale a Jonathan qué cambiaste y por qué**, en lenguaje simple, y nombrá las reglas de esta skill que aplicaste.

---

## Cómo crece esta skill

Al cerrar cada clase del módulo 2 (y cuando se trabaje en Figma después), el tutor suma las reglas nuevas con su **por qué** y la clase de origen. Si una regla nueva contradice otra, se actualiza la existente en lugar de duplicarla.
