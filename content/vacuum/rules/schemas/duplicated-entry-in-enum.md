---
title: duplicated-entry-in-enum
linkTitle: duplicated-entry-in-enum
date: 2022-06-30T08:53:17-04:00
draft: false
description: |
  Enum values must not have a duplicate entry
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: duplicatedEnum
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

[Enums](https://swagger.io/docs/specification/data-models/enums/) allow API designers to define a pre-set list 
of values that are acceptable for input, or will be output.

Sometimes, copy-pasta happens and [Enums](https://swagger.io/docs/specification/data-models/enums/) become duplicated.

This rule checks every item is unique, in all `enum` values.

## Why did this violation appear?

A value listed in an `enum` has been duplicated. Each value needs to be unique.

### Bad example

```yaml
paths:
  /items:
    get:
      parameters:
        - in: query
          name: sort
          description: "Sorting order for items"
          schema:
            type: string
            enum: [asc, desc, asc, asc]
            ...
```
### Good Example

```yaml
paths:
  /items:
    get:
      parameters:
        - in: query
          name: sort
          description: "Sorting order for items"
          schema:
            type: string
            enum: [asc, desc]
            ...
```

### How do I fix this violation?

Check `enum` values for duplicated content.

#### Spectral Equivalent

The rule is equivalent to [duplicated-entry-in-enum](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#duplicated-entry-in-enum)