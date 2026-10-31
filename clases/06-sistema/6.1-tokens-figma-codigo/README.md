# Clase 6.1: Tokens Figma ↔ código

**Objetivo:** que los tokens dejen de copiarse a mano. Figma exporta, una herramienta compila y el build controla que Figma y el código se correspondan 1 a 1.

**Material:**
- Esta guía.
- El commit del pipeline: [`0840fd0` Generate the token CSS from a Figma export with Style Dictionary](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/commit/0840fd0) (issue #33) y su [ADR 0007](https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard/blob/main/docs/adr/0007-tokens-generated-from-figma.md).
- Guía *De Figma a código con IA*, §6.6 (primitivo → semántico → componente, y "mapeo no es sincronización") y §11.1 ("si una referencia puede generarse, automatizala").
- [Style Dictionary](https://styledictionary.com) y el [formato DTCG](https://www.designtokens.org/tr/drafts/format/) del W3C.

---

## 1. El problema: tres copias de lo mismo

Hasta la 5.6, cada token estaba escrito tres veces:

| Copia | Dónde | Quién la mantenía |
|---|---|---|
| 1 | Variables de Figma | Vos |
| 2 | `app/globals.css` | Claude, a mano (5.2) |
| 3 | La lista de `/tokens` | Claude, a mano (5.2) |

Coincidían, pero solo porque nadie había cambiado nada todavía. Si cambiás `blue/200` en Figma, el código no se entera. Si alguien edita un hex en el CSS, Figma tampoco. Es el riesgo que la guía §11.1 llama "segunda fuente de verdad".

## 2. La solución: un pipeline en una sola dirección

```
Figma (variables + text styles)          ← la única fuente de verdad
   │  1. Exportar: Figma Console MCP
   ▼
tokens/figma/variables.tokens.json       ← "foto" de Figma (DTCG), en el repo
tokens/figma/text-styles.tokens.json
   │  2. Compilar: npm run tokens (Style Dictionary)
   ▼
app/tokens.css                           ← GENERADO, no se edita
   │  3. @import desde globals.css
   ▼
Tailwind genera las clases (bg-bg-surface, text-label-md…)
```

| Pieza | Qué es | Por qué esta |
|---|---|---|
| **DTCG** | El formato estándar de tokens del W3C: un JSON donde cada token tiene `$type`, `$value` y, si es un alias, una referencia (`{primitives.gray.600}`) | Lo entienden Figma, Tokens Studio y Style Dictionary. No te ata a ninguna herramienta |
| **Figma Console MCP** (`figma_export_tokens`) | Lee las variables por el plugin y escribe el JSON | Ya lo usamos (ADR 0003) y funciona con el plan Starter. La API de variables de Figma es solo para Enterprise |
| **Script de text styles** | Un JS chico que corre adentro de Figma | Los text styles no son variables y el export no los incluye |
| **Style Dictionary** | La herramienta estándar para compilar tokens a cualquier plataforma (CSS, iOS, Android) | Es lo que vas a escuchar en entrevistas. Acá tiene un formato propio para el `@theme` de Tailwind v4 |

**Por qué no Tokens Studio:** es otro plugin para mantener en el archivo, con su propio formato al lado de las variables y un export manual desde Figma. **Por qué no exportar directo a CSS con el MCP:** su formato de Tailwind usa `@theme inline` con valores ya resueltos. Los primitivos pasarían a tener clases (`bg-blue-200`) y se perderían los alias.

## 3. Ejemplo resuelto: el slice #33

### Qué genera

```css
:root {                                   /* primitivos: sin clases */
  --gray-600: #4b5563;
}
@theme {                                  /* semánticos: con clases */
  --color-*: initial;                     /* apaga la paleta de Tailwind */
  --color-text-muted: var(--gray-600);    /* el alias de Figma, como var() */
  --radius-lg: 0.75rem; /* 12 */
  --text-label-md: 0.875rem; /* 14 */
  --text-label-md--line-height: 1.25rem; /* 20 */
  --text-label-md--font-weight: 500;
}
```

Es lo mismo que Claude había escrito a mano en la 5.2, ahora generado.

### Los controles: el mapeo 1 a 1 deja de ser una promesa

El script frena el build si Figma y el código dejan de corresponderse. Cada control se probó rompiéndolo a propósito:

| Control | Qué lo rompe | Qué dice el error |
|---|---|---|
| Nombre = *code syntax* de Figma | En Figma, `color/text/muted` dice `var(--color-text-subtle)` | `Figma code syntax is var(--color-text-subtle), the CSS would be var(--color-text-muted).` |
| Semántico = alias | Un semántico con un hex en vez de apuntar a un primitivo | `must point to a primitive in Figma, not hold a value.` |
| `space/N` = N × 4px | `space/3` en 14px | `space/3 is 14px; Tailwind's p-3 is 12px.` |
| Nada se pierde en silencio | Un grupo nuevo (`shadow/sm`) que el script no sabe ubicar | `unknown token group. Add it to kind()…` |
| Nadie edita el CSS a mano | Cambiar un hex en `app/tokens.css` | `npm run lint` falla: `doesn't match tokens/figma/. Run npm run tokens` |
| Un solo archivo de Figma | Exports de dos archivos distintos | `The exports come from different Figma files` |

### La prueba de "se ve igual"

Antes de tocar nada se compiló la app y se guardó el CSS final. Después del pipeline, se comparó: **mismas declaraciones y mismas reglas**. Solo cambió el orden de las variables, que ahora es alfabético, como viene del export. Como el HTML no cambió, la app es idéntica. Es una prueba más fuerte que mirar la pantalla: compara cada valor, no solo lo que se ve.

### Dos sorpresas

1. **Tailwind lee todos los archivos del repo** buscando nombres de clases. Encontró la palabra "transform" en el script nuevo y generó una clase `.transform` que nadie usa. Se arregló con `@source not "../scripts"` y `@source not "../tokens"`. La comparación del CSS final fue la que lo mostró.
2. **El export guarda la hora en cada token.** Reexportar sin cambios ensuciaba 51 líneas del diff. `npm run tokens` borra esas horas: ahora un export sin cambios no genera diff, y uno con cambios muestra solo lo que cambió.

### Lo que no hace (y hay que decirlo)

Es un **mapeo con control automático, no una sincronización**. El código se entera de un cambio en Figma solo cuando alguien exporta. Con el plan Starter no se puede exportar desde un servidor (CI) porque la API de variables es de Enterprise. Por eso el paso a paso quedó en el `CLAUDE.md` del dashboard: cualquier agente lo puede repetir.

## 4. Cómo se agrega o cambia un token desde ahora

1. En Figma: el semántico apunta a un primitivo y su *code syntax* WEB es `var(--nombre-con-guiones)`.
2. El agente exporta: `figma_export_tokens` → `tokens/figma/variables.tokens.json` (y el script, si cambiaron text styles).
3. `npm run tokens`. Si frena, el error dice qué no coincide.
4. Revisás el diff: el JSON y `app/tokens.css` muestran solo tu cambio.

## 5. Segundo ejemplo resuelto: `/tokens` con notas de uso (#31)

Con el pipeline andando, `/tokens` dejó de tener su propia lista. El mismo script escribe `app/tokens/tokens.ts` y la página solo decide cómo mostrarlo.

**Las notas de uso viajan solas.** Se escribieron 13 notas en la descripción de las variables de Figma, para los tokens que comparten valor con otro y para `text-disabled`. Al reexportar, el diff del JSON mostró exactamente esas 13 líneas y nada más, y la página las mostró sin tocar su código:

```
color/bg/accent-subtle → blue/50 · #eef6ff
Fondo de una superficie destacada, como un aviso. Siempre con borde border/accent.
```

**Lo que encontró la revisión de diseño (Impeccable):** las muestras de la página usaban colores de acción, justo lo que sus propias notas dicen que no se haga ("Solo acciones"). Una página de referencia es el ejemplo que copian los agentes, así que sus muestras tienen que respetar las reglas que imprime. Se corrigió con el par superficie destacada + `border/accent`. La crítica subió de 16/28 a 21/28.

**Decisión de producto:** `/tokens` no va en la demo pública. Para el portfolio, la referencia de tokens pasa a Storybook (6.4, #35).

## 6. Práctica (pendiente)

Crear `color/action/secondary/bg-pressed` en Figma (#14) quedó para la 6.2, cuando se arma el `Button`, que es el que necesita el estado al apretar. Va en la colección `Semantic`, apunta a un primitivo y lleva *code syntax* WEB `var(--color-action-secondary-bg-pressed)`. Después se exporta y recorre el mismo camino que las notas.

> **Cómo terminó (6.2):** al leer Figma salieron dos tokens en lugar de uno: `color/action/primary/bg-pressed` y `color/action/subtle/bg-pressed` (para secondary y ghost, que ya compartían el hover). Está en la guía de la 6.2, §3.
