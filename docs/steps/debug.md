# Debug steps

2 steps, defined in `tests/step-definitions/debug.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then print current URL` |
| 2 | `Then print last response` |

---

## 1. Then print current URL

Print the current page URL to console (debug).

**Keyword**: `Then`

**Pattern**

```js
/^print current URL$/
```

**Examples**

```gherkin
Then print current URL
When print current URL
And print current URL
```

## 2. Then print last response

Print the full page HTML (last response) to console (debug).

**Keyword**: `Then`

**Pattern**

```js
/^print last response$/
```

**Examples**

```gherkin
Then print last response
When print last response
And print last response
```
