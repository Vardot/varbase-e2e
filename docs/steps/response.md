# Response headers steps

4 steps, defined in `tests/step-definitions/response.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then the response should contain the header "content-type"` |
| 2 | `Then the response should not contain the header "x-fake-header"` |
| 3 | `Then the response header "content-type" should contain the value "html"` |
| 4 | `Then the response header "content-type" should not contain the value "application/json"` |

---

## 1. Then the response should contain the header "content-type"

Assert the most recent navigation response carried a header (case-insensitive).

**Keyword**: `Then`

**Pattern**

```js
'the response should contain the header {string}'
```

**Examples**

```gherkin
Then the response should contain the header "content-type"
Then the response should contain the header "cache-control"
And the response should contain the header "x-frame-options"
Then the response should contain the header "set-cookie"
Then the response should contain the header "etag"
```

## 2. Then the response should not contain the header "x-fake-header"

Assert the most recent navigation response did NOT carry a header.

**Keyword**: `Then`

**Pattern**

```js
'the response should not contain the header {string}'
```

**Examples**

```gherkin
Then the response should not contain the header "x-fake-header"
Then the response should not contain the header "x-powered-by"
And the response should not contain the header "server"
Then the response should not contain the header "x-aspnet-version"
Then the response should not contain the header "x-debug-token"
```

## 3. Then the response header "content-type" should contain the value "html"

Assert a header's value contains a substring.

**Keyword**: `Then`

**Pattern**

```js
'the response header {string} should contain the value {string}'
```

**Examples**

```gherkin
Then the response header "content-type" should contain the value "html"
Then the response header "cache-control" should contain the value "no-cache"
And the response header "content-type" should contain the value "charset=utf-8"
Then the response header "set-cookie" should contain the value "session="
Then the response header "x-frame-options" should contain the value "DENY"
```

## 4. Then the response header "content-type" should not contain the value "application/json"

Assert a header's value does NOT contain a substring (or the header is absent).

**Keyword**: `Then`

**Pattern**

```js
'the response header {string} should not contain the value {string}'
```

**Examples**

```gherkin
Then the response header "content-type" should not contain the value "application/json"
Then the response header "cache-control" should not contain the value "public"
And the response header "content-type" should not contain the value "xml"
Then the response header "set-cookie" should not contain the value "Domain=other"
Then the response header "x-frame-options" should not contain the value "ALLOW"
```
