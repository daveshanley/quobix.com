---
title: license-url
linkTitle: license-url
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Checks specification license includes a URL.
severity: info
recommended: false
ruleType: style
functionType: core
functionName: truthy
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

{{< info-box >}}
JSON Path: __$.info.license__ 
{{< /info-box >}}

A [License Object](https://swagger.io/specification/#license-object) should have a `url` defined.

### What is a license for?

It helps consumers of the API understand how it can be used when consumed for commercial purposes. To help
choose a license, [Choose A License](https://choosealicense.com/) can help.

### Why did this violation appear?

There is no `url` object defined as part of the `license` object. The `license` object may also be missing entirely.

### Bad example

{{< highlight yaml >}}
info:
  title: Chicken Nuggets Inc. Developer API
  license:
    name: "MIT"
{{< /highlight >}}

### Good example

{{< highlight yaml >}}
info:
  title: Chicken Nuggets Inc. Developer API
  license:
    name: "MIT"
    url: https://opensource.org/licenses/MIT
{{< /highlight >}}

### How do I fix this violation?

Ensure there is a `url` definition as part of the A [License Object](https://swagger.io/specification/#license-object)

#### Spectral Equivalent

The rule is equivalent to [license-url](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#license-url)