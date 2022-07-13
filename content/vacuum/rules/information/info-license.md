---
title: info-license
linkTitle: info-license
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Checks specification has defined a license.
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
JSON Path: __$.info__ 
{{< /info-box >}}

The [Info Object](https://swagger.io/specification/#info-object) should have a `license` defined.

### What is a license for?

It helps consumers of the API understand how it can be used when consumed for commercial purposes. To help
choose a license, [Choose A License](https://choosealicense.com/) can help.

A [License Object](https://swagger.io/specification/#license-object) has two properties.

- name
- url

### Why did this violation appear?

There is no `license` object defined as part of the `info` object. The `info` object may also be missing entirely.

### Bad example

{{< highlight yaml >}}
info:
  title: Chicken Nuggets Inc. Developer API
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

Ensure there is a `license` definition as part of the [Info Object](https://swagger.io/specification/#info-object)

#### Spectral Equivalent

The rule is equivalent to [info-license](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#info-license)