---
title: oas2-operation-formData-consume-check
linkTitle: oas2-operation-formData-consume-check
date: 2022-06-29T05:53:17-04:00
draft: false
description: |
 Ensure correct content type is supplied with 'consumes'
severity: warn
recommended: true
ruleType: validation
functionType: openapi
functionName: oasOpFormDataConsumeCheck
type: vacuum
layout: rule
formats:
 - "oas2"
---

[Operations](https://swagger.io/docs/specification/2-0/paths-and-operations/) with the `in: formData` parameter,  
must include '**_application/x-www-form-urlencoded_**' or '**_multipart/form-data_**' in their `consumes` property.

## Why did this violation appear?

When using `in: formData`, the `consumes` property needs to be set to a valid type.

### Bad example

```yaml
swagger: 2.0
paths:
 /survey:
  parameters:
   - in: formData
     name: "name"
     type: string
     description: "A person's name."
   - in: formData
     name: "fav_number"
     type: number
     description: "A person's favorite number"
  post:
   consumes:
    - "chicken-soup/and-cake"
    ...
```

### Good example

```yaml
swagger: 2.0
paths:
 /survey:
  parameters:
   - in: formData
     name: "name"
     type: string
     description: "A person's name."
   - in: formData
     name: "fav_number"
     type: number
     description: "A person's favorite number"
  post:
   consumes:
    - "application/x-www-form-urlencoded"
    ...
```

### How do I fix this violation?

Ensure any `consumes` definitions that are using parameters defined with `in: formData`, are set to either 
'**_application/x-www-form-urlencoded_**' or '**_multipart/form-data_**'

#### Spectral Equivalent

The rule is equivalent to [oas2-operation-formData-consume-check](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-operation-formData-consume-check)