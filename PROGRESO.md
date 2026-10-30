# Progreso

> Marcá `[x]` cuando una clase esté terminada (incluida la práctica).
> El tutor lee este archivo al empezar cada sesión.

**Clase actual:** 6.3
**Pausada:** 1.3 (Flexbox): material listo en `clases/01-css/1.3-flexbox/`, se retoma después del módulo 8

### Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Repo del curso | https://github.com/jonlifschitzpersonal-bit/design-engineer-journey |
| Dashboard de Gurises Unidos (proyecto ancla 1, y los componentes del sistema) | `D:\Escritorio\proyectos\gurises-unidos-dashboard` · https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard · sin publicar todavía (deploy en la 5.8) |
| Backlog del dashboard | https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues (el orden, en su `docs/PENDING_TASKS.md`) |
| Explicación del dashboard (qué es, por qué, cada archivo) | [`DASHBOARD-GURISES-UNIDOS.md`](DASHBOARD-GURISES-UNIDOS.md) |
| Sección Resumen (2.6) | https://design-engineer-journey-00-seccion.vercel.app/ |
| Setup (0.2) | https://design-engineer-journey-00-setup.vercel.app/ |

### Pendientes

| Cuándo | Qué |
|---|---|
| **6.8** | Sumar a las skills los roles del agente (Plan Reviewer, Slice Closer…). El proceso de slices ya está en `design-implementation` §18 y en el `CLAUDE.md` del dashboard (5.5). |
| **Práctica de la 6.2** | Decidir en Figma el issue #36 del dashboard (`Button`: contraste entre variantes, hover sobre superficies celestes, 44px en formularios mobile) y el #38 (`MetricCard`: base de comparación visible, ícono de "sin cambios", formato del %, textos de error y de sin dato, dónde va "Reintentar", títulos largos). |
| **6.3** | Issue #37 del dashboard: alto contraste de Windows, anuncio del fin de la carga del `Button`, teclado mientras carga. Probar con un lector de pantalla real (NVDA) lo que quedó UNVERIFIED en la 6.2. |
| **6.4** | La referencia de tokens pasa a Storybook y `/tokens` queda solo para desarrollo (issue #35). Bloquea el primer deploy (5.8). |
| **6.6** | Notas de uso para los tokens y text styles que no las tienen (issue #34), con el caso de los íconos. |
| **5.9** | Configurar `live` de Impeccable al usarlo por primera vez (inyecta un script en la app; no se hizo en la 5.6 a propósito). |
| **Impeccable (de la 5.6)** | UNVERIFIED: la pasada completa del hook al final de cada turno (la de cada edición sí se vio funcionar). Confirmarla la primera vez que aparezca. |
| **Figma (de la 2.6)** | Activar números tabulares en el text style `heading/metric` (issue #5). |
| **Backlog (de la 2.4)** | Comentarios de Figma → issues cuando haya comentarios reales (el flujo quedó listo en la 5.4: plantilla *Task* con *Source* y ejemplo resuelto en su README). Probar una vez el MCP oficial (opcional). |

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
- [x] 5.2 Tailwind desde tokens
- [x] 5.3 Preparar el repo para el agente
- [x] 5.4 Git en equipo
- [x] 5.5 Trabajar por slices
- [x] 5.6 Revisar implementaciones
- [x] 6.1 Tokens Figma ↔ código
- [x] 6.2 Componentes con variantes
- [ ] 6.3 Accesibilidad de componentes
- [ ] 6.4 Storybook
- [ ] 5.7 Dashboard: Figma + slice 1
- [ ] 5.8 Dashboard: slice 2 + deploy
- [ ] 5.9 Diseñar en código: pantalla sin Figma
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

### 2026-10-30 · Clase 6.2 — Componentes con variantes
- **Aprendí:**
  - La API de un componente en código es la de Figma: cada propiedad es una prop con el mismo nombre y los mismos valores. El `state` no es prop: hover, foco y apretado los maneja el navegador, y `disabled` es el atributo nativo.
  - `cva` es el component set escrito en código: una base y lo que cambia en cada variante. shadcn/ui sirve de modelo para la forma, no como dependencia, porque trae su propio diseño.
  - `tailwind-merge` no conoce los text styles propios: hay que contárselos, o borra `text-label-md` al lado de un color.
  - Un booleano de Figma que solo existe para mostrar algo (`showTrend`) en código puede desaparecer: si pasás la tendencia, se ve. TypeScript no deja pasar la mitad.
  - `extract` de Impeccable: se extrae lo que se repite con la misma intención, no lo que se parece.
- **Decidí (producto):** delegué todo en Claude, incluido el color del estado apretado, que era mi práctica.
- **Claude hizo:**
  - Slice 1 (#14, `b6e2f93`): dos tokens de apretado en Figma, uno para el primary (`blue/400`) y otro para secondary y ghost (`blue/100`), siguiendo cómo ya se agrupaba el hover. Primer cambio que recorrió el pipeline de la 6.1.
  - Slice 2 (`31e3e38`): `Icon` (los 12 íconos de Figma con `lucide-react`), `Button` con `cva`, `cn()` y el ADR 0008. Los íconos del aviso pasaron a `<Icon>`.
  - Slice 3 (`ddd43bf`): `StatusBadge` y `MetricCard`. En Figma, el título de muestra de la card pasó a "Familias alcanzadas".
  - `critique` (dos revisiones separadas) y `audit` en cada slice: lo técnico se corrigió y lo de diseño quedó en los issues #36 y #38, para mí. Lo de accesibilidad que falta va al #37 (6.3).
- **Sorpresa:**
  - `visibility: hidden` también esconde el texto al lector de pantalla: el botón cargando se quedaba sin nombre.
  - Envolver el `onClick` obligaba a que el botón fuera de cliente.
  - La card en carga no tenía nombre: el lector decía "Cargando, Cargando, Cargando".
  - Una pestaña del navegador quedó recargando sola por un script de la revisión; ahora la revisión no inyecta nada.
- **Verificado:**
  - En Chrome, con páginas temporales (borradas): `Button` 110×40 y 96×32, colores y estados por variante, foco con teclado, ancho fijo al cargar; `MetricCard` 194px en los tres estados y 162 sin tendencia; badges de 24px; todos los colores son tokens; sin desborde a 320.
  - `critique` del `Button` 23/32 y de la `MetricCard` 18/28 (antes de las correcciones); `audit` 17/20 en los dos.
  - UNVERIFIED: lector de pantalla real y modo de alto contraste (#37, 6.3).

### 2026-10-30 · Clase 6.1 — Tokens de Figma a código
- **Aprendí:** los tokens no se copian, se generan. Figma es la única fuente.
  - El agente exporta las variables por MCP a un JSON en formato **DTCG** (el estándar del W3C), y **Style Dictionary** lo compila a CSS para Tailwind.
  - El build controla el mapeo 1 a 1 y frena si se rompe: nombre igual al *code syntax*, semántico como alias de un primitivo, `space/N` = N × 4px, grupo desconocido. El lint falla si alguien edita a mano lo generado.
  - No es una sincronización: el código se entera de un cambio solo cuando alguien exporta. Con Starter no se puede hacer desde CI, porque la API de variables es de Enterprise.
  - Para probar que un cambio "no se ve", se compara el CSS compilado antes y después: compara cada valor, no solo una captura.
  - La nota de uso de un token va en su descripción en Figma: la lee el MCP y baja sola a la página de referencia.
- **Decidí (producto):**
  - Las 13 notas de uso de los tokens que comparten valor y de `text-disabled`.
  - `/tokens` no va en la demo pública; para el portfolio, la referencia de tokens va a Storybook (#35).
  - No hice la práctica de `bg-pressed`: queda para la 6.2, con el `Button` (#14).
- **Claude hizo:**
  - Slice 1 (#33, `0840fd0`): el pipeline Figma → `tokens/figma/` → `npm run tokens` → `app/tokens.css`, con 6 controles, el ADR 0007 y el paso a paso en el `CLAUDE.md` del dashboard.
  - Slice 2 (#31, `6ea00af`): `/tokens` generada, con valor, primitivo, nota de uso, grupos y navegación.
  - Las notas, escritas en Figma.
  - `critique` (con dos revisiones separadas) y `audit`. El hallazgo que no era técnico quedó como issue (#34).
- **Sorpresa:**
  - Tailwind generó una clase `.transform` porque leyó esa palabra en el script. Lo mostró la comparación del CSS.
  - El export guarda la hora en cada token y ensuciaba el diff.
  - La revisión encontró que las muestras de `/tokens` usaban colores de acción, justo lo que sus propias notas prohíben.
  - Me escribió en inglés varias veces; quedó en la memoria que todo va en castellano.
- **Verificado:**
  - CSS compilado con las mismas declaraciones antes y después.
  - Cada control roto a propósito frena el build.
  - Reexportar sin cambios no genera diff.
  - En Chrome, los 42 tokens coinciden con su muestra; sin scroll a 320 ni con texto al 200%; contraste mínimo de 7,56:1.
  - `critique` 21/28 (antes 16/28), `audit` 17/20, `doctor` sin desfasajes.
  - UNVERIFIED: una mirada mía a `/tokens`. El navegador no dejó sacar capturas.
- **Sumado a las skills:**
  - En `design-implementation`: generar los tokens desde un export (DTCG + Style Dictionary), con los controles del build y del lint; sacar la hora del export; decir "mapeo", no "sincronización"; comparar el CSS compilado; las notas de uso en la herramienta de diseño, respetadas por la página de referencia; Tailwind lee todo el repo (`@source not`); las clases generadas se escriben enteras.
  - En `figma-ai-ready`: el *code syntax* como control del build; la descripción de la variable es su nota de uso; los text styles necesitan su propio export.

### 2026-10-30 · Clase 5.6 — Revisar implementaciones
- **Aprendí:** una implementación se revisa con tres preguntas.
  1. ¿Es igual a Figma? Lo responde el ledger.
  2. ¿El código es confiable? Lo responden las 10 señales de la guía §16, que se ven en un diff sin leer toda la sintaxis: valores sin token, duplicados, `<div>` que hace de botón, estados inventados, `PASS` sin prueba, checks apagados…
  3. ¿El diseño está bien? Lo responde una revisión de diseño (Impeccable).

  Cada señal termina en "no aparece", "aparece justificada" o "aparece sin justificar". Un nombre que asusta (`dangerouslySetInnerHTML`) no es una señal: importa qué entra. La evidencia de una fila del ledger tiene que probar su título, no algo parecido. El ledger prueba que se construyó bien; la revisión de diseño, que se construyó lo correcto.
- **Hice:** revisé el PR #24 con las 10 señales: aprobable, con una fila del ledger que prometía más que su evidencia. Vi el mismo aviso hecho mal, con 7 señales.
- **Decidí (producto):**
  - Voseo uruguayo, sin marca por ahora y herramienta interna.
  - "The Honest Count" como idea guía y "sereno y preciso" como carácter.
  - Para el aviso: marca fija "Datos ficticios" en la barra superior (#30), el texto nuevo que dice que lo que se carga no se guarda, y un borde con un token nuevo.
  - En `/tokens`, lo mínimo ahora y el resto en la 6.1 (#31).
  - Pedí un PR por clase en lugar de uno por cosa y, al cerrar, dejar los PRs: Claude pushea directo a `main` cada slice cerrado, con el ledger en el commit.
- **Claude hizo:**
  - Puso a punto Impeccable en el dashboard: `PRODUCT.md`, `DESIGN.md` desde Figma y `globals.css`, y el hook (PR #28, mergeado).
  - Corrió `critique` con dos revisiones separadas (aviso 17/28, `/tokens` 16/28) y `audit` (16/20). También `polish`, `harden` y `clarify` sobre el aviso.
  - En Figma: el token `color/border/accent`, el borde, el texto y las anotaciones.
  - En el código: el aviso como región "Aviso de datos ficticios" y `/tokens` en español. Todo en el PR de la clase, el #32: lo mergeé y el #29 se cerró solo. Fue el último PR.
  - Sacó la regla de PR obligatorio del ruleset de `main` (quedan sin force push y sin borrado) y pasó el flujo nuevo al `CLAUDE.md` y al README del dashboard. El primer push directo fue `d5ba238`.
- **Sorpresa:** el hook estaba "activado" y no avisaba nada. Ignora los archivos fuera de la carpeta de la sesión, y abrimos las sesiones desde el curso. Se arregló con un puente en `.claude/` del curso, que aprobé, y se probó con un error puesto a propósito. También:
  - El detector no encontró nada en el aviso: todo lo valioso salió de la revisión de diseño.
  - Claude se había olvidado `space/0-5` en `DESIGN.md`.
  - El texto de muestra de `/tokens` y de la `MetricCard` en Figma venía de otro proyecto.
- **Verificado:** el aviso a 1280 (41px) y a 320 (3 líneas, 81px) contra Figma, teclado, foco, árbol de accesibilidad y consola. `doctor` sin desfasajes. UNVERIFIED: la pasada del hook al final de cada turno.
- **Sumado a las skills:**
  - En `design-implementation`: las 10 señales y cómo decidir cada una; silenciar un aviso solo si es puntual, con motivo y guía oficial; "un nombre que asusta: mirá qué entra"; una clase que no existe falla en silencio; la evidencia prueba el título de la fila; el aviso como región con nombre específico (corrige la regla de la 5.5); superficies tintadas casi iguales al fondo llevan borde con token propio; la opción de un PR por sesión; y una sección nueva, §19 "Revisión de diseño, además del ledger".
  - En `figma-ai-ready`: el texto de muestra es del producto; la Section no crece sola; y cómo hacer un borde de un solo lado que mida igual que en código.

### 2026-10-30 · Clase 5.5 — Trabajar por slices
- **Aprendí:** un slice es una porción chica con un resultado observable y un "done when"; si no se puede probar ni cerrar sola, no es un slice. El flujo tiene dos controles míos: aprobar el plan y mergear el PR. Del plan me tocan el resultado, el alcance, los estados, lo ficticio y las decisiones de producto; lo técnico lo decide Claude y lo explica. Un plan se revisa buscando lo que falta (fuera de alcance, estados, supuestos). Los wireframes en ASCII sirven para decidir dónde va cada cosa antes de Figma o del código, y gastan pocos tokens.
- **Decidí (producto):** el aviso de datos ficticios (#20) va como franja arriba de todo (A, entre 3 opciones), con el texto "Demo con datos ficticios. No son cifras reales de Gurises Unidos.", y se puede cerrar con una X.
- **Hice:** elegí el wireframe y el texto, aprobé el diseño de Figma y el plan, revisé el PR #24 en *Files changed* y lo mergeé: el #20 se cerró solo.
- **Claude hizo:** en Figma, los íconos `info` y `x` y el componente `DemoNotice` (3 variantes, ejemplo a 320px, anotaciones, auditoría en 0). En el dashboard, `components/DemoNotice.tsx`, el lugar en el layout y la variante `demo-dismissed:`, con un script en línea que oculta el aviso cerrado antes de pintar (patrón de la guía de Next.js 16). Al cierre, el issue #25 y el PR #26 con el proceso de slices en el `CLAUDE.md` del dashboard y una sección nueva en la plantilla de PR; lo mergeé y el #25 se cerró solo.
- **Pregunté:** ¿cómo sabe el agente qué color o text style usar? Con Figma, lo lee del nodo; sin Figma, lo deduce del nombre, y ahí falta una guía de uso (cuándo sí y cuándo no). Los tokens de componente no lo resuelven para lo nuevo. Quedó en la 6.6 del plan, con el caso de los íconos que usan colores de texto.
- **Sorpresa:** `resize()` en Figma dejó las variantes con alto fijo y el ejemplo de mobile cortaba el texto; lo mostró la captura, no la API. Y el script cambió de lugar respecto del plan y Claude lo contó recién después: ahora el `CLAUDE.md` del dashboard y la skill piden preguntar antes si el cambio afecta el resultado y anotarlo en el PR si es menor.
- **Verificado:** 12 controles en PASS (desktop y 320px contra Figma, hover, foco, teclado, persistencia, sin `localStorage`, árbol de accesibilidad, contraste, consola). UNVERIFIED: un lector de pantalla real y ver a ojo que no aparezca un instante al recargar.
- **Sumado al plan:** Impeccable (impeccable.style) en todas las clases de UI desde la 5.6. Cada uno de sus 24 comandos, más los hooks y el detector, tiene su clase (§4). Regla: puede mejorar el sistema, no saltearlo. Lo que cambia el estilo se vuelve token, primero en Figma; lo que es producto lo propone y lo decido yo; todo cambio va como slice.
- **Sumado a las skills:** `design-implementation` §18 "Trabajar por slices" (preguntas del plan y quién decide, wireframes en ASCII, cambios al plan, cierre, frenar), avisos que se cierran (región con nombre, foco al contenido) y estado del navegador antes de hidratar. En `figma-ai-ready`: lo que va en todas las pantallas es componente, partes internas hasta el segundo uso, `resize()` vuelve Fixed el eje y frames de alineación nombrados por su función.

### 2026-10-30 · Clase 5.4 — Git en equipo
- **Aprendí:** el flujo de equipo: issue → branch `tipo/issue-tema` → commits con un motivo cada uno → PR con `Closes #N` → revisión → merge. El PR junta el diff con la evidencia (alcance, lo que queda afuera, diferencias con Figma, ledger, riesgos, cómo probar); en GitHub se revisa en *Files changed*. `Closes` cierra el issue al mergear y `Refs` solo lo menciona. Con squash merge, cada PR entra a `main` como un commit con su número. Los issues se agrupan con milestones (etapa) y labels (tipo), y cada uno tiene un "done when" que se puede comprobar.
- **Hice:** hice el login de `gh`, revisé el PR #19 (3 commits: plantillas, reglas de Git en el `CLAUDE.md` del dashboard y pendientes con links a los issues) y lo mergeé: el #1 se cerró solo y la branch se borró. Después mergeé el #21, con `Refs #20`, y el #20 siguió abierto; y el #23, que cerró el #22. El milestone `Repo workflow` quedó completo y cerrado.
- **Claude hizo:** instaló `gh` 2.103.3 desde el zip oficial (no hay `winget` en este Windows), creó 20 issues en 3 milestones con labels nuevos (`debt`, `design`, `needs decision`), protegió `main` (PR obligatorio, sin force push ni borrado, solo squash) abrió el PR #21 para anotar el #20 y, al pedir los docs completos, el PR #23 (README y `PROJECT_CONTEXT.md` apuntan al backlog; el `CLAUDE.md` del dashboard manda a leer el issue antes de empezar).
- **Sorpresa:** GitHub falló en 7 de las 18 creaciones de issues y las referencias entre issues quedaron apuntando a otros números; se corrigieron y se revisaron una por una. Y al cerrar apareció una tarea que nadie había anotado: el ADR 0005 pide avisar en la demo que los datos son ficticios (#20).
- **Decidido (técnico):** sin aprobación obligatoria en los PRs (GitHub no deja aprobar el propio); el agente no mergea, el merge es mío; `PENDING_TASKS.md` guarda el orden y los links, y el detalle queda en los issues.
- **Verificado:** el #1 cerrado por el PR #19, la branch borrada, un commit `(#19)` en `main`, las tres reglas activas sobre `main` por la API. UNVERIFIED: que un push directo a `main` se rechace (no se probó empujando) y que la plantilla de PR se cargue en la web (los PRs se abrieron desde la terminal).
- **Sumado a las skills:** sección nueva de Git, issues y pull requests (branch por issue, diff antes de cada commit, plantilla de PR, `Closes`/`Refs`, no mergear el PR propio, squash y branches locales, backlog en issues sin duplicar, verificar al crear muchas cosas por la API, protección sin aprobaciones si hay una sola persona). En Figma: comentario → issue con el link como fuente.

### 2026-10-30 · Clase 5.3 — Preparar el repo para el agente
- **Aprendí:** cada cosa va en un archivo según cuánto cambia. `CLAUDE.md` tiene las reglas estables (comandos, stack, tokens, convenciones, cómo trabajar, qué no tocar) y manda a leer el resto. `docs/PROJECT_CONTEXT.md` describe el producto, `CURRENT_STATE.md` lo hecho y verificado, y `PENDING_TASKS.md` lo que sigue. Los ADR registran una decisión por archivo, con opciones y costo; no se editan, se reemplazan. `docs/research/` guarda lo que llevó a cada decisión. Si el estado se mezcla con las reglas, el agente sigue instrucciones que ya no valen.
- **Decidí:** el dashboard pasa a ser el de **Gurises Unidos** (mi caso freelance), rehecho con el stack y el sistema del curso para que sea un producto casi real y vaya al portfolio. Carpeta y repo `gurises-unidos-dashboard`; diseño en el archivo de Figma del curso; datos ficticios con todo funcionando; las acciones con backend ("Cargar métricas", "Nuevo proyecto") se construyen completas y al confirmar no guardan nada.
- **Hice:** Claude escribió `CLAUDE.md` (con `@AGENTS.md`), los tres documentos de estado, 6 ADR y 2 notas de research, y actualizó nombre, metadata y README del proyecto.
- **Verificado:** una sesión nueva de Claude Code abierta en la carpeta del dashboard, sin contexto y en modo plan, propuso el aviso de "datos ficticios" citando el ADR 0005, solo con tokens del sistema, sin inventar texto y marcando como UNVERIFIED lo que no pudo leer de Figma.
- **Sumado a la skill:** documentación del proyecto para agentes (reglas, estado y decisiones separados, ADR que no se editan, actualizar estado al cerrar un slice) y probarla con una sesión nueva en modo plan.
- **Sumado al curso:** [`DASHBOARD-GURISES-UNIDOS.md`](DASHBOARD-GURISES-UNIDOS.md), la explicación completa del proyecto (qué es, decisiones, cada archivo del repo, cómo funciona, preguntas de entrevista con respuesta). Se actualiza al cerrar cada clase que toque el dashboard.

### 2026-10-30 · Clase 5.2 — Tailwind desde los tokens
- **Aprendí:** el `@theme` de Tailwind es el equivalente en código del panel de variables: cada token se vuelve clases. Los primitivos quedan afuera (variables comunes, sin clases) y los semánticos adentro, apuntando a ellos como los alias de Figma. Con `initial` se apaga lo que trae Tailwind: la paleta, los tamaños de texto y los radios. El prefijo de la clase (`text-`, `bg-`, `border-`) dice dónde se usa el color y no es parte del token: por eso en Figma el nombre sigue siendo `color/text/muted`.
- **Hice:** Claude leyó las variables y los text styles de Figma por el MCP, reemplazó la plantilla (Inter, `lang="es"`, metadata, sin dark mode automático, sin los SVG) y armó `/tokens`, una página con cada token y su clase. Medido en Chrome: todo igual a Figma, sin scroll horizontal a 320px y `bg-red-500` sin efecto. Commit y push en el repo del dashboard.
- **Sorpresa:** Tailwind ya trae `rounded-lg`, pero de 8px; en Figma es de 12. Si no se redefine, la clase existe con otro valor y se ve "casi bien".
- **Decidido:** las clases de color quedan con palabras repetidas (`text-text-muted`): un solo nombre de Figma a la clase vale más que lo lindo. Nombrar los tokens de Figma como clases de Tailwind duplicaría el prefijo, rompería las carpetas del panel de variables y ataría el archivo a Tailwind.
- **Evaluado:** Paper (paper.design), un editor con lienzo de HTML y CSS y MCP propio. Hoy no reemplaza a Figma: no tiene componentes con variantes, text styles, modos ni tokens compartidos entre archivos, y está en alpha. Se descarta: el curso sigue con Figma.
- **Cambio en el plan:** nueva clase 5.9, diseñar una pantalla directo en código, sin pasar por Figma (una tarea típica de design engineer). La 6.10 sigue siendo la prueba de que el agente usa el sistema sin indicaciones.
- **Sumado a la skill:** resetear los grupos de Tailwind que chocan con el sistema (radios, tamaños de texto), primitivos fuera de `@theme` y semánticos adentro, `inline` solo para lo que define el framework (la fuente), y verificar el tema midiendo en el navegador.

### 2026-10-29 · Clase 5.1 — Next.js + Tailwind
- **Aprendí:** Next.js es el marco que convierte componentes de React en una web: páginas, URLs, servidor local y armado para publicar. En `app/`, cada carpeta con un `page.tsx` es una URL; `layout.tsx` envuelve a todas las páginas con `{children}` (como un slot) y ahí va lo que se repite; `globals.css` tiene `@import "tailwindcss"` y el bloque `@theme`, donde cada variable se vuelve clases. El proyecto tiene tres zonas: lo que se toca (`app/`, `public/`, después `components/`), lo que se lee (`package.json`, `AGENTS.md`) y lo que no se toca (`node_modules/`, `.next/`, lockfile, configuraciones). `AGENTS.md` lo escribe Next.js para avisarle al agente que su versión cambió.
- **Hice:** creé el proyecto con `create-next-app@16.4.3`, lo levanté con `npm run dev` y cambié el `<h1>` de `page.tsx` a "Dashboard AI visibility" viendo cómo se actualiza solo. Verificado: `npm run lint` sin errores y `npm run build` arma la página.
- **Me costó / sorpresa:** dos problemas del entorno antes de empezar: un npm 6 viejo que le ganaba al de Node y rompía la instalación (se actualizó a 11.19.1), y PowerShell bloqueando `npx.ps1` (se habilitó con `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`). La plantilla de bienvenida usa colores de Tailwind y hex sueltos: las mismas señales de alarma de la P.2.
- **Decidido:** el dashboard sale del repo del curso a su propia carpeta y su propio repo público (`D:\Escritorio\proyectos\dashboard-ai-visibility`, https://github.com/jonlifschitzpersonal-bit/dashboard-ai-visibility): portfolio limpio, y en la 5.4 los PRs e issues son solo del proyecto. Creé el repo vacío en GitHub y Claude conectó el proyecto y subió el primer commit. `proyectos/` del curso queda para los ejercicios. Las sesiones se siguen abriendo desde la carpeta del curso.
- **Skills en otro proyecto:** llevan el *cómo* (Figma AI-ready, craft, Tailwind, React, Next.js, verificación, revisión de diffs); el *qué* de cada proyecto (stack, archivo de Figma, tokens) va en su `CLAUDE.md`. En un proyecto vacío preguntan el stack en lugar de elegir Next.js solas. Falta el proceso con el agente: se suma en la 5.5 y la 6.8.
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
