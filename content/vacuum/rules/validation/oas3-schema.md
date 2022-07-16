---
title: oas3-schema
linkTitle: oas3-schema
date: 2022-07-16T04:53:17-04:00
draft: false
description: |
 Check that the specification is a valid OpenAPI schema
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasSchema
type: vacuum
layout: rule
formats:
 - "oas3"

---

Specifications for OpenAPI need to be **valid**, meaning that even without linting, the specification 
must meet the [OpenAPI Schema](https://swagger.io/specification/).

## What is this rule checking for?

Making sure the specification has a valid structure and aligns with the standard. It's using [JSON Schema](https://json-schema.org/)
to validate against the [schema](https://github.com/OAI/OpenAPI-Specification/blob/main/schemas/v3.0/schema.json)

## Why did this violation appear?

The OpenAPI specification is invalid.

#### Spectral Equivalent

The rule is equivalent to [oas3-schema](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas3-schema)
