# YAML responses steps

38 steps, defined in `tests/step-definitions/yaml.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given the YAML response content from the file "config.yml"` |
| 2 | `Given the YAML response content is the following:` |
| 3 | `Given the active YAML document is 1` |
| 4 | `Then the YAML response should have 1 document` |
| 5 | `Then the response should be in YAML format` |
| 6 | `Then the response should not be in YAML format` |
| 7 | `Then the YAML should have no duplicate keys` |
| 8 | `Then the YAML element "/name" should exist` |
| 9 | `Then the YAML element "/missing" should not exist` |
| 10 | `Then the YAML element "/name" should be equal to "example"` |
| 11 | `Then the YAML element "/name" should not be equal to "Other"` |
| 12 | `Then the YAML element "/name" should contain "Web"` |
| 13 | `Then the YAML element "/name" should not contain "Error"` |
| 14 | `Then the YAML attribute "id" on element "/items/0" should exist` |
| 15 | `Then the YAML attribute "deprecated" on element "/items/0" should not exist` |
| 16 | `Then the YAML attribute "id" on element "/items/0" should be equal to "1"` |
| 17 | `Then the YAML attribute "id" on element "/items/0" should not be equal to "0"` |
| 18 | `Then the YAML attribute "id" on element "/items/0" should contain "abc"` |
| 19 | `Then the YAML attribute "id" on element "/items/0" should not contain "old"` |
| 20 | `Then the YAML element "/items" should have 5 elements` |
| 21 | `Then the YAML value at "/spec/replicas" should be of type "integer"` |
| 22 | `Then the YAML value at "/labels" should be empty` |
| 23 | `Then the YAML value at "/items" should not be empty` |
| 24 | `Then the YAML value at "/spec/replicas" should be greater than 0` |
| 25 | `Then the YAML value at "/spec/replicas" should be greater than or equal to 1` |
| 26 | `Then the YAML value at "/spec/replicas" should be less than 100` |
| 27 | `Then the YAML value at "/spec/replicas" should be less than or equal to 10` |
| 28 | `Then the YAML value at "/spec/replicas" should be between 1 and 10` |
| 29 | `Then the YAML array at "/spec/containers" should contain an item where "/name" is "nginx"` |
| 30 | `Then the YAML array at "/spec/containers" should contain no item where "/image" is "alpine:latest"` |
| 31 | `Then every item in "/spec/containers" should have key "image"` |
| 32 | `Then the YAML keys at "/metadata" should be exactly "name, namespace, labels"` |
| 33 | `Then the YAML at "/metadata" should have keys "name, namespace"` |
| 34 | `Then the YAML should match JSON Schema "schemas/deployment.json"` |
| 35 | `Then the YAML should equal the file "expected.yaml" ignoring keys "/metadata/resourceVersion"` |
| 36 | `Then the YAML should use the namespace "v1"` |
| 37 | `Then the YAML should not use the namespace "v0"` |
| 38 | `When I print last YAML response` |

---

## 1. Given the YAML response content from the file "config.yml"

Load YAML response content from a file under `tests/assets/`.

Multi-document streams (`---`) are parsed via `loadAll`. The first document
becomes the default; switch with `Given the active YAML document is N`.

**Keyword**: `Given`

**Pattern**

```js
'the YAML response content from the file {string}'
```

**Examples**

```gherkin
Given the YAML response content from the file "config.yml"
Given the YAML response content from the file "openapi.yaml"
And the YAML response content from the file "users.yml"
Given the YAML response content from the file "k8s-deployment.yaml"
Given the YAML response content from the file "/tmp/sample.yml"
```

## 2. Given the YAML response content is the following:

Set YAML response content inline from a Gherkin doc string. Supports
multi-document streams.

**Keyword**: `Given`

**Pattern**

```js
'the YAML response content is the following:'
```

**Examples**

```gherkin
Given the YAML response content is the following:
  """
  name: example
  version: 1.0.0
  """
Given the YAML response content is the following:
  """
  items:
  - id: 1
  title: Hello
  """
And the YAML response content is the following:
  """
  status: ok
  count: 5
  """
Given the YAML response content is the following:
  """
  apiVersion: v1
  kind: ConfigMap
  ---
  apiVersion: v1
  kind: Service
  """
Given the YAML response content is the following:
  """
  error:
  code: 404
  message: Not found
  """
```

## 3. Given the active YAML document is 1

Switch the active document for subsequent assertions. Index is 1-based to
match how Helm / `kubectl get -o yaml` users describe documents.

**Keyword**: `Given`

**Pattern**

```js
'the active YAML document is {int}'
```

**Examples**

```gherkin
Given the active YAML document is 1
Given the active YAML document is 2
And the active YAML document is 3
Given the active YAML document is 1
  Then the YAML element "/kind" should be equal to "ConfigMap"
Given the active YAML document is 2
  Then the YAML element "/kind" should be equal to "Service"
```

## 4. Then the YAML response should have 1 document

Assert the multi-document stream has exactly N documents.

**Keyword**: `Then`

**Pattern**

```js
'the YAML response should have {int} document(s)'
```

**Examples**

```gherkin
Then the YAML response should have 1 document
Then the YAML response should have 2 documents
And the YAML response should have 5 documents
Then the YAML response should have 0 documents
Then the YAML response should have 10 documents
```

## 5. Then the response should be in YAML format

Assert the loaded response parses as YAML.

**Keyword**: `Then`

**Pattern**

```js
'the response should be in YAML format'
```

**Examples**

```gherkin
Then the response should be in YAML format
Given the YAML response content from the file "openapi.yaml"
  Then the response should be in YAML format
And the response should be in YAML format
Given the YAML response content is the following:
  """
  key: value
  """
  Then the response should be in YAML format
Then the response should be in YAML format
  And the YAML element "/key" should exist
```

## 6. Then the response should not be in YAML format

Assert the loaded response is NOT valid YAML.

**Keyword**: `Then`

**Pattern**

```js
'the response should not be in YAML format'
```

**Examples**

```gherkin
Then the response should not be in YAML format
Given the YAML response content is the following:
  """
  <not> yaml </not>
  """
  Then the response should not be in YAML format
And the response should not be in YAML format
Given the YAML response content is the following:
  """
  key: : :
  """
  Then the response should not be in YAML format
Then the response should not be in YAML format
  And I print last YAML response
```

## 7. Then the YAML should have no duplicate keys

Assert the YAML has no duplicate keys at any level. Uses js-yaml's
`onWarning` hook (duplicates raise warnings under default schema).

**Keyword**: `Then`

**Pattern**

```js
'the YAML should have no duplicate keys'
```

**Examples**

```gherkin
Then the YAML should have no duplicate keys
Given the YAML response content is the following:
  """
  name: A
  version: 1
  """
  Then the YAML should have no duplicate keys
And the YAML should have no duplicate keys
Then the YAML should have no duplicate keys
  And the YAML element "/name" should be equal to "A"
Then the YAML should have no duplicate keys
```

## 8. Then the YAML element "/name" should exist

Assert at least one YAML node matches a path.

**Keyword**: `Then`

**Pattern**

```js
'the YAML element {string} should exist'
```

**Examples**

```gherkin
Then the YAML element "/name" should exist
Then the YAML element "/items/0/title" should exist
And the YAML element "/error/code" should exist
Then the YAML element "/spec/replicas" should exist
Then the YAML element "/users/2/email" should exist
```

## 9. Then the YAML element "/missing" should not exist

Assert NO YAML node matches a path.

**Keyword**: `Then`

**Pattern**

```js
'the YAML element {string} should not exist'
```

**Examples**

```gherkin
Then the YAML element "/missing" should not exist
Then the YAML element "/items/100" should not exist
And the YAML element "/legacy/field" should not exist
Then the YAML element "/spec/internal" should not exist
Then the YAML element "/error/refund" should not exist
```

## 10. Then the YAML element "/name" should be equal to "example"

Assert a YAML node's scalar value equals an expected value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML element {string} should be equal to {string}'
```

**Examples**

```gherkin
Then the YAML element "/name" should be equal to "example"
Then the YAML element "/version" should be equal to "2.5.2"
And the YAML element "/items/0/title" should be equal to "Hello"
Then the YAML element "/error/code" should be equal to "404"
Then the YAML element "/status" should be equal to "ok"
```

## 11. Then the YAML element "/name" should not be equal to "Other"

Assert a YAML node's scalar value is NOT equal to an expected value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML element {string} should not be equal to {string}'
```

**Examples**

```gherkin
Then the YAML element "/name" should not be equal to "Other"
Then the YAML element "/version" should not be equal to "1.0.0"
And the YAML element "/items/0/title" should not be equal to "Bye"
Then the YAML element "/error/code" should not be equal to "200"
Then the YAML element "/status" should not be equal to "fail"
```

## 12. Then the YAML element "/name" should contain "Web"

Assert a YAML node's serialised value contains a substring.

**Keyword**: `Then`

**Pattern**

```js
'the YAML element {string} should contain {string}'
```

**Examples**

```gherkin
Then the YAML element "/name" should contain "Web"
Then the YAML element "/items/0/title" should contain "Hello"
And the YAML element "/spec" should contain "replicas"
Then the YAML element "/error/message" should contain "Not"
Then the YAML element "/status" should contain "ok"
```

## 13. Then the YAML element "/name" should not contain "Error"

Assert a YAML node's serialised value does NOT contain a substring.

**Keyword**: `Then`

**Pattern**

```js
'the YAML element {string} should not contain {string}'
```

**Examples**

```gherkin
Then the YAML element "/name" should not contain "Error"
Then the YAML element "/items/0/title" should not contain "fail"
And the YAML element "/spec" should not contain "deprecated"
Then the YAML element "/error/message" should not contain "OK"
Then the YAML element "/status" should not contain "fatal"
```

## 14. Then the YAML attribute "id" on element "/items/0" should exist

Assert a YAML node has a direct child key.

**Keyword**: `Then`

**Pattern**

```js
'the YAML attribute {string} on element {string} should exist'
```

**Examples**

```gherkin
Then the YAML attribute "id" on element "/items/0" should exist
Then the YAML attribute "kind" on element "/" should exist
And the YAML attribute "code" on element "/error" should exist
Then the YAML attribute "replicas" on element "/spec" should exist
Then the YAML attribute "email" on element "/users/0" should exist
```

## 15. Then the YAML attribute "deprecated" on element "/items/0" should not exist

Assert a YAML node does NOT have a direct child key.

**Keyword**: `Then`

**Pattern**

```js
'the YAML attribute {string} on element {string} should not exist'
```

**Examples**

```gherkin
Then the YAML attribute "deprecated" on element "/items/0" should not exist
Then the YAML attribute "secret" on element "/" should not exist
And the YAML attribute "internal" on element "/spec" should not exist
Then the YAML attribute "private" on element "/error" should not exist
Then the YAML attribute "_legacy" on element "/users/0" should not exist
```

## 16. Then the YAML attribute "id" on element "/items/0" should be equal to "1"

Assert a YAML child key's value equals an expected value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML attribute {string} on element {string} should be equal to {string}'
```

**Examples**

```gherkin
Then the YAML attribute "id" on element "/items/0" should be equal to "1"
Then the YAML attribute "kind" on element "/" should be equal to "ConfigMap"
And the YAML attribute "code" on element "/error" should be equal to "404"
Then the YAML attribute "replicas" on element "/spec" should be equal to "3"
Then the YAML attribute "version" on element "/" should be equal to "v1"
```

## 17. Then the YAML attribute "id" on element "/items/0" should not be equal to "0"

Assert a YAML child key's value is NOT equal to an expected value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML attribute {string} on element {string} should not be equal to {string}'
```

**Examples**

```gherkin
Then the YAML attribute "id" on element "/items/0" should not be equal to "0"
Then the YAML attribute "kind" on element "/" should not be equal to "Secret"
And the YAML attribute "code" on element "/error" should not be equal to "200"
Then the YAML attribute "replicas" on element "/spec" should not be equal to "0"
Then the YAML attribute "version" on element "/" should not be equal to "v0"
```

## 18. Then the YAML attribute "id" on element "/items/0" should contain "abc"

Assert a YAML child key's serialised value contains a substring.

**Keyword**: `Then`

**Pattern**

```js
'the YAML attribute {string} on element {string} should contain {string}'
```

**Examples**

```gherkin
Then the YAML attribute "id" on element "/items/0" should contain "abc"
Then the YAML attribute "image" on element "/spec" should contain "nginx"
And the YAML attribute "kind" on element "/" should contain "Map"
Then the YAML attribute "version" on element "/" should contain "v"
Then the YAML attribute "code" on element "/error" should contain "4"
```

## 19. Then the YAML attribute "id" on element "/items/0" should not contain "old"

Assert a YAML child key's serialised value does NOT contain a substring.

**Keyword**: `Then`

**Pattern**

```js
'the YAML attribute {string} on element {string} should not contain {string}'
```

**Examples**

```gherkin
Then the YAML attribute "id" on element "/items/0" should not contain "old"
Then the YAML attribute "image" on element "/spec" should not contain "alpine"
And the YAML attribute "kind" on element "/" should not contain "Secret"
Then the YAML attribute "version" on element "/" should not contain "alpha"
Then the YAML attribute "code" on element "/error" should not contain "5"
```

## 20. Then the YAML element "/items" should have 5 elements

Assert a YAML sequence / mapping at a path has exactly N entries.

**Keyword**: `Then`

**Pattern**

```js
'the YAML element {string} should have {int} element(s)'
```

**Examples**

```gherkin
Then the YAML element "/items" should have 5 elements
Then the YAML element "/users" should have 3 elements
And the YAML element "/spec/containers" should have 1 element
Then the YAML element "/errors" should have 0 elements
Then the YAML element "/feed/entries" should have 10 elements
```

## 21. Then the YAML value at "/spec/replicas" should be of type "integer"

Assert a YAML node's type. Accepts: string, integer, number, boolean,
array, object, null.

**Keyword**: `Then`

**Pattern**

```js
'the YAML value at {string} should be of type {string}'
```

**Examples**

```gherkin
Then the YAML value at "/spec/replicas" should be of type "integer"
Then the YAML value at "/metadata/name" should be of type "string"
And the YAML value at "/spec/containers" should be of type "array"
Then the YAML value at "/spec" should be of type "object"
Then the YAML value at "/spec/paused" should be of type "boolean"
```

## 22. Then the YAML value at "/labels" should be empty

Assert a YAML node is empty: empty string, empty array, empty object, or null.

**Keyword**: `Then`

**Pattern**

```js
'the YAML value at {string} should be empty'
```

**Examples**

```gherkin
Then the YAML value at "/labels" should be empty
Then the YAML value at "/items" should be empty
And the YAML value at "/error" should be empty
Then the YAML value at "/notes" should be empty
Then the YAML value at "/status/conditions" should be empty
```

## 23. Then the YAML value at "/items" should not be empty

Assert a YAML node is non-empty.

**Keyword**: `Then`

**Pattern**

```js
'the YAML value at {string} should not be empty'
```

**Examples**

```gherkin
Then the YAML value at "/items" should not be empty
Then the YAML value at "/spec/containers" should not be empty
And the YAML value at "/metadata/name" should not be empty
Then the YAML value at "/users" should not be empty
Then the YAML value at "/spec/replicas" should not be empty
```

## 24. Then the YAML value at "/spec/replicas" should be greater than 0

Assert a numeric YAML node is greater than a value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML value at {string} should be greater than {float}'
```

**Examples**

```gherkin
Then the YAML value at "/spec/replicas" should be greater than 0
Then the YAML value at "/timeout" should be greater than 5
And the YAML value at "/spec/minReadySeconds" should be greater than 0
Then the YAML value at "/limits/cpu" should be greater than 100
Then the YAML value at "/version/major" should be greater than 1
```

## 25. Then the YAML value at "/spec/replicas" should be greater than or equal to 1

Assert a numeric YAML node is greater than or equal to a value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML value at {string} should be greater than or equal to {float}'
```

**Examples**

```gherkin
Then the YAML value at "/spec/replicas" should be greater than or equal to 1
Then the YAML value at "/retries" should be greater than or equal to 0
And the YAML value at "/timeout" should be greater than or equal to 30
Then the YAML value at "/version/major" should be greater than or equal to 2
Then the YAML value at "/limits/cpu" should be greater than or equal to 250
```

## 26. Then the YAML value at "/spec/replicas" should be less than 100

Assert a numeric YAML node is less than a value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML value at {string} should be less than {float}'
```

**Examples**

```gherkin
Then the YAML value at "/spec/replicas" should be less than 100
Then the YAML value at "/error/code" should be less than 500
And the YAML value at "/timeout" should be less than 60
Then the YAML value at "/version/minor" should be less than 10
Then the YAML value at "/cost" should be less than 1000
```

## 27. Then the YAML value at "/spec/replicas" should be less than or equal to 10

Assert a numeric YAML node is less than or equal to a value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML value at {string} should be less than or equal to {float}'
```

**Examples**

```gherkin
Then the YAML value at "/spec/replicas" should be less than or equal to 10
Then the YAML value at "/retries" should be less than or equal to 5
And the YAML value at "/timeout" should be less than or equal to 60
Then the YAML value at "/error/code" should be less than or equal to 599
Then the YAML value at "/version/major" should be less than or equal to 3
```

## 28. Then the YAML value at "/spec/replicas" should be between 1 and 10

Assert a numeric YAML node falls within an inclusive range.

**Keyword**: `Then`

**Pattern**

```js
'the YAML value at {string} should be between {float} and {float}'
```

**Examples**

```gherkin
Then the YAML value at "/spec/replicas" should be between 1 and 10
Then the YAML value at "/timeout" should be between 5 and 60
And the YAML value at "/error/code" should be between 400 and 499
Then the YAML value at "/cpu" should be between 100 and 1000
Then the YAML value at "/version/major" should be between 2 and 5
```

## 29. Then the YAML array at "/spec/containers" should contain an item where "/name" is "nginx"

Assert an array contains an item where a sub-key has the expected value.
Sub-key path is relative to each item; supports the same `/a/b[0]` syntax.

**Keyword**: `Then`

**Pattern**

```js
'the YAML array at {string} should contain an item where {string} is {string}'
```

**Examples**

```gherkin
Then the YAML array at "/spec/containers" should contain an item where "/name" is "nginx"
Then the YAML array at "/items" should contain an item where "/kind" is "Service"
And the YAML array at "/users" should contain an item where "/email" is "alice@example.com"
Then the YAML array at "/rules" should contain an item where "/host" is "example.com"
Then the YAML array at "/spec/ports" should contain an item where "/port" is "443"
```

## 30. Then the YAML array at "/spec/containers" should contain no item where "/image" is "alpine:latest"

Assert NO item in an array has a sub-key matching a value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML array at {string} should contain no item where {string} is {string}'
```

**Examples**

```gherkin
Then the YAML array at "/spec/containers" should contain no item where "/image" is "alpine:latest"
Then the YAML array at "/users" should contain no item where "/role" is "anonymous"
And the YAML array at "/rules" should contain no item where "/host" is "deprecated.example.com"
Then the YAML array at "/spec/env" should contain no item where "/name" is "DEBUG"
Then the YAML array at "/items" should contain no item where "/status" is "failed"
```

## 31. Then every item in "/spec/containers" should have key "image"

Assert every item in an array has a non-null sub-key.

**Keyword**: `Then`

**Pattern**

```js
'every item in {string} should have key {string}'
```

**Examples**

```gherkin
Then every item in "/spec/containers" should have key "image"
Then every item in "/users" should have key "email"
And every item in "/spec/ports" should have key "port"
Then every item in "/items" should have key "kind"
Then every item in "/spec/rules" should have key "host"
```

## 32. Then the YAML keys at "/metadata" should be exactly "name, namespace, labels"

Assert the keys at a path exactly match a comma-separated list (no extras).

**Keyword**: `Then`

**Pattern**

```js
'the YAML keys at {string} should be exactly {string}'
```

**Examples**

```gherkin
Then the YAML keys at "/metadata" should be exactly "name, namespace, labels"
Then the YAML keys at "/spec" should be exactly "replicas, selector, template"
And the YAML keys at "/error" should be exactly "code, message"
Then the YAML keys at "/" should be exactly "apiVersion, kind, metadata, spec"
Then the YAML keys at "/users/0" should be exactly "id, name, email"
```

## 33. Then the YAML at "/metadata" should have keys "name, namespace"

Assert every required key is present at a path (extras allowed).

**Keyword**: `Then`

**Pattern**

```js
'the YAML at {string} should have keys {string}'
```

**Examples**

```gherkin
Then the YAML at "/metadata" should have keys "name, namespace"
Then the YAML at "/spec" should have keys "replicas, selector"
And the YAML at "/" should have keys "apiVersion, kind"
Then the YAML at "/error" should have keys "code, message"
Then the YAML at "/users/0" should have keys "id, email"
```

## 34. Then the YAML should match JSON Schema "schemas/deployment.json"

Validate the active YAML document against a JSON Schema file. Bundles
`ajv-formats` so schemas using `format: date-time`, `email`, `uri`, etc.
work out of the box.

**Keyword**: `Then`

**Pattern**

```js
'the YAML should match JSON Schema {string}'
```

**Examples**

```gherkin
Then the YAML should match JSON Schema "schemas/deployment.json"
Then the YAML should match JSON Schema "tests/schemas/openapi-3.1.json"
And the YAML should match JSON Schema "schemas/configmap.json"
Then the YAML should match JSON Schema "schemas/github-workflow.json"
Then the YAML should match JSON Schema "/abs/path/to/schema.json"
```

## 35. Then the YAML should equal the file "expected.yaml" ignoring keys "/metadata/resourceVersion"

Assert the active YAML document equals the contents of an expected file,
after removing the listed JSON Pointer paths from both sides. Common
use: ignoring volatile fields like `metadata.resourceVersion` or
`status` when diffing Kubernetes manifests.

**Keyword**: `Then`

**Pattern**

```js
'the YAML should equal the file {string} ignoring keys {string}'
```

**Examples**

```gherkin
Then the YAML should equal the file "expected.yaml" ignoring keys "/metadata/resourceVersion"
Then the YAML should equal the file "expected.yaml" ignoring keys "/status, /metadata/uid"
And the YAML should equal the file "golden.yaml" ignoring keys "/metadata/creationTimestamp"
Then the YAML should equal the file "expected.yml" ignoring keys ""
Then the YAML should equal the file "tests/golden/deploy.yaml" ignoring keys "/status, /metadata/uid, /metadata/resourceVersion"
```

## 36. Then the YAML should use the namespace "v1"

Assert the YAML document declares a namespace value (mirrors xml.steps.js).
Checks top-level scalar values and falls back to a raw-text scan.

**Keyword**: `Then`

**Pattern**

```js
'the YAML should use the namespace {string}'
```

**Examples**

```gherkin
Then the YAML should use the namespace "v1"
Then the YAML should use the namespace "apps/v1"
And the YAML should use the namespace "kustomize.config.k8s.io/v1beta1"
Then the YAML should use the namespace "argoproj.io/v1alpha1"
Then the YAML should use the namespace "openapi: 3.0.3"
```

## 37. Then the YAML should not use the namespace "v0"

Assert the YAML document does NOT declare a namespace value.

**Keyword**: `Then`

**Pattern**

```js
'the YAML should not use the namespace {string}'
```

**Examples**

```gherkin
Then the YAML should not use the namespace "v0"
Then the YAML should not use the namespace "internal/v1"
And the YAML should not use the namespace "legacy"
Then the YAML should not use the namespace "v0alpha"
Then the YAML should not use the namespace "deprecated"
```

## 38. When I print last YAML response

Print the most recently set raw YAML response to stdout (debug aid).

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*print last YAML response$/
```

**Examples**

```gherkin
When I print last YAML response
When we print last YAML response
And I print last YAML response
Given the YAML response content is the following:
  """
  key: value
  """
  When I print last YAML response
When we send a REST "GET" request to "/api/config"
  And we print last YAML response
```
