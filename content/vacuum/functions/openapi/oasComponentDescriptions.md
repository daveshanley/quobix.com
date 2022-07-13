---
title: oasComponentDescriptions
linkTitle: oasComponentDescriptions
date: 2022-06-27T08:39:53-04:00
draft: false
description: |
    Checks descriptions in components or definitions
type: vacuum
layout: function

---

`oasComponentDescriptions` will check each `description` found in [Components](https://swagger.io/docs/specification/components/) 

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
description-duplication:
  description: "Check component description"
  type: "validation"
  recommended: true
  severity: "info"
  given: "$"
  then:
    function: "oasComponentDescriptions"
```

The function is used by
the [component-description]({{< relref "/vacuum/rules/descriptions/component-description" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/component_descriptions.go)