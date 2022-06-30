---
title: oas2-unused-definition
linkTitle: oas2-unused-definition
date: 2022-06-30T011:53:17-04:00
draft: false
description: |
  Check for unused/orphaned schema definitions
severity: warn
recommended: true
ruleType: validation
functionType: openapi
functionName: oasUnusedComponent
type: vacuum
layout: rule
formats:
 - "oas2"
---

[Definitions](https://swagger.io/specification/v2/#definitionsObject) in OpenAPI 2 (Swagger) are reusable/sharable
schema definitions. Any other object can reference it, to save duplication.

Sometimes schema definitions are never referenced from anywhere, they are '_unused_' or '_orphaned_'.

This could be an oversight, it could be a case where the spec was changed and new schemas have replaced older ones, 
and those older schema definitions were never removed.

It's good contract hygiene to prune anything that isn't used, out of it.

## Why did this violation appear?

A `definition` schema has been created, but it's not actually used/referenced by anything else in the specification.

### Bad example

```yaml
paths:
  /pizzas/{id}:
    get:
      produces:
        - application/json
      responses:
        200:
          schema:
            $ref: '#/definitions/Pizza'
      ...
definitions:
  IAmNotUsed:
    properties:
      name:
        type: string
  Pizza:
    properties:
      ...
```
### Good Example

```yaml
paths:
  /pizzas/{id}:
    get:
      produces:
        - application/json
      responses:
        200:
          schema:
            $ref: '#/definitions/Pizza'
      ...
definitions:
  Pizza:
    properties:
      ...
```

### How do I fix this violation?

Make sure there are no `definitions` elements that are not referenced from anywhere else. 

#### Spectral Equivalent

The rule is equivalent to [oas2-unused-component](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-unused-component)