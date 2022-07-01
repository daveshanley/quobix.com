---
title: casing
linkTitle: casing
date: 2022-07-01T09:01:53-04:00
draft: false
description: |
    Checks value is using the correct case. 
type: vacuum
layout: function

---

**_casing_** will check that a value is using the correct `case`.

### How do I use this function?

This function is configured by the following `functionOptions`. Essentially the `type` is the case you want
to check for.

|          NAME          | DESCRIPTION                       |   TYPE    | REQUIRED? |
|:----------------------:|-----------------------------------|:---------:|:---------:|
|          type          | The case you want to check        | `string`  |    yes    |
|     disallowDigits     | Don't allow any digits in pattern | `boolean` |   false   |
|     separator.char     | Use a separator character         | `string`  |   false   |
| separator.allowLeading | Allow a leading separator or not  | `boolean` |   false   |

`type` can be one of the following:

- flat
- camel
- pascal
- kebab
- cobol
- snake
- macro

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configurations

```yaml
check-the-case:
  description: "Check the case of the name is camelCase"
  type: style
  recommended: true
  given: $.tags[*]
  then:
    field: name
    function: "casing"
    functionOptions:
      type: camel
```

```yaml
check-the-case-noDigits:
  description: "Check the case of the name is PascalCase and has no digits"
  type: style
  recommended: true
  given: $.tags[*]
  then:
    field: name
    function: "casing"
    functionOptions:
      type: pascal
      disallowDigits: true
```

---




[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#casing

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/casing.go)