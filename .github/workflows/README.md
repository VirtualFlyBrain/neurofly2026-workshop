# GitHub Actions Workflows

## Docker Site CI (`.github/workflows/docker-site.yml`)

Builds and deploys the Hugo workshop site to Docker Hub.

**Triggers:**
- Push to `main` or `master` branch
- Tag pushes (e.g., `v1.0.0`)
- Pull requests (build only, no push)

**Output:**
- `virtualflybrain/vfb-workshop-site:latest` — always updated on main/master
- `virtualflybrain/vfb-workshop-site:<version>` — tag-specific or branch name

**Required Secrets:**
- `DOCKER_HUB_USER` — Docker Hub username
- `DOCKER_HUB_PASSWORD` — Docker Hub password or access token

**Usage:**
```bash
# After successful push to main:
docker pull virtualflybrain/vfb-workshop-site:latest
docker run -p 8080:80 virtualflybrain/vfb-workshop-site:latest
```

## Docker Notebooks CI (`.github/workflows/docker-notebooks.yml`)

Builds and deploys the JupyterLab notebook container to Docker Hub.

**Triggers:**
- Push to `main` or `master` branch
- Tag pushes (e.g., `v1.0.0`)
- Pull requests (build only, no push)

**Output:**
- `virtualflybrain/vfb-workshop-notebooks:latest` — always updated on main/master
- `virtualflybrain/vfb-workshop-notebooks:<version>` — tag-specific or branch name

**Required Secrets:**
- `DOCKER_HUB_USER` — Docker Hub username
- `DOCKER_HUB_PASSWORD` — Docker Hub password or access token

**Usage:**
```bash
# After successful push to main:
docker pull virtualflybrain/vfb-workshop-notebooks:latest
docker run -p 8888:8888 virtualflybrain/vfb-workshop-notebooks:latest
```

## Setting Up Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - `DOCKER_HUB_USER`: Your Docker Hub username (e.g., `virtualflybrain`)
   - `DOCKER_HUB_PASSWORD`: Docker Hub password or access token

**Creating a Docker Hub Access Token:**

1. Log in to [Docker Hub](https://hub.docker.com/)
2. Go to **Account Settings** → **Security**
3. Click **New Access Token**
4. Give it a name (e.g., `GitHub Actions`)
5. Select **Read & Write** permissions
6. Copy the token and add it as `DOCKER_HUB_PASSWORD` secret

## Build Outputs

Both workflows provide:

1. **Build verification** — Images are built and tested locally
2. **Conditional push** — Only pushed on main/master/tags, not on PRs
3. **Build summary** — GitHub Actions summary with build status and image info

## Troubleshooting

### Build fails at "Login to Docker Hub"
- Check that `DOCKER_HUB_USER` and `DOCKER_HUB_PASSWORD` secrets are set
- Verify the Docker Hub account has permission to push to `virtualflybrain/`

### Image builds but doesn't push
- Check that the push is on `main`, `master`, or a tag (not a feature branch)
- Review the workflow run logs for the "Push to Docker Hub" step

### Hugo build fails
- Check `site/` directory structure
- Verify Hugo version compatibility (tested with 0.122.0+)
- Run `cd site && hugo --verbose` locally to reproduce
