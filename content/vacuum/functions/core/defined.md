---
title: defined
linkTitle: defined
date: 2022-07-01T09:11:53-04:00
draft: false
description: |
    Checks an element has been defined.
type: vacuum
layout: function

---

`defined` will check that a given **JSON Path** exists and has been defined

The value can be anything, or it can be empty, as long as the key exists, this function will pass.

For a more complete function use [truthy]({{< relref "/vacuum/functions/core/truthy" >}}).

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
my-important-rule:
  message: "The thing should be defined"
  given: $.some.thing
  then:
    - field: chicken
      function: defined
    - field: nugget
      function: defined
```

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#defined)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/defined.go)