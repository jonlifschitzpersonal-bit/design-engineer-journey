# Clase 2.4 — IA en Figma + Figma Console MCP

**Objetivo:** entender qué lee Claude de tu archivo, cómo pedirle cambios en Figma sin que decida por vos y cómo convertir comentarios en un backlog. Basado en la guía §7 y §8.

En la 2.1, 2.2 y 2.3 Claude ya trabajó en tu archivo por el MCP. Esta clase es para que veas **desde tu lado** cómo funciona ese puente y cómo dirigirlo.

---

## 1. Qué es el MCP, en simple

**MCP** es un enchufe estándar que le permite a un agente (Claude Code) usar herramientas externas. Figma Console MCP es el enchufe para Figma:

```
Claude Code  ⇄  servidor figma-console (en tu compu)  ⇄  plugin Desktop Bridge  ⇄  tu archivo en Figma
               (D:/Escritorio/herramientas/...)          (lo abrís en Figma)
```

Por eso, cuando cerrás el plugin, Claude pierde la conexión (te pasó en la 2.3): el plugin es la puerta de entrada al archivo.

**Lo que el MCP le da a Claude no es una imagen ni código.** Es la estructura: capas, nombres, componentes, propiedades, variables, Auto Layout, anotaciones y comentarios. Con eso, más el repositorio, Claude escribe el código. Por eso todo lo que hiciste en las clases anteriores importa: el MCP solo entrega lo que el archivo tiene.

### Los dos MCP de Figma

| | **Figma Console MCP** (el que usamos) | **MCP oficial de Figma** |
|---|---|---|
| Costo en tu plan Starter | Gratis, sin límite | 6 llamadas por mes |
| Lee estructura, variables, componentes | Sí | Sí |
| Escribe en el canvas | Sí (crear, editar, variables, anotaciones) | No en Starter |
| Cómo se conecta | Plugin Desktop Bridge abierto en Figma | Servidor remoto con login de Figma |

---

## 2. Ejemplo resuelto: lo que Claude ve de tu Button

Esto es un extracto real de lo que devolvió `figma_analyze_component_set` sobre tu Button (simplificado):

```
Button — 24 variantes
Ejes:  variant: primary | secondary | ghost
       size:    md | sm
       state:   default | hover | focus | disabled

Props: label (texto, "Guardar") · showIconStart (booleano) · loading (booleano) · iconStart (instance swap)

Estados → CSS:
  hover    → :hover
  focus    → :focus-visible
  disabled → :disabled, [aria-disabled="true"]

Variante base (primary, md, default): 110×40 · fondo color/action/primary/bg · radio radius/md · texto color/text/default

Solo lo que cambia en cada una:
  primary · hover      → fondo color/action/primary/bg-hover
  primary · focus      → borde color/focus/ring, 2px
  secondary · default  → borde color/action/secondary/border · texto e ícono color/action/secondary/text
  sm (cualquiera)      → 32px de alto · padding space/1-5 / space/3 · radio radius/sm · texto 13px
```

Fijate en tres cosas:

1. **Mapeó solo los estados a CSS.** Pudo hacerlo porque la propiedad se llama `state` y los valores son `hover`, `focus` y `disabled`. Si se llamaran `Property 1 = Variant 3`, no habría forma.
2. **Habla en tokens, no en hex.** Dice `color/action/primary/bg-hover`, no `#8CC7FF`. Ese es el resultado directo de la 2.2.
3. **Devuelve diferencias, no 24 descripciones.** Eso le permite a Claude escribir una clase base y pocas variaciones, en lugar de 24 bloques de CSS.

Esa es la diferencia entre un archivo AI-ready y uno que no lo es: el mismo pedido da código prolijo o código adivinado.

---

## 3. IA dentro de Figma: qué sí y qué no

La guía separa lo que la IA puede hacer de lo que no debería decidir sola (§7):

| La IA puede | La IA no debería decidir sola |
|---|---|
| Auditar y renombrar capas | Qué problema de producto resolver |
| Detectar elementos repetidos | Qué hacer cuando falta especificación |
| Convertir valores sueltos en variables | Qué deuda de accesibilidad aceptar |
| Armar pantallas con componentes existentes | Si un componente nuevo merece existir |
| Crear ejemplos de contenido y estados | Si algo está listo para producción |
| Documentar componentes | |

Lo hiciste sin notarlo: en la 2.1 Claude encontró el `label` sin conectar y el contraste del `secondary`, pero **vos** aprobaste qué hacer. En la 2.3, los estados de la MetricCard salieron de una tabla razonada que revisaste antes.

> Figma también tiene IA propia (renombrar capas, generar diseños, Figma Make). En Starter tiene créditos limitados. Para este curso usamos Claude por el MCP, porque trabaja con tu archivo **y** con tu repo a la vez.

---

## 4. Cómo pedirle cambios en Figma: el prompt base

La guía propone este prompt (§7). Su clave está en las últimas líneas: **primero inspeccionar y proponer, después tocar.**

```text
Usá este archivo de Figma: Design Engineer Journey, página 02 - Components.

Objetivo: [resultado observable].

Reutilizá los componentes y variables que ya existen.
No crees componentes ni variables nuevas sin mostrarme primero qué falta y por qué.
Conservá Auto Layout, nombres semánticos y propiedades existentes.
No inventes estados o comportamiento ausentes: registralos como decisiones pendientes.

Antes de modificar:
1. resumí lo que encontraste;
2. proponé el plan;
3. indicá qué vas a reutilizar, extender o crear;
4. esperá mi aprobación.
```

**"Resultado observable"** quiere decir algo que se pueda comprobar mirando:
- ❌ "Mejorá el badge."
- ✅ "Un `StatusBadge` con variantes `active`, `paused` y `error`, que se lea sin depender del color, para usar en una tabla."

### Separar evidencia, decisiones y suposiciones

Cuando Claude inspecciona, la respuesta útil distingue tres cosas (guía §8):

| Tipo | Ejemplo con tu MetricCard |
|---|---|
| **Evidencia** (está en Figma) | `trend: up \| down \| neutral`, min width 240, `title` usa `body/sm`. |
| **Decisión aprobada** (la tomaste vos) | `loading` usa skeleton y no spinner; la card no es clickeable. |
| **Suposición** (nadie la decidió) | ¿Qué pasa si `value` llega con decimales? ¿La card se actualiza sola cada X segundos? |

Las suposiciones son las que se convierten en bugs si nadie las ve. Pedile siempre a Claude que las liste aparte.

---

## 5. Comentarios → backlog

Los comentarios de Figma también son información que Claude puede leer (`figma_get_comments`). En un equipo real hay decenas, mezclados: bugs, preguntas, ideas, cosas ya resueltas. Claude los puede consolidar en un **backlog**: una lista ordenada de tareas.

### Ejemplo resuelto

Comentarios sueltos:

```
María  · Button       "el hover del secondary y del ghost son iguales, ¿está bien?"
Juan   · MetricCard   "¿qué pasa si el valor tiene decimales? 12,5%"
María  · MetricCard   "en mobile se ve apretado el título"
Pedro  · Button       "falta un botón destructivo para borrar"
Juan   · Button       "¿el hover del secondary es igual al del ghost a propósito?"
```

Backlog consolidado:

| # | Tipo | Tarea | Origen | Decide |
|---|---|---|---|---|
| 1 | Pregunta de diseño | Hover de secondary y ghost son idénticos: ¿se diferencian? | María, Juan (duplicado) | Diseño |
| 2 | Contenido | Definir formato de `trendValue` con decimales (`12,5%`) | Juan | Diseño + contenido |
| 3 | Bug visual | Revisar `title` de MetricCard en mobile (240px) | María | Diseño |
| 4 | Componente nuevo | Variante `destructive` del Button | Pedro | Diseño (¿merece existir?) |

Lo que hizo el backlog: **juntó duplicados** (1), **clasificó** por tipo, **convirtió preguntas en tareas** y **marcó quién decide**. Claude no responde las preguntas de diseño: las ordena para que vos decidas.

---

## 6. Hacelo vos

Esta vez la práctica es **dirigir**: vos escribís los pedidos, Claude ejecuta por el MCP y vos revisás.

1. **Un componente nuevo con el prompt base.** Pedime un `StatusBadge` (`active`, `paused`, `error`) usando el prompt de la sección 4, con tu propio "resultado observable". Yo voy a inspeccionar, proponer y esperar tu aprobación antes de crear nada. Después revisalo con el checklist de la skill.
2. **Comentarios.** Dejá 3 o 4 comentarios en Figma sobre el Button, la MetricCard o el badge (dudas reales que tengas). Después pedime que los lea y arme el backlog.
3. **Opcional: el MCP oficial.** Para compararlo una vez, lo conectás con `claude mcp add --transport http figma https://mcp.figma.com/mcp` y te logueás con `/mcp`. Gasta 1 de tus 6 llamadas del mes: pedile que lea la MetricCard y comparamos con lo que devuelve Figma Console MCP.

---

## 7. Checklist

- [ ] Entiendo qué hace el plugin Desktop Bridge y por qué tiene que estar abierto.
- [ ] Sé qué le da el MCP a Claude (estructura) y qué no (ni código ni decisiones).
- [ ] Mis pedidos de cambios en Figma tienen un resultado observable y piden plan antes de tocar.
- [ ] Distingo evidencia, decisión aprobada y suposición.
- [ ] Los comentarios terminan en un backlog con duplicados unidos y responsable de cada decisión.

---

## 8. Para ir más lejos (opcional)
- Figma Console MCP: [documentación](https://github.com/southleft/figma-console-mcp)
- Figma: [Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559)
- [Model Context Protocol](https://modelcontextprotocol.io/introduction): qué es MCP
