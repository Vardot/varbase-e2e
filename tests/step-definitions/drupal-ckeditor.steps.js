'use strict';

// -----------------------------------------------------------------------------
// CKEditor 5 step definitions: write into a rich text editor field, append to
// it, drive a toolbar command button and fill the Linkit link dialog.
//
// Ported from the Varbase Project BDD suites (11.0.x, 10.1.x, 9.2.x) so every
// Varbase site gets them from @vardot/varbase-e2e instead of copying them into
// each project's own tests/step-definitions/.
// -----------------------------------------------------------------------------

const { When } = require('@cucumber/cucumber');
const { smartSettle, friendly } = require('./varbase-e2e');
const { budget, setCkeditorData } = require('./drupal-helpers');

/**
 * Set the value of a CKEditor 5 rich text editor field by the field label/name.
 *
 * Ports VarbaseContext::iFillInTheRichTextEditorField. Resolves the form field
 * (label, name, or id), reads its CKEditor 5 instance id from the data
 * attribute, and calls setData(). No Varbase E2E equivalent (Varbase E2E's
 * "WYSIWYG field" step is CKEditor-version agnostic and may not target CK5).
 *
 * Example #1: When I fill in the rich text editor field "Body" with "Test Body text"
 * Example #2: And I fill in the rich text editor field "Body" with "<p>Hello</p>"
 * Example #3: When we fill in the rich text editor field "Description" with "Text"
 * Example #4: And I fill in the rich text editor field "Summary" with "Intro"
 * Example #5: Given I fill in the rich text editor field "Body" with "Content"
 */
When(/^(?:I |we )*fill in the rich text editor field "([^"]*)" with(?: the)? "([^"]*)"$/, async function (locator, value) {
  const ok = await setCkeditorData.call(this, locator, value, 'set');
  if (!ok) throw friendly(`Could not find a CKEditor 5 field for "${locator}".`, 'Pass the field label, name, or id of a CKEditor 5 rich text field.');
  await smartSettle(this.page, budget(this));
});

/**
 * Append text to the end of a CKEditor 5 rich text editor field.
 *
 * Ports VarbaseContext::appendTheRichTextEditorField.
 *
 * Example #1: When I append the rich text editor field "Body" with "More text"
 * Example #2: And I append after the rich text editor field "Body" with "End"
 * Example #3: When we append the rich text editor field "Body" with "Tail"
 * Example #4: And I append after the rich text editor field "Description" with "!"
 * Example #5: Given I append the rich text editor field "Body" with "Extra"
 */
When(/^(?:I |we )*append(?: after)? the rich text editor field "([^"]*)" with "([^"]*)"$/, async function (locator, value) {
  const ok = await setCkeditorData.call(this, locator, value, 'append');
  if (!ok) throw friendly(`Could not find a CKEditor 5 field for "${locator}".`);
  await smartSettle(this.page, budget(this));
});

/**
 * Click a toolbar command button inside a CKEditor 5 field.
 *
 * Ports VarbaseContext::iClickOnCommandButtonInTheRichTextEditorField and
 * iClickOnTheSaveButtonInTheEditor. Matches both:
 *   When I click on "bold" command button in the rich text editor field "Body"
 *   When I click on the insert button in "Body" rich text editor field
 *
 * Example #1: When I click on "media" command button in the rich text editor field "Body"
 * Example #2: And I click on "bold" command button in the rich text editor field "Body"
 * Example #3: When I click on the insert button in "Body" rich text editor field
 * Example #4: And I click on the save button in "Body" rich text editor field
 * Example #5: When we click on "link" command button in the rich text editor field "Body"
 */
When(/^(?:I |we )*click on (?:"([^"]*)" command button in the rich text editor field "([^"]*)"|the (save|insert|action|apply) button in "([^"]*)" rich text editor field)$/, async function (command, cmdField, actionWord, actField) {
  if (command) {
    // Command button carries the label in a <span> (e.g. "Insert Media").
    const btn = this.page.locator(`button:has(span:text-is("${command}"))`).first();
    if (!(await btn.count())) throw friendly(`No "${command}" command button found in the rich text editor.`);
    await btn.click();
  } else {
    // Save / action button for the current widget balloon.
    const save = this.page.locator('button.ck-button-save, button.ck-button-action').first();
    if (!(await save.count())) throw friendly(`No ${actionWord} button found in the "${actField}" rich text editor field.`);
    await save.click();
  }
  await smartSettle(this.page, budget(this));
});

/**
 * Type a query into the open CKEditor 5 Drupal-link balloon's "Link URL" field
 * so Linkit's autocomplete (ul.ui-autocomplete) searches for internal content.
 *
 * The balloon holds several inputs (Displayed text, Title, ARIA label, CSS
 * classes … from editor_advanced_link), so target the one whose label is
 * "Link URL". CKEditor 5's input reacts only to real per-character typing (a
 * value assignment is ignored), so type with a small delay to let Linkit
 * debounce and query. This replaces the CKEditor-4-era "fill in … for
 * 'Link URL'" + keypress steps.
 *
 * Example #1: When I fill in the link URL "Linking to"
 */
When(/^(?:I |we )*fill in the link URL "([^"]*)"$/, async function (query) {
  const input = this.page
    .locator('.ck-balloon-panel .ck-labeled-field-view, .ck-link-form .ck-labeled-field-view')
    .filter({ has: this.page.getByText('Link URL', { exact: true }) })
    .locator('input')
    .first();
  if (!(await input.count())) {
    throw friendly('The CKEditor 5 link balloon "Link URL" field was not found.');
  }
  await input.click();
  await input.fill('');
  await input.pressSequentially(query, { delay: 80 });
  await smartSettle(this.page, budget(this));
});
