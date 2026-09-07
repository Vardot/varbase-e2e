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
const { friendly } = require('./varbase-e2e');

function parseTimeout(secondsStr) {
  const n = secondsStr ? parseInt(secondsStr, 10) : 0;
  return n > 0 ? n * 1000 : 5000;
}

// Poll fn() until predicate(value) holds, or the budget elapses.
async function poll(fn, predicate, timeout, message) {
  const deadline = Date.now() + timeout;
  let last;
  while (Date.now() < deadline) {
    try {
      last = await fn();
      if (predicate(last)) return last;
    } catch (e) {
      last = e;
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw friendly(`${message} (last seen: ${typeof last === 'object' ? JSON.stringify(last) : String(last)})`);
}

/**
 * Assert at least one <img> matching the selector decoded a real bitmap (auto-retry).
 *
 * Attribute assertions cannot tell a rendered image from a broken one: a
 * responsive-image placeholder that never swaps its `src`, or a derivative the
 * server failed to generate (a 4xx or 5xx on the /styles/ request), still carries every expected class and attribute
 * while `naturalWidth` stays 0. This polls until a match reports `complete`
 * with a non-zero natural width, so a broken derivative fails red. "At least
 * one" keeps it stable on pages where some matches sit in an inactive carousel
 * slide lazy loading has not reached. Default budget 5 seconds.
 *
 * The word "drimage" is optional, so the phrasing the drimage_improved module
 * already uses in its own suites keeps matching unchanged.
 *
 * Example #1: Then the drimage image "img.drimage-image" should be loaded
 * Example #2: Then the drimage image ".drimage img.drimage-image" should be loaded within 20 seconds
 * Example #3: Then the image "img.drimage-image" should be loaded
 * Example #4: Then the image ".field--name-field-media-image img" should be loaded within 15 seconds
 * Example #5: And the drimage image "picture img.drimage-image" should be loaded
 *
 */
Then(/^the (?:drimage )?image "([^"]*)" should be loaded(?: within (\d+) seconds?)?$/, async function (selector, sec) {
  const timeout = parseTimeout(sec);
  await this.page.locator(selector).first().waitFor({ state: 'attached', timeout }).catch(() => {
    throw friendly(`No element matching "${selector}" ever attached to the page`);
  });
  await poll(
    () => this.page.locator(selector).evaluateAll((imgs) => imgs.map((img) => (img.complete ? img.naturalWidth : 0))),
    (widths) => Array.isArray(widths) && widths.some((w) => w > 0),
    timeout,
    `Expected at least one image matching "${selector}" to decode a bitmap, but every match reported a natural width of 0 — the image is broken or its derivative was never generated`
  );
});
