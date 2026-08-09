# Modals steps

9 steps, defined in `tests/step-definitions/modal.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then I should see a modal` |
| 2 | `Then I should see a modal with title "Confirm Action"` |
| 3 | `Then I should see a "confirmation-modal" modal` |
| 4 | `Then I should see "Are you sure?" in the modal` |
| 5 | `Then the modal should contain "Welcome modal text"` |
| 6 | `Then the modal should not contain "Goodbye"` |
| 7 | `When I click "Confirm" in the modal` |
| 8 | `When I click on "#close-btn" in the modal` |
| 9 | `When I close the modal` |

---

## 1. Then I should see a modal

Assert that a modal dialog is visible or not visible on the page.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see (a |the )*modal( dialog)*$/
```

**Examples**

```gherkin
Then I should see a modal
Then I should see the modal
Then we should see a modal dialog
Then I should not see a modal
Then I should not see the modal dialog
```

## 2. Then I should see a modal with title "Confirm Action"

Assert that a modal dialog with a given title is visible or not visible.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see (a |the )*modal with title "([^"]*)?"$/
```

**Examples**

```gherkin
Then I should see a modal with title "Confirm Action"
Then I should see the modal with title "Welcome"
Then we should see a modal with title "Welcome Message"
Then I should not see a modal with title "Error"
Then I should not see the modal with title "Validation Error"
```

## 3. Then I should see a "confirmation-modal" modal

Assert that a specific modal by id/class/data-modal is visible or not.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see (a |the )*"([^"]*)?" modal$/
```

**Examples**

```gherkin
Then I should see a "confirmation-modal" modal
Then I should see the "#delete-modal" modal
Then we should see a "settings-modal" modal
Then I should not see a "error-modal" modal
Then I should not see the "#success-modal" modal
```

## 4. Then I should see "Are you sure?" in the modal

Assert that a modal contains or does not contain specific text.

**Keyword**: `Then`

**Pattern**

```js
/^(I |we )*should( not)* see "([^"]*)?" in( the)* modal( dialog)*$/
```

**Examples**

```gherkin
Then I should see "Are you sure?" in the modal
Then I should see "Delete this item" in the modal
Then we should see "Confirmation required" in the modal dialog
Then I should not see "Error occurred" in the modal
```

## 5. Then the modal should contain "Welcome modal text"

Assert that the modal contains the given text (alternate phrasing).

Distinct from "I should see :text in the modal" — checks plain
`innerText`, ignoring nested layout. Use when the text is part of the
modal body rather than a specific element.

**Keyword**: `Then`

**Pattern**

```js
'the modal should contain {string}'
```

**Examples**

```gherkin
Then the modal should contain "Welcome modal text"
Then the modal should contain "Are you sure"
And the modal should contain "Order #1234"
When I press "Show details"
  Then the modal should contain "Address"
Given I am on "/dashboard"
  When I click "Open settings"
  And I wait for the modal to appear
  Then the modal should contain "Preferences"
```

## 6. Then the modal should not contain "Goodbye"

Assert that the modal does NOT contain the given text.

Passes when no modal exists OR when the modal exists but lacks the text.

**Keyword**: `Then`

**Pattern**

```js
'the modal should not contain {string}'
```

**Examples**

```gherkin
Then the modal should not contain "Goodbye"
Then the modal should not contain "Error"
And the modal should not contain "Payment failed"
When I close the modal
  Then the modal should not contain "Welcome"
When I press "Refresh"
  Then the modal should not contain "Loading"
```

## 7. When I click "Confirm" in the modal

Click a button or link inside a modal dialog by its visible text.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click "([^"]*)?"( button)* in( the)* modal( dialog)*$/
```

**Examples**

```gherkin
When I click "Confirm" in the modal
When I click "Cancel" in the modal dialog
When we click "OK" button in the modal
And I click "Close" in the modal
```

## 8. When I click on "#close-btn" in the modal

Click a CSS-selector-addressed element inside the active modal.

Distinct from "click :text in the modal" which uses visible button text.
Use this variant when the target lacks readable text (icon button) or
when text is ambiguous across multiple buttons in the modal.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click on "([^"]*)" in the modal$/
```

**Examples**

```gherkin
When I click on "#close-btn" in the modal
When I click on ".confirm-delete" in the modal
And I click on "[data-testid=accept]" in the modal
When I click on "button[aria-label=Close]" in the modal
When I press "Open settings"
  And I wait for the modal to appear
  Then I click on "#tab-notifications" in the modal
```

## 9. When I close the modal

Close or dismiss a modal dialog (uses close button, or Escape fallback).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*(close|dismiss)( the)* modal( dialog)*$/
```

**Examples**

```gherkin
When I close the modal
When I dismiss the modal dialog
When we close the modal
And I dismiss the modal
```
