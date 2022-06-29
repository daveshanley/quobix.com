---
title: typed-enum
linkTitle: typed-enum
date: 2022-06-29T06:53:17-04:00
draft: false
description: |
 Check enum values match specified types
severity: warn
recommended: false
ruleType: validation
functionType: openapi
functionName: typedEnum
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

[Enum](https://swagger.io/docs/specification/data-models/enums/) definitions should match specified types

## Why did this violation appear?

One or more `enum` values do not match the specified type.

### Bad example

`enum` is supposed to be an array of `string`, but gets a mixed array.

```yaml
/pizza:
 parameters:
  - in: query
    name: "party"
    schema:
     type: "string"
     enum: ["big", 1, 0.33, false, "small"]
     ...
```

### Good Example

```yaml
/pizza:
 parameters:
  - in: query
    name: "party"
    schema:
     type: "string"
     enum: ["big", "small"]
     ...
```

### How do I fix this violation?

Ensure that `enum` values match specified types.

#### Spectral Equivalent

The rule is equivalent to [typed-enum](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#typed-enum)