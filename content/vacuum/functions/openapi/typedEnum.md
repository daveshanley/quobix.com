---
title: typedEnum
linkTitle: typedEnum
date: 2022-06-29T04:39:53-04:00
draft: false
description: |
  Checks enum values match specified type
type: vacuum
layout: function

---

`typedEnum` will check each [Enum](https://swagger.io/docs/specification/data-models/enums/) definition, and will 
ensure that the type defined for the `enum`, actually matches the values supplied.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
typed-enum:
  description: "Enum values must respect the specified type"
  type: "validation"
  recommended: true
  severity: "warn"
  given: "$"
  then:
    function: "typedEnum"
```

The function is used by
the [typed-enum]({{< relref "/vacuum/rules/schemas/typed-enum" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/typed_enum.go)