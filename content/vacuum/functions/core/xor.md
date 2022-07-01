---
title: xor
linkTitle: xor
date: 2022-07-01T09:43:53-04:00
draft: false
description: |
    Checks that one or another property is set, but not both.
type: vacuum
layout: function

---

`xor` will check that a only one of two properties is set/defined within a given **JSON Path**.

### How do I use this function?

This function is configured by the following `functionOptions`. Essentially the `properties` is a two element string array
of the two properties you want to check against.

|    NAME    | DESCRIPTION                              |    TYPE    | REQUIRED? |
|:----------:|------------------------------------------|:----------:|:---------:|
| properties | array of two properties to check against | `[]string` |    yes    |

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
xor-the-things:
  message: "Only one thing can exist"
  given: $.tags[*]
  then:
    field: name
    function: xor
    functionOptions:
      properties:
        - "Tag1"
        - "Tag_1"
```

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#xor)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/xor.go)