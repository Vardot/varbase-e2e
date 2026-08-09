'use strict';

// -----------------------------------------------------------------------------
// Media library step definitions: open the library on a field, pick an item in
// the grid and submit the dialog.
//
// Ported from the Varbase Project BDD suites (11.0.x, 10.1.x, 9.2.x) so every
// Varbase site gets them from @vardot/varbase-e2e instead of copying them into
// each project's own tests/step-definitions/.
// -----------------------------------------------------------------------------

const { When } = require('@cucumber/cucumber');
const { smartSettle, friendly } = require('./varbase-e2e');
const { budget } = require('./drupal-helpers');

/**
 * Submit the Media Library dialog (the "Insert selected" action).
 *
 * Ports VarbaseContext::iSubmitMediaLibraryDialog.
 *
 * Example #1: When I submit the media library dialog
 * Example #2: And I submit the media library dialog
 * Example #3: When we submit the media library dialog
 * Example #4: Given I submit the media library dialog
 * Example #5: And we submit media library dialog
 */
When(/^(?:I |we )*submit (?:the )?media library dialog$/, async function () {
  const ok = await this.page.evaluate(() => {
    const btn = document.querySelector(".media-library-select[value='dialog-submit'], .ui-dialog button.media-library-select");
    if (!btn) return false;
    btn.click();
    return true;
  });
  if (!ok) throw friendly('The Media Library "Insert selected" button was not found.');
  await smartSettle(this.page, budget(this));
});

/**
 * Open the Media Library widget of a specific field by its machine name.
 *
 * On Drupal 11.4 the media-library "Add media" open button renders with a
 * random "--XXXX" id suffix, and a single paragraph subform can contain several
 * "Add media" buttons (e.g. the text_and_image bundle has both field_image and
 * a bp_image field), so neither the old fixed id nor the "Add media" label is
 * unique. Match the visible open button whose id contains "<field>-open-button".
 *
 * Example #1: And I open the "field_image" media library
 * Example #2: And I open the "field_media_single" media library
 */
When(/^(?:I |we )*open the "([^"]*)" media library$/, async function (field) {
  const frag = field.replace(/_/g, '-');
  const btn = this.page
    .locator(`input[id*="${frag}-open-button"]:visible, button[id*="${frag}-open-button"]:visible`)
    .first();
  if (!(await btn.count())) {
    throw friendly(`No media library open button for the "${field}" field was found.`);
  }
  await btn.click({ timeout: 8000 });
  await smartSettle(this.page, budget(this));
});

/**
 * Select a Media Library grid item by its "Select <name>" checkbox, tolerating
 * duplicate items. A retried upload scenario (cucumber `retry: 1`) can leave two
 * media with the same name, so webship's built-in "I check" would strict-fail on
 * two identically labelled checkboxes — pick the first.
 *
 * Example #1: And I select the media "Embed Flag Earth"
 * Example #2: And I select the media "Flag Earth"
 */
When(/^(?:I |we )*select the media "([^"]*)"$/, async function (name) {
  const cb = this.page.getByLabel(`Select ${name}`, { exact: true }).first();
  if (!(await cb.count())) {
    throw friendly(`No media library item labelled "Select ${name}" was found.`);
  }
  await cb.check({ timeout: 8000 });
  await smartSettle(this.page, budget(this));
});

/**
 * Check the first checkbox matching a label, tolerating duplicates. A retried
 * scenario (cucumber `retry: 1`) can leave two identically titled nodes, so
 * two checkboxes carry the same label (e.g. the entityqueue widget) and the
 * built-in "I check" strict-fails; the duplicates are equivalent - pick the
 * first.
 *
 * Example #1: When I check the first "Test hero slider #1"
 */
When(/^(?:I |we )*check the first "([^"]*)"$/, async function (label) {
  const cb = this.page.getByLabel(label, { exact: true }).first();
  if (!(await cb.count())) {
    throw friendly(`No checkbox labelled "${label}" was found.`);
  }
  await cb.check({ timeout: 8000 });
  await smartSettle(this.page, budget(this));
});

/**
 * Insert the currently selected item(s) in the open Media Library dialog.
 * The dialog submit ("Insert selected") is cloned by jQuery UI into the dialog
 * button pane, so the original form button is hidden; target the visible one.
 * Replaces the old `press "dialog-submit" by its "id"` which no longer resolves
 * on Drupal 11.4 (the media dialog button has no "dialog-submit" id).
 *
 * Example #1: And I insert the selected media
 */
When(/^(?:I |we )*insert the selected media$/, async function () {
  const btn = this.page
    .locator('button:has-text("Insert selected"):visible, input[value="Insert selected"]:visible')
    .first();
  if (!(await btn.count())) {
    throw friendly('No "Insert selected" button was found in the media library dialog.');
  }
  await btn.click({ timeout: 8000 });
  await smartSettle(this.page, budget(this));
});
