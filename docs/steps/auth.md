# Auth state steps

3 steps, defined in `tests/step-definitions/auth.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I save the auth state to "tests/auth/admin.json"` |
| 2 | `Given I restore the auth state from "tests/auth/admin.json"` |
| 3 | `Given I clear the auth state` |

---

## 1. When I save the auth state to "tests/auth/admin.json"

Save the current browser context's cookies + localStorage to a JSON file.

Run this AFTER a successful interactive login. The destination file is
created (with parent directories) if it does not exist; existing files are
overwritten.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*save the auth state to "([^"]*)"$/
```

**Examples**

```gherkin
When I save the auth state to "tests/auth/admin.json"
Given I am on "/login"
  When I fill in "admin@example.com" for "Email"
  And I fill in "secret" for "Password"
  And I press "Sign in"
  And I wait until the URL contains "/dashboard"
  Then I save the auth state to "tests/auth/admin.json"
When I save the auth state to "tests/auth/editor.json"
When we save the auth state to "tests/auth/customer.json"
When I save the auth state to "/tmp/admin-state.json"
```

## 2. Given I restore the auth state from "tests/auth/admin.json"

Restore cookies + localStorage from a previously saved JSON file.

The current browser context is closed and a fresh one is opened with the
saved state. The varbase-e2e init script (AJAX/timer/mutation tracker) is
re-installed automatically so smart waits keep working. Subsequent steps
proceed against the restored, authenticated session.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*restore the auth state from "([^"]*)"$/
```

**Examples**

```gherkin
Given I restore the auth state from "tests/auth/admin.json"
Given I restore the auth state from "tests/auth/editor.json"
  And I am on "/admin/products"
Given I restore the auth state from "tests/auth/customer.json"
  And I am on "/account/orders"
Given we restore the auth state from "tests/auth/admin.json"
Given I restore the auth state from "tests/auth/admin.json"
  And I am on "/dashboard"
  Then "<#user-list>" should have a count of 5 within 5 seconds
```

## 3. Given I clear the auth state

Clear cookies and localStorage / sessionStorage for the current context.

Use to anonymize a session mid-scenario, e.g. after asserting a logged-in
action you may want to verify the same path returns 302 / login form for
an anonymous visitor.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*clear the auth state$/
```

**Examples**

```gherkin
Given I clear the auth state
Given I restore the auth state from "tests/auth/admin.json"
  And I am on "/dashboard"
  Given I clear the auth state
  When I am on "/dashboard"
  Then I should see "Sign in"
Given we clear the auth state
When I press "Logout"
  And I clear the auth state
Given I clear the auth state
  When I am on the homepage
  Then I should see "Login"
```
