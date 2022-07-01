---
title: oas2-discriminator
linkTitle: oas2-discriminator
date: 2022-07-01T06:13:17-04:00
draft: false
description: |
  Check discriminators are used correctly in schemas.
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasDiscriminator
type: vacuum
layout: rule
formats:
 - "oas2"
---


The `discriminator` as part of the [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#schema-object)
adds support for polymorphism. It is the property used to differentiate between other schema that inherit from it. 

`disciminator` must be defined at this schema, and it **must** be in the required property list. 
When used, the value **must** be the name of this schema or any schema that inherits it.

## Why did this violation appear?

A `discriminator` was used incorrectly, or it could be missing a `required` mapping.

### Bad Example

```yaml
swagger: 2.0
paths:
  /melody:
    post:
      tags: 
        - little
        - song
definitions:
  Song:
    discriminator: "love"
    type: object
    required: 
      - "cuddles"
```

### Good Example

```yaml
swagger: 2.0
paths:
  /melody:
    post:
      tags:
        - little
        - song
definitions:
  Song:
    discriminator: "love"
    type: object
    required:
      - "love"
```

### How do I fix this violation?

Check `discriminator` values for correct use and that there is a matching `required` property.

#### Spectral Equivalent

The rule is equivalent to [oas2-discriminator](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-discriminator)