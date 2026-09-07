# Web-first matchers steps

12 steps, defined in `tests/step-definitions/web-first.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then "#dashboard" should be visible` |
| 2 | `Then "#loading-spinner" should not be visible` |
| 3 | `Then "#hero" should be in the viewport` |
| 4 | `Then "#footer" should not be in the viewport` |
| 5 | `Then ".product-card" should have a count of 12` |
| 6 | `Then "h1" should have text "Welcome"` |
| 7 | `Then "h1" should contain text "Welcome"` |
| 8 | `Then "#email" should have value "alice@example.com"` |
| 9 | `Then "#tab-1" should have attribute "aria-selected" with value "true"` |
| 10 | `Then "#tab-1" should have class "is-active"` |
| 11 | `When I click the "Sign in" button` |
| 12 | `Then the "Save changes" button should be visible` |

---

## 1. Then "#dashboard" should be visible

Auto-retrying state assertion. Polls the live page until the matcher passes
or the budget elapses. Default budget 5 s.

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should be (visible|hidden|attached|focused|enabled|disabled|editable)(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "#dashboard" should be visible
Then ".success-banner" should be visible within 10 seconds
And "[data-testid=signup-cta]" should be focused
Then "button.submit" should be enabled
Then "input#email" should be editable
```

## 2. Then "#loading-spinner" should not be visible

Auto-retrying negated state assertion.

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should not be (visible|hidden|attached|focused|enabled|disabled|editable)(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "#loading-spinner" should not be visible
Then ".error" should not be visible within 5 seconds
And "button.submit" should not be disabled
Then "input#email" should not be editable
Then "[data-testid=password]" should not be focused
```

## 3. Then "#hero" should be in the viewport

Assert an element's bounding box overlaps the visible viewport rectangle.

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should be in the viewport(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "#hero" should be in the viewport
Then "[data-testid=cta]" should be in the viewport within 3 seconds
When I scroll to the element "#footer"
  Then "#footer" should be in the viewport
Then "h1" should be in the viewport
Then ".banner" should be in the viewport
```

## 4. Then "#footer" should not be in the viewport

Assert an element is OUTSIDE the visible viewport rectangle.

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should not be in the viewport(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "#footer" should not be in the viewport
Then "[data-testid=hidden]" should not be in the viewport within 3 seconds
And ".off-screen" should not be in the viewport
Then "section.below-fold" should not be in the viewport
When I scroll to the top
  Then "#footer" should not be in the viewport
```

## 5. Then ".product-card" should have a count of 12

Assert exactly N elements match a selector (auto-retry).

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should have a count of (\d+)(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then ".product-card" should have a count of 12
Then ".error" should have a count of 0 within 5 seconds
And "tr" should have a count of 21
Then "[data-testid=item]" should have a count of 5
Then ".feed-item" should have a count of 25 within 10 seconds
```

## 6. Then "h1" should have text "Welcome"

Assert an element's textContent equals an expected string (trimmed).

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should have text "([^"]*)"(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "h1" should have text "Welcome"
Then ".badge" should have text "12" within 3 seconds
And ".total" should have text "$99.00"
Then "[data-testid=subtitle]" should have text "Premium"
Then ".alert" should have text "Saved"
```

## 7. Then "h1" should contain text "Welcome"

Assert an element's textContent contains an expected substring.

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should contain text "([^"]*)"(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "h1" should contain text "Welcome"
Then ".badge" should contain text "unread" within 3 seconds
And ".total" should contain text "$99"
Then "[data-testid=subtitle]" should contain text "Premium"
Then ".alert" should contain text "Saved"
```

## 8. Then "#email" should have value "alice@example.com"

Assert an input's `value` property equals an expected string.

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should have value "([^"]*)"(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "#email" should have value "alice@example.com"
Then "input[name=q]" should have value "laptops"
And "[data-testid=phone]" should have value "0790000000"
Then "#bio" should have value "" within 3 seconds
Then "select#country" should have value "JO"
```

## 9. Then "#tab-1" should have attribute "aria-selected" with value "true"

Assert an element's attribute equals an expected value.

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should have attribute "([^"]*)" with value "([^"]*)"(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "#tab-1" should have attribute "aria-selected" with value "true"
Then "[data-testid=cta]" should have attribute "data-state" with value "open"
And "img.logo" should have attribute "alt" with value "Vardot"
Then "a.signup" should have attribute "href" with value "/signup"
Then "input#email" should have attribute "type" with value "email"
```

## 10. Then "#tab-1" should have class "is-active"

Assert an element's `class` attribute contains a class token.

**Keyword**: `Then`

**Pattern**

```js
/^"([^"]*)" should have class "([^"]*)"(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then "#tab-1" should have class "is-active"
Then ".modal" should have class "show" within 3 seconds
And ".dropdown" should have class "open"
Then "tr.row-1" should have class "selected"
Then "[data-testid=card]" should have class "highlighted"
```

## 11. When I click the "Sign in" button

Click an element by its accessible role + name (Playwright `getByRole`).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click the "([^"]*)" (button|link|tab|menuitem|checkbox|radio|option)$/
```

**Examples**

```gherkin
When I click the "Sign in" button
When I click the "Profile" link
And we click the "Notifications" tab
When I click the "Subscribe" checkbox
When I click the "Premium" radio
```

## 12. Then the "Save changes" button should be visible

Assert a role-addressed element is visible (auto-retry).

**Keyword**: `Then`

**Pattern**

```js
/^the "([^"]*)" (button|link|tab|menuitem|checkbox|radio|option) should be visible(?: within (\d+) seconds?)?$/
```

**Examples**

```gherkin
Then the "Save changes" button should be visible
Then the "Profile" link should be visible within 5 seconds
And the "Privacy" tab should be visible
Then the "I agree" checkbox should be visible
Then the "Premium" radio should be visible
```
