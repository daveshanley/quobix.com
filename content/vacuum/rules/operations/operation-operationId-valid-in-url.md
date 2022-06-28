---
title: operation-operationId-valid-in-url
linkTitle: operation-operationId-valid-in-url
date: 2022-06-28T05:53:17-04:00
draft: false
description: |
  Check that an operationId is valid when used in URL
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

{{< warn-box >}}
This rule is going to be re-written. Its behavior will not change, however the current implementation
is not satisfactory.
{{< /warn-box >}}

An [Operation](https://swagger.io/specification/#operation-object) should **always** contain
an `operationId`. This rule will check the value used is friendly to being used as part of a URL.

Documentation and code generation tools depend on this value being unique and often use it as part
of URL paths.

## Why did this violation appear?

The `operationId` for one or more [Operation](https://swagger.io/specification/#operation-object) definitions
is not URL friendly.

### Bad example

```yaml
paths:
  /snakes/cakes:
    post:
      operationId: create^a%snake cake
```

### Good example

```yaml
paths:
  /snakes/cakes:
    post:
      operationId: createASnakeCake
```

### How do I fix this violation?

Remove any non URL friendly characters from all `operationId` definitions.

#### Spectral Equivalent

The rule is equivalent to [operation-operationId-valid-in-url](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-operationid-valid-in-url)