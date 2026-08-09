# Cookies steps

12 steps, defined in `tests/step-definitions/cookie.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then a cookie with the name "session_id" should exist` |
| 2 | `Then a cookie with the name "lang" and the value "en" should exist` |
| 3 | `Then a cookie with the name "session_id" and a value containing "abc" should exist` |
| 4 | `Then a cookie with a name containing "session" should exist` |
| 5 | `Then a cookie with a name containing "session" and the value "active" should exist` |
| 6 | `Then a cookie with a name containing "session" and a value containing "active" should exist` |
| 7 | `Then a cookie with the name "session_id" should not exist` |
| 8 | `Then a cookie with the name "lang" and the value "fr" should not exist` |
| 9 | `Then a cookie with the name "preferences" and a value containing "lightmode" should not exist` |
| 10 | `Then a cookie with a name containing "old_" should not exist` |
| 11 | `Then a cookie with a name containing "session" and the value "expired" should not exist` |
| 12 | `Then a cookie with a name containing "session" and a value containing "old" should not exist` |

---

## 1. Then a cookie with the name "session_id" should exist

Assert that a cookie with the exact name exists in the browser context.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with the name {string} should exist'
```

**Examples**

```gherkin
Then a cookie with the name "session_id" should exist
Then a cookie with the name "auth_token" should exist
And a cookie with the name "lang" should exist
Then a cookie with the name "consent" should exist
When I press "Sign in"
  Then a cookie with the name "session" should exist
```

## 2. Then a cookie with the name "lang" and the value "en" should exist

Assert that a cookie with the exact name AND exact value exists.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with the name {string} and the value {string} should exist'
```

**Examples**

```gherkin
Then a cookie with the name "lang" and the value "en" should exist
Then a cookie with the name "consent" and the value "accepted" should exist
And a cookie with the name "ab_bucket" and the value "variant-b" should exist
Then a cookie with the name "theme" and the value "dark" should exist
When I check "Remember me"
  And I press "Sign in"
  Then a cookie with the name "remember" and the value "1" should exist
```

## 3. Then a cookie with the name "session_id" and a value containing "abc" should exist

Assert a cookie with the exact name has a value containing a substring.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with the name {string} and a value containing {string} should exist'
```

**Examples**

```gherkin
Then a cookie with the name "session_id" and a value containing "abc" should exist
Then a cookie with the name "auth" and a value containing "Bearer" should exist
And a cookie with the name "preferences" and a value containing "darkmode" should exist
Then a cookie with the name "tracking" and a value containing "v2-" should exist
Then a cookie with the name "csrf" and a value containing "token=" should exist
```

## 4. Then a cookie with a name containing "session" should exist

Assert a cookie whose name contains a substring exists.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with a name containing {string} should exist'
```

**Examples**

```gherkin
Then a cookie with a name containing "session" should exist
Then a cookie with a name containing "_csrf" should exist
And a cookie with a name containing "tracking" should exist
Then a cookie with a name containing "auth" should exist
Then a cookie with a name containing "lang_" should exist
```

## 5. Then a cookie with a name containing "session" and the value "active" should exist

Assert a cookie whose name contains a substring has the exact value.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with a name containing {string} and the value {string} should exist'
```

**Examples**

```gherkin
Then a cookie with a name containing "session" and the value "active" should exist
Then a cookie with a name containing "auth" and the value "1" should exist
And a cookie with a name containing "lang_" and the value "en" should exist
Then a cookie with a name containing "feature_" and the value "on" should exist
Then a cookie with a name containing "_pref" and the value "dark" should exist
```

## 6. Then a cookie with a name containing "session" and a value containing "active" should exist

Assert a cookie whose name contains substring A has a value containing substring B.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with a name containing {string} and a value containing {string} should exist'
```

**Examples**

```gherkin
Then a cookie with a name containing "session" and a value containing "active" should exist
Then a cookie with a name containing "auth" and a value containing "Bearer" should exist
And a cookie with a name containing "tracking" and a value containing "v2-" should exist
Then a cookie with a name containing "csrf" and a value containing "token=" should exist
Then a cookie with a name containing "_pref" and a value containing "dark" should exist
```

## 7. Then a cookie with the name "session_id" should not exist

Assert a cookie with the exact name does NOT exist.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with the name {string} should not exist'
```

**Examples**

```gherkin
Then a cookie with the name "session_id" should not exist
Then a cookie with the name "auth_token" should not exist
And a cookie with the name "tracking" should not exist
When I press "Logout"
  Then a cookie with the name "session" should not exist
Given all cookies are cleared
  Then a cookie with the name "lang" should not exist
```

## 8. Then a cookie with the name "lang" and the value "fr" should not exist

Assert a cookie with the exact name+value does NOT exist.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with the name {string} and the value {string} should not exist'
```

**Examples**

```gherkin
Then a cookie with the name "lang" and the value "fr" should not exist
Then a cookie with the name "consent" and the value "rejected" should not exist
And a cookie with the name "theme" and the value "dark" should not exist
Then a cookie with the name "ab_bucket" and the value "variant-c" should not exist
Then a cookie with the name "remember" and the value "0" should not exist
```

## 9. Then a cookie with the name "preferences" and a value containing "lightmode" should not exist

Assert a cookie with the exact name does not contain a substring in its value.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with the name {string} and a value containing {string} should not exist'
```

**Examples**

```gherkin
Then a cookie with the name "preferences" and a value containing "lightmode" should not exist
Then a cookie with the name "tracking" and a value containing "v1-" should not exist
And a cookie with the name "auth" and a value containing "Basic" should not exist
Then a cookie with the name "session" and a value containing "expired" should not exist
Then a cookie with the name "csrf" and a value containing "invalid" should not exist
```

## 10. Then a cookie with a name containing "old_" should not exist

Assert no cookie name contains a substring.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with a name containing {string} should not exist'
```

**Examples**

```gherkin
Then a cookie with a name containing "old_" should not exist
Then a cookie with a name containing "_legacy" should not exist
And a cookie with a name containing "deprecated" should not exist
Given all cookies are cleared
  Then a cookie with a name containing "session" should not exist
When I press "Logout"
  Then a cookie with a name containing "auth" should not exist
```

## 11. Then a cookie with a name containing "session" and the value "expired" should not exist

Assert no cookie name+value pair (with partial name) matches.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with a name containing {string} and the value {string} should not exist'
```

**Examples**

```gherkin
Then a cookie with a name containing "session" and the value "expired" should not exist
Then a cookie with a name containing "auth" and the value "anonymous" should not exist
And a cookie with a name containing "feature_" and the value "off" should not exist
Then a cookie with a name containing "lang_" and the value "xx" should not exist
Then a cookie with a name containing "_pref" and the value "default" should not exist
```

## 12. Then a cookie with a name containing "session" and a value containing "old" should not exist

Assert no cookie partial-name + partial-value pair matches.

**Keyword**: `Then`

**Pattern**

```js
'a cookie with a name containing {string} and a value containing {string} should not exist'
```

**Examples**

```gherkin
Then a cookie with a name containing "session" and a value containing "old" should not exist
Then a cookie with a name containing "auth" and a value containing "Basic" should not exist
And a cookie with a name containing "tracking" and a value containing "v0-" should not exist
Then a cookie with a name containing "_pref" and a value containing "lightmode" should not exist
Then a cookie with a name containing "csrf" and a value containing "invalid" should not exist
```
