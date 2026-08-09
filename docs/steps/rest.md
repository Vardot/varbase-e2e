# REST (short form) steps

5 steps, defined in `tests/step-definitions/rest.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given a REST header "Authorization" with value "Bearer abc123"` |
| 2 | `When I send a REST "GET" request to "/api/users"` |
| 3 | `When I send a REST "POST" request to "/api/users" with body:` |
| 4 | `Then the REST response status code should be 200` |
| 5 | `Then the REST response should contain "Alice"` |

---

## 1. Given a REST header "Authorization" with value "Bearer abc123"

Add an HTTP header to subsequent REST requests.

**Keyword**: `Given`

**Pattern**

```js
'a REST header {string} with value {string}'
```

**Examples**

```gherkin
Given a REST header "Authorization" with value "Bearer abc123"
Given a REST header "Accept" with value "application/json"
And a REST header "X-Request-ID" with value "req-001"
Given a REST header "Content-Type" with value "application/json"
Given a REST header "X-API-Key" with value "key-xyz"
```

## 2. When I send a REST "GET" request to "/api/users"

Send an HTTP request without a body.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*send a REST "([^"]*)" request to "([^"]*)"$/
```

**Examples**

```gherkin
When I send a REST "GET" request to "/api/users"
When I send a REST "DELETE" request to "/api/orders/1"
And we send a REST "GET" request to "https://example.com/api/health"
When I send a REST "GET" request to "/api/me"
When I send a REST "DELETE" request to "/api/cart/items/42"
```

## 3. When I send a REST "POST" request to "/api/users" with body:

Send an HTTP request with a doc-string body (raw text, JSON, or form-encoded).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*send a REST "([^"]*)" request to "([^"]*)" with body:$/
```

**Examples**

```gherkin
When I send a REST "POST" request to "/api/users" with body:
  """
  {"name": "Alice"}
  """
When I send a REST "PUT" request to "/api/users/1" with body:
  """
  {"role": "admin"}
  """
And we send a REST "PATCH" request to "/api/orders/1" with body:
  """
  {"status": "shipped"}
  """
When I send a REST "POST" request to "/api/login" with body:
  """
  username=alice&password=s3cret
  """
When I send a REST "POST" request to "/webhooks/event" with body:
  """
  {"event": "ping"}
  """
```

## 4. Then the REST response status code should be 200

Assert the most recent REST response carried an expected status code.

**Keyword**: `Then`

**Pattern**

```js
'the REST response status code should be {int}'
```

**Examples**

```gherkin
Then the REST response status code should be 200
Then the REST response status code should be 201
And the REST response status code should be 401
Then the REST response status code should be 404
Then the REST response status code should be 500
```

## 5. Then the REST response should contain "Alice"

Assert the most recent REST response body contains a substring.

**Keyword**: `Then`

**Pattern**

```js
'the REST response should contain {string}'
```

**Examples**

```gherkin
Then the REST response should contain "Alice"
Then the REST response should contain "id"
And the REST response should contain "shipped"
Then the REST response should contain "ok"
Then the REST response should contain "Welcome"
```
