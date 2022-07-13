---
title: oasParamDescriptions
linkTitle: oasParamDescriptions
date: 2022-06-27T08:39:53-04:00
draft: false
description: |
    Checks parameter descriptions have been set.
type: vacuum
layout: function

---

`oasParamDescriptions` Checks parameter descriptions have been set.

This function checks both OpenAPI 2 and 3+ specs. 

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas3-parameter-descriptions:
  description: "Parameters should always include descriptions"
  type: "validation"
  recommended: true
  severity: "warn"
  given: "$"
  then:
    function: "oasParamDescriptions"
```

The function is used by
the [oas2-parameter-description]({{< relref "/vacuum/rules/descriptions/oas2-parameter-description" >}}) 
and the [oas3-parameter-description]({{< relref "/vacuum/rules/descriptions/oas3-parameter-description" >}}) Rules

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/parameter_description.go)