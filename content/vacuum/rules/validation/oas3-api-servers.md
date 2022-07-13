---
title: oas3-api-servers
linkTitle: oas3-api-servers
date: 2022-06-28T04:53:17-04:00
draft: false
description: |
 Check OpenAPI 3 server definitions for correctness.
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: oasAPIServers
type: vacuum
layout: rule
formats:
 - "oas3"

---

When configuring [Servers](https://swagger.io/docs/specification/api-host-and-base-path/) in OpenAPI, its
important to ensure correctness, so tooling can inspect endpoints automatically.

Mis-configured server configurations will damage automation capabilities for the contract.

## What is this rule checking for?

- Server definitions exist
- Contains URL
- URL is valid
- URL does not contain a trailing slash

## Why did this violation appear?

The `servers` object is missing from the spec, or one of more entries contain an invalid URL.

### Bad example

```yaml
servers:
  - url: "I am not a URL"
  - url: "httpWRONG//i-am-not-valid"
  - url: "https://i-end-with-a-slash.com/"
```

### How do I fix this violation?

Make sure there are `servers` definitions and that all the URLs are correct.

#### Spectral Equivalent

The rule is equivalent to [oas3-api-servers](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas3-api-servers)