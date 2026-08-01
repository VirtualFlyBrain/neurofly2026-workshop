"""Execute every workshop notebook cell-by-cell and report what breaks.

Runs against the live VFB service, exactly as an attendee would, but with
allow_errors=True so one broken cell doesn't hide the rest of the failures.
Executed copies (with outputs) land in _exec/ for inspection; the repo's
notebooks are left untouched.

VFB datasets and the vfb_connect API move between releases, so re-run this
before the event — and after any dependency bump — to catch cells that have
gone silently empty as well as ones that raise.

    pip install -r requirements.txt nbclient nbformat ipykernel
    python -m ipykernel install --user --name vfbws
    VFBWS_KERNEL=vfbws python tools/run_notebooks.py

    # one module, shorter cell timeout
    VFBWS_KERNEL=vfbws python tools/run_notebooks.py 120 03_Visualisation

Exits non-zero if any cell raised, so it can gate CI.
"""
import json
import os
import pathlib
import sys
import time
import traceback

import nbformat
from nbclient import NotebookClient

REPO = pathlib.Path(__file__).resolve().parent.parent
OUT = REPO / "_exec"
OUT.mkdir(exist_ok=True)

KERNEL = os.environ.get("VFBWS_KERNEL", "python3")
CELL_TIMEOUT = int(sys.argv[1]) if len(sys.argv) > 1 else 600

targets = sorted(REPO.glob("python/*.ipynb")) + sorted(REPO.glob("python/reference/*.ipynb"))
if len(sys.argv) > 2:
    wanted = sys.argv[2:]
    targets = [t for t in targets if any(w in str(t) for w in wanted)]

summary = []

for nb_path in targets:
    rel = nb_path.relative_to(REPO)
    nb = nbformat.read(nb_path, as_version=4)
    client = NotebookClient(
        nb,
        timeout=CELL_TIMEOUT,
        kernel_name=KERNEL,
        allow_errors=True,
        resources={"metadata": {"path": str(nb_path.parent)}},
    )
    started = time.time()
    try:
        client.execute()
        fatal = None
    except Exception:
        fatal = traceback.format_exc(limit=3)
    elapsed = time.time() - started

    errors = []
    for i, cell in enumerate(nb.cells):
        if cell.cell_type != "code":
            continue
        for output in cell.get("outputs", []):
            if output.get("output_type") == "error":
                errors.append(
                    {
                        "cell": i,
                        "ename": output.get("ename"),
                        "evalue": (output.get("evalue") or "").strip().splitlines()[:3],
                        "source": "".join(cell.source)[:400],
                        "traceback_tail": list(output.get("traceback", [])[-4:]),
                    }
                )

    nbformat.write(nb, OUT / rel.name)
    summary.append(
        {"notebook": str(rel), "seconds": round(elapsed, 1), "fatal": fatal, "errors": errors}
    )
    status = "FATAL" if fatal else (f"{len(errors)} error(s)" if errors else "clean")
    print(f"{str(rel):46s} {elapsed:7.1f}s  {status}", flush=True)

(OUT / "summary.json").write_text(json.dumps(summary, indent=2))
print("\nwrote _exec/summary.json")

failed = [s for s in summary if s["fatal"] or s["errors"]]
if failed:
    print(f"{len(failed)} notebook(s) with problems: " + ", ".join(s["notebook"] for s in failed))
sys.exit(1 if failed else 0)
