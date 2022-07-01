---
title: oas3-host-trailing-slash
linkTitle: oas3-host-trailing-slash
date: 2022-06-26T14:58:17-04:00
draft: false
description: |
 Ensure that there is no trailing slash on host definition
severity: warn
recommended: true
ruleType: validation
functionType: core
functionName: pattern
type: vacuum
layout: rule
formats:
 - "oas3"
---

{{< info-box >}}
JSON Path: __$.servers[*]__
{{< /info-box >}}

The `url` value cannot end with a trailing slash. The addition of a slash will create invalid URI's when consumed
by tools.

### Why did this violation appear?

'/' was found at the end of the `url` property of the specification.

### Bad example

```yaml
servers:
 - url: "https//quobix.com/"
paths:
 /vacuum:
  ...
```
Will generate **quobix.com//vacuum**. The double slash comes from leaving it on the end of the host.


### Good example

```yaml
servers:
 - url: "https//quobix.com"
paths:
 /vacuum:
```
### How do I fix this violation?

Remove '/' from the end of the `url` property.

#### Spectral Equivalent

The rule is equivalent to [oas3-host-trailing-slash](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas3-host-trailing-slash)