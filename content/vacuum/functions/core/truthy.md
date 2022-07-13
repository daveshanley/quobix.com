---
title: truthy
linkTitle: truthy
date: 2022-06-24T07:39:53-04:00
draft: false
description: |
    Checks that a property has been defined or exists.
type: vacuum
layout: function

---

`truthy` will check that a given **JSON Path** exists, or has been defined.

The value should not be `false` or an empty string `""` or `null`

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
my-important-rule:
  description: This is an important rule
  message: "'chicken' or 'nugget' is missing! Oh no! You need to add it!"
  given: $.some.path
  then:
    - field: chicken
      function: truthy
    - field: nugget
      function: truthy
```

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#truthy)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/truthy.go)