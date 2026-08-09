# File downloads steps

8 steps, defined in `tests/step-definitions/file-download.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `When I download the file from the URL "/exports/users.csv"` |
| 2 | `When I download the file from the link "Download report"` |
| 3 | `Then the downloaded file should contain:` |
| 4 | `Then the downloaded file name should be "report.pdf"` |
| 5 | `Then the downloaded file name should contain "report"` |
| 6 | `Then the downloaded file should be a zip archive containing the following files named:` |
| 7 | `Then the downloaded file should be a zip archive containing the following files partially named:` |
| 8 | `Then the downloaded file should be a zip archive not containing the following files partially named:` |

---

## 1. When I download the file from the URL "/exports/users.csv"

Download the file at a URL using the browser's request context. The result
is captured on `this._lastDownload` for follow-up assertions.

Relative paths are joined to `launchUrl`. Absolute URLs (`http(s)://...`)
are used as-is.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*download the file from the URL "([^"]*)"$/
```

**Examples**

```gherkin
When I download the file from the URL "/exports/users.csv"
When I download the file from the URL "https://example.com/doc.pdf"
And we download the file from the URL "/api/report?format=pdf"
When I download the file from the URL "/files/logo.svg"
When I download the file from the URL "/exports/data-2026.json"
```

## 2. When I download the file from the link "Download report"

Click a link by visible text and capture the resulting download.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*download the file from the link "([^"]*)"$/
```

**Examples**

```gherkin
When I download the file from the link "Download report"
When I download the file from the link "Export CSV"
And we download the file from the link "Get logo"
When I download the file from the link "Download archive"
When I download the file from the link "Export JSON"
```

## 3. Then the downloaded file should contain:

Assert the most recent download's body contains an expected substring.

Body is decoded as UTF-8.

**Keyword**: `Then`

**Pattern**

```js
'the downloaded file should contain:'
```

**Examples**

```gherkin
Then the downloaded file should contain:
  """
  Order #1234
  """
Then the downloaded file should contain:
  """
  name,email
  """
And the downloaded file should contain:
  """
  <svg
  """
Then the downloaded file should contain:
  """
  "version": "1.0"
  """
Then the downloaded file should contain:
  """
  %PDF-
  """
```

## 4. Then the downloaded file name should be "report.pdf"

Assert the most recent download's filename equals an expected value.

**Keyword**: `Then`

**Pattern**

```js
'the downloaded file name should be {string}'
```

**Examples**

```gherkin
Then the downloaded file name should be "report.pdf"
Then the downloaded file name should be "users.csv"
And the downloaded file name should be "logo.svg"
Then the downloaded file name should be "archive.zip"
Then the downloaded file name should be "data-2026.json"
```

## 5. Then the downloaded file name should contain "report"

Assert the most recent download's filename contains a substring.

Useful when filenames embed timestamps or hashes.

**Keyword**: `Then`

**Pattern**

```js
'the downloaded file name should contain {string}'
```

**Examples**

```gherkin
Then the downloaded file name should contain "report"
Then the downloaded file name should contain ".pdf"
And the downloaded file name should contain "2026"
Then the downloaded file name should contain "users"
Then the downloaded file name should contain "export"
```

## 6. Then the downloaded file should be a zip archive containing the following files named:

(Pending) Assert the downloaded ZIP archive contains the listed filenames exactly.

**Keyword**: `Then`

**Pattern**

```js
'the downloaded file should be a zip archive containing the following files named:'
```

**Examples**

```gherkin
Then the downloaded file should be a zip archive containing the following files named:
  | report.pdf  |
  | summary.csv |
Then the downloaded file should be a zip archive containing the following files named:
  | a.txt | b.txt |
Then the downloaded file should be a zip archive containing the following files named:
  | data.json |
Then the downloaded file should be a zip archive containing the following files named:
  | logo.svg | favicon.ico |
Then the downloaded file should be a zip archive containing the following files named:
  | manifest.json |
```

## 7. Then the downloaded file should be a zip archive containing the following files partially named:

(Pending) Assert the downloaded ZIP contains files whose names contain the listed substrings.

**Keyword**: `Then`

**Pattern**

```js
'the downloaded file should be a zip archive containing the following files partially named:'
```

**Examples**

```gherkin
Then the downloaded file should be a zip archive containing the following files partially named:
  | report |
  | csv    |
Then the downloaded file should be a zip archive containing the following files partially named:
  | 2026 |
Then the downloaded file should be a zip archive containing the following files partially named:
  | json |
Then the downloaded file should be a zip archive containing the following files partially named:
  | logo | favicon |
Then the downloaded file should be a zip archive containing the following files partially named:
  | manifest |
```

## 8. Then the downloaded file should be a zip archive not containing the following files partially named:

(Pending) Assert the downloaded ZIP does NOT contain files whose names contain the listed substrings.

**Keyword**: `Then`

**Pattern**

```js
'the downloaded file should be a zip archive not containing the following files partially named:'
```

**Examples**

```gherkin
Then the downloaded file should be a zip archive not containing the following files partially named:
  | secret |
  | .env   |
Then the downloaded file should be a zip archive not containing the following files partially named:
  | private |
Then the downloaded file should be a zip archive not containing the following files partially named:
  | tmp |
Then the downloaded file should be a zip archive not containing the following files partially named:
  | DS_Store |
Then the downloaded file should be a zip archive not containing the following files partially named:
  | __MACOSX |
```
