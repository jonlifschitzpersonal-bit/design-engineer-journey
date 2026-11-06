# Guion de la presentación — Dashboard de Gurises Unidos

> Para decir mientras pasás las 10 slides (unos 10–12 minutos). El mismo texto está como notas del orador en cada slide del artifact: https://claude.ai/artifact/CfoUgSzUCbQiKSoChy7Pm7
> Cada slide trae lo que se dice, la **transición** a la siguiente y, cuando sirve, un **"si preguntan"**.
> Datos tomados de `PROGRESO.md` y `DASHBOARD-GURISES-UNIDOS.md` (hasta la clase 6.3).

---

## 1 · Portada (30 s)

Hola, soy Jonathan. Vengo del diseño de producto y hoy estoy armando el perfil de design engineer: alguien que diseña el sistema y también lo lleva al código. Les quiero mostrar un caso real, no un ejercicio: el dashboard de Gurises Unidos, una ONG uruguaya. Van a ver cómo un diseño en Figma llega al navegador sin perder nada en el camino, y cómo trabajo con agentes de IA sin perder el control. Son diez pantallas, y después con gusto profundizo en lo que quieran.

**Transición:** arranco por el problema, porque todo parte de ahí.

## 2 · El problema (1 min)

El cliente es Gurises Unidos, una ONG uruguaya que trabaja con niñas, niños, adolescentes y sus familias. Su problema era muy concreto: los datos de los proyectos vivían en muchos Excel, cada uno con varias hojas y sin estructura común. Y cada año había que armar el informe para los donantes, o sea, reconstruir la foto del año a mano.

La solución es un dashboard que junta todo en una sola vista: primero el alcance, que es el número que piden los donantes, y después familias, docentes y proyectos activos. Decisión de producto importante: el alcance mide alcance, no impacto, y la interfaz no puede sugerir otra cosa.

En pantalla está el dashboard publicado, la v1: arriba el alcance, que ocupa toda la fila; después familias, docentes y proyectos activos; y abajo la tabla de proyectos, con filtros por año y departamento. Los datos de la demo son ficticios porque los reales son privados.

**Si preguntan: "¿Por qué datos ficticios?"** Porque los reales son privados. Filtros, búsqueda y estados funcionan igual, y la demo lo avisa en una franja arriba de todas las pantallas.

**Transición:** este proyecto no es nuevo, ya lo había hecho una vez. Veamos qué cambió.

## 3 · De la v1 a la v2 (1 min)

La primera versión la hice como freelance, en React con Storybook. Esta la rehice entera.

- **Stack:** pasa a Next.js 16, TypeScript y Tailwind v4, lo que piden los puestos de design engineer.
- **Tokens:** antes los copiaba a mano de Figma; ahora se generan desde Figma, con controles.
- **Figma ↔ código:** en vez de Code Connect, que requiere un plan que no tengo, un mapeo documentado y verificado.
- **IA:** antes trabajaba en tres etapas; ahora el repo está preparado para que cualquier sesión del agente arranque sabiendo reglas, estado y decisiones.
- **Acciones con backend:** antes eran botones vacíos; ahora son flujos completos que no guardan.

**Si preguntan: "¿Por qué rehacerlo?"** Un caso real con cliente y problema pesa más que uno inventado, y rehacerlo muestra el salto de nivel.

**Transición:** veamos el corazón, el sistema de diseño en Figma.

## 4 · El sistema en Figma (1 min)

Esto lo hice antes de escribir una línea de código. Tiene tres capas.

1. **Tokens en dos niveles.** Los primitivos son la paleta (gris 600, azul 200). Los semánticos dicen para qué sirve cada color (texto secundario, fondo de la acción principal). Los componentes usan solo semánticos: si cambia un color, cambia en un solo lugar.
2. **Componentes con variantes.** En pantalla, el Button: 24 variantes, que salen de multiplicar variante, tamaño y estado.
3. **Anotaciones.** Cada componente tiene notas que dicen qué tiene que pasar con el teclado, con el lector de pantalla o en mobile. Un agente, o una persona nueva, las lee y no adivina.

Un agente lee la estructura del archivo, no una imagen: los nombres de las capas pasan casi directo al código.

**Transición:** ahora, cómo llegan esos colores y medidas al código sin copiarlos a mano.

## 5 · Tokens generados, no copiados (1,5 min)

Los tokens no se copian: se generan.

1. Figma es la única fuente.
2. Un agente exporta las variables por MCP a un JSON en formato **DTCG**, el estándar del W3C, así que no queda atado a ninguna herramienta.
3. **Style Dictionary**, la herramienta estándar para compilar tokens, lo convierte en el CSS que lee Tailwind (`npm run tokens`).
4. El build tiene **controles**: frena si un nombre no coincide con Figma, si un semántico no apunta a un primitivo, si el espaciado no sigue la escala. Probé cada control rompiéndolo a propósito.

Ejemplo, a la derecha: `color/text/muted` en Figma apunta a `--gray-600` en el CSS generado, es la clase `text-text-muted` en el código y termina en `#4b5563`. El mismo nombre de punta a punta.

Lo aclaro porque es honesto: es un **mapeo con control, no una sincronización**. El código se entera de un cambio en Figma cuando alguien exporta. Con el plan Starter la API de variables no se puede usar desde CI.

**Si preguntan: "¿Por qué no Tokens Studio?"** Habría sido otro plugin y otro formato al lado de las variables nativas de Figma.
**Si preguntan: "¿Por qué las clases repiten palabras (`bg-bg-surface`)?"** El prefijo lo pone Tailwind según dónde se usa; el resto es el nombre de Figma. Preferí un solo nombre de punta a punta antes que una clase más linda.

**Transición:** con los tokens resueltos, los componentes.

## 6 · Misma API en Figma y en código (1,5 min)

Cada propiedad de Figma es una prop en código, con el mismo nombre y los mismos valores. Arriba, la MetricCard en Figma con sus estados (tendencia arriba, abajo, neutra, cargando, error). Abajo, las tarjetas de métricas del dashboard publicado, cada una con su variación contra el año anterior: el mismo componente, funcionando con datos.

El Button de Figma tiene 24 variantes y en código son dos props: `variant` y `size`. Hover, foco y apretado los maneja el navegador con CSS, y `disabled` es el atributo nativo. Para armar las variantes uso `cva`, que es el component set de Figma escrito como una tabla con tipos. De shadcn/ui tomé la forma de armar la API, no los componentes, porque traen su propio diseño.

Un detalle: el booleano `showTrend` de Figma desapareció en código. Si pasás la tendencia, se ve, y TypeScript no deja pasar solo la mitad.

**Si preguntan: "¿Cómo sabés que coincide con Figma?"** Medí en Chrome: botones de 40 y 32 px, tarjetas de 194 px, colores por variante; todos los colores son tokens.

**Transición:** un componente que se ve bien todavía no está terminado. Falta accesibilidad.

## 7 · Accesibilidad (1,5 min)

Un componente accesible cumple cuatro cosas: el elemento correcto, un nombre, teclado y foco. Y respeta los modos del sistema, como movimiento reducido y colores forzados.

El caso más lindo es el **alto contraste de Windows**: cambia todos los colores por los del sistema y borra fondos y sombras. Lo que se dibujaba con un relleno desaparece: el botón primario, el borde del secundario, los skeletons, la píldora del badge. La solución es un **contorno de 1 px que aparece solo en ese modo**. No ocupa lugar, así que nada cambia de tamaño, y Windows le pone su color. Lo verifiqué emulando ese modo en Chrome. A la derecha, el Button en Figma con su tarjeta de anotaciones: ahí quedó escrito qué pasa en alto contraste, qué oye el lector cuando el botón carga y que conserva el foco.

Otra decisión: el botón dice que está ocupado, pero el resultado ("Guardado", "No se pudo guardar") lo anuncia la pantalla en una zona de estado, porque solo ella sabe si salió bien o mal. Quedó escrito como ADR 0009.

Una sorpresa: al revisar, encontré que cualquier página con una tarjeta cargando tenía scroll horizontal. Un título oculto medía el ancho de la ventana. Había medido la tarjeta y no la página.

**Lo que no probé:** un lector de pantalla real todavía. Está anotado como pendiente (issue #39).

**Si preguntan: "¿Por qué no Radix?"** Estos componentes no lo necesitan: el `<button>` nativo ya trae teclado y foco. Radix o Base UI entran cuando haya modal o tabs, que tienen patrones de teclado propios.

**Transición:** ¿y cómo trabajo todo esto con agentes de IA?

## 8 · Trabajar con agentes (1,5 min)

Trabajo por **slices**: un pedazo chico con un resultado que se ve y un criterio de "terminado".

1. Todo cambio sale de un **issue** en GitHub.
2. El agente propone un **plan** y yo lo apruebo antes de que escriba código. Responde qué entra, qué queda afuera, qué estados hay y qué es ficticio; las decisiones de producto me las pregunta a mí.
3. Implementa solo lo aprobado, con lint y build.
4. Verifica con **evidencia**: midiendo en el navegador contra Figma.
5. Sube el slice cerrado a `main` con el ledger en el commit, y frena. No empieza el siguiente hasta que se lo pido.

Abajo, el primer slice completo: el aviso de datos ficticios. Elegí entre tres wireframes, aprobé el diseño en Figma, aprobé el plan y revisé el resultado.

Para que cualquier sesión del agente arranque sabiendo todo, el repo tiene `CLAUDE.md` (reglas), `CURRENT_STATE` (lo hecho y verificado) y nueve ADR, una decisión por archivo, que no se editan: si cambia la decisión, se escribe otra.

**Si preguntan: "¿Por qué ya no usás pull requests?"** Con una sola persona, mergear era un paso sin revisión real. El control quedó en el plan aprobado, el ledger y un historial que no se puede reescribir: `main` no acepta force push ni borrado. Un PR solo si lo pido.

**Transición:** el ledger me lleva a la pregunta clave: cómo sé que está bien.

## 9 · ¿Cómo sé que está bien? (1,5 min)

Cuando una IA escribe el código, la pregunta no es "¿compila?" sino "¿cómo sé que está bien?". La separo en tres.

1. **¿Es igual al diseño?** Lo responde el **ledger**: medidas reales en el navegador, comparadas con Figma. Cada fila es PASS, FAIL, UNVERIFIED u OUT OF SCOPE.
2. **¿El código es confiable?** Diez señales que se ven en un diff sin leer toda la sintaxis: valores sin token, duplicados, un `div` que hace de botón, estados inventados, un PASS sin prueba, checks apagados.
3. **¿El diseño está bien?** El ledger prueba que se construyó bien; una revisión de diseño con **Impeccable** evalúa si se construyó lo correcto. Por ejemplo, encontró que las muestras de `/tokens` usaban colores de acción, justo lo que las notas de la misma página prohíben. Después de corregir, subió de 16 a 21 sobre 28.

En el mini ledger de abajo, fíjense en la última fila: lo que no probé figura como **UNVERIFIED, nunca como PASS**. La honestidad sobre lo que no se verificó es parte de la calidad.

**Si preguntan: "¿Cómo sabés que el código de la IA está bien?"** Con esas tres preguntas, no con confianza.

**Transición:** para cerrar, lo que aprendí y lo que sigue.

## 10 · Cierre (1,5 min)

Tres sorpresas que me enseñaron más que los aciertos.

1. **Casi bien no es bien.** Tailwind trae `rounded-lg` de 8 px y en Figma es de 12. Si no lo redefinís, la clase existe con otro valor y se ve "casi bien". Solo aparece midiendo. Por eso el tema tiene únicamente el sistema.
2. **Medir la página, no solo el componente.** Una tarjeta cargando empujaba toda la página de costado.
3. **Probar que el aviso avisa.** Mi revisión automática estaba "activada" y no avisaba, porque ignoraba los archivos fuera de la carpeta donde abrí la sesión. Lo descubrí poniendo un error a propósito.

**Lo que sigue:** Storybook (referencia de componentes y tokens), el shell del dashboard y el primer deploy, dark mode y la prueba con un lector de pantalla real.

Lo que me llevo, y lo que quiero aportar a un equipo: soy diseñador y entiendo por qué se decide cada cosa; ahora también llevo el diseño al código con un sistema verificable, y trabajo con agentes de IA de forma ordenada y auditable. El repo es público: https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard. Gracias, y con gusto respondo preguntas.

---

## Preguntas que pueden hacerte (respuesta corta)

- **¿Qué hiciste vos y qué hizo la IA?** Yo decidí producto (qué se muestra, textos, estados, qué es ficticio), aprobé cada plan y revisé cada resultado. El agente escribió el código y la verificación siguiendo reglas que quedaron en el repo.
- **¿Qué cambiarías?** Probaría antes con un lector de pantalla real, y automatizaría la exportación de tokens si el plan de Figma lo permitiera.
- **¿Qué falta?** El dashboard completo (tabla, filtros, los 6 estados), Storybook, dark mode y el deploy. Hoy está hecho y verificado el sistema: tokens, cuatro componentes más el aviso, y accesibilidad.
- **¿Por qué datos ficticios?** Los reales son privados; todo funciona igual y la demo lo avisa.
