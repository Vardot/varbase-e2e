'use strict';

// -----------------------------------------------------------------------------
// Layout Builder step definitions: add a section at the end of a layout and
// configure it - container type and width, breakpoint, gutters, background and
// text colour, alignment, edge-to-edge background - then save it.
//
// Ported from the Varbase Project BDD suites (11.0.x, 10.1.x, 9.2.x) so every
// Varbase site gets them from @vardot/varbase-e2e instead of copying them into
// each project's own tests/step-definitions/.
// -----------------------------------------------------------------------------

const { When } = require('@cucumber/cucumber');
const { smartSettle, friendly } = require('./varbase-e2e');
const { budget, openSectionMenu } = require('./drupal-helpers');

/**
 * Add a basic section (with an optional layout, default "1 Col") at the end of
 * the Layout Builder layout.
 *
 * Ports VarbaseContext::iAddABasicSectionAtTheEndOfLayout.
 *
 * Example #1: When I add a basic "4 Cols" section at the end of layout
 * Example #2: And I add a basic section at the end of layout
 * Example #3: When I add a basic "2 Cols" section at the end of layout
 * Example #4: And we add a basic section at the end of layout
 * Example #5: When I add a basic "3 Cols" section at the end of layout
 */
When(/^(?:I |we )*add a basic(?: "([^"]*)")? section at the end of layout$/, async function (cols) {
  const layout = cols || '1 Col';
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const addLink = this.page.locator("a.layout-builder__link--add:has-text('at end of layout'), a.layout-builder__link--add").last();
  await addLink.click();
  await smartSettle(this.page, budget(this));
  const layoutLink = this.page.locator(`a.use-ajax:has-text("${layout}")`).first();
  if (!(await layoutLink.count())) throw friendly(`The "${layout}" layout option was not found in the Add section list.`);
  await layoutLink.click();
  await smartSettle(this.page, budget(this));
});

/**
 * Save (add) the currently configured Layout Builder section.
 *
 * Ports VarbaseContext::iSaveTheSection (clicks the "Add section" submit).
 *
 * Example #1: When I save the section
 * Example #2: And I save the section
 * Example #3: When we save the section
 * Example #4: Given I save the section
 * Example #5: And we save the section
 */
When(/^(?:I |we )*save the section$/, async function () {
  // A raw DOM click (page.evaluate -> btn.click()) does not reliably trigger
  // Drupal's jQuery-bound AJAX submit handler for this button - it can leave
  // the section silently un-added. Use a real Playwright mouse click instead,
  // which dispatches the full native event sequence.
  const btn = this.page.locator('input[type="submit"], button').filter({ hasText: /Add section/i }).first();
  if (!(await btn.count())) throw friendly('The "Add section" button was not found.');
  await btn.click();
  await smartSettle(this.page, budget(this));
});

/**
 * Add gutters to the section being configured (checks "With Gutters").
 *
 * Ports VarbaseContext::iAddSectionGutters.
 *
 * Example #1: When I add section gutters
 * Example #2: And I add section gutters
 * Example #3: When we add section gutters
 * Example #4: Given I add section gutters
 * Example #5: And we add section gutters
 */
When(/^(?:I |we )*add section gutters$/, async function () {
  const lbl = this.page.locator("label:has-text('With Gutters')").first();
  if (!(await lbl.count())) throw friendly('The "With Gutters" option was not found.');
  await lbl.click();
  await smartSettle(this.page, budget(this));
});

/**
 * Select a section container type (and optional Boxed width).
 *
 * Ports VarbaseContext::iSelectTheContainerType / iSelectTheContainerWidth.
 *
 * Example #1: When I select the "Edge to Edge" container type
 * Example #2: And I select the "Boxed" container type with a "Tiny" width
 * Example #3: When I select the "Full" container type
 * Example #4: And I select the "Boxed" container type with a "Narrow" width
 * Example #5: When we select the "Edge to Edge" container type
 */
When(/^(?:I |we )*select the "([^"]*)" container type(?: with a "([^"]*)" width)?$/, async function (type, width) {
  // Real Playwright clicks, not a raw DOM click inside page.evaluate(): the
  // LB config sidebar's radio labels are wired through Drupal AJAX behaviors,
  // which a synthetic click can silently fail to trigger (see the identical
  // issue fixed for "save the section").
  const clickLabel = async (text, forPrefix) => {
    const lbl = this.page.locator('label').filter({ hasText: text }).and(this.page.locator(`label[for*="${forPrefix}"]`)).first();
    if (!(await lbl.count())) return false;
    await lbl.click();
    return true;
  };
  if (!(await clickLabel(type, 'edit-layout-settings-ui-tab-content-layout-container-type'))) {
    throw friendly(`The "${type}" container type was not found.`);
  }
  if (type === 'Boxed' && width) {
    if (!(await clickLabel(width, 'edit-layout-settings-ui-tab-content-layout-container-width'))) {
      throw friendly(`The "${width}" container width was not found.`);
    }
  }
  await smartSettle(this.page, budget(this));
});

/**
 * Select a section breakpoint column ratio for a given screen size.
 *
 * Ports VarbaseContext::iSelectTheSectionBreakpoint.
 *
 * Example #1: When I select the "md" "33% 67%" section breakpoint
 * Example #2: And I select the "xs" "75% 25%" section breakpoint
 * Example #3: When I select the "lg" "50% 50%" section breakpoint
 * Example #4: And I select the "sm" "100%" section breakpoint
 * Example #5: When we select the "md" "67% 33%" section breakpoint
 */
When(/^(?:I |we )*select the "([^"]*)" "([^"]*)" section breakpoint$/, async function (size, point) {
  // Real Playwright click (see "select the container type" above for why a
  // raw page.evaluate() click is unreliable on these AJAX-bound controls).
  const el = this.page.locator(`[class*="${size}"]`).filter({ hasText: point }).first();
  if (!(await el.count())) throw friendly(`The "${point}" breakpoint for the "${size}" screen size was not found.`);
  await el.click();
  await smartSettle(this.page, budget(this));
});

/**
 * Select a section background color.
 *
 * Ports VarbaseContext::iSelectTheSectionBackgroundColor (opens Background,
 * switches to the color tab, clicks the color label).
 *
 * Example #1: When I select the "Primary" section background color
 * Example #2: And I select the "Light" section background color
 * Example #3: When I select the "Dark" section background color
 * Example #4: And we select the "Info" section background color
 * Example #5: When I select the "White" section background color
 */
When(/^(?:I |we )*select the "([^"]*)" section background color$/, async function (color) {
  await openSectionMenu(this.page, 'Background');
  await this.page.evaluate(() => {
    const t = [...document.querySelectorAll('label')].find((l) => (l.getAttribute('for') || '').includes('appearance-background-background-type-color'));
    if (t) t.click();
  });
  const ok = await this.page.evaluate((color) => {
    const lbl = [...document.querySelectorAll('label')].find((l) => (l.textContent || '').includes(color) && (l.getAttribute('for') || '').includes('appearance-background-background-color'));
    if (!lbl) return false; lbl.click(); return true;
  }, color);
  if (!ok) throw friendly(`The "${color}" section background color was not found.`);
  await smartSettle(this.page, budget(this));
});

/**
 * Select a section text color.
 *
 * Ports VarbaseContext::iSelectTheSectionTextColor.
 *
 * Example #1: When I select the "Dark" section text color
 * Example #2: And I select the "White" section text color
 * Example #3: When I select the "Primary" section text color
 * Example #4: And we select the "Light" section text color
 * Example #5: When I select the "Muted" section text color
 */
When(/^(?:I |we )*select the "([^"]*)" section text color$/, async function (color) {
  await openSectionMenu(this.page, 'Typography');
  const ok = await this.page.evaluate((color) => {
    const lbl = [...document.querySelectorAll('label')].find((l) => (l.textContent || '').includes(color) && (l.getAttribute('for') || '').includes('appearance-typography-text-color-text'));
    if (!lbl) return false; lbl.click(); return true;
  }, color);
  if (!ok) throw friendly(`The "${color}" section text color was not found.`);
  await smartSettle(this.page, budget(this));
});

/**
 * Set the section text alignment.
 *
 * Ports VarbaseContext::iSetTheAlignmentTo.
 *
 * Example #1: When I set the alignment to "End"
 * Example #2: And I set the alignment to "Start"
 * Example #3: When I set the alignment to "Center"
 * Example #4: And we set the alignment to "Justify"
 * Example #5: When I set the alignment to "End"
 */
When(/^(?:I |we )*set the alignment to "([^"]*)"$/, async function (align) {
  await openSectionMenu(this.page, 'Typography');
  const ok = await this.page.evaluate((align) => {
    const lbl = [...document.querySelectorAll('label')].find((l) => (l.textContent || '').includes(align) && (l.getAttribute('for') || '').includes('appearance-typography-text-alignment'));
    if (!lbl) return false; lbl.click(); return true;
  }, align);
  if (!ok) throw friendly(`The "${align}" text alignment was not found.`);
  await smartSettle(this.page, budget(this));
});

/**
 * Uncheck the section "Edge to Edge Background" option.
 *
 * Ports VarbaseContext::iUncheckTheEdgeToEdgeBackground.
 *
 * Example #1: When I uncheck the Edge to Edge Background
 * Example #2: And I uncheck the Edge to Edge Background
 * Example #3: When we uncheck the Edge to Edge Background
 * Example #4: Given I uncheck the Edge to Edge Background
 * Example #5: And we uncheck the Edge to Edge Background
 */
When(/^(?:I |we )*uncheck the Edge to Edge Background$/, async function () {
  await openSectionMenu(this.page, 'Background');
  const ok = await this.page.evaluate(() => {
    const cb = document.querySelector('input.field-background-edge-to-edge');
    if (!cb) return false; cb.click(); return true;
  });
  if (!ok) throw friendly('The "Edge to Edge Background" checkbox was not found.');
  await smartSettle(this.page, budget(this));
});

/**
 * Select an option (by its visible option text, falling back to value) from a
 * <select> resolved by its visible label, or a partial name / id when the label
 * is ambiguous. Needed for paragraph subform selects whose label is a single
 * word (e.g. "Block", "Webform") — the Varbase E2E core "select from" step treats a
 * single-word target as a name/id, never a label, and the subform select's DOM
 * id carries a random "--XXXX" suffix so it cannot be addressed by a fixed #id.
 *
 * Example #1: And I select "Site branding" from the "Block" dropdown
 * Example #2: And I select "Contact" from the "Webform" dropdown
 */
When(/^(?:I |we )*select "([^"]*)" from the "([^"]*)" dropdown$/, async function (option, target) {
  const candidates = [
    this.page.getByLabel(target, { exact: true }),
    this.page.getByLabel(target, { exact: false }),
    this.page.locator(`select[name="${target}"]`),
    this.page.locator(`select[name*="${target}"]`),
    this.page.locator(`select[id*="${target}"]`),
  ];
  let loc = null;
  for (const c of candidates) {
    try {
      if (await c.first().count()) { loc = c.first(); break; }
    } catch (e) { /* invalid selector — skip */ }
  }
  if (!loc) throw friendly(`No <select> resolvable from "${target}" (label / name / id) was found.`);
  try {
    await loc.selectOption({ label: option }, { timeout: 5000 });
  } catch (e) {
    try {
      // Fall back to matching by the option's value attribute.
      await loc.selectOption(option, { timeout: 3000 });
    } catch (e2) {
      // Last resort: partial (contains) option-text match. Drupal sometimes
      // suffixes the option label (e.g. Views Bulk Operations renders "Delete
      // selected entities / translations" once content_translation is enabled).
      const value = await loc.first().evaluate((sel, text) => {
        const opt = [...sel.options].find((o) => o.textContent.trim().includes(text));
        return opt ? opt.value : null;
      }, option);
      if (value === null) {
        throw friendly(`No option matching "${option}" was found in the "${target}" dropdown.`);
      }
      await loc.selectOption(value);
    }
  }
  await smartSettle(this.page, budget(this));
});
