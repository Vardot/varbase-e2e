# JavaScript errors steps

4 steps, defined in `tests/step-definitions/javascript.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then there should be no JavaScript errors` |
| 2 | `Then there should be no JavaScript warnings` |
| 3 | `Then JavaScript errors should not match "TypeError"` |
| 4 | `Then print JavaScript errors` |

---

## 1. Then there should be no JavaScript errors

Assert that no JavaScript errors have been collected so far.

Always fails on error (ignoring the active mode) — this is the explicit
"hard check" step. Calling it also prevents the auto-report at scenario
end so a single error is not reported twice.

**Keyword**: `Then`

**Pattern**

```js
/^there should be no JavaScript errors$/
```

**Examples**

```gherkin
Then there should be no JavaScript errors
And there should be no JavaScript errors
But there should be no JavaScript errors
Then there should be no JavaScript errors
Then there should be no JavaScript errors
```

## 2. Then there should be no JavaScript warnings

Assert that no JavaScript console warnings were collected. Requires
'warning' to be in the captured console levels (see worldParameters or
VARBASE_E2E_JS_ERROR_LEVELS).

**Keyword**: `Then`

**Pattern**

```js
/^there should be no JavaScript warnings$/
```

**Examples**

```gherkin
Then there should be no JavaScript warnings
And there should be no JavaScript warnings
But there should be no JavaScript warnings
Then there should be no JavaScript warnings
Then there should be no JavaScript warnings
```

## 3. Then JavaScript errors should not match "TypeError"

Assert that no collected JavaScript error message matches a regular
expression. Useful when some noise is unavoidable but a specific bug
pattern must never appear.

**Keyword**: `Then`

**Pattern**

```js
/^JavaScript errors should not match "([^"]*)"$/
```

**Examples**

```gherkin
Then JavaScript errors should not match "TypeError"
Then JavaScript errors should not match "is not a function"
And JavaScript errors should not match "Cannot read property"
Then JavaScript errors should not match "ReferenceError: .* is not defined"
Then JavaScript errors should not match "Uncaught"
```

## 4. Then print JavaScript errors

Print the JavaScript errors collected so far. Diagnostic only — never
asserts, never fails. Useful inside a scenario being debugged.

**Keyword**: `Then`

**Pattern**

```js
/^print JavaScript errors$/
```

**Examples**

```gherkin
Then print JavaScript errors
And print JavaScript errors
But print JavaScript errors
Then print JavaScript errors
Then print JavaScript errors
```
