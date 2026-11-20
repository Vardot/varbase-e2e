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

Start recording the browser as a webm video. Opens a new browser context
with `recordVideo` enabled; the cookies, the local storage, the viewport
and the page setups go on, the page starts blank. Place BEFORE any
navigation in the scenario. When the scenario already records (the mode
is on or on-failure, the @video tag, an earlier start) the step changes
nothing: the recording goes on.

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

Stop recording. Closes the current browser context (which flushes the
webm to disk), saves the video, and opens a new context that does not
record, with the same cookies, local storage, viewport and page setups,
so the rest of the scenario can continue (the page starts blank).

The video is saved under the name reserved with "I save the current video
as", else under worldParameters.video.filenamePattern with the status
"manual" (the scenario has not ended yet).

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
webm uses this name instead of the automatic timestamped one. A reserved
name is kept in the on-failure mode too, when the scenario passes.

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

Print the path that the current video will be written to when the
scenario ends (or the recording is stopped): the reserved name, else the
filenamePattern with "<status>" where the scenario's result will go.
Diagnostic only — never asserts, never fails.

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
