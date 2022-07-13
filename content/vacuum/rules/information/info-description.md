---
title: info-description
linkTitle: info-description
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Checks specification has defined a description.
severity: error
recommended: true
ruleType: validation
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

The [Info Object](https://swagger.io/specification/#info-object) should always have a `description` defined. 

Think about the kind of questions that someone consuming the contract would want to know. A description should try to answer questions like:

- What is this API contract about? 
- Why does it exist?
- Why should I use it? 
- Who built it?
- Where can I learn more?

### Why did this violation appear?

There is no `description` defined in the `info` object. The `info` object may also be missing entirely.

### Bad example

{{< highlight yaml >}}
info:
  title: Chicken Nuggets Inc. Developer API
{{< /highlight >}}

### Good example

{{< highlight yaml >}}
info:
  title: Chicken Nuggets Inc. Developer API
  description: |
    Do you love chicken nuggets? Need API driven chicken nugget delivery? We got you covered. Built by nugget fanatics with love.
    Check out https://chicken-nug-nugs.com/api for more information
{{< /highlight >}}

### How do I fix this violation?

Ensure `description` has been defined with something meaningful, as a part of the [Info Object](https://swagger.io/specification/#info-object)

#### Spectral Equivalent

The rule is equivalent to [info-description](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#info-description)