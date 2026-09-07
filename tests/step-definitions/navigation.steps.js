'use strict';

// All navigation step definitions live in this file: anonymous user, going
// to the homepage / a specific path, browser history (back/forward), reload,
// URL/path assertions, and the access-control assertions (is this path
// refused or allowed for the current user).

const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { gotoUrl, waitForPageLoad, smartSettle } = require('./varbase-e2e');

// ---------------------------------------------------------------------------
// Sessions / visits
// ---------------------------------------------------------------------------

/**
 * Clear cookies and navigate to the launch URL as an anonymous visitor.
 *
 * Example #1: Given I am an anonymous user
 * Example #2: Given we are an anonymous user
 * Example #3: Given an anonymous user
 *
 */
Given(/^(I am |we are )?an anonymous user$/, async function (pronounCase) {
  await this.context.clearCookies();
  await gotoUrl(this.page, this.launchUrl);
  await waitForPageLoad(this.page, this.minWaitTime.page || 3000);
});

/**
 * Open the homepage.
 *
 * Example #1: Given I am on homepage
 * Example #2: Given I am on the homepage
 * Example #3: Given I am on frontpage
 * Example #4: Given I am on the frontpage
 * Example #5: Given we are on homepage
 * Example #6: Given we are on the frontpage
 * Example #7: Given on homepage
 * Example #8: Given on the homepage
 * Example #9: Given on frontpage
 * Example #10: Given on the frontpage
 *
 */
Given(/^(I am |we are )?on( the)* (homepage|frontpage)$/, async function (pronounCase, theCase, pageCase) {
  const defaultTime = this.minWaitTime.page || 3000;
  await gotoUrl(this.page, this.launchUrl);
  await this.page.waitForSelector('body', { state: 'attached', timeout: defaultTime });
  await waitForPageLoad(this.page, defaultTime);
});

/**
 * Open a specific page under the launch URL.
 *
 * Example #1: Given I am on "/about-us.html"
 * Example #2: Given I am on the "/about-us.html" page
 * Example #3: Given we are on "/user/login"
 * Example #4: Given we are on the "/contact-us.html" page
 * Example #5: Given on "/about-us.html"
 * Example #6: Given on the "/about-us.html" page
 * Example #7: Given I am on "https://un.org"
 *
 */
Given(/^(I am |we are )*on( the)* "([^"]*)?"( page)*$/, async function (pronounCase, theCase, url, pageCase) {
  await gotoUrl(this.page, this.launchUrl + url);
  await this.page.waitForSelector('body', { state: 'attached', timeout: 10000 });
  await waitForPageLoad(this.page);
});

/**
 * Navigate to the homepage.
 *
 * Example #1: When I go to homepage
 * Example #2: When I go to the homepage
 * Example #3: When I navigate to the homepage
 * Example #4: When navigating to the homepage
 * Example #5: When navigating to homepage
 * Example #6: When navigating to the frontpage
 * Example #7: When we go to the homepage
 * Example #8: When we navigate to the homepage
 *
 */
When(/^(I go |I navigate |we go |we navigate |navigating )?to( the)* (homepage|frontpage)$/, async function (pronounCase, theCase, pageCase) {
  const defaultTime = this.minWaitTime.page || 3000;
  await gotoUrl(this.page, this.launchUrl);
  await this.page.waitForSelector('body', { state: 'attached', timeout: defaultTime });
  await waitForPageLoad(this.page, defaultTime);
});

/**
 * Navigate to a specific page.
 *
 * Example #1: When I go to "/contact-us.html"
 * Example #2: When I go to "/user/login"
 * Example #3: When I navigate to "/admin/dashboard"
 * Example #4: When navigating to "/products"
 * Example #5: When we go to "/products"
 * Example #6: When we navigate to "/terms"
 *
 */
When(/^(I go |I navigate |we go |we navigate |navigating )?to "([^"]*)?"$/, async function (pronounCase, url) {
  const defaultTime = this.minWaitTime.page || 3000;
  await gotoUrl(this.page, this.launchUrl + url);
  await this.page.waitForSelector('body', { state: 'attached', timeout: defaultTime });
  await waitForPageLoad(this.page, defaultTime);
});

// ---------------------------------------------------------------------------
// Browser history + reload
// ---------------------------------------------------------------------------

/**
 * Moves forward one page in browser history.
 *
 * Example #1: When I move forward one page
 * Example #2: When we move forward one page
 * Example #3: And move forward one page
 *
 */
When(/^(I |we )*move forward one page$/, async function (pronounCase) {
  await this.page.goForward();
});

/**
 * Moves backward one page in browser history.
 *
 * Example #1: When I move backward one page
 * Example #2: When we move backward one page
 * Example #3: And move backward one page
 *
 */
When(/^(I |we )*move backward one page$/, async function (pronounCase) {
  await this.page.goBack();
});

/**
 * Reloads the current page.
 *
 * Example #1: When I reload
 * Example #2: And I reload the page
 * Example #3: And we reload page
 * Example #4: And we reload the page
 *
 */
When(/^(I |we )*reload( the)*( page)*$/, async function (pronounCase, theCase, pageCase) {
  await this.page.reload();
});

// ---------------------------------------------------------------------------
// URL / path assertions
// ---------------------------------------------------------------------------

/**
 * Assert that the current page is or is not the homepage.
 *
 * Example #1: Then I should be on homepage
 * Example #2: And I should be on the homepage
 * Example #3: Then I should be on frontpage
 * Example #4: And should be on the homepage
 * Example #5: Then should be on homepage
 * Example #6: And we should be on homepage
 * Example #7: Then should be on frontpage
 * Example #8: And we should be on the homepage
 * Example #9: Then I should not be on homepage
 * Example #10: And I should not be on the homepage
 *
 */
Then(/^(I |we )*should( not)* be on( the)* (homepage|frontpage)$/, async function (pronounCase, notCase, theCase, pageCase) {
  const currentUrl = this.page.url();
  if (notCase) {
    assert.ok(currentUrl !== this.launchUrl && !currentUrl.startsWith(this.launchUrl + '/'),
      `Should NOT be on homepage but current URL is: ${currentUrl}`);
  } else {
    assert.ok(currentUrl.startsWith(this.launchUrl),
      `Should be on homepage but current URL is: ${currentUrl}`);
  }
});

/**
 * Assert that the current path is or is not equal to the specified path.
 *
 * Example #1: Then I should be on "/"
 * Example #2: And I should be on "/user/login"
 * Example #3: And I should be on "https://un.org"
 * Example #4: Then we should be on the "/" page
 * Example #5: And we should be on "/user/login"
 * Example #6: Then should be on the "/user/reset" page
 * Example #7: Then I should not be on "/"
 * Example #8: And I should not be on "/user/login"
 * Example #9: And I should not be on "https://un.org"
 * Example #10: And we should not be on the "https://un.org" page
 *
 */
Then(/^(I |we )*should( not)* be on( the)* "([^"]*)?"( page)*$/, async function (pronounCase, notCase, theCase, url, pageCase) {
  const currentUrl = this.page.url();
  if (notCase) {
    assert.ok(!currentUrl.includes(url), `URL should NOT contain "${url}" but it is: ${currentUrl}`);
  } else {
    assert.ok(currentUrl.includes(url), `URL should contain "${url}" but it is: ${currentUrl}`);
  }
});

/**
 * Assert that the current URL matches or does not match a regex pattern.
 *
 * Example #1: Then the url should match "/contact-us.html"
 * Example #2: Then the url should not match "/contact-us.html"
 * Example #3: And the url should match "^https://"
 *
 */
Then(/^(the )*url should( not)* match "([^"]*)?"$/, async function (theCase, notCase, pattern) {
  const currentUrl = this.page.url();
  const regex = new RegExp(pattern);
  if (notCase) {
    assert.ok(!regex.test(currentUrl), `URL "${currentUrl}" should NOT match "${pattern}" but it does.`);
  } else {
    assert.ok(regex.test(currentUrl), `URL "${currentUrl}" should match "${pattern}" but it does not.`);
  }
});

// ---------------------------------------------------------------------------
// Access control — is this path refused or allowed for the current user
// ---------------------------------------------------------------------------

// A refusal is not one signal. A site can answer 403, answer 404 to keep a
// route unguessable, answer 200 with an access-denied page, or redirect to the
// login form — all four are "you may not see this". This reads the response
// status and, when the status alone is inconclusive, the rendered page.
const DENIED_MARKERS = 'h1:has-text("Access denied"), #user-login-form, form.user-login-form, form.user-login, input[name="pass"]';

async function accessReport(page, response) {
  const status = response ? response.status() : 0;
  const url = page.url();
  const markers = await page.locator(DENIED_MARKERS).count().catch(() => 0);
  const body = (await page.locator('body').innerText().catch(() => '') || '').toLowerCase();
  const text = body.includes('access denied') || body.includes('you are not authorized');
  return {
    status,
    url,
    denied: status === 403 || status === 404 || markers > 0 || /\/user\/login/.test(url) || text,
    why: status === 403 || status === 404 ? `HTTP ${status}`
      : markers > 0 ? 'an access-denied page or a log-in form'
        : /\/user\/login/.test(url) ? 'a redirect to the log-in form'
          : text ? 'access-denied text in the page' : `HTTP ${status} and a rendered page`,
  };
}

/**
 * Assert the current user may NOT open a path: the site refuses it.
 *
 * Four refusals count, because a site picks its own: HTTP 403, HTTP 404 (used
 * to keep a route unguessable), HTTP 200 with an access-denied page, and a
 * redirect to the log-in form. Asserting only on 403 makes a scenario pass or
 * fail on how the site is configured rather than on who the user is.
 *
 * Example #1: Then I am denied access to "/admin/config"
 * Example #2: Then I should be refused "/node/add/article"
 * Example #3: And we should be denied access to "/admin/people"
 * Example #4: Given I am an anonymous user
 *               Then I am denied access to "/admin/modules"
 * Example #5: Then we am denied access to "/admin/reports/status"
 *
 */
Then(/^(I |we )*(?:am|should be) (?:denied access to|refused) "([^"]*)?"$/, async function (pronounCase, path) {
  const response = await this.page.goto(this.launchUrl + path, { waitUntil: 'domcontentloaded' }).catch(() => null);
  const report = await accessReport(this.page, response);
  assert.ok(report.denied, `Expected "${path}" to be refused, but the site answered ${report.why}.`);
  await smartSettle(this.page, 2000);
});

/**
 * Assert the current user MAY open a path: the site answers it and renders it.
 *
 * The positive half of a permission scenario, and it earns its place — a role
 * that can reach nothing at all passes every refusal assertion in the suite,
 * so the refusals only mean something next to this.
 *
 * Example #1: Then I should be allowed "/admin/content"
 * Example #2: Then I am granted access to "/node/add/article"
 * Example #3: And we should be allowed "/admin/content/media"
 * Example #4: Given I am a logged in user with the username "webmaster" user
 *               Then I should be allowed "/admin/content"
 * Example #5: Then we should be allowed "/user"
 *
 */
Then(/^(I |we )*(?:am|should be) (?:allowed|granted access to) "([^"]*)?"$/, async function (pronounCase, path) {
  const response = await this.page.goto(this.launchUrl + path, { waitUntil: 'domcontentloaded' }).catch(() => null);
  const report = await accessReport(this.page, response);
  assert.ok(report.status >= 200 && report.status < 300, `Expected "${path}" to be allowed, but the site answered HTTP ${report.status}.`);
  assert.ok(!report.denied, `Expected "${path}" to be allowed, but the site answered ${report.why}.`);
  await smartSettle(this.page, 2000);
});

/**
 * Assert the page already open is a refusal — an access-denied page, or the
 * log-in form the site redirected to.
 *
 * Use it when the refusal is the result of an action rather than of a visit:
 * submit a form, click an operation, follow a link, then assert the wall. It
 * navigates nothing, so nothing about the failed attempt is lost.
 *
 * Example #1: Then I should be denied access
 * Example #2: Then the page should be access restricted
 * Example #3: When I click "Edit"
 *               Then I should be denied access
 * Example #4: And we should be denied access
 * Example #5: Then the page should be access restricted
 *
 */
Then(/^(?:(?:I |we )*should be denied access|(?:the )*page should be access restricted)$/, async function () {
  await waitForPageLoad(this.page, (this.minWaitTime && this.minWaitTime.page) || 8000);
  const report = await accessReport(this.page, null);
  const markers = await this.page.locator(DENIED_MARKERS).count().catch(() => 0);
  const body = (await this.page.locator('body').innerText().catch(() => '') || '').toLowerCase();
  const denied = markers > 0 || /\/user\/login/.test(report.url)
    || body.includes('access denied') || body.includes('you are not authorized');
  assert.ok(denied, `Expected an access-denied page or a log-in form, but "${report.url}" rendered normally.`);
});
