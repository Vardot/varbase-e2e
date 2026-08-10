'use strict';

// -----------------------------------------------------------------------------
// Layout Builder step definitions: add a section at the end of a layout and
// configure it - container type and width, breakpoint, gutters, background and
// text colour, alignment, edge-to-edge background - then save it.
//
// Ported from the Varbase Project BDD suites (11.0.x, 10.1.x, 9.2.x) so every
// Varbase site gets them from @vardot/varbase-e2e instead of copying them into
// each project's own tests/step-definitions/.
//
// The form controls a section scenario drives the configuration sidebar with
// live here too, next to the section steps that use them, rather than in
// drupal-core.steps.js:
//
//   I check the box "With Gutters"
//   I uncheck the box "Edge to Edge"
//   I select the "Boxed" radio button
//   I select the radio button "Edge to Edge"
//   I expand the field "edit-..."
//   I press the confirm button in modal
//   I click the delete button
//
// They are ordinary Drupal form controls and work anywhere, not only in a
// layout: every *.steps.js is auto-loaded, so any feature can use them.
// -----------------------------------------------------------------------------

const { When } = require('@cucumber/cucumber');
const { smartSettle, friendly } = require('./varbase-e2e');
const { budget, openSectionMenu, setCheckbox } = require('./drupal-helpers');

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
  // On newer Bootstrap Layout Builder the layout option adds the section
  // directly instead of opening its settings in the off-canvas. When the
  // section settings form (container type, breakpoints, background) did not
  // open, click the newly added (highest-delta) section's "Configure" link -
  // a use-ajax link that opens the settings in the #drupal-off-canvas dialog,
  // where the following section-settings steps run.
  const hasSettingsForm = await this.page.locator('[id*="layout-container-type"]').count();
  if (!hasSettingsForm) {
    const links = this.page.locator('a.layout-builder__link--configure[href*="/layout_builder/configure-form/section/"]');
    const count = await links.count();
    let bestLink = null;
    let bestDelta = -1;
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      const delta = parseInt(href.split('/').pop(), 10);
      if (delta > bestDelta) { bestDelta = delta; bestLink = links.nth(i); }
    }
    if (bestLink) {
      await bestLink.click();
      await smartSettle(this.page, budget(this));
    }
  }
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
  // The submit reads "Add section" on a fresh section and "Update" when the
  // settings were opened through the section's Configure link.
  const btn = this.page.locator('input[type="submit"], button').filter({ hasText: /Add section|Update/i }).first();
  if (!(await btn.count())) throw friendly('The "Add section" / "Update" button was not found.');
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
  // A real Playwright click first: the LB config sidebar's radio labels are
  // wired through Drupal AJAX behaviors, which a synthetic click can silently
  // fail to trigger (see the identical issue fixed for "save the section").
  // But on some Bootstrap Styles versions these labels are visually-hidden
  // colour/type swatches, so the actionability checks time out even though the
  // label is the right target — fall back to an in-page native click then
  // (the label's own click handler still fires Drupal's behaviors).
  const clickLabel = async (text, forPrefix) => {
    const lbl = this.page.locator('label').filter({ hasText: text }).and(this.page.locator(`label[for*="${forPrefix}"]`)).first();
    if (!(await lbl.count())) return false;
    try {
      await lbl.click({ timeout: 10000 });
    } catch (e) {
      await lbl.evaluate((el) => el.click());
    }
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

/**
 * Check a checkbox by its visible label (or id / name / css selector).
 *
 * Ports the Varbase suite's `I check the box "..."`. Varbase E2E core only
 * offers `I check "..."`; the profile features use "check the box", so this
 * matches that phrasing. Resolves the control by label text first (Drupal
 * renders role permission / field labels), then falls back to id / name / css.
 *
 * Example #1: When I check the box "Editor"
 * Example #2: And I check the box "Site Admin"
 * Example #3: When we check the box "Content Admin"
 * Example #4: And I check the box "Super Admin"
 * Example #5: Given I check the box "SEO Admin"
 */
When(/^(?:I |we )*check the box "([^"]*)"$/, async function (label) {
  await setCheckbox.call(this, label, true);
  await smartSettle(this.page, budget(this));
});

/**
 * Uncheck a checkbox by its visible label (or id / name / css selector).
 *
 * Ports the Varbase suite's `I uncheck the box "..."`.
 *
 * Example #1: When I uncheck the box "Editor"
 * Example #2: And I uncheck the box "Subscribe"
 * Example #3: When we uncheck the box "Site Admin"
 * Example #4: And I uncheck the box "Enable"
 * Example #5: Given I uncheck the box "Published"
 */
When(/^(?:I |we )*uncheck the box "([^"]*)"$/, async function (label) {
  await setCheckbox.call(this, label, false);
  await smartSettle(this.page, budget(this));
});

/**
 * Select a radio button by its visible label text.
 *
 * Ports VarbaseContext::iSelectTheRadioButton (`@When /^I select the "..."
 * radio button$/`): finds the <label> whose text matches, follows its `for`
 * attribute to the input, and selects it.
 *
 * Example #1: When I select the "Male" radio button
 * Example #2: And I select the "Female" radio button
 * Example #3: When we select the "Yes" radio button
 * Example #4: And I select the "Unpublished" radio button
 * Example #5: Given I select the "Published" radio button
 */
When(/^(?:I |we )*select the "([^"]*)" radio button$/, async function (label) {
  const ok = await this.page.evaluate((label) => {
    const lbl = [...document.querySelectorAll('label')].find((l) => l.textContent.trim() === label);
    if (!lbl) return false;
    const forId = lbl.getAttribute('for');
    const radio = forId ? document.getElementById(forId) : lbl.querySelector('input[type="radio"]');
    if (!radio) return false;
    if (!radio.checked) radio.click();
    return true;
  }, label);
  if (!ok) throw friendly(`Could not find a radio button labelled "${label}".`, "The label must carry a 'for' attribute pointing to the radio input.");
  await smartSettle(this.page, budget(this));
});

/**
 * Select a radio button by its visible label text (alternate phrasing).
 *
 * Example #1: When I select the radio button "Published"
 * Example #2: And I select the radio button "Draft"
 * Example #3: When we select the radio button "Needs Review"
 * Example #4: And I select the radio button "Archived"
 * Example #5: Given I select the radio button "Yes"
 */
When(/^(?:I |we )*select the radio button "([^"]*)"$/, async function (label) {
  const radio = this.page.getByRole('radio', { name: label, exact: false }).first();
  try {
    await radio.check({ timeout: budget(this) });
  } catch (e) {
    // Fall back to clicking a label that contains the text.
    const byLabel = this.page.locator('label', { hasText: label }).first();
    await byLabel.click({ timeout: budget(this) });
  }
});

/**
 * Open a collapsed <details>/fieldset by its element id so its inner fields
 * become interactable (e.g. the node form "Menu settings", the entityqueue
 * form widget).
 *
 * Example #1: And I expand the field "edit-menu"
 * Example #2: And I expand the field "edit-entityqueue-form-widget"
 */
When(/^(?:I |we )*expand the field "([^"]*)"$/, async function (fieldId) {
  const ok = await this.page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const details = el.tagName.toLowerCase() === 'details' ? el : el.closest('details');
    if (details) {
      details.setAttribute('open', '');
      const summary = details.querySelector('summary');
      if (summary) summary.setAttribute('aria-expanded', 'true');
      return true;
    }
    // Fallback: a non-details collapsible — remove a "collapsed" class.
    el.classList.remove('collapsed');
    el.setAttribute('open', '');
    return true;
  }, fieldId);
  if (!ok) throw friendly(`Could not find a collapsible field with id "${fieldId}".`);
  await smartSettle(this.page, budget(this));
});

/**
 * Press the confirm (Restore / OK / primary) button in a jQuery UI modal.
 *
 * Ports VarbaseContext::iPressTheConfirmButton (used by trash restore).
 *
 * Example #1: When I press the confirm button in modal
 * Example #2: And I press the confirm button in modal
 * Example #3: When we press the confirm button in modal
 * Example #4: Given I press the confirm button in modal
 * Example #5: And we press the confirm button in modal
 */
When(/^(?:I |we )*press the confirm button in modal$/, async function () {
  const ok = await this.page.evaluate(() => {
    const scope = document.querySelector('.ui-dialog, [role="dialog"]') || document;
    const candidates = [...scope.querySelectorAll('button, input[type="submit"]')];
    const btn = candidates.find((b) => /^(Restore|OK|Confirm|Yes)$/i.test((b.textContent || b.value || '').trim()))
      || scope.querySelector('.button--primary, .ui-dialog-buttonset button');
    if (!btn) return false;
    btn.click();
    return true;
  });
  if (!ok) throw friendly('No confirm button was found in the modal.');
  await smartSettle(this.page, budget(this));
});

/**
 * Click the first "Delete" button on the page (action link or submit).
 *
 * Ports VarbaseContext::iClickTheDeleteButton.
 *
 * Example #1: When I click the delete button
 * Example #2: And I click the delete button
 * Example #3: When we click the delete button
 * Example #4: Given I click the delete button
 * Example #5: And we click the delete button
 */
When(/^(?:I |we )*click the delete button$/, async function () {
  const ok = await this.page.evaluate(() => {
    const label = (b) => (b.value || b.textContent || '').trim();
    // The Varbase/Gin media & content delete confirm renders as an AJAX modal
    // whose actual "Delete" control is a form SUBMIT button (input[type=submit]
    // / button[type=submit]). The same page also carries several `use-ajax`
    // "Delete" ACTION LINKS (the Gin sticky action bar #gin-sticky-edit-delete,
    // the top-bar dropdown link, the edit-form #edit-delete link) which only
    // (re)open that confirm dialog — clicking one of those never submits the
    // deletion. So target the real submit button, preferring the one inside the
    // open dialog, and never a use-ajax/action-link.
    const isSubmit = (b) =>
      (b.tagName === 'INPUT' && b.type === 'submit') ||
      (b.tagName === 'BUTTON' && (b.type === 'submit' || !b.type));
    const openDialog = [...document.querySelectorAll('.ui-dialog, [role="dialog"]')]
      .find((d) => d.offsetParent !== null || getComputedStyle(d).display !== 'none');
    const scopes = openDialog ? [openDialog, document] : [document];
    for (const scope of scopes) {
      const submit = [...scope.querySelectorAll('input[type="submit"], button')]
        .find((b) => isSubmit(b) && label(b) === 'Delete');
      if (submit) { submit.click(); return true; }
    }
    // Fallback: any "Delete" element that is not a use-ajax/action link (a
    // plain full-page confirm form, e.g. the trash purge confirm).
    const other = [...document.querySelectorAll('button, input[type="submit"], a')]
      .find((b) => label(b) === 'Delete'
        && !b.classList.contains('use-ajax')
        && !b.classList.contains('action-link'));
    if (other) { other.click(); return true; }
    return false;
  });
  if (!ok) throw friendly('No "Delete" submit button was found on the page.');
  await smartSettle(this.page, budget(this));
});
