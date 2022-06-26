---
title: oas2-host-not-example
linkTitle: oas2-host-not-example
date: 2022-06-25T15:58:17-04:00
draft: false
description: |
 Checks host has not been set to example.com
severity: warn
recommended: true
ruleType: validation
functionType: core
functionName: pattern
type: vacuum
layout: rule
formats:
 - "oas2"
---

{{< info-box >}}
JSON Path: __$.host__
{{< /info-box >}}

Sometimes the `host` contains '_example.com_', added during testing phases. Sometimes this is left in when the specification
is pushed to production. 

Unless the user is the owner of '_example.com_', it's probably a good idea to check for this and any other example-type
domains used.

### Why did this violation appear?

'_example.com_' was found in the `host` property of the specification.

### Bad example

```yaml
swagger: 2.0
host: "example.com"
schemes:
 - "https"
paths:
 /vacuum:
  ...
```

### Good example

```yaml
swagger: 2.0
host: "literally-anything-else.com"
schemes:
 - "https"
paths:
 /vacuum:
  ...
```

### How do I fix this violation?

Remove '_example.com_' and replace it with something, literally anything other than that.

#### Spectral Equivalent

The rule is equivalent to [oas2-host-not-example](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-host-not-example)