# Clase 5.2 — Tailwind desde los tokens

**Objetivo:** que el proyecto del dashboard use solo el sistema de Figma: sus colores, radios, text styles y fuente. Lo que no está en el sistema, no existe.

**Material:**
- Esta guía.
- El proyecto: `D:\Escritorio\proyectos\dashboard-ai-visibility` (archivos `app/globals.css`, `app/layout.tsx`, `app/page.tsx` y `app/tokens/page.tsx`).
- La página de prueba: http://localhost:3000/tokens (con `npm run dev` corriendo).

---

## 1. Antes y después

| | Plantilla (5.1) | Ahora |
|---|---|---|
| Colores | `--background` / `--foreground` inventados, más toda la paleta de Tailwind (`zinc-600`, `red-500`…) | Solo los 21 semánticos de Figma |
| Dark mode | Automático, con colores que nadie diseñó | No hay. Se arma en la 6.5, redefiniendo los semánticos |
| Fuente | Geist (y Arial en el `body`) | Inter, la de los text styles |
| Tamaños de texto | `text-sm`, `text-lg`, `text-3xl`… | Los 6 text styles de Figma |
| Radios | Los de Tailwind (`rounded-lg` = 8px) | Los de Figma (`rounded-lg` = 12px) |
| `lang` | `en` | `es` (el lector de pantalla pronuncia en español) |
| Título | "Create Next App" | "AI Visibility" |
| `public/` | 5 SVG de la plantilla | Vacía (se borró) |

---

## 2. El `globals.css`, por partes

### Primitivos: afuera de `@theme`

```css
:root {
  --gray-600: #4b5563;
  --blue-200: #a8d6ff;
  /* … */
}
```

Son la paleta (`gray/600`, `blue/200`). Van como variables CSS comunes, **fuera de `@theme`**, así que **no generan clases**: `bg-blue-200` no existe. Es lo mismo que en Figma, donde los primitivos no tienen scopes y no aparecen en el selector de color.

### Semánticos: adentro de `@theme`

```css
@theme {
  --color-*: initial;                          /* apaga la paleta de Tailwind */
  --color-text-muted: var(--gray-600);         /* → text-text-muted, bg-text-muted… */
  --color-action-primary-bg: var(--blue-200);  /* → bg-action-primary-bg… */
}
```

- **`--color-*: initial`** borra todos los colores que trae Tailwind. Si alguien escribe `bg-red-500`, la clase no genera nada y el elemento queda sin color.
- Cada semántico **apunta a un primitivo**, igual que el alias en Figma (`color/text/muted` → `gray/600`). Si mañana el gris cambia, cambia en un solo lugar.
- Los nombres son los de Figma con guiones. El prefijo de la clase (`text-`, `bg-`, `border-`) lo pone quien la usa, según dónde va el color (lo vimos antes de arrancar).

### Radios: con los valores de Figma

```css
--radius-*: initial;
--radius-lg: 0.75rem; /* 12 */
```

**Esta trampa vale la pena recordarla.** Tailwind ya trae un `rounded-lg`, pero de **8px**, no de 12. Si no lo redefinimos, `rounded-lg` existiría igual y se vería "casi bien". El nombre coincide y el valor no: ese error no salta a la vista, solo aparece midiendo.

### Text styles: una clase con los tres valores

```css
--text-label-md: 0.875rem;              /* 14 */
--text-label-md--line-height: 1.25rem;  /* 20 */
--text-label-md--font-weight: 500;
```

Genera `text-label-md`, que pone tamaño, interlineado y peso juntos, igual que aplicar el text style en Figma. `--text-*: initial` borra `text-sm`, `text-lg` y el resto, para que nadie arme un tamaño suelto.

### Espaciado: no se toca

La escala de Tailwind ya es N × 4px, igual que `space/N`: `p-5` = `space/5` = 20px, `gap-1.5` = `space/1-5` = 6px. Redefinirla sería copiar lo mismo.

### La fuente: `@theme inline`

```css
@theme inline {
  --font-sans: var(--font-inter), system-ui, sans-serif;
}
```

`--font-inter` la crea Next.js al cargar Inter (en `layout.tsx`). `inline` hace que Tailwind copie el valor directo en lugar de hacer una cadena de variables, que es lo que recomienda la documentación de Next.js para fuentes. Los colores, en cambio, van **sin** `inline`: así en la 6.5 el dark mode puede redefinir `--color-text-muted` y todas las clases cambian solas.

---

## 3. `layout.tsx`

```tsx
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Visibility",
  description: "Cómo aparece tu marca en las respuestas de ChatGPT, Gemini, Perplexity y Claude.",
};

<html lang="es" className={`${inter.variable} antialiased`}>
```

Next.js descarga Inter al armar el proyecto y la sirve desde tu propio dominio: no hay pedido a Google cuando alguien abre la página. Va en `layout.tsx` porque es lo que se repite en todas las páginas (5.1).

---

## 4. La página `/tokens`

Una carpeta nueva, `app/tokens/`, con un `page.tsx` adentro, ya es la URL `/tokens` (5.1). Muestra cada token aplicado con su clase. Es una herramienta de trabajo hasta que llegue Storybook (6.x).

Un detalle del código: las clases están escritas **completas** en una lista (`"text-text-muted"`, `"bg-action-primary-bg"`). Tailwind arma el CSS buscando clases en el texto de los archivos; si el código las armara pegando pedazos (`` `text-${nombre}` ``), no las encuentra y no las genera.

---

## 5. Verificación (ledger)

Medido en Chrome con `getComputedStyle` sobre la página `/tokens`, y comparado con las variables y text styles leídos de Figma por el MCP.

| Control | Resultado | Evidencia |
|---|---|---|
| Colores = Figma | PASS | `text-text-muted` → `rgb(75,85,99)` = `#4b5563` (`gray/600`); `bg-action-primary-bg` → `#a8d6ff` (`blue/200`); `border-border-default` → `#e5e7eb` (`gray/200`); `outline-focus-ring` → `#2b7fd4` (`blue/600`) |
| Paleta de Tailwind apagada | PASS | Un elemento con `bg-red-500 text-zinc-600` queda transparente y con el color del `body`; el CSS compilado no tiene ningún `--color-red/zinc/gray…` |
| Primitivos sin clases | PASS | `--gray-600` existe como variable, pero `bg-gray-600` no se genera |
| Text styles = Figma | PASS | Los 6 miden igual: `heading/metric` 28/36/600, `heading/section` 20/28/600, `label/md` 14/20/500, `label/sm` 13/20/500, `label/xs` 12/16/500, `body/sm` 14/20/400 |
| Radios = Figma | PASS | `rounded-sm/md/lg/full` → 6 / 8 / 12 / 9999px |
| Espaciado N × 4 | PASS | `w-1.5` = 6px, `w-8` = 32px |
| Fuente Inter | PASS | `font-family: Inter, "Inter Fallback", system-ui, sans-serif`, Inter cargada (pesos 100–900) |
| `lang`, título y descripción | PASS | `<html lang="es">`, `<title>AI Visibility</title>` y la descripción en el HTML servido |
| 320px sin scroll horizontal | PASS | En un iframe de 320px, el ancho del documento es 303 y ningún elemento pasa el borde |
| `npm run lint` y `npm run build` | PASS | Sin errores; se generan `/` y `/tokens` |
| Números tabulares en `heading/metric` | OUT OF SCOPE | Pendiente en Figma desde la 2.6; se suma al text style cuando se active allá |
| Dark mode | OUT OF SCOPE | Clase 6.5 |

---

## 6. Práctica

Con `npm run dev` corriendo en la carpeta del dashboard:

1. **Seguir la cadena en DevTools.** Abrí http://localhost:3000/tokens, clic derecho sobre el "Aa" gris de `text-text-muted` → *Inspeccionar*. En el panel **Styles** vas a ver `.text-text-muted { color: var(--color-text-muted) }`. Pasá el mouse sobre la variable para ver su valor, y bajá hasta `:root` para encontrar `--gray-600: #4b5563`. Es la misma cadena que en Figma: capa → `color/text/muted` → `gray/600`.
2. **Probar que un color de afuera no existe.** En `app/page.tsx`, cambiá `text-text-muted` del párrafo por `text-red-500` y guardá. El texto **no** se pone rojo: queda del color por defecto del `body`. Después cambialo por `text-feedback-negative` (el rojo del sistema) y fijate que ahí sí cambia.
3. Dejá el cambio guardado y avisame. Reviso el diff, lo devolvemos a `text-text-muted` y cerramos la clase con commit y push en el repo del dashboard.
