# Dashboard de Gurises Unidos — explicación completa

> **Para qué es este archivo:** poder explicar el proyecto de punta a punta (en una entrevista, a un cliente o en el portfolio): qué es, qué se hizo, por qué y qué hace cada archivo.
> Se actualiza al cerrar cada clase que toca el dashboard.
> **Última actualización:** 2026-10-30, al cerrar la clase 5.4.

| | |
|---|---|
| Carpeta | `D:\Escritorio\proyectos\gurises-unidos-dashboard` |
| Repo (público) | https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard |
| Publicado | Todavía no (deploy de preview en la clase 5.8) |
| Diseño | Figma "Design Engineer Journey" (el archivo del curso) |

---

## 1. En 30 segundos

> "Es el dashboard de Gurises Unidos, una ONG uruguaya que trabaja con chicos, adolescentes y sus familias. La dirección tenía los datos de sus proyectos repartidos en muchos Excel, y armar el informe anual para los donantes le llevaba recorrer archivo por archivo. El dashboard junta todo: primero el alcance (cuántos chicos se alcanzaron), después familias, docentes y proyectos activos, una tabla de proyectos y filtros por año y departamento.
> Ya lo había hecho como freelance en React. Esta segunda versión la rehice en Next.js, TypeScript y Tailwind, con un design system que va uno a uno entre Figma y el código, y preparada para trabajar con agentes de IA: el repo tiene las reglas, el contexto, el estado y cada decisión documentada, y cada cambio entra por un pull request con su evidencia, que reviso antes de mergear."

---

## 2. El cliente y el problema

- **Cliente:** Gurises Unidos, ONG uruguaya con proyectos sociales para niñas, niños, adolescentes y sus familias.
- **Problema:** los datos estaban en varios Excel, cada uno con muchas hojas y sin una estructura común. Para informar a los donantes había que reconstruir la foto del año a mano.
- **Usuario principal:** la dirección de la ONG. Necesita una vista global del período (proyectos, beneficiarios, resultados) para preparar los informes.
- **Usuario futuro:** el equipo de cada proyecto, que cargaría y actualizaría sus datos. En esta versión esos flujos existen, pero no guardan (ver decisiones).

---

## 3. Por qué una segunda versión

| | v1 (freelance) | v2 (este proyecto) |
|---|---|---|
| Stack | React + Storybook | Next.js 16 + React 19 + TypeScript + Tailwind v4 |
| Tokens | Semánticos, sincronizados a mano con Figma | Mismos nombres que en Figma, y el tema de Tailwind tiene **solo** el sistema |
| Figma ↔ código | Code Connect | Mapeo documentado (Code Connect requiere plan Organization) |
| Trabajo con IA | Claude Code en 3 etapas (preparar, construir, verificar) | Lo mismo, con el repo preparado para que cualquier sesión del agente arranque sabiendo todo |
| Acciones con backend | Botones que no hacían nada | Flujos completos (formulario, validación, estados) que no guardan |
| Datos | Ficticios en la demo | Ficticios, con estructura realista (19 departamentos, varios años) |

**Por qué rehacerlo y no inventar otro proyecto:** un caso real con cliente, problema y decisiones verificadas pesa más en un portfolio que un proyecto inventado. Y rehacerlo muestra el salto: el mismo producto, construido con el stack y el proceso que piden los puestos de design engineer.

---

## 4. Decisiones de producto

Las tomaste vos; vienen del caso v1 o de la clase 5.3.

| Decisión | Por qué |
|---|---|
| **El alcance va primero**, ocupando toda la fila | Es el número que piden los donantes. Mide **alcance, no impacto**, y la interfaz no tiene que sugerir otra cosa. |
| **Año y departamento son filtros globales; la búsqueda es local** | Los indicadores siempre describen el período y el lugar elegidos; la búsqueda solo ayuda a encontrar un proyecto en la tabla. Costo aceptado: con una búsqueda activa, los indicadores muestran el total y la tabla solo lo encontrado. |
| **6 estados diseñados:** con datos, cargando, error, reintento, vacío inicial y vacío por filtro | Cada uno tiene su texto y su comportamiento; ninguno se improvisa en el código. |
| **El reintento mantiene el mensaje de error** | En v1, reemplazarlo por un skeleton hacía saltar la pantalla y escondía qué había pasado. |
| **Sin botón en el vacío inicial** | "Cargar métricas" no tenía un flujo detrás. |
| **Datos ficticios, con todo funcionando** | Los datos reales son privados. Filtros, búsqueda, tabla y estados funcionan igual que con datos reales. |
| **Las acciones con backend se construyen completas y no guardan** | "Cargar métricas" y "Nuevo proyecto" se ven y se comportan como en producción, para revisarlos, probarlos y mostrarlos. Al confirmar no se guarda nada. |
| **El diseño sale del archivo de Figma del curso** | Ahí está el sistema (tokens y componentes) que se mapea uno a uno con el código. Se suman los componentes nuevos (Tabs, Sidebar, tabla, selectores). |
| **Nombre del repo:** `gurises-unidos-dashboard` | Que el nombre diga qué producto es. Se llamaba `dashboard-ai-visibility`; GitHub redirige el link viejo. |

---

## 5. Cómo se armó, paso a paso

### Antes del proyecto: el sistema en Figma (módulo 2 del curso)

En el archivo "Design Engineer Journey" se armó el design system que usa el dashboard:

- **Variables en dos niveles:** primitivos (la paleta: `gray/600`, `blue/200`) y semánticos (para qué sirve cada color: `color/text/muted`, `color/action/primary/bg`). Los componentes usan solo semánticos.
- **Text styles:** `heading/metric`, `heading/section`, `label/md`, `label/sm`, `label/xs` y `body/sm`, todos en Inter.
- **Componentes:** `Icon` (basado en Lucide), `Button`, `MetricCard` y `StatusBadge`, con variantes y estados.
- **Archivo AI-ready:** nombres de capa semánticos, propiedades conectadas y anotaciones, para que un agente lo lea sin adivinar.

### Clase 5.1 — Crear el proyecto (29/10/2026)

- **Qué se hizo:** se creó el proyecto con `create-next-app@16.4.3` (TypeScript, Tailwind, ESLint, App Router, alias `@/*`) y se cambió el título de la página para ver la recarga automática.
- **Por qué con la versión fija:** con `@latest`, otro día el generador produce otra cosa; con la versión fija, el resultado se puede repetir.
- **Por qué en su propio repo:** el proyecto nació dentro del repo del curso, pero se movió a su carpeta y su repo público para que el historial, los PRs y los issues sean solo del producto, y el link se pueda compartir tal cual.
- **Problemas del entorno resueltos:** un npm 6 viejo que le ganaba al de Node (se actualizó a 11.19.1) y PowerShell bloqueando `npm`/`npx` (se habilitó con `RemoteSigned`).

### Clase 5.2 — Los tokens de Figma en Tailwind (30/10/2026)

- **Qué se hizo:** se reemplazó la plantilla de Next.js por el sistema. Claude leyó las variables y los text styles de Figma por el MCP y los cargó en `app/globals.css`. Se cambió Geist por Inter, `lang="en"` por `es`, se puso la metadata real, se sacó el dark mode automático de la plantilla y se borraron los SVG que no se usaban. Se agregó la página `/tokens`.
- **Por qué solo el sistema:** si Tailwind conserva su paleta, un agente puede escribir `text-gray-500` y se ve "casi bien" aunque esté fuera del sistema. Con el sistema solo, ese color directamente no existe.
- **La trampa que apareció:** Tailwind ya trae `rounded-lg`, pero de 8px, y en Figma `radius/lg` es de 12. Si no se redefine, la clase existe con otro valor y el error solo aparece midiendo.
- **Por qué `text-text-muted` repite palabras:** el prefijo (`text-`, `bg-`, `border-`) lo pone Tailwind según dónde se usa el color, y el resto es el nombre del token de Figma. Se eligió un solo nombre de Figma a la clase antes que una clase más linda.
- **Evidencia:** medido en Chrome con `getComputedStyle`: los colores, los 6 text styles, los radios y el espaciado coinciden con Figma; `bg-red-500` no tiene efecto; no hay scroll horizontal a 320px; `lint` y `build` pasan.

### Clase 5.3 — El repo preparado para el agente (30/10/2026)

- **Qué se hizo:** el producto pasó a ser Gurises Unidos (nombre, metadata, README) y se escribió la documentación para agentes: `CLAUDE.md`, `docs/PROJECT_CONTEXT.md`, `docs/CURRENT_STATE.md`, `docs/PENDING_TASKS.md`, 6 ADR y 2 notas de research. Se renombraron la carpeta y el repo.
- **Por qué:** cada sesión de un agente arranca sin memoria. Con esto, cualquier sesión (o persona nueva) sabe qué es el producto, qué reglas seguir, qué está hecho, qué falta y por qué se decidió cada cosa.
- **Por qué separar reglas y estado:** si `CLAUDE.md` dijera "falta la tabla", en un mes sería falso y el agente lo seguiría leyendo como cierto. Las reglas casi no cambian; el estado se actualiza en cada slice.
- **Evidencia:** una sesión nueva de Claude Code, abierta en la carpeta del proyecto y sin contexto, propuso un cambio citando el ADR 0005, con tokens del sistema, sin inventar textos y marcando como UNVERIFIED lo que no pudo comprobar.

### Clase 5.4 — Git en equipo (30/10/2026)

- **Qué se hizo:** el backlog pasó de `PENDING_TASKS.md` a 20 GitHub Issues, agrupados en 3 milestones (`Repo workflow`, `System components`, `Dashboard v1`) y con labels por tipo (`enhancement`, `design`, `debt`, `needs decision`). `main` quedó protegido: solo se llega con un PR, sin force push ni borrado, y cada PR entra como un solo commit (squash). Se sumaron plantillas de PR y de issue, y la sección "Git workflow" del `CLAUDE.md`.
- **El primer PR (#19):** 3 commits, uno por intención (plantillas, reglas de Git, pendientes con links). Lo revisé en *Files changed* y lo mergeé yo: el issue #1 se cerró solo por el `Closes #1`.
- **Por qué:** en un equipo, `main` es lo publicado y nadie escribe ahí directo. Con un agente, el PR es mi punto de control: Claude abre el PR con evidencia y yo decido si entra. Y como el repo es público, los issues y los PRs muestran cómo trabajo.
- **Por qué sin aprobación obligatoria:** GitHub no deja aprobar el PR propio; con una sola persona en el repo, exigirla lo traba. La revisión se hace igual, antes del merge.
- **Lo que apareció:** el ADR 0005 pide que la demo avise que los datos son ficticios y ninguna tarea lo cubría. Se creó el #20, y el PR #21 lo sumó al orden de trabajo antes del deploy. El #20 sigue abierto a propósito: el PR decía `Refs #20`, porque anotar la tarea no es terminarla. El PR #23 sumó el backlog y el flujo al README y a `PROJECT_CONTEXT.md`, y con eso se cerró el milestone `Repo workflow`.
- **Evidencia:** el #1 está cerrado por el PR #19, la branch se borró sola, `main` tiene un commit `(#19)` y la API de GitHub muestra las tres reglas activas sobre `main`. Quedó UNVERIFIED que la plantilla de PR se cargue en la web (los dos PRs se abrieron desde la terminal).

### Clase 5.5 — Trabajar por slices: el aviso de datos ficticios (30/10/2026)

- **Qué se hizo:** el primer slice completo, el #20. Arriba de todas las pantallas hay una franja celeste: "Demo con datos ficticios. No son cifras reales de Gurises Unidos." Se cierra con una X y queda cerrada en ese navegador.
- **Cómo:**
  1. Tres wireframes en ASCII; elegí la franja arriba de todo.
  2. El diseño en Figma (componente `DemoNotice` e íconos `info` y `x`).
  3. Un plan que aprobé.
  4. El código en una branch.
  5. El PR #24 con el ledger, que revisé y mergeé.
- **Por qué la franja arriba:** es la única de las tres opciones que se ve siempre, también en mobile, con la frase completa y sin tapar contenido. La etiqueta en la barra superior competía con la búsqueda. La nota al pie del sidebar quedaba escondida en mobile y no cumplía el issue.
- **Por qué el texto nombra a la ONG:** la ONG es real y los datos no. El aviso tiene que dejar claro que las cifras no hablan por Gurises Unidos.
- **Por qué un script en línea:** que lo cerraste vive en tu navegador y el servidor no lo sabe. Si se corrige después de pintar, el aviso aparece un instante y la página salta. El script lo oculta mientras el navegador lee el HTML, antes de pintarlo, y la página sigue siendo estática.
- **Lo que quedó como deuda, a propósito:**
  - Los íconos van como SVG dentro del aviso hasta que exista `Icon` (#12).
  - La X es un botón interno hasta que haya otro botón de solo ícono (#3).
- **El proceso quedó en el repo:** el PR #26 (mergeado, cerró el #25) pasa al `CLAUDE.md` qué responde un plan, qué hacer si cambia, cuándo se cierra un slice y que el agente frena después. La plantilla de PR suma "Differences with the approved plan", para los cambios técnicos hechos después de aprobar.
- **Evidencia:** medido en Chrome contra Figma a 1280 y 320px. También se probaron teclado y foco, recargar, cambiar de pantalla, el navegador sin `localStorage`, el árbol de accesibilidad, el contraste y la consola. Quedó UNVERIFIED un lector de pantalla real.

---

## 6. El repo, archivo por archivo

```
gurises-unidos-dashboard/
├── .github/
│   ├── pull_request_template.md
│   └── ISSUE_TEMPLATE/
│       ├── task.yml
│       ├── bug.yml
│       └── config.yml
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── favicon.ico
│   └── tokens/
│       └── page.tsx
├── components/
│   └── DemoNotice.tsx
├── docs/
│   ├── PROJECT_CONTEXT.md
│   ├── CURRENT_STATE.md
│   ├── PENDING_TASKS.md
│   ├── adr/
│   │   ├── README.md
│   │   └── 0001 … 0006
│   └── research/
│       ├── figma-mcp-options.md
│       └── v1-case-study.md
├── CLAUDE.md
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── .gitignore
├── next-env.d.ts          (generado, no se sube)
├── node_modules/          (generado, no se sube)
└── .next/                 (generado, no se sube)
```

### La aplicación (`app/`)

| Archivo | Qué hace | Detalle para explicarlo |
|---|---|---|
| `app/layout.tsx` | Envuelve a **todas** las páginas | Carga Inter con `next/font` (Next.js la descarga al armar el proyecto y la sirve desde el mismo dominio, sin pedido a Google), pone `lang="es"`, el título "Gurises Unidos · Dashboard" y la descripción. Pone el aviso de datos ficticios primero y envuelve el contenido en `#content`, adonde va el foco al cerrar el aviso. Lo que se repite en todas las pantallas va acá, una sola vez. |
| `app/page.tsx` | La home (`/`) | Por ahora, un título y un link a `/tokens`. El dashboard la reemplaza en los próximos slices. |
| `app/tokens/page.tsx` | La página `/tokens` | Muestra cada token con la clase que lo usa: colores, text styles, radios y espaciado. Sirve para comparar con Figma hasta que exista Storybook. Las clases están escritas completas en una lista, porque Tailwind arma el CSS buscando clases en el texto de los archivos. |
| `app/globals.css` | Los tokens del sistema | El corazón del sistema en código (ver sección 7). También tiene la variante `demo-dismissed:`, que oculta el aviso cuando está cerrado. |
| `components/DemoNotice.tsx` | El aviso de datos ficticios | Un `<aside>` con nombre "Aviso", el texto fijo y el botón "Cerrar aviso". Es *client component* porque tiene un clic. Al cerrarse, guarda `dismissed` en `localStorage` y pasa el foco al contenido. Un script en línea lo oculta antes de pintar si ya estaba cerrado. Los íconos son SVG de Lucide hasta que exista `Icon` (#12). |
| `app/favicon.ico` | El ícono de la pestaña | Todavía es el de Next.js; está anotado como pendiente. |

**Cómo funcionan las rutas:** en `app/`, cada carpeta con un `page.tsx` adentro es una URL. `app/page.tsx` es `/` y `app/tokens/page.tsx` es `/tokens`. No hay que configurar nada más.

### La documentación para agentes

| Archivo | Qué tiene | Cuándo cambia |
|---|---|---|
| `CLAUDE.md` | Reglas para cualquier agente: comandos, stack, de dónde sale el diseño, reglas de tokens, convenciones, cómo trabajar por slices (qué responde un plan, cuándo se cierra y que el agente frena después; desde la 5.5), el flujo de Git (desde la 5.4) y qué no tocar. Manda a leer primero el issue de la tarea. Empieza con `@AGENTS.md` para incluir el aviso de Next.js. | Casi nunca |
| `AGENTS.md` | Lo escribe Next.js: avisa que esta versión cambió y que hay que leer su documentación local antes de programar. | Nunca a mano (si se borra, `next dev` lo vuelve a crear) |
| `docs/PROJECT_CONTEXT.md` | El producto: cliente, problema, usuarios, qué muestra la pantalla, qué filtro afecta a qué, los 6 estados y las fuentes de verdad. | Poco |
| `docs/CURRENT_STATE.md` | Lo que está hecho **y verificado**, con la evidencia de cada cosa. | En cada slice |
| `docs/PENDING_TASKS.md` | El orden de trabajo, lo bloqueado, las decisiones de producto pendientes y la deuda que se deja a propósito, cada cosa con el link a su issue. El detalle está en el issue, no acá, para que no digan cosas distintas. | En cada slice |
| `.github/pull_request_template.md` | Las secciones de todo PR: qué y por qué, `Closes #N`, alcance y lo que queda afuera, diferencias con Figma, diferencias con el plan aprobado (desde la 5.5), evidencia y ledger, riesgos, cómo probarlo y docs. GitHub la carga al abrir un PR desde la web. | Casi nunca |
| `.github/ISSUE_TEMPLATE/` | Las plantillas de issue: *Task* (qué y por qué, "done when", fuera de alcance, fuente, "blocked by") y *Bug* (qué pasa, qué debería pasar, pasos, dónde). `config.yml` deja abrir también un issue en blanco. | Casi nunca |
| `docs/adr/README.md` | Índice de los ADR, sus reglas y la plantilla para escribir uno nuevo. | Cuando se suma un ADR |
| `docs/adr/0001` … `0006` | Una decisión por archivo (sección 8). | No se editan: si una decisión cambia, se escribe otro que la reemplaza |
| `docs/research/figma-mcp-options.md` | Comparación del MCP oficial de Figma con Figma Console MCP en el plan Starter, más los límites del plan. Respalda el ADR 0003. | Se suman notas |
| `docs/research/v1-case-study.md` | Qué decisiones de v1 se mantienen, qué quedó sin medir y qué cambia en v2. | Se suman notas |
| `README.md` | La presentación del repo en GitHub: qué es, qué hace, cómo correrlo, estructura, cómo se trabaja (issues, PRs, plantilla), tokens y roadmap. | Cuando cambia algo visible |

### Configuración (se lee, no se toca sin motivo)

| Archivo | Qué hace |
|---|---|
| `package.json` | Nombre del proyecto, scripts (`dev`, `build`, `start`, `lint`) y dependencias: Next.js 16.4.3, React 19.3.0, Tailwind v4, TypeScript y ESLint. |
| `package-lock.json` | Las versiones exactas de **todas** las dependencias, para que cualquiera instale lo mismo. Lo escribe npm; cambia solo si se agrega o se actualiza una dependencia. |
| `next.config.ts` | Configuración de Next.js, tal cual la generó la plantilla: conecta Tailwind con Turbopack (el compilador de Next.js) y activa `cacheComponents` y `partialPrefetching`, dos opciones de rendimiento que trae esta versión. |
| `tsconfig.json` | Configuración de TypeScript: modo estricto y el alias `@/*` (importar con `@/components/Button` en lugar de `../../components/Button`). |
| `eslint.config.mjs` | El revisor de código: reglas de Next.js y de TypeScript, y qué carpetas ignorar. `npm run lint` lo corre. |
| `.gitignore` | Lo que Git no sube: `node_modules/`, `.next/`, `next-env.d.ts`, archivos `.env` (secretos) y otros generados. |

### Generados (no se tocan y no se suben)

| Qué | Qué es |
|---|---|
| `node_modules/` | Las dependencias instaladas. Se recrea con `npm install`. |
| `.next/` | Lo que arma Next.js al correr `dev` o `build`. |
| `next-env.d.ts` | Tipos de Next.js para TypeScript. Se regenera solo. |

---

## 7. Cómo funciona por dentro

### Qué pasa cuando alguien abre una página

```
El navegador pide /tokens
  → Next.js busca app/tokens/page.tsx
  → lo mete adentro de app/layout.tsx (fuente, idioma, metadata)
  → aplica app/globals.css (Tailwind + tokens)
  → devuelve el HTML ya armado (la página es estática: se arma una vez en el build)
```

### El camino de un token, de Figma al navegador

```
Figma                          app/globals.css                         Clase            Navegador
gray/600 = #4b5563     →   --gray-600: #4b5563;  (en :root)
color/text/muted → gray/600  →  --color-text-muted: var(--gray-600);  (en @theme)  →  text-text-muted  →  color: #4b5563
```

Es la misma cadena que en Figma va de la capa a la variable semántica y de ahí al primitivo. En DevTools se ve igual: la clase usa `var(--color-text-muted)`, y esa variable apunta a `--gray-600`.

### `globals.css` por partes

| Bloque | Qué tiene | Por qué |
|---|---|---|
| `@import "tailwindcss"` | Carga Tailwind | Incluye el *preflight*, el reset de estilos del navegador |
| `:root { … }` | Los **primitivos** (`--gray-600`, `--blue-200`…) | Fuera de `@theme` no generan clases: ningún componente puede usar `bg-blue-200` directo. Igual que en Figma, donde los primitivos no aparecen en el selector. |
| `@theme { … }` | Los **semánticos** de color, los radios y los text styles | Cada variable de `@theme` se vuelve clases. `--color-*: initial`, `--radius-*: initial` y `--text-*: initial` borran lo que trae Tailwind antes de definir lo del sistema. |
| `@theme inline { … }` | La fuente (`--font-sans: var(--font-inter), …`) | `inline` copia el valor directo; lo recomienda Next.js para las fuentes de `next/font`. Los colores van **sin** `inline` para que el dark mode pueda redefinirlos más adelante. |
| `@layer base { body … }` | Fondo y color de texto de la página | Con tokens semánticos, no con valores sueltos. |

### Qué clases existen y cuáles no

| Existe | No existe | Por qué |
|---|---|---|
| `text-text-muted`, `bg-action-primary-bg`, `border-border-default` | `text-gray-500`, `bg-red-500`, `bg-blue-200` | Solo los colores semánticos del sistema |
| `text-label-md` (14/20/500), `text-heading-metric` (28/36/600)… | `text-sm`, `text-lg`, `text-3xl` | Un text style de Figma = una clase con tamaño, interlineado y peso |
| `rounded-sm` (6), `rounded-md` (8), `rounded-lg` (12), `rounded-full` | `rounded-xl`, `rounded-2xl` | Los radios de Figma, con sus valores |
| `p-5`, `gap-3`, `p-1.5` | — | El espaciado de Tailwind ya es N × 4px, igual que `space/N` en Figma |

**Lo que no está restringido:** `p-7` existe aunque Figma no tenga `space/7`. Eso se controla en la revisión.

---

## 8. Las decisiones técnicas (ADR), en criollo

Un ADR (*Architecture Decision Record*) es una decisión por archivo: contexto, opciones que se consideraron, qué se eligió y qué cuesta. No se edita; si la decisión cambia, se escribe uno nuevo.

| ADR | Decisión | Por qué, en una frase | Qué cuesta |
|---|---|---|---|
| **0001** | Next.js + React + TypeScript + Tailwind v4 | Es el stack que piden los puestos, publica en Vercel sin configurar nada, y Tailwind v4 lee los tokens desde CSS. | Next.js 16 cambió APIs: el agente tiene que leer la documentación local antes de programar. |
| **0002** | Tokens con los nombres de Figma y solo el sistema en el tema | Un color o radio fuera del sistema no genera CSS y salta en la revisión. | Clases que repiten palabras (`bg-bg-surface`); cada token nuevo se crea primero en Figma. |
| **0003** | Figma Console MCP para leer y escribir Figma | El MCP oficial en Starter da 6 llamadas por mes y no escribe; Console MCP es gratis y sin límite. | Necesita Figma Desktop abierto; sin Code Connect, el mapeo Figma ↔ código se documenta a mano. |
| **0004** | Repo propio | Historial, PRs e issues limpios, y un link para compartir. | Las skills del curso no viven en este repo; lo que el proyecto necesita está en su `CLAUDE.md`. |
| **0005** | Datos ficticios y sin backend en v1 | Los datos reales son privados; todo lo demás funciona igual. | La capa de datos se escribe para que después se pueda enchufar una fuente real sin tocar la interfaz. |
| **0006** | Acciones con backend completas, sin guardar | El producto se ve y se comporta como uno real, flujos incluidos. | Al confirmar no pasa nada con los datos; la demo avisa que son ficticios. |

---

## 9. Cómo se trabaja con un agente en este repo

Se trabaja por **slices**: un pedazo chico con un resultado que se ve y un "done when". Un slice = un issue = una branch = un PR.

1. **El agente lee primero:** `CLAUDE.md`, el issue, el estado, los pendientes, los ADR y el nodo de Figma.
2. **Plan antes de código, y espera mi aprobación.** Responde: resultado observable, qué entra y qué queda afuera, estados, evidencia de Figma, decisiones ya aprobadas, supuestos con su riesgo, qué se reutiliza, extiende, crea o queda interno, tokens, archivos, qué es ficticio, verificaciones y decisiones de producto abiertas (esas me las pregunta). Si la duda es de layout, primero muestra wireframes en ASCII.
3. **Implementa solo lo aprobado.** Si el plan tiene que cambiar el resultado, pregunta antes; un cambio técnico menor lo anota en el PR.
4. **Checks:** `npm run lint` y `npm run build`.
5. **Verificación con evidencia:** mide en el navegador contra Figma y marca cada control como PASS, FAIL, UNVERIFIED u OUT OF SCOPE. Lo que no se probó es UNVERIFIED, nunca PASS.
6. **Cierra:** actualiza `CURRENT_STATE` y `PENDING_TASKS`; si hubo una decisión de arquitectura, escribe un ADR. No hay cierre con un FAIL.
7. **Frena:** no empieza el siguiente slice hasta que yo mergeo y se lo pido.

**El camino de cada cambio por Git (desde la 5.4):**

```
issue #N  →  branch tipo/N-tema  →  commits (uno por intención)  →  PR con "Closes #N"  →  yo reviso y mergeo  →  el #N se cierra solo
```

- **Siempre sale de un issue.** Si no existe, el agente lo crea antes de la branch.
- **Una branch por issue.** Lo que aparece en el camino y no es del pedido va a otro issue.
- **El agente lee el diff antes de cada commit** y abre el PR con la plantilla completa.
- **El agente no mergea.** El merge es mío, después de leer *Files changed*.
- **`main` no acepta nada que no venga de un PR**, así que esto no depende de que alguien se acuerde.

---

## 10. Estado hoy y lo que sigue

**Hecho y verificado:** proyecto creado, tokens del sistema en el tema, Inter, `lang`, metadata, página `/tokens`, documentación para agentes, el flujo de equipo (issues, `main` protegido, plantillas de PR e issue) y el aviso de datos ficticios en todas las pantallas (#20).

**El backlog está en GitHub Issues:** https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues (el orden de trabajo, en `docs/PENDING_TASKS.md`).

**Lo que sigue, y en qué clase del curso:**

| Clase | Qué se suma al dashboard |
|---|---|
| 5.6 | Revisar implementaciones |
| 6.1–6.4 | Componentes del sistema en código (`Icon`, `Button`, `MetricCard`, `StatusBadge`) con variantes, accesibilidad y Storybook |
| 5.7 | Pantallas de Gurises Unidos en Figma + slice 1: el shell (sidebar, barra superior, tabs) |
| 5.8 | Slice 2: los indicadores de alcance + deploy de preview en Vercel |
| 5.9 | Una pantalla diseñada directo en código, sin pasar por Figma |
| 6.5–6.11 | Dark mode, docs del design system, mapeo Figma ↔ código, skills del agente |
| 8.1–8.6 | Tabla, filtros, búsqueda, los 6 estados, accesibilidad en runtime, responsive y performance |

**Desde la 5.6, Impeccable** (impeccable.style) revisa y mejora el diseño en cada slice. `critique` y `audit` corren al cerrar cada slice de UI, y los hooks revisan cada cambio mientras el agente edita. Puede mejorar el sistema, pero no saltearlo: lo que cambia el estilo se vuelve token, primero en Figma.

**Pendiente de producto:** el set de datos ficticios (#6: cuántos proyectos y años, nombres y estados). **Antes del primer deploy:** el favicon (#16). **Deuda conocida:** números tabulares en `heading/metric` (#5), el token del Button al apretar (#14), el dark mode (#11), los SVG del aviso que pasan a `Icon` (#12) y su X, que pasa a `Button` con un segundo uso (#3).

---

## 11. Preguntas que te pueden hacer, con la respuesta

**¿Por qué Tailwind y no CSS común?**
Porque los tokens de Figma pasan al tema y se vuelven clases. Con el tema limitado al sistema, lo que no está en Figma no existe en el código, y eso se ve en cualquier revisión. Es también el estándar de los equipos que usan Next.js.

**¿Por qué las clases dicen `text-text-muted`? ¿No es un error?**
Es a propósito. `text-` es la propiedad (Tailwind lo pone según dónde se usa el color) y `text-muted` es el token de Figma `color/text/muted`. Preferí que el nombre sea el mismo de Figma a la clase antes que una clase más corta. Está en el ADR 0002.

**¿Por qué no nombraste los tokens de Figma como clases de Tailwind?**
Porque el prefijo se duplicaría (`text-text-text-muted`), se perderían las carpetas del panel de variables y el archivo de Figma quedaría atado a una herramienta de CSS.

**¿Cómo te asegurás de que el código respeta el diseño?**
Midiendo, no a ojo: `getComputedStyle` en el navegador contra los valores de Figma, en los anchos de cada frame. Cada control queda en un ledger con PASS, FAIL, UNVERIFIED u OUT OF SCOPE.

**¿Qué hiciste para que la IA no rompa el sistema?**
Tres cosas. El tema solo tiene el sistema, así que un color de afuera no genera nada. El repo tiene un `CLAUDE.md` con las reglas y su porqué, más el estado y las decisiones en `docs/`. Y lo probé: una sesión nueva sin contexto propuso un cambio con tokens del sistema, citando la decisión correcta y sin inventar textos.

**¿Por qué datos ficticios? ¿No le resta realismo?**
Los datos reales de la ONG son privados. Los ficticios tienen la misma estructura, y filtros, búsqueda, tabla y estados funcionan igual. La capa de datos está separada para enchufar una fuente real sin tocar la interfaz.

**¿Qué pasa cuando apretás "Nuevo proyecto"?**
El flujo está completo (formulario, validación, estados), pero al confirmar no se guarda nada. Lo decidí para que el producto se vea y se comporte como real sin sumar backend ni login en esta versión (ADR 0006).

**¿Por qué el alcance va primero y no el impacto?**
Porque es lo que piden los donantes y lo que la ONG puede medir hoy. La interfaz dice "alcance" y no sugiere impacto, que es otra cosa y no se mide.

**¿Qué aprendiste de la primera versión?**
Que el texto secundario no cumplía contraste (2,56:1; se corrigió a 4,74:1), que el reintento tiene que mantener el mensaje de error visible, y que un botón sin flujo detrás confunde. En v2 el gris de texto secundario ya parte de 7,56:1.

**¿Cómo trabajás con Git si estás solo en el proyecto?**
Como en un equipo. Cada cambio sale de un issue, va en su branch y entra por un PR que reviso antes de mergear. `main` está protegido, así que ni yo ni el agente podemos escribir ahí directo. Con un agente esto importa más: el PR es donde veo el diff y la evidencia antes de que el cambio exista en `main`.

**¿Qué tiene que tener un buen PR?**
Qué cambia y por qué, qué issue cierra, qué quedó afuera a propósito, las diferencias intencionales con Figma, la evidencia (checks, capturas y un ledger con lo verificado y lo que no) y cómo probarlo. Está en la plantilla del repo, así todos los PRs, también los del agente, tienen la misma forma.

**¿Por qué squash merge?**
Para que `main` tenga un commit por cambio, con el número del PR. Si algo se rompe, encuentro qué PR lo trajo y leo ahí el porqué y la evidencia.

**¿Cómo organizás el backlog?**
En GitHub Issues: milestones por etapa (sistema, dashboard) y labels por tipo, incluido uno para lo que espera una decisión de producto. Cada issue tiene un "done when" que se puede comprobar. Lo que sale de un comentario de Figma se vuelve un issue con el link al comentario.

**¿Cómo trabajás con un agente sin perder el control?**
Por slices. Cada cambio es chico y tiene un "done when". Antes del código, el agente me presenta un plan: qué se va a ver, qué queda afuera, los estados, qué reutiliza y qué crea, los supuestos y las decisiones que son mías. Yo lo apruebo. Al final abre un PR con un ledger de lo que verificó y lo que no, y yo mergeo. Son dos puntos de control: el plan y el merge. Y frena después de cada slice, así nunca reviso cuarenta archivos de golpe.

**¿Qué es un wireframe en ASCII y para qué lo usás?**
Un boceto en texto. Antes de abrir Figma, el agente me muestra dos o tres opciones de dónde va cada cosa, con lo que gana y lo que pierde cada una. Para el aviso de datos ficticios fueron tres. Una no cumplía el issue, porque en mobile quedaba escondida, y se descartó en un minuto, sin diseñar nada. Sirve para la estructura, no para el craft: eso es Figma y el navegador.

**¿Por qué el aviso de datos ficticios no aparece y desaparece al recargar?**
Que lo cerraste vive en tu navegador y el servidor no lo sabe. Si lo ocultara React después de cargar, se vería un instante y la página saltaría 40px. Un script mínimo lo oculta mientras el navegador lee el HTML, antes de pintarlo. Es el patrón que documenta Next.js, y la página sigue siendo estática.

**¿Cómo sabe el agente qué color usar en algo nuevo?**
Si hay Figma, lo lee del nodo: cada capa tiene su variable. Si no hay, lo deduce del nombre del token, y ahí puede elegir distinto en cada sesión. Me pasó con los íconos: no hay un gris para íconos y se usa el de texto. La solución es una guía de uso para cada token, con cuándo sí y cuándo no, en Figma y en el repo, y que el agente la lea antes de elegir. Los tokens de componente ayudan dentro de un componente, pero no en uno nuevo.

**¿Qué es un ADR y por qué los usás?**
Un archivo por decisión, con contexto, alternativas y consecuencias. Responde "¿por qué está hecho así?" sin depender de quien lo decidió, y le dice al agente qué no reabrir.

---

## 12. Glosario

| Término | Qué es |
|---|---|
| **Next.js** | El marco que convierte componentes de React en una web: páginas, URLs, servidor local y armado para publicar. |
| **App Router** | El sistema de rutas de Next.js: cada carpeta de `app/` con un `page.tsx` es una URL. |
| **Tailwind** | Clases ya hechas que hacen una sola cosa cada una (`p-5` = padding 20px) y se combinan en el elemento. |
| **`@theme`** | El bloque de `globals.css` donde cada variable se vuelve clases de Tailwind. |
| **Token primitivo / semántico** | Primitivo: cómo se ve (`gray/600`). Semántico: para qué sirve (`color/text/muted`). Los componentes usan semánticos. |
| **Text style** | Tamaño, interlineado y peso juntos; en código, una clase (`text-label-md`). |
| **MCP** | El protocolo con el que un agente lee y escribe en otra herramienta (acá, Figma). |
| **ADR** | *Architecture Decision Record*: una decisión por archivo. |
| **Slice** | Un pedazo chico y completo del producto (por ejemplo, el shell) que se planifica, implementa y verifica de una vez. |
| **Wireframe en ASCII** | Un boceto hecho con caracteres de texto para decidir dónde va cada cosa antes de Figma o del código. |
| **Hidratación** | Cuando React toma el HTML que mandó el servidor y le agrega la interacción en el navegador. Si el HTML y lo que React espera no coinciden, avisa con un error. |
| **Ledger** | La lista de controles de un slice, cada uno con PASS, FAIL, UNVERIFIED u OUT OF SCOPE y su evidencia. |
| **Lint / build** | Lint revisa errores comunes en el código; build arma la versión de producción (lo que corre Vercel). |
| **Branch / PR / issue** | Línea de trabajo aparte / pedido de revisión antes de sumar a `main` / tarea numerada en GitHub. |
| **Milestone / label** | Agrupan issues: el milestone por etapa (qué tiene que estar para cerrarla), el label por tipo de tarea. |
| **`Closes #N` / `Refs #N`** | En un PR: `Closes` cierra el issue al mergear; `Refs` lo menciona sin cerrarlo. |
| **Squash merge** | Todos los commits de la branch entran a `main` como uno solo, con el título y el número del PR. |
| **Ruleset** | Reglas de GitHub sobre una branch; acá, que a `main` solo se llegue con un PR. |
| **`gh`** | GitHub CLI: issues, PRs y configuración del repo desde la terminal. |
