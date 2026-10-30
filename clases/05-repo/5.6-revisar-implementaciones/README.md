# Clase 5.6: Revisar implementaciones

**Objetivo:** revisar lo que hace un agente con tres preguntas, no con una:

1. ¿Es igual a Figma? Eso lo responde el ledger (5.5).
2. ¿El código es confiable? Lo responden las señales de alarma (esta clase, parte 1).
3. ¿El diseño está bien? Lo responde Impeccable (esta clase, parte 2).

**Material:**
- Esta guía.
- El PR que se revisa: [#24 Add the fictitious data notice to every screen](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/pull/24) (el `DemoNotice`, de la 5.5).
- Guía *De Figma a código con IA*, §16 (señales de una implementación poco confiable) y §17 (verificación).
- [Impeccable](https://impeccable.style/docs).

---

## 1. Las 10 señales de código poco confiable

Son cosas que se ven en un diff sin entender toda la sintaxis. Ninguna prueba sola que el código está mal, pero cada una pide una explicación.

| # | Señal | Cómo se ve en un diff | Por qué importa |
|---|---|---|---|
| 1 | Valores visuales sin token | `bg-[#EAF4FF]`, `gap-[10px]`, `style={{ … }}` | El sistema deja de ser la fuente de verdad. Un cambio en Figma ya no llega acá |
| 2 | Componentes duplicados | Un `Notice.tsx` nuevo cuando ya existe `DemoNotice.tsx`, o el mismo bloque copiado | Se arregla en un lugar y queda roto en el otro |
| 3 | Un archivo enorme con todo junto | 400 líneas con datos, lógica, estilos y pantalla | No se puede revisar ni reutilizar |
| 4 | Estados inventados | Un `loading`, un `pressed` o una animación que no están en Figma ni en el plan | Es una decisión de diseño que nadie tomó |
| 5 | Botones que no son `<button>` | `<div onClick>`, `<span onClick>` | No llegan con Tab, no responden a Enter, el lector no los anuncia |
| 6 | Texto interactivo hecho con `<div>` | Un link o una pestaña sin `<a>` ni `role` | Lo mismo: se ve, pero no funciona para todos |
| 7 | Sin loading, error ni vacío con datos remotos | Solo el caso feliz | La pantalla se rompe la primera vez que algo tarda o falla |
| 8 | `PASS` sin haber hecho la prueba | Un ledger con todo en verde y sin evidencia | El ledger vale solo si cada fila se puede repetir |
| 9 | Cambios ajenos "de paso" | Archivos que no estaban en el plan | Agranda el diff y mete riesgos que nadie pidió |
| 10 | Checks apagados para que dé verde | `ignoreBuildErrors`, `eslint-disable`, `@ts-ignore` | El error sigue ahí, solo que ya no avisa |

**Cómo se usa:** con el diff abierto en *Files changed*, recorrés la tabla de arriba abajo. Cada señal termina en uno de tres resultados:

- **No aparece.**
- **Aparece y está justificada:** tiene motivo escrito, es chica y, si es deuda, tiene issue.
- **Aparece sin justificar:** pedís cambios.

---

## 2. Ejemplo resuelto: el PR #24 (el `DemoNotice`)

El aviso de datos ficticios que mergeaste en la 5.5. Archivos: `components/DemoNotice.tsx` (nuevo), `app/layout.tsx`, `app/globals.css` y los dos docs de estado.

| # | Señal | ¿Aparece? | Por qué |
|---|---|---|---|
| 1 | Valores sin token | No | Todas las clases salen del tema (`bg-bg-accent-subtle`, `text-icon-accent`) o de la escala de espaciado (`py-1.5`, `size-8`). No hay corchetes. El único número suelto es `strokeWidth={1.5}`: es la regla del set `Icon` de Figma (trazo de 1,5px), no un valor nuevo |
| 2 | Duplicados | Sí, justificada | Los dos SVG repiten los mismos 6 atributos: son el componente `Icon`, que todavía no existe en código. Cada uno tiene un comentario y la deuda está en el issue #12. Duplicar sin avisar sería la señal; con issue y fecha de salida, no |
| 3 | Archivo enorme | No | 96 líneas y una sola tarea (el aviso). Texto, lógica y markup están juntos, pero es un componente chico: separarlo lo haría más difícil de leer |
| 4 | Estados inventados | No | `default`, `hover` y `focus` vienen de Figma, y "cerrado" estaba en el plan aprobado. No hay estado al apretar porque falta su token (#14) |
| 5 | Botón que no es `<button>` | No | `<button type="button" aria-label="Cerrar aviso">` |
| 6 | Interactivo con `<div>` | No, aunque lo parece | En `layout.tsx` hay un `<div id="content" tabIndex={-1}>`. No es interactivo: es el lugar adonde va el foco al cerrar el aviso. `tabIndex={-1}` significa "puede recibir foco desde el código, pero no con Tab". La prueba: no tiene `onClick` y no aparece al tabular |
| 7 | Sin loading, error ni vacío | No aplica | No hay datos remotos. Lo equivalente acá es "¿qué pasa si no se puede guardar que lo cerré?", y está resuelto: con el almacenamiento bloqueado, el aviso se cierra igual (está en el ledger) |
| 8 | `PASS` sin prueba | Una fila, a medias | Hay 2 `UNVERIFIED` declarados, bien. Pero la fila "se oculta antes de pintarse" dice `PASS` y su evidencia es "el script va antes del aviso y al final queda oculto". Eso prueba el orden y el resultado final, no el momento en que se oculta. Lo correcto era un título más chico ("el script corre antes del aviso") o `UNVERIFIED`. Lo compensa la fila siguiente (verlo a ojo), que sí quedó `UNVERIFIED` |
| 9 | Cambios ajenos | No | 5 archivos, todos en el plan, también el `#content` del layout |
| 10 | Checks apagados | Sí, justificada | `suppressHydrationWarning` aparece dos veces (en `<html>` y en el `<script>`) y silencia un aviso de React. Vale porque: (a) es el patrón de la guía oficial de Next.js; (b) afecta solo a ese elemento, no a lo que tiene adentro; (c) tiene el motivo escrito al lado. Revisado hoy: no hay ningún `eslint-disable` ni `@ts-ignore`, TypeScript está en modo estricto y `npm run lint` y `npm run build` terminan en 0 |

**Dos cosas que asustan y no son señales:**

- **`dangerouslySetInnerHTML`.** El nombre avisa que mete HTML sin revisar. Es peligroso cuando lo que entra lo escribe una persona: un comentario, un nombre, una URL. Acá entra un texto fijo armado con dos constantes del mismo archivo, así que no hay riesgo. La pregunta es siempre **qué entra**, no cómo se llama.
- **`try { … } catch {}` vacío.** Tragarse un error sin hacer nada suele ser una señal. Acá es a propósito: si no se puede leer el almacenamiento, el aviso se muestra, que es lo seguro. El de `dismiss()` lo explica en un comentario; el de la línea 28, no. **Nit** (detalle menor que no frena el merge): sumarle el comentario la próxima vez que se toque el archivo.

**Veredicto:** aprobable, como se aprobó. Se lleva dos aprendizajes:

- **La evidencia tiene que probar el título de la fila, no algo parecido.**
- **Silenciar un aviso se acepta solo si es puntual, tiene el motivo escrito y sigue una guía oficial.**

---

## 3. El mismo aviso, hecho mal

El mismo pedido ("aviso de datos ficticios que se pueda cerrar"), como lo entregaría un agente sin reglas. Es inventado, para ver las señales juntas.

```diff
+ // components/Notice.tsx
+ export default function Notice() {
+   const [open, setOpen] = useState(true);
+   const [loading, setLoading] = useState(false);
+   if (!open) return null;
+   return (
+     <div className={`flex gap-[10px] bg-[#EAF4FF] px-4 py-1 ${loading ? "animate-pulse" : ""}`}>
+       <p className="text-sm text-gray-700">Demo con datos ficticios.</p>
+       <div className="cursor-pointer" onClick={() => setOpen(false)}>✕</div>
+     </div>
+   );
+ }

  // app/globals.css
- --color-bg-accent-subtle: var(--blue-50);
+ --color-bg-info: var(--blue-50);

  // next.config.ts
+ typescript: { ignoreBuildErrors: true },
```

Y en el PR: *"Accesibilidad: PASS. Responsive: PASS."*, sin evidencia.

| # | Señal | Dónde |
|---|---|---|
| 1 | Valores sin token | `bg-[#EAF4FF]` es justo el duplicado que se unificó en `blue/50` en la 2.2, y `gap-[10px]` no está en la escala (8 o 12) |
| 2 | Duplicado | `Notice.tsx` hace lo mismo que `DemoNotice.tsx`, que ya existe |
| 4 | Estado inventado | `loading` y `animate-pulse`: un aviso con texto fijo no carga nada |
| 5 | Botón como `<div>` | La ✕ es un `<div onClick>`: no llega con Tab ni con Enter y el lector dice "✕" o nada |
| 8 | `PASS` sin prueba | "Accesibilidad: PASS" con un `<div>` clickeable es imposible: no se probó |
| 9 | Cambio ajeno | Renombró `bg-accent-subtle` a `bg-info` "de paso": rompe el nombre de Figma y cualquier otro uso |
| 10 | Check apagado | `ignoreBuildErrors` deja pasar errores de TypeScript a la build |

Más tres problemas que no tienen número pero se ven en la revisión:

- **`text-gray-700` no hace nada.** En este proyecto la paleta de Tailwind está apagada (5.2), así que la clase no existe y el texto hereda el color del `body`. No hay error ni aviso: queda bien de casualidad. **Una clase que no existe falla en silencio.**
- **El texto cambió.** "Demo con datos ficticios." no es el texto aprobado. El texto es producto: lo decidís vos.
- **Cambió el comportamiento.** No guarda que lo cerraste: vuelve a aparecer en cada página. El plan aprobado decía que quedaba cerrado.

**Veredicto:** pedir cambios. Alcanzaba con dos señales para frenarlo: la 5 y la 10.

---

## 4. Impeccable, puesto a punto (issue #27, PR #28)

Impeccable necesita tres cosas para juzgar bien un diseño: qué es el producto, cómo es su sistema visual y un control que revise mientras el agente edita.

| Pieza | Qué es | De dónde sale |
|---|---|---|
| `PRODUCT.md` (`init`) | Para quién es, para qué sirve, qué no se puede inventar, principios | `docs/PROJECT_CONTEXT.md`, los ADRs y el caso de la v1. Lo nuevo se decidió primero ahí |
| `DESIGN.md` + `.impeccable/design.json` (`document`) | Los tokens, cómo se usa cada uno, los componentes y las reglas con nombre | `globals.css` y Figma, leído por el MCP: medidas, variantes y tokens de cada componente |
| El hook | Después de cada edición de UI corre el detector (62 controles de "AI slop") y le avisa al agente; al terminar cada turno hace una pasada completa | `.impeccable/config.json` |

**La regla que ordena todo:** los dos archivos son **copias derivadas**, no fuentes de verdad. Si Figma o `globals.css` cambian, se regeneran, y `impeccable doctor` avisa cuando quedaron viejos. Si no coinciden, ganan Figma y `globals.css`.

**Decidiste (producto):**

- **Voz:** voseo uruguayo. Instrucciones con vos ("Elegí un año"), botones en infinitivo ("Cargar métricas") y mensajes en nosotros ("No pudimos cargar los datos").
- **Marca:** sin marca por ahora. Solo el nombre en texto: no se inventa un logo.
- **Uso:** herramienta interna. Los donantes no ven la pantalla.
- **Sistema visual:** la idea guía es "The Honest Count" (cada número dice solo lo que mide) y el carácter, "sereno y preciso".

**Lo que apareció al probarlo:** el hook estaba prendido y no avisaba. La causa es que Impeccable revisa solo los archivos que están dentro de la carpeta donde se abrió la sesión. Nuestras sesiones se abren desde el curso y el dashboard está en otra carpeta, así que su registro decía `skipped: outside-project`.

Se resolvió con un "puente" en el curso (`.claude/settings.json` + `.claude/hooks/impeccable-dashboard.py`): le pasa cada evento a Impeccable como si la sesión estuviera en el dashboard. Para probarlo, Claude escribió un componente con texto en degradé y el hook lo marcó (`gradient-text`, línea 4). Después se borró.

**Lo que se aprende de esto:** "está activado" no es evidencia. La evidencia es verlo fallar a propósito y que avise.

## 5. Impeccable revisando el aviso y `/tokens` (issue #29, PR #32)

### Cómo trabaja `critique`

Hace dos revisiones **separadas**, una sin ver a la otra:

- **A, diseño:** mira la pantalla como un director de diseño. Usa las 10 heurísticas de Nielsen, la carga cognitiva y personas que fallan en algo concreto.
- **B, evidencia:** corre el detector (62 controles de "AI slop") y mide en el navegador.

Van separadas para que el resultado del detector no condicione el juicio de diseño. Las dos se juntan recién al final.

### Resultados

| | Aviso | `/tokens` |
|---|---|---|
| `critique` (heurísticas) | 17/28, aceptable | 16/28, aceptable |
| Detector | 0 hallazgos | 2, los dos falsos positivos |
| `audit` (técnico, los dos juntos) | 16/20, bueno | |

Los dos falsos positivos del detector, con su motivo:

- **"Bajo contraste" en el gris de deshabilitado:** ese token es solo para estados deshabilitados, y esos no tienen que cumplir contraste.
- **"Una sola tipografía":** es una decisión del sistema (`DESIGN.md`), no un error.

**Un detector limpio no es un buen diseño.** En el aviso no encontró nada; todo lo valioso salió de la revisión A.

### Lo que encontró, y qué se hizo con cada cosa

| Hallazgo | Prioridad | Qué decidiste / qué se hizo | Comando |
|---|---|---|---|
| El aviso se apaga para siempre con un clic, y choca con "la demo es honesta" | P1 | Se sigue cerrando, y queda una marca fija "Datos ficticios" en la barra superior. Va con el slice 1 (#30) | `harden` |
| El texto no dice que lo que se carga no se guarda (el ADR 0006 lo pide) | P2 | "Demo con datos ficticios: no son cifras reales de Gurises Unidos y lo que cargues no se guarda." | `clarify` |
| La franja casi no se distingue del blanco (1,09:1) | P2 | Borde de 1px con el token nuevo `color/border/accent` (blue/200), primero en Figma | `polish` |
| Para el lector de pantalla, "Aviso, complementario" | P3 | Región "Aviso de datos ficticios" (técnico: lo decidió Claude) | `audit` |
| `/tokens`: sin valores, 21 colores sin agrupar, títulos en inglés, texto de muestra de otro proyecto | P2 | Ahora: títulos en español y muestra de Gurises. Lo demás va a la 6.1 (#31) | `clarify`, `layout`, `typeset` |
| Sin JavaScript, la X no hace nada | P3 | Aceptado: los filtros y los flujos tampoco andan sin JavaScript, y el aviso igual se ve | `harden` |

**Qué es cada comando:**

- **`polish`** es la pasada final: alineación, bordes, estados y consistencia.
- **`harden`** pregunta qué pasa cuando algo falla o se usa raro (una compu compartida, sin JavaScript, sin almacenamiento).
- **`clarify`** revisa los textos: qué pasó, qué importa y qué hacer.

### Ledger vs. Impeccable

| Lo vio el ledger (5.5) | Lo vio Impeccable |
|---|---|
| Medidas iguales a Figma, hover, teclado, que siga cerrado al recargar, almacenamiento bloqueado, consola | Que cerrarlo para siempre contradice un principio del producto |
| Contraste del texto y de la X | Que la franja casi no se ve contra el fondo |
| El script que lo oculta antes de pintarse | Que el texto no cumple lo que promete el ADR 0006 |

**El ledger prueba que se construyó bien; Impeccable pregunta si se construyó lo correcto.** Hacen falta los dos.

### Lo que también pasó

- **El hook revisó cada cambio real** del código (el aviso, `globals.css`, `/tokens`) sin hallazgos, y avisó que `design.json` había quedado más viejo que `DESIGN.md`.
- **Claude encontró un error propio en `DESIGN.md`:** faltaba `space/0-5`. La revisión A lo vio por su lado.
- **Cambio de proceso, pedido tuyo:** primero un PR por clase y no uno por cosa (fue el #32). Al cerrar, sin PRs: Claude pushea directo a `main` cada slice cerrado, con el ledger en el commit. `main` sigue sin aceptar force push ni borrado. Los slices siguen siendo chicos y se ven por commit.
