---
title: oasOperationTags
linkTitle: oasOperationTags
date: 2022-06-29T04:39:53-04:00
draft: false
description: |
    Checks an operation contains at least a single tag.
type: vacuum
layout: function

---

`oasOperationTags` will check each [Operation](https://swagger.io/docs/specification/paths-and-operations/) for a
non-empty `tags` definition. If there is no definition for an operation method, or the array is empty then a violation 
is triggered.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
operation-tags:
  description: "Check operation has used tags properly"
  type: "validation"
  recommended: true
  severity: "warn"
  given: "$"
  then:
    function: "oasOperationTags"
```

The function is used by
the [operation-tags]({{< relref "/vacuum/rules/tags/operation-tags" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_tags.go)