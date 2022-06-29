---
title: oas2PolymorphicOneOf
linkTitle: oas2PolymorphicOneOf
date: 2022-06-29T07:39:53-04:00
draft: false
description: |
  Ensure Swagger specification has not used 'oneOf'
type: vacuum
layout: function

---

`oas2PolymorphicOneOf` will check a specification to ensure that if it's a Swagger specification (OpenAPI 2.0), then 
it has not made use of [oneOf](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof).

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas2-oneOf:
  description: "Check for invalid use of 'oneOf'"
  type: "validation"
  recommended: true
  severity: "err"
  given: "$"
  then:
    function: "oas2PolymorphicOneOf"
```

The function is used by
the [oas2-oneOf]({{< relref "/vacuum/rules/schemas/oas2-oneOf" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/polymorphic_oneOf.go)