# Drimage Improved steps

1 step, defined in `tests/step-definitions/drupal-drimage-improved.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then the drimage image "img.drimage-image" should be loaded` |

---

## 1. Then the drimage image "img.drimage-image" should be loaded

Assert at least one `<img>` matching the selector decoded a real bitmap (auto-retry).

Attribute assertions cannot tell a rendered image from a broken one. A Drimage
placeholder that never swaps its `src`, or a derivative the server failed to
generate (a 4xx or 5xx on the `/styles/drimage_improved_*` request), still
carries every expected class and attribute while `naturalWidth` stays 0 — so
`should be visible` and `should have attribute` both pass on a broken image.
This step polls until at least one match reports `complete` with a non-zero
natural width, so the derivatives failing to generate fails the scenario red.

"At least one" is deliberate: on a page whose carousel keeps some matches in an
inactive slide, lazy loading has not reached them and never will while the slide
is hidden. Scope the selector when you need one specific image.

The qualifier is optional and interchangeable — `drimage`, `drimage improved`,
`dynamic`, `dynamic responsive`, `responsive`, or none at all. The bare
phrasing the `drimage_improved` module already uses in its own suites keeps
matching, and a team that calls these dynamic responsive images can write it
that way. Default budget is 5 seconds; override it with the trailing
`within N seconds` clause.

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?image "([^"]*)" should be loaded(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the drimage image "img.drimage-image" should be loaded
Then the drimage improved image ".drimage img.drimage-image" should be loaded within 20 seconds
Then the dynamic responsive image ".field--name-field-media-image img" should be loaded within 15 seconds
Then the responsive image "picture img.drimage-image" should be loaded
Then the image "img.drimage-image" should be loaded
```
