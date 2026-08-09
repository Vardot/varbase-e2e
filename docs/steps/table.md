# Tables steps

8 steps, defined in `tests/step-definitions/table.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Then the table "#users" should have 5 rows` |
| 2 | `Then the table "#users" should have 4 columns` |
| 3 | `Then the table "#users" should contain the following columns:` |
| 4 | `Then the table "#users" should be empty` |
| 5 | `Then the table "#users" should not be empty` |
| 6 | `Then the table "#users" should be sorted by "Name" in "ascending" order` |
| 7 | `Then the table "#users" should contain the following rows:` |
| 8 | `Then the "Alice" row should contain the following:` |

---

## 1. Then the table "#users" should have 5 rows

Assert a table has exactly N body rows.

**Keyword**: `Then`

**Pattern**

```js
'the table {string} should have {int} row(s)'
```

**Examples**

```gherkin
Then the table "#users" should have 5 rows
Then the table "table.orders" should have 1 row
And the table "[data-testid=products]" should have 12 rows
Then the table "#audit-log" should have 0 rows
Then the table "table.responsive" should have 20 rows
```

## 2. Then the table "#users" should have 4 columns

Assert a table has exactly N columns.

**Keyword**: `Then`

**Pattern**

```js
'the table {string} should have {int} column(s)'
```

**Examples**

```gherkin
Then the table "#users" should have 4 columns
Then the table "table.orders" should have 6 columns
And the table "[data-testid=products]" should have 5 columns
Then the table "#summary" should have 2 columns
Then the table "table.responsive" should have 8 columns
```

## 3. Then the table "#users" should contain the following columns:

Assert the table header contains every column listed in the table.

**Keyword**: `Then`

**Pattern**

```js
'the table {string} should contain the following columns:'
```

**Examples**

```gherkin
Then the table "#users" should contain the following columns:
  | Name |
  | Email |
Then the table "table.orders" should contain the following columns:
  | Order ID | Status | Total |
And the table "[data-testid=products]" should contain the following columns:
  | Title | Price | Stock |
Then the table "#audit-log" should contain the following columns:
  | Timestamp | Actor | Action |
Then the table ".grid" should contain the following columns:
  | Country | Population | Capital |
```

## 4. Then the table "#users" should be empty

Assert a table has zero body rows.

**Keyword**: `Then`

**Pattern**

```js
'the table {string} should be empty'
```

**Examples**

```gherkin
Then the table "#users" should be empty
Then the table "table.orders" should be empty
And the table "[data-testid=products]" should be empty
Then the table "#audit-log" should be empty
Then the table ".grid" should be empty
```

## 5. Then the table "#users" should not be empty

Assert a table has at least one body row.

**Keyword**: `Then`

**Pattern**

```js
'the table {string} should not be empty'
```

**Examples**

```gherkin
Then the table "#users" should not be empty
Then the table "table.orders" should not be empty
And the table "[data-testid=products]" should not be empty
Then the table "#audit-log" should not be empty
Then the table ".grid" should not be empty
```

## 6. Then the table "#users" should be sorted by "Name" in "ascending" order

Assert a table is sorted ascending or descending by a header.

Direction accepts `ascending` / `asc` / `descending` / `desc`.

**Keyword**: `Then`

**Pattern**

```js
'the table {string} should be sorted by {string} in {string} order'
```

**Examples**

```gherkin
Then the table "#users" should be sorted by "Name" in "ascending" order
Then the table "table.orders" should be sorted by "Total" in "descending" order
And the table "[data-testid=products]" should be sorted by "Price" in "asc" order
Then the table "#audit-log" should be sorted by "Timestamp" in "desc" order
Then the table ".grid" should be sorted by "Country" in "ascending" order
```

## 7. Then the table "#users" should contain the following rows:

Assert a table contains every row described by the data table (substring match per cell).

**Keyword**: `Then`

**Pattern**

```js
'the table {string} should contain the following rows:'
```

**Examples**

```gherkin
Then the table "#users" should contain the following rows:
  | Alice | Editor |
  | Bob   | Admin  |
Then the table "table.orders" should contain the following rows:
  | 1234 | Shipped   |
  | 5678 | Cancelled |
And the table "[data-testid=products]" should contain the following rows:
  | Laptop | $999.00 |
Then the table "#audit-log" should contain the following rows:
  | login |
Then the table ".grid" should contain the following rows:
  | Jordan | Amman |
```

## 8. Then the "Alice" row should contain the following:

Assert a row containing a given text fragment also contains every listed cell value.

**Keyword**: `Then`

**Pattern**

```js
'the {string} row should contain the following:'
```

**Examples**

```gherkin
Then the "Alice" row should contain the following:
  | Editor |
  | Active |
Then the "Order #1234" row should contain the following:
  | Shipped |
And the "Project Alpha" row should contain the following:
  | Open    |
  | High    |
Then the "alice@example.com" row should contain the following:
  | Admin |
Then the "Premium" row should contain the following:
  | $99 |
```
