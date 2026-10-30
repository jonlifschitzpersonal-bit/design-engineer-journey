# Clase 5.4: Git en equipo

**Objetivo:** que ningún cambio llegue a `main` sin pasar por una branch, un pull request y una revisión tuya, y que el backlog del proyecto esté en GitHub, a la vista y vinculado a cada cambio.

**Material:**
- Esta guía.
- El repo del dashboard: https://github.com/jonlifschitzpersonal-bit/gurises-unidos-dashboard (pestañas *Issues*, *Pull requests* y *Milestones*).
- Guía *De Figma a código con IA*, §12.

---

## 1. El flujo

```
issue #N        branch                 commits             pull request           main
la tarea   →   tipo/N-tema   →   uno por intención   →   diff + evidencia   →   squash merge
                                                         "Closes #N"             (el #N se cierra solo)
```

| Paso | Comando | Para qué |
|---|---|---|
| Actualizar `main` | `git switch main` y `git pull` | Partir de lo último, no de una versión vieja |
| Crear la branch | `git switch -c feat/15-app-shell` | Trabajar aparte sin tocar `main` |
| Ver qué cambió | `git status`, `git diff` | Revisar antes de guardar |
| Guardar | `git add <archivos>` y `git commit` | Un commit = un motivo |
| Subir la branch | `git push -u origin feat/15-app-shell` | Que exista en GitHub |
| Abrir el PR | `gh pr create` | Pedir que se sume a `main` |
| Ver issues y PRs | `gh issue list`, `gh pr view 19` | Lo mismo que la web, desde la terminal |

**Nombre de la branch:** `tipo/issue-tema`. Los tipos son `feat` (algo nuevo), `fix` (un arreglo), `docs` (documentación), `chore` (mantenimiento) y `refactor` (reordenar sin cambiar lo que hace). Con el nombre ya sabés de qué issue sale.

---

## 2. Issues: el backlog a la vista

Un issue es una tarea con número, título y descripción. Lo que tenía `PENDING_TASKS.md` pasó a 20 issues.

**Cómo se agrupan:**

| Herramienta | Qué agrupa | En el dashboard |
|---|---|---|
| **Milestone** | La etapa: qué tiene que estar para cerrarla | `Repo workflow`, `System components`, `Dashboard v1` |
| **Label** | El tipo de tarea | `enhancement` (algo nuevo), `design` (en Figma), `debt` (deuda a propósito), `needs decision` (espera una decisión tuya), `documentation`, `bug` |

**Cómo se escribe uno:**

- **Qué y por qué** en una o dos líneas.
- **"Done when":** una lista de controles que se pueden comprobar. "Que se vea bien" no sirve; "sin scroll horizontal a 320px", sí.
- **"Blocked by #N"** si depende de otro issue.
- **Source:** de dónde sale (un comentario de Figma, un ADR, una conversación).

**Los issues y `PENDING_TASKS.md` no repiten lo mismo.** El issue tiene el detalle; el archivo tiene el orden de trabajo, lo bloqueado y el porqué de cada deuda, con links a cada issue. Si los dos tuvieran el detalle, tarde o temprano dirían cosas distintas.

**Los números no son el orden.** GitHub numera por orden de creación, y los PRs comparten la misma numeración (el primer PR fue el #19). El orden está en `PENDING_TASKS.md`.

### Ejemplo resuelto: de un comentario de Figma a un issue

Supongamos que alguien comenta en el frame de la tabla, en Figma: *"¿Qué pasa si el nombre del proyecto es muy largo? En la v1 rompía la fila."*

1. **Se clasifica:** es una pregunta de diseño (falta un estado de contenido largo), no un bug del código.
2. **Se convierte en tarea**, con la plantilla *Task*:
   - **Título:** `Define long project names in the projects table`
   - **What and why:** la tabla no define qué pasa con un nombre largo; en v1 rompía la fila.
   - **Done when:** el frame de la tabla en Figma muestra un nombre de 80 caracteres (se corta con "…" o baja a dos líneas, a decidir), anotado; en código, sin desborde a 320px.
   - **Source:** el link al comentario o al nodo en Figma.
   - **Labels:** `design`, `needs decision`. **Milestone:** `Dashboard v1`.
3. **Quién decide:** vos (es producto). El agente no lo resuelve en el código: lo devuelve a diseño.
4. **Se responde el comentario en Figma** con el link al issue, así quien preguntó lo sigue desde ahí.

---

## 3. El pull request

El PR es el lugar donde se revisa un cambio antes de que entre a `main`. En GitHub tiene tres pestañas que importan:

| Pestaña | Qué mirás |
|---|---|
| *Conversation* | La descripción, los comentarios y el botón de merge |
| *Commits* | Los commits de la branch: cada uno tendría que tener un solo motivo |
| *Files changed* | El diff, archivo por archivo. Acá se revisa de verdad |

**La plantilla** (`.github/pull_request_template.md`) hace que todos los PRs tengan las mismas secciones:

| Sección | Por qué está |
|---|---|
| What and why + `Closes #N` | Qué resultado se ve y qué issue cierra |
| Scope: in / out | Lo que quedó afuera a propósito, para que no parezca un olvido |
| Differences with Figma | Las diferencias intencionales, con su motivo |
| Evidence + ledger | Lint, build, capturas y cada control con PASS / FAIL / UNVERIFIED / OUT OF SCOPE |
| Risks and open decisions | Lo que se supuso y lo que puede romperse |
| How to test | Los pasos para que otra persona lo pruebe |
| Docs | Si se actualizaron el estado y los ADR |

**`Closes #N` o `Refs #N`:**
- `Closes #1` (o `Fixes`, `Resolves`): al mergear en `main`, GitHub cierra el #1. Solo funciona cuando el PR va a la branch principal.
- `Refs #20`: lo menciona sin cerrarlo. Se usa cuando el PR avanza la tarea pero no la termina (como el #21, que solo anota el #20 en el orden de trabajo).

**Squash merge:** todos los commits de la branch entran a `main` como uno solo, con el título del PR y su número (`... (#19)`). `main` queda con un commit por cambio y cada uno lleva a su PR. Por eso, en tu compu, Git dice que la branch "no está mergeada": los commits de la branch no son los mismos que el de `main`, aunque el contenido sea igual. Se compara el contenido y recién ahí se borra.

---

## 4. Lo que quedó configurado en el repo

| Qué | Por qué |
|---|---|
| **Regla "Protect main":** PR obligatorio, sin force push, sin borrar `main` | Nadie, ni vos ni el agente, puede escribir directo en `main` |
| **Sin aprobación obligatoria** | GitHub no deja aprobar tu propio PR: con aprobación obligatoria te quedarías trabado. La revisión la hacés igual, antes del merge |
| **Solo squash merge** | Un commit por PR en `main` |
| **Borrar la branch al mergear** | Para que no se acumulen branches viejas |
| **Plantillas de issue:** *Task* y *Bug* | Que todo issue tenga "done when" y fuente |
| **`CLAUDE.md` → "Git workflow"** | El agente sigue el flujo sin que se lo pidas, y **no mergea sus propios PRs**: ese es tu control |

---

## 5. Lo que se hizo en la clase

1. Claude instaló `gh` 2.103.3 (el zip oficial con su checksum, sin permisos de administrador) y vos hiciste el login.
2. Claude creó los labels, los milestones y los issues (#1 a #18, y el #20 al cierre).
3. Claude configuró el repo (regla de `main`, squash, borrar branches).
4. **PR #19**, con 3 commits, uno por intención: plantillas, reglas de Git en el `CLAUDE.md` y `PENDING_TASKS.md` con links a los issues. Vos lo revisaste y lo mergeaste: el #1 se cerró solo y la branch se borró.
5. Al cierre apareció una tarea que nadie había anotado: el ADR 0005 pide que la demo avise que los datos son ficticios. Se creó el #20 y el **PR #21** lo sumó al orden de trabajo, con `Refs #20`. Lo mergeaste vos y el #20 siguió abierto, como corresponde.

**Lo que salió mal y cómo se resolvió:**

- GitHub falló en 7 de las 18 creaciones de issues, así que los números quedaron corridos y las referencias cruzadas (`Blocked by #10`) apuntaban a otros issues. **Regla:** cuando se crean muchas cosas por la API, se verifica la lista al final, y las referencias entre ellas se escriben cuando los números ya existen.
- En el ledger del #21, Claude marcó PASS que "el formulario de PR se completa con la plantilla", pero el PR lo había abierto desde la terminal con su propio texto, así que eso no estaba probado. Se corrigió a UNVERIFIED: un control que no se corrió no es PASS, aunque "seguro funcione".

---

## 6. Ledger de la clase

| Control | Resultado | Evidencia |
|---|---|---|
| `gh` instalado y autenticado | PASS | `gh auth status`: logged in as `jonlifschitzpersonal-bit`, scope `repo` |
| El PR #19 cerró el #1 al mergear | PASS | Issue #1: `CLOSED`, cerrado por el PR #19 |
| La branch se borró al mergear | PASS | La única branch remota es `main` |
| `main` tiene un solo commit por PR | PASS | `453d457 Add PR and issue templates and the Git workflow (#19)` |
| `main` exige PR, sin force push ni borrado | PASS | `gh api repos/.../rules/branches/main`: `pull_request`, `non_fast_forward`, `deletion` |
| Las plantillas de issue están en `main` | PASS | `.github/ISSUE_TEMPLATE/`: `task.yml`, `bug.yml`, `config.yml` |
| Un push directo a `main` se rechaza | UNVERIFIED | La regla está activa, pero no se probó empujando a `main` |
| El formulario de PR en la web se completa con la plantilla | UNVERIFIED | Los dos PRs se abrieron desde la terminal; se comprueba en el próximo que se abra desde la web |
| Las referencias entre issues son correctas | PASS | Revisadas una por una después de corregirlas |
| `Refs #N` no cierra el issue al mergear | PASS | Después de mergear el #21, el #20 sigue `OPEN` |
