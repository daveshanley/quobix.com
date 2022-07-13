---
title: operation-parameters
linkTitle: operation-parameters
date: 2022-06-20T15:53:17-04:00
draft: false
description: |
 Check operations parameters are unique and non-repeating
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasOpParams
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

Operation [Parameters](https://swagger.io/docs/specification/describing-parameters/) can be described through paths, headers
cookies and queries. 

It's important to ensure that none of these parameters are duplicates, which is easier that you may think, when an operation 
has multiple parameter definitions across different types.


### Why did this violation appear?

There is a [Parameter](https://swagger.io/docs/specification/describing-parameters/) in the specification that has been duplicated
or it's using multiple input types

### What is this rule checking for?

Every [Operation](https://swagger.io/specification/#operation-object) is checked for the following

- Parameters are unique in each operation
- Correct use of forms and parameters.

### Bad examples

Duplicate `in: body` definitions (OpenAPI 2 only):

{{< highlight yaml >}}
paths:
  /snakes/cakes:
    post:
      parameters:
        - in: body
          name: snakes
        - in: body
          name: cake
{{< /highlight >}}

---

Using both `in: body` and `in: formData` together (OpenAPI 2 only):

{{< highlight yaml >}}
paths:
  /snakes/cakes:
    post:
      parameters:
        - in: body
          name: snakes
        - in: formData
          name: cake
{{< /highlight >}}

---

Duplicate parameter names:

{{< highlight yaml >}}
paths:
  /users/{id}:
    get:
      parameters:
        - in: path
          name: id
        - in: query
          name: id
{{< /highlight >}}

### How do I fix this violation?

Check your parameters for duplicate names and mis-use of `in: body` and `in: formData`.

#### Spectral Equivalent

The rule is equivalent to [operation-parameters](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#operation-parameters)