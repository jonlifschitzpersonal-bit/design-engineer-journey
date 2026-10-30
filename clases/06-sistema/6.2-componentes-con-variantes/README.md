# Clase 6.2: Componentes con variantes en código

**Objetivo:** que los componentes de Figma (`Icon`, `Button`, `StatusBadge`, `MetricCard`) existan en código con la **misma API**: los mismos nombres de props, los mismos valores y los mismos estados. El dashboard de la 5.7 se arma con estas piezas.

**Material:**
- Esta guía.
- Los commits del dashboard: [`b6e2f93`](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/commit/b6e2f93) (tokens del estado apretado, #14), [`31e3e38`](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/commit/31e3e38) (`Icon` y `Button`) y [`ddd43bf`](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/commit/ddd43bf) (`StatusBadge` y `MetricCard`).
- El [ADR 0008](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/blob/main/docs/adr/0008-component-variants-cva-lucide.md): por qué `cva`, `tailwind-merge` y `lucide-react`.
- Guía *De Figma a código con IA*, §9 (componentes y API) y §16 (señales de alarma).
- [cva](https://cva.style) y [shadcn/ui](https://ui.shadcn.com), como modelo.

---

## 1. La idea: la API del componente es la de Figma

En la 2.1 armaste el `Button` con propiedades. En código, cada una pasa a ser una prop:

| Figma | Tipo en Figma | Código |
|---|---|---|
| `variant` | Variant | `variant: "primary" \| "secondary" \| "ghost"` |
| `size` | Variant | `size: "md" \| "sm"` |
| `label` | Text | `children` (`<Button>Guardar</Button>`, como un `<button>` común) |
| `iconStart` + `showIconStart` | Instance swap + Boolean | `iconStart?` (no pasarlo ya es "sin ícono") |
| `loading` | Boolean | `loading?` |
| `state: default \| hover \| focus \| disabled` | Variant | **No es prop.** `hover` y `focus` son `:hover` y `:focus-visible`; `disabled` es el atributo nativo |

Las 24 variantes de Figma (3 × 2 × 4) en código son 2 props con 3 y 2 valores. El estado no se le pasa al botón: el navegador sabe solo cuándo está el mouse encima, cuándo tiene foco y cuándo está apretado. En una entrevista, la pregunta "¿cómo diseñarías la API de un Button?" se responde con esta tabla.

## 2. `cva`: el component set escrito en código

`cva` (class-variance-authority) es una tabla: una base que comparten todas las variantes, y lo que cambia en cada una. Es lo mismo que te devuelve `figma_analyze_component_set`: la variante default y, para cada otra, solo la diferencia.

```tsx
const buttonVariants = cva("inline-flex items-center justify-center …", {
  variants: {
    variant: {
      primary:   "bg-action-primary-bg hover:bg-action-primary-bg-hover active:bg-action-primary-bg-pressed …",
      secondary: "text-action-secondary-text inset-ring inset-ring-action-secondary-border …",
      ghost:     "text-text-default hover:bg-action-subtle-bg-hover …",
    },
    size: {
      md: "gap-2 rounded-md px-4 py-2.5 text-label-md", // 10 + 20 + 10 = 40px
      sm: "gap-1.5 rounded-sm px-3 py-1.5 text-label-sm", // 6 + 20 + 6 = 32px
    },
  },
  defaultVariants: { variant: "primary", size: "md" }, // los defaults de Figma
});
```

**shadcn/ui como modelo, no como dependencia.** Es la forma más usada hoy de armar componentes con `cva` y Tailwind, pero sus componentes traen su propio diseño y sus nombres de tokens. Nosotros ya tenemos el diseño en Figma: tomamos su forma de armar la API y usamos tus tokens.

## 3. Ejemplo resuelto: el estado apretado (#14)

La anotación del `Button` en Figma (de la 2.3) dice: *"Pressed (`:active`): fondo un paso más oscuro. No tiene variante propia."* El issue pedía un solo token, `color/action/secondary/bg-pressed`. Al leer Figma apareció algo más:

- La anotación vale para las **tres** variantes, no solo para el secondary.
- El secondary y el ghost **ya comparten** el token de hover (`color/action/subtle/bg-hover`).

Así que se crearon dos tokens, siguiendo el mismo patrón que el hover:

| Variante | Default | Hover | Apretado (nuevo) |
|---|---|---|---|
| primary | `blue/200` | `blue/300` | `color/action/primary/bg-pressed` → `blue/400` (#70B8FF), primitivo nuevo |
| secondary y ghost | transparente | `blue/50` | `color/action/subtle/bg-pressed` → `blue/100` (#CBE6FF), primitivo nuevo |

**Por qué no `blue/200` para el secondary:** es el fondo del primary. Un secondary apretado se vería igual que un primary.

Contraste del texto sobre los fondos nuevos: el más bajo es 8,36:1 (pide 4,5:1). Fue el primer cambio que recorrió el pipeline de la 6.1: Figma → export → `npm run tokens` → el diff mostró solo las 4 variables nuevas.

## 4. Ejemplo resuelto: `Icon` y `Button` (slice 2)

### Lo que salió igual a Figma (medido en Chrome)

- md 110×40 y sm 96×32, con el mismo padding, gap, radio y text style.
- **El borde del secondary no suma alto.** En Figma, el trazo está "adentro" y el botón mide 40. Con `border` mediría 42, así que es un `inset-ring`, una sombra interna.
- **Foco:** anillo de 2px por fuera, y en el secondary reemplaza al borde, igual que en Figma.
- **Loading:** el spinner va donde estaba el ícono, así que el ancho no cambia. Sin ícono, el spinner tapa el texto, que sigue ahí pero transparente. El botón sigue teniendo foco: no se usa `disabled`, porque con `disabled` el foco se perdería mientras guarda.

### Tres trampas que aparecieron

1. **`tailwind-merge` borraba los text styles.** La función `cn()` combina clases y resuelve conflictos: si pasás `rounded-sm` a un botón `rounded-md`, gana la tuya. Pero solo conoce los tamaños de Tailwind, así que creía que `text-label-md` era un color y lo borraba al lado de `text-text-muted`. Se probó: sin configurar, `cn("text-label-md text-text-muted")` devolvía solo `text-text-muted`. Ahora `cn` lee la lista de text styles generada desde Figma.
2. **`invisible` borra el nombre del botón.** Para esconder el texto mientras carga se usó `opacity-0`: `visibility: hidden` también lo esconde del lector de pantalla, y el botón se quedaba sin nombre.
3. **Envolver el `onClick` obligaba a que el botón fuera de cliente.** Next.js no deja pasar funciones desde un componente de servidor. Mientras carga, simplemente no se le pasa el `onClick`.

### `extract`: qué se extrajo y qué no

Impeccable `extract` dice: se extrae lo que se repite 3 veces o más **con la misma intención**. Dos botones que se parecen pero hacen cosas distintas quedan separados.

- **Los íconos del aviso sí pasan a `<Icon>`:** eran dos SVG copiados a mano, y el ícono ya se usa en el aviso, en el `Button` y en la `MetricCard`.
- **La X del aviso no pasa a `<Button>`:** es el único botón de solo ícono, y su hover cambia el color del ícono, mientras que el del ghost pinta el fondo. Es lo mismo que dice la descripción del `DemoNotice` en Figma: pasa a `Button` cuando aparezca un segundo botón de solo ícono, con esa opción diseñada primero en Figma.

## 5. Ejemplo resuelto: `StatusBadge` y `MetricCard` (slice 3)

- **`StatusBadge`:** la única prop es `status`. El texto sale de un mapa (`active` → "Activo"), no de una prop, así el color y el texto no se pueden contradecir.
- **`MetricCard`:** `showTrend` desaparece. Si pasás `trend` y `trendValue` hay tendencia, si no, no. TypeScript no deja pasar uno sin el otro.
- **Los textos para el lector** son los que se aprobaron en la 2.6: "Subió 12% respecto del período anterior", "Sin cambios (0%) respecto del período anterior".
- **Los skeletons** miden lo mismo que en Figma, así que la card mide 194px en default, loading y error.
- **En Figma**, el título de muestra pasó de "Menciones en ChatGPT" (de otro proyecto) a "Familias alcanzadas".
- **El título no se va mientras carga.** Es una prop, no un dato: queda para el lector de pantalla y le da nombre a la card. Antes, el lector decía "Cargando, Cargando, Cargando" sin decir qué.
- **Lo que la card protege sola:** sin valor muestra "—" (lo pide la anotación de Figma); si el dato trae signo ("+4,0 %"), se lo saca, porque la flecha ya dice la dirección y el lector diría "Subió más 4,0 %"; un número muy largo baja de línea en lugar de salirse del borde.

## 6. La revisión de diseño (Impeccable)

Al cerrar cada slice se corrieron `critique` (con dos revisiones separadas) y `audit`. En el `Button`:

| Hallazgo | Qué se hizo |
|---|---|
| Un texto largo desbordaba a 320px | Corregido: el texto baja de línea solo si no entra |
| Las props se aplicaban después del estado de carga y lo podían pisar | Corregido |
| Primary y secondary se distinguen poco (1,5:1 contra el blanco); el hover sutil es del mismo color que la franja del aviso; no hay tamaño de 44px para formularios mobile | Issue #36: **lo decidís vos** |
| En modo alto contraste de Windows los botones pierden el contorno; el fin de la carga no se anuncia | Issue #37, para la 6.3 |
| "Inter es una fuente muy usada" | Rechazado: es la tipografía decidida del sistema |

En la `MetricCard`:

| Hallazgo | Qué se hizo |
|---|---|
| La card en carga no tenía nombre ni título | Corregido |
| Sin valor, un signo en la tendencia, un número largo a 240px | Corregido (ver §5) |
| La card muestra "↑ 12%" pero no contra qué compara; el ícono de "sin cambios" parece un menos; "12%" o "12 %"; el texto del error; dónde va "Reintentar"; títulos de tres líneas que desalinean la fila | Issue #38: **lo decidís vos** |
| El nivel del título (h3) debería ser una prop | Rechazado: la anotación de Figma lo fija como h3 debajo del h2 de la sección |

## 7. Práctica

Decidir en Figma los issues [#36](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/36) y [#38](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/issues/38). En `02 - Components`:

**`Button` (#36)**
1. Si el primary y el secondary tienen que distinguirse más. Si es así, qué cambia: el fondo del primary o el borde del secondary.
2. Qué pasa con el hover sutil sobre una superficie celeste.
3. Si los 44px de los formularios mobile son un tamaño del `Button` o una regla del formulario.

**`MetricCard` (#38)**
1. Si la card muestra contra qué compara ("vs. año anterior") y con qué palabra.
2. El ícono de "sin cambios" y el formato del porcentaje ("12%" o "12 %").
3. El texto del error ("No se pudo cargar" o "No pudimos cargar el dato", la voz del producto) y del dato que falta.
4. Si el título se ve mientras carga.

Lo que cambie va primero a Figma. Claude lo exporta y lo revisa.
