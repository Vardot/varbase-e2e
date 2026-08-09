'use strict';

// -----------------------------------------------------------------------------
// Shared helpers for the Drupal and Varbase step packs.
//
// Not a step file: it registers no step definitions. It holds the plumbing the
// drupal-*.steps.js and varbase.steps.js files share - field resolution, the
// per-page settle budget, robust clicking, CKEditor data writing - plus the two
// Before hooks that point the asset folder and the named-selector registry at
// the consuming project rather than at this package.
// -----------------------------------------------------------------------------

const path = require('path');
const fs = require('fs');
const { Before } = require('@cucumber/cucumber');
const { smartSettle, friendly, gotoUrl, waitForPageLoad } = require('./varbase-e2e');

// Resolve the assets folder to the repo's own tests/assets/ (webship-js
// defaults `this.assetsFolder` to its own package dir, so `I attach the file
// "flag-earth.jpg"` looked for node_modules/webship-js/tests/assets/…).
Before({ order: 1 }, function () {
  this.assetsFolder = path.resolve(process.cwd(), 'tests/assets') + path.sep;
});

// Populate the named-selector registry (`this.__selectorsCss`) that the custom
// steps resolve container / child names against. webship-js loads
// worldParameters.selectors.files into its OWN registry, but the custom steps
// here read `this.__selectorsCss`, which nothing ever filled — so a named
// container like "field body" fell back to the literal string "field body"
// (an invalid CSS descendant combinator that matches nothing), making
// `I should see the ".ck.ck-editor__main" element in the "field body"` fail
// with "found none" even though CKEditor had booted correctly. Load the same
// JSON selector files webship-js uses and flatten their `css` maps here so the
// registry the custom steps consult is actually populated.
Before({ order: 2 }, function () {
  // webship-js's OWN Before hook (selectors.steps.js) already populated
  // this.__selectorsCss from the JSON preset files. We must NOT early-return on
  // that being non-empty — the previous guard did, so the "field body" default
  // below was never merged, `field body` resolved to the literal (invalid) CSS
  // string, and every `... in the "field body"` assertion false-failed with
  // "found none" AFTER a 30s wait even though CKEditor had booted correctly.
  // Start from whatever webship populated (fall back to loading the same files
  // ourselves only if it is somehow empty), then always merge our defaults.
  let map = this.__selectorsCss;
  if (!map || !Object.keys(map).length) {
    map = {};
    const cfg = (this.parameters && this.parameters.selectors) || {};
    const dir = cfg.filesPath || './tests/selectors/';
    for (const file of (cfg.files || [])) {
      try {
        const full = path.resolve(process.cwd(), dir, file);
        const json = JSON.parse(fs.readFileSync(full, 'utf8'));
        Object.assign(map, json.css || {}, json.selectors || {});
      } catch (e) { /* a missing/invalid file simply contributes nothing */ }
    }
  }
  // Named selectors the ported feature files reference that are not (or not
  // reliably) present in the shared JSON presets. Kept here so the resolution
  // is self-contained and does not silently regress if a preset changes.
  //   "field body" — the Body field wrapper on the node add/edit form. Drupal
  //   renders each field wrapper with a `field--name-<field>` class; the
  //   text-format widget (and the CKEditor 5 instance it attaches) lives
  //   inside it, so `.ck.ck-editor__main` / `#edit-body-0-value` are children.
  const defaults = {
    // The Body field widget wrapper on the node add/edit form. The CKEditor 5
    // instance (.ck.ck-editor__main) and the raw textarea (#edit-body-0-value)
    // are attached inside the textarea's own form-item wrapper
    // (.form-item--body-0-value / .js-form-item-body-0-value), which sits inside
    // the field wrapper (.field--name-body). On some form renders the outer
    // .field--name-body wrapper is not emitted, so match the widget form-item
    // wrapper too (both contain the editor); Playwright's .first() picks the
    // outermost present. Diagnosed via the CK boot state: the editor boots fine
    // but .field--name-body alone did not always contain it.
    'field body': '.field--name-body, .form-item--body-0-value, .js-form-item-body-0-value, [data-drupal-selector="edit-body-wrapper"]',
  };
  for (const [k, v] of Object.entries(defaults)) {
    if (!(k in map)) map[k] = v;
  }
  this.__selectorsCss = map;
});

// When I fill in "value" for "field".
// Delegates to webship's fillField, then adds Drupal-friendly fallbacks:
//  • a bare id ("edit-name")            -> #edit-name
//  • a known label alias ("Email")      -> "Email address"
//  • a unique partial <label> match.
const FIELD_LABEL_ALIASES = {
  'Email': 'Email address',
};

const budget = (world) => (world.minWaitTime && world.minWaitTime.page) || 8000;

// Join launchUrl + path with exactly one slash so a path with OR without a
// leading slash resolves correctly (webship uses a bare `launchUrl + url`).
function joinUrl(launchUrl, url) {
  if (!url) return launchUrl;
  if (/^https?:\/\//i.test(url)) return url; // absolute URL, use as-is.
  return String(launchUrl).replace(/\/+$/, '') + '/' + String(url).replace(/^\/+/, '');
}

async function navigate(page, launchUrl, url, budget) {
  await gotoUrl(page, joinUrl(launchUrl, url));
  await page.waitForSelector('body', { state: 'attached', timeout: budget });
  await waitForPageLoad(page, budget);
}

// Resolve a Drupal form field id from a label, name, or id/css.
async function resolveFieldId(locator) {
  return this.page.evaluate((locator) => {
    // by id
    if (document.getElementById(locator)) return locator;
    // by label text. Try an exact match first, then a normalised one: Drupal
    // appends "(Edit summary)" to a Body/text field that has a summary and a
    // trailing " *" to required fields, so the visible label for the "Body"
    // field is actually "Body (Edit summary)". Strip those so "Body" resolves.
    const norm = (s) => s.trim().replace(/\s*\(Edit summary\)\s*$/i, '').replace(/\s*\*\s*$/, '').trim();
    let lbl = [...document.querySelectorAll('label')].find((l) => l.textContent.trim() === locator);
    if (!lbl) lbl = [...document.querySelectorAll('label')].find((l) => norm(l.textContent) === locator);
    if (lbl && lbl.getAttribute('for')) return lbl.getAttribute('for');
    // by name
    const byName = document.querySelector(`[name="${locator}"]`);
    if (byName && byName.id) return byName.id;
    // by css
    try { const el = document.querySelector(locator); if (el && el.id) return el.id; } catch (e) { /* not a selector */ }
    return null;
  }, locator);
}

/**
 * Click a Playwright locator robustly: try a normal click first (fast path,
 * unaffected pages), then fall back to a force-click (skips the
 * actionability/visibility checks, still a real pointer event), then to a
 * native in-page click dispatch (bypasses hit-testing entirely). A
 * fixed-position overlay (the AI chatbot widget most commonly, also sticky
 * Gin/paragraphs action bars) sits on top of an otherwise-correctly-resolved
 * button on some pages, so Playwright's pointer-based click hits a 30s
 * actionability timeout even though the element itself is right — the same
 * class of problem the login step already works around with an in-page
 * dispatch. A genuinely missing/disabled element still fails all three.
 */
async function robustClick(locator) {
  // 1) Real, trusted pointer click at the element's coordinates (fires the full
  //    mousedown→mouseup→click). This is the path that submits Gin CONFIG forms:
  //    their sticky action-bar "Save configuration" clone is actionable and its
  //    Gin handler only forwards the submit from a genuine pointer click — a
  //    synthetic dispatch does NOT save a config form.
  try {
    await locator.click({ timeout: 5000 });
    return;
  } catch { /* fall through */ }
  // 2) Not actionable — a fixed overlay covers it (the AI chatbot widget) or the
  //    element is a sticky clone the browser will not point-click on a tall form
  //    (the Landing page paragraphs node form). A coordinate force-click would
  //    land on whatever overlays it, so dispatch the pointer events DIRECTLY on
  //    the element. Include `mousedown`: Gin/Drupal bind the node-form sticky
  //    "Save as" submit and the paragraphs add-more buttons to mousedown, so a
  //    plain click() alone would not trigger them.
  await locator.scrollIntoViewIfNeeded().catch(() => {});
  await locator.evaluate((el) => {
    for (const type of ['mousedown', 'mouseup', 'click']) {
      el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window }));
    }
  });
}

async function setCheckbox(label, want) {
  // Try Playwright's label association first.
  const byLabel = this.page.getByLabel(label, { exact: true });
  if (await byLabel.count().catch(() => 0)) {
    if ((await byLabel.first().isChecked().catch(() => null)) !== want) {
      await byLabel.first().click();
    }
    return;
  }
  // Fall back: id / name / raw css, or a <label> text -> for=id lookup.
  const done = await this.page.evaluate(({ label, want }) => {
    let cb = document.getElementById(label)
      || document.querySelector(`input[type="checkbox"][name="${label}"]`)
      || (() => { try { return document.querySelector(label); } catch (e) { return null; } })();
    if (!cb) {
      const lbl = [...document.querySelectorAll('label')].find((l) => l.textContent.trim() === label);
      if (lbl) {
        const forId = lbl.getAttribute('for');
        cb = forId ? document.getElementById(forId) : lbl.querySelector('input[type="checkbox"]');
      }
    }
    if (!cb) return false;
    if (cb.checked !== want) cb.click();
    return true;
  }, { label, want });
  if (!done) throw friendly(`Could not find a checkbox for "${label}".`, 'Pass the visible label, the input id/name, or a CSS selector.');
}

async function setCkeditorData(locator, value, mode) {
  const fieldId = await resolveFieldId.call(this, locator);
  if (!fieldId) return false;
  // CKEditor 5 boots asynchronously after Drupal.attachBehaviors; on a fresh
  // node-add form the instance may not be registered yet when this step runs.
  // Poll for the instance (up to 15s) before reading it so we don't race the
  // editor init. A genuinely dead editor still times out and returns false.
  try {
    await this.page.waitForFunction((id) => {
      const el = document.getElementById(id);
      return !!(el && window.Drupal && Drupal.CKEditor5Instances
        && Drupal.CKEditor5Instances.get(el.dataset.ckeditor5Id));
    }, fieldId, { timeout: 15000 });
  } catch {
    // TEMP DIAGNOSTIC: the editor never instantiated. Dump the page's editor
    // state + raw console/page errors to the CI trace so we can see WHY.
    try {
      const diag = await this.page.evaluate((id) => {
        const el = document.getElementById(id);
        const sel = document.querySelector('select[name*="[format]"]');
        return {
          fieldFound: !!el,
          tag: el ? el.tagName : null,
          ck5id: el ? el.dataset.ckeditor5Id : null,
          formatValue: sel ? sel.value : null,
          registry: (window.Drupal && Drupal.CKEditor5Instances) ? Drupal.CKEditor5Instances.size : 'no-registry',
          editors: (window.Drupal && Drupal.editors) ? Object.keys(Drupal.editors) : 'no-Drupal.editors',
          hasCKEDITORglobal: typeof window.CKEDITOR,
          textareaHasEditorClass: el ? el.className : null,
          drupalSettingsEditorFormats: (window.drupalSettings && drupalSettings.editor && drupalSettings.editor.formats) ? Object.keys(drupalSettings.editor.formats) : 'none',
        };
      }, fieldId);
      // eslint-disable-next-line no-console
      console.log('[CK-DIAG] ' + JSON.stringify(diag) + ' rawErrors=' + JSON.stringify((this.__rawJsErrors || []).slice(0, 15)));
    } catch (e) { /* diagnostic best-effort */ }
  }
  return this.page.evaluate(({ fieldId, value, mode }) => {
    const el = document.getElementById(fieldId);
    if (!el || !window.Drupal || !Drupal.CKEditor5Instances) return false;
    const inst = Drupal.CKEditor5Instances.get(el.dataset.ckeditor5Id);
    if (!inst) return false;
    inst.setData(mode === 'append' ? inst.getData() + value : value);
    // Write the editor data straight back to the source <textarea> now. CKEditor
    // 5's Drupal integration normally syncs to the textarea on the form's native
    // `submit` event, but the Varbase node form is submitted through the Gin
    // sticky action bar's forwarded submit, which does not always fire that
    // native submit handler — so the textarea can still be empty at POST time
    // and a REQUIRED rich-text field (the Landing page paragraphs "Text" field)
    // fails server validation, silently keeping the form on the add page. Force
    // the sync here so the value is persisted regardless of how the form is
    // ultimately submitted.
    if (typeof inst.updateSourceElement === 'function') {
      inst.updateSourceElement();
    }
    return true;
  }, { fieldId, value, mode });
}

/**
 * Resolve the default theme's settings path (e.g. /admin/appearance/settings/THEME)
 * from the Appearance page, so tests stay theme-agnostic — a site may run a
 * custom subtheme as its default theme.
 */
async function defaultThemeSettingsPath(page, launchUrl) {
  await page.goto(`${launchUrl.replace(/\/$/, '')}/admin/appearance`, { waitUntil: 'domcontentloaded' });
  return page.evaluate(() => {
    const link = [...document.querySelectorAll('a[href*="/admin/appearance/settings/"]')]
      .map((a) => new URL(a.href, location.origin).pathname)
      .find((p) => /\/admin\/appearance\/settings\/[a-z0-9_]+$/.test(p));
    return link || null;
  });
}

// Open a styles-tab settings sub-menu (Background / Typography / Spacing /
// Border / Animation / Blocks alignment) so its controls are in the DOM.
async function openSectionMenu(page, menu) {
  await page.evaluate(() => {
    const tab = document.querySelector("a[data-target*='appearance']");
    if (tab) tab.click();
  });
  await page.evaluate((menu) => {
    const span = [...document.querySelectorAll('span')].find((s) => (s.textContent || '').includes(menu));
    if (span) { const d = span.closest('details'); if (d) d.setAttribute('open', ''); }
  }, menu);
}

/**
 * Read a checkbox's checked state, resolving it by its visible label text.
 * Handles all common Drupal/Gin/Claro markups: label[for=id], wrapping label,
 * and sibling label. Returns true / false / null (not found).
 */
async function checkboxStateByLabel(page, label) {
  return page.evaluate((labelText) => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const labels = [...document.querySelectorAll('label')]
      .filter((l) => norm(l.textContent).includes(norm(labelText)));
    for (const l of labels) {
      // label[for] -> input#id
      const forId = l.getAttribute('for');
      if (forId) {
        const byFor = document.getElementById(forId);
        if (byFor && byFor.type === 'checkbox') return byFor.checked;
      }
      // wrapping label
      const inner = l.querySelector('input[type="checkbox"]');
      if (inner) return inner.checked;
      // sibling input (preceding or following)
      const prev = l.previousElementSibling;
      if (prev && prev.matches && prev.matches('input[type="checkbox"]')) return prev.checked;
      const next = l.nextElementSibling;
      if (next && next.matches && next.matches('input[type="checkbox"]')) return next.checked;
    }
    return null;
  }, label);
}

/**
 * Read a checkbox's checked state, resolving it by a machine handle that may be
 * a DOM id, a data-drupal-selector, or a name attribute. Returns true / false /
 * null (not found).
 */
async function checkboxStateByHandle(page, handle) {
  return page.evaluate((h) => {
    const el =
      document.getElementById(h) ||
      document.querySelector(`[data-drupal-selector="${h}"]`) ||
      document.querySelector(`input[name="${h}"]`) ||
      document.querySelector(`input[name="${h}[value]"]`);
    if (!el) return null;
    return !!el.checked;
  }, handle);
}

/** Poll until at least one element matches the locator, or time out. */
async function waitForImage(page, selector, timeout) {
  const start = Date.now();
  do {
    if (await page.locator(selector).count()) return true;
    await page.waitForTimeout(150);
  } while (Date.now() - start < timeout);
  return false;
}

/**
 * Assert an action IS / IS NOT offered in the open moderation sidebar
 * (#drupal-off-canvas). Scoped to the sidebar so it is not confused by hidden
 * Layout Builder / block contextual "Delete" links elsewhere on the page (the
 * page-wide "I should not see" reads textContent, which includes those hidden
 * links). Case-insensitive substring, so "Revisions" matches "Show revisions"
 * and "Delete" matches "Delete content".
 *
 * Example #1: Then the moderation sidebar should show "Edit content"
 * Example #2: And the moderation sidebar should not show "Delete"
 */
async function moderationSidebarText(page) {
  const oc = page.locator('#drupal-off-canvas');
  if (!(await oc.count())) {
    throw friendly('The moderation sidebar off-canvas is not open.');
  }
  return ((await oc.first().innerText()) || '').toLowerCase();
}

module.exports = {
  FIELD_LABEL_ALIASES,
  budget,
  joinUrl,
  navigate,
  resolveFieldId,
  robustClick,
  setCheckbox,
  setCkeditorData,
  defaultThemeSettingsPath,
  openSectionMenu,
  checkboxStateByLabel,
  checkboxStateByHandle,
  waitForImage,
  moderationSidebarText,
};
