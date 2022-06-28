---
title: description-duplication
linkTitle: description-duplication
date: 2022-06-28T05:59:17-04:00
draft: false
description: |
  Checks specification parameters have a description.
severity: info
recommended: true
ruleType: validation
functionType: openapi
functionName: oasDescriptionDuplication
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---

Descriptions are **really important**. Often, contract authors _copy and paste_ a lot. This it because it's easier
to copy and paste things and modify them, rather than typing out a bunch of YAML or JSON.

The problem with copy and pasting for contracts should be clear. Duplication of content is everywhere, including
descriptions. This is really un-helpful for anyone trying to understand a contract, not to mention creating
a really poor experience for documentation users.

This rule checks that no two descriptions are the same.

## Why did this violation appear?

One or more `description` elements in the spec are identical. 

### Bad example

```yaml
paths:
  /chicken/nuggets/{nuggetId}:
    get:
      description: "Get a chicken nugget by ID"
      ...
components:
  schemas:
    ChickenNugget:
      description: "Get a chicken nugget by ID"
```

### Good example

```yaml
paths:
  /chicken/nuggets/{nuggetId}:
    get:
      description: "Get a chicken nugget by ID"
      ...
components:
  schemas:
    ChickenNugget:
      description: "Represents a chicken nugget as an object"
```
## How do I fix this violation?

Make sure every `description` is unique and meaningful. Descriptions really are the most important part of a spec.

### Spectral Equivalent

There is no spectral equivalent. This rule is unique to vacuum.