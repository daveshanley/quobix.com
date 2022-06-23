---
title: oasOpIdUnique
linkTitle: oasOpIdUnique
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
  Checks that all operations have an operationId defined
type: vacuum
layout: function

---

`oasOpIdUnique` will scan an OpenAPI specification looking at each operation, and ensuring that its `operationId` 
is unique within the specification

The function is used by
the [operation-operationId-unique]({{< relref "/vacuum/rules/operations/operation-operationId-unique" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/unique_operation_id.go)