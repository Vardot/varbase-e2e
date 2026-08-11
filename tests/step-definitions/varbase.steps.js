'use strict';

// -----------------------------------------------------------------------------
// Varbase step definitions: the Varbase testing users registry, the welcome
// tour, the default theme settings (sticky header), the international phone
// field, the editorial accessibility checker, the responsive warm-up pass and
// the working header / footer checklists.
//
// Ported from the Varbase Project BDD suites (11.0.x, 10.1.x, 9.2.x) so every
// Varbase site gets them from @vardot/varbase-e2e instead of copying them into
// each project's own tests/step-definitions/.
// -----------------------------------------------------------------------------

const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { smartSettle, friendly } = require('./varbase-e2e');
const { budget, defaultThemeSettingsPath } = require('./drupal-helpers');

/**
 * Authenticate a Varbase user defined in cucumber.js worldParameters.users.
 *
 * Example #1: Given I am a logged in user with the "webmaster" user
 * Example #2: Given I am a logged in user with the "Content admin" user
 * Example #3: Given I am a logged in user with the username "editor"
 * Example #4: Given I am a logged in user with "admin"
 * Example #5: And I am a logged in user with the "webmaster" user
 */
Given(/^I am a logged in user with( the)*( username)* "([^"]*)?"( user)*$/, async function (theCase, usernameCase, username, userCase) {
  const users = this.parameters.users;

  if (!(username in users)) {
    throw friendly(
      `User "${username}" is not configured.`,
      `Add it to worldParameters.users in cucumber.js. Known users: ${Object.keys(users).join(', ')}.`
    );
  }

  const loginName = users[username].username || username;
  const password = users[username].password;
  if (password == null) return;

  await this.page.goto(this.launchUrl + '/user/login', { waitUntil: 'domcontentloaded' });
  // Wait for the username field to be actionable, fill, then submit by
  // triggering the button's native click in-page. The Varbase login form is
  // a standard POST; an in-page submit cannot be intercepted by the floating
  // AI chatbot widget (a Playwright click would hit a 30s actionability
  // timeout when the widget overlaps the button).
  await this.page.waitForSelector('#edit-name', { state: 'visible', timeout: 15000 });
  await this.page.fill('#edit-name', loginName);
  await this.page.fill('#edit-pass', password);
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
    this.page.evaluate(() => {
      const submit = document.querySelector('#edit-submit');
      if (submit) { submit.click(); return; }
      const form = document.querySelector('#user-login-form') || document.forms[0];
      if (form) form.submit();
    }),
  ]);
  // Smart-settle the post-login page so the next step sees a stable page.
  await smartSettle(this.page, (this.minWaitTime && this.minWaitTime.page) || 8000);
});

/**
 * Fill an international telephone field (Webform `tel` element with
 * `#international`, rendered by the intl-tel-input library). Setting the raw
 * value with a plain "fill in" step is not enough: intl-tel-input validates
 * the number with libphonenumber and rejects anything it cannot parse, so the
 * webform's clientside/serverside validation fails. This step drives the
 * intl-tel-input instance itself (`setNumber`) and dispatches input/blur so
 * both the widget and the webform see a valid, formatted number.
 *
 * Pass the number in E.164 form (e.g. "+14155552671") for deterministic
 * results regardless of the field's selected country.
 *
 * Example #1: When I fill in the international phone field with "+14155552671"
 * Example #2: And I fill in the international phone number with "+442071838750"
 * Example #3: When we fill in the international phone field with "+14155552671"
 * Example #4: And I fill in the international phone field "Phone" with "+14155552671"
 * Example #5: Given I fill in the international phone number with "+12025550143"
 */
When(/^(?:I |we )*fill in the international phone (?:field|number)(?: "[^"]*")? with "([^"]*)"$/, async function (number) {
  const valid = await this.page.evaluate((num) => {
    const g = window.intlTelInputGlobals;
    if (!g || !g.instances) return null;
    const keys = Object.keys(g.instances);
    if (!keys.length) return null;
    const inst = g.instances[keys[0]];
    inst.setNumber(num);
    const input = inst.telInput || document.querySelector('input[type="tel"]');
    if (input) {
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true }));
    }
    return inst.isValidNumber();
  }, number);

  if (valid === null) {
    throw friendly(
      'No intl-tel-input phone field was found on the page.',
      'This step only works on a Webform "tel" element with #international enabled.'
    );
  }
  if (!valid) {
    throw friendly(
      `"${number}" is not a valid phone number for this field.`,
      'Pass a libphonenumber-valid number in E.164 form, e.g. "+14155552671".'
    );
  }
});

/**
 * Go to the default theme's settings page, resolved by machine name (not
 * hard-coded), so the test works whatever the default theme is.
 *
 * Example #1: When I go to the default theme settings page
 * Example #2: And I go to the default theme settings
 * Example #3: When we go to the default theme settings page
 * Example #4: And we go to the default theme settings
 * Example #5: Given I go to the default theme settings page
 */
When(/^(?:I |we )*go to the default theme settings(?: page)?$/, async function () {
  const path = await defaultThemeSettingsPath(this.page, this.launchUrl);
  if (!path) throw friendly('Could not find the default theme settings link.', 'Open /admin/appearance as a user who can administer themes.');
  await this.page.goto(`${this.launchUrl.replace(/\/$/, '')}${path}`, { waitUntil: 'domcontentloaded' });
  await smartSettle(this.page, (this.minWaitTime && this.minWaitTime.page) || 8000);
});

/**
 * Enable or disable the default theme's "Sticky header" setting and save.
 * The Gin-styled checkbox is visually hidden, so it is toggled in-page. Opens
 * the default theme's settings form, sets the checkbox, and submits.
 *
 * Run a login step first (e.g. the webmaster).
 *
 * Example #1: When I enable the sticky header theme setting
 * Example #2: And I disable the sticky header theme setting
 * Example #3: When we enable the sticky header theme setting
 * Example #4: And we disable the sticky header theme setting
 * Example #5: Given I enable the sticky header theme setting
 */
When(/^(?:I |we )*(enable|disable) the sticky header theme setting$/, async function (action) {
  const want = action === 'enable';
  const settingsPath = await defaultThemeSettingsPath(this.page, this.launchUrl);
  if (!settingsPath) throw friendly('Could not find the default theme settings link.', 'Open /admin/appearance as a user who can administer themes.');
  await this.page.goto(`${this.launchUrl.replace(/\/$/, '')}${settingsPath}`, { waitUntil: 'domcontentloaded' });
  const ok = await this.page.evaluate((on) => {
    const cb = document.querySelector('input[name="sticky_header"]');
    if (!cb) return false;
    if (cb.checked !== on) cb.click();
    const submit = document.getElementById('edit-submit') || [...document.querySelectorAll('input[type="submit"]')].find((b) => /save configuration/i.test(b.value));
    if (!submit) return false;
    submit.click();
    return true;
  }, want);
  if (!ok) throw friendly('Could not toggle the "Sticky header" theme setting.', 'Open the default theme settings as a user who can administer the theme.');
  await smartSettle(this.page, (this.minWaitTime && this.minWaitTime.page) || 8000);
});

/**
 * Warm up a page across every viewport breakpoint in the testing settings.
 *
 * The default theme renders responsive images via drimage_improved, which builds
 * a different WebP derivative per rendered width. This visits the page once at
 * each breakpoint from worldParameters.selectors.breakpoints (scrolling to the
 * bottom to trigger lazy images) so every derivative is generated and cached to
 * disk before the health checks assert on console errors. It makes no
 * assertions; it only primes the cache.
 *
 * Example #1: When I warm up "/" at all testing breakpoints
 * Example #2: And I warm up "/features" at all testing breakpoints
 * Example #3: When we warm up "/blog" at all testing breakpoints
 * Example #4: And I warm up "/contact-us" at all testing breakpoints
 * Example #5: Given I warm up "/about-varbase" at all testing breakpoints
 */
When(/^(?:I |we )*warm up "([^"]*)" at all testing breakpoints$/, async function (path) {
  const base = this.launchUrl.replace(/\/$/, '');
  const url = path.startsWith('http') ? path : base + (path.startsWith('/') ? path : '/' + path);
  const configured = (this.parameters.selectors && this.parameters.selectors.breakpoints) || {};
  const breakpoints = Object.values(configured);
  if (!breakpoints.length) {
    breakpoints.push({ width: 1920, height: 1080 });
  }
  const budget = (this.minWaitTime && this.minWaitTime.page) || 8000;
  for (const breakpoint of breakpoints) {
    await this.page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await smartSettle(this.page, budget);
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await smartSettle(this.page, budget);
  }
});

/**
 * Click the "Next" button in the Varbase / Drupal Shepherd tour.
 *
 * Ports VarbaseContext::iClickNextInTour. The tour button lives in a
 * shadow/overlay dialog; click it via an in-page native click after scrolling
 * it into view.
 *
 * Example #1: When I click next button in tour
 * Example #2: And I click next button in tour
 * Example #3: When we click next button in tour
 * Example #4: Given I click next button in tour
 * Example #5: And we click next button in tour
 */
When(/^(?:I |we )*click next button in tour$/, async function () {
  const ok = await this.page.evaluate(() => {
    // Advance via the Shepherd API. The Drupal/Varbase tour renders each tip
    // through Shepherd.js; its "Next" button's click handler does not reliably
    // fire under a synthetic element.click() (the internal step pointer moves
    // but the new tip does not render, or nothing happens at all), so drive the
    // active tour directly — which shows the next step's tip exactly as the
    // button is meant to. Fall back to clicking the button if the API is not
    // exposed.
    if (window.Shepherd && Shepherd.activeTour && typeof Shepherd.activeTour.next === 'function') {
      Shepherd.activeTour.next();
      return true;
    }
    const byText = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Next');
    const btn = byText || document.querySelector('.shepherd-button:not(.shepherd-button-secondary)');
    if (!btn) return false;
    btn.scrollIntoView({ block: 'center' });
    btn.click();
    return true;
  });
  if (!ok) throw friendly('The "Next" button in the tour was not found.');
  await smartSettle(this.page, budget(this));
});

/**
 * Close the Varbase / Drupal Shepherd tour.
 *
 * Ports VarbaseContext::iCloseTour: tries the cancel/close control, then falls
 * back to dispatching Escape.
 *
 * Example #1: When I close the tour
 * Example #2: And I close the tour
 * Example #3: When we close the tour
 * Example #4: Given I close the tour
 * Example #5: And we close the tour
 */
When(/^(?:I |we )*close the tour$/, async function () {
  await this.page.evaluate(() => {
    const btn = document.querySelector('.shepherd-cancel-icon, button[aria-label="Close"], .shepherd-button:last-child');
    if (btn) { btn.scrollIntoView({ block: 'center' }); btn.click(); return; }
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  });
  await smartSettle(this.page, budget(this));
});

/**
 * Assert the Editoria11y accessibility checker panel is (or is not) present.
 *
 * Ports VarbaseContext::iShouldSeeTheAccessibilityChecker /
 * iShouldNotSeeTheAccessibilityChecker. The checker mounts an
 * <ed11y-element-panel> custom element.
 *
 * Example #1: Then I should see the accessibility checker
 * Example #2: And I should see the a11y checker
 * Example #3: Then should see a11y checker
 * Example #4: And I should not see the accessibility checker
 * Example #5: Then should not see a11y checker
 */
Then(/^(?:I |we )*should( not)? see (?:the )?(?:accessibility |a11y )?checker$/, async function (negate) {
  const loc = this.page.locator('ed11y-element-panel');
  const count = await loc.count().catch(() => 0);
  if (negate) {
    assert.strictEqual(count, 0, friendly('The accessibility checker panel was unexpectedly present.'));
  } else {
    assert.ok(count > 0, friendly('The accessibility checker panel was not found on the page.'));
  }
});

/**
 * Close the Editoria11y accessibility checker to clear space for more actions.
 *
 * Ports VarbaseContext::iCloseTheAccessibilityChecker: toggles the panel via
 * its shadow-root toggle button.
 *
 * Example #1: When I close the accessibility checker
 * Example #2: And I close the a11y checker
 * Example #3: When we close the accessibility checker
 * Example #4: Given I close the a11y checker
 * Example #5: And we close the accessibility checker
 */
When(/^(?:I |we )*close (?:the )?(?:accessibility |a11y )?checker$/, async function () {
  const ok = await this.page.evaluate(() => {
    const panel = document.querySelector('ed11y-element-panel');
    if (!panel || !panel.shadowRoot) return false;
    const toggle = panel.shadowRoot.querySelector('#ed11y-toggle');
    if (!toggle) return false;
    toggle.click();
    return true;
  });
  if (!ok) throw friendly('The accessibility checker toggle was not found.');
  await smartSettle(this.page, budget(this));
});

/**
 * Press a responsive-preview device button (Drupal core Responsive preview).
 *
 * Ports VarbaseContext::iPressResponsivePreviewDeviceButton: clicks the control
 * carrying data-responsive-preview-name.
 *
 * Example #1: When I press the "desktop" responsive preview device button
 * Example #2: And I press the "mobile" responsive preview device button
 * Example #3: When we press the "tablet" responsive preview device button
 * Example #4: And I press the "widescreen" responsive preview device button
 * Example #5: When I press the "mobile" responsive preview device button
 */
When(/^(?:I |we )*press the "([^"]*)" responsive preview device button$/, async function (deviceName) {
  const ok = await this.page.evaluate((deviceName) => {
    const btn = document.querySelector(`[data-responsive-preview-name="${deviceName}"]`);
    if (!btn) return false;
    btn.click();
    return true;
  }, deviceName);
  if (!ok) throw friendly(`The "${deviceName}" responsive preview device option was not found.`);
  await smartSettle(this.page, budget(this));
});

/**
 * Assert an element renders as a sticky element (CSS position: sticky).
 *
 * Resolves a named selector from the registry (falling back to a raw CSS
 * selector) and checks its computed position. Reads better in a feature than
 * asserting on a raw "position:sticky;" CSS property string.
 *
 * Example #1: Then the "site header" should be sticky
 * Example #2: And the "site header" should be sticky
 * Example #3: Then the "site header" should not be sticky
 * Example #4: And the "footer" should not be sticky
 * Example #5: Then the "main content" should be sticky
 */
Then(/^the "([^"]*)" should( not)? be sticky$/, async function (name, negate) {
  const selector = (this.__selectorsCss && this.__selectorsCss[name]) || name;
  const position = await this.page.locator(selector).first().evaluate((el) => window.getComputedStyle(el).position);
  if (negate) {
    assert.notStrictEqual(position, 'sticky', friendly(`Expected "${name}" not to be sticky, but its computed position is "${position}".`));
  } else {
    assert.strictEqual(position, 'sticky', friendly(`Expected "${name}" to be sticky, but its computed position is "${position}".`));
  }
});

/**
 * Assert a named element gains (or loses) a CSS class, with auto-retry.
 *
 * Resolves a named selector from the registry (falling back to a raw CSS
 * selector) and polls its class list. Use this instead of the raw-selector
 * web-first step when the feature should read with a registered name.
 *
 * Example #1: Then the "site header" should have the "scrolled" class within 5 seconds
 * Example #2: And the "site header" should have the "scrolled" class
 * Example #3: Then the "site header" should not have the "scrolled" class
 * Example #4: And the "main content" should have the "is-active" class within 3 seconds
 * Example #5: Then the "footer" should not have the "scrolled" class
 */
Then(/^the "([^"]*)" should( not)? have the "([^"]*)" class(?: within (\d+) seconds?)?$/, async function (name, negate, cls, sec) {
  const selector = (this.__selectorsCss && this.__selectorsCss[name]) || name;
  const loc = this.page.locator(selector).first();
  const timeout = (sec ? parseInt(sec, 10) : 5) * 1000;
  const want = !negate;
  const start = Date.now();
  let classes = '';
  do {
    classes = (await loc.getAttribute('class')) || '';
    if (classes.split(/\s+/).includes(cls) === want) {
      return;
    }
    await this.page.waitForTimeout(100);
  } while (Date.now() - start < timeout);
  throw friendly(`Expected "${name}" ${want ? 'to have' : 'not to have'} the "${cls}" class within ${timeout / 1000}s; last class was "${classes}".`);
});
