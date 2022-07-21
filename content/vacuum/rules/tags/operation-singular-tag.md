---
title: operation-singular-tag
linkTitle: operation-singular-tag
date: 2022-06-20T15:53:17-04:00
draft: false
description: |
 Check operations only contain a single tag
severity: warn
recommended: false
ruleType: style
functionType: openapi
functionName: oasOpSingleTag
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

[Operation Tags](https://swagger.io/docs/specification/grouping-operations-with-tags/) are used to define operation _categories_ or _groups_.

Tools use tags differently when generating code, or documentation. Sometimes, multiple tags can interfere with how tools operate. 

To be honest, this rule is a bit obscure, generally it's not recommended unless there is a specific use case for it.

### Why did this violation appear?

Multiple tags have been used in an operation. 

### What is this rule checking for?

Every [Operation](https://swagger.io/specification/#operation-object) is only allowed a single tag to be defined


### Bad example

{{< highlight yaml >}}
paths:
  /snakes/cakes:
    post:
      tags: 
        - snakes
        - cakes
        - planes
{{< /highlight >}}

### Good Example

{{< highlight yaml >}}
paths:
  /snakes/cakes:
    post:
      tags: 
        - cakes
{{< /highlight >}}


### How do I fix this violation?

Reduce the number of tags an operation uses, down to one.

#### Spectral Equivalent

The rule is equivalent to [operation-singular-tag](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-singular-tag)