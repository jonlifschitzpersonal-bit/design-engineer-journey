# Clase 1.1 — Cascada, especificidad y herencia

**Objetivo:** entender por qué "mi estilo no se aplica". Es el bug de CSS más común, y también el que más aparece cuando la IA genera estilos que se pisan entre sí.

---

## 1. Concepto

Cuando varias reglas le dan un valor distinto a la misma propiedad de un elemento, el navegador decide cuál gana con **3 criterios, en este orden**:

### 1) Importancia
`!important` le gana a todo. Es un parche: si lo ves en código generado por IA, casi siempre es señal de un problema mal resuelto.

### 2) Especificidad: qué tan precisa es la regla
Cada selector suma puntos en 3 columnas, y se comparan **de izquierda a derecha**:

| Selector | IDs | Clases / pseudo-clases / atributos | Elementos | Puntaje |
|---|---|---|---|---|
| `p` | 0 | 0 | 1 | **0-0-1** |
| `.card` | 0 | 1 | 0 | **0-1-0** |
| `.card p` | 0 | 1 | 1 | **0-1-1** |
| `.card .highlight` | 0 | 2 | 0 | **0-2-0** |
| `#featured` | 1 | 0 | 0 | **1-0-0** |

Una sola clase (0-1-0) le gana a cualquier cantidad de elementos (0-0-99). Un ID le gana a cualquier cantidad de clases.

> **Analogía Figma:** es como los overrides en una instancia. El override más específico (el que hiciste sobre esa instancia) le gana al estilo del componente main.

### 3) Orden
Si la especificidad empata, **gana la regla que aparece más abajo** en el archivo.

### Herencia
Algunas propiedades pasan de padre a hijo automáticamente:

| Se heredan (texto) | No se heredan (caja) |
|---|---|
| `color`, `font-family`, `font-size`, `font-weight`, `line-height`, `text-align` | `margin`, `padding`, `border`, `background`, `width` |

Tiene lógica: si el padre tiene un borde, no querés que cada hijo tenga su propio borde.

**Importante:** un valor heredado es el más débil de todos. **Cualquier** regla que apunte directo al elemento le gana, aunque sea `p { }` con especificidad 0-0-1.

---

## 2. Ejercicio: predecir

Abrí `index.html` en el navegador **después** de responder. Para cada elemento numerado, predecí:
- de qué **color** va a ser el texto,
- qué regla (A–F) gana o si es herencia.

Y una más: **¿el botón (5) usa la fuente Georgia?**

---

## 3. Ejercicio a mano ✍️

Una vez que veas las respuestas: hacé que el **párrafo 3** se vea **verde**, escribiendo **una sola regla nueva**:
- sin `!important`,
- sin usar IDs,
- sin borrar ni modificar las reglas existentes.

Pista: necesitás un selector que le gane en especificidad a la regla B.

---

## 4. Para ir más lejos (opcional)
- [Specificity Calculator](https://specificity.keegan.st/)
- [web.dev/learn/css/specificity](https://web.dev/learn/css/specificity)
- [web.dev/learn/css/inheritance](https://web.dev/learn/css/inheritance)
