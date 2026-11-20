# CI / CD setup

Varbase E2E ships one ready-to-use CI config: **GitHub Actions**. The pattern is
install Node 24, install Playwright's chromium with its system deps, start the
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

Runs on a push to `2.0.x`, on a pull request to `2.0.x` and by hand (`Actions → Github Actions → Run workflow`). The token is read-only (`permissions: contents: read`). A newer push to the same pull request cancels the run in progress. A run on `2.0.x` and a run started by hand have a concurrency group of their own: they are never queued behind another run and never cancelled.

Single job `build` on `ubuntu-latest`, 45-minute limit:

1. `actions/checkout@v7` — pulls the repo.
2. `actions/setup-node@v7` — Node 24.x, with the npm cache keyed on `package.json`.
3. `npm install`.
4. `npm run test:report` — generates an HTML report from a small JSON and checks it: no third-party icon, the project's own version, the place of execution.
5. `npx playwright install --with-deps chromium`.
6. `npm run test:examples` — no browser: every step definition is documented, every example step and every feature step resolves to exactly one definition.
7. `npm run test:paths` — no browser: a feature or a scenario (`file:line`) named on the command line runs alone, and naming none runs the whole suite (dry runs).
8. `npm run test:screenshots` — runs a skipped, a pending and a failing scenario and checks that only the failing one leaves a failure screenshot.
9. `npm run test:config` — runs a scenario with a `cucumber.js` whose `worldParameters` carry only the launch URL, and checks that it passes and that the run ends by itself.
10. `npm run test:breakpoints` — the `@mobile` / `@desktop` tags and the two named-viewport steps open at the sizes of one registry: the config, `VARBASE_E2E_SELECTORS_BREAKPOINTS`, the breakpoint marked `default: true` and the names a scenario adds.
11. `npm run test:context` — runs scenarios that restore an auth state and start and stop a video recording, and checks that the new page keeps the viewport of the `@mobile` tag, the smart waits, the cookies, JavaScript-error capture and the request log (it serves its own page).
12. `npm run test:video` — runs recorded scenarios in the `on`, `on-failure` and `off` modes and checks the video folder: final names with the status in lower case, no temporary `page@….webm` left, `print video path` printing the saved path, a reserved name kept on failure, a stopped recording named by the pattern, `VARBASE_E2E_VIDEO_SIZE` read.
13. `npm run test:world` — runs a project World that extends `PlaywrightWorld` with a project step ending in `this.smartSettle()`, then a World that replaces it, and checks the first keeps the `@mobile` viewport and the settle and the second is reported (it serves its own page).
14. `npm run test:clock` — installs a fake clock and checks that a navigation and a press still settle as soon as the page is quiet, and that advancing a clock nobody installed prints a note (it serves its own page).
15. `npm start &` — backgrounds the fixture server.
16. Waits until the server answers on port 8080 (30 seconds at most).
17. `npm run test:must-fail` — runs the scenarios of `tests/must-fail/`, which must fail, and checks that each fails at its last step with the message it announces, the address of the page and a hint.
18. `npm test`.
19. `npm run test:scaffold` — scaffolds a new project, runs its first `npm test` and one feature named on the command line (see the notes below).
20. `actions/upload-artifact@v7` — uploads the report, screenshots and videos, on success and on failure.

`FORCE_COLOR=1` is set on the job so cucumber-js v10 emits ANSI colours.

### Badge

Already shipped in `README.md`:

```markdown
[![Github Actions](https://github.com/Vardot/varbase-e2e/actions/workflows/github-actions.yml/badge.svg?branch=2.0.x)](https://github.com/Vardot/varbase-e2e/actions)
```

The badge follows the workflow file name and branch — no extra setup.

### Reports

Every run, passed or failed, uploads one artifact named `cucumber-report`, kept 14 days (`run page → Artifacts`):

```yaml
- uses: actions/upload-artifact@v7
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: cucumber-report
    path: |
      tests/reports/
      screenshots/
      videos/
    retention-days: 14
    if-no-files-found: ignore
```

- `tests/reports/` — `cucumber_report.json` and the HTML report `cucumber_report.html`.
- `screenshots/` — the screenshot of each failed step (`failed_*.png`) and the ones the screenshot steps save.
- `videos/` — the recordings, when `VARBASE_E2E_VIDEO` or a `@video` tag turns recording on.

For a PDF next to the HTML report, add `npx generate-reports --format pdf` as a step with `if: always()` before the upload.

### Notes

- **A fork does not run workflows until someone says so.** If this repository is still a fork, GitHub blocks every run until the owner presses "I understand my workflows, go ahead and enable them" once in the Actions tab. There is no API for that button, and enabling Actions in the repository settings does not replace it.
- The fixture server is a tiny `http-server` static site on port 8080 — no Docker daemon required on the runner.
- After the suite, `npm run test:scaffold` scaffolds a new project in a temporary folder the way the post-install does after `npm init -y`, checks its files and scripts, and runs its first `npm test` against the `examples/` pages.
- The repository tracks no `package-lock.json`, so the npm cache is keyed on `package.json` (`cache-dependency-path`).
- For a per-browser matrix: add `strategy.matrix.browser: [chromium, firefox, webkit]` + `BROWSER: ${{ matrix.browser }}` to the env block, and replace `chromium` in the playwright install line with `${{ matrix.browser }}`.

### Running the suite on another provider

Nothing in Varbase E2E is GitHub-specific. Any runner that can do

```bash
npm install
npx playwright install --with-deps chromium
npm start &
npm test
```

on Node 24+ will work — GitLab CI, CircleCI, Jenkins, Azure Pipelines and the
rest only need that four-line shape translated into their own YAML.
