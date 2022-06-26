---
title: openapi-tags-alphabetical
linkTitle: openapi-tags-alphabetical
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Check there is no JavaScript code calling eval() in descriptions.
severity: info
recommended: false
ruleType: style
functionType: core
functionName: alphabetical
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

If you want to ensure readability for humans, it can make things much easier to read if operation tags are listed alphabetically.

This rule is an edge case that will only apply if operations contain multiple tags. For this reason, it is not
a good idea to run this rule with the [operation-singular-tag](../../operations/operation-singular-tag) Rule.

### Why did this violation appear?

Tags are not listed alphabetically for one or more operations.

### Bad example

{{< highlight yaml >}}
paths:
  /snakes/cakes:
    post:
      tags:
      - snakes
      - cakes
{{< /highlight >}}

### Good Example

{{< highlight yaml >}}
paths:
  /snakes/cakes:
    post:
      tags:
      - cakes
      - snakes
{{< /highlight >}}

### How do I fix this violation?

Ensure tags are listed alphabetically in the specification.

#### Spectral Equivalent

The rule is equivalent to [openapi-tags-alphabetical](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#openapi-tags-alphabetical)