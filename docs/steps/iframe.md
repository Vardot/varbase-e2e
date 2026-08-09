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

Tries id, class, name, and data-testid in that order.

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

Fill a field inside the active iframe by `[name]` or id.

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
```

## 9. Then I should see "Payment received" inside the iframe

Assert visible text exists inside the active iframe.

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

Assert visible text does NOT exist inside the active iframe.

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
