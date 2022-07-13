---
title: oasOpId
linkTitle: oasOpId
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
    Checks that all operations have an operationId defined
type: vacuum
layout: function

---

`oasOpId` will scan an OpenAPI specification looking at each operation, and ensuring an `operationId` has been defined.

The function is used by
the [operation-operationId]({{< relref "/vacuum/rules/operations/operation-operationId" >}}) Rule

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-operationid)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_id.go)