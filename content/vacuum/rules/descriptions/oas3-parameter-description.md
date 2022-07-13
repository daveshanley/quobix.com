---
title: oas3-parameter-description
linkTitle: oas3-parameter-description
date: 2022-06-27T07:59:17-04:00
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
  - "oas3"
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
      summary: "Get a chicken nugget by ID"
      parameters:
        - in: path
          name: nuggetId
          schema:
            type: integer
          required: true
          ...
```

### Good example

```yaml
paths:
  /chicken/nuggets/{nuggetId}:
    get:
      summary: "Get a chicken nugget by ID"
      parameters:
        - in: path
          name: nuggetId
          schema:
            type: integer
          required: true
          description: "Numeric ID of the chicken nugget that you want to get"
        ...
```
## How do I fix this violation?

Add a `description` to the parameter, make it meaningful - add value for the consumer.

### Spectral Equivalent

The rule is equivalent to [oas3-parameter-description](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas3-parameter-description)