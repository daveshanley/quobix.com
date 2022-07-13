---
title: oasDiscriminator
linkTitle: oasDiscriminator
date: 2022-07-01T06:39:53-04:00
draft: false
description: |
  Check for the correct use of discriminator properties.
type: vacuum
layout: function

---

`oasDiscriminator` checks for the correct use of `discriminator` values when using polymorphism.

In OpenAPI 2, polymorphism is achieved using `discriminator` values, this function checks to ensure correct use.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas2-discriminator:
  description: "Check for discriminator use in schemas"
  type: "validation"
  recommended: true
  severity: "error"
  given: "$"
  then:
    function: "oas2Discriminator"
```

The function is used by
the [oas2-discriminator]({{< relref "/vacuum/rules/schemas/oas2-discriminator" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/oas2_discriminator.go)