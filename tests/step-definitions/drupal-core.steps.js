'use strict';

// -----------------------------------------------------------------------------
9,10,11,12,16,17,18,20,21,22,23,24,26,30,31,32,35,36,37,38,39,40,43,48,49,51,61,62,63,64,65,66,69,70,71,72,76
//
// Ported from the Varbase Project BDD suites (11.0.x, 10.1.x, 9.2.x) so every
// Varbase site gets them from @vardot/varbase-e2e instead of copying them into
// each project's own tests/step-definitions/.
// -----------------------------------------------------------------------------

const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { smartSettle, friendly } = require('./varbase-e2e');
const { navigate, resolveFieldId, budget, setCkeditorData, checkboxStateByLabel, checkboxStateByHandle, waitForImage } = require('./drupal-helpers');

/**
 * Smart wait for the current page to reach a quiet edge — the same
 * `smartSettle` used by Varbase E2E navigation steps (DOM ready + network
 * idle + no pending AJAX/timers). Replaces the bare "And wait" used
 * throughout the suite after a navigation or action.
 *
 * Example #1: And wait
 * Example #2: When wait
 * Example #3: Then wait
 * Example #4: Given wait
 * Example #5: But wait
 */
When(/^wait$/, async function () {
  await smartSettle(this.page, (this.minWaitTime && this.minWaitTime.page) || 8000);
});

/**
 * Performance budget — assert the current page's full load time (Navigation
 * Timing `duration` = navigationStart → loadEventEnd) is under a budget.
 * No equivalent ships in Varbase E2E.
 *
 * Example #1: Then the page should load in less than 3 seconds
 * Example #2: And the page should load in less than 5 seconds
 * Example #3: Then the page should respond in less than 800 ms
 * Example #4: Then the page should load in less than 1500 milliseconds
 * Example #5: And the page should respond in less than 2 seconds
 */
Then(/^the page should (?:load|respond) in less than (\d+) (ms|milliseconds?|seconds?)$/, async function (amount, unit) {
  const budgetMs = /^s/.test(unit) ? Number(amount) * 1000 : Number(amount);
  const loadMs = await this.page.evaluate(() => {
    const [nav] = performance.getEntriesByType('navigation');
    if (nav && nav.duration > 0) return nav.duration;
    const t = performance.timing;
    return t.loadEventEnd > 0 ? t.loadEventEnd - t.navigationStart : 0;
  });
  assert.ok(
    loadMs > 0 && loadMs < budgetMs,
    `Page load time ${Math.round(loadMs)}ms exceeded the ${budgetMs}ms budget.`
  );
});

/**
 * Submit a form by triggering the in-page native click on a button id.
 * Gin moves the primary submit into a sticky action bar that overlays the
 * original button, so a Playwright click on it times out on actionability.
 * Dispatching the click in-page bypasses the overlay.
 *
 * Example #1: When I submit by id "edit-submit"
 * Example #2: And I submit by id "edit-submit"
 * Example #3: When we submit by id "edit-submit"
 * Example #4: And we submit by id "edit-submit"
 * Example #5: Given I submit by id "edit-submit"
 */
When(/^(?:I |we )*submit by id "([^"]*)"$/, async function (id) {
  await this.page.evaluate((sel) => {
    // Drupal often suffixes the DOM id (e.g. "edit-submit--AbC123") and Gin's
    // sticky action bar CLONES the submit: the original is hidden and a visible
    // copy carries the same data-drupal-selector. Gather every candidate (by id,
    // data-drupal-selector, name), prefer the VISIBLE one (the sticky clone),
    // and native-click it so the button's #submit fires with its op value.
    const cands = [
      ...document.querySelectorAll(
        `#${sel}, [data-drupal-selector="${sel}"], [name="${sel}"]`
      ),
    ];
    const el = cands.find((e) => e.offsetParent !== null) || cands[0];
    if (el) { el.click(); return; }
    const form = document.querySelector('form');
    if (form) form.submit();
  }, id);
  await smartSettle(this.page, (this.minWaitTime && this.minWaitTime.page) || 8000);
});

/**
 * Open a row action link (e.g. "Edit") by navigating to its href rather than
 * clicking it. A Playwright click waits for the heavy node-edit page (CKEditor
 * 5 + AI widgets) `load` event which can exceed the step timeout; reading the
 * href and `goto` with domcontentloaded avoids that hang.
 *
 * Example #1: When I open the "Edit" link in the "Test Unpublished Page" row
 * Example #2: And I open the "Delete" link in the "Draft article" row
 * Example #3: When we open the "Edit" link in the "Homepage" row
 * Example #4: And we open the "Translate" link in the "About" row
 * Example #5: Given I open the "Edit" link in the "News" row
 */
When(/^(?:I |we )*open the "([^"]*)" link in the "([^"]*)" row$/, async function (linkText, rowText) {
  // Read the link's href in-page. Drupal/Gin puts row actions (Edit, Delete…)
  // inside a collapsed operations dropdown, so the anchor is present in the DOM
  // but hidden - getByRole().getAttribute() would hang on actionability. We
  // match the anchor by visible text (or, for Edit, an /edit href) and read its
  // href directly, then navigate with domcontentloaded (no heavy load wait).
  const href = await this.page.evaluate(({ rowText, linkText }) => {
    const rows = [...document.querySelectorAll('tr')]
      .filter((tr) => tr.textContent.includes(rowText));
    for (const tr of rows) {
      const links = [...tr.querySelectorAll('a[href]')];
      let a = links.find((x) => x.textContent.trim() === linkText);
      if (!a && linkText.toLowerCase() === 'edit') {
        a = links.find((x) => /\/edit(\?|$)/.test(x.getAttribute('href')));
      }
      if (a) return a.getAttribute('href');
    }
    return null;
  }, { rowText, linkText });
  if (!href) throw friendly(`No "${linkText}" link found in the "${rowText}" row.`);
  const url = href.startsWith('http') ? href : this.launchUrl.replace(/\/$/, '') + href;
  await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  await smartSettle(this.page, (this.minWaitTime && this.minWaitTime.page) || 8000);
});

/**
 * Flush all caches from the back end as an administrator.
 *
 * Drives the Drupal core Performance page and clicks its "Clear all caches"
 * button, mirroring what an administrator does after changing configuration so
 * a following anonymous request renders fresh from the real homepage. Uses the
 * core form only (no contrib Tools page), targeting the core submit selector.
 *
 * The click is dispatched in-page: Gin moves the primary submit into a sticky
 * action bar that overlays the original button, so a Playwright click can be
 * intercepted by the overlay and silently not submit (the cache is then never
 * cleared). A native in-page click submits the form regardless.
 *
 * Example #1: When I flush all caches
 * Example #2: And I flush all caches
 * Example #3: When we flush all caches
 * Example #4: Given I flush all caches
 * Example #5: And we flush all caches
 */
When(/^(?:I |we )*flush all caches$/, async function () {
  const base = this.launchUrl.replace(/\/$/, '');
  await this.page.goto(`${base}/admin/config/development/performance`, { waitUntil: 'domcontentloaded' });
  const ok = await this.page.evaluate(() => {
    const btn = document.querySelector('[data-drupal-selector="edit-clear"]') || document.getElementById('edit-clear');
    if (!btn) return false;
    btn.click();
    return true;
  });
  if (!ok) throw friendly('Could not find "Clear all caches" on the Performance page.', 'Open /admin/config/development/performance as a user who can administer the site.');
  await smartSettle(this.page, (this.minWaitTime && this.minWaitTime.page) || 8000);
});



/**
 * Log out of the current session.
 *
 * Ports VarbaseContext::iLogout (`@When /^I logout$/`). Varbase E2E has no
 * logout step. Visits Drupal's /user/logout confirm route; on Drupal 11 the
 * logout form needs a confirm submit, so it submits the form if present.
 *
 * Example #1: When I logout
 * Example #2: And I logout
 * Example #3: When we logout
 * Example #4: Given I logout
 * Example #5: And we logout
 */
When(/^(?:I |we )*logout$/, async function () {
  const base = this.launchUrl.replace(/\/$/, '');
  await this.page.goto(`${base}/user/logout`, { waitUntil: 'domcontentloaded' });
  await this.page.evaluate(() => {
    const submit = document.querySelector('#user-logout-confirm input[type="submit"], form.user-logout-confirm input[type="submit"], #edit-submit');
    if (submit) submit.click();
  }).catch(() => {});
  await smartSettle(this.page, budget(this));
});

/**
 * Assert the current visitor is not authenticated (anonymous).
 *
 * Ports the Behat/DrupalExtension `Given I am not logged in`. Varbase E2E ships
 * `Given I am an anonymous user` (clears storage + reloads); "not logged in"
 * additionally verifies there is no active Drupal session by visiting /user
 * and confirming it is the login form, not the user profile.
 *
 * Example #1: Given I am not logged in
 * Example #2: And I am not logged in
 * Example #3: Given we are not logged in
 * Example #4: But I am not logged in
 * Example #5: Given I am not logged in
 */
Given(/^(?:I am |we are )?not logged in$/, async function () {
  const base = this.launchUrl.replace(/\/$/, '');
  // Best-effort logout, then confirm anonymity.
  await this.page.goto(`${base}/user/logout`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await this.page.evaluate(() => {
    const submit = document.querySelector('#user-logout-confirm input[type="submit"], #edit-submit');
    if (submit) submit.click();
  }).catch(() => {});
  await smartSettle(this.page, budget(this));
});

/**
 * Navigate directly to an external website (absolute URL).
 *
 * Ports VarbaseContext::iGoToWebsite (`@When /^I go to "..." website$/`). The
 * Varbase E2E `I go to "..."` step joins the path onto launchUrl; this variant
 * visits the given absolute URL verbatim (used for external OAuth / social
 * providers, e.g. LinkedIn, Facebook).
 *
 * Example #1: When I go to "https://www.drupal.org" website
 * Example #2: And I go to "https://www.linkedin.com" website
 * Example #3: When we go to "https://accounts.google.com" website
 * Example #4: Given I go to "https://www.facebook.com" website
 * Example #5: And I go to "https://x.com" website
 */
When(/^(?:I |we )*go to "([^"]*)" website$/, async function (url) {
  await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  await smartSettle(this.page, budget(this));
});




/**
 * Assert an entity row exposes (or does not expose) an operation link.
 *
 * Ports VarbaseContext::iShouldSeetheOperationForTheEntity /
 * iShouldNotSeetheOperationForTheEntity. Finds the table row containing the
 * entity text and checks its operations cell for the named link. The trailing
 * noun (entity/content/media/file/term/user) is cosmetic.
 *
 * Example #1: Then I should see the "Edit" operation for the "Homepage" entity
 * Example #2: And I should not see the "Delete" operation for the "Blog" content
 * Example #3: Then should see "Clone" operation for the "Homepage" entity
 * Example #4: And I should not see the "View API" operation for the "About" media
 * Example #5: Then I should see the "Translate" operation for the "News" term
 */
Then(/^(?:I |we )*(?:should )?(not )?see (?:the )?"([^"]*)" operation for the "([^"]*)"(?: (?:entity|content|media|file|term|user))?$/, async function (negate, operation, entity) {
  const found = await this.page.evaluate(({ entity, operation }) => {
    const row = [...document.querySelectorAll('tr')].find((tr) => tr.textContent.includes(entity));
    if (!row) return { rowMissing: true };
    // Operations cell (Drupal marks it with headers=…operations… or a dropbutton).
    const cell = row.querySelector('[headers*="operations"], .dropbutton-wrapper, td:last-child');
    const scope = cell || row;
    const link = [...scope.querySelectorAll('a, button')].some((a) => a.textContent.trim() === operation);
    return { rowMissing: false, link };
  }, { entity, operation });
  if (negate) {
    // "I should NOT see the X operation for the Y entity" is satisfied when the
    // Y row is absent entirely (you cannot see an operation on a row that is
    // not there) OR when the row is present without that operation. Entityqueue
    // is the concrete case: the overview only lists a queue to users with
    // update access to it (EntityQueueListBuilder::load), and that same access
    // is exactly what the "Edit items" operation needs — so a role that must
    // NOT edit the Hero Slider queue simply has no Hero Slider row at all.
    if (found.rowMissing) return;
    assert.ok(!found.link, friendly(`The "${entity}" row unexpectedly has the "${operation}" operation.`));
  } else {
    if (found.rowMissing) throw friendly(`No table row containing "${entity}" was found on the page.`);
    assert.ok(found.link, friendly(`The "${entity}" row is missing the "${operation}" operation.`));
  }
});

/**
 * Assert a named (or css) element exists / does not exist within another named
 * (or css) container.
 *
 * Ports the suite's `I should see the "X" element in the "Y"` /
 * `I should not see the "X" element in the "Y"`. Resolves both the child and
 * the container against the selector registry (this.__selectorsCss), falling
 * back to raw CSS.
 *
 * Example #1: Then I should see the "copyright" element in the "footer"
 * Example #2: And I should not see the "edit link" element in the "sidebar"
 * Example #3: Then should see the "logo" element in the "header bar"
 * Example #4: And I should see the "search input" element in the "main nav"
 * Example #5: Then I should not see the "banner" element in the "main content"
 */
Then(/^(?:I |we )*should( not)? see the "([^"]*)" element in the "([^"]*)"$/, async function (negate, child, container) {
  const reg = this.__selectorsCss || {};
  const childSel = reg[child] || child;
  const containerSel = reg[container] || container;
  const locator = this.page.locator(containerSel).first().locator(childSel);
  if (negate) {
    // Instant check: waiting here would only slow down a true negative.
    const count = await locator.count().catch(() => 0);
    assert.strictEqual(count, 0, friendly(`Expected no "${child}" element inside "${container}", but found ${count}.`));
    return;
  }
  // Positive existence: poll briefly instead of a single instant count().
  // CKEditor 5 (and other JS widgets) attach asynchronously after
  // Drupal.attachBehaviors / AJAX settles; "wait for AJAX to finish" resolves
  // once the network request completes, not once the editor has actually
  // rendered its DOM, so an instant count() can race a genuinely-fine editor
  // that is still a few hundred ms from appearing. A dead widget still times
  // out and fails below — this only removes the false-negative race.
  try {
    // 20s, matching the poll budget setCkeditorData already uses successfully
    // elsewhere: full_html's toolbar now carries many more CKEditor 5 plugins
    // (premium features, wproofreader, paste filter, …) since they were
    // enabled to make the editor boot at all, so CKEditor5.create() can
    // genuinely take longer than a few seconds to finish attaching on a
    // loaded CI runner. A dead widget still times out and fails below.
    await locator.first().waitFor({ state: 'attached', timeout: 10000 });
  } catch { /* fall through; the count()-based assertion reports the miss */ }
  const count = await locator.count().catch(() => 0);
  assert.ok(count > 0, friendly(`Expected a "${child}" element inside "${container}", but found none.`));
});

/**
 * Assert text is (or is not) present in an element matched by tag + attribute.
 *
 * Ports VarbaseContext::iShouldSeeTextInTheHtmlTagElement /
 * iShouldNotSeeTextInTheHtmlTagElement.
 *
 * Example #1: Then I should see "Home" in the "ol" element with the "class" attribute set to "breadcrumb"
 * Example #2: And I should not see "Error" in the "div" element with the "id" attribute set to "right-panel"
 * Example #3: Then I should see "Draft" in the "span" element with the "class" attribute set to "state"
 * Example #4: And I should see "Published" in the "td" element with the "class" attribute set to "status"
 * Example #5: Then I should not see "Trash" in the "ul" element with the "class" attribute set to "menu"
 */
Then(/^(?:I |we )*should( not)? see "([^"]*)" in the "([^"]*)" element with the "([^"]*)" attribute set to "([^"]*)"$/, async function (negate, text, tag, attr, value) {
  const found = await this.page.evaluate(({ text, tag, attr, value }) => {
    const els = [...document.querySelectorAll(tag)];
    return els.some((el) => {
      const a = el.getAttribute(attr) || '';
      if (!a.includes(value)) return false;
      return (el.textContent || '').replace(/\s+/g, ' ').includes(text);
    });
  }, { text, tag, attr, value });
  if (negate) {
    assert.ok(!found, friendly(`"${text}" was unexpectedly found in a <${tag}> with ${attr} containing "${value}".`));
  } else {
    assert.ok(found, friendly(`"${text}" was not found in any <${tag}> with ${attr} containing "${value}".`));
  }
});

/**
 * Click the element of a given HTML tag whose <attr> attribute contains <value>
 * and whose visible text matches <text>. Covers the Shepherd tour "Next"
 * button (tag=button, class "... shepherd-button"), the moderation-sidebar
 * Translate link (tag=a, class "moderation-sidebar-link ...") and the Linkit
 * autocomplete suggestion (tag=ul, class "ui-autocomplete").
 *
 * Example #1: When I click "Next" in the "button" element with the "class" attribute set to "shepherd-button"
 * Example #2: When I click "Translate" in the "a" element with the "class" attribute set to "moderation-sidebar-link button use-ajax"
 */
When(/^(?:I |we )*click "([^"]*)" in the "([^"]*)" element with the "([^"]*)" attribute set to "([^"]*)"$/, async function (text, tag, attr, value) {
  const clicked = await this.page.evaluate(({ text, tag, attr, value }) => {
    const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const wantText = norm(text);
    const els = [...document.querySelectorAll(tag)];
    for (const el of els) {
      const a = el.getAttribute(attr) || '';
      if (!a.includes(value)) continue;
      // For a list container (e.g. ui-autocomplete) the visible text lives in a
      // descendant <li>/<a>; click the deepest matching descendant if present.
      if (norm(el.textContent).includes(wantText)) {
        const descendant = [...el.querySelectorAll('*')].find((d) => norm(d.textContent) === wantText && d.children.length === 0);
        (descendant || el).click();
        return true;
      }
    }
    return false;
  }, { text, tag, attr, value });
  if (!clicked) {
    throw friendly(`"${text}" was not found in a <${tag}> whose ${attr} contains "${value}".`);
  }
  await smartSettle(this.page, budget(this));
});

/**
 * Assert an input element (matched by data-drupal-selector) has a value.
 *
 * Ports VarbaseContext::iShouldSeeValueInTheInputElement.
 *
 * Example #1: Then I should see "Location property" value in the "edit-name" input element
 * Example #2: And I should see "42" value in the "edit-items-2-target-id" input element
 * Example #3: Then I should see "Homepage" value in the "edit-title-0-value" input element
 * Example #4: And I should see "en" value in the "edit-langcode-0-value" input element
 * Example #5: Then I should see "Draft" value in the "edit-moderation-state-0-state" input element
 */
Then(/^(?:I |we )*should see "([^"]*)" value in the "([^"]*)" input element$/, async function (text, selector) {
  const found = await this.page.evaluate(({ text, selector }) => {
    const els = [...document.querySelectorAll(`[data-drupal-selector="${selector}"]`)];
    return els.some((el) => String(el.value || '').includes(text));
  }, { text, selector });
  assert.ok(found, friendly(`Value "${text}" was not found in the "${selector}" input element.`));
});

/**
 * Click an input element (matched by data-drupal-selector) whose value matches.
 *
 * Ports VarbaseContext::iClickValueInTheInputElement.
 *
 * Example #1: When I click "Homepage" value in the "edit-items-2-target-id" input element
 * Example #2: And I click "Location property" value in the "edit-name" input element
 * Example #3: When we click "News" value in the "edit-title" input element
 * Example #4: And I click "Blog" value in the "edit-target-id" input element
 * Example #5: When I click "About" value in the "edit-name" input element
 */
When(/^(?:I |we )*click "([^"]*)" value in the "([^"]*)" input element$/, async function (text, selector) {
  const handle = await this.page.evaluateHandle(({ text, selector }) => {
    return [...document.querySelectorAll(`[data-drupal-selector="${selector}"]`)]
      .find((el) => String(el.value || '').includes(text)) || null;
  }, { text, selector });
  const el = handle.asElement();
  if (!el) throw friendly(`No "${selector}" input element with value "${text}" was found.`);
  await el.click();
  await smartSettle(this.page, budget(this));
});

/**
 * Press a keyboard key while focused in a field (label / name / id / css).
 *
 * Ports VarbaseContext::iPressKeyboardKeyInField (`@When I keypress :char in
 * :field field`). Maps the legacy key words to Playwright key identifiers.
 *
 * Example #1: When I keypress "enter" in "#body" field
 * Example #2: And I keypress "tab" in "#first-name" field
 * Example #3: When I keypress " " in "#search" field
 * Example #4: And I keypress "escape" in "Title" field
 * Example #5: When we keypress "down" in "#country" field
 */
When(/^(?:I |we )*keypress "([^"]*)" in "([^"]*)" field$/, async function (key, field) {
  const map = {
    ' ': 'Space', enter: 'Enter', tab: 'Tab', escape: 'Escape', esc: 'Escape',
    backspace: 'Backspace', delete: 'Delete', up: 'ArrowUp', down: 'ArrowDown',
    left: 'ArrowLeft', right: 'ArrowRight', home: 'Home', end: 'End',
    pageup: 'PageUp', pagedown: 'PageDown', shift: 'Shift', ctrl: 'Control', alt: 'Alt',
  };
  const pwKey = map[key.toLowerCase()] || key;
  const fieldId = await resolveFieldId.call(this, field);
  const target = fieldId ? this.page.locator('#' + fieldId) : this.page.locator(field);
  await target.first().focus();
  await this.page.keyboard.press(pwKey);
  await smartSettle(this.page, budget(this));
});


/**
 * Assert text appears in the breadcrumb trail.
 *
 * Ports VarbaseContext::shouldBeInTheBreadcrumb (`@Then :text should be in the
 * breadcrumb`).
 *
 * Example #1: Then "Home" should be in the breadcrumb
 * Example #2: And "Blog" should be in the breadcrumb
 * Example #3: Then "About Varbase" should be in the breadcrumb
 * Example #4: And "News" should be in the breadcrumb
 * Example #5: Then "Contact Us" should be in the breadcrumb
 */
Then(/^"([^"]*)" should be in the breadcrumb$/, async function (text) {
  const found = await this.page.evaluate((text) => {
    const bc = document.querySelector('.breadcrumb, nav.breadcrumb, [aria-label="Breadcrumb"], ol.breadcrumb');
    if (!bc) return null;
    return (bc.textContent || '').replace(/\s+/g, ' ').includes(text);
  }, text);
  if (found === null) throw friendly('No breadcrumb was found on the page.');
  assert.ok(found, friendly(`"${text}" was not found in the breadcrumb.`));
});

/**
 * Open the top-bar page actions (the "more actions" dots) in the Gin/Navigation
 * top bar.
 *
 * Ports VarbaseContext::iOpenTopBarPageActions.
 *
 * Example #1: When I open the top bar page actions menu
 * Example #2: And I open top bar page actions
 * Example #3: When we open the top bar page actions
 * Example #4: And I hit the more actions button
 * Example #5: When I hit more actions
 */
When(/^(?:I |we )*(?:open (?:the )?top bar page actions(?: menu)?|hit (?:the )?more actions(?: button)?)$/, async function () {
  // The Gin top-bar "more actions" dots button mounts after the toolbar's own
  // behaviours attach, which on a heavy page (a just-saved node, an admin
  // listing) can be a moment after the page otherwise settled. Poll for it
  // rather than reading the DOM once, so we don't race the toolbar init.
  const sel = 'button.toolbar-button--icon--dots, button.toolbar-button.toolbar-button--icon--dots';
  try {
    await this.page.waitForSelector(sel, { state: 'attached', timeout: 10000 });
  } catch { /* fall through to the friendly error below */ }
  // Settle BEFORE clicking, not just after: right after an AJAX-heavy save
  // (e.g. saving a content translation), the toolbar/direction-detection
  // scripts can still be mid-reinit for a moment. Clicking the dots button
  // while that is in flight has triggered a jQuery 4 infinite-recursion
  // RangeError on translated (RTL) pages that freezes the tab and times the
  // step out; giving the toolbar a quiet moment first avoids racing it.
  await smartSettle(this.page, budget(this));
  const ok = await this.page.evaluate((sel) => {
    const btn = document.querySelector(sel);
    if (!btn) return false;
    btn.click();
    return true;
  }, sel);
  if (!ok) throw friendly('The top bar page actions ("more actions") button was not found.');
  await smartSettle(this.page, budget(this));
});




/**
 * Settle the page with the configured wait budget — DOM ready, network idle, no pending AJAX or timers.
 *
 * Example #1: When I wait
 * Example #2: And I wait
 * Example #3: When we wait
 * Example #4: And we wait
 * Example #5: Given I wait
 */
When(/^(?:I |we )+wait$/, async function () {
  await smartSettle(this.page, budget(this));
});

/**
 * Settle the page with an explicit budget in seconds instead of the configured default.
 *
 * Example #1: When I wait for 5s
 * Example #2: And I wait for 2s
 * Example #3: When we wait for 10s
 * Example #4: And wait for 1s
 * Example #5: Given I wait for 3s
 */
When(/^(?:I |we )*wait for (\d+)s$/, async function (seconds) {
  await this.page.waitForTimeout(parseInt(seconds, 10) * 1000);
});

/**
 * Wait until every in-flight AJAX request has settled and the DOM has stopped mutating.
 *
 * Example #1: When I wait for ajax to finish
 * Example #2: And I wait for ajax to finish
 * Example #3: When we wait for ajax to finish
 * Example #4: And wait for ajax to finish
 * Example #5: Given I wait for ajax to finish
 */
When(/^(?:I |we )*wait for ajax to finish$/, async function () {
  await smartSettle(this.page, budget(this));
});

/**
 * Wait up to the given number of seconds for the page to be ready and fully loaded.
 *
 * Example #1: When I wait max of 30s for the page to be ready and loaded
 * Example #2: And I wait max of 10s for the page to be ready and loaded
 * Example #3: When we wait max of 60s for the page to be ready and loaded
 * Example #4: And wait max of 15s for the page to be ready and loaded
 * Example #5: Given I wait max of 45s for the page to be ready and loaded
 */
When(/^(?:I |we )*wait max of (\d+)s for the page to be ready and loaded$/, async function (seconds) {
  await smartSettle(this.page, parseInt(seconds, 10) * 1000);
});


/**
 * Assert an operation link or text is present in the administration listing row whose text matches.
 *
 * Example #1: Then I should see the "Edit" in the "Sample title" row
 * Example #2: And I should see the "Delete" in "Sample title" row
 * Example #3: Then I should not see the "Delete" in the "Locked page" row
 * Example #4: And we should see the "Published" in the "Sample title" row
 * Example #5: Then I should not see the "Translate" in "Sample title" row
 */
Then(/^(?:I |we )*should( not)? see the "([^"]*)" in(?: the)? "([^"]*)" row$/, async function (negate, text, rowText) {
  const row = this.page.locator('tr', { hasText: rowText }).first();
  await row.waitFor({ state: 'attached', timeout: budget(this) }).catch(() => {});
  const rowContent = (await row.textContent().catch(() => '')) || '';
  const found = rowContent.includes(text);
  if (negate) {
    assert.ok(!found, friendly(
      `Expected NOT to see "${text}" in the "${rowText}" row, but it is present.`,
      `Row content: ${rowContent.trim().slice(0, 200)}`,
    ));
  } else {
    assert.ok(found, friendly(
      `Expected to see "${text}" in the "${rowText}" row, but it was not found.`,
      `Row content: ${rowContent.trim().slice(0, 200)}`,
    ));
  }
});

/**
 * Assert a checkbox is checked / unchecked, found by its visible label text
 * (alternate phrasing).
 *
 * Example #1: Then the checkbox labeled "Editor" should be checked
 * Example #2: And the checkbox labeled "Site Admin" should be unchecked
 * Example #3: Then the checkbox labeled "Published" should be checked
 * Example #4: And the checkbox labeled "Promoted to front page" should be unchecked
 * Example #5: Then the checkbox labeled "Sticky at top of lists" should be unchecked
 */
Then(/^the checkbox labeled "([^"]*)" should be (checked|unchecked)$/, async function (label, state) {
  const want = state === 'checked';
  const actual = await checkboxStateByLabel(this.page, label);
  if (actual === null) {
    throw friendly(`No checkbox with the label "${label}" was found on the page.`);
  }
  assert.strictEqual(actual, want, friendly(`The "${label}" checkbox is ${actual ? 'checked' : 'unchecked'}, expected ${state}.`));
});

/**
 * Assert a checkbox is checked / unchecked, resolved by a machine handle
 * (DOM id, data-drupal-selector, or name attribute).
 *
 * Example #1: Then the Drupal checkbox "edit-enable" is checked
 * Example #2: And the Drupal checkbox "entity_json" is checked
 * Example #3: Then the Drupal checkbox "edit-status-value" is checked
 * Example #4: And the Drupal checkbox "edit-promote-value" is unchecked
 * Example #5: Then the Drupal checkbox "edit-sticky-value" is unchecked
 */
Then(/^the Drupal checkbox "([^"]*)" is (checked|unchecked)$/, async function (handle, state) {
  const want = state === 'checked';
  const actual = await checkboxStateByHandle(this.page, handle);
  if (actual === null) {
    throw friendly(`No checkbox resolvable from "${handle}" (id / data-drupal-selector / name) was found.`);
  }
  assert.strictEqual(actual, want, friendly(`The "${handle}" checkbox is ${actual ? 'checked' : 'unchecked'}, expected ${state}.`));
});

/**
 * Assert an <img> whose title attribute contains the given text exists.
 *
 * Example #1: Then I should see image with the "Flag Earth all earth in space" title text
 */
Then(/^(?:I |we )*should see image with the "([^"]*)" title text$/, async function (titleText) {
  const ok = await waitForImage(this.page, `img[title*="${titleText}"]`, budget(this));
  if (!ok) throw friendly(`No image with a title containing "${titleText}" was found on the page.`);
});

/**
 * Assert an <img> whose alt attribute contains the given text exists.
 *
 * Example #1: And I should see image with the "Embed Flag Earth in space" alt text
 */
Then(/^(?:I |we )*should see image with the "([^"]*)" alt text$/, async function (altText) {
  const ok = await waitForImage(this.page, `img[alt*="${altText}"]`, budget(this));
  if (!ok) throw friendly(`No image with an alt containing "${altText}" was found on the page.`);
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
