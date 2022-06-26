---
title: oas2-api-schemes
linkTitle: oas2-api-schemes
date: 2022-06-25T15:56:17-04:00
draft: false
description: |
 Checks host schemes are present and a non-empty array
severity: warn
recommended: true
ruleType: validation
functionType: core
functionName: schema
type: vacuum
layout: rule
formats:
 - "oas2"
---

In [OpenAPI 2](https://swagger.io/specification/v2/) `schemes` is a string array, that contains URIs that define
the HTTP transport types used by the API spec. 

Knowing over which HTTP transport an API operates is important for automation and code generation.

{{< card "A note on HTTP vs HTTPS" >}}
We should **NOT** use HTTP in public internet facing APIs. Generally it's OK when used behind a secured API gateway.
We should _always_ use HTTPS over HTTP for any public API. 
{{< /card >}}

Values can **ONLY** be one of: `http`, `https`, `ws` or `wss` to be valid, however vacuum is not checking the contents
of the array.

### Why did this violation appear?

`schemes` is missing from the spec, or the supplied value is not an `array`

### Bad example

```yaml
swagger: 2.0
host: "quobix.com"
paths:
 /vacuum:
  ...
```

### Good example

```yaml
swagger: 2.0
host: "quobix.com"
schemes:
 - "https"
paths:
 /vacuum:
  ...
```

### How do I fix this violation?

Ensure that the `schemes` property is present, and the content is defined as an `array`

#### Spectral Equivalent

The rule is equivalent to [oas2-api-schemes](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-api-schemes)