---
title: path-params
linkTitle: path-params
date: 2022-06-20T15:53:17-04:00
draft: false
description: |
 Check all variations of an operation's path parameters are correct.
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasPathParam
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

[Path Parameters](https://swagger.io/docs/specification/describing-parameters/#path-parameters) are pretty easy to get wrong. 

Sometimes, they can be defined, but never used, or used but never defined. Sometimes they are duplicated, or set to _required_, but then
are not defined. 

There is a whole raft of issues that can appear with [Path Parameters](https://swagger.io/docs/specification/describing-parameters/#path-parameters), so this rule
is one of the more complex ones.

### Why did this violation appear?

An operation has used path parameters, but has incorrectly implemented them.

### What is this rule checking for?

- Unique paths (no duplicate parameters)
- Duplicate parameter names in paths
- Unknown (un-named) parameters
- Compliance with 'required' state
- All parameters must be defined

### Bad examples

Duplicate paths (different param names, but conflicting path definitions)

{{< highlight yaml >}}
 paths:
  /pizza/{cake}/{icecream}:
    parameters:
      - in: path
        name: cake
    get:
      parameters:
        - in: path
          name: icecream
  /pizza/{soda}/{candy}:
    parameters:
      - in: path
        name: soda
    get:
      parameters:
        - in: path
          name: candy  
          ...
{{< /highlight >}}

---

Missing parameters (in path, but not defined)

{{< highlight yaml>}}
paths:
  /pizza/{type}/{toppings}:
    parameters:
      - in: path
        name: type
    get:
      '200':
        ...
{{< /highlight >}}


---

Using invalid `required` type

{{< highlight yaml >}}
paths:
 /musical/{melody}/{beats}:
   parameters:
       - in: path
         name: melody
         required: NOT_VALID_SHOULD_BE_BOOL
   get:
     parameters:
       - in: path
         name: beats
         required: true
{{< /highlight >}}


---

Parameter has been defined multiple times

{{< highlight yaml>}}
paths:
 /musical/{melody}/{beats}:
   parameters:
       - in: path
         name: melody
       - in: path
         name: melody
   get:
     parameters:
       - in: path
         name: beats
       - in: path
         name: beats
{{< /highlight >}}

### How do I fix this violation?

Ensure all path params are used, they are unique and accounted for.

#### Spectral Equivalent

The rule is equivalent to [path-params](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#path-params)