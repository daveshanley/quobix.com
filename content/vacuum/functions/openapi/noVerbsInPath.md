---
title: noVerbsInPath
linkTitle: noVerbsInPath
date: 2022-07-19T06:29:53-04:00
draft: false
description: |
Check each verb for the presence of an HTTP verb
type: vacuum
layout: function

---

`noVerbsInPath` will evaluate every path in the specification, and check that none of the path segments contain
[HTTP Verbs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

The function is used by
the [no-verbs-in-path]({{< relref "/vacuum/rules/operations/no-http-verbs-in-path" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/no_http_verbs_in_path.go)