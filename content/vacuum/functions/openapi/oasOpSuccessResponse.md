---
title: oasOpSuccessResponse
linkTitle: oasOpSuccessResponse
date: 2022-06-19T07:39:53-04:00
draft: false
description: | 
  Checks operations contain at least one 2xx or 3xx HTTP responses.
type: vacuum
layout: function

---

`oasOpSuccessResponse` will scan an OpenAPI specification looking at each operation, 
and ensuring at least one `2xx` or `3xx` HTTP responses has been defined.

The function is used by
the [operation-success-response]({{< relref "/vacuum/rules/operations/operation-success-response" >}}) Rule

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/success_response.go)