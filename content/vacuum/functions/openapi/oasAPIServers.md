---
title: oasAPIServers
linkTitle: oasAPIServers
date: 2022-06-28T07:39:53-04:00
draft: false
description: |
  Checks OpenAPI servers are correctly defined
type: vacuum
layout: function

---

`oasAPIServers` ensures that all OpenAPI 3+ server definitions are correct and the URLs are valid.

The function is used by
the [oas3-api-servers]({{< relref "/vacuum/rules/validation/oas3-api-servers" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/openapi_api_servers.go)