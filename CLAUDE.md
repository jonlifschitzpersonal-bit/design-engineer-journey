# Design Engineer Journey — contexto del proyecto

Repo del curso de Jonathan (product designer → design engineer). Las skills de `.claude/skills/` son **generales y reutilizables**; acá está lo que es propio de este repo y de su archivo de Figma.

## Tutoría
- Al empezar cada sesión, leé `PROGRESO.md` y `PLAN-DE-ESTUDIO.md`. Hablá en español rioplatense (vos).
- Si aplicás una regla de las skills que Jonathan todavía no vio en clase, explicala en una línea simple.
- Lo técnico lo decide Claude y lo explica; a Jonathan se le preguntan solo decisiones de producto.
- Al cerrar cada clase: progreso + bitácora, reglas nuevas a las skills (escritas en forma general; lo específico de este repo va acá), commit en inglés y push.

## Figma
- **Archivo:** "Design Engineer Journey" (fileKey `E8QHJIEO0sSdSqPPDCjNQd`), plan **Starter**.
  - 1 modo por colección: el dark mode va en código.
  - Las anotaciones nativas no se ven sin Dev Mode: cada una va también como nota visible en un frame `annotations`.
  - El MCP oficial da 6 llamadas por mes: se usa **Figma Console MCP** (plugin Desktop Bridge).
- **Páginas:** `00 - Cover`, `01 - Foundations`, `02 - Components`, `05 - Screens`, `99 - Archive`.
- **Variables:** colecciones `Primitives` (modo `value`) y `Semantic` (modo `light`, con code syntax WEB). Espaciado `space/N` = N × 4px (escala de Tailwind), radios `radius/sm|md|lg|full`.
- **Text styles:** `label/md|sm|xs`, `body/sm`, `heading/metric`, `heading/section` (Inter).
- **Íconos:** component set `Icon`, 16×16, trazo de 1,5px, basados en **Lucide**. Las equivalencias de nombre están en la descripción del set (por ejemplo `currency` → `dollar-sign`, `arrow-up` → `move-up`).
- **Componentes:** `Icon`, `Button`, `MetricCard`, `StatusBadge`. Sección `Resumen` en `05 - Screens`.

## Código
- **Breakpoints:** los de Tailwind (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).
- **Tokens en código:** mismos nombres que en Figma, con las barras pasadas a guiones (`color/text/muted` → `--color-text-muted`, `space/8` → `--space-8`).
- **Proyectos publicados:** `proyectos/` (cada uno con su propio proyecto de Vercel y su Root Directory).
