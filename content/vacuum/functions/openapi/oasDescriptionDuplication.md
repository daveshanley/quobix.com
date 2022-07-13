---
title: oasDuplicationDescription
linkTitle: oasDescriptionDuplication
date: 2022-06-27T08:39:53-04:00
draft: false
description: |
    Checks descriptions for duplicated content.
type: vacuum
layout: function

---

`oasDescriptionDuplication` will check each `description` found in the specification and
creates a hash of it. 

Hashes are then checked for equality, if the hashes match, the content
is identical and a violation is triggered.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
description-duplication:
  description: "Check descriptions for duplicates"
  type: "validation"
  recommended: true
  severity: "info"
  given: "$"
  then:
    function: "oasDescriptionDuplication"
```

The function is used by
the [description-duplication]({{< relref "/vacuum/rules/descriptions/description-duplication" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/description_duplication.go)