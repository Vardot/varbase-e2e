# Clock steps

7 steps, defined in `tests/step-definitions/clock.steps.js`.

Cucumber-js loads every `*.steps.js` in that directory automatically — you never `require()` a step file from a feature.

| # | Step |
| --- | --- |
| 1 | `Given the system time is "2026-05-08T10:00:00Z"` |
| 2 | `When I advance the clock by 500 ms` |
| 3 | `When I advance the clock by 30 seconds` |
| 4 | `When I advance the clock by 5 minutes` |
| 5 | `When I pause the clock` |
| 6 | `When I resume the clock` |
| 7 | `When I set the system time to "2026-05-08T12:30:00Z"` |

---

## 1. Given the system time is "2026-05-08T10:00:00Z"

Install a fake clock anchored at an ISO 8601 instant.

**Keyword**: `Given`

**Pattern**

```js
/^the system time is "([^"]*)"$/
```

**Examples**

```gherkin
Given the system time is "2026-05-08T10:00:00Z"
Given the system time is "2026-01-01T00:00:00Z"
Given the system time is "2026-12-31T23:59:55Z"
Given the system time is "2026-05-08T10:00:00Z"
Given the system time is "2026-07-04T12:00:00-04:00"
```

## 2. When I advance the clock by 500 ms

Advance the fake clock forward by N milliseconds.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*advance the clock by (\d+) ?ms$/
```

**Examples**

```gherkin
When I advance the clock by 500 ms
When I advance the clock by 1500 ms
When we advance the clock by 250 ms
And I advance the clock by 100 ms
When I advance the clock by 60000 ms
```

## 3. When I advance the clock by 30 seconds

Advance the fake clock forward by N seconds.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*advance the clock by (\d+) seconds?$/
```

**Examples**

```gherkin
When I advance the clock by 30 seconds
When I advance the clock by 5 seconds
When we advance the clock by 1 second
And I advance the clock by 10 seconds
When I advance the clock by 90 seconds
```

## 4. When I advance the clock by 5 minutes

Advance the fake clock forward by N minutes.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*advance the clock by (\d+) minutes?$/
```

**Examples**

```gherkin
When I advance the clock by 5 minutes
When I advance the clock by 1 minute
When we advance the clock by 14 minutes
And I advance the clock by 30 minutes
When I advance the clock by 60 minutes
```

## 5. When I pause the clock

Pause the fake clock.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*pause the clock$/
```

**Examples**

```gherkin
When I pause the clock
When I pause the clock
When we pause the clock
And I pause the clock
When I pause the clock
```

## 6. When I resume the clock

Resume the fake clock.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*resume the clock$/
```

**Examples**

```gherkin
When I resume the clock
When I resume the clock
When we resume the clock
And I resume the clock
When I resume the clock
```

## 7. When I set the system time to "2026-05-08T12:30:00Z"

Set the fake clock to a specific time.

**Keyword**: `When`

**Pattern**

```js
/^(I |we )*set the system time to "([^"]*)"$/
```

**Examples**

```gherkin
When I set the system time to "2026-05-08T12:30:00Z"
When I set the system time to "2026-12-31T23:59:55Z"
When we set the system time to "2026-01-01T00:00:00Z"
And I set the system time to "2026-07-04T08:00:00-04:00"
When I set the system time to "2027-01-01T00:00:00Z"
```
