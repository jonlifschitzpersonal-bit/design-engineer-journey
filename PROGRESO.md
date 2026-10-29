# Progreso

> Marcá `[x]` cuando una clase esté terminada (incluida la práctica).
> El tutor lee este archivo al empezar cada sesión.

**Clase actual:** 5.2
**Pendiente de la 2.4:** comentarios de Figma → backlog (se retoma cuando haya comentarios reales) y probar una vez el MCP oficial (opcional)
**Pendiente de la 2.6 (Figma):** activar números tabulares en el text style `heading/metric` y crear `color/action/secondary/bg-pressed` para el estado al apretar del Button
**Dashboard:** `D:\Escritorio\proyectos\dashboard-ai-visibility` (repo: https://github.com/jonlifschitzpersonal-bit/dashboard-ai-visibility)
**Para las skills (5.5 y 6.8):** sumar el proceso de trabajo con el agente (plan → aprobación → código → diff → ledger). Hoy está solo en `PLAN-DE-ESTUDIO.md` §4 ("Review de cada slice"), así que en otro proyecto no se conoce.
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

- [x] P.1 Componentes, props y JSX
- [x] P.2 Leer Tailwind y un diff de React

### Módulos 5 y 6 — Repo real + design system agéntico (intercalados, en este orden)

- [x] 5.1 Next.js + Tailwind
- [ ] 5.2 Tailwind desde tokens
- [ ] 5.3 Preparar el repo para el agente
- [ ] 5.4 Git en equipo
- [ ] 5.5 Trabajar por slices
- [ ] 5.6 Revisar implementaciones
- [ ] 6.1 Tokens Figma ↔ código
- [ ] 6.2 Componentes con variantes
- [ ] 6.3 Accesibilidad de componentes
- [ ] 6.4 Storybook
- [ ] 5.7 Dashboard: Figma + slice 1
- [ ] 5.8 Dashboard: slice 2 + deploy
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

### 2026-10-29 · Clase 5.1 — Next.js + Tailwind
- **Aprendí:** Next.js es el marco que convierte componentes de React en una web: páginas, URLs, servidor local y armado para publicar. En `app/`, cada carpeta con un `page.tsx` es una URL; `layout.tsx` envuelve a todas las páginas con `{children}` (como un slot) y ahí va lo que se repite; `globals.css` tiene `@import "tailwindcss"` y el bloque `@theme`, donde cada variable se vuelve clases. El proyecto tiene tres zonas: lo que se toca (`app/`, `public/`, después `components/`), lo que se lee (`package.json`, `AGENTS.md`) y lo que no se toca (`node_modules/`, `.next/`, lockfile, configuraciones). `AGENTS.md` lo escribe Next.js para avisarle al agente que su versión cambió.
- **Hice:** creé el proyecto con `create-next-app@16.4.3`, lo levanté con `npm run dev` y cambié el `<h1>` de `page.tsx` a "Dashboard AI visibility" viendo cómo se actualiza solo. Verificado: `npm run lint` sin errores y `npm run build` arma la página.
- **Me costó / sorpresa:** dos problemas del entorno antes de empezar: un npm 6 viejo que le ganaba al de Node y rompía la instalación (se actualizó a 11.19.1), y PowerShell bloqueando `npx.ps1` (se habilitó con `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`). La plantilla de bienvenida usa colores de Tailwind y hex sueltos: las mismas señales de alarma de la P.2.
- **Decidido:** el dashboard sale del repo del curso a su propia carpeta y su propio repo público (`D:\Escritorio\proyectos\dashboard-ai-visibility`): portfolio limpio, y en la 5.4 los PRs e issues son solo del proyecto. `proyectos/` del curso queda para los ejercicios. Las skills todavía no tienen el proceso con el agente: se suma en la 5.5 y la 6.8.
- **Sumado a las skills:** cómo generar un proyecto (versión fija, sin Git propio dentro de otro repo, la plantilla se reemplaza, `lang`/metadata/fuente, `lint` + `build` antes de darlo por creado), dónde va cada cosa en el App Router, archivos generados que no se editan, y cambios en configuración sin motivo como señal de alarma en un diff. En `CLAUDE.md`: el proyecto y el entorno de Windows.
- **Para la 5.2:** vaciar `page.tsx` y `globals.css` de la plantilla, cargar los tokens de Figma en `@theme` (solo los colores del sistema), cambiar Geist por Inter y `lang="en"` por `es`. Sigue pendiente decidir si las clases de color quedan con palabras repetidas (`text-text-muted`).

### 2026-10-29 · Clase P.2 — Leer Tailwind y un diff de React
- **Aprendí:** Tailwind trae clases ya hechas que hacen una sola cosa cada una (`p-5` = padding 20) y se combinan directo en el elemento, en lugar de inventar un nombre y escribir su CSS en otro archivo. Se leen como el panel de Figma: `flex flex-col gap-3 p-5` = Auto Layout vertical, espaciado 12, padding 20. La escala es N × 4px, la misma que `space/N`. Los prefijos dicen cuándo: `hover:`, `disabled:`, y `sm:` = desde 640 (sin prefijo es mobile). Los corchetes son valores sueltos: válidos solo si no hay token y está explicado. Un diff muestra lo borrado (rojo) y lo agregado (verde); las líneas rojas también son cambios.
- **Hice:** vi la sección Resumen en Tailwind (compilada, igual a la 2.6) y la revisión resuelta de un cambio de un agente: 1 PASS y 7 FAIL (color suelto con 2,28:1 de contraste, `<article onClick>` en lugar de `<a href>`, hover inventado, texto para lector borrado). Veredicto: pedir cambios.
- **Me costó:** qué es Tailwind. Se entendió comparándolo con la 2.6 (nombre + CSS en otro archivo) y con el panel de propiedades de Figma.
- **Decidido:** desde el módulo 5, los proyectos de este repo son Next.js + Tailwind (anotado en `CLAUDE.md`). La skill no obliga a usar Tailwind porque es reutilizable: lee el stack de cada proyecto.
- **Sumado a las skills:** reglas de Tailwind (corchetes con comentario, tema solo con los colores del sistema, text styles como `--text-*`, escala N × 4, prefijos = estados y mobile first, `*:size-5` para hijos por prop) y una sección nueva para revisar diffs.
- **Para la 5.2:** con los nombres de Figma, las clases de color repiten palabras (`text-text-muted`, `bg-bg-surface`). Decidir si queda así.

### 2026-10-29 · Clase P.1 — Componentes, props y JSX
- **Aprendí:** un componente de React es una función que recibe props y devuelve interfaz: el componente principal de Figma se escribe una vez y cada instancia es `<MetricCard title="…" />` con sus overrides. Las props tienen los mismos nombres, valores y defaults que las propiedades de Figma. JSX se lee como HTML con llaves para los datos (`{title}`), `className` en lugar de `class` y mayúscula para los componentes propios. Los estados están en las condiciones (`if … return`, `? :`, `&&`), y en React lo que no va no se dibuja. Receta para leer cualquier componente: firma → reglas de arriba → condiciones → `return`.
- **Hice:** leí la sección Resumen pasada a React (`Icon`, `MetricCard`, `StatusBadge`, `Button`, `Summary`). Los componentes se ejecutaron y generan el mismo HTML que la 2.6 (`vista-previa.html`).
- **Me costó:** el JSX del StatusBadge; se entendió viendo qué entra (`status="paused"`) y qué sale (el HTML con "Pausado"). Pedí que cada clase se explique antes de preparar nada, y que no haya ejercicios para responder: el Button quedó como ejemplo resuelto.
- **Verificado:** el ícono de la card salía de 16px (tamaño base del `Icon`) en lugar de 20: como llega por prop, lo dimensiona la card.
- **Sumado a las skills:** Boolean + Instance swap → una sola prop opcional, Text principal → `children`, el componente que recibe un ícono por prop le pone el tamaño. En `CLAUDE.md`: explicar la clase antes de hacer nada y sin ejercicios para responder.

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
