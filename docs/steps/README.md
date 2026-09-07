# Step definitions

Every step Varbase E2E ships, one page per category, generated from the step
definitions themselves — so the phrasing, the pattern and the examples on these
pages are exactly what the runner matches.

**502 steps across 45 categories.**

Cucumber-js loads every `*.steps.js` under `tests/step-definitions/`
automatically. You never `require()` a step file from a feature: write the
sentence, and the runner finds it.

## How to read a step

Each entry gives you three things:

- **The sentence** — the heading is a real, runnable Gherkin line. Copy it.
- **The pattern** — the regular expression the runner matches. It tells you
  which words are optional (`(?:the )?`) and which are yours to fill in
  (`"([^"]*)"`).
- **The examples** — at least five valid phrasings per step, so you can see the
  shape of the sentence rather than decode the regex.

Every step accepts the pronoun prefix: `I click`, `we click` and bare
`click` all match.


## Drupal and Varbase

Steps for the Drupal and Varbase surfaces the team tests every day — the node and entity forms, the media library, Layout Builder, Drupal Canvas and Varbase's own screens.

| Category | Steps | Page |
| --- | --- | --- |
| Drupal core | 27 | [`drupal-core.md`](drupal-core.md) |
| CKEditor 5 | 4 | [`drupal-ckeditor.md`](drupal-ckeditor.md) |
| Media library | 4 | [`drupal-media.md`](drupal-media.md) |
| Content moderation | 3 | [`drupal-moderation.md`](drupal-moderation.md) |
| Layout Builder | 17 | [`drupal-layout-builder.md`](drupal-layout-builder.md) |
| Paragraphs | 1 | [`drupal-paragraphs.md`](drupal-paragraphs.md) |
| Drimage Improved | 9 | [`drupal-drimage-improved.md`](drupal-drimage-improved.md) |
| Drupal Canvas | 12 | [`drupal-canvas.md`](drupal-canvas.md) |
| Varbase | 12 | [`varbase.md`](varbase.md) |

**91 steps.**

## User journeys

Driving the browser the way a person does: going somewhere, filling something in, clicking, typing, scrolling.

| Category | Steps | Page |
| --- | --- | --- |
| Navigation | 11 | [`navigation.md`](navigation.md) |
| Actions | 7 | [`action.md`](action.md) |
| Forms | 13 | [`form.md`](form.md) |
| Field state | 27 | [`field.md`](field.md) |
| Pointer input | 9 | [`input.md`](input.md) |
| Keyboard | 4 | [`keyboard.md`](keyboard.md) |
| Scrolling | 12 | [`scroll.md`](scroll.md) |
| Links | 9 | [`link.md`](link.md) |
| Modals | 9 | [`modal.md`](modal.md) |
| Browser dialogs | 8 | [`dialog.md`](dialog.md) |

**109 steps.**

## Outcome verification

Asserting what the page ended up showing.

| Category | Steps | Page |
| --- | --- | --- |
| Assertions | 14 | [`assertion.md`](assertion.md) |
| Web-first matchers | 12 | [`web-first.md`](web-first.md) |
| Element interactions | 19 | [`element.md`](element.md) |
| Tables | 8 | [`table.md`](table.md) |
| Meta tags | 3 | [`metatag.md`](metatag.md) |
| Response headers | 4 | [`response.md`](response.md) |

**60 steps.**

## APIs and data formats

Talking to an endpoint and asserting on what comes back.

| Category | Steps | Page |
| --- | --- | --- |
| API (long form) | 22 | [`api.md`](api.md) |
| REST (short form) | 5 | [`rest.md`](rest.md) |
| XML responses | 20 | [`xml.md`](xml.md) |
| YAML responses | 38 | [`yaml.md`](yaml.md) |
| URL paths | 8 | [`path.md`](path.md) |

**93 steps.**

## Test resilience and instrumentation

Everything that keeps a suite honest and debuggable: waits, mocks, state, capture.

| Category | Steps | Page |
| --- | --- | --- |
| Waits | 21 | [`wait.md`](wait.md) |
| Clock | 7 | [`clock.md`](clock.md) |
| Network | 10 | [`network.md`](network.md) |
| Storage | 9 | [`storage.md`](storage.md) |
| Cookies | 12 | [`cookie.md`](cookie.md) |
| Auth state | 3 | [`auth.md`](auth.md) |
| JavaScript errors | 4 | [`javascript.md`](javascript.md) |
| Accessibility | 26 | [`a11y.md`](a11y.md) |
| Iframes | 10 | [`iframe.md`](iframe.md) |
| File downloads | 8 | [`file-download.md`](file-download.md) |
| Selector registry | 24 | [`selectors.md`](selectors.md) |
| Responsive viewports | 5 | [`responsive.md`](responsive.md) |
| Screenshots | 6 | [`screenshot.md`](screenshot.md) |
| Video recording | 4 | [`video.md`](video.md) |
| Debug | 2 | [`debug.md`](debug.md) |

**151 steps.**

## Writing your own

When no shipped step fits, add one to your project's own
`tests/step-definitions/`. Follow the same contract these pages are generated
from:

- Use a regular expression with the `(?:I |we )*` prefix, never a Cucumber
  Expression that hard-codes `I`.
- Plain English in the sentence — `local storage`, not `localStorage`.
- A JSDoc block above the definition with a one-line description and **at least
  five `Example #N:` lines** of valid Gherkin.
- Wrap risky locator work so the tester gets a sentence, not a stack trace.

Search these pages before writing anything: most of what a Varbase suite needs
is already here.

## Regenerating these pages

They are generated from the JSDoc in `tests/step-definitions/*.steps.js`. Edit
the step, not the page — a page edited by hand is overwritten on the next
generation.
