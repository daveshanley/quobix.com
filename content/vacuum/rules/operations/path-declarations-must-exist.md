---
title: path-declarations-must-exist
linkTitle: path-declarations-must-exist
date: 2022-06-29T05:53:17-04:00
draft: false
description: |
 Check all variations of an operation's path parameters are correct.
severity: error
recommended: true
ruleType: validation
functionType: core
functionName: pattern
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

{{< info-box >}}
JSON Path: __$.paths__
{{< /info-box >}}

When defining [Paths](https://swagger.io/docs/specification/paths-and-operations/) and using [Path Parameters](https://swagger.io/docs/specification/describing-parameters/)
It's important to not add blank declarations.

This rule checks that no `paths` is using empty path parameters.

## Why did this violation appear?

One or more `paths` definitions has an empty parameter defined.

### Bad example

```yaml
 paths:
  /pizza/{}/{icecream}:
    get:
      parameters:
        - in: path
          name: "icecream"  
          ...
```

### Good example

```yaml
 paths:
  /pizza/{cake}/{icecream}:
    get:
      parameters:
      - in: path
        name: "cake"
      - in: path
        name: "icecream"  
        ...
```

### How do I fix this violation?

Ensure there are no empty '**{}**' path parameters defined anywhere.

#### Spectral Equivalent

The rule is equivalent to [path-declarations-must-exist](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#path-declarations-must-exist)