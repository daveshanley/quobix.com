---
title: oasSchema
linkTitle: oasSchema
date: 2022-07-16T07:39:53-04:00
draft: false
description: |
    Checks that a specification is a valid OpenAPI schema
type: vacuum
layout: function

---

`oasSchema` will check that a document is a valid OpenAPI Schema. It does this using a JSON Schema match against
OpenAPI or Swagger schemas. If you only ever use a single function, this should be it.

The function is used by
the [oas2-schema]({{< relref "/vacuum/rules/validation/oas2-schema" >}}) and the 
[oas3-schema]({{< relref "/vacuum/rules/validation/oas3-schema" >}}) Rules

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/oas_schema.go)