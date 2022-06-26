---
title: contact-properties
linkTitle: contact-properties
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Checks name, URL and email for correct implementation.
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
JSON Path: __$.info.contact__ 
{{< /info-box >}}


[Contact Information](https://swagger.io/specification/#contact-object) should be pretty self-explanatory (I hope). Anyone publishing
an OpenAPI contract, should include details of who they are, and how to contact them.

### Why did this violation appear?

One of more contact details are missing from the contract.

### What is this rule checking for?

The following properties are checked to ensure they have been defined.

- name
- url
- email

### Bad example

Missing `url` and `email`

```yaml
info:
  contact:
    name: Chicken Nugget Inc.
```

---

Missing `url`

```yaml
info:
  contact:
    name: Chicken Nugget Inc.
    email: dev-team@chicken-nugnugs.com
```

### How do I fix this violation?

Ensure `name`, `email` and `url` have been defined as part of the specification [Contact Information](https://swagger.io/specification/#contact-object)

#### Spectral Equivalent

The rule is equivalent to [contact-properties](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#contact-properties)