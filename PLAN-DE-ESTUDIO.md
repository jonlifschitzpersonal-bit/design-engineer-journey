# Plan de estudio: de Product Designer a Design Engineer

> Alumno: Jonathan · Tutor: Claude · Inicio: 28/10/2026 · Versión 2 (reestructurada sobre la guía *De Figma a código con IA*)
> Objetivo: llegar con un perfil y un portfolio que encajen en roles como **Senior Design Engineer en Profound** (React, Next.js, TypeScript, Tailwind, motion, design systems).

---

## 1. La idea del curso

**El diseño es el punto de partida; el código es lo que te diferencia.**

El curso sigue el flujo de trabajo de [`recursos/Guia_Completa_Figma_AI_a_Codigo.md`](recursos/Guia_Completa_Figma_AI_a_Codigo.md):

```
Problema → Figma estructurado → Figma MCP → Plan → Código en una branch → Storybook → QA con evidencia → Entrega
```

Vos diseñás y tomás las decisiones; Claude Code implementa; vos revisás que el resultado respete el diseño y funcione. Para revisar con criterio necesitás entender el código generado, y eso es lo que suman los módulos de fundamentos.

**Lo que agrega este plan sobre la guía**, porque lo piden los puestos de Design Engineer y la guía no lo cubre:
- **CSS fino**: Profound pide "CSS excelente" e interfaces pixel-precise.
- **Leer React y TypeScript** con soltura, no solo "por arriba".
- **Motion y micro-interacciones.**
- **Preparación para entrevistas técnicas.**

---

## 2. Punto de partida

| | |
|---|---|
| Rol actual | Product Designer |
| Código | HTML/CSS ok · JavaScript poco · sin React |
| Tiempo | 5–8 hs por semana |
| Entorno | VS Code, Node.js, GitHub y Vercel listos |
| Figma | Plan Free / Starter |
| Estrategia | Prepararse primero, aplicar con portfolio de design engineering |

**Tu ventaja:** ojo visual, tipografía, layout, Figma, sistemas de diseño, criterio de producto.

**Restricción del plan Free de Figma:**
- **Code Connect** requiere plan Organization o Enterprise. Lo aprendés igual (concepto, archivos de mapeo y checklist) y en tus proyectos lo reemplazamos por un **mapeo documentado** Figma ↔ código que el agente lee. Si conseguís acceso a un plan Organization (por ejemplo, en un trabajo), lo aplicás directo.
- **Figma MCP oficial:** en Starter da **6 llamadas por mes** y no puede escribir en el canvas (verificado el 29/10/2026). No alcanza para el curso.
- **MCP principal del curso: [Figma Console MCP](https://docs.figma-console-mcp.southleft.com/introduction)** (Southleft, open source y gratis). Funciona con Figma Free a través del plugin Desktop Bridge: lee y escribe en el canvas, lee variables locales y, con un token personal de Figma, lee comentarios.
- **Variables → código:** la API de variables de Figma es solo Enterprise. Las exportamos con Figma Console MCP (modo local) o con un plugin gratuito como Tokens Studio, y las compilamos con Style Dictionary.
- **Modos de variables (dark mode):** las fuentes no coinciden sobre el límite de Starter; probablemente 1 modo por colección. Lo verificamos en la 2.2. Si es así, el dark mode se resuelve en código (6.5) y en Figma con una colección por tema.
- **Todo el resto del stack es gratis:** GitHub, Vercel Hobby, Next.js, Tailwind, shadcn/ui, Radix, Base UI, Storybook, Style Dictionary y Motion. Lo único pago es Claude Code (suscripción de Claude).

---

## 3. Qué pide el mercado

### Profound — Member of Technical Staff, Design Engineer (Buenos Aires / NYC, presencial)
**Responsabilidades**
- Construir y shippear UI de calidad de producción en el core product (y a veces marketing site).
- Traducir la intención de diseño a implementaciones de alta fidelidad junto a diseñadores, PMs e ingenieros.
- Ser dueño de layout, tipografía, responsive, motion y micro-interacciones, principalmente con Tailwind.
- Contribuir a los cimientos de UI: componentes, patrones y design tokens.
- Mejorar performance, accesibilidad y mantenibilidad sin perder calidad de diseño.
- Subir la vara del frontend con code reviews, design critiques y guías.

**Requisitos**
- Experiencia en producción con **React, Next.js, Tailwind y TypeScript**.
- **CSS excelente**: interfaces pixel-precise y resilientes.
- Gusto de diseño e interacción que puedas **explicar e implementar**.
- Ownership end-to-end: de la exploración al código shippeado.
- Portfolio de trabajo frontend / design engineering de alto craft.
- Mentalidad builder ("can just do things"), cómodo con la velocidad de una startup.
- Inglés fluido.

Salario base publicado (NYC): USD 120k–250k + equity.

### Patrones en otras búsquedas (Vercel, Raycast, startups de IA)
- Mismo stack: React + Next.js + TypeScript + Tailwind.
- Motion (ex Framer Motion), GSAP.
- Figma fluido y design systems.
- Graphic design sólido: layout, tipografía, color.
- Polish, accesibilidad y performance.
- Fluidez con herramientas de IA (Cursor, Claude Code).
- Portfolio con **proyectos publicados** y case studies de punta a punta.

---

## 4. Cómo funciona la tutoría

**Ritmo:** 2 clases por semana (~2 hs c/u) + ~2 hs de práctica. Duración estimada: **~39 semanas (9 meses)**, con margen.

**Orden de cursada (cambio del 29/10/2026):** primero el flujo Figma → código, después los fundamentos. Claude escribe el CSS, el JS y el React siguiendo la skill de buenas prácticas, y vos aprendés a dirigirlo y revisarlo. Al terminar el flujo volvemos a los fundamentos en detalle, porque los piden el puesto y las entrevistas de live coding.

```
0 Setup ✅ → 1.1–1.2 ✅ → 2 Figma AI-ready → P Puente React → 5 Repo real → 6 Design system → 8 QA
→ 1.3–1.8 CSS → 3 JavaScript → 4 React y TS → 7 Motion → 9 Portfolio
```

**Cada clase:** el tutor explica el concepto con ejemplos resueltos → lo hacés directo donde corresponde (Figma, el repo, DevTools) → el tutor revisa lo que hiciste. Sin preguntas ni ejercicios para responder.

**Para arrancar cada sesión** escribime: _"arranquemos la clase X.Y"_. Leo `PROGRESO.md` y seguimos.

**Al cerrar cada clase, el tutor:**
1. Marca la clase en `PROGRESO.md` y actualiza la clase actual.
2. Escribe la entrada de la bitácora (qué aprendiste, qué te costó, qué se sumó a la skill).
3. Agrega las reglas nuevas a la skill [`.claude/skills/design-implementation/SKILL.md`](.claude/skills/design-implementation/SKILL.md), que Claude Code usa cada vez que implementa un diseño en este repo. Al final del curso, esta skill es parte de tu design system agéntico (módulo 6) y una pieza más del portfolio.

### Cómo se usa la IA en cada etapa

| Etapa | Módulos | Cómo trabajás |
|---|---|---|
| **Fundamentos** | 1, 3, 4 (CSS, JS, React) | **El tutor explica → lo ves funcionando en el navegador y en DevTools → lo aplicás en un proyecto.** El objetivo es poder leer y juzgar código. |
| **Workflow con agente** | 2, 5 a 8 | El flujo de la guía: **Figma → inspección con MCP → plan → aprobar → implementar → revisar el diff → QA con evidencia.** Vos decidís, el agente ejecuta. |
| **Demostrar** | 9 | Live coding y take-home, **con y sin IA**, para simular entrevistas. |

**Práctica a mano para entrevistas:** el live coding se prepara en el módulo 9.

### Review de cada slice (desde el módulo 5)
1. **Plan** antes de código: resultado observable, alcance, estados, qué se reutiliza/extiende/crea, archivos afectados (guía §15).
2. **Diff:** lo leés completo y explicás qué hace cada archivo (prompt "Entender el código", guía §22).
3. **Señales de alarma** (guía §16): valores sin tokens, componentes duplicados, `<div>` clickeables, estados inventados, archivos gigantes.
4. **Ledger de verificación** (guía §17): cada criterio como `PASS`, `FAIL`, `UNVERIFIED`, `OUT OF SCOPE` o `NOT APPLICABLE`, con evidencia.
5. **Craft:** ¿se ve igual a Figma? Espaciado, tipografía, hover/focus/disabled, motion.

---

## 5. Módulos y clases

### Módulo 0 — Setup ✅
| Clase | Tema |
|---|---|
| 0.1 | Terminal y Git: repo, commit, push. |
| 0.2 | Deploy en Vercel. IA como tutor. |

### Módulo 2 — Figma AI-ready y primer flujo con agente
Guía §5–8. Tu terreno: diseño estructurado para que humanos e IA lo entiendan.

| Clase | Tema |
|---|---|
| 2.1 | Estructura del archivo, nombres semánticos, componentes, propiedades y variantes (guía §6.1–6.4). |
| 2.2 | Auto Layout con intención + variables y tokens en 3 niveles: primitivo, semántico, componente (guía §6.5–6.6). |
| 2.3 | Estados, responsive, accesibilidad y anotaciones. Criterio de "Ready for development" (guía §6.7–6.11). |
| 2.4 | IA dentro de Figma + conectar **Figma Console MCP** a Claude Code (plugin Desktop Bridge). Inspeccionar antes de implementar (guía §7–8). Leer comentarios de Figma y consolidarlos en un backlog. Probar una vez el MCP oficial para comparar. |
| 2.5 | **Mini-proyecto:** diseñar una sección en tu Figma con estructura AI-ready. |
| 2.6 | Implementarla con Figma Console MCP + Claude Code en HTML/CSS, y hacer QA visual contra Figma. Deploy. |

### Módulo P — Puente: leer React lo justo (semana extra)
Lo mínimo para revisar lo que Claude genera en los módulos 5 y 6. Solo leer, no escribir. En el módulo 4 lo vemos a fondo.

| Clase | Tema |
|---|---|
| P.1 | Componentes, props y JSX: un componente de Figma y uno de React, lado a lado. Leer un componente generado y explicar qué hace. |
| P.2 | Leer clases de Tailwind y un diff de React: qué cambió, en qué archivo y si respeta el diseño. |

### Módulo 5 — Trabajar en un repo real con agente
Guía §4, 11–13, 15–16. Arranca el **proyecto ancla 1**.

| Clase | Tema |
|---|---|
| 5.1 | Next.js + Tailwind: crear el proyecto y entender su estructura. |
| 5.2 | Tailwind desde los tokens: `@theme` con tus variables de Figma. |
| 5.3 | Preparar el repo para el agente: `CLAUDE.md`, `PROJECT_CONTEXT`, `CURRENT_STATE`, `PENDING_TASKS` (guía §11). ADRs (*Architecture Decision Records*): `docs/adr/` con un README índice, más `docs/research/` para el contexto que lleva a cada decisión. |
| 5.4 | Git en equipo: branches, diff, commits con intención, pull requests (guía §12). GitHub Issues: crear issues (también desde comentarios de Figma), agruparlos por alcance y vincularlos al PR (`Closes #12`). |
| 5.5 | Trabajar por slices: plan → aprobación → implementación (guía §13, 15). Tip: iterar layout con wireframes en ASCII antes de diseñar o codear (gasta pocos tokens). |
| 5.6 | Revisar implementaciones: señales de código poco confiable (guía §16). |
| 5.7 | **Proyecto ancla 1** — Dashboard "AI visibility": Figma AI-ready + slice 1 (shell de la app). |
| 5.8 | Slice 2 (metric cards) + deploy de preview en Vercel. |

### Módulo 6 — Design system agéntico
Guía §9–11, 14. **Proyecto ancla 2.**

| Clase | Tema |
|---|---|
| 6.1 | Tokens en código mapeados 1 a 1 con las variables de Figma (primitivo → semántico). Exportar variables con Figma Console MCP o Tokens Studio (gratis) y compilarlas a CSS con Style Dictionary. |
| 6.2 | Componentes con variantes en código (`cva`, shadcn/ui): API de componentes. |
| 6.3 | Accesibilidad de componentes: semántica, teclado, foco, Radix. |
| 6.4 | Storybook: stories por variante y estado, addon de accesibilidad (guía §10). |
| 6.5 | Dark mode y modos de variables. |
| 6.6 | Documentación para agentes: `docs/design-system/`, `AI_CONTEXT.md` y la regla en `CLAUDE.md` (guía §11.1). |
| 6.7 | Code Connect: concepto, template files, checklist. En plan Free: **mapeo documentado** Figma ↔ código (guía §9). |
| 6.8 | Skills y reglas: gobernar al agente con roles (Component Architect, Plan Reviewer, Slice Closer…) (guía §14). Regla de supuestos explícitos: si el agente asume algo, lo dice y nombra el riesgo. |
| 6.9 | StorySync y drift Figma ↔ código: concepto y demo (opcional según requisitos) (guía §10.1). |
| 6.10 | **Prueba final:** pedirle a Claude Code una pantalla nueva y verificar que use tu sistema sin indicaciones extra. |
| 6.11 | Contratos de componentes (opcional): spec agnóstica del framework (anatomía, estados, intención), catálogo de props por framework y emitters que generan el código. El código generado no se edita: se edita el contrato. Práctica: escribir el contrato de un componente a partir de la API de Base UI. |

### Módulo 8 — QA y verificación con evidencia
Guía §17–18. Cerrar el **proyecto ancla 1** con nivel de producción.

| Clase | Tema |
|---|---|
| 8.1 | Ledger de verificación: `PASS`/`FAIL`/`UNVERIFIED` con evidencia. |
| 8.2 | Checks estáticos: lint, typecheck, build. Leer sus resultados. |
| 8.3 | Accesibilidad en runtime: teclado, foco, lector de pantalla, contraste. |
| 8.4 | Datos remotos: loading, error, retry, vacío (guía §18). Tablas y filtros. |
| 8.5 | Responsive, contenido extremo y performance (Core Web Vitals). |
| 8.6 | Dashboard: slices finales cerrados con ledger. |

### Módulo 1 — CSS para juzgar y pulir (1.1–1.2 ✅ · 1.3–1.8 después del módulo 8)
Lo que más vas a corregir de lo que genera la IA. Es tu diferencial.

| Clase | Tema |
|---|---|
| 1.1 | Cascada, especificidad, herencia. |
| 1.2 | Box model y unidades. |
| 1.3 | Flexbox = Auto Layout de Figma (dirección, gap, alineación, hug/fill). |
| 1.4 | CSS Grid: layouts de página y de componentes. |
| 1.5 | Posicionamiento, stacking context, `z-index`, `overflow`. |
| 1.6 | Responsive fluido: media queries, `clamp()`, container queries. |
| 1.7 | Tokens con custom properties + tipografía web. |
| 1.8 | DevTools para QA visual: medir, comparar con Figma, encontrar por qué algo no se ve igual. |

### Módulo 3 — Lógica y JavaScript para leer código
Saber qué hace el código que genera la IA.

| Clase | Tema |
|---|---|
| 3.1 | Pensar en pasos: descomponer un problema en pseudocódigo. |
| 3.2 | Variables, tipos, condicionales y funciones. |
| 3.3 | Bucles, arrays y objetos: modelar los datos de una UI. |
| 3.4 | `map`, `filter`, `find`: transformar datos en interfaz. |
| 3.5 | DOM y eventos: cómo una página reacciona al usuario. |
| 3.6 | Estado: tabs y modal accesible. |
| 3.7 | Datos remotos: `fetch`, `async/await`, JSON. Loading, error y vacío. |
| 3.8 | Leer código ajeno: recorrer un archivo generado y explicarlo línea por línea. |


### Módulo 4 — React y TypeScript para design engineers
El lenguaje en el que vive tu design system en código.

| Clase | Tema |
|---|---|
| 4.1 | Componentes y JSX: el equivalente en código de un componente de Figma. |
| 4.2 | Props y variantes: de las propiedades de Figma a las props de React. |
| 4.3 | Estado (`useState`) y eventos: la UI como función del estado. |
| 4.4 | Listas, condicionales y estados de UI (loading, empty, error). |
| 4.5 | Efectos y datos: `useEffect`, y cuándo **no** usarlo. |
| 4.6 | Composición: `children` y slots. |
| 4.7 | TypeScript: leer y escribir los tipos de las props. |
| 4.8 | Arquitectura: datos → feature → componente → pantalla (guía §16). Leer un diff de React. |

### Módulo 7 — Motion y craft
Lo que la guía no cubre y Profound pide explícitamente. **Proyecto ancla 3.**

| Clase | Tema |
|---|---|
| 7.1 | Principios: cuándo animar, duración, easing, propósito. |
| 7.2 | CSS transitions y keyframes + performance (`transform`/`opacity`). |
| 7.3 | Motion (motion.dev): variants, springs, `AnimatePresence`. |
| 7.4 | Layout animations, gestos y `prefers-reduced-motion`. |
| 7.5 | Documentar motion como tokens (duraciones y curvas) en el design system. |
| 7.6 | **Craft lab:** experimentos de micro-interacción publicados. |

### Módulo 9 — Portfolio y búsqueda
| Clase | Tema |
|---|---|
| 9.1 | Narrativa: mostrar el **proceso** (Figma AI-ready → MCP → slices → ledger), no solo el resultado. |
| 9.2 | Portfolio en Next.js (con tu propio design system). |
| 9.3 | Case studies en inglés. |
| 9.4 | Live coding de UI ✍️: CSS y componentes React chicos. |
| 9.5 | Take-home simulado: con agente y sin agente. |
| 9.6 | Explicar decisiones técnicas en inglés (code review y design critique). |
| 9.7 | Entrevista en inglés: pitch y preguntas frecuentes. |
| 9.8 | CV, LinkedIn y aplicar. |

---

## 6. Proyectos de portfolio

| Proyecto | Qué muestra | Módulos |
|---|---|---|
| **1. Dashboard "AI visibility"**: cómo aparece una marca en ChatGPT, Gemini, Perplexity y Claude (el dominio de Profound). Hecho con el workflow completo de la guía. | Product UI real, slices, QA con evidencia | 5, 8 |
| **2. Design system agéntico**: tokens Figma ↔ código, componentes accesibles, Storybook, docs para agentes, mapeo de componentes. | Sistemas, gobernanza de IA, accesibilidad | 6 |
| **3. Craft lab**: micro-interacciones publicadas. | Gusto, motion, detalle | 7 |
| **4. Portfolio**: construido con tu propio design system. | Todo lo anterior | 9 |

**Meta del modelo de madurez (guía §23):** terminar en **Nivel 4 — Workflow gobernado**.

---

## 7. Recursos

| Tema | Recursos |
|---|---|
| Workflow Figma → código | [`recursos/Guia_Completa_Figma_AI_a_Codigo.md`](recursos/Guia_Completa_Figma_AI_a_Codigo.md) · [Figma MCP](https://help.figma.com/hc/en-us/articles/39216419318551-Get-started-with-the-Figma-MCP-server) · [Skills de Figma para MCP](https://help.figma.com/hc/en-us/articles/39166810751895-Figma-skills-for-MCP) · [Code Connect](https://developers.figma.com/docs/code-connect/) |
| CSS | [web.dev/learn/css](https://web.dev/learn/css) · Josh Comeau, *CSS for JavaScript Developers* (pago) · Kevin Powell (YouTube) · [MDN](https://developer.mozilla.org) |
| JavaScript | [javascript.info](https://javascript.info) · MDN |
| React | [react.dev/learn](https://react.dev/learn) |
| TypeScript | [Total TypeScript](https://www.totaltypescript.com) (tutoriales gratis) |
| Next.js / Tailwind | [nextjs.org/learn](https://nextjs.org/learn) · [tailwindcss.com/docs](https://tailwindcss.com/docs) · [ui.shadcn.com](https://ui.shadcn.com) · [radix-ui.com](https://www.radix-ui.com) · [Base UI](https://base-ui.com) |
| Design systems | [Style Dictionary](https://styledictionary.com) · [Figma Console MCP](https://docs.figma-console-mcp.southleft.com/introduction) |
| Figma MCP | [Figma Console MCP](https://docs.figma-console-mcp.southleft.com/introduction) · [Límites del MCP oficial](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/) · [Tokens Studio](https://tokens.studio) |
| Storybook | [storybook.js.org/docs](https://storybook.js.org/docs) · [StorySync](https://github.com/brendanciccone/storysync) |
| Motion | [motion.dev](https://motion.dev) · [Emil Kowalski](https://emilkowal.ski) (*animations.dev*) · [interfaces.rauno.me](https://interfaces.rauno.me) |
| Calidad | [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines) · [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) |

---

## 8. Fuentes de la investigación
- [Profound — Design Engineer (posting oficial)](https://www.tryprofound.com/careers/e98d1d1d-aeec-4b8d-aef8-ea9b61546639)
- [Profound — Design Engineer (startup.jobs)](https://startup.jobs/design-engineer-profound-7918723)
- [Vercel — Design Engineer](https://www.workingnomads.com/jobs/design-engineer-vercel-1223595)
- [Raycast — Design Engineer](https://careers.atomico.com/companies/raycast/jobs/29648155-design-engineer)
- [Figma — Code Connect: quién puede usarlo](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
- [Foro de Figma — Code Connect en plan Professional](https://forum.figma.com/ask-the-community-7/code-connect-on-the-professional-plan-docs-say-it-s-supported-but-there-s-no-code-connect-token-scope-and-mappings-are-rejected-59258)

> Nota: Profound avisa que su comunicación oficial llega siempre desde un mail **@tryprofound.com**. El mensaje que recibiste vino de un recruiter externo; cuando llegue el momento de aplicar, confirmá que el proceso sea legítimo.
