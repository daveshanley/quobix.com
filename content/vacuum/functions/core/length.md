---
title: length
linkTitle: length
date: 2022-07-01T09:31:53-04:00
draft: false
description: |
  Checks the length of a value meets a minimum or maximum length.
type: vacuum
layout: function

---

**_length_** will check that a value meets a minimum or a maximum length (or both).

### How do I use this function?

This function is configured by the following `functionOptions`. Essentially `min` and `max` determine if those limits are checked.

| NAME | DESCRIPTION                               |   TYPE    | REQUIRED? |
|:----:|-------------------------------------------|:---------:|:---------:|
| min  | The minimum floor you want to check for   | `integer` |    no     |
| max  | The maximum ceiling you want to check for | `integer` |    no     |

> You need to set at least **one** of these properties.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configurations

```yaml
check-the-length:
  description: "Check the length of 'name' is at least 5 characters long"
  type: style
  recommended: true
  given: $.tags[*]
  then:
    field: name
    function: "length"
    functionOptions:
      min: 5
```

```yaml
check-the-range:
  description: "Check the 'name' is at least three and less than 10 chars long"
  type: style
  recommended: true
  given: $.tags[*]
  then:
    field: name
    function: "length"
    functionOptions:
      min: 5
      max: 10
```

---




[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#length)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/length.go)