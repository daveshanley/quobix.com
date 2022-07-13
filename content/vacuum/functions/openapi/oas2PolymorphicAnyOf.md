---
title: oas2PolymorphicAnyOf
linkTitle: oas2PolymorphicAnyOf
date: 2022-06-29T04:39:53-04:00
draft: false
description: |
  Ensure Swagger specification has not used 'anyOf'
type: vacuum
layout: function

---

`oas2PolymorphicAnyOf` will check a specification to ensure that if it's a Swagger specification (OpenAPI 2.0), then 
it has not made use of [anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof).

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas2-anyOf:
  description: "Check for invalid use of 'anyOf'"
  type: "validation"
  recommended: true
  severity: "err"
  given: "$"
  then:
    function: "oas2PolymorphicAnyOf"
```

The function is used by
the [oas2-anyOf]({{< relref "/vacuum/rules/schemas/oas2-anyOf" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/polymorphic_anyOf.go)