# Video recording steps

4 steps, defined in `tests/step-definitions/video.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I start video recording` |
| 2 | `When I stop video recording` |
| 3 | `When I save the current video as "checkout-flow.webm"` |
| 4 | `Then print video path` |

---

## 1. When I start video recording

Start recording the browser as a webm video. Closes the current page +
context and reopens with `recordVideo` enabled. Place BEFORE any
navigation in the scenario.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*start video recording$/
```

**Examples**

```gherkin
When I start video recording
And I start video recording
Given I start video recording
But I start video recording
Then I start video recording
```

## 2. When I stop video recording

Stop recording. Closes the current page + context (which flushes the
webm to disk) and reopens a fresh, non-recording browser so the rest
of the scenario can continue.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*stop video recording$/
```

**Examples**

```gherkin
When I stop video recording
And I stop video recording
But I stop video recording
Then I stop video recording
Then I stop video recording
```

## 3. When I save the current video as "checkout-flow.webm"

Reserve a custom filename for the current scenario's video. The actual
save happens at scenario end (Playwright's `video.saveAs()` blocks
until recording finishes, so we cannot copy bytes mid-flight). If the
scenario calls `stop video recording` before scenario end, the manual
webm uses this name instead of the automatic timestamped one.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*save the current video as "([^"]*)"$/
```

**Examples**

```gherkin
When I save the current video as "checkout-flow.webm"
When I save the current video as "regression-21.webm"
And I save the current video as "smoke.webm"
Then I save the current video as "demo.webm"
But I save the current video as "rerun.webm"
```

## 4. Then print video path

Print the path that the current video will be written to. Diagnostic
only — never asserts, never fails.

**Keyword**: `Then`

**Pattern**

```js
/^print video path$/
```

**Examples**

```gherkin
Then print video path
And print video path
But print video path
Then print video path
Then print video path
```
