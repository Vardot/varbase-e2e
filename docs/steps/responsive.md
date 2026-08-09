# Responsive viewports steps

5 steps, defined in `tests/step-definitions/responsive.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given the following responsive breakpoints:` |
| 2 | `When I set the viewport to the "mobile" breakpoint` |
| 3 | `When I set the viewport width to 1200` |
| 4 | `When I set the viewport height to 800` |
| 5 | `When I set the viewport to 1200 by 800` |

---

## 1. Given the following responsive breakpoints:

Replace the breakpoint registry for the current scenario from a data table.

**Keyword**: `Given`

**Pattern**

```js
'the following responsive breakpoints:'
```

**Examples**

```gherkin
Given the following responsive breakpoints:
  | mobile  | 375  | 667  |
  | tablet  | 768  | 1024 |
  | desktop | 1200 | 900  |
Given the following responsive breakpoints:
  | watch   | 280  | 280  |
  | phablet | 414  | 896  |
And the following responsive breakpoints:
  | xs      | 320  | 480  |
  | sm      | 480  | 800  |
Given the following responsive breakpoints:
  | hd      | 1280 | 720  |
  | full-hd | 1920 | 1080 |
Given the following responsive breakpoints:
  | a11y    | 320  | 480  |
  | print   | 794  | 1123 |
```

## 2. When I set the viewport to the "mobile" breakpoint

Resize the viewport to a registered named breakpoint.

Built-in names: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`, `mobile`,
`tablet`, `desktop`. Project-defined names override built-ins.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*set the viewport to the "([^"]*)" breakpoint$/
```

**Examples**

```gherkin
When I set the viewport to the "mobile" breakpoint
When I set the viewport to the "tablet" breakpoint
And we set the viewport to the "desktop" breakpoint
When I set the viewport to the "xl" breakpoint
When I set the viewport to the "xxxl" breakpoint
```

## 3. When I set the viewport width to 1200

Resize the viewport width while keeping the current height.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*set the viewport width to (\d+)$/
```

**Examples**

```gherkin
When I set the viewport width to 1200
When I set the viewport width to 375
And we set the viewport width to 1920
When I set the viewport width to 768
When I set the viewport width to 1024
```

## 4. When I set the viewport height to 800

Resize the viewport height while keeping the current width.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*set the viewport height to (\d+)$/
```

**Examples**

```gherkin
When I set the viewport height to 800
When I set the viewport height to 1024
And we set the viewport height to 1080
When I set the viewport height to 667
When I set the viewport height to 900
```

## 5. When I set the viewport to 1200 by 800

Resize the viewport to an explicit width-by-height pair.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*set the viewport to (\d+) by (\d+)$/
```

**Examples**

```gherkin
When I set the viewport to 1200 by 800
When I set the viewport to 375 by 667
And we set the viewport to 1920 by 1080
When I set the viewport to 768 by 1024
When I set the viewport to 1024 by 768
```
