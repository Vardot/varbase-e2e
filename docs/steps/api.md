# API (long form) steps

22 steps, defined in `tests/step-definitions/api.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given I am authenticating as "admin" with "password123" password` |
| 2 | `Given I set header "Content-Type" with value "application/json"` |
| 3 | `Given the API base URL is "https://jsonplaceholder.typicode.com"` |
| 4 | `Given I set the header "Content-Type" to "application/json"` |
| 5 | `Given I set the following headers:` |
| 6 | `Given I set the request body to '{"name": "John", "email": "john@example.com"}'` |
| 7 | `Given I set the request body with:` |
| 8 | `When I send a GET request to "/users"` |
| 9 | `When I send a POST request to "/users" with values:` |
| 10 | `When I send a POST request to "/users" with body:` |
| 11 | `When I send a POST request to "/login" with form data:` |
| 12 | `Then the API response code should be 200` |
| 13 | `Then the API response should contain "success"` |
| 14 | `Then the API response should not contain "error"` |
| 15 | `Then the API response should contain json:` |
| 16 | `Then the JSON response should have "name" equal to "John Doe"` |
| 17 | `Then the JSON response should have property "id"` |
| 18 | `Then the JSON response should not have property "password"` |
| 19 | `Then the response should be valid JSON` |
| 20 | `Then the response header "Content-Type" should be "application/json"` |
| 21 | `Then print API response` |
| 22 | `Given I set placeholder "{{userId}}" to "123"` |

---

## 1. Given I am authenticating as "admin" with "password123" password

Adds Basic Authentication header to the next request.

**Keyword**: `Given`

**Pattern**

```js
/^(?:I am|we are) authenticating as "([^"]*)" with "([^"]*)" password$/
```

**Examples**

```gherkin
Given I am authenticating as "admin" with "password123" password
Given we are authenticating as "user@example.com" with "secret" password
Given I am authenticating as "api-user" with "pass!word" password
Given we are authenticating as "reader" with "readonly" password
```

## 2. Given I set header "Content-Type" with value "application/json"

Sets a single HTTP request header.

**Keyword**: `Given`

**Pattern**

```js
/^(?:I |we )?set header "([^"]*)" with value "([^"]*)"$/
```

**Examples**

```gherkin
Given I set header "Content-Type" with value "application/json"
Given I set header "Authorization" with value "Bearer token123"
Given I set header "Accept" with value "application/xml"
Given I set header "Accept" with value "application/json"
Given we set header "X-Api-Key" with value "abcd-1234"
Given I set header "User-Agent" with value "test-runner"
Given we set header "Accept-Language" with value "en-US"
Given I set header "If-None-Match" with value "etag-xyz"
```

## 3. Given the API base URL is "https://jsonplaceholder.typicode.com"

Set the base URL for API calls. Accepts full URLs or paths relative to LAUNCH_URL.

**Keyword**: `Given`

**Pattern**

```js
/^(?:the API base URL is|I set the API base URL to|the base URL is) "([^"]*)"$/
```

**Examples**

```gherkin
Given the API base URL is "https://jsonplaceholder.typicode.com"
Given I set the API base URL to "https://api.example.com/v1"
Given the base URL is "http://localhost:3000/api"
Given the API base URL is "https://un.org/api"
Given I set the API base URL to "/api/v2"
Given the base URL is "https://staging.example.com/api"
Given the API base URL is "http://127.0.0.1:8080"
```

## 4. Given I set the header "Content-Type" to "application/json"

Set a request header. Alternative syntax.

**Keyword**: `Given`

**Pattern**

```js
/^(?:I set the header|we set the header|the header) "([^"]*)" (?:to|is) "([^"]*)"$/
```

**Examples**

```gherkin
Given I set the header "Content-Type" to "application/json"
Given I set the header "Authorization" to "Bearer token123"
Given the header "Accept" is "application/json"
Given we set the header "X-Api-Key" to "abcd-1234"
Given I set the header "If-Match" to "etag-123"
Given the header "User-Agent" is "test-runner"
Given we set the header "Accept-Language" to "en-US"
Given I set the header "Cache-Control" to "no-cache"
```

## 5. Given I set the following headers:

Set multiple headers using a table.

**Keyword**: `Given`

**Pattern**

```js
/^(?:I|we) set the following headers:$/
```

**Examples**

```gherkin
Given I set the following headers:
  | Content-Type  | application/json    |
  | Authorization | Bearer token123     |
  | Accept        | application/json    |

Given we set the following headers:
  | Content-Type    | application/json   |
  | X-Api-Key       | abcd-1234          |
  | Accept-Language | en-US              |

Given I set the following headers:
  | User-Agent    | test-runner        |
  | Cache-Control | no-cache           |
  | If-None-Match | etag-xyz           |

Given we set the following headers:
  | Authorization | Bearer {{token}}   |
  | Accept        | application/json   |
  | X-Request-ID  | req-001            |
```

## 6. Given I set the request body to '{"name": "John", "email": "john@example.com"}'

Set request body data for POST/PUT requests.

**Keyword**: `Given`

**Pattern**

```js
/^(?:I set the request body to|we set the request body to|the request body is) '([^']*)'$/
```

**Examples**

```gherkin
Given I set the request body to '{"name": "John", "email": "john@example.com"}'
Given the request body is '{"title": "Test Post", "body": "This is a test"}'
Given we set the request body to '{"org": "Vardot", "active": true}'
Given I set the request body to '{"id": 1, "tags": ["qa","api"]}'
Given the request body is '{"username": "admin", "password": "secret"}'
Given we set the request body to '{"email": "hello@un.org"}'
Given I set the request body to '{"status": "published"}'
```

## 7. Given I set the request body with:

Set request body using a table.

**Keyword**: `Given`

**Pattern**

```js
/^(?:I|we) set the request body with:$/
```

**Examples**

```gherkin
Given I set the request body with:
  | name  | John Doe           |
  | email | john@example.com   |
  | age   | 30                 |

Given we set the request body with:
  | org     | Vardot       |
  | country | UN               |
  | active  | true             |

Given I set the request body with:
  | title    | Hello World     |
  | body     | First post      |
  | userId   | 1               |

Given we set the request body with:
  | status   | published       |
  | priority | 5               |
  | featured | false           |
```

## 8. When I send a GET request to "/users"

Sends HTTP request to specific relative URL.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )?send a ([A-Z]+) request to "([^"]+)"$/
```

**Examples**

```gherkin
When I send a GET request to "/users"
When we send a POST request to "/posts"
When I send a PUT request to "/users/1"
When we send a DELETE request to "/posts/1"
When I send a GET request to "/posts?userId=1"
When we send a PATCH request to "/users/42"
When I send a GET request to "/health"
When we send a HEAD request to "/users"
When I send a OPTIONS request to "/api"
When we send a GET request to "/posts/{{postId}}"
```

## 9. When I send a POST request to "/users" with values:

Sends HTTP request to specific URL with field values from Table.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )?send a ([A-Z]+) request to "([^"]+)" with values:$/
```

**Examples**

```gherkin
When I send a POST request to "/users" with values:
  | name  | John Doe         |
  | email | john@example.com |
  | age   | 30               |

When we send a POST request to "/users" with values:
  | name  | Alice            |
  | email | alice@un.org     |
  | role  | editor           |

When I send a PUT request to "/users/1" with values:
  | name   | Updated Name    |
  | active | true            |

When we send a POST request to "/posts" with values:
  | title  | Welcome         |
  | body   | Hello Vardot|
  | userId | 1               |
```

## 10. When I send a POST request to "/users" with body:

Sends HTTP request to specific URL with raw body from PyString.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )?send a ([A-Z]+) request to "([^"]+)" with body:$/
```

**Examples**

```gherkin
When I send a POST request to "/users" with body:
  """
  {
  "name": "John Doe",
  "email": "john@example.com"
  }
  """

When we send a POST request to "/posts" with body:
  """
  {
  "title": "Hello",
  "body": "World",
  "userId": 1
  }
  """

When I send a PUT request to "/users/1" with body:
  """
  {
  "name": "Updated",
  "org": "Vardot"
  }
  """

When we send a POST request to "/contacts" with body:
  """
  {
  "email": "info@un.org",
  "subscribe": true
  }
  """
```

## 11. When I send a POST request to "/login" with form data:

Sends HTTP request to specific URL with form data.

**Keyword**: `When`

**Pattern**

```js
/^(?:I |we )?send a ([A-Z]+) request to "([^"]+)" with form data:$/
```

**Examples**

```gherkin
When I send a POST request to "/login" with form data:
  """
  username=admin
  password=secret
  remember=true
  """

When we send a POST request to "/subscribe" with form data:
  """
  email=hello@un.org
  list=newsletter
  """

When I send a POST request to "/contact" with form data:
  """
  name=Alice
  org=Vardot
  message=Hello
  """

When we send a PUT request to "/profile" with form data:
  """
  name=Updated
  country=UN
  """
```

## 12. Then the API response code should be 200

Checks that API response has specific status code.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the )?API response code should be (\d+)$/
```

**Examples**

```gherkin
Then the API response code should be 200
Then API response code should be 404
Then the API response code should be 201
Then API response code should be 204
Then the API response code should be 400
Then API response code should be 401
Then the API response code should be 403
Then API response code should be 500
Then the API response code should be 301
Then API response code should be 302
```

## 13. Then the API response should contain "success"

Checks that API response body contains specific text.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the )?API response should contain "([^"]*)"$/
```

**Examples**

```gherkin
Then the API response should contain "success"
Then API response should contain "John Doe"
Then the API response should contain "Vardot"
Then API response should contain "UN"
Then the API response should contain "published"
Then API response should contain "id"
Then the API response should contain "email"
Then API response should contain "hello@un.org"
```

## 14. Then the API response should not contain "error"

Checks that API response body doesn't contain specific text.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the )?API response should not contain "([^"]*)"$/
```

**Examples**

```gherkin
Then the API response should not contain "error"
Then API response should not contain "failed"
Then the API response should not contain "forbidden"
Then API response should not contain "unauthorized"
Then the API response should not contain "password"
Then API response should not contain "secret"
Then the API response should not contain "exception"
Then API response should not contain "stack trace"
```

## 15. Then the API response should contain json:

Checks that API response body contains JSON from PyString.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the )?API response should contain json:$/
```

**Examples**

```gherkin
Then the API response should contain json:
  """
  {
  "name": "John Doe",
  "email": "john@example.com"
  }
  """

Then API response should contain json:
  """
  {
  "org": "Vardot",
  "active": true
  }
  """

Then the API response should contain json:
  """
  {
  "id": 1,
  "title": "Hello"
  }
  """

Then API response should contain json:
  """
  {
  "email": "hello@un.org"
  }
  """
```

## 16. Then the JSON response should have "name" equal to "John Doe"

Alternative syntax for JSON property verification.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the JSON response should have|the API response should have|the JSON property) "([^"]*)" (?:equal to|should be) (.+)$/
```

**Examples**

```gherkin
Then the JSON response should have "name" equal to "John Doe"
Then the API response should have "id" equal to 1
Then the JSON property "active" should be true
Then the JSON response should have "org" equal to "Vardot"
Then the API response should have "email" equal to "hello@un.org"
Then the JSON property "count" should be 42
Then the JSON response should have "user.role" equal to "admin"
Then the JSON property "published" should be false
```

## 17. Then the JSON response should have property "id"

Verify a JSON property exists.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the JSON response should have property|the API response should contain property) "([^"]*)"$/
```

**Examples**

```gherkin
Then the JSON response should have property "id"
Then the API response should contain property "user.email"
Then the JSON response should have property "title"
Then the API response should contain property "data"
Then the JSON response should have property "user.org"
Then the API response should contain property "meta.total"
Then the JSON response should have property "createdAt"
Then the API response should contain property "links.self"
```

## 18. Then the JSON response should not have property "password"

Verify a JSON property does not exist.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the JSON response should not have property|the API response should not contain property) "([^"]*)"$/
```

**Examples**

```gherkin
Then the JSON response should not have property "password"
Then the API response should not contain property "secret"
Then the JSON response should not have property "token"
Then the API response should not contain property "apiKey"
Then the JSON response should not have property "user.password"
Then the API response should not contain property "internal"
Then the JSON response should not have property "debug"
Then the API response should not contain property "stack"
```

## 19. Then the response should be valid JSON

Verify the response is valid JSON.

Two equivalent phrasings.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the response should be valid JSON|the API response should be valid JSON)$/
```

**Examples**

```gherkin
Then the response should be valid JSON
Then the API response should be valid JSON
And the response should be valid JSON
When I send a GET request to "/api/users"
  Then the API response should be valid JSON
When I send a POST request to "/api/orders"
  Then the response should be valid JSON
```

## 20. Then the response header "Content-Type" should be "application/json"

Verify response header value.

**Keyword**: `Then`

**Pattern**

```js
/^(?:the response header|the header) "([^"]*)" should (?:be|contain) "([^"]*)"$/
```

**Examples**

```gherkin
Then the response header "Content-Type" should be "application/json"
Then the header "Cache-Control" should contain "no-cache"
Then the response header "Content-Type" should contain "charset=utf-8"
Then the header "X-Powered-By" should be "Vardot"
Then the response header "ETag" should contain "etag"
Then the header "Location" should contain "/users/1"
Then the response header "Access-Control-Allow-Origin" should be "*"
Then the header "Content-Length" should contain "0"
```

## 21. Then print API response

Prints the most recent API response body to stdout for debugging.

Strip before merging — this is a developer aid only.

**Keyword**: `Then`

**Pattern**

```js
/^print API response$/
```

**Examples**

```gherkin
Then print API response
When I send a GET request to "/api/users"
  Then print API response
And print API response
When I send a POST request to "/api/login"
  Then the API response code should be 200
  And print API response
When I send a DELETE request to "/api/orders/1"
  Then print API response
```

## 22. Given I set placeholder "{{userId}}" to "123"

Sets placeholder for replacement in URLs, requests, and responses.

**Keyword**: `Given`

**Pattern**

```js
/^(?:I|we) set placeholder "([^"]*)" to "([^"]*)"$/
```

**Examples**

```gherkin
Given I set placeholder "{{userId}}" to "123"
Given we set placeholder "{{token}}" to "abcd-1234"
Given I set placeholder "{{postId}}" to "42"
Given we set placeholder "{{org}}" to "Vardot"
Given I set placeholder "{{email}}" to "hello@un.org"
Given we set placeholder "{{apiKey}}" to "secret-xyz"
Given I set placeholder "{{version}}" to "v2"
Given we set placeholder "{{locale}}" to "en-US"
```
