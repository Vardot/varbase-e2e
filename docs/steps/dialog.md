# Browser dialogs steps

8 steps, defined in `tests/step-definitions/dialog.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given I will accept the next dialog` |
| 2 | `Given I will dismiss the next dialog` |
| 3 | `Given I will accept the next dialog with "alice@example.com"` |
| 4 | `Then the last dialog message should be "Are you sure?"` |
| 5 | `Then the last dialog message should contain "Are you sure"` |
| 6 | `Then the last dialog type should be "confirm"` |
| 7 | `Given I accept all confirmation dialogs` |
| 8 | `Given I do not accept any confirmation dialogs` |

---

## 1. Given I will accept the next dialog

Auto-accept the next native browser dialog (alert / confirm / prompt).

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*will accept the next dialog$/
```

**Examples**

```gherkin
Given I will accept the next dialog
  When I click "Delete"
Given we will accept the next dialog
  When I press "Confirm"
Given I will accept the next dialog
  When I click "Save changes"
  Then I should see "Saved"
Given I will accept the next dialog
  When I follow "Leave page"
Given I will accept the next dialog
  When I press "Reset password"
  Then the last dialog type should be "confirm"
```

## 2. Given I will dismiss the next dialog

Auto-dismiss the next native browser dialog.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*will dismiss the next dialog$/
```

**Examples**

```gherkin
Given I will dismiss the next dialog
  When I click "Leave page"
Given we will dismiss the next dialog
  When I press "Cancel reset"
Given I will dismiss the next dialog
  When I follow "Other site"
  Then I should be on the homepage
Given I will dismiss the next dialog
  When I press "Delete"
  Then "<.row>" should still be visible
Given I will dismiss the next dialog
  When I close the tab
```

## 3. Given I will accept the next dialog with "alice@example.com"

Auto-accept the next prompt with the supplied text input.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*will accept the next dialog with "([^"]*)"$/
```

**Examples**

```gherkin
Given I will accept the next dialog with "alice@example.com"
  When I press "Reset password"
Given I will accept the next dialog with "Yes"
  When I click "Continue"
Given we will accept the next dialog with "Bug report"
  When I press "Open feedback prompt"
Given I will accept the next dialog with "12345"
  When I follow "Set order ID"
Given I will accept the next dialog with "https://example.com"
  When I press "Add link"
```

## 4. Then the last dialog message should be "Are you sure?"

Assert the most recently captured dialog message equals an expected value.

**Keyword**: `Then`

**Pattern**

```js
/^the last dialog message should be "([^"]*)"$/
```

**Examples**

```gherkin
Then the last dialog message should be "Are you sure?"
Then the last dialog message should be "Delete this item?"
And the last dialog message should be "Leave site?"
Then the last dialog message should be "Save changes?"
When I press "Reset"
  Then the last dialog message should be "Reset all settings?"
```

## 5. Then the last dialog message should contain "Are you sure"

Assert the most recently captured dialog message contains an expected substring.

**Keyword**: `Then`

**Pattern**

```js
/^the last dialog message should contain "([^"]*)"$/
```

**Examples**

```gherkin
Then the last dialog message should contain "Are you sure"
Then the last dialog message should contain "delete"
And the last dialog message should contain "leave"
Then the last dialog message should contain "save"
When I click "Cancel order"
  Then the last dialog message should contain "cancel"
```

## 6. Then the last dialog type should be "confirm"

Assert the most recently captured dialog type matches one of `alert`,
`confirm`, `prompt`, or `beforeunload`.

**Keyword**: `Then`

**Pattern**

```js
/^the last dialog type should be "([^"]*)"$/
```

**Examples**

```gherkin
Then the last dialog type should be "confirm"
Then the last dialog type should be "alert"
And the last dialog type should be "prompt"
Then the last dialog type should be "beforeunload"
When I press "Reset password"
  Then the last dialog type should be "prompt"
```

## 7. Given I accept all confirmation dialogs

Auto-accept EVERY native browser dialog raised in this scenario.

Persistent variant of "I will accept the next dialog" — handler stays
attached for the rest of the scenario.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*accept all confirmation dialogs$/
```

**Examples**

```gherkin
Given I accept all confirmation dialogs
Given we accept all confirmation dialogs
  When I click "Delete all"
And I accept all confirmation dialogs
Given I accept all confirmation dialogs
  When I press "Reset settings"
Given I accept all confirmation dialogs
  When I follow "Discard changes"
```

## 8. Given I do not accept any confirmation dialogs

Auto-dismiss EVERY native browser dialog raised in this scenario.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*do not accept any confirmation dialogs$/
```

**Examples**

```gherkin
Given I do not accept any confirmation dialogs
Given we do not accept any confirmation dialogs
  When I click "Delete"
And I do not accept any confirmation dialogs
Given I do not accept any confirmation dialogs
  When I press "Cancel reset"
Given I do not accept any confirmation dialogs
  When I follow "Leave page"
```
