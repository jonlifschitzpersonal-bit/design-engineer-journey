"""Run Impeccable's design hook on the dashboard repo from course sessions.

Sessions open from this course folder, but the dashboard lives in another
folder. Impeccable's own hook skips files outside the session's folder
("outside-project"), so dashboard edits were never checked. This script sends
each hook event to Impeccable as if the session ran inside the dashboard repo.

It never blocks: any problem (no dashboard, no Impeccable, a timeout) exits 0
without output.
"""

import glob
import json
import os
import subprocess
import sys

DASHBOARD = r"D:\Escritorio\proyectos\gurises-unidos-dashboard"
PLUGIN_CACHE = os.path.expanduser(r"~\.claude\plugins\cache\impeccable\impeccable")


def version_key(path):
    return tuple(int(part) if part.isdigit() else 0 for part in os.path.basename(path).split("."))


def find_launcher():
    # The newest installed version, so a plugin update needs no change here.
    for version in sorted(glob.glob(os.path.join(PLUGIN_CACHE, "*")), key=version_key, reverse=True):
        launcher = os.path.join(version, "skills", "impeccable", "scripts", "impeccable.cmd")
        if os.path.isfile(launcher):
            return launcher
    return None


def inside_dashboard(path):
    try:
        return os.path.commonpath([os.path.abspath(path), DASHBOARD]).lower() == DASHBOARD.lower()
    except ValueError:  # different drives
        return False


def main():
    launcher = find_launcher()
    if not launcher or not os.path.isdir(os.path.join(DASHBOARD, ".impeccable")):
        return

    event = json.load(sys.stdin)
    if event.get("hook_event_name") == "PostToolUse":
        file_path = (event.get("tool_input") or {}).get("file_path", "")
        if not file_path or not inside_dashboard(file_path):
            return

    event["cwd"] = DASHBOARD
    result = subprocess.run(
        [launcher, "hook"],
        input=json.dumps(event).encode("utf-8"),
        capture_output=True,
        cwd=DASHBOARD,
        timeout=25,
    )
    # Raw bytes, so accents and dashes reach Claude Code as Impeccable wrote them.
    sys.stdout.buffer.write(result.stdout)


if __name__ == "__main__":
    try:
        main()
    except Exception:
        pass
    sys.exit(0)
