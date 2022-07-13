---
title: duplicatedEnum
linkTitle: duplicatedEnum
date: 2022-06-30T07:39:53-04:00
draft: false
description: |
  Ensure that enum values have not been duplicated
type: vacuum
layout: function

---

`duplicatedEnum` will check a specification to ensure that [Enum](https://swagger.io/docs/specification/data-models/enums/) values
have not been duplicated.

Sometimes copy-pasta happens. `duplicatedEnum` has your back and won't let it get past you.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
duplicated-entry-in-enum:
  description: "Check enum values have not been duplicated"
  type: "validation"
  recommended: true
  severity: "error"
  given: "$"
  then:
    function: "duplicatedEnum"
```

The function is used by
the [duplicated-entry-in-enum]({{< relref "/vacuum/rules/schemas/duplicated-entry-in-enum" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/duplicated_enum_entry.go)