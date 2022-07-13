---
title: oasUnusedComponent
linkTitle: oasUnusedComponent
date: 2022-06-30T07:39:53-04:00
draft: false

description: |
  Unsure there are no unused components or definitions in the specification
type: vacuum
layout: function

---

`oasUnusedComponent` will check all [Components](https://swagger.io/specification/#components-object) (OpenAPI 3) or  
[Definitions](https://swagger.io/specification/v2/#definitionsObject) (OpenAPI 2/Swagger) have been used somewhere
within the document.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas2-unused-definition:
  description: "Check for orphaned or unused definitions"
  type: "validation"
  recommended: true
  severity: "warn"
  given: "$"
  then:
    function: "oasUnusedComponent"
```

The function is used by
the [oas2-unused-definition]({{< relref "/vacuum/rules/schemas/oas2-unused-definition" >}}) and the
[oas3-unused-component]({{< relref "/vacuum/rules/schemas/oas3-unused-component" >}}) Rules 

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/unused_component.go)