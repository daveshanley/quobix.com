---
title: oas3-unused-component
linkTitle: oas3-unused-component
date: 2022-06-30T08:53:17-04:00
draft: false
description: |
  Check for unused/orphaned components.
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

[Components](https://swagger.io/specification/#components-object) in OpenAPI 3 are reusable/sharable 
elements. Any other object can reference it, to save duplication.

Sometimes components are never referenced from anywhere, they are '_unused_' or '_orphaned_'.

This could be an oversight, it could be a case where the spec was changed and new schemas have replaced older ones, 
and those older components were never removed.

It's good contract hygiene to prune anything that isn't used, out of it.

## Why did this violation appear?

A `component` has been created, but it's not actually used/referenced by anything else in the specification.

### Bad example

```yaml
paths:
  /pizzas:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/shared-components/schemas/PizzaList'
components:
  schemas:
    IAmNotUsedByAnything:
      properties:
      ...  
    PizzaList:
      properties:
      ...
```
### Good Example

```yaml
paths:
  /pizzas:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/shared-components/schemas/PizzaList'
components:
  schemas:
    PizzaList:
      properties:
      ...
```

### How do I fix this violation?

Make sure any `component` definitions are used/referenced somewhere within the specification.

#### Spectral Equivalent

The rule is equivalent to [oas3-unused-component](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas3-unused-component)