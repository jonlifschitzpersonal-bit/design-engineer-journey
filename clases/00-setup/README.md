# Clase 0.1 — Terminal y Git

**Duración:** ~2 hs · **Objetivo:** que esta carpeta (`design engineer`) sea un repositorio Git en GitHub, con tu primer commit.

---

## 1. Concepto

### La terminal
Es una forma de hablarle a la computadora con texto en vez de clicks. Como design engineer la vas a usar todos los días para instalar paquetes, levantar proyectos y usar Git.

Comandos básicos (en VS Code abrí la terminal con `` Ctrl + ` ``):

| Comando | Qué hace | Equivalente en el explorador |
|---|---|---|
| `pwd` | Dónde estoy | Mirar la barra de dirección |
| `ls` | Qué hay acá | Ver los archivos de la carpeta |
| `cd carpeta` | Entrar a una carpeta | Doble click en una carpeta |
| `cd ..` | Volver un nivel | Botón "atrás" |
| `mkdir nombre` | Crear carpeta | Nueva carpeta |

### Git
Git es el **historial de versiones** de tu código, como el version history de Figma pero vos decidís cuándo guardar cada versión y le ponés un mensaje.

- **Repositorio (repo):** una carpeta cuyo historial Git sigue.
- **Commit:** una foto del estado de los archivos, con un mensaje que explica el cambio.
- **Staging (`git add`):** elegir qué cambios entran en la próxima foto.
- **Push:** subir tus commits a GitHub (la nube).

El ciclo que vas a repetir miles de veces:

```
editar archivos → git add → git commit -m "mensaje" → git push
```

---

## 2. Ejercicio guiado

Hacelo vos en la terminal de VS Code, con la carpeta `design engineer` abierta. Si algo da error, pegame el mensaje completo.

1. **Verificá tu identidad en Git**
   ```bash
   git config --global user.name
   git config --global user.email
   ```
   Si alguno sale vacío, configuralo:
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu-mail-de-github@ejemplo.com"
   ```

2. **Convertí la carpeta en repo**
   ```bash
   git init
   git status
   ```
   Leé lo que dice `git status`. ¿Qué archivos aparecen como "untracked"?

3. **Primer commit**
   ```bash
   git add .
   git commit -m "Start design engineer journey"
   ```

4. **Creá el repo en GitHub**
   - En github.com → **New repository** → nombre: `design-engineer-journey` → público → **sin** README (ya tenés archivos).
   - GitHub te muestra comandos para "push an existing repository". Copialos y ejecutalos. Van a ser parecidos a:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/design-engineer-journey.git
   git branch -M main
   git push -u origin main
   ```

5. **Verificá:** recargá la página del repo en GitHub. Tienen que aparecer `PLAN-DE-ESTUDIO.md`, `PROGRESO.md` y `clases/`.

---

## 3. Desafío

Creá `clases/00-setup/index.html`: una página simple titulada **"Why I'm becoming a design engineer"** (en inglés), con 2 o 3 párrafos tuyos.

**Criterios de "listo"**
- [ ] HTML semántico: `<main>`, `<h1>`, `<p>`, `lang="en"` en `<html>`.
- [ ] CSS en un `<style>`: ancho de lectura cómodo (pista: unidad `ch`), tipografía cuidada, buen `line-height`.
- [ ] Se ve bien en mobile (probalo achicando la ventana).
- [ ] Commit con un mensaje claro + push a GitHub.

En la **clase 0.2** la publicamos en Vercel con URL pública y vemos cómo usar IA para aprender sin que piense por vos.

---

## 4. Cierre
Agregá una entrada en la bitácora de `PROGRESO.md` y marcá la 0.1 cuando termines el desafío.
