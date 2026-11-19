# Iframes steps

10 steps, defined in `tests/step-definitions/iframe.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I switch to iframe "iframe.payment"` |
| 2 | `When I switch to iframe with locator "iframe.payment"` |
| 3 | `When I switch to the root document` |
| 4 | `When I switch to the iframe with title "Payment"` |
| 5 | `When I switch to the iframe with name "payment"` |
| 6 | `When I click "Confirm" inside the iframe` |
| 7 | `When I click "submit-btn" by attr inside the iframe` |
| 8 | `When I fill in "card_number" with "4242 4242 4242 4242" inside the iframe` |
| 9 | `Then I should see "Payment received" inside the iframe` |
| 10 | `Then I should not see "Error" inside the iframe` |

---

## 1. When I switch to iframe "iframe.payment"

Switch the active scope to an iframe addressed by CSS selector.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*switch to (the )?iframe "([^"]*)"$/
```

**Examples**

```gherkin
When I switch to iframe "iframe.payment"
When I switch to the iframe "#stripe-frame"
And we switch to iframe "iframe[name=widget]"
When I switch to iframe ".captcha-frame"
When I switch to the iframe "iframe[src*=embed]"
```

## 2. When I switch to iframe with locator "iframe.payment"

Switch the active scope to an iframe by Playwright frame-locator string.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*switch to iframe with locator "([^"]*)"$/
```

**Examples**

```gherkin
When I switch to iframe with locator "iframe.payment"
When I switch to iframe with locator "#stripe-frame"
And I switch to iframe with locator "iframe[name=widget]"
When I switch to iframe with locator ".captcha-frame"
When I switch to iframe with locator "iframe[src*=embed]"
```

## 3. When I switch to the root document

Return the active scope to the top document (clear the iframe scope).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*switch to the root document$/
```

**Examples**

```gherkin
When I switch to the root document
When I switch to iframe ".captcha"
  And I click "I am not a robot" inside the iframe
  And I switch to the root document
And we switch to the root document
When I switch to iframe "#payment"
  And I press "Pay"
  And I switch to the root document
  Then I should see "Payment received"
When I switch to the root document
  And I press "Refresh"
```

## 4. When I switch to the iframe with title "Payment"

Switch the active scope to an iframe by its `title` attribute.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*switch to the iframe with title "([^"]*)"$/
```

**Examples**

```gherkin
When I switch to the iframe with title "Payment"
When I switch to the iframe with title "Captcha"
And we switch to the iframe with title "Widget"
When I switch to the iframe with title "Embedded video"
When I switch to the iframe with title "Stripe checkout"
```

## 5. When I switch to the iframe with name "payment"

Switch the active scope to an iframe by its `name` attribute.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*switch to the iframe with name "([^"]*)"$/
```

**Examples**

```gherkin
When I switch to the iframe with name "payment"
When I switch to the iframe with name "captcha"
And we switch to the iframe with name "widget"
When I switch to the iframe with name "embed"
When I switch to the iframe with name "stripe"
```

## 6. When I click "Confirm" inside the iframe

Click visible text inside the active iframe.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click "([^"]*)" inside the iframe$/
```

**Examples**

```gherkin
When I click "Confirm" inside the iframe
When I click "Cancel" inside the iframe
And we click "Continue" inside the iframe
When I click "OK" inside the iframe
When I click "Close" inside the iframe
```

## 7. When I click "submit-btn" by attr inside the iframe

Click an attribute-addressed element inside the active iframe.

Tries the same attributes as `I click "…" by attr` on the page: id, class,
name, data-testid, data-test-id, data-test, data-cy, aria-label, value,
placeholder and title (a text with a space: value, placeholder,
aria-label and title); a text that starts with #, . or [ is a CSS selector.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click "([^"]*)" by attr inside the iframe$/
```

**Examples**

```gherkin
When I click "submit-btn" by attr inside the iframe
When I click "cancel" by attr inside the iframe
And we click "continue" by attr inside the iframe
When I click "close" by attr inside the iframe
When I click "primary-cta" by attr inside the iframe
```

## 8. When I fill in "card_number" with "4242 4242 4242 4242" inside the iframe

Fill a field inside the active iframe, found by the exact text of its
label, by its placeholder, by its name or by its id, like the fill step of
the page. A field that is not found within 30 seconds, or that is hidden,
disabled or read-only, fails the step with what is wrong.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*fill in "([^"]*)" with "([^"]*)" inside the iframe$/
```

**Examples**

```gherkin
When I fill in "card_number" with "4242 4242 4242 4242" inside the iframe
When I fill in "cvv" with "123" inside the iframe
And we fill in "exp_date" with "12/30" inside the iframe
When I fill in "email" with "alice@example.com" inside the iframe
When I fill in "name" with "Alice" inside the iframe
When I fill in "Coupon code" with "SAVE10" inside the iframe
```

## 9. Then I should see "Payment received" inside the iframe

Assert a text is inside the active iframe. The iframe's text is read the
way `I should see` reads the page: letter case ignored, white space
collapsed, a text inside an element as well as its whole text, the text of
hidden elements included. Waits up to 5 seconds for the text to come.

**Keyword**: `Then`

**Pattern**

```js
/^I should see "([^"]*)" inside the iframe$/
```

**Examples**

```gherkin
Then I should see "Payment received" inside the iframe
Then I should see "Welcome" inside the iframe
And I should see "Confirmed" inside the iframe
Then I should see "Email verified" inside the iframe
Then I should see "Subscribed" inside the iframe
```

## 10. Then I should not see "Error" inside the iframe

Assert a text is NOT inside the active iframe, read as `I should see
"…" inside the iframe` reads it but with its letter case, as `I should not
see` reads the page. Waits up to 5 seconds for the text to go.

**Keyword**: `Then`

**Pattern**

```js
/^I should not see "([^"]*)" inside the iframe$/
```

**Examples**

```gherkin
Then I should not see "Error" inside the iframe
Then I should not see "Declined" inside the iframe
And I should not see "Loading" inside the iframe
Then I should not see "Pending" inside the iframe
Then I should not see "Try again" inside the iframe
```
