---
title: oas2-operation-security-defined
linkTitle: oas2-operation-security-defined
date: 2022-07-01T05:30:17-04:00
draft: false
description: |
  Operation security definitions cannot reference undefined security schemes.
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oas2OpSecurityDefined
type: vacuum
layout: rule
formats:
 - "oas2"
---

It's important to add the correct [Authentication and Authorization] information in a specification. It's easy to forget
to add security to an operation, or use a scheme that isn't globally defined. 

This rule will check the `security` values of an operation, checking they reference a valid **scheme**.

## Why did this violation appear?

A `security` definition has been used that is not defined as a part of **securityDefinitions**

### Bad example

```yaml
securityDefinitions:
  BasicAuth:
    type: basic
  ApiKeyAuth:
    type: apiKey
    in: header
paths:
  /yummy-cakes:
    get:
      summary: "Get all the cakes for you and me"
      security:
        - IDoNotExist
```
### Good Example

```yaml
securityDefinitions:
  BasicAuth:
    type: basic
  ApiKeyAuth:
    type: apiKey
    in: header
paths:
  /yummy-cakes:
    get:
      summary: "Get all the cakes for you and me"
      security:
        - BasicAuth
        - APIKeyAuth
```

### How do I fix this violation?

Make sure all operation `security` definitions reference `securityDefinitions` that actually exist in the spec.

#### Spectral Equivalent

The rule is equivalent to [oas2-operation-security-defined](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-operation-security-defined)