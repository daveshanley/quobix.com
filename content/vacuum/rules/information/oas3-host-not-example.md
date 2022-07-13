---
title: oas3-host-not-example
linkTitle: oas3-host-not-example
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
JSON Path: __$.servers[*].url__
{{< /info-box >}}

Sometimes a [Server](https://swagger.io/specification/#server-object) definition `url` contains '_example.com_', added during testing phases. Sometimes this is left in when the specification
is pushed to production. 

Unless the user is the owner of '_example.com_', it's probably a good idea to check for this and any other example-type
domains used.

### Why did this violation appear?

'_example.com_' was found in the `url` property of a [Server](https://swagger.io/specification/#server-object) definition.

### Bad example

```yaml
openapi: 3.1
servers:
 - url: "https://example.com"
  ...
```

### Good example

```yaml
openapi: 3.1
servers:
 - url: "https://quobix.com/vacuum/api"
   description: "Central API endpoint for the vacuum endpoint"
  ...
```

### How do I fix this violation?

Remove '_example.com_' and replace it with something, literally anything other than that.

#### Spectral Equivalent

The rule is equivalent to [oas3-host-not-example](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas3-host-not-example)