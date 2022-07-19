---
title: pathsKebabCase
linkTitle: pathsKebabCase
date: 2022-07-19T07:39:53-04:00
draft: false
description: |
  Ensures that 
type: vacuum
layout: function

---

`pathsKebabCase` will check every path segment (that isn't a parameter) and ensure the value has been defined as
**kebab-case** and nothing else.

The function is used by
the [paths-kebab-case]({{< relref "/vacuum/rules/operations/paths-kebab-case" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/paths_kebab_case.go)