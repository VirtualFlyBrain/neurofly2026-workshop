# Self-hostable JupyterLab image for the VFB NeuroFly 2026 workshop.
# Build:  docker build -t vfb-workshop .
# Run:    docker run -p 8888:8888 vfb-workshop
FROM jupyter/scipy-notebook:python-3.11

COPY --chown=${NB_UID}:${NB_GID} requirements.txt /tmp/requirements.txt
# Pin setuptools<58 first so the legacy deps (jsonpath-rw, colormath) build.
RUN pip install --no-cache-dir "setuptools<58" wheel && \
    pip install --no-cache-dir -r /tmp/requirements.txt

COPY --chown=${NB_UID}:${NB_GID} python/ ${HOME}/work/python/
COPY --chown=${NB_UID}:${NB_GID} problems/ ${HOME}/work/problems/
COPY --chown=${NB_UID}:${NB_GID} no-code/ ${HOME}/work/no-code/

EXPOSE 8888
