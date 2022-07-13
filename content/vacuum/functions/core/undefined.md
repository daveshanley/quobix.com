---
title: undefined
linkTitle: undefined
date: 2022-07-01T09:40:53-04:00
draft: false
description: |
    Checks an element has NOT been defined.
type: vacuum
layout: function

---

`undefined` will check that a given **JSON Path** does not exist/has not been defined.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
my-important-rule:
  message: "The thing should NOT BE defined"
  given: $.some.thing
  then:
    - field: chicken
      function: undefined
    - field: nugget
      function: undefined
```

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#undefined)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/undefined.go)