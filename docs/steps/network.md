# Network steps

10 steps, defined in `tests/step-definitions/network.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given the URL "**\/api/users" returns the JSON:` |
| 2 | `Given the URL "**\/api/login" returns status 401 with body "Unauthorized"` |
| 3 | `Given the URL "**\/analytics.js" is blocked` |
| 4 | `Given the URL "**\/api/**" is delayed by 1500 ms` |
| 5 | `Given the network is offline` |
| 6 | `Given the network is online` |
| 7 | `Given I start recording network requests` |
| 8 | `Then a request to "**\/api/users" should have been made` |
| 9 | `Then a GET request to "**\/api/users" should have been made` |
| 10 | `Then no request to "**\/tracking" should have been made` |

---

## 1. Given the URL "**\/api/users" returns the JSON:

Stub a URL pattern with a JSON response body.

Body is sent verbatim with `Content-Type: application/json` and HTTP 200.

**Keyword**: `Given`

**Pattern**

```js
/^the URL "([^"]*)" returns the JSON:$/
```

**Examples**

```gherkin
Given the URL "**\/api/users" returns the JSON:
  """
  {"users": [{"id": 1, "name": "Alice"}]}
  """
Given the URL "**\/api/me" returns the JSON:
  """
  {"id": 1, "name": "Alice", "role": "admin"}
  """
Given the URL "**\/api/products?*" returns the JSON:
  """
  {"items": [], "total": 0}
  """
Given the URL "https://api.stripe.com/v1/charges" returns the JSON:
  """
  {"id": "ch_test", "status": "succeeded"}
  """
Given the URL "**\/api/feature-flags" returns the JSON:
  """
  {"darkMode": true, "betaUI": false}
  """
```

## 2. Given the URL "**\/api/login" returns status 401 with body "Unauthorized"

Stub a URL pattern with a status code and plain-text body.

**Keyword**: `Given`

**Pattern**

```js
/^the URL "([^"]*)" returns status (\d+)(?: with body "([^"]*)")?$/
```

**Examples**

```gherkin
Given the URL "**\/api/login" returns status 401 with body "Unauthorized"
Given the URL "**\/api/health" returns status 503
Given the URL "**\/api/users" returns status 500 with body "Database down"
Given the URL "**\/api/orders/*" returns status 404
Given the URL "**\/api/admin/*" returns status 403 with body "Forbidden"
```

## 3. Given the URL "**\/analytics.js" is blocked

Block a URL pattern entirely (network failure simulation).

**Keyword**: `Given`

**Pattern**

```js
/^the URL "([^"]*)" is blocked$/
```

**Examples**

```gherkin
Given the URL "**\/analytics.js" is blocked
Given the URL "**\/google-analytics.com/**" is blocked
Given the URL "**\/sentry.io/**" is blocked
Given the URL "*.gif" is blocked
Given the URL "**\/api/tracking" is blocked
```

## 4. Given the URL "**\/api/**" is delayed by 1500 ms

Delay matching requests by N milliseconds (slow-network simulation).

The request still completes against the real upstream — only its arrival
time at the page is shifted. Useful for verifying loading-state UI.

**Keyword**: `Given`

**Pattern**

```js
/^the URL "([^"]*)" is delayed by (\d+) ?ms$/
```

**Examples**

```gherkin
Given the URL "**\/api/**" is delayed by 1500 ms
Given the URL "**\/api/users" is delayed by 3000 ms
Given the URL "**\/api/heavy-report" is delayed by 5000 ms
Given the URL "*.png" is delayed by 500 ms
Given the URL "**\/api/checkout" is delayed by 2000 ms
```

## 5. Given the network is offline

Simulate offline mode for the rest of the scenario.

**Keyword**: `Given`

**Pattern**

```js
/^the network is offline$/
```

**Examples**

```gherkin
Given the network is offline
Given I am on the homepage
  When the network is offline
  And I follow "Refresh"
  Then I should see "Offline"
When the network is offline
  And I press "Sync"
  Then I should see "Cannot reach server"
Given the network is offline
  And I am on "/dashboard"
Given the network is offline
  When I click "Reload"
  Then "<.error-banner>" should be visible
```

## 6. Given the network is online

Restore network connectivity after `the network is offline`.

**Keyword**: `Given`

**Pattern**

```js
/^the network is online$/
```

**Examples**

```gherkin
Given the network is online
When the network is offline
  And I press "Sync"
  Then I should see "Cannot reach server"
  When the network is online
  And I press "Retry"
  Then I should see "Synced"
Given the network is online
  And I am on the homepage
When the network is online
Given the network is online
  When I follow "Reload"
  Then I should see "Welcome"
```

## 7. Given I start recording network requests

Start recording every outgoing request for later assertion.

**Keyword**: `Given`

**Pattern**

```js
/^(I |we )*start recording network requests$/
```

**Examples**

```gherkin
Given I start recording network requests
Given I start recording network requests
  When I press "Buy now"
  Then a POST request to "**\/api/checkout" should have been made
Given we start recording network requests
Given I start recording network requests
  When I follow "Pricing"
  Then no request to "**\/tracking" should have been made
Given I start recording network requests
  When I scroll to the bottom
  Then a GET request to "**\/api/feed/page=2" should have been made
```

## 8. Then a request to "**\/api/users" should have been made

Assert at least one request matching a URL pattern was recorded.

Patterns use simple `*` wildcards (regex internally).

**Keyword**: `Then`

**Pattern**

```js
/^a request to "([^"]*)" should have been made$/
```

**Examples**

```gherkin
Then a request to "**\/api/users" should have been made
Then a request to "**\/api/checkout" should have been made
Then a request to "**\/api/orders/*" should have been made
Then a request to "*.css" should have been made
Then a request to "https://api.example.com/**" should have been made
```

## 9. Then a GET request to "**\/api/users" should have been made

Assert at least one HTTP-method-specific request was recorded.

**Keyword**: `Then`

**Pattern**

```js
/^a (GET|POST|PUT|PATCH|DELETE) request to "([^"]*)" should have been made$/
```

**Examples**

```gherkin
Then a GET request to "**\/api/users" should have been made
Then a POST request to "**\/api/login" should have been made
Then a PUT request to "**\/api/users/1" should have been made
Then a PATCH request to "**\/api/orders/*" should have been made
Then a DELETE request to "**\/api/cart/items/*" should have been made
```

## 10. Then no request to "**\/tracking" should have been made

Assert NO request matching a URL pattern was recorded.

**Keyword**: `Then`

**Pattern**

```js
/^no request to "([^"]*)" should have been made$/
```

**Examples**

```gherkin
Then no request to "**\/tracking" should have been made
Then no request to "**\/google-analytics.com/**" should have been made
Then no request to "**\/api/admin/**" should have been made
Then no request to "*.gif" should have been made
Then no request to "**\/api/v1/legacy/**" should have been made
```
