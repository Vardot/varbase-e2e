# URL paths steps

8 steps, defined in `tests/step-definitions/path.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then the path should be "/dashboard"` |
| 2 | `Then the path should not be "/login"` |
| 3 | `Then current url should have the "lang" parameter` |
| 4 | `Then current url should have the "lang" parameter with the "en" value` |
| 5 | `Then current url should not have the "missing" parameter` |
| 6 | `Then current url should not have the "lang" parameter with the "fr" value` |
| 7 | `Given the basic authentication with the username "admin" and the password "secret"` |
| 8 | `When I go back` |

---

## 1. Then the path should be "/dashboard"

Assert the current URL pathname equals an expected string (no query/fragment).

**Keyword**: `Then`

**Pattern**

```js
'the path should be {string}'
```

**Examples**

```gherkin
Then the path should be "/dashboard"
Then the path should be "/about"
And the path should be "/checkout/step-2"
Then the path should be "/admin/users"
Then the path should be "/"
```

## 2. Then the path should not be "/login"

Assert the current URL pathname is NOT equal to an expected string.

**Keyword**: `Then`

**Pattern**

```js
'the path should not be {string}'
```

**Examples**

```gherkin
Then the path should not be "/login"
Then the path should not be "/error"
And the path should not be "/admin"
Then the path should not be "/maintenance"
Then the path should not be "/forbidden"
```

## 3. Then current url should have the "lang" parameter

Assert the current URL has the named query parameter (any value).

**Keyword**: `Then`

**Pattern**

```js
'current url should have the {string} parameter'
```

**Examples**

```gherkin
Then current url should have the "lang" parameter
Then current url should have the "page" parameter
And current url should have the "q" parameter
Then current url should have the "ref" parameter
Then current url should have the "sort" parameter
```

## 4. Then current url should have the "lang" parameter with the "en" value

Assert the current URL has the named query parameter with the exact value.

**Keyword**: `Then`

**Pattern**

```js
'current url should have the {string} parameter with the {string} value'
```

**Examples**

```gherkin
Then current url should have the "lang" parameter with the "en" value
Then current url should have the "page" parameter with the "2" value
And current url should have the "sort" parameter with the "price" value
Then current url should have the "ref" parameter with the "newsletter" value
Then current url should have the "q" parameter with the "laptops" value
```

## 5. Then current url should not have the "missing" parameter

Assert the current URL does NOT carry the named query parameter.

**Keyword**: `Then`

**Pattern**

```js
'current url should not have the {string} parameter'
```

**Examples**

```gherkin
Then current url should not have the "missing" parameter
Then current url should not have the "debug" parameter
And current url should not have the "preview" parameter
Then current url should not have the "force" parameter
Then current url should not have the "test" parameter
```

## 6. Then current url should not have the "lang" parameter with the "fr" value

Assert the current URL does NOT carry a parameter+value pair.

**Keyword**: `Then`

**Pattern**

```js
'current url should not have the {string} parameter with the {string} value'
```

**Examples**

```gherkin
Then current url should not have the "lang" parameter with the "fr" value
Then current url should not have the "page" parameter with the "100" value
And current url should not have the "sort" parameter with the "old" value
Then current url should not have the "preview" parameter with the "1" value
Then current url should not have the "debug" parameter with the "true" value
```

## 7. Given the basic authentication with the username "admin" and the password "secret"

Re-open the browser context with HTTP basic-auth credentials.

**Keyword**: `Given`

**Pattern**

```js
'the basic authentication with the username {string} and the password {string}'
```

**Examples**

```gherkin
Given the basic authentication with the username "admin" and the password "secret"
Given the basic authentication with the username "guest" and the password "guest"
And the basic authentication with the username "alice" and the password "s3cret"
Given the basic authentication with the username "ci" and the password "ci-token-123"
Given the basic authentication with the username "tester" and the password ""
```

## 8. When I go back

Navigate one step back in the browser history.

Equivalent to clicking the browser back button. Throws no error if there
is no history (returns null from `page.goBack()`).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*go back$/
```

**Examples**

```gherkin
When I go back
When I follow "About"
  And I go back
  Then I should be on the homepage
And I go back
When I am on "/cart"
  When I am on "/checkout"
  And I go back
  Then I should be on "/cart"
When I go back
  And I wait until the URL contains "/products"
```
