---
title: oasOpErrorResponse
linkTitle: oasOpErrorResponse
date: 2022-07-17T07:39:53-04:00
draft: false
description: | 
  Checks operations contain at least one 4xx HTTP responses.
type: vacuum
layout: function

---

`oasOpErrorResponse` will scan an OpenAPI specification looking at each operation, 
and ensuring at least one `4xx` HTTP Error responses has been defined.

The function is used by
the [operation-4xx-response]({{< relref "/vacuum/rules/operations/operation-4xx-response" >}}) Rule

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_4x_response.go)