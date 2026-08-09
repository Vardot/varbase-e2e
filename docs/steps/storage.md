# Storage steps

9 steps, defined in `tests/step-definitions/storage.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given the cookie "session" is set to "abc123"` |
| 2 | `Given the cookie "session" is removed` |
| 3 | `Given all cookies are cleared` |
| 4 | `Given the local storage "user" is set to "Alice"` |
| 5 | `Given the local storage "user" is removed` |
| 6 | `Given local storage is cleared` |
| 7 | `Given the session storage "checkout step" is set to "2"` |
| 8 | `Given the session storage "checkout step" is removed` |
| 9 | `Given session storage is cleared` |

---

## 1. Given the cookie "session" is set to "abc123"

Set a cookie on the current browser context.

**Keyword**: `Given`

**Pattern**

```js
/^(?:the cookie|cookie) "([^"]*)" is set to "([^"]*)"$/
```

**Examples**

```gherkin
Given the cookie "session" is set to "abc123"
Given the cookie "lang" is set to "en"
Given cookie "ab_bucket" is set to "variant-b"
Given the cookie "consent" is set to "accepted"
  And I am on the homepage
Given the cookie "feature_flag" is set to "enabled"
  And I am on "/dashboard"
```

## 2. Given the cookie "session" is removed

Remove a single cookie by name (other cookies preserved).

**Keyword**: `Given`

**Pattern**

```js
/^the cookie "([^"]*)" is removed$/
```

**Examples**

```gherkin
Given the cookie "session" is removed
Given the cookie "consent" is removed
  When I reload the page
  Then I should see "Accept cookies"
Given the cookie "ab_bucket" is removed
Given the cookie "lang" is removed
  And I am on the homepage
Given the cookie "feature_flag" is removed
  When I follow "Pricing"
```

## 3. Given all cookies are cleared

Wipe every cookie on the browser context.

**Keyword**: `Given`

**Pattern**

```js
/^all cookies are cleared$/
```

**Examples**

```gherkin
Given all cookies are cleared
Given all cookies are cleared
  When I am on the homepage
  Then I should see "Sign in"
Given all cookies are cleared
  And I am an anonymous user
Given all cookies are cleared
  And localStorage is cleared
  And sessionStorage is cleared
Given all cookies are cleared
  When I follow "Login"
```

## 4. Given the local storage "user" is set to "Alice"

Set a local storage entry on the current page.

The page must be loaded first (local storage is per-origin). Stored value
is always a string — JSON-encode complex objects manually.

**Keyword**: `Given`

**Pattern**

```js
/^(?:the )?local storage "([^"]*)" is set to "([^"]*)"$/
```

**Examples**

```gherkin
Given the local storage "user" is set to "Alice"
Given I am on the homepage
  And the local storage "theme" is set to "dark"
  When I reload the page
  Then "<body>" should have class "theme-dark"
Given local storage "lang" is set to "fr"
Given the local storage "onboarding_complete" is set to "true"
  And I am on "/dashboard"
  Then I should not see "Welcome tour"
Given the local storage "feature_flag" is set to "enabled"
```

## 5. Given the local storage "user" is removed

Remove a single local storage entry.

**Keyword**: `Given`

**Pattern**

```js
/^(?:the )?local storage "([^"]*)" is removed$/
```

**Examples**

```gherkin
Given the local storage "user" is removed
Given local storage "theme" is removed
  When I reload the page
  Then "<body>" should not have class "theme-dark"
Given the local storage "onboarding_complete" is removed
Given the local storage "cart" is removed
  And I am on "/cart"
  Then I should see "Your cart is empty"
Given the local storage "auth_token" is removed
```

## 6. Given local storage is cleared

Wipe local storage for the current origin.

**Keyword**: `Given`

**Pattern**

```js
/^local storage is cleared$/
```

**Examples**

```gherkin
Given local storage is cleared
Given I am on the homepage
  And local storage is cleared
  When I reload the page
Given local storage is cleared
  And all cookies are cleared
Given local storage is cleared
  And session storage is cleared
Given local storage is cleared
  Then I should see "First-time visitor"
```

## 7. Given the session storage "checkout step" is set to "2"

Set a session storage entry on the current page.

**Keyword**: `Given`

**Pattern**

```js
/^(?:the )?session storage "([^"]*)" is set to "([^"]*)"$/
```

**Examples**

```gherkin
Given the session storage "checkout step" is set to "2"
Given the session storage "temp form" is set to "draft"
Given session storage "tab id" is set to "tab-1"
Given the session storage "wizard progress" is set to "3/5"
  And I am on "/wizard"
Given the session storage "from checkout" is set to "true"
  And I am on "/cart"
```

## 8. Given the session storage "checkout step" is removed

Remove a single session storage entry.

**Keyword**: `Given`

**Pattern**

```js
/^(?:the )?session storage "([^"]*)" is removed$/
```

**Examples**

```gherkin
Given the session storage "checkout step" is removed
Given session storage "temp form" is removed
Given the session storage "wizard progress" is removed
  When I reload the page
  Then I should see "Step 1"
Given the session storage "tab id" is removed
Given the session storage "from checkout" is removed
```

## 9. Given session storage is cleared

Wipe session storage for the current origin.

**Keyword**: `Given`

**Pattern**

```js
/^session storage is cleared$/
```

**Examples**

```gherkin
Given session storage is cleared
Given session storage is cleared
  And local storage is cleared
Given session storage is cleared
  And all cookies are cleared
Given session storage is cleared
  When I reload the page
Given session storage is cleared
  And I am an anonymous user
```
