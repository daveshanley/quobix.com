---
title: no-eval-in-markdown
linkTitle: no-eval-in-markdown
date: 2022-06-24T15:53:17-04:00
draft: false
description: |
 Check there is no JavaScript code calling eval() in descriptions.
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
from descriptions that contain malicious `eval()` calls.

### Why did this violation appear?

There is JavaScript code using `eval()` defined in a `description` value.

### Bad example

{{< highlight yaml >}}
paths:
  /snakes/cakes:
    post:
      description: "This is a hack attack. <script>eval('alert(\'hacked!\')')</script>";
{{< /highlight >}}

### Good Example

### How do I fix this violation?

Ensure there is no JavaScript or `<script/>` tags in any description.

#### Spectral Equivalent

The rule is equivalent to [no-eval-in-markdown](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#no-eval-in-markdown)