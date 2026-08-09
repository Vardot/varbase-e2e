# Varbase steps

14 steps, defined in `tests/step-definitions/varbase.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given I am a logged in user with the "webmaster" user` |
| 2 | `When I fill in the international phone field with "+14155552671"` |
| 3 | `When I go to the default theme settings page` |
| 4 | `When I enable the sticky header theme setting` |
| 5 | `When I warm up "/" at all testing breakpoints` |
| 6 | `When I click next button in tour` |
| 7 | `When I close the tour` |
| 8 | `Then I should see the accessibility checker` |
| 9 | `When I close the accessibility checker` |
| 10 | `Then the page should have a working header` |
| 11 | `Then the page should have a working footer` |
| 12 | `When I press the "desktop" responsive preview device button` |
| 13 | `Then the "site header" should be sticky` |
| 14 | `Then the "site header" should have the "scrolled" class within 5 seconds` |

---

## 1. Given I am a logged in user with the "webmaster" user

Authenticate a Varbase user defined in cucumber.js worldParameters.users.

**Keyword**: `Given`

**Pattern**

```js
/^I am a logged in user with( the)*( username)* "([^"]*)?"( user)*$/
```

**Examples**

```gherkin
Given I am a logged in user with the "webmaster" user
Given I am a logged in user with the "Content admin" user
Given I am a logged in user with the username "editor"
Given I am a logged in user with "admin"
And I am a logged in user with the "webmaster" user
```

## 2. When I fill in the international phone field with "+14155552671"

Fill an international telephone field (Webform `tel` element with
`#international`, rendered by the intl-tel-input library). Setting the raw
value with a plain "fill in" step is not enough: intl-tel-input validates
the number with libphonenumber and rejects anything it cannot parse, so the
webform's clientside/serverside validation fails. This step drives the
intl-tel-input instance itself (`setNumber`) and dispatches input/blur so
both the widget and the webform see a valid, formatted number.

Pass the number in E.164 form (e.g. "+14155552671") for deterministic
results regardless of the field's selected country.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*fill in the international phone (?:field|number)(?: "[^"]*")? with "([^"]*)"$/
```

**Examples**

```gherkin
When I fill in the international phone field with "+14155552671"
And I fill in the international phone number with "+442071838750"
When we fill in the international phone field with "+14155552671"
And I fill in the international phone field "Phone" with "+14155552671"
Given I fill in the international phone number with "+12025550143"
```

## 3. When I go to the default theme settings page

Go to the default theme's settings page, resolved by machine name (not
hard-coded), so the test works whatever the default theme is.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*go to the default theme settings(?: page)?$/
```

**Examples**

```gherkin
When I go to the default theme settings page
And I go to the default theme settings
When we go to the default theme settings page
And we go to the default theme settings
Given I go to the default theme settings page
```

## 4. When I enable the sticky header theme setting

Enable or disable the default theme's "Sticky header" setting and save.
The Gin-styled checkbox is visually hidden, so it is toggled in-page. Opens
the default theme's settings form, sets the checkbox, and submits.

Run a login step first (e.g. the webmaster).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*(enable|disable) the sticky header theme setting$/
```

**Examples**

```gherkin
When I enable the sticky header theme setting
And I disable the sticky header theme setting
When we enable the sticky header theme setting
And we disable the sticky header theme setting
Given I enable the sticky header theme setting
```

## 5. When I warm up "/" at all testing breakpoints

Warm up a page across every viewport breakpoint in the testing settings.

The default theme renders responsive images via drimage_improved, which builds
a different WebP derivative per rendered width. This visits the page once at
each breakpoint from worldParameters.selectors.breakpoints (scrolling to the
bottom to trigger lazy images) so every derivative is generated and cached to
disk before the health checks assert on console errors. It makes no
assertions; it only primes the cache.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*warm up "([^"]*)" at all testing breakpoints$/
```

**Examples**

```gherkin
When I warm up "/" at all testing breakpoints
And I warm up "/features" at all testing breakpoints
When we warm up "/blog" at all testing breakpoints
And I warm up "/contact-us" at all testing breakpoints
Given I warm up "/about-varbase" at all testing breakpoints
```

## 6. When I click next button in tour

Click the "Next" button in the Varbase / Drupal Shepherd tour.

Ports VarbaseContext::iClickNextInTour. The tour button lives in a
shadow/overlay dialog; click it via an in-page native click after scrolling
it into view.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*click next button in tour$/
```

**Examples**

```gherkin
When I click next button in tour
And I click next button in tour
When we click next button in tour
Given I click next button in tour
And we click next button in tour
```

## 7. When I close the tour

Close the Varbase / Drupal Shepherd tour.

Ports VarbaseContext::iCloseTour: tries the cancel/close control, then falls
back to dispatching Escape.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*close the tour$/
```

**Examples**

```gherkin
When I close the tour
And I close the tour
When we close the tour
Given I close the tour
And we close the tour
```

## 8. Then I should see the accessibility checker

Assert the Editoria11y accessibility checker panel is (or is not) present.

Ports VarbaseContext::iShouldSeeTheAccessibilityChecker /
iShouldNotSeeTheAccessibilityChecker. The checker mounts an
<ed11y-element-panel> custom element.

**Keyword**: `Then`

**Pattern**

```js
/^(?:I |we )*should( not)? see (?:the )?(?:accessibility |a11y )?checker$/
```

**Examples**

```gherkin
Then I should see the accessibility checker
And I should see the a11y checker
Then should see a11y checker
And I should not see the accessibility checker
Then should not see a11y checker
```

## 9. When I close the accessibility checker

Close the Editoria11y accessibility checker to clear space for more actions.

Ports VarbaseContext::iCloseTheAccessibilityChecker: toggles the panel via
its shadow-root toggle button.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*close (?:the )?(?:accessibility |a11y )?checker$/
```

**Examples**

```gherkin
When I close the accessibility checker
And I close the a11y checker
When we close the accessibility checker
Given I close the a11y checker
And we close the accessibility checker
```

## 10. Then the page should have a working header

Verify the page header is "working".

On a Varbase site the Main navigation menu is rendered through the Drupal
Canvas global Header region, so a working header means those primary links
are present. Alter the links below to match your own site's main menu.

Example: Then the page should have a working header

**Keyword**: `Then`

**Pattern**

```js
/^(?:the page should have|(?:I |we )*should have) a working header$/
```

**Examples**

```gherkin
Then the page should have a working header
And I should have a working header
Then I should have a working header
And we should have a working header
Then the page should have a working header
```

## 11. Then the page should have a working footer

Verify the page footer is "working".

On a Varbase site the Secondary, Footer and Social media menus are rendered
through the Drupal Canvas global Footer region. A working footer means the
footer link text is present, the social profiles are linked, and the credits
and logos show. Alter the lines below to match your own site.

Example: Then the page should have a working footer

**Keyword**: `Then`

**Pattern**

```js
/^(?:the page should have|(?:I |we )*should have) a working footer$/
```

**Examples**

```gherkin
Then the page should have a working footer
And I should have a working footer
Then I should have a working footer
And we should have a working footer
Then the page should have a working footer
```

## 12. When I press the "desktop" responsive preview device button

Press a responsive-preview device button (Drupal core Responsive preview).

Ports VarbaseContext::iPressResponsivePreviewDeviceButton: clicks the control
carrying data-responsive-preview-name.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*press the "([^"]*)" responsive preview device button$/
```

**Examples**

```gherkin
When I press the "desktop" responsive preview device button
And I press the "mobile" responsive preview device button
When we press the "tablet" responsive preview device button
And I press the "widescreen" responsive preview device button
When I press the "mobile" responsive preview device button
```

## 13. Then the "site header" should be sticky

Assert an element renders as a sticky element (CSS position: sticky).

Resolves a named selector from the registry (falling back to a raw CSS
selector) and checks its computed position. Reads better in a feature than
asserting on a raw "position:sticky;" CSS property string.

**Keyword**: `Then`

**Pattern**

```js
/^the "([^"]*)" should( not)? be sticky$/
```

**Examples**

```gherkin
Then the "site header" should be sticky
And the "site header" should be sticky
Then the "site header" should not be sticky
And the "footer" should not be sticky
Then the "main content" should be sticky
```

## 14. Then the "site header" should have the "scrolled" class within 5 seconds

Assert a named element gains (or loses) a CSS class, with auto-retry.

Resolves a named selector from the registry (falling back to a raw CSS
selector) and polls its class list. Use this instead of the raw-selector
web-first step when the feature should read with a registered name.

**Keyword**: `Then`

**Pattern**

```js
/^the "([^"]*)" should( not)? have the "([^"]*)" class(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the "site header" should have the "scrolled" class within 5 seconds
And the "site header" should have the "scrolled" class
Then the "site header" should not have the "scrolled" class
And the "main content" should have the "is-active" class within 3 seconds
Then the "footer" should not have the "scrolled" class
```
