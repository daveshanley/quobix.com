---
title: oas2-parameter-description
linkTitle: oas2-parameter-description
date: 2022-06-27T07:58:17-04:00
draft: false
description: |
  Checks specification parameters have a description.
severity: warn
recommended: true
ruleType: style
functionType: openapi
functionName: oasParamDescriptions
type: vacuum
layout: rule
formats:
  - "oas2"
---

This rule checks that [Parameters](https://swagger.io/docs/specification/describing-parameters/) contain a `description`.

Descriptions for parameters are **really important**. Documentation generation tools use this description as the main 
bulk of the documentation for describing what a parameter does and its effect. 

It's amazing how often API authors leave this blank or don't put anything meaningful in here.

## Why did this violation appear?

One [Parameter](https://swagger.io/docs/specification/describing-parameters/) or more are missing a `description`.

### Bad example

```yaml
paths:
  /chicken/nuggets/{nuggetId}:
    get:
      summary: "Gets a chicken nugget by ID."
      parameters:
        - in: path
          name: nuggetId
        - in: query
          name: addSauce
          ...
```

### Good example

```yaml
paths:
  /chicken/nuggets/{nuggetId}:
    get:
      summary: "Gets a chicken nugget by ID."
      parameters:
        - in: path
          name: nuggetId
          description: "Chicken nuggetId is the kebab-case name of the product."
        - in: query
          name: addSauce
          description: "Set this to 'true' to add ketchup, leave blank otherwise."
        ...
```
## How do I fix this violation?

Add a `description` to the parameter, make it meaningful.

### Spectral Equivalent

The rule is equivalent to [oas2-parameter-description](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-parameter-description)