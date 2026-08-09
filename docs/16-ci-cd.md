# CI / CD setup

Varbase E2E ships one ready-to-use CI config: **GitHub Actions**. The pattern is
install Node 20, install Playwright's chromium with its system deps, start the
fixture server on port 8080, run `npm test`. No build step — `tsx` transpiles
`.ts` step files on the fly.

| Provider | File | Account needed | Badge |
| --- | --- | --- | --- |
| GitHub Actions | `.github/workflows/github-actions.yml` | GitHub | yes |

---

## GitHub Actions

**File**: `.github/workflows/github-actions.yml`.

GitHub's native CI/CD. Free tier: 2,000 minutes per month for private repos,
**unlimited** for public repos. Linux minutes count 1:1, macOS 10:1, Windows 2:1.

### Setup steps — open account + connect repo

1. **Sign up for GitHub** at <https://github.com/signup>. Free.
2. **Fork or push the repo**. Workflows under `.github/workflows/` are picked up automatically — no UI step needed.
3. **Enable Actions** if you forked: `repo → Settings → Actions → General → Allow all actions`. New repos have Actions enabled by default.
4. **Add secrets** (optional, only if a step needs them): `Settings → Secrets and variables → Actions → New repository secret`. None are required for the shipped workflow.

### Workflow contents

Single job `build` on `ubuntu-latest`:

1. `actions/checkout@v4` — pulls the repo.
2. `actions/setup-node@v4` — Node 20.x.
3. `npm install`.
4. `npx playwright install --with-deps chromium`.
5. `npm start &` — backgrounds the fixture server.
6. `sleep 3`.
7. `npm test`.
8. `actions/upload-artifact@v4` — the HTML/JSON report and the failure screenshots, on every run.

Triggers: `push`, `pull_request` and `workflow_dispatch`. The `pull_request` trigger is what puts a check on a PR; `workflow_dispatch` lets you start a run from the Actions tab or over the API.

`FORCE_COLOR=1` is set on the job so cucumber-js v10 emits ANSI colours.

### Badge

Already shipped in `README.md`:

```markdown
[![Github Actions](https://github.com/Vardot/varbase-e2e/actions/workflows/github-actions.yml/badge.svg?branch=2.0.x)](https://github.com/Vardot/varbase-e2e/actions)
```

The badge follows the workflow file name and branch — no extra setup.

### Reports

The workflow uploads a `cucumber-report` artifact on every run, pass or fail:

```yaml
- name: Upload the report and screenshots
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: cucumber-report
    path: |
      tests/reports/cucumber_report.html
      tests/reports/cucumber_report.json
      screenshots/
    if-no-files-found: ignore
```

### Notes

- **A fork does not run workflows until someone says so.** If this repository is still a fork, GitHub blocks every run until the owner presses "I understand my workflows, go ahead and enable them" once in the Actions tab. There is no API for that button, and enabling Actions in the repository settings does not replace it.
- The fixture server is a tiny `http-server` static site on port 8080 — no Docker daemon required on the runner.
- For a per-browser matrix: add `strategy.matrix.browser: [chromium, firefox, webkit]` + `BROWSER: ${{ matrix.browser }}` to the env block, and replace `chromium` in the playwright install line with `${{ matrix.browser }}`.

### Running the suite on another provider

Nothing in Varbase E2E is GitHub-specific. Any runner that can do

```bash
npm install
npx playwright install --with-deps chromium
npm start &
npm test
```

on Node 20+ will work — GitLab CI, CircleCI, Jenkins, Azure Pipelines and the
rest only need that four-line shape translated into their own YAML.
