---
title: openapi-tags-alphabetical
linkTitle: openapi-tags-alphabetical
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Check global tags are in alphabetic order.
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

{{< info-box >}}
JSON Path: __$.tags__
{{< /info-box >}}

If you want to ensure readability for humans, it can make things much easier to read if tags are listed alphabetically.

### Why did this violation appear?

Global tags are not listed alphabetically for one or more operations.

### Bad example

```yaml
tags: 
  - name: "Nuggets"
    description: "Chicken nuggets"
  - name: Apples
    description: "Apples are great"
```
### Good Example

```yaml

tags: 
  - name: "Apples"
    description: "Apples are great"
  - name: "Nuggets"
    description: "Chicken nuggets"
```

### How do I fix this violation?

Ensure tags are listed alphabetically in the specification.

#### Spectral Equivalent

The rule is equivalent to [openapi-tags-alphabetical](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#openapi-tags-alphabetical)