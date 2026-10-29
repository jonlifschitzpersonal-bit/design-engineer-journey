# Clase 5.1 — Next.js + Tailwind

**Objetivo:** crear el proyecto donde van a vivir los componentes del sistema y el dashboard, y saber qué es cada carpeta para ubicar lo que cambia un agente.

**Material:**
- Esta guía.
- El proyecto que creás vos en la práctica. Se generó en `proyectos/01-dashboard/` y al cerrar la clase se movió a su propio repo: `D:\Escritorio\proyectos\dashboard-ai-visibility` (GitHub: `dashboard-ai-visibility`), para que el portfolio y los PRs de la 5.4 queden limpios.

---

## 1. Qué es Next.js

En la P.1 los componentes de React eran funciones sueltas que yo ejecutaba aparte para ver el HTML. React solo arma pedazos de interfaz: no sabe qué es una página, una URL ni cómo se publica.

**Next.js es el marco que convierte esos componentes en una web:**

| Necesidad | Quién lo resuelve |
|---|---|
| Componentes (`MetricCard`, `Button`) | React |
| Páginas y URLs (`/`, `/configuracion`) | Next.js, con las carpetas de `app/` |
| Ver los cambios mientras se trabaja | Next.js, con `npm run dev` |
| Preparar la web para publicar | Next.js, con `npm run build` (y Vercel lo corre solo) |
| Estilos | Tailwind, que viene instalado de entrada |

Es el stack más común en equipos de producto, y lo que Vercel publica sin configurar nada.

---

## 2. Crear el proyecto

Desde la carpeta `proyectos/`, un solo comando:

```powershell
npx create-next-app@16.4.3 01-dashboard --ts --tailwind --eslint --app --import-alias "@/*" --use-npm --disable-git --no-agent-feedback --yes
```

| Parte | Qué hace |
|---|---|
| `npx create-next-app@16.4.3` | Baja el generador oficial y lo corre. La versión va fija para que el resultado sea siempre el mismo. |
| `01-dashboard` | Nombre de la carpeta que crea. |
| `--ts` | TypeScript: archivos `.tsx`. Se leen igual que los `.jsx` de la P.1, y además avisan si a un componente le pasan una prop que no existe. |
| `--tailwind` | Instala Tailwind v4. |
| `--eslint` | Instala un revisor que marca errores comunes en el código (se ve en la 8.2). |
| `--app` | Usa la carpeta `app/` para las páginas (el sistema actual de Next.js). |
| `--import-alias "@/*"` | Permite importar con `@/components/Button` en lugar de `../../components/Button`. |
| `--use-npm` | Instala las dependencias con npm. |
| `--disable-git` | No crea un repo nuevo: el proyecto ya está adentro del repo del curso, y un repo dentro de otro se rompe. |
| `--no-agent-feedback` · `--yes` | No pregunta nada más; usa los valores por defecto para el resto. |

Tarda un par de minutos: la mayor parte del tiempo se va en descargar las dependencias a `node_modules/`.

> **Antes de esta clase** se actualizó npm en tu máquina: había un npm 6 de hace años instalado aparte que le ganaba al npm 11 de Node 24, y con los paquetes actuales fallaba (`cb() never called`). Si alguna vez un `npm install` falla así, lo primero es mirar `npm -v`.

> **Si PowerShell dice "la ejecución de scripts está deshabilitada"** (`npx.ps1`, `npm.ps1`): Windows viene con los scripts de PowerShell bloqueados, y `npm`/`npx` son scripts. Se habilita una vez, solo para tu usuario, con `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`: deja correr los scripts locales y sigue pidiendo firma a los descargados. La alternativa sin tocar nada es escribir `npx.cmd` y `npm.cmd`.

---

## 3. El mapa del proyecto

```
01-dashboard/
├── app/                  ← LO QUE SE TOCA: las pantallas
│   ├── layout.tsx        ← lo que envuelve a todas las páginas
│   ├── page.tsx          ← la página de inicio ( / )
│   ├── globals.css       ← estilos globales y tokens de Tailwind
│   └── favicon.ico       ← el ícono de la pestaña
├── public/               ← imágenes y archivos que se sirven tal cual
│   └── next.svg, vercel.svg, …
├── AGENTS.md             ← instrucciones para agentes, escritas por Next.js
├── package.json          ← dependencias y comandos
├── package-lock.json     ← versiones exactas instaladas (no se edita)
├── node_modules/         ← dependencias descargadas (no se toca ni se sube)
├── .next/                ← lo que genera Next al correr (no se toca ni se sube)
├── next.config.ts        ← configuración de Next
├── tsconfig.json         ← configuración de TypeScript
├── eslint.config.mjs     ← configuración del revisor
├── next-env.d.ts         ← lo genera Next (no se toca)
└── .gitignore            ← lo que Git ignora
```

### Lo mismo, en términos de Figma

| En el proyecto | En Figma |
|---|---|
| `app/` | El panel de páginas |
| Cada carpeta dentro de `app/` con un `page.tsx` | Una página (y su URL) |
| `page.tsx` | El contenido de esa pantalla |
| `layout.tsx` | Un frame contenedor que se repite en todas las pantallas: header, menú, fuente |
| `globals.css` | Las colecciones de variables y los text styles |
| `components/` (se crea en el módulo 6) | La página `02 - Components` |
| `public/` | Las imágenes exportadas |
| `package.json` | La lista de plugins del archivo |

### Las tres zonas

1. **Lo que se toca:** `app/`, `public/` y después `components/`. Casi todo lo que cambie un agente debería estar acá.
2. **Lo que se lee para entender:** `package.json` (qué está instalado y qué comandos hay) y `AGENTS.md`.
3. **Lo que no se toca:** `node_modules/`, `.next/`, `package-lock.json`, `next-env.d.ts` y las configuraciones. Si un diff de un agente modifica estos archivos sin un motivo claro, es una señal para preguntar.

---

## 4. Las páginas son carpetas

En `app/`, **la carpeta es la URL** y el `page.tsx` adentro es lo que se muestra:

| Archivo | URL |
|---|---|
| `app/page.tsx` | `/` |
| `app/configuracion/page.tsx` | `/configuracion` |
| `app/campanas/page.tsx` | `/campanas` |
| `app/campanas/[id]/page.tsx` | `/campanas/123`, `/campanas/456`… (una plantilla para todas) |

Una carpeta sin `page.tsx` no es una página: sirve para ordenar.

---

## 5. Leer los tres archivos de `app/`

### `layout.tsx`: el contenedor de todo

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";   // ① fuentes
import "./globals.css";                                 // ② estilos globales

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {                     // ③ título de la pestaña
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>   {/* ④ */}
    </html>
  );
}
```

1. **Fuentes:** Next.js las descarga y las sirve desde tu propio sitio. Trae Geist; en la 5.2 se cambia por **Inter**, la de tus text styles.
2. **`globals.css`:** se importa una sola vez acá y vale para todas las páginas.
3. **`metadata`:** el título y la descripción que aparecen en la pestaña y en Google.
4. **`{children}`:** el lugar donde entra cada página. Es como un slot de Figma: el layout es siempre el mismo y lo de adentro cambia según la URL. Por eso el header del dashboard va a ir acá y no en cada `page.tsx`.

`lang="en"` hay que pasarlo a `es`: el lector de pantalla usa ese dato para elegir la pronunciación.

### `page.tsx`: la pantalla de inicio

Es un componente como los de la P.1: una función que devuelve JSX. Lo que trae es una pantalla de bienvenida genérica, y con lo que viste en la P.2 se pueden detectar varias señales de alarma:

```tsx
<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
…
<a className="… hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]">
```

- `bg-zinc-50`, `text-zinc-600`: colores de la paleta de Tailwind, no de tu sistema.
- `hover:bg-[#383838]`: un hex suelto entre corchetes, sin token y sin comentario.
- `md:w-[158px]`: un ancho inventado.

No hace falta arreglarlo: es una plantilla de ejemplo y en la 5.2 se borra entera. Sirve para ver que **lo que genera una herramienta tampoco viene con tu sistema**: hay que cargárselo.

### `globals.css`: donde van los tokens

```css
@import "tailwindcss";            /* ① trae todas las clases de Tailwind */

:root {                           /* ② variables CSS comunes */
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {                   /* ③ lo que se convierte en clases */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) { … }   /* ④ dark mode automático */
```

1. **`@import "tailwindcss"`** es todo lo que necesita Tailwind v4 para funcionar. No hay archivo de configuración aparte.
2. **`:root`** son variables CSS normales, como las de `tokens.css` en la 2.6.
3. **`@theme`** es la parte clave: cada variable que se escribe acá se convierte en clases. `--color-foreground` genera `text-foreground`, `bg-foreground`, `border-foreground`. En la 5.2 este bloque se reemplaza por tus variables de Figma, y así aparecen `text-text-muted`, `bg-bg-surface`, `p-5` con tu escala.
4. El dark mode que trae va a salir en la 5.2 y vuelve, bien hecho, en la 6.5.

---

## 6. Los comandos

Están en `package.json`, en `"scripts"`. Se corren desde la carpeta del proyecto:

| Comando | Para qué | Cuándo |
|---|---|---|
| `npm run dev` | Levanta la app en `http://localhost:3000` y la recarga sola en cada guardado. | Mientras se trabaja. Se corta con `Ctrl + C`. |
| `npm run build` | Arma la versión optimizada para publicar y avisa si hay errores. | Antes de un PR. Vercel lo corre solo en cada deploy. |
| `npm run start` | Sirve la versión de `build`. | Para probar en local lo mismo que va a estar publicado. |
| `npm run lint` | Corre el revisor de código. | Antes de un PR (se ve en la 8.2). |
| `npm install` | Baja las dependencias de `package.json` a `node_modules/`. | Después de clonar el repo o si alguien agregó una dependencia. |

Mientras `npm run dev` está corriendo, esa terminal queda ocupada: para seguir usando la terminal se abre otra.

---

## 7. `AGENTS.md`: Next.js le habla al agente

Es un archivo que Next.js crea y mantiene para los agentes de código:

> This is NOT the Next.js you know. This version has breaking changes […] Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.

Le avisa al agente que su conocimiento puede estar desactualizado y le dice dónde está la documentación de la versión instalada. Es la misma idea que el `CLAUDE.md` de este repo, y en la 5.3 vas a armar el del proyecto. Se commitea tal cual: si se borra, `npm run dev` lo vuelve a crear.

---

## 8. Práctica

En la terminal (PowerShell), desde la carpeta del curso:

1. **Crear el proyecto:**
   ```powershell
   cd proyectos
   npx create-next-app@16.4.3 01-dashboard --ts --tailwind --eslint --app --import-alias "@/*" --use-npm --disable-git --no-agent-feedback --yes
   ```
2. **Levantarlo:**
   ```powershell
   cd 01-dashboard
   npm run dev
   ```
   Abrí `http://localhost:3000` en el navegador. Vas a ver la pantalla de bienvenida de Next.js.
3. **Cambiar algo y verlo en vivo:** abrí `app/page.tsx` en el editor. Reemplazá todo lo que está entre `<h1 className="…">` y `</h1>` (el texto "To get started, edit the…", con el `<code>` incluido) por **Dashboard AI visibility** y guardá. Mirá el navegador sin recargar.
4. **Avisame** y reviso lo que quedó. Después cortás el servidor con `Ctrl + C`.
