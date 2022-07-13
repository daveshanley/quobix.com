---
title: pattern
linkTitle: pattern
date: 2022-06-26T07:39:53-04:00
draft: false
description: |
  Check values against regular expressions.
type: vacuum
layout: function

---

**_pattern_** is going to perform a regular expression check.

Supply a **JSON Path** and the regex that you want to `match` or `notMatch`.

vacuum uses [Go RE2 Syntax](https://github.com/google/re2/wiki/Syntax) for regular expressions.

### How do I use this function?

**_pattern_** is configured by the following `functionOptions`

|   NAME   | DESCRIPTION                                              |   TYPE   | REQUIRED? |
|:--------:|----------------------------------------------------------|:--------:|:---------:|
|  match   | If set, value **must** match the regex pattern           | `string` |    no     |
| notMatch | If set, value **_must_** **not** match the regex pattern | `string` |    no     |


#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas2-host-trailing-slash:
  description: "Host URL should not contain a trailing slash"
  type: style
  recommended: true
  given: "$.host"
  then:
    function: "pattern"
    functionOptions:
      notMatch: "/$"
```

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#pattern)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/pattern.go)