# Progreso

> Marcá `[x]` cuando una clase esté terminada (incluido el desafío).
> El tutor lee este archivo al empezar cada sesión.

**Clase actual:** 1.3
**URL publicada:** https://design-engineer-journey-00-setup.vercel.app/
**Repo:** https://github.com/jonlifschitzpersonal-bit/design-engineer-journey.git

---

## Checklist

### Módulo 0 — Setup

- [x] 0.1 Terminal y Git
- [x] 0.2 GitHub + Vercel + IA como tutor

### Módulo 1 — CSS para juzgar y pulir

- [x] 1.1 Cascada, especificidad, herencia
- [x] 1.2 Box model y unidades
- [ ] 1.3 Flexbox = Auto Layout
- [ ] 1.4 Grid
- [ ] 1.5 Posicionamiento y stacking
- [ ] 1.6 Responsive fluido
- [ ] 1.7 Tokens y tipografía web
- [ ] 1.8 DevTools para QA visual

### Módulo 2 — Figma AI-ready y primer flujo con agente

- [ ] 2.1 Estructura, nombres, componentes y variantes
- [ ] 2.2 Auto Layout + variables y tokens
- [ ] 2.3 Estados, responsive, a11y, anotaciones
- [ ] 2.4 IA en Figma + Figma MCP
- [ ] 2.5 Mini-proyecto: sección AI-ready en Figma
- [ ] 2.6 Implementar con MCP + QA visual

### Módulo 3 — Lógica y JavaScript para leer código

- [ ] 3.1 Pensar en pasos
- [ ] 3.2 Variables, condicionales, funciones
- [ ] 3.3 Bucles, arrays y objetos
- [ ] 3.4 map / filter / find
- [ ] 3.5 DOM y eventos
- [ ] 3.6 Estado: tabs y modal
- [ ] 3.7 Datos remotos
- [ ] 3.8 Leer código ajeno
- [ ] Práctica semanal de lógica (opcional)

### Módulo 4 — React y TypeScript

- [ ] 4.1 Componentes y JSX
- [ ] 4.2 Props y variantes
- [ ] 4.3 Estado y eventos
- [ ] 4.4 Listas, condicionales, estados de UI
- [ ] 4.5 Efectos y datos
- [ ] 4.6 Composición
- [ ] 4.7 TypeScript para props
- [ ] 4.8 Arquitectura y leer un diff

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

### Módulo 7 — Motion y craft

- [ ] 7.1 Principios de animación
- [ ] 7.2 Transitions, keyframes, performance
- [ ] 7.3 Motion: variants, springs, AnimatePresence
- [ ] 7.4 Layout animations, gestos, reduced motion
- [ ] 7.5 Motion como tokens
- [ ] 7.6 Craft lab

### Módulo 8 — QA y verificación

- [ ] 8.1 Ledger de verificación
- [ ] 8.2 Lint, typecheck, build
- [ ] 8.3 Accesibilidad en runtime
- [ ] 8.4 Datos remotos, tablas, filtros
- [ ] 8.5 Responsive, contenido extremo, performance
- [ ] 8.6 Dashboard: slices finales

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
