---
title: oasExample
linkTitle: oasExample
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
    Scans a specification for missing examples.
type: vacuum
layout: function

---

`oasExample` will scan an OpenAPI specification looking for violations around examples. 

The function is used by 
the [oas2-valid-schema-example]({{< relref "/vacuum/rules/examples/oas2-valid-schema-example" >}}) 
and [oas3-valid-schema-example]({{< relref "/vacuum/rules/examples/oas3-valid-schema-example" >}}) Rules.

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/examples.go)