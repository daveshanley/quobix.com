---
title: ambiguousPaths
linkTitle: ambiguousPaths
date: 2022-07-17T07:39:53-04:00
draft: false
description: |
  Ensures that all paths are resolvable and don't conflict
type: vacuum
layout: function

---

`ambiguousPaths` will evaluate every path in the specification, against one another, to ensure that they are all 
resolvable and don't conflict with one another.

The function is used by
the [no-ambiguous-paths]({{< relref "/vacuum/rules/operations/no-ambiguous-paths" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/no_ambiguous_paths.go)