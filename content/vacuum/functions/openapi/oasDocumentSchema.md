---
title: oasDocumentSchema
linkTitle: oasDocumentSchema
date: 2022-06-30T04:39:53-04:00
draft: false
description: |
  Checks a specification is a valid OpenAPI 2/3 schema.
type: vacuum
layout: function

---

`oasDocumentSchema` checks that a specification matches the [OpenAPI v2](https://swagger.io/specification/v2/) 
or the [OpenAPI 3](https://swagger.io/specification/) schema definitions.

The rule uses [this OpenAPI v2 schema](https://github.com/daveshanley/vacuum/blob/main/model/schemas/swagger2-schema.yaml) 
and [this OpenAPI v3 schema](https://github.com/daveshanley/vacuum/blob/main/model/schemas/oas3-schema.yaml).

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas2-schema:
  description: "Check schema is correct"
  type: "validation"
  recommended: true
  severity: "error"
  given: "$"
  then:
    function: "oasDocumentSchema"
```

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/oas_schema.go)