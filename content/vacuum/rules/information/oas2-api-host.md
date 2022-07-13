---
title: oas2-api-host
linkTitle: oas2-api-host
date: 2022-06-30T07:56:17-04:00
draft: false
description: |
 Checks 'host' value is present and not empty.
severity: info
recommended: true
ruleType: style
functionType: core
functionName: truthy
type: vacuum
layout: rule
formats:
 - "oas2"
---

In [OpenAPI 2](https://swagger.io/specification/v2/) `host` needs to be present and not empty.

Tools use this value when generating code, mocks, tests or documentation. It's important that it's not left out.

### Why did this violation appear?

The `host` value is missing, or it's been left empty.

### Bad example

```yaml
swagger: 2.0
host: ""
paths:
 /vacuum:
  ...
```

### Good example

```yaml
swagger: 2.0
host: "quobix.com"
schemes:
 - "https"
paths:
 /vacuum:
  ...
```

### How do I fix this violation?

Add a `host` value. Make sure it's a real working host and not example.com or similar.

#### Spectral Equivalent

The rule is equivalent to [oas2-api-host](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-api-host)