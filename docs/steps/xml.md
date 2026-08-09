# XML responses steps

20 steps, defined in `tests/step-definitions/xml.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given the response content from the file "feed.xml"` |
| 2 | `Given the response content is the following:` |
| 3 | `Then the response should be in XML format` |
| 4 | `Then the response should not be in XML format` |
| 5 | `Then the XML element "/root/item" should exist` |
| 6 | `Then the XML element "/root/missing" should not exist` |
| 7 | `Then the XML element "/root/item" should be equal to "Hello"` |
| 8 | `Then the XML element "/root/item" should not be equal to "Bye"` |
| 9 | `Then the XML element "/root/item" should contain "Hello"` |
| 10 | `Then the XML element "/root/item" should not contain "Error"` |
| 11 | `Then the XML attribute "id" on element "/root/item" should exist` |
| 12 | `Then the XML attribute "deprecated" on element "/root/item" should not exist` |
| 13 | `Then the XML attribute "id" on element "/root/item" should be equal to "1"` |
| 14 | `Then the XML attribute "id" on element "/root/item" should not be equal to "0"` |
| 15 | `Then the XML attribute "id" on element "/root/item" should contain "abc"` |
| 16 | `Then the XML attribute "id" on element "/root/item" should not contain "old"` |
| 17 | `Then the XML element "//entry" should have 5 elements` |
| 18 | `Then the XML should use the namespace "http://www.w3.org/2005/Atom"` |
| 19 | `Then the XML should not use the namespace "http://example.com/legacy"` |
| 20 | `When I print last XML response` |

---

## 1. Given the response content from the file "feed.xml"

Load XML response content from a file under `tests/assets/`.

**Keyword**: `Given`

**Pattern**

```js
'the response content from the file {string}'
```

**Examples**

```gherkin
Given the response content from the file "feed.xml"
Given the response content from the file "rss.xml"
And the response content from the file "sitemap.xml"
Given the response content from the file "soap-response.xml"
Given the response content from the file "/tmp/sample.xml"
```

## 2. Given the response content is the following:

Set XML response content inline from a Gherkin doc string.

**Keyword**: `Given`

**Pattern**

```js
'the response content is the following:'
```

**Examples**

```gherkin
Given the response content is the following:
  """
  <root><item id="1">Hello</item></root>
  """
Given the response content is the following:
  """
  <feed><entry><title>Sample feed</title></entry></feed>
  """
And the response content is the following:
  """
  <orders><order id="1"><status>shipped</status></order></orders>
  """
Given the response content is the following:
  """
  <products><product><name>Laptop</name></product></products>
  """
Given the response content is the following:
  """
  <error code="404">Not found</error>
  """
```

## 3. Then the response should be in XML format

Assert the loaded response parses as XML.

**Keyword**: `Then`

**Pattern**

```js
'the response should be in XML format'
```

**Examples**

```gherkin
Then the response should be in XML format
Given the response content from the file "rss.xml"
  Then the response should be in XML format
And the response should be in XML format
Given the response content is the following:
  """
  <root/>
  """
  Then the response should be in XML format
Then the response should be in XML format
  And the XML element "/root" should exist
```

## 4. Then the response should not be in XML format

Assert the loaded response is NOT XML.

**Keyword**: `Then`

**Pattern**

```js
'the response should not be in XML format'
```

**Examples**

```gherkin
Then the response should not be in XML format
Given the response content is the following:
  """
  {"hello": "world"}
  """
  Then the response should not be in XML format
And the response should not be in XML format
Given the response content is the following:
  """
  plain text
  """
  Then the response should not be in XML format
Then the response should not be in XML format
  And I print last XML response
```

## 5. Then the XML element "/root/item" should exist

Assert at least one XML element matches an XPath.

**Keyword**: `Then`

**Pattern**

```js
'the XML element {string} should exist'
```

**Examples**

```gherkin
Then the XML element "/root/item" should exist
Then the XML element "//book/title" should exist
And the XML element "/order/customer" should exist
Then the XML element "//status" should exist
Then the XML element "/feed/entry[2]" should exist
```

## 6. Then the XML element "/root/missing" should not exist

Assert NO XML element matches an XPath.

**Keyword**: `Then`

**Pattern**

```js
'the XML element {string} should not exist'
```

**Examples**

```gherkin
Then the XML element "/root/missing" should not exist
Then the XML element "//error" should not exist
And the XML element "/feed/legacy" should not exist
Then the XML element "//deprecated" should not exist
Then the XML element "/order/refund" should not exist
```

## 7. Then the XML element "/root/item" should be equal to "Hello"

Assert an XML element's text content equals an expected value (trimmed).

**Keyword**: `Then`

**Pattern**

```js
'the XML element {string} should be equal to {string}'
```

**Examples**

```gherkin
Then the XML element "/root/item" should be equal to "Hello"
Then the XML element "//status" should be equal to "shipped"
And the XML element "/order/customer/name" should be equal to "Alice"
Then the XML element "/book/title" should be equal to "Sample title"
Then the XML element "//count" should be equal to "5"
```

## 8. Then the XML element "/root/item" should not be equal to "Bye"

Assert an XML element's text content is NOT equal to an expected value.

**Keyword**: `Then`

**Pattern**

```js
'the XML element {string} should not be equal to {string}'
```

**Examples**

```gherkin
Then the XML element "/root/item" should not be equal to "Bye"
Then the XML element "//status" should not be equal to "cancelled"
And the XML element "/order/customer/name" should not be equal to "Anonymous"
Then the XML element "/book/title" should not be equal to "Untitled"
Then the XML element "//count" should not be equal to "0"
```

## 9. Then the XML element "/root/item" should contain "Hello"

Assert an XML element's text content contains a substring.

**Keyword**: `Then`

**Pattern**

```js
'the XML element {string} should contain {string}'
```

**Examples**

```gherkin
Then the XML element "/root/item" should contain "Hello"
Then the XML element "//status" should contain "ship"
And the XML element "/order/customer/name" should contain "Alice"
Then the XML element "/book/title" should contain "Varbase E2E"
Then the XML element "/feed/entry/summary" should contain "release"
```

## 10. Then the XML element "/root/item" should not contain "Error"

Assert an XML element's text content does NOT contain a substring.

**Keyword**: `Then`

**Pattern**

```js
'the XML element {string} should not contain {string}'
```

**Examples**

```gherkin
Then the XML element "/root/item" should not contain "Error"
Then the XML element "//status" should not contain "fail"
And the XML element "/order/customer/name" should not contain "Anonymous"
Then the XML element "/book/title" should not contain "Untitled"
Then the XML element "/feed/entry/summary" should not contain "TODO"
```

## 11. Then the XML attribute "id" on element "/root/item" should exist

Assert an XML element has the named attribute.

**Keyword**: `Then`

**Pattern**

```js
'the XML attribute {string} on element {string} should exist'
```

**Examples**

```gherkin
Then the XML attribute "id" on element "/root/item" should exist
Then the XML attribute "lang" on element "/feed" should exist
And the XML attribute "type" on element "//entry" should exist
Then the XML attribute "version" on element "/rss" should exist
Then the XML attribute "code" on element "/error" should exist
```

## 12. Then the XML attribute "deprecated" on element "/root/item" should not exist

Assert an XML element does NOT have the named attribute.

**Keyword**: `Then`

**Pattern**

```js
'the XML attribute {string} on element {string} should not exist'
```

**Examples**

```gherkin
Then the XML attribute "deprecated" on element "/root/item" should not exist
Then the XML attribute "internal" on element "/feed" should not exist
And the XML attribute "secret" on element "//entry" should not exist
Then the XML attribute "private" on element "/rss" should not exist
Then the XML attribute "debug" on element "/error" should not exist
```

## 13. Then the XML attribute "id" on element "/root/item" should be equal to "1"

Assert an XML attribute equals an expected value.

**Keyword**: `Then`

**Pattern**

```js
'the XML attribute {string} on element {string} should be equal to {string}'
```

**Examples**

```gherkin
Then the XML attribute "id" on element "/root/item" should be equal to "1"
Then the XML attribute "lang" on element "/feed" should be equal to "en"
And the XML attribute "type" on element "//entry" should be equal to "html"
Then the XML attribute "version" on element "/rss" should be equal to "2.0"
Then the XML attribute "code" on element "/error" should be equal to "404"
```

## 14. Then the XML attribute "id" on element "/root/item" should not be equal to "0"

Assert an XML attribute is NOT equal to an expected value.

**Keyword**: `Then`

**Pattern**

```js
'the XML attribute {string} on element {string} should not be equal to {string}'
```

**Examples**

```gherkin
Then the XML attribute "id" on element "/root/item" should not be equal to "0"
Then the XML attribute "lang" on element "/feed" should not be equal to "xx"
And the XML attribute "type" on element "//entry" should not be equal to "binary"
Then the XML attribute "version" on element "/rss" should not be equal to "0.9"
Then the XML attribute "code" on element "/error" should not be equal to "200"
```

## 15. Then the XML attribute "id" on element "/root/item" should contain "abc"

Assert an XML attribute contains a substring.

**Keyword**: `Then`

**Pattern**

```js
'the XML attribute {string} on element {string} should contain {string}'
```

**Examples**

```gherkin
Then the XML attribute "id" on element "/root/item" should contain "abc"
Then the XML attribute "href" on element "//link" should contain "example.com"
And the XML attribute "type" on element "//entry" should contain "html"
Then the XML attribute "version" on element "/rss" should contain "2"
Then the XML attribute "code" on element "/error" should contain "4"
```

## 16. Then the XML attribute "id" on element "/root/item" should not contain "old"

Assert an XML attribute does NOT contain a substring.

**Keyword**: `Then`

**Pattern**

```js
'the XML attribute {string} on element {string} should not contain {string}'
```

**Examples**

```gherkin
Then the XML attribute "id" on element "/root/item" should not contain "old"
Then the XML attribute "href" on element "//link" should not contain "tracking"
And the XML attribute "type" on element "//entry" should not contain "binary"
Then the XML attribute "version" on element "/rss" should not contain "alpha"
Then the XML attribute "code" on element "/error" should not contain "5"
```

## 17. Then the XML element "//entry" should have 5 elements

Assert exactly N elements match an XPath.

**Keyword**: `Then`

**Pattern**

```js
'the XML element {string} should have {int} element(s)'
```

**Examples**

```gherkin
Then the XML element "//entry" should have 5 elements
Then the XML element "/root/item" should have 1 element
And the XML element "//error" should have 0 elements
Then the XML element "/feed/entry" should have 10 elements
Then the XML element "/orders/order" should have 3 elements
```

## 18. Then the XML should use the namespace "http://www.w3.org/2005/Atom"

Assert the XML root declares an `xmlns:*` namespace URI.

**Keyword**: `Then`

**Pattern**

```js
'the XML should use the namespace {string}'
```

**Examples**

```gherkin
Then the XML should use the namespace "http://www.w3.org/2005/Atom"
Then the XML should use the namespace "http://www.sitemaps.org/schemas/sitemap/0.9"
And the XML should use the namespace "http://schemas.xmlsoap.org/soap/envelope/"
Then the XML should use the namespace "http://www.w3.org/1999/xhtml"
Then the XML should use the namespace "http://www.opengis.net/gml"
```

## 19. Then the XML should not use the namespace "http://example.com/legacy"

Assert the XML root does NOT declare a namespace URI.

**Keyword**: `Then`

**Pattern**

```js
'the XML should not use the namespace {string}'
```

**Examples**

```gherkin
Then the XML should not use the namespace "http://example.com/legacy"
Then the XML should not use the namespace "http://example.com/internal"
And the XML should not use the namespace "http://example.com/v1"
Then the XML should not use the namespace "http://example.com/deprecated"
Then the XML should not use the namespace "http://example.com/private"
```

## 20. When I print last XML response

Print the most recently set raw XML response to stdout (debug aid).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*print last XML response$/
```

**Examples**

```gherkin
When I print last XML response
When I send a REST "GET" request to "/api/feed"
  And I print last XML response
And I print last XML response
Given the response content is the following:
  """
  <root/>
  """
  When I print last XML response
When I print last XML response
```
