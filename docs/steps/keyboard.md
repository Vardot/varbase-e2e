# Keyboard steps

4 steps, defined in `tests/step-definitions/keyboard.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I press the key "Enter"` |
| 2 | `When I press the key "Enter" on the element "#search"` |
| 3 | `When I press the keys "Control+a"` |
| 4 | `When I press the keys "Control+a" on the element "#editor"` |

---

## 1. When I press the key "Enter"

Press a single key against the page (whatever element is currently focused).

Common aliases (`enter`, `tab`, `esc`, `space`, `up/down/left/right`) are
normalised to Playwright's canonical key names.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*press the key "([^"]*)"$/
```

**Examples**

```gherkin
When I press the key "Enter"
When I press the key "Escape"
And I press the key "Tab"
When I press the key "ArrowDown"
When I focus on the element "#search"
  And I press the key "Enter"
```

## 2. When I press the key "Enter" on the element "#search"

Press a single key while a specific element is focused.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*press the key "([^"]*)" on the element "([^"]*)"$/
```

**Examples**

```gherkin
When I press the key "Enter" on the element "#search"
When I press the key "Tab" on the element "input[type=email]"
And I press the key "ArrowDown" on the element ".combobox"
When I press the key "Backspace" on the element "#name"
When I press the key "Escape" on the element "[role=dialog]"
```

## 3. When I press the keys "Control+a"

Press a key combination against the page. Combos use `+` between modifiers
and the final key (e.g. `Control+a`, `Meta+s`, `Shift+Tab`).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*press the keys "([^"]*)"$/
```

**Examples**

```gherkin
When I press the keys "Control+a"
When I press the keys "Meta+s"
And I press the keys "Shift+Tab"
When I press the keys "Alt+ArrowLeft"
When I press the keys "Control+Shift+P"
```

## 4. When I press the keys "Control+a" on the element "#editor"

Press a key combination while a specific element is focused.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*press the keys "([^"]*)" on the element "([^"]*)"$/
```

**Examples**

```gherkin
When I press the keys "Control+a" on the element "#editor"
When I press the keys "Meta+s" on the element "form"
And I press the keys "Shift+Tab" on the element "#email"
When I press the keys "Control+Enter" on the element "#message"
When I press the keys "Alt+Down" on the element ".combobox"
```
