---
title: path-params
linkTitle: path-params
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
  Checks are using path parameters correctly..
type: vacuum
layout: function
---

`oasPathParam` will scan an OpenAPI specification looking at each [path paramter](https://swagger.io/docs/specification/describing-parameters/#path-parameters), 
and ensure's that it's not been duplicated, is correctly used and implements types correctly.

The function is used by
the [path-params]({{< relref "/vacuum/rules/operations/path-params" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/path_parameters.go)