# Plan de estudio: de Product Designer a Design Engineer

> Alumno: Jonathan · Tutor: Claude · Inicio: 28/10/2026
> Objetivo: llegar con un perfil y un portfolio que encajen en roles como **Senior Design Engineer en Profound** (React, Next.js, TypeScript, Tailwind, motion, design systems).

---

## 1. Punto de partida

| | |
|---|---|
| Rol actual | Product Designer |
| Código | HTML/CSS ok · JavaScript poco · sin React |
| Tiempo | 5–8 hs por semana |
| Entorno | VS Code, Node.js y GitHub listos |
| Estrategia | Prepararse primero, aplicar con portfolio de design engineering |

**Lo que ya tenés y es tu ventaja:** ojo visual, tipografía, layout, Figma, sistemas de diseño, criterio de producto, diálogo con PMs. La mayoría de los developers que aplican a estos roles **no** tienen eso.

**El gap a cerrar:** JavaScript → React → TypeScript/Next.js/Tailwind → motion → calidad de producción (performance, accesibilidad, code review).

---

## 2. Qué pide el mercado

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
- Librerías de motion: **Motion** (ex Framer Motion), GSAP.
- Figma fluido y trabajo en design systems.
- Graphic design sólido: layout, tipografía, color.
- Obsesión por polish, accesibilidad y performance.
- Fluidez con herramientas de IA para desarrollar (Cursor, Claude Code).
- Portfolio con **proyectos publicados** que muestren diseño + código, idealmente con case studies de punta a punta.

---

## 3. Cómo funciona la tutoría

**Ritmo:** 2 clases por semana (~2 hs c/u) + ~2 hs de práctica libre. Duración estimada: **~37 semanas (8–9 meses)**, con margen para repasar.

**Cada clase tiene 4 partes**
1. **Concepto** — explicación corta, conectada con lo que ya sabés de diseño.
2. **Ejercicio guiado** — con el ciclo híbrido (abajo): predecís, Claude Code genera, explicás y modificás a mano.
3. **Desafío** — para hacer solo, con criterios claros de "listo".
4. **Review** — al empezar la clase siguiente revisamos el desafío y actualizamos `PROGRESO.md`.

**Ciclo híbrido para cada ejercicio con IA (módulos 0 a 3)**
1. **Predecir:** antes de generar, decís qué elementos, propiedades o lógica esperás que tenga el código.
2. **Generar:** Claude Code lo escribe.
3. **Explicar:** contás con tus palabras qué hace cada parte. Si no podés, preguntás hasta entenderla.
4. **Modificar a mano:** hacés al menos un cambio vos (ajustar un valor, agregar un estado, romper algo a propósito y arreglarlo).

**Siempre a mano ✍️:** la práctica semanal de lógica, las clases 2.1 a 2.4 y un ejercicio de CSS por clase en el módulo 1.

**Para arrancar cada sesión** escribime: _"arranquemos la clase X.Y"_. Leo `PROGRESO.md` y seguimos desde ahí.

**Reglas de juego**
- Si te trabás, pedime **una pista**, no la solución.
- Todo lo que hagas va a GitHub. Lo que vale la pena, se publica.
- Desde el módulo 1, los READMEs de los ejercicios los escribís **en inglés**.
- Al final de cada módulo hay un mini-proyecto con review tipo code review real.

### Cómo usar IA (Claude Code) durante el plan

La IA no reemplaza saber programar: en el trabajo vas a ser responsable de cada línea que se shippee y en las entrevistas te van a evaluar sin ayuda. La meta es **saber leer, juzgar y corregir** el código, no memorizar sintaxis.

| Etapa | Módulos | Regla |
|---|---|---|
| **Híbrido** | 0 a 3 (setup, CSS, JS, React) | Claude Code genera el código, pero antes **predecís** qué debería tener, después lo **explicás** con tus palabras y hacés **cambios chicos a mano**. Los ejercicios de lógica y algunos de CSS siguen 100% a mano. |
| **Trabajar con IA** | 4 a 7 (Next/TS, motion, design systems, calidad) | Le pedís a Claude Code que implemente, como en un equipo real. Cada clase suma un ejercicio de **review del código generado**. |
| **Demostrar sin IA** | 8 (portfolio y búsqueda) | Práctica de live coding y take-home **sin IA**, para simular la entrevista. |

**Ejercicio de review del código generado (módulos 4 a 7)**
1. Le pedís la implementación a Claude Code con un pedido claro (qué, cómo debe verse, estados, accesibilidad).
2. Leés el diff completo antes de aceptarlo.
3. Explicás en 2–3 líneas qué hace cada parte. Si no podés explicarla, no se acepta: preguntás hasta entenderla.
4. Buscás problemas con este checklist:
   - [ ] ¿Se ve igual al diseño? (espaciado, tipografía, estados hover/focus/disabled)
   - [ ] ¿Funciona con teclado y lector de pantalla?
   - [ ] ¿Hay `useEffect`, estado o dependencias que sobran?
   - [ ] ¿Las animaciones usan `transform`/`opacity` y respetan `prefers-reduced-motion`?
   - [ ] ¿Funciona en mobile y con contenido largo o vacío?
5. Corregís al menos un problema **a mano** y anotás en `PROGRESO.md` qué encontraste.

**Nivel objetivo por tema**

| Tema | Nivel |
|---|---|
| Lógica (variables, condicionales, funciones, arrays, objetos) | Sólido: es la base de todo |
| JavaScript | Leer cualquier código de UI y escribir componentes sin ayuda |
| React | A fondo: estado, efectos, composición. Es tu herramienta principal |
| CSS | Experto: es tu diferencial |
| TypeScript | Leer y tipar componentes, sin tipos avanzados |
| Algoritmos complejos, backend, infraestructura | No hace falta para este rol |

---

## 4. Módulos y clases

### Módulo 0 — Setup y flujo de trabajo (semana 1)
**IA:** híbrido (ver tabla de etapas).

| Clase | Tema |
|---|---|
| 0.1 | Terminal y Git: qué es un repo, commit, push. Primer repo. |
| 0.2 | GitHub + deploy en Vercel. Cómo usar IA como tutor y no como muleta. |

**Entregable:** primera página publicada con URL pública.

### Módulo 1 — CSS de verdad (semanas 2–5)
**IA:** híbrido: Claude Code genera, vos predecís, explicás y modificás a mano. Ejercicios marcados ✍️ van 100% a mano.

| Clase | Tema |
|---|---|
| 1.1 | Cascada, especificidad, herencia. Por qué "mi estilo no se aplica". |
| 1.2 | Box model y unidades (`px`, `rem`, `em`, `%`, `vw`, `ch`). |
| 1.3 | Flexbox a fondo (es Auto Layout de Figma, con más reglas). |
| 1.4 | CSS Grid: layouts de página y de componentes. |
| 1.5 | Posicionamiento, stacking context, `z-index`, `overflow`. |
| 1.6 | Responsive fluido: media queries, `clamp()`, container queries. |
| 1.7 | Tokens con custom properties + tipografía web (variable fonts, carga, `line-height`, `text-wrap: balance`). |
| 1.8 | **Proyecto:** recrear pixel-perfect una sección de una landing (Linear, Vercel o Profound). |

### Módulo 2 — JavaScript y lógica de programación (semanas 6–11)
**IA:** híbrido: Claude Code genera, vos predecís, explicás y modificás a mano. Ejercicios marcados ✍️ van 100% a mano.

| Clase | Tema |
|---|---|
| 2.1 | **Pensar en pasos:** descomponer un problema y escribirlo en pseudocódigo, sin código todavía. |
| 2.2 | Variables, tipos y operadores. La consola del navegador. |
| 2.3 | Condicionales y funciones. |
| 2.4 | **Bucles:** `for`, `while`, `for...of`. Repetir y acumular. |
| 2.5 | Arrays y objetos: modelar datos de una UI. |
| 2.6 | `map`, `filter`, `find`, `reduce`: transformar datos en interfaz. |
| 2.7 | El DOM: seleccionar, crear y modificar elementos. |
| 2.8 | Eventos: click, teclado, input, delegación. |
| 2.9 | Estado en vanilla JS: tabs y modal accesible. |
| 2.10 | Asincronía: `fetch`, `async/await`, JSON. |
| 2.11 | Módulos + **proyecto** command palette (parte 1). |
| 2.12 | Command palette (parte 2): búsqueda, navegación con teclado, review. |

**Práctica semanal de lógica** (durante los módulos 2 y 3): 2–3 ejercicios cortos por semana, de unos 15 minutos cada uno, sin interfaz. Ejemplo: _"dada una lista de productos, devolvé los que cuestan menos de X, ordenados por nombre"_. Primero lo escribís en pseudocódigo y después en JavaScript. Van en la carpeta `ejercicios-logica/`.

### Módulo 3 — React (semanas 12–16)
**IA:** híbrido: Claude Code genera, vos predecís, explicás y modificás a mano. Ejercicios marcados ✍️ van 100% a mano.

| Clase | Tema |
|---|---|
| 3.1 | Por qué React. JSX. Proyecto con Vite. |
| 3.2 | Componentes y props (como componentes y variantes de Figma). |
| 3.3 | Estado con `useState`. Pensar la UI como función del estado. |
| 3.4 | Listas, `key`, renderizado condicional. |
| 3.5 | Eventos y formularios controlados. |
| 3.6 | `useEffect` y carga de datos. Cuándo **no** usarlo. |
| 3.7 | Composición: `children`, compound components. |
| 3.8 | `useRef`, manejo de foco, portales. |
| 3.9 | Custom hooks. |
| 3.10 | **Proyecto:** rehacer tabs, modal y command palette en React. |

### Módulo 4 — TypeScript + Next.js + Tailwind (semanas 17–20)
**IA:** empezás a trabajar con Claude Code + review del código generado en cada clase.

| Clase | Tema |
|---|---|
| 4.1 | TypeScript básico: tipos, interfaces, unions. Cómo trabajar con Claude Code: pedir, leer el diff, iterar. |
| 4.2 | Tipar componentes React (props, eventos, children). |
| 4.3 | Tailwind: utility-first, Tailwind v4 `@theme`, tokens. |
| 4.4 | Next.js App Router: rutas, layouts, `Link`, `Image`, fuentes. |
| 4.5 | Server vs client components. Data fetching. |
| 4.6 | shadcn/ui + `cva`: componentes con variantes. |
| 4.7 | **Proyecto ancla 1 (base):** dashboard "AI visibility" — estructura y datos. |
| 4.8 | Dashboard: deploy en Vercel y review. |

### Módulo 5 — Motion y micro-interacciones (semanas 21–24)
**IA:** con Claude Code + review. El ajuste fino de timing y easing lo hacés a mano.

| Clase | Tema |
|---|---|
| 5.1 | Principios: cuándo animar, duración, easing, propósito. |
| 5.2 | CSS transitions y keyframes. |
| 5.3 | Performance de animación: `transform`/`opacity`, compositor, DevTools. |
| 5.4 | Motion (motion.dev): `animate`, variants, springs. |
| 5.5 | `AnimatePresence` y layout animations. |
| 5.6 | Gestos (drag, hover, tap) y `prefers-reduced-motion`. |
| 5.7 | **Proyecto ancla 3:** craft lab — experimentos 1 a 5. |
| 5.8 | Craft lab — experimentos 6 a 10 y publicación. |

### Módulo 6 — Design systems en código (semanas 25–27)
**IA:** con Claude Code + review, con foco en API de componentes y accesibilidad.

| Clase | Tema |
|---|---|
| 6.1 | Tokens de Figma (Variables) a código. |
| 6.2 | Diseñar la API de un componente: props, variantes, composición. |
| 6.3 | Accesibilidad: semántica, teclado, foco, ARIA. |
| 6.4 | Radix primitives: accesibilidad resuelta, estilo tuyo. |
| 6.5 | Dark mode y theming. |
| 6.6 | **Proyecto ancla 2:** mini design system + sitio de documentación. |

### Módulo 7 — Calidad de producción (semanas 28–30)
**IA:** con Claude Code + review. Auditorías y code review hechos por vos.

| Clase | Tema |
|---|---|
| 7.1 | Performance: Core Web Vitals, Lighthouse. |
| 7.2 | Auditoría de accesibilidad (axe, lector de pantalla, teclado). |
| 7.3 | Flujo de equipo: branches, pull requests, code review. |
| 7.4 | UI densa de datos: tablas, filtros, ordenamiento. |
| 7.5 | Charts para producto. |
| 7.6 | Estados: loading, empty, error, skeletons. Pulido final del dashboard. |

### Módulo 8 — Portfolio y búsqueda (semanas 31–34, +3 de margen)
**IA:** portfolio con Claude Code; live coding y take-home **sin IA**.

| Clase | Tema |
|---|---|
| 8.1 | Estructura y narrativa del portfolio de design engineer. |
| 8.2 | Construir el portfolio en Next.js (parte 1). |
| 8.3 | Portfolio (parte 2): detalles, motion, performance. |
| 8.4 | Case studies en inglés: proceso, decisiones, código. |
| 8.5 | Práctica de live coding de UI, sin IA. |
| 8.6 | Take-home simulado con tiempo límite, sin IA. |
| 8.7 | Pitch y entrevista en inglés. |
| 8.8 | CV, LinkedIn y aplicar. |

---

## 5. Proyectos de portfolio

| Proyecto | Qué muestra | Módulos |
|---|---|---|
| **1. Dashboard "AI visibility"** — mismo dominio que Profound: cómo aparece una marca en ChatGPT, Gemini, Perplexity, Claude. Diseño en Figma + Next/TS/Tailwind, tablas, charts, filtros, responsive, estados. | Product UI real, datos, criterio de producto | 4, 7 |
| **2. Mini design system** — tokens desde Figma, 8–10 componentes accesibles con variantes y motion, sitio de docs. | Sistemas, API de componentes, accesibilidad | 6 |
| **3. Craft lab** — playground público de micro-interacciones. | Gusto, motion, detalle | 5 |
| **4. Portfolio** — hecho en código; es en sí mismo una pieza de craft. | Todo lo anterior | 8 |

---

## 6. Recursos

| Tema | Recursos |
|---|---|
| CSS | [web.dev/learn/css](https://web.dev/learn/css) (gratis) · Josh Comeau, *CSS for JavaScript Developers* (pago) · Kevin Powell (YouTube) · [MDN](https://developer.mozilla.org) |
| JavaScript | [javascript.info](https://javascript.info) · MDN |
| React | [react.dev/learn](https://react.dev/learn) · Josh Comeau, *The Joy of React* (pago) |
| TypeScript | [Total TypeScript](https://www.totaltypescript.com) (tutoriales gratis) |
| Next.js | [nextjs.org/learn](https://nextjs.org/learn) (curso gratis) |
| Tailwind / UI | [tailwindcss.com/docs](https://tailwindcss.com/docs) · [ui.shadcn.com](https://ui.shadcn.com) · [radix-ui.com](https://www.radix-ui.com) |
| Motion | [motion.dev](https://motion.dev) · Emil Kowalski, *animations.dev* y [su blog](https://emilkowal.ski) · Rauno Freiberg, *Devouring Details* e [interfaces.rauno.me](https://interfaces.rauno.me) |
| Calidad | Vercel, [Web Interface Guidelines](https://vercel.com/design/guidelines) · [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) |

Los cursos pagos son opcionales; con los gratuitos y las clases alcanza. Si invertís en uno, el de más impacto para tu perfil es *CSS for JavaScript Developers* o *animations.dev*.

---

## 7. Fuentes de la investigación
- [Profound — Design Engineer (posting oficial)](https://www.tryprofound.com/careers/e98d1d1d-aeec-4b8d-aef8-ea9b61546639)
- [Profound — Design Engineer (startup.jobs)](https://startup.jobs/design-engineer-profound-7918723)
- [Profound — Design Engineer (Built In NYC)](https://www.builtinnyc.com/job/design-engineer/8167420)
- [Vercel — Design Engineer (Working Nomads)](https://www.workingnomads.com/jobs/design-engineer-vercel-1223595)
- [Raycast — Design Engineer](https://careers.atomico.com/companies/raycast/jobs/29648155-design-engineer)
- [Antimetal — Design Engineer](https://jobs.arbitrum.io/companies/antimetal/jobs/87883480-design-engineer)
- [Design Engineer: React, Framer, Motion & Cursor](https://www.onlinejobs.ph/jobseekers/job/design-engineer-build-with-react-framer-motion-cursor-1561113)

> Nota: Profound avisa que su comunicación oficial llega siempre desde un mail **@tryprofound.com**. El mensaje que recibiste vino de un recruiter externo; cuando llegue el momento de aplicar, confirmá que el proceso sea legítimo.
