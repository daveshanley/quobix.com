---
title: no-http-verbs-in-path
linkTitle: no-http-verbs-in-path
date: 2022-07-19T06:23:17-04:00
draft: false
description: |
 Ensure that path segments do not contain HTTP Verbs.
severity: warn
recommended: true
ruleType: style
functionType: openapi
functionName: noVerbsInPath
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---
When [HTTP verbs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (_get/post/put etc._) are used in path segments, it muddies the semantics of REST and creates a confusing 
and inconsistent experience. 

It's highly recommended that verbs are not used in path segments. Replace those HTTP verbs with more meaningful nouns.

### Why did this violation appear?

An [HTTP verb](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) appeared as part of a segment of a path.

### What is this rule checking for?

Every path segment does not contain a known HTTP verb.

### Bad example

```yaml
paths: 
  '/go/get/something':
    get:
      description: GET is a part of the path, which is bad
  '/post/new/thing':
    post:
      description: Do not include verbs in paths.
```

### Good Example

```yaml
paths: 
  '/something':
    get:
      description: A certain thing.
  '/something/else':
    post:
      description: Another thing of some kind.
```

### How do I fix this violation?

Ensure that no path segment uses an HTTP verb. Replace them with meaningful nouns or other verbs that make sense.