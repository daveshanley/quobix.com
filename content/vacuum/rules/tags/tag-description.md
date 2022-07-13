---
title: tag-description
linkTitle: tag-description
date: 2022-06-29T06:53:17-04:00
draft: false
description: |
 Ensure that global tags contain descriptions
severity: warn
recommended: false
ruleType: validation
functionType: core
functionName: schema
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

Global [Tags](https://swagger.io/specification/#tag-object) define meta-data that can then be used by 
[Operations and Paths Rules]({{< relref "/vacuum/rules/operations" >}})

Tags are used as navigation/taxonomy meta-data for documentation and code generation tooling. Descriptions are
**really** important for consumers.

## Why did this violation appear?

One or more global tags does not contain a `description`

### Bad example

```yaml
openapi: 3.0.1
tags:
  - name: "Tag1"
  - name: "Tag2"  
info:
    ...
```


### Good Example

```yaml
openapi: 3.0.1
tags:
  - name: "Tag1"
    description: "Tag1 is a tag for group 1, and related things"
  - name: "Tag2"
    description: "Tag2 is a tag for group 2, which is only for one thing."
info:
  ...

```

### How do I fix this violation?

Ensure global `tags` each have a `description` defined.

#### Spectral Equivalent

The rule is equivalent to [tag-description](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#tag-description)