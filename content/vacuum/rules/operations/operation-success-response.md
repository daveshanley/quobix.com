---
title: "operation-success-response"
linkTitle: "operation-success-response"
date: 2022-06-21T09:23:21-04:00
draft: false
description: Operations must return a 'success' response code.
severity: warn
recommended: false
ruleType: validation
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---

Check every operation has either a `2xx` or `3xx` response code.

[Operation](https://swagger.io/specification/#operation-object)'s have an identifier.

An `operationId` is used by documentation tools, code generators and mocking engines. It's used to define page names,
URI's and method names in auto-generated code.

### Why did this violation appear?

There is an [Operation](https://swagger.io/specification/#operation-object) in your specification that has not defined an `operationId`.

### What is this rule checking for?

Every [Operation](https://swagger.io/specification/#operation-object) is checked for the following

- Operation ID

### How do I fix this violation?

Every single [Operation](https://swagger.io/specification/#operation-object) needs an `operationId`. It's a critical requirement to be able to identify each individual
operation uniquely. Ensure all operations have an `operationId`