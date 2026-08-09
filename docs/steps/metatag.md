# Meta tags steps

3 steps, defined in `tests/step-definitions/metatag.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then the meta tag should exist with the following attributes:` |
| 2 | `Then the meta tag should not exist with the following attributes:` |
| 3 | `Then the "description" meta tag should not contain any HTML tags` |

---

## 1. Then the meta tag should exist with the following attributes:

Assert at least one `<meta>` tag matches every attribute in the data table.

**Keyword**: `Then`

**Pattern**

```js
'the meta tag should exist with the following attributes:'
```

**Examples**

```gherkin
Then the meta tag should exist with the following attributes:
  | name    | description                |
  | content | Documentation site          |
Then the meta tag should exist with the following attributes:
  | property | og:title    |
  | content  | Home        |
And the meta tag should exist with the following attributes:
  | name    | viewport                          |
  | content | width=device-width, initial-scale=1 |
Then the meta tag should exist with the following attributes:
  | name    | robots         |
  | content | noindex,nofollow |
Then the meta tag should exist with the following attributes:
  | charset | UTF-8 |
```

## 2. Then the meta tag should not exist with the following attributes:

Assert NO `<meta>` tag matches every attribute in the data table.

**Keyword**: `Then`

**Pattern**

```js
'the meta tag should not exist with the following attributes:'
```

**Examples**

```gherkin
Then the meta tag should not exist with the following attributes:
  | name    | description     |
  | content | Coming soon     |
Then the meta tag should not exist with the following attributes:
  | name    | robots          |
  | content | noindex         |
And the meta tag should not exist with the following attributes:
  | property | og:title       |
  | content  | Placeholder    |
Then the meta tag should not exist with the following attributes:
  | http-equiv | refresh       |
  | content    | 5             |
Then the meta tag should not exist with the following attributes:
  | name    | author          |
  | content | Anonymous       |
```

## 3. Then the "description" meta tag should not contain any HTML tags

Assert the `content` attribute of a named meta tag contains no HTML markup.
Useful for description / open-graph fields that should render as plain text.

**Keyword**: `Then`

**Pattern**

```js
'the {string} meta tag should not contain any HTML tags'
```

**Examples**

```gherkin
Then the "description" meta tag should not contain any HTML tags
Then the "og:title" meta tag should not contain any HTML tags
And the "twitter:description" meta tag should not contain any HTML tags
Then the "keywords" meta tag should not contain any HTML tags
Then the "author" meta tag should not contain any HTML tags
```
