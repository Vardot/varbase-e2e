# AGENTS.md — varbase-e2e

This file follows the [agents.md](https://agents.md) convention: short,
machine-readable rules for any AI agent (Claude, Codex, Cursor, Copilot,
etc.) working on the repository.

For full project context, read `CLAUDE.md` in the same directory — it is
the canonical, longer policy (commands §1, architecture §2, file
organisation §5, BBR waits §6, local agents and skills §11). This file
extracts the critical rules that every agent must respect. When the two
disagree, `CLAUDE.md` wins — and the disagreement is a bug to fix in the
same change.

## Identity

varbase-e2e is a BDD browser-automation harness built on Playwright +
Cucumber-js. It is its own product. Never reference Behat, DrevOps,
Drupal, or PHP in code, file names, comments, or step phrasings.

## Hard rules

1. **No git commits.** The user commits manually. Never invoke
   `git commit`, `git push`, `npm publish`, or anything that mutates a
   shared repository / registry without explicit per-action consent.
2. **Update docs in the same change.** Step / selector / config changes
   must update the matching page in `docs/`. A `worldParameters` change
   must also update the scaffold template in `bin/init-varbase-e2e.js`.
3. **Stay green.** Every change must keep `npx cucumber-js --dry-run`
   ambiguity-free and `npx cucumber-js` passing. `node_modules/` is not
   committed — run `npm install` first, and `npm start` (the `examples/`
   fixture server on :8080) before the suite. If you could not run it,
   say so; never imply green.
4. **Backups.** When asked, bump `package.json` `version` and emit
   `~/workspace/products/varbase-e2e-<version>.zip` excluding
   `node_modules/`, `tests/reports/`, `screenshots/`, `.git/`.

## Step definition rules

* Use a regex with `(I |we )*` — never `'I ...'` Cucumber Expressions
  unless the step genuinely cannot start with a pronoun.
* Write step text in plain English. Avoid camelCase identifiers
  (`local storage`, not `localStorage`).
* Every step needs a JSDoc block with at least 5 `Example #N:` Gherkin
  lines. Each example header line must match the step pattern when the
  Gherkin keyword is stripped.
* No static `sleep` calls. Wait steps go through `smartSettle()` in
  `varbase-e2e.js`.
* Never let a raw Playwright error reach the tester. Wrap risky locator
  work and re-throw through `friendly()` / `humanize()` — see
  `actOrExplain()` in `action.steps.js` for the reference shape.
* Place new steps in the file whose topic matches. Don't create a new
  file unless the topic is genuinely orthogonal to every existing one.

## Do-not-merge boundaries

| Pair | Reason |
| --- | --- |
| `modal.steps.js` vs `dialog.steps.js` | HTML modal overlay vs native browser alert/confirm/prompt. |
| `field.steps.js` vs `form.steps.js` | CSS-selector field control vs label/placeholder/name form fills. |
| `xml.steps.js` vs `yaml.steps.js` | Different parsers and different path conventions. |
| `api.steps.js` vs `rest.steps.js` | Long-form (header + body table) vs short-form REST steps. |
| `web-first.steps.js` vs `assertion.steps.js` | Auto-retrying matchers vs single-snapshot assertions. |
| `element.steps.js` vs `input.steps.js` | Element-scoped (`the element "X"`) vs short pointer (`"X"`). |

## Quick prompt templates

**New feature file:** REASONS canvas → comments → Background → Scenarios →
tags → run.

**New step:** search first — if a match exists, point at it instead of
duplicating. Place by topic. Regex with `(I |we )*`. Plain English. JSDoc
with ≥5 examples. Friendly try/catch for locator actions.

**Maintenance:** run suite → group failures → fix selectors in JSON
preset (not feature files) → re-run → iterate.

**Flaky debug:** `HEADLESS=false SLOW_MO=800` → screenshots/ → replace
sleeps with edge waits.

## Workflow checklist

Before reporting a task complete:

* [ ] Ran `npx cucumber-js --dry-run` — no ambiguity, no undefined steps.
* [ ] Ran the affected feature(s) via `LAUNCH_URL=http://localhost:8080 npx cucumber-js <path>`.
* [ ] Updated `docs/04-step-reference.md` and the topic doc if a step or
      selector preset changed.
* [ ] Updated `docs/README.md` source layout + step counts if a step file
      was added or steps were added / removed.
* [ ] Updated `bin/init-varbase-e2e.js` if `worldParameters` changed.
* [ ] Verified examples match patterns (no audit mismatches).
* [ ] Bumped version + produced backup zip if user requested it.

## Wisdom from the Recipes book

`docs/12-ai-agent-guide.md` is the AI-specific guide distilled from
*Varbase-E2E-Recipes v1.0.30*. Read it before authoring features or
step definitions. Critical takeaways:

* **AI generates. Humans validate. Tests verify.**
* **Test-Drive-Develop:** human writes Gherkin → AI implements → tests
  decide pass / fail.
* **SPDD REASONS canvas** (Requirements, Entities, Approach, Structure,
  Operations, Norms, Safeguards) — apply it before writing any
  `Scenario:` lines on high-value features.
* **Fix the prompt first** when reality diverges.
* **One scenario, one behaviour. Wait for events, not time. Test
  behaviour, not implementation.**

## Source map

Step definitions: `tests/step-definitions/` — 512 steps across 45
`*.steps.js` files, all auto-loaded, including the Drupal and Varbase packs
(`drupal-core`, `drupal-ckeditor`, `drupal-media`, `drupal-moderation`,
`drupal-layout-builder`, `drupal-paragraphs`, `drupal-canvas`, `varbase`)
with their shared plumbing in `drupal-helpers.js`. The `varbase-e2e.js` file there is the
single canonical entry point — World, hooks, init script, and shared
helpers (`smartSettle`, `waitForPageLoad`, `buildSelector`, `gotoUrl`,
`fillField`, `getLocatorText`, `pad`, the modal probes
`getModalSelector` / `getModalLocator` / `waitForModalState` /
`findVisibleModal` / `isAnyModalVisible`, the date helpers
`resolveRelativeDate` / `parseRelativeOffset` / `formatRelativeDate`, and
the error builders `friendly` / `humanize`). It also owns two
process-level side effects: the stdout hook-line filter and the auto HTML
report on exit.

Docs: `docs/` — see `docs/README.md` for the reading order.

Selector presets: `tests/selectors/*.json` — 26 presets. Canonical key
list: `tests/selectors/_canonical-keys.json`.

Config: `cucumber.js` (`worldParameters`, annotated) and
`playwright.config.ts` (browser launch + context), plus the scaffold
template in `bin/init-varbase-e2e.js` that must mirror them.

Visual regression: not in this repository — consumers install a step-pack
plugin such as [`@webship-js/diffy-steps`](https://github.com/webship/diffy-steps).
Third-party `*-steps` packs built for the harness this grew from work with
varbase-e2e unchanged.

## This repo is the package

varbase-e2e ships `tests/` to consumers on npm, so `tests/` is both the
step library and its own test suite. The local agents and skills that
drive this project (`agent-varbase-e2e`, `varbase-e2e-ai-agent`, and the
`/varbase-e2e-*` skills) all read `node_modules/@vardot/varbase-e2e/...` as their
source of truth. That path does not exist here — translate it to
`tests/step-definitions/`, `docs/`, `bin/`. Running one of them
unmodified inside this repository reads the published copy from GitHub,
not the working tree. See `CLAUDE.md` §11.
