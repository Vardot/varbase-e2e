# Drupal core steps

34 steps, defined in `tests/step-definitions/drupal-core.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `And wait` |
| 2 | `Then the page should load in less than 3 seconds` |
| 3 | `When I submit by id "edit-submit"` |
| 4 | `When I open the "Edit" link in the "Test Unpublished Page" row` |
| 5 | `When I flush all caches` |
| 6 | `When I logout` |
| 7 | `Given I am not logged in` |
| 8 | `When I go to "https://www.drupal.org" website` |
| 9 | `When I check the box "Editor"` |
| 10 | `When I uncheck the box "Editor"` |
| 11 | `When I select the "Male" radio button` |
| 12 | `Then I should see the "Edit" operation for the "Homepage" entity` |
| 13 | `Then I should see the "copyright" element in the "footer"` |
| 14 | `Then I should see "Home" in the "ol" element with the "class" attribute set to "breadcrumb"` |
| 15 | `When I click "Next" in the "button" element with the "class" attribute set to "shepherd-button"` |
| 16 | `Then I should see "Location property" value in the "edit-name" input element` |
| 17 | `When I click "Homepage" value in the "edit-items-2-target-id" input element` |
| 18 | `When I keypress "enter" in "#body" field` |
| 19 | `And I expand the field "edit-menu"` |
| 20 | `Then "Home" should be in the breadcrumb` |
| 21 | `When I open the top bar page actions menu` |
| 22 | `When I press the confirm button in modal` |
| 23 | `When I click the delete button` |
| 24 | `When I wait` |
| 25 | `When I wait for 5s` |
| 26 | `When I wait for ajax to finish` |
| 27 | `When I wait max of 30s for the page to be ready and loaded` |
| 28 | `When I select the radio button "Published"` |
| 29 | `Then I should see the "Edit" in the "Sample title" row` |
| 30 | `Then the checkbox labeled "Editor" should be checked` |
| 31 | `Then the Drupal checkbox "edit-enable" is checked` |
| 32 | `Then I should see image with the "Flag Earth all earth in space" title text` |
| 33 | `And I should see image with the "Embed Flag Earth in space" alt text` |
| 34 | `When I check the first "Test hero slider #1"` |

---

## 1. And wait

Smart wait for the current page to reach a quiet edge — the same
`smartSettle` used by Varbase E2E navigation steps (DOM ready + network
idle + no pending AJAX/timers). Replaces the bare "And wait" used
throughout the suite after a navigation or action.

**Keyword**: `When`

**Pattern**

```js
/^wait$/
```

**Examples**

```gherkin
And wait
When wait
Then wait
Given wait
But wait
```

## 2. Then the page should load in less than 3 seconds

Performance budget — assert the current page's full load time (Navigation
Timing `duration` = navigationStart → loadEventEnd) is under a budget.
No equivalent ships in Varbase E2E.

**Keyword**: `Then`

**Pattern**

```js
/^the page should (?:load|respond) in less than (\d+) (ms|milliseconds?|seconds?)$/
```

**Examples**

```gherkin
Then the page should load in less than 3 seconds
And the page should load in less than 5 seconds
Then the page should respond in less than 800 ms
Then the page should load in less than 1500 milliseconds
And the page should respond in less than 2 seconds
```

## 3. When I submit by id "edit-submit"

Submit a form by triggering the in-page native click on a button id.
Gin moves the primary submit into a sticky action bar that overlays the
original button, so a Playwright click on it times out on actionability.
Dispatching the click in-page bypasses the overlay.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*submit by id "([^"]*)"$/
```

**Examples**

```gherkin
When I submit by id "edit-submit"
And I submit by id "edit-submit"
When we submit by id "edit-submit"
And we submit by id "edit-submit"
Given I submit by id "edit-submit"
```

## 4. When I open the "Edit" link in the "Test Unpublished Page" row

Open a row action link (e.g. "Edit") by navigating to its href rather than
clicking it. A Playwright click waits for the heavy node-edit page (CKEditor
5 + AI widgets) `load` event which can exceed the step timeout; reading the
href and `goto` with domcontentloaded avoids that hang.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*open the "([^"]*)" link in the "([^"]*)" row$/
```

**Examples**

```gherkin
When I open the "Edit" link in the "Test Unpublished Page" row
And I open the "Delete" link in the "Draft article" row
When we open the "Edit" link in the "Homepage" row
And we open the "Translate" link in the "About" row
Given I open the "Edit" link in the "News" row
```

## 5. When I flush all caches

Flush all caches from the back end as an administrator.

Drives the Drupal core Performance page and clicks its "Clear all caches"
button, mirroring what an administrator does after changing configuration so
a following anonymous request renders fresh from the real homepage. Uses the
core form only (no contrib Tools page), targeting the core submit selector.

The click is dispatched in-page: Gin moves the primary submit into a sticky
action bar that overlays the original button, so a Playwright click can be
intercepted by the overlay and silently not submit (the cache is then never
cleared). A native in-page click submits the form regardless.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*flush all caches$/
```

**Examples**

```gherkin
When I flush all caches
And I flush all caches
When we flush all caches
Given I flush all caches
And we flush all caches
```

## 6. When I logout

Log out of the current session.

Ports VarbaseContext::iLogout (`@When /^I logout$/`). Varbase E2E has no
logout step. Visits Drupal's /user/logout confirm route; on Drupal 11 the
logout form needs a confirm submit, so it submits the form if present.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*logout$/
```

**Examples**

```gherkin
When I logout
And I logout
When we logout
Given I logout
And we logout
```

## 7. Given I am not logged in

Assert the current visitor is not authenticated (anonymous).

Ports the Behat/DrupalExtension `Given I am not logged in`. Varbase E2E ships
`Given I am an anonymous user` (clears storage + reloads); "not logged in"
additionally verifies there is no active Drupal session by visiting /user
and confirming it is the login form, not the user profile.

**Keyword**: `Given`

**Pattern**

```js
/^(?:I am |we are )?not logged in$/
```

**Examples**

```gherkin
Given I am not logged in
And I am not logged in
Given we are not logged in
But I am not logged in
Given I am not logged in
```

## 8. When I go to "https://www.drupal.org" website

Navigate directly to an external website (absolute URL).

Ports VarbaseContext::iGoToWebsite (`@When /^I go to "..." website$/`). The
Varbase E2E `I go to "..."` step joins the path onto launchUrl; this variant
visits the given absolute URL verbatim (used for external OAuth / social
providers, e.g. LinkedIn, Facebook).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*go to "([^"]*)" website$/
```

**Examples**

```gherkin
When I go to "https://www.drupal.org" website
And I go to "https://www.linkedin.com" website
When we go to "https://accounts.google.com" website
Given I go to "https://www.facebook.com" website
And I go to "https://x.com" website
```

## 9. When I check the box "Editor"

Check a checkbox by its visible label (or id / name / css selector).

Ports the Varbase suite's `I check the box "..."`. Varbase E2E core only
offers `I check "..."`; the profile features use "check the box", so this
matches that phrasing. Resolves the control by label text first (Drupal
renders role permission / field labels), then falls back to id / name / css.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*check the box "([^"]*)"$/
```

**Examples**

```gherkin
When I check the box "Editor"
And I check the box "Site Admin"
When we check the box "Content Admin"
And I check the box "Super Admin"
Given I check the box "SEO Admin"
```

## 10. When I uncheck the box "Editor"

Uncheck a checkbox by its visible label (or id / name / css selector).

Ports the Varbase suite's `I uncheck the box "..."`.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*uncheck the box "([^"]*)"$/
```

**Examples**

```gherkin
When I uncheck the box "Editor"
And I uncheck the box "Subscribe"
When we uncheck the box "Site Admin"
And I uncheck the box "Enable"
Given I uncheck the box "Published"
```

## 11. When I select the "Male" radio button

Select a radio button by its visible label text.

Ports VarbaseContext::iSelectTheRadioButton (`@When /^I select the "..."
radio button$/`): finds the <label> whose text matches, follows its `for`
attribute to the input, and selects it.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the "([^"]*)" radio button$/
```

**Examples**

```gherkin
When I select the "Male" radio button
And I select the "Female" radio button
When we select the "Yes" radio button
And I select the "Boxed" radio button
Given I select the "Published" radio button
```

## 12. Then I should see the "Edit" operation for the "Homepage" entity

Assert an entity row exposes (or does not expose) an operation link.

Ports VarbaseContext::iShouldSeetheOperationForTheEntity /
iShouldNotSeetheOperationForTheEntity. Finds the table row containing the
entity text and checks its operations cell for the named link. The trailing
noun (entity/content/media/file/term/user) is cosmetic.

**Keyword**: `Then`

**Pattern**

```js
/^(?:I |we )*(?:should )?(not )?see (?:the )?"([^"]*)" operation for the "([^"]*)"(?: (?:entity|content|media|file|term|user))?$/
```

**Examples**

```gherkin
Then I should see the "Edit" operation for the "Homepage" entity
And I should not see the "Delete" operation for the "Blog" content
Then should see "Clone" operation for the "Homepage" entity
And I should not see the "View API" operation for the "About" media
Then I should see the "Translate" operation for the "News" term
```

## 13. Then I should see the "copyright" element in the "footer"

Assert a named (or css) element exists / does not exist within another named
(or css) container.

Ports the suite's `I should see the "X" element in the "Y"` /
`I should not see the "X" element in the "Y"`. Resolves both the child and
the container against the selector registry (this.__selectorsCss), falling
back to raw CSS.

**Keyword**: `Then`

**Pattern**

```js
/^(?:I |we )*should( not)? see the "([^"]*)" element in the "([^"]*)"$/
```

**Examples**

```gherkin
Then I should see the "copyright" element in the "footer"
And I should not see the "edit link" element in the "sidebar"
Then should see the "logo" element in the "header bar"
And I should see the "search input" element in the "main nav"
Then I should not see the "banner" element in the "main content"
```

## 14. Then I should see "Home" in the "ol" element with the "class" attribute set to "breadcrumb"

Assert text is (or is not) present in an element matched by tag + attribute.

Ports VarbaseContext::iShouldSeeTextInTheHtmlTagElement /
iShouldNotSeeTextInTheHtmlTagElement.

**Keyword**: `Then`

**Pattern**

```js
/^(?:I |we )*should( not)? see "([^"]*)" in the "([^"]*)" element with the "([^"]*)" attribute set to "([^"]*)"$/
```

**Examples**

```gherkin
Then I should see "Home" in the "ol" element with the "class" attribute set to "breadcrumb"
And I should not see "Error" in the "div" element with the "id" attribute set to "right-panel"
Then I should see "Draft" in the "span" element with the "class" attribute set to "state"
And I should see "Published" in the "td" element with the "class" attribute set to "status"
Then I should not see "Trash" in the "ul" element with the "class" attribute set to "menu"
```

## 15. When I click "Next" in the "button" element with the "class" attribute set to "shepherd-button"

Click the element of a given HTML tag whose <attr> attribute contains <value>
and whose visible text matches <text>. Covers the Shepherd tour "Next"
button (tag=button, class "... shepherd-button"), the moderation-sidebar
Translate link (tag=a, class "moderation-sidebar-link ...") and the Linkit
autocomplete suggestion (tag=ul, class "ui-autocomplete").

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*click "([^"]*)" in the "([^"]*)" element with the "([^"]*)" attribute set to "([^"]*)"$/
```

**Examples**

```gherkin
When I click "Next" in the "button" element with the "class" attribute set to "shepherd-button"
When I click "Translate" in the "a" element with the "class" attribute set to "moderation-sidebar-link button use-ajax"
```

## 16. Then I should see "Location property" value in the "edit-name" input element

Assert an input element (matched by data-drupal-selector) has a value.

Ports VarbaseContext::iShouldSeeValueInTheInputElement.

**Keyword**: `Then`

**Pattern**

```js
/^(?:I |we )*should see "([^"]*)" value in the "([^"]*)" input element$/
```

**Examples**

```gherkin
Then I should see "Location property" value in the "edit-name" input element
And I should see "42" value in the "edit-items-2-target-id" input element
Then I should see "Homepage" value in the "edit-title-0-value" input element
And I should see "en" value in the "edit-langcode-0-value" input element
Then I should see "Draft" value in the "edit-moderation-state-0-state" input element
```

## 17. When I click "Homepage" value in the "edit-items-2-target-id" input element

Click an input element (matched by data-drupal-selector) whose value matches.

Ports VarbaseContext::iClickValueInTheInputElement.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*click "([^"]*)" value in the "([^"]*)" input element$/
```

**Examples**

```gherkin
When I click "Homepage" value in the "edit-items-2-target-id" input element
And I click "Location property" value in the "edit-name" input element
When we click "News" value in the "edit-title" input element
And I click "Blog" value in the "edit-target-id" input element
When I click "About" value in the "edit-name" input element
```

## 18. When I keypress "enter" in "#body" field

Press a keyboard key while focused in a field (label / name / id / css).

Ports VarbaseContext::iPressKeyboardKeyInField (`@When I keypress :char in
:field field`). Maps the legacy key words to Playwright key identifiers.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*keypress "([^"]*)" in "([^"]*)" field$/
```

**Examples**

```gherkin
When I keypress "enter" in "#body" field
And I keypress "tab" in "#first-name" field
When I keypress " " in "#search" field
And I keypress "escape" in "Title" field
When we keypress "down" in "#country" field
```

## 19. And I expand the field "edit-menu"

Open a collapsed <details>/fieldset by its element id so its inner fields
become interactable (e.g. the node form "Menu settings", the entityqueue
form widget).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*expand the field "([^"]*)"$/
```

**Examples**

```gherkin
And I expand the field "edit-menu"
And I expand the field "edit-entityqueue-form-widget"
```

## 20. Then "Home" should be in the breadcrumb

Assert text appears in the breadcrumb trail.

Ports VarbaseContext::shouldBeInTheBreadcrumb (`@Then :text should be in the
breadcrumb`).

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should be in the breadcrumb$/
```

**Examples**

```gherkin
Then "Home" should be in the breadcrumb
And "Blog" should be in the breadcrumb
Then "About Varbase" should be in the breadcrumb
And "News" should be in the breadcrumb
Then "Contact Us" should be in the breadcrumb
```

## 21. When I open the top bar page actions menu

Open the top-bar page actions (the "more actions" dots) in the Gin/Navigation
top bar.

Ports VarbaseContext::iOpenTopBarPageActions.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*(?:open (?:the )?top bar page actions(?: menu)?|hit (?:the )?more actions(?: button)?)$/
```

**Examples**

```gherkin
When I open the top bar page actions menu
And I open top bar page actions
When we open the top bar page actions
And I hit the more actions button
When I hit more actions
```

## 22. When I press the confirm button in modal

Press the confirm (Restore / OK / primary) button in a jQuery UI modal.

Ports VarbaseContext::iPressTheConfirmButton (used by trash restore).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*press the confirm button in modal$/
```

**Examples**

```gherkin
When I press the confirm button in modal
And I press the confirm button in modal
When we press the confirm button in modal
Given I press the confirm button in modal
And we press the confirm button in modal
```

## 23. When I click the delete button

Click the first "Delete" button on the page (action link or submit).

Ports VarbaseContext::iClickTheDeleteButton.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*click the delete button$/
```

**Examples**

```gherkin
When I click the delete button
And I click the delete button
When we click the delete button
Given I click the delete button
And we click the delete button
```

## 24. When I wait

Settle the page with the configured wait budget — DOM ready, network idle, no pending AJAX or timers.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )+wait$/
```

**Examples**

```gherkin
When I wait
And I wait
When we wait
And we wait
Given I wait
```

## 25. When I wait for 5s

Settle the page with an explicit budget in seconds instead of the configured default.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*wait for (\d+)s$/
```

**Examples**

```gherkin
When I wait for 5s
And I wait for 2s
When we wait for 10s
And wait for 1s
Given I wait for 3s
```

## 26. When I wait for ajax to finish

Wait until every in-flight AJAX request has settled and the DOM has stopped mutating.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*wait for ajax to finish$/
```

**Examples**

```gherkin
When I wait for ajax to finish
And I wait for ajax to finish
When we wait for ajax to finish
And wait for ajax to finish
Given I wait for ajax to finish
```

## 27. When I wait max of 30s for the page to be ready and loaded

Wait up to the given number of seconds for the page to be ready and fully loaded.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*wait max of (\d+)s for the page to be ready and loaded$/
```

**Examples**

```gherkin
When I wait max of 30s for the page to be ready and loaded
And I wait max of 10s for the page to be ready and loaded
When we wait max of 60s for the page to be ready and loaded
And wait max of 15s for the page to be ready and loaded
Given I wait max of 45s for the page to be ready and loaded
```

## 28. When I select the radio button "Published"

Select a radio button by its visible label text (alternate phrasing).

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*select the radio button "([^"]*)"$/
```

**Examples**

```gherkin
When I select the radio button "Published"
And I select the radio button "Draft"
When we select the radio button "Boxed"
And I select the radio button "Edge to Edge"
Given I select the radio button "Yes"
```

## 29. Then I should see the "Edit" in the "Sample title" row

Assert an operation link or text is present in the administration listing row whose text matches.

**Keyword**: `Then`

**Pattern**

```js
/^(?:I |we )*should( not)? see the "([^"]*)" in(?: the)? "([^"]*)" row$/
```

**Examples**

```gherkin
Then I should see the "Edit" in the "Sample title" row
And I should see the "Delete" in "Sample title" row
Then I should not see the "Delete" in the "Locked page" row
And we should see the "Published" in the "Sample title" row
Then I should not see the "Translate" in "Sample title" row
```

## 30. Then the checkbox labeled "Editor" should be checked

Assert a checkbox is checked / unchecked, found by its visible label text
(alternate phrasing).

**Keyword**: `Then`

**Pattern**

```js
/^the checkbox labeled "([^"]*)" should be (checked|unchecked)$/
```

**Examples**

```gherkin
Then the checkbox labeled "Editor" should be checked
And the checkbox labeled "Site Admin" should be unchecked
Then the checkbox labeled "Published" should be checked
And the checkbox labeled "Promoted to front page" should be unchecked
Then the checkbox labeled "Sticky at top of lists" should be unchecked
```

## 31. Then the Drupal checkbox "edit-enable" is checked

Assert a checkbox is checked / unchecked, resolved by a machine handle
(DOM id, data-drupal-selector, or name attribute).

**Keyword**: `Then`

**Pattern**

```js
/^the Drupal checkbox "([^"]*)" is (checked|unchecked)$/
```

**Examples**

```gherkin
Then the Drupal checkbox "edit-enable" is checked
And the Drupal checkbox "entity_json" is checked
Then the Drupal checkbox "edit-status-value" is checked
And the Drupal checkbox "edit-promote-value" is unchecked
Then the Drupal checkbox "edit-sticky-value" is unchecked
```

## 32. Then I should see image with the "Flag Earth all earth in space" title text

Assert an <img> whose title attribute contains the given text exists.

**Keyword**: `Then`

**Pattern**

```js
/^(?:I |we )*should see image with the "([^"]*)" title text$/
```

**Examples**

```gherkin
Then I should see image with the "Flag Earth all earth in space" title text
```

## 33. And I should see image with the "Embed Flag Earth in space" alt text

Assert an <img> whose alt attribute contains the given text exists.

**Keyword**: `Then`

**Pattern**

```js
/^(?:I |we )*should see image with the "([^"]*)" alt text$/
```

**Examples**

```gherkin
And I should see image with the "Embed Flag Earth in space" alt text
```

## 34. When I check the first "Test hero slider #1"

Check the first checkbox matching a label, tolerating duplicates. A retried
scenario (cucumber `retry: 1`) can leave two identically titled nodes, so
two checkboxes carry the same label (e.g. the entityqueue widget) and the
built-in "I check" strict-fails; the duplicates are equivalent - pick the
first.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )*check the first "([^"]*)"$/
```

**Examples**

```gherkin
When I check the first "Test hero slider #1"
```
