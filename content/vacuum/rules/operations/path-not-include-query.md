---
title: path-not-include-query
linkTitle: path-not-include-query
date: 2022-06-29T05:53:17-04:00
draft: false
description: |
 Path definition can't contain a query parameter.
severity: error
recommended: true
ruleType: validation
functionType: core
functionName: pattern
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

{{< info-box >}}
JSON Path: __$.paths__
{{< /info-box >}}

This rule checks to ensure a `paths` definition does not contain a [Query string](https://en.wikipedia.org/wiki/Query_string).

The mistake is actually quite common with authors new to the OpenAPI standard. It happens all the time.

## Why did this violation appear?

One or more `paths` definitions contains a query string.

### Bad example

```yaml
 paths:
  /deserts/icecream?sprinkles=true:
    get:
      parameters:
      ...
```

### Good example

```yaml
 paths:
  /deserts/icecream:
    get:
      parameters:
      - in: query
        name: "sprinkles"
        ...
```

### How do I fix this violation?

Ensure there are no query parameters '**?key=value**' defined as a part of any `paths` definition.

#### Spectral Equivalent

The rule is equivalent to [path-not-include-query](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#path-not-include-query)