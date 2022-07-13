---
title: operation-operationId-unique
linkTitle: operation-operationId-unique
date: 2022-06-20T15:53:17-04:00
draft: false
description: |
 Check every operation for an operationId that is unique
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasOpIdUnique
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

Every operation must have an `operationId` that is **unique**. It's critical that all
[Operation](https://swagger.io/specification/#operation-object)'s can be identified independently, without the need
to analyze the path, params and verbs to locate an operation.

An `operationId` is used by documentation tools, code generators and mocking engines. It's used to define page names,
URI's and method names in auto-generated code. 

It needs to be unique so there are no clashes with other operations (nothing else can share that ID).

### Why did this violation appear?

There is an [Operation](https://swagger.io/specification/#operation-object) in the specification that has a duplicated `operationId`.

### What is this rule checking for?

Every [Operation](https://swagger.io/specification/#operation-object) is checked for the following

- Operation ID is unique in the spec.

### A bad example
{{< highlight yaml >}}
"/pet":
  post:
    operationId: createPet
    responses:
      '200':
        ...
"/pet":
  put:
    operationId: createPet
    responses:
      '200':
        ...        
{{< /highlight >}}

### A good example

{{< highlight yaml >}}
"/pet":
  post:
    operationId: createPet
    responses:
      '200':
        ...
"/pet":
  put:
    operationId: updatePet
    responses:
      '200':
        ...   
{{< /highlight >}}

### How do I fix this violation?

Every single [Operation](https://swagger.io/specification/#operation-object) needs an `operationId`. It's a critical requirement to be able to identify each individual
operation uniquely. Ensure all operations have a clear, unique `operationId`

#### Spectral Equivalent

The rule is equivalent to [operation-operationId-unique](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-operationid-unique)