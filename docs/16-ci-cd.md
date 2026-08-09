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

1. `actions/checkout@v3` — pulls the repo.
2. `actions/setup-node@v3` — Node 20.x.
3. `npm install`.
4. `npx playwright install --with-deps chromium`.
5. `npm start &` — backgrounds the fixture server.
6. `sleep 3`.
7. `npm test`.

`FORCE_COLOR=1` is set on the job so cucumber-js v10 emits ANSI colours.

### Badge

Already shipped in `README.md`:

```markdown
[![Github Actions](https://github.com/Vardot/varbase-e2e/actions/workflows/github-actions.yml/badge.svg?branch=2.0.x)](https://github.com/Vardot/varbase-e2e/actions)
```

The badge follows the workflow file name and branch — no extra setup.

### Reports

The current workflow does not upload artefacts. To add them, append:

```yaml
- uses: actions/upload-artifact@v4
  if: always()
  with:
    name: cucumber-report
    path: |
      tests/reports/cucumber_report.html
      tests/reports/cucumber_report.pdf
      tests/reports/cucumber_report.json
      screenshots/
```

### Notes

- A deprecation warning fires on every run: `actions/checkout@v3` and `actions/setup-node@v3` use Node 20 internally; GitHub will force Node 24 on 2026-06-02. Bump to `@v4` (which targets Node 24) before then. We left them at `@v3` for now so existing forks do not need to rewrite YAML.
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
