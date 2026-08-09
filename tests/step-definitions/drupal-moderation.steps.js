'use strict';

// -----------------------------------------------------------------------------
// Content moderation step definitions: open the moderation sidebar and assert
// what it shows for the current revision.
//
// Ported from the Varbase Project BDD suites (11.0.x, 10.1.x, 9.2.x) so every
// Varbase site gets them from @vardot/varbase-e2e instead of copying them into
// each project's own tests/step-definitions/.
// -----------------------------------------------------------------------------

const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { smartSettle, friendly } = require('./varbase-e2e');
const { budget, moderationSidebarText } = require('./drupal-helpers');

/**
 * Open the moderation sidebar from the administration toolbar / tasks.
 *
 * Ports VarbaseContext::iOpenTheModerationSidebar.
 *
 * Example #1: When I open the moderation sidebar
 * Example #2: And I open moderation sidebar
 * Example #3: When I click on tasks in the toolbar
 * Example #4: And click on tasks in the toolbar
 * Example #5: When we open the moderation sidebar
 */
When(/^(?:I |we )*(?:open (?:the )?moderation sidebar|click on tasks in the toolbar)$/, async function () {
  const ok = await this.page.evaluate(() => {
    const link = document.querySelector('#toolbar-bar .moderation-sidebar-toolbar-tab a, .moderation-sidebar-toolbar-tab a');
    if (!link) return false;
    link.click();
    return true;
  });
  if (!ok) throw friendly('The moderation sidebar toolbar tab was not found.');
  await smartSettle(this.page, budget(this));
});

Then(/^(?:the )?moderation sidebar should show "([^"]*)"$/, async function (text) {
  const body = await moderationSidebarText(this.page);
  assert.ok(
    body.includes(text.toLowerCase()),
    friendly(`The moderation sidebar does not show "${text}".`)
  );
});

Then(/^(?:the )?moderation sidebar should not show "([^"]*)"$/, async function (text) {
  const body = await moderationSidebarText(this.page);
  assert.ok(
    !body.includes(text.toLowerCase()),
    friendly(`The moderation sidebar unexpectedly shows "${text}".`)
  );
});
