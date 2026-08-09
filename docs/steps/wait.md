# Waits steps

21 steps, defined in `tests/step-definitions/wait.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I wait for 1 second` |
| 2 | `When I wait for 1 second for AJAX to finish` |
| 3 | `When I wait 1 second` |
| 4 | `When I wait max of 1 second` |
| 5 | `When I wait 1 minute` |
| 6 | `When I wait max of 1 minute` |
| 7 | `When I wait until the page is loaded` |
| 8 | `When I wait for AJAX to finish` |
| 9 | `When I wait for the modal to appear` |
| 10 | `When I wait for "#dashboard" to appear` |
| 11 | `When I wait for "#loading-spinner" to disappear` |
| 12 | `When I wait for the text "Dashboard" to appear` |
| 13 | `When I wait for the text "Loading…" to disappear` |
| 14 | `When I wait until the URL contains "/dashboard"` |
| 15 | `When I wait until the page title is "Dashboard - MyApp"` |
| 16 | `When I wait until 5 elements match ".product-card"` |
| 17 | `When I wait until at least 3 elements match ".item"` |
| 18 | `When I wait until the network is idle` |
| 19 | `When I wait until the page is interactive` |
| 20 | `When I wait until pending timers settle` |
| 21 | `Then eventually I should see "Done"` |

---

## 1. When I wait for 1 second

Wait UP TO N seconds for the page to settle. Returns early on idle.

"Settle" = DOM ready, no in-flight fetch/XHR, no pending setTimeout
callbacks, and no MutationObserver activity for at least 250 ms.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait for (\d+) seconds?$/
```

**Examples**

```gherkin
When I wait for 1 second
When I wait for 5 seconds
And I wait for 3 seconds
When we wait for 2 seconds
And we wait for 10 seconds
When I press "Save"
  And I wait for 2 seconds
  Then I should see "Saved"
```

## 2. When I wait for 1 second for AJAX to finish

Wait UP TO N seconds for the page (and AJAX) to settle. Returns early.

Same probe as `wait for N seconds` — kept for legacy phrasing parity with
older feature files that say "for AJAX to finish" explicitly.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait for (\d+) seconds? for AJAX to finish$/
```

**Examples**

```gherkin
When I wait for 1 second for AJAX to finish
When I wait for 3 seconds for AJAX to finish
And I wait for 5 seconds for AJAX to finish
When we wait for 2 seconds for AJAX to finish
When I press "Search"
  And I wait for 5 seconds for AJAX to finish
  Then I should see "Results"
```

## 3. When I wait 1 second

Wait UP TO a number of seconds for the page to settle.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait (\d+)( second| seconds|s)?$/
```

**Examples**

```gherkin
When I wait 1 second
When I wait 5 seconds
When we wait 3s
And wait 2s
And wait 2 seconds
When we wait 1 second
When we wait 5 seconds
When we wait 4s
```

## 4. When I wait max of 1 second

Wait UP TO a maximum number of seconds for the page to settle.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait max of (\d+)( second| seconds|s)?$/
```

**Examples**

```gherkin
When I wait max of 1 second
When I wait max of 5 seconds
When we wait max of 3s
And wait max of 2s
And wait max of 2 seconds
When we wait max of 1 second
When we wait max of 5 seconds
When we wait max of 4s
```

## 5. When I wait 1 minute

Wait UP TO a number of minutes for the page to settle.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait (\d+)( minute| minutes|m)?$/
```

**Examples**

```gherkin
When I wait 1 minute
When I wait 10 minutes
When we wait 1m
And wait 2m
And wait 2 minutes
```

## 6. When I wait max of 1 minute

Wait UP TO a maximum number of minutes for the page to settle.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait max of (\d+)( minute| minutes|m)?$/
```

**Examples**

```gherkin
When I wait max of 1 minute
When I wait max of 10 minutes
When we wait max of 1m
And wait max of 2m
And wait max of 2 minutes
```

## 7. When I wait until the page is loaded

Wait until the page is loaded.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait until( the)* page( is)* loaded*$/
```

**Examples**

```gherkin
When I wait until the page is loaded
When we wait until the page is loaded
When wait until page loaded
```

## 8. When I wait for AJAX to finish

Wait for active XHR/fetch requests to complete.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait for AJAX to finish$/
```

**Examples**

```gherkin
When I wait for AJAX to finish
And I wait for AJAX to finish
When we wait for AJAX to finish
And wait for AJAX to finish
```

## 9. When I wait for the modal to appear

Wait for a modal dialog to appear or disappear.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait for( the)* modal( dialog)* to (appear|disappear)$/
```

**Examples**

```gherkin
When I wait for the modal to appear
When I wait for the modal to disappear
When we wait for modal to appear
And I wait for the modal dialog to disappear
```

## 10. When I wait for "#dashboard" to appear

Wait until a CSS selector becomes visible. Returns the moment the
matching element is on screen (display !== 'none', visibility !== 'hidden',
has a non-zero box). This is the canonical "wait until X appears" probe.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait for "([^"]*)" to appear$/
```

**Examples**

```gherkin
When I wait for "#dashboard" to appear
When I wait for ".success-banner" to appear
And I wait for "[data-testid=user-list]" to appear
When we wait for ".modal.show" to appear
When I press "Save"
  And I wait for ".toast-success" to appear
```

## 11. When I wait for "#loading-spinner" to disappear

Wait until a CSS selector becomes hidden (display:none, visibility:hidden,
detached, or zero-size).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait for "([^"]*)" to disappear$/
```

**Examples**

```gherkin
When I wait for "#loading-spinner" to disappear
When I wait for ".overlay" to disappear
And I wait for ".modal.show" to disappear
When we wait for "[data-testid=skeleton]" to disappear
When I press "Submit"
  And I wait for ".loader" to disappear
  Then I should see "Saved"
```

## 12. When I wait for the text "Dashboard" to appear

Wait until visible text appears anywhere on the page.

Polls `document.body.innerText` every 100 ms for up to 10 s. Match is
case-sensitive substring.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait for( the)* text "([^"]*)" to appear$/
```

**Examples**

```gherkin
When I wait for the text "Dashboard" to appear
When I wait for the text "Loading complete" to appear
And I wait for text "Welcome" to appear
When we wait for the text "Order #1234" to appear
When I press "Submit"
  And I wait for the text "Thank you" to appear
```

## 13. When I wait for the text "Loading…" to disappear

Wait until visible text is gone from the page.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait for( the)* text "([^"]*)" to disappear$/
```

**Examples**

```gherkin
When I wait for the text "Loading…" to disappear
When I wait for the text "Saving" to disappear
And I wait for text "Pending" to disappear
When we wait for the text "Connecting" to disappear
When I press "Submit"
  And I wait for the text "Validating" to disappear
  Then I should see "Done"
```

## 14. When I wait until the URL contains "/dashboard"

Wait until the current URL contains a fragment.

Useful after a redirect, push-state navigation, or hash-based routing.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait until( the)* URL contains "([^"]*)"$/
```

**Examples**

```gherkin
When I wait until the URL contains "/dashboard"
When I wait until the URL contains "?step=2"
And I wait until the URL contains "#confirmation"
When we wait until the URL contains "/orders/"
When I follow "Sign in"
  And I wait until the URL contains "/auth/callback"
```

## 15. When I wait until the page title is "Dashboard - MyApp"

Wait until `document.title` equals (`is`) or contains the given value.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait until( the)* page title (is|contains) "([^"]*)"$/
```

**Examples**

```gherkin
When I wait until the page title is "Dashboard - MyApp"
When I wait until the page title contains "Dashboard"
And I wait until the page title contains "(3 unread)"
When we wait until the page title is "Order Placed"
When I follow "Inbox"
  And I wait until the page title contains "Inbox"
```

## 16. When I wait until 5 elements match ".product-card"

Wait until exactly N elements match a CSS selector.

Use 0 to wait for elements to disappear, or a positive count to wait for
a specific number to render.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait until (\d+) elements? match(?:es)? "([^"]*)"$/
```

**Examples**

```gherkin
When I wait until 5 elements match ".product-card"
When I wait until 0 elements match ".loading-skeleton"
And I wait until 1 element matches ".active-row"
When we wait until 10 elements match "tr.user"
When I press "Load more"
  And I wait until 20 elements match ".feed-item"
```

## 17. When I wait until at least 3 elements match ".item"

Wait until at least N elements match a CSS selector.

Useful for infinite-scroll / pagination tests where the lower bound matters
but the exact count may vary.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait until at least (\d+) elements? match(?:es)? "([^"]*)"$/
```

**Examples**

```gherkin
When I wait until at least 3 elements match ".item"
When I wait until at least 1 element matches ".notification"
And I wait until at least 10 elements match ".feed-item"
When we wait until at least 5 elements match "tr"
When I scroll to the bottom
  And I wait until at least 25 elements match ".product-card"
```

## 18. When I wait until the network is idle

Wait until the network goes quiet (full smart settle, 10 s budget).

Three equivalent phrasings.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait until (the network is idle|requests are complete|network goes quiet)$/
```

**Examples**

```gherkin
When I wait until the network is idle
And I wait until requests are complete
When we wait until network goes quiet
When I press "Search"
  And I wait until the network is idle
  Then I should see "Results"
When I press "Refresh"
  And I wait until requests are complete
```

## 19. When I wait until the page is interactive

Wait until the page is interactive (DOMContentLoaded + body attached).

Lighter than `wait until the network is idle` — does not wait for late
fetch/XHR. Useful when you need to interact with the document early.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait until( the)* page is interactive$/
```

**Examples**

```gherkin
When I wait until the page is interactive
Given I am on "/heavy-page"
  When I wait until the page is interactive
And I wait until the page is interactive
When we wait until the page is interactive
Given I am on "/spa"
  When I wait until the page is interactive
  Then "<#root>" should be attached
```

## 20. When I wait until pending timers settle

Wait until every tracked `setTimeout` callback has fired.

Catches "fade-out then display:none" close transitions, debounced renders,
and any UI flow that schedules a delayed update without making a network
request. Reads `window.__varbaseE2ePendingTimers`, the counter installed by
varbase-e2e.js's init script.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*wait until pending timers settle$/
```

**Examples**

```gherkin
When I wait until pending timers settle
When I press "Close"
  And I wait until pending timers settle
  Then I should not see the modal
And I wait until pending timers settle
When we wait until pending timers settle
When I press "Toast"
  And I wait until pending timers settle
  Then I should not see "Saved"
```

## 21. Then eventually I should see "Done"

Pollable text assertion — retries the inner step until passing or timeout.

Use sparingly; prefer explicit edge waits (`wait for "X" to appear`).

**Keyword**: `When`

**Pattern**

```js
/^eventually (I |we )*should see "([^"]*)"(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then eventually I should see "Done"
Then eventually I should see "Loaded" within 5 seconds
And eventually we should see "Saved"
Then eventually I should see "Order Confirmed" within 30 seconds
When I press "Submit"
  Then eventually I should see "Submitted" within 8 seconds
```
