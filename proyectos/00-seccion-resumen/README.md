# Sección "Resumen"

Sección de un dashboard implementada en HTML y CSS a partir de un archivo de Figma preparado para IA (clases 2.5 y 2.6).

- **Fuente de diseño:** Figma "Design Engineer Journey" › `05 - Screens` › Section `Resumen` (ready for dev).
- **Leída con:** Figma Console MCP (frames, variables, text styles, componentes y anotaciones).
- **Sin dependencias:** HTML, CSS y un JavaScript chico solo para el control de demo.

## Archivos

| Archivo | Qué tiene |
|---|---|
| `index.html` | La sección. Las clases repiten los nombres de capa de Figma. |
| `tokens.css` | Variables de Figma → custom properties (primitivos + semánticos). |
| `styles.css` | Reset, text styles, Icon, Button, StatusBadge, MetricCard y la sección. |
| `demo.js` | Control "Demo" para ver los estados. No es parte del diseño. |

## Verificación (2026-10-29)

Chrome headless, a 1280 / 700 / 375 / 320 px, comparado con capturas de Figma a escala 1.

| Control | Estado | Evidencia |
|---|---|---|
| Columnas 4 → 2 → 1 | PASS | 4 a 1280, 2 a 700, 1 a 375 y 320 |
| Sin scroll horizontal | PASS | `scrollWidth` ≤ viewport en los 4 anchos |
| Alto de la sección = Figma | PASS | 334 desktop y 988 mobile, igual que los frames |
| Card 194px en todos los estados | PASS | default, loading y error miden 194 (sin datos previos: 162, sin la fila de tendencia) |
| Espaciado | PASS | padding 32 / 16, header → métricas 24, grilla 16, card 20 con gap 12 |
| Tipografía | PASS | los 6 text styles medidos (tamaño, peso, interlineado) e Inter cargada |
| Colores desde tokens | PASS | ningún hex en `styles.css`; colores calculados = tokens de Figma |
| Header mobile | PASS | columna debajo de 640px; "Exportar" a ancho completo (343 a 375px) |
| Teclado | PASS | Tab: control de demo → "Exportar" con anillo de 2px `focus/ring`; en Cargando, Tab saltea el botón |
| Estados | PASS | loading (skeleton + `aria-busy`), error parcial (solo Ingresos), sin datos previos |
| Semántica | PASS | `section` nombrada por su `h2` ("Resumen, proyecto Activo"), 4 `h3`, `button`, íconos `aria-hidden` |
| Consola | PASS | sin errores ni avisos |
| Números tabulares | PASS, con diferencia conocida | La anotación los pide; el text style de Figma no los tiene activados, así que en la página los números salen un poco más anchos que en la captura de Figma |
| Lector de pantalla real | UNVERIFIED | No se probó con NVDA; se revisaron los textos ocultos y los nombres en el HTML |
| Exportar real, cambiar período | OUT OF SCOPE | Anotado en Figma |
| Estado al apretar (`:active`) del secondary | OUT OF SCOPE | Falta el token `color/action/secondary/bg-pressed` en Figma |
