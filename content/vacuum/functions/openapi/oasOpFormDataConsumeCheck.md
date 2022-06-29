---
title: oasOpFormDataConsumeCheck
linkTitle: oasOpFormDataConsumeCheck
date: 2022-06-29T04:39:53-04:00
draft: false
description: |
  Checks that parameters using formData are consumed properly
type: vacuum
layout: function

---

`oasOpFormDataConsumeCheck` will check each parameter and its consumer has the correct type. The function checks
for '**_application/x-www-form-urlencoded_**' or '**_multipart/form-data_**' being set for any parameter being consumed
by an operation.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas2-operation-formData-consume-check:
  description: "Check formData for correct 'consumes' type"
  type: "validation"
  recommended: true
  severity: "warn"
  given: "$"
  then:
    function: "oasOpFormDataConsumeCheck"
```

The function is used by
the [oas2-operation-formData-consume-check]({{< relref "/vacuum/rules/operations/oas2-operation-formData-consume-check" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/formdata_consume_check.go)