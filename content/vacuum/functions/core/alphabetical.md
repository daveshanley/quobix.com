---
title: alphabetical
linkTitle: alphabetical
date: 2022-06-24T07:39:53-04:00
draft: false
description: |
    Checks values in an array are alphabetically ordered
type: vacuum
layout: function

---

**_alphabetical_** will check that a given array via a **JSON Path** is ordered alphabetically.

The value should not be `false` or an empty string `""` or `null`

### How do I use this function?

This function is configured by the following `functionOptions`

|    NAME     | DESCRIPTION                    |    TYPE    |  REQUIRED?  |
|:-----------:|--------------------------------|:----------:|:-----------:|
|   keyedBy   | the key to for sorting objects |  `string`  |     no      |

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
openapi-tags-alphabetical:
  description: Tags should be in alphabetical order.
  type: style
  recommended: false
  given: $.tags
  then:
    field: tags
    function: alphabetical
    functionOptions:
      keyedBy: name
```

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#alphabetical)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/alphabetical.go)