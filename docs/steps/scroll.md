# Scrolling steps

12 steps, defined in `tests/step-definitions/scroll.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `And I scroll down` |
| 2 | `And I scroll up` |
| 3 | `When I scroll to top` |
| 4 | `When I scroll to the bottom` |
| 5 | `When I scroll to top of "#off-canvas"` |
| 6 | `When I scroll to bottom of "#off-canvas"` |
| 7 | `And I scroll right` |
| 8 | `And I scroll left` |
| 9 | `When I scroll to start` |
| 10 | `When I scroll to the end` |
| 11 | `When I scroll to start of "#off-canvas"` |
| 12 | `When I scroll to end of "#off-canvas"` |

---

## 1. And I scroll down

Scrolls the page down by a custom number of pixels (default 350).

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? down(?: (\d+))?$/
```

**Examples**

```gherkin
And I scroll down
When I scroll down 800
And we scroll down 500
When scrolling down 1200
```

## 2. And I scroll up

Scrolls the page up by a custom number of pixels (default 350).

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? up(?: (\d+))?$/
```

**Examples**

```gherkin
And I scroll up
When I scroll up 1000
And we scroll up 300
When scrolling up 750
```

## 3. When I scroll to top

Scrolls to the very top of the current page.

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? to( the)* top( of the page)*$/
```

**Examples**

```gherkin
When I scroll to top
And we scroll to the top
When scrolling to the top of the page
```

## 4. When I scroll to the bottom

Scrolls to the bottom of the current page.

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? to( the)* bottom( of the page)*$/
```

**Examples**

```gherkin
When I scroll to the bottom
And we scroll to bottom
When scrolling to the bottom of the page
```

## 5. When I scroll to top of "#off-canvas"

Scrolls to the top of a specific element identified by a CSS selector.

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? to top of "([^"]*)"$/
```

**Examples**

```gherkin
When I scroll to top of "#off-canvas"
And we scroll to top of "#sidebar"
When scrolling to top of "#main-container"
```

## 6. When I scroll to bottom of "#off-canvas"

Scrolls to the bottom of a specific element identified by a CSS selector.

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? to bottom of "([^"]*)"$/
```

**Examples**

```gherkin
When I scroll to bottom of "#off-canvas"
And we scroll to bottom of "#sidebar"
When scrolling to bottom of "#main-container"
```

## 7. And I scroll right

Scrolls the page right by a custom number of pixels (default 350).

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? right(?: (\d+))?$/
```

**Examples**

```gherkin
And I scroll right
When I scroll right 1000
And we scroll right 300
When scrolling right 750
```

## 8. And I scroll left

Scrolls the page left by a custom number of pixels (default 350).

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? left(?: (\d+))?$/
```

**Examples**

```gherkin
And I scroll left
When I scroll left 800
And we scroll left 500
When scrolling left 1200
```

## 9. When I scroll to start

Scrolls to the start (horizontal origin) of the page.

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? to( the)* start( of the page)*$/
```

**Examples**

```gherkin
When I scroll to start
And we scroll to the start
When scrolling to the start of the page
```

## 10. When I scroll to the end

Scrolls to the end (horizontal maximum) of the page.

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? to( the)* end( of the page)*$/
```

**Examples**

```gherkin
When I scroll to the end
And we scroll to end
When scrolling to the end of the page
```

## 11. When I scroll to start of "#off-canvas"

Scrolls to the start of a specific element identified by a CSS selector.

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? to start of "([^"]*)"$/
```

**Examples**

```gherkin
When I scroll to start of "#off-canvas"
And we scroll to start of "#sidebar"
When scrolling to start of "#main-container"
```

## 12. When I scroll to end of "#off-canvas"

Scrolls to the end of a specific element identified by a CSS selector.

**Keyword**: `When`

**Pattern**

```js
/^(I scroll|we scroll|scrolling)? to end of "([^"]*)"$/
```

**Examples**

```gherkin
When I scroll to end of "#off-canvas"
And we scroll to end of "#sidebar"
When scrolling to end of "#main-container"
```
