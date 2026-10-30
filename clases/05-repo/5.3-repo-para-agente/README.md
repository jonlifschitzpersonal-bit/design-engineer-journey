# Clase 5.3 — Preparar el repo para el agente

**Objetivo:** que cualquier sesión nueva de Claude Code (o una persona nueva en el equipo) pueda trabajar en el proyecto sin que le expliques nada: qué es, qué reglas sigue, qué está hecho, qué falta y por qué se decidió cada cosa.

**Material:**
- Esta guía.
- El proyecto: `D:\Escritorio\proyectos\gurises-unidos-dashboard` (archivos `CLAUDE.md` y `docs/`).
- Guía *De Figma a código con IA*, §11.

---

## 1. El cambio de producto

En esta clase el dashboard dejó de ser "AI visibility" y pasó a ser el de **Gurises Unidos**, una ONG uruguaya que necesita informar a sus donantes. Es un caso que ya diseñaste y construiste como freelance; esta versión lo rehace con el stack y el sistema del curso, para que quede como un producto casi real y como pieza de portfolio.

Decidiste:

| Decisión | Elección |
|---|---|
| Nombre de la carpeta y del repo | `gurises-unidos-dashboard` |
| De dónde sale el diseño | El archivo de Figma del curso, con el sistema que ya existe más los componentes nuevos (Tabs, Sidebar, tabla, selectores) |
| Datos | Ficticios, con todo funcionando: filtros, búsqueda, tabla y los 6 estados |
| Acciones con backend ("Cargar métricas", "Nuevo proyecto") | Se diseñan y se construyen completas; al confirmar no se guarda nada |

---

## 2. Cada cosa en su archivo, según cuánto cambia

```
CLAUDE.md                  reglas estables para el agente
docs/
├── PROJECT_CONTEXT.md     el producto: cliente, usuarios, pantalla, filtros, estados
├── CURRENT_STATE.md       lo que está hecho y verificado (con evidencia)
├── PENDING_TASKS.md       lo que sigue, decisiones pendientes, deuda
├── adr/                   una decisión por archivo, con un README índice
│   ├── 0001 … 0006
│   └── README.md
└── research/              lo que llevó a cada decisión
```

| Archivo | Qué dice | Cuánto cambia |
|---|---|---|
| `CLAUDE.md` | Comandos, stack, de dónde sale el diseño, reglas de tokens, convenciones, cómo trabajar, qué no tocar | Casi nunca |
| `PROJECT_CONTEXT.md` | Qué problema resuelve, para quién, qué muestra la pantalla, qué filtro afecta a qué, cómo se ve cada estado | Poco |
| `CURRENT_STATE.md` | Lo hecho **y verificado**, con la evidencia | En cada slice |
| `PENDING_TASKS.md` | Próximas tareas, decisiones de producto pendientes, deuda a propósito | En cada slice |
| `docs/adr/` | Decisiones de arquitectura | Se suman, no se editan |
| `docs/research/` | Comparaciones y fuentes | Se suman |

**Por qué separar reglas y estado:** si `CLAUDE.md` dice "falta hacer la tabla", dentro de un mes eso es falso y el agente lo sigue leyendo como cierto. Las reglas se escriben una vez; el estado se actualiza al cerrar cada slice.

### Detalles del `CLAUDE.md`

- **Empieza con `@AGENTS.md`.** Así Claude también lee el aviso que escribe Next.js sobre los cambios de su versión. El `@` importa otro archivo dentro del `CLAUDE.md`.
- **Manda a leer el estado antes de empezar** (`CURRENT_STATE`, `PENDING_TASKS`, los ADR), en lugar de copiarlo.
- **Las reglas de tokens llevan su porqué en una línea**, y el porqué completo está en el ADR. Por ejemplo, "las clases de color repiten palabras a propósito; no las renombres" evita que un agente "corrija" `text-text-muted`.
- **El proceso de trabajo** (plan → aprobación → código → lint y build → ledger → actualizar docs) está escrito en el proyecto. Así no depende de las skills del curso, que en una sesión abierta en esa carpeta no se cargan.

---

## 3. Los ADR

Un ADR (*Architecture Decision Record*) es una decisión por archivo, con contexto, opciones consideradas, qué se eligió y qué cuesta. **No se edita:** si la decisión cambia, se escribe uno nuevo que reemplaza al anterior, así queda la historia de por qué.

| ADR | Decisión |
|---|---|
| 0001 | Next.js + React + TypeScript + Tailwind v4 |
| 0002 | Tokens con los nombres de Figma y solo el sistema en el tema (incluye por qué `text-text-muted`, y la trampa de `rounded-lg` = 8px) |
| 0003 | Figma Console MCP en lugar del MCP oficial (6 llamadas por mes en Starter) |
| 0004 | El proyecto en su propio repo |
| 0005 | Datos ficticios y sin backend en v1 |
| 0006 | Las acciones con backend se construyen completas, sin guardar |

En una entrevista, "¿por qué elegiste X?" se contesta con el ADR: el contexto, las alternativas y lo que se aceptó a cambio.

`docs/research/` tiene dos notas: la comparación de los MCP de Figma en Starter (de ahí sale el ADR 0003) y lo que se aprendió del caso v1 de Gurises Unidos (qué decisiones se mantienen y qué quedó sin medir).

---

## 4. La prueba: una sesión nueva, sin contexto

Desde la carpeta del dashboard se abrió una sesión nueva de Claude Code en modo plan (no puede editar) con un pedido chico y sin explicación:

> "En la home quiero un aviso que diga que los datos del dashboard son ficticios. Proponé cómo lo harías, con el código exacto, pero no edites ningún archivo."

| Control | Resultado | Evidencia |
|---|---|---|
| Leyó el contexto solo | PASS | Citó el ADR 0005 ("The public demo must say the data is fictitious") y `CURRENT_STATE.md` |
| Plan antes de código | PASS | Archivo afectado, por qué no crea un componente, server component, `role="note"` |
| Solo tokens del sistema | PASS | `bg-bg-accent-subtle`, `text-text-default`, `text-body-sm`, `rounded-md`, `px-4 py-3`; sin corchetes |
| No inventó texto ni diseño | PASS | Propuso una sola frase y pidió confirmarla; ofreció esperar a diseñarlo en Figma |
| Separó evidencia de supuesto | PASS | Marcó como UNVERIFIED que no hubiera un aviso en Figma, porque el modo plan no le dejó leerlo |
| Verificación prevista | PASS | Lint, build, `getComputedStyle`, 320px y lector de pantalla |
| Actualizar docs al cerrar | PASS | Propuso tocar `CURRENT_STATE` y anotar la deuda en `PENDING_TASKS` |
