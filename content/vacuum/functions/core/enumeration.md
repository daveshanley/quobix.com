---
title: enumeration
linkTitle: enumeration
date: 2022-07-01T09:01:53-04:00
draft: false
description: | 
  Checks enum values match supplied values.
type: vacuum
layout: function

---

**_enumeration_** will check that the enum values in a property, match the configured ones as a part of the rule.

### How do I use this function?

This function is configured by the following `functionOptions`. Essentially the `values` is a comma separated list
of all the things you want to check against.

|          NAME          | DESCRIPTION                             |   TYPE    | REQUIRED? |
|:----------------------:|-----------------------------------------|:---------:|:---------:|
|         values         | Comma separated values to check against | `string`  |    yes    |


#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
check-values:
  description: "Check the required values exist"
  type: style
  recommended: true
  given: $.paths.operations[*].tags
  then:
    field: 
    function: "enumeration"
    functionOptions:
      values: "must, be, one, of, these, things, here"
```
---




[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#enumeration

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/enumeration.go)
