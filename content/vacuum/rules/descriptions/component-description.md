---
title: component-description
linkTitle: component-description
date: 2022-06-28T05:59:17-04:00
draft: false
description: |
  Checks components and definitions for descriptions.
severity: info
recommended: true
ruleType: validation
functionType: openapi
functionName: oasComponentDescriptions
type: vacuum
layout: rule
formats:
  - "oas3"
---

OpenAPI **3+** [Components](https://swagger.io/docs/specification/components/) have `description` properties. 
This rule checks that for every component there is a `description` set.

## Why did this violation appear?

One or more `description` elements in the spec are missing from a component (v3+) 

### Bad example

```yaml
components:
  schemas:
    ChickenNugget:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```

### Good example

```yaml
components:
  schemas:
    ChickenNugget:
      type: object
      description: "This represents a chicken nugget, used for all kinds of nugget fun."
      properties:
        id:
          type: integer
        name:
          type: string
```
## How do I fix this violation?

Make sure every `description` in all references in `components` are unique and meaningful. Descriptions really are the most important part of a spec.

### Spectral Equivalent

There is no spectral equivalent. This rule is unique to vacuum.