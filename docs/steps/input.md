# Pointer input steps

9 steps, defined in `tests/step-definitions/input.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I hover over "#nav-products"` |
| 2 | `When I move the pointer to "#cta"` |
| 3 | `When I double-click on "#row-1"` |
| 4 | `When I right-click on "#row-1"` |
| 5 | `When I middle-click on "a.external"` |
| 6 | `When I click on "#row-1" while holding "Shift"` |
| 7 | `When I drag "#card-1" to "#column-done"` |
| 8 | `When I set the viewport size to 1280x720` |
| 9 | `When I tap on "#cta"` |

---

## 1. When I hover over "#nav-products"

Hover the mouse pointer over a CSS-addressed element.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*hover over "([^"]*)"$/
```

**Examples**

```gherkin
When I hover over "#nav-products"
When I hover over ".tooltip-trigger"
And we hover over "[data-testid=user-menu]"
When I hover over "button.help"
When I hover over ".chart-bar:nth-child(3)"
```

## 2. When I move the pointer to "#cta"

Move the mouse pointer over a CSS-addressed element (alias for hover).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*move the pointer to "([^"]*)"$/
```

**Examples**

```gherkin
When I move the pointer to "#cta"
When we move the pointer to ".dropdown-trigger"
And I move the pointer to "[data-testid=avatar]"
When I move the pointer to "img.gallery-thumb"
When I move the pointer to ".legend-item"
```

## 3. When I double-click on "#row-1"

Double-click on a CSS-addressed element.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*double[- ]click on "([^"]*)"$/
```

**Examples**

```gherkin
When I double-click on "#row-1"
When I double click on ".file-tile"
And we double-click on "[data-testid=cell-A1]"
When I double-click on "img.editable"
When I double click on "td.editable-cell"
```

## 4. When I right-click on "#row-1"

Right-click (context menu) on a CSS-addressed element.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*right[- ]click on "([^"]*)"$/
```

**Examples**

```gherkin
When I right-click on "#row-1"
When I right click on ".tree-node"
And we right-click on "[data-testid=image]"
When I right-click on "li.contact"
When I right click on "td.cell"
```

## 5. When I middle-click on "a.external"

Middle-click on a CSS-addressed element.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*middle[- ]click on "([^"]*)"$/
```

**Examples**

```gherkin
When I middle-click on "a.external"
When I middle click on "#tab-2"
And we middle-click on "[data-testid=link]"
When I middle-click on "li.bookmark"
When I middle click on "a.product-link"
```

## 6. When I click on "#row-1" while holding "Shift"

Click on a CSS-addressed element while holding a modifier key.

Modifier names follow Playwright: `Shift`, `Control`, `Alt`, `Meta`.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*click on "([^"]*)" while holding "([^"]*)"$/
```

**Examples**

```gherkin
When I click on "#row-1" while holding "Shift"
When I click on ".checkbox" while holding "Control"
And we click on "a.external" while holding "Meta"
When I click on ".item" while holding "Alt"
When I click on "#tab-2" while holding "Shift"
```

## 7. When I drag "#card-1" to "#column-done"

Drag a source element onto a target element.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*drag "([^"]*)" to "([^"]*)"$/
```

**Examples**

```gherkin
When I drag "#card-1" to "#column-done"
When I drag ".file-tile" to "#trash"
And we drag "[data-testid=task-1]" to "[data-testid=in-progress]"
When I drag "#image" to "#canvas"
When I drag "li.draggable" to "ul.dropzone"
```

## 8. When I set the viewport size to 1280x720

Resize the browser viewport to a specific WxH.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*set the viewport size to (\d+)x(\d+)$/
```

**Examples**

```gherkin
When I set the viewport size to 1280x720
When I set the viewport size to 375x667
And we set the viewport size to 768x1024
When I set the viewport size to 1920x1080
When I set the viewport size to 320x568
```

## 9. When I tap on "#cta"

Touch-tap a CSS-addressed element. Falls back to a regular click if the
browser context was not opened with `hasTouch: true`.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*tap on "([^"]*)"$/
```

**Examples**

```gherkin
When I tap on "#cta"
When I tap on ".bottom-nav-item"
And we tap on "[data-testid=fab]"
When I tap on "button.menu"
When I tap on ".swipe-card"
```
