---
title: oasOpParams
linkTitle: oasOpParams
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
  Checks that all operations unique and non-repeating parameters
type: vacuum
layout: function

---

`oasOpParams` will scan an OpenAPI specification looking at each operation, checking unique and non-repeating parameters. 

The function is used by
the [operation-parameters]({{< relref "/vacuum/rules/operations/operation-parameters" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_parameters.go)