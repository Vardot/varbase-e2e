'use strict';

// -----------------------------------------------------------------------------
// Drimage Improved step definitions: assertions for the dynamic responsive
// images the drimage_improved module renders.
//
// The steps carry no CSS selectors. The module's formatter markup is stable —
// a wrapper carrying `data-drimage_improved`, a <picture> with an optional
// webp <source>, the <img> on an SVG placeholder, and a <noscript> fallback
// inside the wrapper (the module template) or right after it (the vartheme_bs5
// component) — and its JS swaps the placeholder for a derivative under
// /styles/drimage_improved_*. The pack knows all of that, so a tester writes
// "the drimage images should be loaded" and nothing else. Themes re-class the
// <img> freely, so nothing here relies on `drimage-image`.
//
// The module exists to make images fast, so the default budget is 2 seconds.
// Ported from the drimage_improved project's own suites so every site using
// the module gets the steps from @vardot/varbase-e2e.
// -----------------------------------------------------------------------------

const { Then } = require('@cucumber/cucumber');
const { smartSettle, friendly } = require('./varbase-e2e');

const WRAPPER = '[data-drimage_improved]';
const IMAGE = `${WRAPPER} img`;
const WEBP_SOURCE = 'picture source[type="image/webp"]';   // inside a wrapper
const DERIVATIVE = '/styles/drimage_improved_';

// "drimage", "drimage improved", "dynamic", "dynamic responsive", "responsive"
// or nothing — the qualifier names the same images every time.
const Q = '(?:drimage improved |drimage |dynamic responsive |dynamic |responsive )?';

function budgetOf(secondsStr) {
  const n = secondsStr ? parseInt(secondsStr, 10) : 0;
  return n > 0 ? n * 1000 : 2000;
}

// How a tester points at ONE Drimage image without a selector:
//   the drimage image "Hero"                       alt text or title, whichever matches
//   the drimage image titled "Hero"                title attribute
//   the drimage image captioned "Our team in 2026"  the <figcaption> of its <figure>
//   the drimage image with the alt text "Hero"     alt only
//   the first drimage image / the 3rd / the last   order in the page
//   the drimage image number 3                     same, as a number
// Captured as: ordinal, mode, mode value, plain quoted value, number.
const ORDINAL = '(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|last|\\d+(?:st|nd|rd|th))';
const TARGET = `the (?:${ORDINAL} )?${Q}image(?: (titled|captioned|with the alt text|with the title|with the caption) "([^"]*)"| "([^"]*)"| number (\\d+))?`;
const WORDS = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10 };

function targetOf(ordinal, mode, modeValue, plain, number) {
  const t = { ordinal: null, field: null, value: null };
  if (ordinal) t.ordinal = ordinal === 'last' ? 'last' : (WORDS[ordinal] || parseInt(ordinal, 10));
  if (number) t.ordinal = parseInt(number, 10);
  if (mode) {
    t.field = mode === 'titled' || mode === 'with the title' ? 'title'
      : mode === 'captioned' || mode === 'with the caption' ? 'caption' : 'alt';
    t.value = modeValue;
  } else if (plain !== undefined && plain !== null) {
    t.field = 'any';
    t.value = plain;
  }
  return t;
}

function describeTarget(t) {
  const lead = t.ordinal === 'last' ? 'the last Drimage image' : t.ordinal ? `Drimage image number ${t.ordinal}` : 'the Drimage image';
  if (t.field === 'any') return `${lead} "${t.value}"`;
  if (t.field) return `${lead} with the ${t.field === 'alt' ? 'alt text' : t.field} "${t.value}"`;
  return lead;
}

// Which of the snapshot's images the target names, as 0-based indices. Text
// matches are exact after trimming, then a contains match as a fallback so a
// long caption can be named by a distinctive part of it.
function select(images, t) {
  let pool = images.map((img, i) => ({ ...img, i }));
  if (t.field) {
    const v = t.value.trim();
    const fields = t.field === 'any' ? ['alt', 'title', 'caption'] : [t.field];
    const exact = pool.filter((x) => fields.some((f) => (x[f] || '').trim() === v));
    pool = exact.length ? exact : pool.filter((x) => fields.some((f) => (x[f] || '').includes(v)));
  }
  if (t.ordinal === 'last') pool = pool.slice(-1);
  else if (t.ordinal) pool = pool.slice(t.ordinal - 1, t.ordinal);
  return pool.map((x) => x.i);
}

// One snapshot of every Drimage image on the page, taken in the browser.
function snapshot(page) {
  return page.evaluate(({ image, derivative }) =>
    Array.from(document.querySelectorAll(image)).map((img) => {
      const src = img.currentSrc || img.src || '';
      const m = src.match(/\/styles\/drimage_improved_(?:focal_)?(\d+)_(\d+)/);
      const figure = img.closest('figure');
      const caption = figure && figure.querySelector('figcaption');
      return {
        alt: img.getAttribute('alt') || '',
        title: img.getAttribute('title') || '',
        caption: caption ? caption.textContent.trim() : '',
        inFigure: figure !== null,
        src,
        derivative: src.includes(derivative),
        derivativeWidth: m ? Number(m[1]) : 0,
        renderedWidth: Math.round(img.clientWidth * (window.devicePixelRatio || 1)),
        loading: img.getAttribute('loading') || '',
        decoded: img.complete && img.naturalWidth > 0,
      };
    }), { image: IMAGE, derivative: DERIVATIVE });
}

// Settle the page the BBR way, then poll the browser-side predicate until it
// holds or the budget runs out. Returns the last snapshot for the message.
async function settleThenWait(page, budget, predicate, arg) {
  await smartSettle(page, budget);
  try {
    await page.waitForFunction(predicate, arg, { timeout: budget, polling: 100 });
    return null;
  } catch (cause) {
    return { cause, images: await snapshot(page).catch(() => []) };
  }
}

function describe(images) {
  if (!images.length) return 'no Drimage images on the page';
  return images
    .map((i) => `"${i.alt || '(no alt)'}": ${i.derivative ? 'derivative' : 'placeholder'}, ${i.decoded ? 'decoded' : 'not decoded'}`)
    .join('; ');
}

// A Drimage image counts as loaded once its src is a real derivative (the
// placeholder has been swapped) AND the bitmap decoded. The SVG placeholder
// also decodes, so naturalWidth alone cannot tell the two apart.
const LOADED = ({ image, derivative, indices }) => {
  const imgs = Array.from(document.querySelectorAll(image)).filter((img, i) => indices === null || indices.includes(i));
  if (!imgs.length) return false;
  const swapped = imgs.filter((img) => (img.currentSrc || img.src || '').includes(derivative));
  if (!swapped.length) return false;
  return swapped.every((img) => img.complete && img.naturalWidth > 0);
};

/**
 * Assert the Drimage images on the page loaded: at least one has swapped its
 * placeholder for a real derivative, and every swapped one decoded a bitmap.
 *
 * Attribute assertions cannot see a broken Drimage: the placeholder never
 * swapping, or a derivative the server failed to generate (a 4xx or 5xx on the
 * /styles/drimage_improved_* request), still leaves every class and attribute
 * in place. The SVG placeholder even decodes, so this checks the src is a real
 * derivative before trusting naturalWidth. Below-the-fold images still on their
 * placeholder are not counted against the page: lazy loading has not reached
 * them and is not supposed to have.
 *
 * Settles the page first (the harness BBR wait) so the module's setTimeout
 * swap has fired, then polls. Default budget 2 seconds: the module exists to
 * make images fast, so a longer wait is hiding a problem, not tolerating one.
 *
 * Example #1: Then the drimage images should be loaded
 * Example #2: Then the drimage improved images should be loaded within 2 seconds
 * Example #3: Then the dynamic responsive images should be loaded
 * Example #4: And the responsive images should be loaded within 1 second
 * Example #5: Then the images should be loaded
 */
Then(new RegExp(`^the ${Q}images should be loaded(?: within (\\d+) seconds?)?$`), async function (sec) {
  const failed = await settleThenWait(this.page, budgetOf(sec), LOADED, { image: IMAGE, derivative: DERIVATIVE, indices: null });
  if (failed) {
    throw friendly(`Expected the Drimage images to load, but saw ${describe(failed.images)}`, failed.cause);
  }
});

// Settle, snapshot, and resolve a single-image target. Throws the friendly
// "no such image" when nothing matches, listing what is on the page.
async function resolveTarget(page, t) {
  await smartSettle(page, 2000);
  const images = await snapshot(page);
  const indices = select(images, t);
  if (!indices.length) {
    throw friendly(`${describeTarget(t)} is not on the page; the Drimage images present are ${describe(images)}`);
  }
  return { images, indices, picked: indices.map((i) => images[i]) };
}

/**
 * Assert one Drimage image swapped its placeholder for a real derivative and
 * decoded the bitmap. Name it by alt text or title in quotes, by `titled`,
 * `captioned` or `with the alt text`, by its order in the page, or by number —
 * the human ways of pointing at a picture, never a class or an id.
 *
 * Example #1: Then the drimage image "Team collaborating in a modern glass-walled office" should be loaded
 * Example #2: Then the first drimage image should be loaded
 * Example #3: Then the drimage image captioned "Our team in the new office" should be loaded within 2 seconds
 * Example #4: Then the dynamic responsive image titled "Vardot team" should be loaded
 * Example #5: Then the drimage image number 2 should be loaded within 1 second
 */
Then(new RegExp(`^${TARGET} should be loaded(?: within (\\d+) seconds?)?$`), async function (ordinal, mode, modeValue, plain, number, sec) {
  const t = targetOf(ordinal, mode, modeValue, plain, number);
  const { indices } = await resolveTarget(this.page, t);
  const failed = await settleThenWait(this.page, budgetOf(sec), LOADED, { image: IMAGE, derivative: DERIVATIVE, indices });
  if (failed) {
    throw friendly(`Expected ${describeTarget(t)} to load, but saw ${describe(indices.map((i) => failed.images[i]).filter(Boolean))}`, failed.cause);
  }
});

/**
 * Assert the page renders at least one Drimage image: the formatter wrapper
 * carrying the module's data object is in the DOM.
 *
 * This is the formatter check — did the field display actually go through
 * Drimage Improved — before any loading question.
 *
 * Example #1: Then the drimage images should be rendered
 * Example #2: Then the drimage improved images should be rendered within 2 seconds
 * Example #3: Then the dynamic responsive images should be rendered
 * Example #4: And the responsive images should be rendered within 1 second
 * Example #5: Then the images should be rendered
 */
Then(new RegExp(`^the ${Q}images should be rendered(?: within (\\d+) seconds?)?$`), async function (sec) {
  const failed = await settleThenWait(this.page, budgetOf(sec), (sel) => document.querySelector(sel) !== null, WRAPPER);
  if (failed) {
    throw friendly('Expected at least one Drimage image on the page, but no drimage_improved formatter output is in the DOM', failed.cause);
  }
});

/**
 * Assert the Drimage images offer a WebP source: every rendered wrapper has a
 * <source type="image/webp"> in its <picture>.
 *
 * Present when core WebP or ImageAPI Optimize WebP is on; this is how a test
 * proves the setting reached the front end.
 *
 * Example #1: Then the drimage images should offer webp
 * Example #2: Then the drimage improved images should offer webp within 2 seconds
 * Example #3: Then the dynamic responsive images should offer webp
 * Example #4: And the responsive images should offer webp within 1 second
 * Example #5: Then the images should offer webp
 */
Then(new RegExp(`^the ${Q}images should offer webp(?: within (\\d+) seconds?)?$`), async function (sec) {
  const failed = await settleThenWait(this.page, budgetOf(sec), ({ wrapper, source }) => {
    const wrappers = Array.from(document.querySelectorAll(wrapper));
    return wrappers.length > 0 && wrappers.every((w) => w.querySelector(source) !== null);
  }, { wrapper: WRAPPER, source: WEBP_SOURCE });
  if (failed) {
    throw friendly('Expected every Drimage image to carry a WebP <source>, but at least one <picture> has none', failed.cause);
  }
});

/**
 * Assert the Drimage images carry a <noscript> fallback, so a visitor without
 * JavaScript still gets an image. The module template puts it inside the
 * wrapper; the vartheme_bs5 component puts it right after — both count.
 *
 * Example #1: Then the drimage images should have a noscript fallback
 * Example #2: Then the drimage improved images should have a noscript fallback within 2 seconds
 * Example #3: Then the dynamic responsive images should have a noscript fallback
 * Example #4: And the responsive images should have a noscript fallback within 1 second
 * Example #5: Then the images should have a noscript fallback
 */
Then(new RegExp(`^the ${Q}images should have a noscript fallback(?: within (\\d+) seconds?)?$`), async function (sec) {
  const failed = await settleThenWait(this.page, budgetOf(sec), (wrapper) => {
    const wrappers = Array.from(document.querySelectorAll(wrapper));
    const hasFallback = (w) => w.querySelector('noscript') !== null
      || (w.nextElementSibling !== null && w.nextElementSibling.tagName === 'NOSCRIPT');
    return wrappers.length > 0 && wrappers.every(hasFallback);
  }, WRAPPER);
  if (failed) {
    throw friendly('Expected every Drimage image to carry a <noscript> fallback, but at least one has none', failed.cause);
  }
});

/**
 * Assert no Drimage image on the page is broken: every one that swapped to a
 * derivative decoded it. Images still on their placeholder pass, so this is
 * the safe check for a long page where lazy loading has not reached the
 * bottom.
 *
 * Example #1: Then no drimage image should be broken
 * Example #2: Then no drimage improved image should be broken within 2 seconds
 * Example #3: Then no dynamic responsive image should be broken
 * Example #4: And no responsive image should be broken within 1 second
 * Example #5: Then no image should be broken
 */
Then(new RegExp(`^no ${Q}image should be broken(?: within (\\d+) seconds?)?$`), async function (sec) {
  const failed = await settleThenWait(this.page, budgetOf(sec), ({ image, derivative }) =>
    Array.from(document.querySelectorAll(image))
      .filter((img) => (img.currentSrc || img.src || '').includes(derivative))
      .every((img) => img.complete && img.naturalWidth > 0), { image: IMAGE, derivative: DERIVATIVE });
  if (failed) {
    const broken = failed.images.filter((i) => i.derivative && !i.decoded);
    throw friendly(`Expected no broken Drimage image, but ${describe(broken)}`, failed.cause);
  }
});

/**
 * Assert every loaded Drimage image is served at a derivative width that fits
 * where it is rendered: no wider than the rendered width (times the device
 * pixel ratio) plus one threshold step, and no narrower than the rendered
 * width, within the module's upscale / downscale clamps.
 *
 * This is the responsive-image check. Resize the viewport with the harness's
 * `set the viewport to the "xs" breakpoint` and assert again: the module
 * requests a smaller derivative for the smaller viewport, and a page that
 * ships a 1920px derivative into a 375px phone fails here. The threshold,
 * upscale, downscale and multiplier are read from each wrapper's own data
 * object, so the test follows the site's settings rather than hardcoding them.
 *
 * Example #1: Then the drimage images should be sized for the viewport
 * Example #2: Then the drimage improved images should be sized for the viewport within 2 seconds
 * Example #3: Then the dynamic responsive images should be sized for the viewport
 * Example #4: And the responsive images should be sized for the viewport within 1 second
 * Example #5: Then the images should be sized for the viewport
 */
Then(new RegExp(`^the ${Q}images should be sized for the viewport(?: within (\\d+) seconds?)?$`), async function (sec) {
  const failed = await settleThenWait(this.page, budgetOf(sec), ({ wrapper, derivative }) => {
    const wrappers = Array.from(document.querySelectorAll(wrapper));
    const loaded = wrappers.filter((w) => {
      const img = w.querySelector('img');
      return img && (img.currentSrc || img.src || '').includes(derivative);
    });
    if (!loaded.length) return false;
    return loaded.every((w) => {
      const img = w.querySelector('img');
      const data = JSON.parse(w.getAttribute('data-drimage_improved') || '{}');
      const threshold = Number(data.threshold) || 200;
      const upscale = Number(data.upscale) || 0;
      const downscale = Number(data.downscale) || Infinity;
      const m = (img.currentSrc || img.src).match(/\/styles\/drimage_improved_(?:focal_)?(\d+)_/);
      if (!m) return false;
      const served = Number(m[1]);
      const rendered = img.clientWidth * (window.devicePixelRatio || 1) * (Number(data.multiplier) || 1);
      const wanted = Math.min(downscale, Math.max(upscale, rendered));
      return served >= Math.floor(wanted) - threshold && served <= Math.ceil(wanted) + threshold;
    });
  }, { wrapper: WRAPPER, derivative: DERIVATIVE });
  if (failed) {
    const loaded = failed.images.filter((i) => i.derivative);
    const detail = loaded.length
      ? loaded.map((i) => `"${i.alt || '(no alt)'}": served ${i.derivativeWidth}px for ${i.renderedWidth}px rendered`).join('; ')
      : 'no Drimage image has loaded a derivative yet';
    throw friendly(`Expected every Drimage derivative to fit its rendered width, but ${detail}`, failed.cause);
  }
});

/**
 * Assert the Drimage images defer offscreen loading. Each wrapper's own data
 * object must ask for lazy loading, and every image must be either still on
 * its placeholder (the module has not rendered it because it is not near the
 * viewport yet — that deferral IS the lazy loading) or carry `loading="lazy"`,
 * which the module sets the moment it renders one.
 *
 * Learnt on demo.varbase.vardot.com: the module puts no `loading` attribute
 * on an image it has not reached, and hidden slider slides never get one, so
 * "every img has loading=lazy" would fail a page that is lazy loading
 * perfectly. An image that swapped to a derivative WITHOUT the attribute, or a
 * wrapper configured eager, is what fails here.
 *
 * Pair it with "should still be a placeholder" on a below-the-fold image, a
 * scroll step, and "should be loaded" to prove the deferral end to end.
 *
 * Example #1: Then the drimage images should use lazy loading
 * Example #2: Then the drimage improved images should use lazy loading within 2 seconds
 * Example #3: Then the dynamic responsive images should use lazy loading
 * Example #4: And the responsive images should use lazy loading within 1 second
 * Example #5: Then the images should use lazy loading
 */
Then(new RegExp(`^the ${Q}images should use lazy loading(?: within (\\d+) seconds?)?$`), async function (sec) {
  const failed = await settleThenWait(this.page, budgetOf(sec), ({ wrapper, derivative }) => {
    const wrappers = Array.from(document.querySelectorAll(wrapper));
    if (!wrappers.length) return false;
    return wrappers.every((w) => {
      const img = w.querySelector('img');
      if (!img) return false;
      const data = JSON.parse(w.getAttribute('data-drimage_improved') || '{}');
      if (data.lazyload && data.lazyload !== 'lazy' && data.lazyload !== 'legacy') return false;
      const swapped = (img.currentSrc || img.src || '').includes(derivative);
      return !swapped || img.getAttribute('loading') === 'lazy' || data.lazyload === 'legacy';
    });
  }, { wrapper: WRAPPER, derivative: DERIVATIVE });
  if (failed) {
    const eager = failed.images.filter((i) => i.derivative && i.loading !== 'lazy');
    const detail = failed.images.length === 0
      ? 'no Drimage image is on the page'
      : eager.length
        ? `these loaded a derivative without it: ${eager.map((i) => `"${i.alt || '(no alt)'}" (loading="${i.loading || 'not set'}")`).join(', ')}`
        : 'at least one wrapper is configured not to lazy load';
    throw friendly(`Expected the Drimage images to lazy load, but ${detail}`, failed.cause);
  }
});

/**
 * Assert a Drimage image has NOT loaded yet: it is still on the module's SVG
 * placeholder because it sits outside the viewport and lazy loading has not
 * reached it. Name it any of the ways the loaded step accepts.
 *
 * This is the intersection check. Settle the page, look once — no waiting for
 * something not to happen — then scroll it into view and assert it loads.
 *
 * Example #1: Then the drimage image "Team meeting around a table" should still be a placeholder
 * Example #2: Then the last drimage image should not be loaded yet
 * Example #3: Then the drimage image captioned "Our team in the new office" should still be a placeholder
 * Example #4: And the responsive image number 2 should not be loaded yet
 * Example #5: Then the second image should still be a placeholder
 */
Then(new RegExp(`^${TARGET} should (?:still be a placeholder|not be loaded yet)$`), async function (ordinal, mode, modeValue, plain, number) {
  const t = targetOf(ordinal, mode, modeValue, plain, number);
  const { picked } = await resolveTarget(this.page, t);
  if (picked.some((i) => i.derivative)) {
    throw friendly(`Expected ${describeTarget(t)} to still be a placeholder, but it already loaded a derivative: ${describe(picked)}`);
  }
});

/**
 * Assert a Drimage image has a caption: its <figure> carries a <figcaption>,
 * and when a text is given, that is the caption (exact after trimming).
 *
 * Example #1: Then the first drimage image should have the caption "Our team in the new office"
 * Example #2: Then the drimage image "Team meeting around a table" should have a caption
 * Example #3: Then the drimage image titled "Vardot team" should have the caption "Our team in the new office"
 * Example #4: Then the last dynamic responsive image should have a caption
 * Example #5: Then the drimage image number 2 should have the caption "Our team in the new office"
 */
Then(new RegExp(`^${TARGET} should have (?:a caption|the caption "([^"]*)")$`), async function (ordinal, mode, modeValue, plain, number, text) {
  const t = targetOf(ordinal, mode, modeValue, plain, number);
  const { picked } = await resolveTarget(this.page, t);
  const bad = picked.filter((i) => !i.caption || (text != null && i.caption !== text.trim()));
  if (bad.length) {
    const seen = bad.map((i) => (i.caption ? `"${i.caption}"` : (i.inFigure ? 'a figure with no figcaption' : 'no figure at all'))).join(', ');
    throw friendly(text != null
      ? `Expected ${describeTarget(t)} to have the caption "${text}", but saw ${seen}`
      : `Expected ${describeTarget(t)} to have a caption, but saw ${seen}`);
  }
});

/**
 * Assert a Drimage image's alt text — what a screen reader says and what
 * search engines index. Name the image by order, title or caption, then check
 * the alt an editor typed reached the front end.
 *
 * Example #1: Then the first drimage image should have the alt text "Team collaborating in a modern glass-walled office"
 * Example #2: Then the drimage image captioned "Our team in the new office" should have the alt text "Team meeting around a table"
 * Example #3: Then the last dynamic responsive image should have the alt text "Team meeting around a table"
 * Example #4: Then the drimage image number 1 should have the alt text "Team collaborating in a modern glass-walled office"
 * Example #5: Then the drimage image titled "Vardot team" should have the alt text "Team meeting around a table"
 */
Then(new RegExp(`^${TARGET} should have the alt text "([^"]*)"$`), async function (ordinal, mode, modeValue, plain, number, text) {
  const t = targetOf(ordinal, mode, modeValue, plain, number);
  const { picked } = await resolveTarget(this.page, t);
  const bad = picked.filter((i) => i.alt !== text.trim());
  if (bad.length) {
    throw friendly(`Expected ${describeTarget(t)} to have the alt text "${text}", but saw ${bad.map((i) => (i.alt ? `"${i.alt}"` : 'an empty alt')).join(', ')}`);
  }
});

/**
 * Assert a Drimage image's title attribute, the tooltip text.
 *
 * Example #1: Then the drimage image "Team meeting around a table" should have the title "Vardot team"
 * Example #2: Then the second drimage image should have the title "Vardot team"
 * Example #3: Then the drimage image captioned "Our team in the new office" should have the title "Vardot team"
 * Example #4: Then the last dynamic responsive image should have the title "Vardot team"
 * Example #5: Then the drimage image number 2 should have the title "Vardot team"
 */
Then(new RegExp(`^${TARGET} should have the title "([^"]*)"$`), async function (ordinal, mode, modeValue, plain, number, text) {
  const t = targetOf(ordinal, mode, modeValue, plain, number);
  const { picked } = await resolveTarget(this.page, t);
  const bad = picked.filter((i) => i.title !== text.trim());
  if (bad.length) {
    throw friendly(`Expected ${describeTarget(t)} to have the title "${text}", but saw ${bad.map((i) => (i.title ? `"${i.title}"` : 'no title')).join(', ')}`);
  }
});

/**
 * Assert a Drimage image is wrapped in a <figure>, the semantic element the
 * theme's image component renders so a caption has somewhere to live.
 *
 * Example #1: Then the drimage image "Team collaborating in a modern glass-walled office" should be in a figure
 * Example #2: Then the first drimage image should be in a figure
 * Example #3: Then the drimage image captioned "Our team in the new office" should be in a figure
 * Example #4: Then the last dynamic responsive image should be in a figure
 * Example #5: Then the drimage image number 2 should be in a figure
 */
Then(new RegExp(`^${TARGET} should be in a figure$`), async function (ordinal, mode, modeValue, plain, number) {
  const t = targetOf(ordinal, mode, modeValue, plain, number);
  const { picked } = await resolveTarget(this.page, t);
  if (picked.some((i) => !i.inFigure)) {
    throw friendly(`Expected ${describeTarget(t)} to be inside a <figure>, but it is not`);
  }
});
