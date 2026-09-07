'use strict';

// -----------------------------------------------------------------------------
// Drimage Improved step definitions: assertions for the responsive images the
// drimage_improved module renders.
//
// Ported from the drimage_improved project's own tests/step-definitions/ so
// every site using the module gets them from @vardot/varbase-e2e instead of
// copying the file into each project.
// -----------------------------------------------------------------------------

const { Then } = require('@cucumber/cucumber');
const { smartSettle, friendly } = require('./varbase-e2e');

function parseTimeout(secondsStr) {
  const n = secondsStr ? parseInt(secondsStr, 10) : 0;
  return n > 0 ? n * 1000 : 5000;
}

/**
 * Assert at least one <img> matching the selector decoded a real bitmap (auto-retry).
 *
 * Attribute assertions cannot tell a rendered image from a broken one: a
 * responsive-image placeholder that never swaps its `src`, or a derivative the
 * server failed to generate (a 4xx or 5xx on the /styles/ request), still
 * carries every expected class and attribute while `naturalWidth` stays 0.
 *
 * It smart-settles the page first — the harness's BBR wait: networkidle plus
 * the AJAX, pending-timer and DOM-quiet counters the init script maintains —
 * so a loader that swaps the placeholder inside a setTimeout has fired before
 * the assertion looks at all. Then it polls until a match reports `complete`
 * with a non-zero natural width, so a broken derivative fails red. "At least
 * one" keeps it stable on pages where some matches sit in an inactive carousel
 * slide lazy loading has not reached. Default budget 5 seconds; no static
 * sleeps anywhere.
 *
 * The qualifier is optional and interchangeable — "drimage", "drimage
 * improved", "dynamic", "dynamic responsive", "responsive", or none at all, so
 * the bare phrasing the drimage_improved module already uses in its own suites
 * keeps matching while a team that calls these dynamic responsive images can
 * write it their way.
 *
 * Example #1: Then the drimage image "img.drimage-image" should be loaded
 * Example #2: Then the drimage improved image ".drimage img.drimage-image" should be loaded within 20 seconds
 * Example #3: Then the dynamic responsive image ".field--name-field-media-image img" should be loaded within 15 seconds
 * Example #4: Then the responsive image "picture img.drimage-image" should be loaded
 * Example #5: Then the image "img.drimage-image" should be loaded
 *
 */
Then(/^the (?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?image "([^"]*)" should be loaded(?: within (\d+) seconds?)?$/, async function (selector, sec) {
  const budget = parseTimeout(sec);

  // BBR: let the page settle first — networkidle plus the AJAX, pending-timer
  // and DOM-quiet counters the init script maintains — so a lazy loader that
  // swaps the placeholder in a setTimeout has fired before we look at all.
  await smartSettle(this.page, budget);

  try {
    await this.page.locator(selector).first().waitFor({ state: 'attached', timeout: budget });
  } catch (cause) {
    throw friendly(`No element matching "${selector}" ever attached to the page`, cause);
  }

  try {
    await this.page.waitForFunction(
      (sel) => Array.from(document.querySelectorAll(sel)).some((img) => img.complete && img.naturalWidth > 0),
      selector,
      { timeout: budget, polling: 200 }
    );
  } catch (cause) {
    const widths = await this.page
      .locator(selector)
      .evaluateAll((imgs) => imgs.map((img) => img.naturalWidth))
      .catch(() => []);
    throw friendly(
      `Expected at least one image matching "${selector}" to decode a bitmap, but the natural widths were [${widths.join(', ')}] — the image is broken or its derivative was never generated`,
      cause
    );
  }
});
