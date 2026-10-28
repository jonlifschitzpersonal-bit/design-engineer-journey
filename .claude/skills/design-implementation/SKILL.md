---
name: design-implementation
description: Buenas prácticas de craft para implementar diseños en código (HTML, CSS, Tailwind, React, Next.js). Usala SIEMPRE que vayas a escribir, generar, modificar o revisar estilos o markup de una interfaz en este repo — al implementar un diseño de Figma, maquetar una página o componente, pasar un mock a código, ajustar layout/tipografía/espaciado, o revisar código de UI generado por IA — aunque el pedido no mencione "buenas prácticas" ni esta skill.
---

# Implementación de diseño con craft

Reglas que Jonathan (product designer → design engineer) fue aprendiendo en su curso. Cada una explica **por qué** existe, para que puedas aplicarla con criterio y no de memoria. La fuente indica la clase donde se aprendió (`clases/…`).

El objetivo es que lo implementado **se vea y se comporte igual al diseño**, sea predecible para quien lo lea después y no genere bugs de layout difíciles de rastrear.

---

## 1. HTML base

- Incluí `<html lang="…">` y `<meta name="viewport" content="width=device-width, initial-scale=1.0">`. Sin `viewport`, mobile renderiza la página como desktop achicado. *(0.1)*
- Usá elementos semánticos: `<main>`, `<header>`, `<nav>`, `<section>`, `<h1>`–`<h6>` en orden, `<p>`, `<button>` para acciones y `<a>` para navegación. Un `<div>` clickeable no es accesible por teclado ni por lector de pantalla. *(0.1)*

## 2. Especificidad y cascada

- Estilá con **clases**, con especificidad baja y pareja. Así cualquier regla nueva se puede sobreescribir sin escalar. *(1.1)*
- **No uses IDs para estilar.** Un ID (1-0-0) le gana a cualquier cantidad de clases y obliga a pelear con más especificidad. *(1.1)*
- **No uses `!important`.** Si parece necesario, casi siempre hay un problema de especificidad mal resuelto. La única excepción razonable es pisar CSS de terceros que no controlás; en ese caso, dejá un comentario explicando por qué. *(1.1)*
- Evitá selectores descendientes largos (`.page .card .body p`). Suben la especificidad y acoplan el estilo a la estructura del HTML. *(1.1)*
- Cuando un estilo "no se aplica", revisá en DevTools qué regla lo está pisando (aparece tachada) antes de agregar más especificidad. *(1.1)*

## 3. Reset base

Si el proyecto **no usa Tailwind** (Tailwind ya lo trae en su *preflight*), empezá el CSS con:

```css
*, *::before, *::after {
  box-sizing: border-box;
}

button, input, select, textarea {
  font: inherit;
  color: inherit;
}
```

- **`border-box`:** hace que `width` incluya padding y border, igual que un frame de Figma de ancho fijo con stroke *inside*. Con el default (`content-box`), una card de `width: 200px` con `padding: 20px` y `border: 5px` mide 250px y rompe el layout. *(1.2)*
- **`font: inherit` en controles de formulario:** los navegadores les ponen fuente y color propios, así que **no heredan** la tipografía de la página. Sin este reset, los botones e inputs se ven con la fuente del sistema. *(1.1)*

## 4. Unidades

| Uso | Unidad | Por qué |
|---|---|---|
| Tamaño de texto y espaciado | `rem` | Relativo a la raíz: predecible y respeta el zoom de texto del usuario (accesibilidad). *(1.2)* |
| Espaciado que debe escalar con el texto de un componente (padding de un botón, tamaño de un ícono junto al texto) | `em` | Crece en proporción si el componente cambia de tamaño de fuente. *(1.2)* |
| Bordes, hairlines, sombras | `px` | Son detalles finos que no tienen que escalar. *(1.2)* |
| Ancho de bloques de lectura | `ch` | Se mide en caracteres. *(0.1, 1.2)* |
| Anchos dentro de un contenedor | `%` | Relativo al padre. *(1.2)* |

- **Nunca uses `em` para `font-size` en elementos anidados.** `em` se acumula: un `1.5em` dentro de otro `1.5em` da 36px, no 24px. Para tamaños de texto usá `rem`. *(1.2)*
- En Tailwind, usá la escala del sistema (`text-lg`, `p-4`, `gap-6`, que está en `rem`) y evitá valores arbitrarios en px como `text-[17px]` o `p-[13px]`, salvo que el diseño lo justifique y no exista un token. *(1.2)*

## 5. Espaciado entre elementos

- Para separar elementos hermanos, usá **`gap`** dentro de Flexbox o Grid en lugar de márgenes. Funciona como el *spacing* del Auto Layout de Figma y evita el colapso de márgenes. *(1.2)*
- Si usás márgenes, usá **una sola dirección** (por ejemplo, solo `margin-bottom`). Los márgenes verticales que se tocan **se colapsan**: 20px + 30px dan 30px, no 50px, y el espacio no coincide con el diseño. *(1.2)*

## 6. Tipografía de lectura

- Limitá los bloques de texto a **`max-width: 65ch`** (entre 45 y 75 caracteres por línea). Las líneas más largas cansan la lectura. Centralo con `margin-inline: auto`. *(0.1)*
- **`line-height`:** alrededor de `1.5`–`1.6` para texto corrido y `1.1`–`1.2` para títulos grandes. A mayor tamaño de letra, menos interlineado proporcional; si no, el título se ve desarmado. *(0.1)*
- Usá **`text-wrap: balance`** en títulos para que las líneas queden parejas y no quede una palabra sola. *(0.1)*
- Declará `font-family` con una **lista de respaldo** que termine en una familia genérica (`…, sans-serif`). El navegador usa la primera fuente disponible. *(0.1)*
- Agregá padding lateral al contenedor principal (por ejemplo `padding-inline: 1.5rem`) para que en mobile el texto no quede pegado al borde. *(0.1)*

---

## Antes de dar por terminada una implementación

Revisá esto y, si algo no se cumple, corregilo o explicá por qué:

- [ ] HTML semántico, `lang` y `viewport` presentes.
- [ ] Sin IDs para estilar y sin `!important` (o justificado con comentario).
- [ ] `border-box` y reset de controles de formulario (o Tailwind preflight).
- [ ] Texto y espaciado en `rem`; ningún `font-size` en `em` anidado.
- [ ] Espaciado entre hermanos con `gap`, o márgenes en una sola dirección.
- [ ] Bloques de lectura con ancho máximo e interlineado adecuado al tamaño.
- [ ] Si hay diseño de referencia: medidas, tipografía y espaciados comparados contra Figma.

Cuando termines, contale a Jonathan qué reglas de esta skill aplicaste o tuviste que resolver, para que pueda revisar el código con ese criterio.

---

## Cómo crece esta skill

Al cerrar cada clase del curso, el tutor agrega acá las reglas nuevas, con su **por qué** y la clase de origen. Si una regla nueva contradice otra, se actualiza la existente en lugar de duplicarla.
