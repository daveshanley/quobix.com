---
title: oasOpSecurityDefined
linkTitle: oasOpSecurityDefined
date: 2022-07-01T05:39:53-04:00
draft: false
description: |
  Ensure operation security has been correct defined.
type: vacuum
layout: function

---

`oasOpSecurityDefined` will check a specification to ensure each path operation has correctly defined security. 

The function ensures any security schemes referenced in the operation, is present in the global specification security definition.

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
oas3-operation-security-defined:
  description: "Check operation security is correctly defined"
  type: "validation"
  recommended: true
  severity: "error"
  given: "$"
  then:
    function: "oasOpSecurityDefined"
```

The function is used by
the [oas3-operation-security-defined]({{< relref "/vacuum/rules/security/oas3-operation-security-defined" >}}) Rule

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/openapi/operation_security_defined.go)