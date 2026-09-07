# Drimage Improved steps

9 steps, defined in `tests/step-definitions/drupal-drimage-improved.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

These steps test the **dynamic responsive images** the [Drimage Improved](https://www.drupal.org/project/drimage_improved) module renders — the module Varbase's default theme uses for every image. They carry **no CSS selectors**: the module's formatter markup is stable (a wrapper carrying `data-drimage_improved`, a `<picture>` with an optional WebP `<source>`, the `<img>` on an SVG placeholder, a `<noscript>` fallback inside or right after the wrapper), and its JS swaps the placeholder for a derivative under `/styles/drimage_improved_*`. The pack knows all of that, so a tester writes `the drimage images should be loaded` and nothing else. Themes re-class the `<img>` freely — the Varbase theme drops `drimage-image` altogether — so nothing here depends on a class.

**The default budget is 2 seconds.** The module exists to make images fast; a step that waits 15 or 20 seconds is hiding a problem, not tolerating one. Every step settles the page first with the harness BBR wait (`smartSettle`: `networkidle` plus the AJAX, pending-timer and DOM-quiet counters), so the module's `setTimeout` swap has fired before the assertion looks — no static sleeps anywhere.

**The qualifier is optional and interchangeable**: `drimage`, `drimage improved`, `dynamic`, `dynamic responsive`, `responsive`, or none at all name the same images.

**Why the derivative URL matters**: the SVG placeholder itself decodes (`naturalWidth > 0`), so a bitmap check alone cannot tell a placeholder from a loaded image. An image counts as loaded only once its `src` is a real derivative *and* the bitmap decoded. Images still on their placeholder because lazy loading has not reached them are never counted against the page.

| # | Step |
| --- | --- |
| 1 | `Then the drimage images should be loaded` |
| 2 | `Then the drimage image "Team collaborating in a modern glass-walled office" should be loaded` |
| 3 | `Then the drimage images should be rendered` |
| 4 | `Then the drimage images should offer webp` |
| 5 | `Then the drimage images should have a noscript fallback` |
| 6 | `Then no drimage image should be broken` |
| 7 | `Then the drimage images should be sized for the viewport` |
| 8 | `Then the drimage images should use lazy loading` |
| 9 | `Then the drimage image "Team meeting around a table" should still be a placeholder` |

A typical page check, as the Vardot QA team runs it against a Varbase site:

```gherkin
Given I am an anonymous user
When I go to homepage
Then the drimage images should be rendered
And the drimage images should offer webp
And the drimage images should have a noscript fallback
And the drimage images should use lazy loading
And the drimage images should be loaded
And no drimage image should be broken
And the drimage images should be sized for the viewport
When I scroll to the bottom of the page
Then the drimage images should be loaded within 2 seconds
When I set the viewport to the "xs" breakpoint
Then the drimage images should be sized for the viewport within 2 seconds
```

---

## 1. Then the drimage images should be loaded

Assert the Drimage images on the page loaded: at least one has swapped its placeholder for a real derivative, and every swapped one decoded a bitmap. A placeholder that never swaps, or a derivative the server failed to generate (a 4xx or 5xx on the `/styles/drimage_improved_*` request), fails red.

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?images should be loaded(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the drimage images should be loaded
Then the drimage improved images should be loaded within 2 seconds
Then the dynamic responsive images should be loaded
And the responsive images should be loaded within 1 second
Then the images should be loaded
```

## 2. Then the drimage image "Team collaborating in a modern glass-walled office" should be loaded

Assert one Drimage image, named by its **alt text**, swapped its placeholder for a real derivative and decoded the bitmap. The alt text is what an editor typed and what a screen reader says — the human name of the image, no class or id needed.

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?image "([^"]*)" should be loaded(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the drimage image "Team collaborating in a modern glass-walled office" should be loaded
Then the drimage improved image "Team meeting around a table" should be loaded within 2 seconds
Then the dynamic image "Campus at dusk" should be loaded
And the responsive image "Annual report cover" should be loaded within 1 second
Then the image "Team collaborating in a modern glass-walled office" should be loaded
```

## 3. Then the drimage images should be rendered

Assert the page renders at least one Drimage image: the formatter wrapper carrying the module's data object is in the DOM. The formatter check — did the field display actually go through Drimage Improved — before any loading question.

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?images should be rendered(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the drimage images should be rendered
Then the drimage improved images should be rendered within 2 seconds
Then the dynamic responsive images should be rendered
And the responsive images should be rendered within 1 second
Then the images should be rendered
```

## 4. Then the drimage images should offer webp

Assert every rendered wrapper has a `<source type="image/webp">` in its `<picture>` — present when core WebP or ImageAPI Optimize WebP is on. This is how a test proves the setting reached the front end.

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?images should offer webp(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the drimage images should offer webp
Then the drimage improved images should offer webp within 2 seconds
Then the dynamic responsive images should offer webp
And the responsive images should offer webp within 1 second
Then the images should offer webp
```

## 5. Then the drimage images should have a noscript fallback

Assert every Drimage image carries a `<noscript>` fallback, so a visitor without JavaScript still gets an image. The module template puts it inside the wrapper; the `vartheme_bs5` component puts it right after — both count.

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?images should have a noscript fallback(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the drimage images should have a noscript fallback
Then the drimage improved images should have a noscript fallback within 2 seconds
Then the dynamic responsive images should have a noscript fallback
And the responsive images should have a noscript fallback within 1 second
Then the images should have a noscript fallback
```

## 6. Then no drimage image should be broken

Assert no Drimage image on the page is broken: every one that swapped to a derivative decoded it. Images still on their placeholder pass, so this is the safe check for a long page where lazy loading has not reached the bottom.

**Keyword**: `Then`

**Pattern**

```js
/^no (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?image should be broken(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then no drimage image should be broken
Then no drimage improved image should be broken within 2 seconds
Then no dynamic responsive image should be broken
And no responsive image should be broken within 1 second
Then no image should be broken
```

## 7. Then the drimage images should be sized for the viewport

Assert every loaded Drimage image is served at a derivative width that fits where it is rendered: within one threshold step of the rendered width times the device pixel ratio, inside the module's upscale / downscale clamps. The threshold, upscale, downscale and multiplier are read from each wrapper's own data object, so the test follows the site's settings.

This is the **responsive-image check**. Resize with `When I set the viewport to the "xs" breakpoint` and assert again: the module requests a smaller derivative for the smaller viewport, and a page that ships a 1920px derivative into a 375px phone fails here.

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?images should be sized for the viewport(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the drimage images should be sized for the viewport
Then the drimage improved images should be sized for the viewport within 2 seconds
Then the dynamic responsive images should be sized for the viewport
And the responsive images should be sized for the viewport within 1 second
Then the images should be sized for the viewport
```

## 8. Then the drimage images should use lazy loading

Assert the Drimage images defer offscreen loading. Each wrapper's data object must ask for lazy loading, and every image must be either still on its placeholder (the module has not rendered it because it is not near the viewport — that deferral *is* the lazy loading) or carry `loading="lazy"`, which the module sets the moment it renders one.

Learnt on demo.varbase.vardot.com: the module puts no `loading` attribute on an image it has not reached, and hidden slider slides never get one, so "every img has loading=lazy" would fail a page that is lazy loading perfectly. An image that swapped to a derivative *without* the attribute, or a wrapper configured eager, is what fails.

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?images should use lazy loading(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the drimage images should use lazy loading
Then the drimage improved images should use lazy loading within 2 seconds
Then the dynamic responsive images should use lazy loading
And the responsive images should use lazy loading within 1 second
Then the images should use lazy loading
```

## 9. Then the drimage image "Team meeting around a table" should still be a placeholder

Assert a Drimage image, named by its alt text, has **not** loaded yet: it is still on the module's SVG placeholder because it sits outside the viewport and lazy loading has not reached it. This is the **intersection check** — settle the page, look once (no waiting for something not to happen), then scroll it into view and assert it loads:

```gherkin
Then the drimage image "Team meeting around a table" should still be a placeholder
When I scroll to the bottom of the page
Then the drimage image "Team meeting around a table" should be loaded within 2 seconds
```

**Keyword**: `Then`

**Pattern**

```js
/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?image "([^"]*)" should (?:still be a placeholder|not be loaded yet)$/
```

**Examples**

```gherkin
Then the drimage image "Team meeting around a table" should still be a placeholder
Then the drimage improved image "Footer map" should not be loaded yet
Then the dynamic responsive image "Campus at dusk" should still be a placeholder
And the responsive image "Annual report cover" should not be loaded yet
Then the image "Team meeting around a table" should still be a placeholder
```
