---
title: info-contact
linkTitle: info-contact
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Checks specification has defined contact details.
severity: info
recommended: false
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

[Contact Information](https://swagger.io/specification/#contact-object) should be pretty self-explanatory (I hope). This rule
checks that the `contact` object has been set on the [Information Object](https://swagger.io/specification/#info-object)

### Why did this violation appear?

There is no `contact` object set in the `info` object. The `info` object may also be missing.

### What is this rule checking for?

The following properties are checked to ensure they have been defined.

- info contact

### Bad example

{{< highlight yaml >}}
info:
  title: Chicken Nuggets Inc. Developer API
  description: This contract has no
{{< /highlight >}}

### Good example

{{< highlight yaml >}}
info:
  title: Chicken Nuggets Inc. Developer API
  description: |
    Want nuggets? Need API driven chicken nugget delivery? We got you covered. Built by nugget fanatics. 
  contact:
    name: Chicken Nuggets Inc.
    url: https://chicken-nugnugs.com
    email: dev-team@chicken-nugnugs.com
{{< /highlight >}}



### How do I fix this violation?

Ensure `name`, `email` and `url` have been defined as part of the specification [Contact Information](https://swagger.io/specification/#contact-object)

#### Spectral Equivalent

The rule is equivalent to [contact-properties](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#contact-properties)