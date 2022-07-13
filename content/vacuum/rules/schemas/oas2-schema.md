---
title: oas2-schema
linkTitle: oas2-schema
date: 2022-06-29T08:53:17-04:00
draft: false
description: |
  Check schema is valid OpenAPI 2 / Swagger 
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasDocumentSchema
type: vacuum
layout: rule
formats:
 - "oas2"
---

Perhaps the 'lightest' linting there is. This rule ensures that the document provided, matches the schema of a [Swagger](https://swagger.io/specification/v2/)
(OpenAPI 2.0) document. 

The rule performs a schema match using **JSON Schema**

[Click to see schema](https://github.com/daveshanley/vacuum/blob/main/model/schemas/swagger2-schema.yaml) used to match against.

## Why did this violation appear?

The spec provided is not a valid [OpenAPI 2](https://swagger.io/specification/v2/) specification.

### How do I fix this violation?

Correct the specification violations, there isn't any other way forward otherwise.

#### Spectral Equivalent

The rule is equivalent to [oas2-schema](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-schema)