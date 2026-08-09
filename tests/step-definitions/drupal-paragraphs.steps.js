'use strict';

// -----------------------------------------------------------------------------
// Paragraphs step definitions: choose a paragraph component in the add-widget
// dialog of a paragraphs field.
//
// Ported from the Varbase Project BDD suites (11.0.x, 10.1.x, 9.2.x) so every
// Varbase site gets them from @vardot/varbase-e2e instead of copying them into
// each project's own tests/step-definitions/.
// -----------------------------------------------------------------------------

const { When } = require('@cucumber/cucumber');
const { smartSettle, friendly } = require('./varbase-e2e');
const { budget } = require('./drupal-helpers');

/**
 * Select a paragraph component in the "Add component" dialog.
 *
 * Ports VarbaseContext::iSelectTheParagraphComponent: clicks the add button in
 * the paragraphs-add-dialog whose name matches the component.
 *
 * Example #1: When I select the "Text" paragraph component
 * Example #2: And I select the "Modal" paragraph component
 * Example #3: When we select the "Drupal block" paragraph component
 * Example #4: And I select the "Rich Text" paragraph component
 * Example #5: Given I select the "Accordion" paragraph component
 */
When(/^(?:I |we )*select the "([^"]*)" paragraph component$/, async function (component) {
  const ok = await this.page.evaluate((component) => {
    const dialog = document.querySelector('.paragraphs-add-dialog.ui-dialog-content, .paragraphs-add-dialog');
    const scope = dialog || document;
    const btn = [...scope.querySelectorAll('input, button')]
      .find((b) => (b.getAttribute('name') || '').includes(component) || (b.value || '').includes(component) || (b.textContent || '').includes(component));
    if (!btn) return false;
    // The paragraphs "Add <type>" buttons are Drupal AJAX submit buttons whose
    // handler is bound to the `mousedown` event (Drupal core ajax.js binds form
    // buttons on mousedown), so a bare element.click() fires only a `click`
    // event and the AJAX that inserts the paragraph subform never runs — the
    // dialog just sits there and the subform (and its CKEditor field) never
    // appears. Dispatch the full pointer sequence so the mousedown-bound AJAX
    // fires and the subform is added.
    btn.scrollIntoView({ block: 'center' });
    for (const type of ['mousedown', 'mouseup', 'click']) {
      btn.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window }));
    }
    return true;
  }, component);
  if (!ok) throw friendly(`Could not find the "${component}" paragraph component in the add dialog.`);
  await smartSettle(this.page, budget(this));
});
