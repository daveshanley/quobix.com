---
title: operation-operationId
linkTitle: operation-operationId
date: 2022-06-20T15:53:17-04:00
draft: false
description: |
    Check every operation for an operationId
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasOpId
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---

Every operation must have an `operationId`. It's critical that all
[Operation](https://swagger.io/specification/#operation-object)'s have an identifier. 

An `operationId` is used by documentation tools, code generators and mocking engines. It's used to define page names, 
URI's and method names in auto-generated code.

### Why did this violation appear?

There is an [Operation](https://swagger.io/specification/#operation-object) in your specification that has not defined an `operationId`.

### What is this rule checking for?

Every [Operation](https://swagger.io/specification/#operation-object) is checked for the following

- Operation ID

### A bad example

{{< highlight yaml >}}
"/pet":
  post:
    responses:
      '200':
        description: New pet was added, great job.
{{< /highlight >}}

### A good example

{{< highlight yaml >}}
"/pet":
  post:
    operationId: createNewPet
    responses:
      '200':
        description: New pet added, great job. 
{{< /highlight >}}

### How do I fix this violation?

Every single [Operation](https://swagger.io/specification/#operation-object) needs an `operationId`. It's a critical requirement to be able to identify each individual 
operation uniquely. Ensure all operations have an `operationId`