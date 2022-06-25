---
title: noEvalDescription
linkTitle: noEvalDescription
date: 2022-06-24T07:39:53-04:00
draft: false
description: |
  Checks there are no descriptions using JavaScript eval() statements.
type: vacuum
layout: function

---

`noEvalDescription` checks every description in the specification to ensure there are no `eval()` JavaScript statements 
being made.

The function is used by
the [no-eval-in-markdown]({{< relref "/vacuum/rules/validation/no-eval-in-markdown" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/no_eval_descriptions.go)