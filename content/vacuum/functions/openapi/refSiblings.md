---
title: refSiblings
linkTitle: refSiblings
date: 2022-06-30T07:39:53-04:00
draft: false
description: |
  Ensure $ref properties don't have any sibling nodes
type: vacuum
layout: function

---

`refSiblings` checks every **$ref** in the specification to ensure that it's a lone child node, and does not
contain and siblings. 

OpenAPI ignores everything but the **ref**. This is a problem because JSON Schema allows sibling nodes.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
no-$ref-sibling:
  description: "Ensure there are no sibling nodes next to $ref properties"
  type: "validation"
  recommended: true
  severity: "error"
  given: "$"
  then:
    function: "refSiblings"
```

The function is used by
the [no-$ref-siblings]({{< relref "/vacuum/rules/schemas/no-ref-siblings" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/no_ref_siblings.go)