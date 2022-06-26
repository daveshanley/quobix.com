---
title: no-script-tags-in-markdown
linkTitle: no-script-tags-in-markdown
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Check there are no <script> tags in descriptions.
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: noEvalDescription
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

Some tools use JavaScript to render OpenAPI docs. They can be vulnerable to XSS attacks if they render HTML/markdown 
from descriptions that contain malicious `<script>` code.

This rule protects against potentially being attacked by malicious code. It's a **really bad idea** to execute randomly
sourced remote JavaScript from within your own application.

### Why did this violation appear?

There is JavaScript code being injected via a `<script>` tag defined in a `description` value.

### Bad example

{{< highlight yaml >}}
paths:
  /snakes/cakes:
    post:
      description: "This is a hack attack. <script>alert('hacked!')</script>";
{{< /highlight >}}

### How do I fix this violation?

Ensure there is no JavaScript or `<script/>` tags in any description.

#### Spectral Equivalent

The rule is equivalent to [no-script-tags-in-markdown](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#no-script-tags-in-markdown)