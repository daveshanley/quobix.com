---
title: openapi-tags
linkTitle: openapi-tags
date: 2022-06-25T15:53:17-04:00
draft: false
description: |
 Check specification global tags have been defined correctly.
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


## Why did this violation appear?

Global tags have not been defined, or they are not an `array` as required by the schema.

### Bad examples

No `tags` defined

```yaml
openapi: 3.0.1
info:
  description: "This is a specification"
paths:
  /some/path:
    ...
```
---

Tags are not an `array`

```yaml
openapi: 3.0.1
tags:
  name: "Tag"
  description: "I am a description"
info:
  description: "This is a specification"
paths:
  /some/path:
    ...
```


### Good Example

```yaml
openapi: 3.0.1
tags:
  - name: "SomeTag"
    description: "I am a tag description."
  - name: "AnotherTag"
    description: "I am another tag description."
info:
  description: "This is a specification"
paths:
  /some/path:
    ...
```

### How do I fix this violation?

Ensure global `tags` have been defined, and ensure they are an `array`.

#### Spectral Equivalent

The rule is equivalent to [openapi-tags](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#openapi-tags)