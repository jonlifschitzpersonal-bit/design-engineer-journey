# Progreso

> Marcá `[x]` cuando una clase esté terminada (incluida la práctica).
> El tutor lee este archivo al empezar cada sesión.

**Clase actual:** P.1
**Pendiente de la 2.4:** comentarios de Figma → backlog (se retoma cuando haya comentarios reales) y probar una vez el MCP oficial (opcional)
**Pendiente de la 2.6 (Figma):** activar números tabulares en el text style `heading/metric` y crear `color/action/secondary/bg-pressed` para el estado al apretar del Button
**Sección Resumen publicada:** https://design-engineer-journey-00-seccion.vercel.app/
**Pausada:** 1.3 (Flexbox): material listo en `clases/01-css/1.3-flexbox/`, se retoma después del módulo 8
**URL publicada:** https://design-engineer-journey-00-setup.vercel.app/
**Repo:** https://github.com/jonlifschitzpersonal-bit/design-engineer-journey.git

---

## Checklist

### Módulo 0 — Setup

- [x] 0.1 Terminal y Git
- [x] 0.2 GitHub + Vercel + IA como tutor

### Módulo 2 — Figma AI-ready y primer flujo con agente

- [x] 2.1 Estructura, nombres, componentes y variantes
- [x] 2.2 Auto Layout + variables y tokens
- [x] 2.3 Estados, responsive, a11y, anotaciones
- [x] 2.4 IA en Figma + Figma Console MCP
- [x] 2.5 Mini-proyecto: sección AI-ready en Figma
- [x] 2.6 Implementar con MCP + QA visual

### Módulo P — Puente: leer React lo justo

- [ ] P.1 Componentes, props y JSX
- [ ] P.2 Leer Tailwind y un diff de React

### Módulo 5 — Repo real con agente

- [ ] 5.1 Next.js + Tailwind
- [ ] 5.2 Tailwind desde tokens
- [ ] 5.3 Preparar el repo para el agente
- [ ] 5.4 Git en equipo
- [ ] 5.5 Trabajar por slices
- [ ] 5.6 Revisar implementaciones
- [ ] 5.7 Dashboard: Figma + slice 1
- [ ] 5.8 Dashboard: slice 2 + deploy

### Módulo 6 — Design system agéntico

- [ ] 6.1 Tokens Figma ↔ código
- [ ] 6.2 Componentes con variantes
- [ ] 6.3 Accesibilidad de componentes
- [ ] 6.4 Storybook
- [ ] 6.5 Dark mode y modos
- [ ] 6.6 Docs para agentes
- [ ] 6.7 Code Connect / mapeo documentado
- [ ] 6.8 Skills y reglas
- [ ] 6.9 StorySync (opcional)
- [ ] 6.10 Prueba final del sistema
- [ ] 6.11 Contratos de componentes (opcional)

### Módulo 8 — QA y verificación

- [ ] 8.1 Ledger de verificación
- [ ] 8.2 Lint, typecheck, build
- [ ] 8.3 Accesibilidad en runtime
- [ ] 8.4 Datos remotos, tablas, filtros
- [ ] 8.5 Responsive, contenido extremo, performance
- [ ] 8.6 Dashboard: slices finales

### Módulo 1 — CSS para juzgar y pulir (1.3–1.8 después del módulo 8)

- [x] 1.1 Cascada, especificidad, herencia
- [x] 1.2 Box model y unidades
- [ ] 1.3 Flexbox = Auto Layout
- [ ] 1.4 Grid
- [ ] 1.5 Posicionamiento y stacking
- [ ] 1.6 Responsive fluido
- [ ] 1.7 Tokens y tipografía web
- [ ] 1.8 DevTools para QA visual

### Módulo 3 — Lógica y JavaScript para leer código

- [ ] 3.1 Pensar en pasos
- [ ] 3.2 Variables, condicionales, funciones
- [ ] 3.3 Bucles, arrays y objetos
- [ ] 3.4 map / filter / find
- [ ] 3.5 DOM y eventos
- [ ] 3.6 Estado: tabs y modal
- [ ] 3.7 Datos remotos
- [ ] 3.8 Leer código ajeno

### Módulo 4 — React y TypeScript

- [ ] 4.1 Componentes y JSX
- [ ] 4.2 Props y variantes
- [ ] 4.3 Estado y eventos
- [ ] 4.4 Listas, condicionales, estados de UI
- [ ] 4.5 Efectos y datos
- [ ] 4.6 Composición
- [ ] 4.7 TypeScript para props
- [ ] 4.8 Arquitectura y leer un diff

### Módulo 7 — Motion y craft

- [ ] 7.1 Principios de animación
- [ ] 7.2 Transitions, keyframes, performance
- [ ] 7.3 Motion: variants, springs, AnimatePresence
- [ ] 7.4 Layout animations, gestos, reduced motion
- [ ] 7.5 Motion como tokens
- [ ] 7.6 Craft lab

### Módulo 9 — Portfolio y búsqueda

- [ ] 9.1 Narrativa del portfolio
- [ ] 9.2 Portfolio en Next.js
- [ ] 9.3 Case studies en inglés
- [ ] 9.4 Live coding
- [ ] 9.5 Take-home simulado
- [ ] 9.6 Explicar decisiones en inglés
- [ ] 9.7 Entrevista en inglés
- [ ] 9.8 CV, LinkedIn, aplicar

---

## Bitácora

### 2026-10-29 · Clase 2.6 — De Figma a código: implementar, verificar y publicar
- **Aprendí:** el ciclo completo de un slice: leer Figma por el MCP → plan → aprobación → código → verificación con evidencia → deploy. Todo lo del módulo 2 tuvo un destino en el código: nombres de capa → clases, variables → `tokens.css`, wrap + min width → grilla `auto-fill`, anotaciones → `h2`/`h3` y textos para el lector. El QA se hace midiendo en el navegador y comparando con Figma a la misma escala, y se registra en un ledger (PASS / FAIL / UNVERIFIED / OUT OF SCOPE).
- **Hice:** pedí el plan y aprobé un control de demo para ver los estados sin datos reales. Publiqué la sección en Vercel.
- **Me costó / sorpresa:** que las decisiones técnicas me las preguntara; quedó acordado que Claude decide lo técnico y me pregunta solo lo de producto. Detalles que solo aparecen midiendo: en Figma el borde de la card suma al alto y el del botón no; las flechas del `Icon` son `move-*` en Lucide; los números tabulares de la anotación no están en el text style. Y en producción apareció un 404 del favicon que en local no salía.
- **Sumado a las skills:** cómo traducir un stroke de Figma según si suma al layout, trazo de 1,5px reales en íconos, estados con capas que se muestran por `data-state`, control de demo marcado y oculto sin JavaScript, QA midiendo en el navegador y repetido en producción; en Figma, decidir a propósito si el stroke suma al layout, tabulares en el text style y equivalencias de íconos por geometría.

### 2026-10-29 · Clase 2.5 — Mini-proyecto: sección AI-ready
- **Aprendí:** una sección no es un componente: es un frame en `05 - Screens` armado con instancias, con un brief antes de dibujar (problema, usuario, contenido real, fuera de alcance). Las instancias se nombran por su dato (`activeUsers`, `revenue`). Se dibuja mobile porque cambia el orden del header; la tablet se anota porque la grilla la resuelve sola. Estados propios de la sección: `loading` y `partial-error` (falla una métrica, no todo).
- **Hice:** dirigí la sección "Resumen" con el brief de ejemplo. Decidí: "Exportar" deshabilitado mientras carga, 4 íconos nuevos de Lucide y dejar afuera las métricas donde bajar es bueno. Claude armó los 4 frames, las anotaciones y los tokens que faltaban (`space/6`, `space/8`, `heading/section`), y la Section quedó *ready for dev*.
- **Me costó / sorpresa:** al usar los componentes de verdad aparecieron bugs de la 2.1 y la 2.3 que en pantalla no se veían: 18 variantes del Button y 3 de la MetricCard tenían las propiedades sin conectar. La auditoría de antes no los detectaba; ahora compara cada variante con la default.
- **Sumado a las skills:** secciones como frames y como slices en código, instancias nombradas por su dato, grilla con wrap → `grid auto-fill`, brief antes de dibujar, estados de sección, anotaciones sobre el nodo exacto, íconos de Lucide, revisar conexiones en todas las variantes y auditoría ampliada.

### 2026-10-29 · Clase 2.4 — IA en Figma + Figma Console MCP
- **Aprendí:** el MCP le da a Claude la estructura del archivo (capas, propiedades, tokens, anotaciones), no una imagen ni código. Con el Button se vio el resultado de las clases anteriores: Claude recibe los estados ya traducidos a CSS y solo las diferencias de cada variante, en tokens. Para pedir cambios en Figma: inspeccionar → proponer → decisiones pendientes → aprobación → recién ahí tocar. Separar evidencia, decisión aprobada y suposición.
- **Hice:** dirigí la creación del `StatusBadge`. Claude propuso el plan y yo decidí las tres cosas de producto: `paused` en gris, texto fijo por estado y punto decorativo.
- **Me costó:** escribir el pedido con un resultado observable (lo pedí en tres palabras). No sabía qué dudas dejar como comentarios; lo de comentarios → backlog quedó pendiente.
- **Sumado a las skills:** flujo de propuesta antes de tocar Figma, comentarios → backlog, texto fijo por estado (en Figma y en código), crear text styles en lugar de forzar tamaños, leer component sets con `figma_analyze_component_set`.

### 2026-10-29 · Clase 2.3 — Estados, responsive, accesibilidad y anotaciones
- **Aprendí:** los estados se eligen por lo que el componente hace, no de una lista: la MetricCard necesita `loading` (skeleton del mismo tamaño), `error`, `neutral` y `showTrend`, pero no `hover`. No se crean combinaciones que no existen (5, no 9). Responsive que no se dibuja, se anota. Contraste medido de verdad: todos los tokens pasan; un borde bajo solo vale si es decorativo (un input necesita 3:1). Las anotaciones dicen qué tiene que pasar, no cómo programarlo.
- **Me costó:** no veía las anotaciones: en Starter las nativas solo se muestran en Dev Mode. Ahora van dos veces: nativas (para Claude) y como notas visibles en un frame `annotations`.
- **Nueva skill:** `figma-ai-ready`, con todas las buenas prácticas de Figma de la 2.1 a la 2.3 y el flujo de trabajo con el MCP (incluida una auditoría al terminar). Crece con cada clase, igual que la de código.
- **Sumado a la skill de código:** leer anotaciones antes de implementar, skeleton del mismo tamaño que el contenido, contraste de bordes de inputs, tendencias anunciadas como texto, variantes "de relleno" que no se implementan.

### 2026-10-29 · Clase 2.2 — Auto Layout con intención + variables y tokens
- **Aprendí:** tokens en tres niveles: primitivo (cómo se ve, `blue/200`), semántico (para qué sirve, `color/action/primary/bg`) y componente (solo si hace falta). Los componentes usan semánticos; los primitivos van sin scopes para no aparecer en el selector. Mismo color no significa mismo token: `blue/200` es fondo primario y borde secundario, dos decisiones. Al tokenizar aparecen duplicados que nadie decidió (`#EEF6FF` y `#EAF4FF` → `blue/50`). Auto Layout con intención: el ancho fijo de la card es de muestra; lo que importa es su min width (240).
- **Me costó:** nada en particular; pedí que Claude hiciera la carga por el MCP (22 primitivos, 16 semánticos, 4 text styles, todo aplicado y auditado sin valores sueltos).
- **Verificado:** Figma Starter permite 1 modo por colección, así que el dark mode se resuelve en código (6.5).
- **Sumado a la skill:** traducción de nombres de variables a código, no fusionar semánticos con igual valor, text styles como utilidades, dark mode en código, min width en lugar del ancho de muestra.

### 2026-10-29 · Clase 2.1 — Estructura, nombres, componentes y variantes
- **Aprendí:** el agente lee el árbol de capas, no la imagen: los nombres de capa y las propiedades pasan casi directo al código (`MetricCard` → `<MetricCard>`, Variant → unión de strings, Instance swap → prop con un elemento). Las variantes se multiplican (3 × 2 × 4 = 24 en el Button), los booleanos no. `hover` y `focus` existen en Figma para dibujarlos, pero en código son `:hover` y `:focus-visible`.
- **Me costó:** detalles de construcción que en pantalla no se ven: el texto `label` tenía la propiedad creada pero no conectada, el Icon tenía un frame de más y trazos llamados `Vector`, y el `secondary` usaba texto celeste sobre blanco (contraste ~1,6:1). Claude terminó el Button (estados + `loading`), corrigió el Icon (16×16, capas `path`) y armó la MetricCard con `trend: up | down`.
- **Sumado a la skill:** traducción de cada tipo de propiedad de Figma, nombres de capa = nombres del código, leer la descripción del componente, variantes con significado en lugar de props de estilo, íconos con `currentColor`, no crear componentes para piezas de una sola vez.

### 2026-10-29 · Cambio de orden del curso
- **Decidí:** pasar primero al flujo Figma → código (módulos 2, P, 5, 6 y 8) y volver después a CSS, JavaScript y React en detalle. Claude escribe el código siguiendo la skill de buenas prácticas, que ampliamos con reglas de HTML, CSS, React y Tailwind.
- **Herramientas:** el MCP oficial de Figma en plan Starter da 6 llamadas por mes, así que usamos Figma Console MCP (gratis). Code Connect se reemplaza por un mapeo documentado.

### 2026-10-28 · Clase 1.2 — Box model y unidades
- **Aprendí:** `content-box` suma padding y border por fuera (caja de 200px → 250px); `border-box` los resta desde adentro (contenido de 150px). Los márgenes verticales se colapsan (20 + 30 = 30). `rem` mira la raíz y `em` mira al padre, por eso se acumula (hijo em = 36px, hijo rem = 24px).
- **Me costó:** em vs rem; lo entendí con el diagrama de cajas anidadas y verificándolo en DevTools (Computed). El colapso de márgenes (había respondido 50px).
- **Sumado a la skill:** reset `border-box`, `rem` para texto y espaciado, `gap` en lugar de márgenes.

### 2026-10-28 · Clase 1.1 — Cascada, especificidad y herencia
- **Aprendí:** gana `!important`, después la especificidad (medallero: IDs 🥇, clases 🥈, elementos 🥉) y después el orden. La herencia es lo más débil: los controles de formulario no heredan porque el navegador ya les pone estilos propios.
- **Me costó:** las dos trampas (`.card p` le gana a `.highlight`; el botón no hereda el violeta ni Georgia). Se entendió con la analogía del medallero olímpico y viendo las reglas tachadas en DevTools.
- **Sumado a la skill:** estilar con clases, sin IDs ni `!important`; reset `font: inherit` en controles.

### 2026-10-28 · Clase 0.2 — Deploy en Vercel
- **Aprendí:** deploy continuo (cada `git push` publica solo); el *Root Directory* le dice a Vercel dónde está el `index.html`.
- **Publicado:** https://design-engineer-journey-00-setup.vercel.app/

### 2026-10-28 · Clase 0.1 — Terminal y Git
- **Aprendí:** comandos básicos de terminal (PowerShell); el ciclo `git add → commit → push`; untracked vs staged; conectar el repo local con GitHub.
- **Me costó:** los warnings de LF/CRLF (son avisos de saltos de línea entre Windows y Mac/Linux, no errores).


<!-- Después de cada clase, agregá una entrada arriba de todo:

### AAAA-MM-DD · Clase X.Y
- **Aprendí:**
- **Me costó:**
- **Dudas para la próxima:**
-->
