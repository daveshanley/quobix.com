---
title: paths-kebab-case
linkTitle: paths-kebab-case
date: 2022-07-19T09:00:17-04:00
draft: false
description: |
 Ensure all segments of a path are kebab-case
severity: error
recommended: true
ruleType: style
functionType: openapi
functionName: pathsKebabCase
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

Paths should **not** use _underscores_ or _uppercase_ letters. Neither should they be empty.

Servers may or may not be case-sensitive, so everything should be lowercase, there is no good reason for uppercase 
path segments. 

### Why did this violation appear?
A segment in one of the paths defined in the specification, is not **kebab-case**

### What is this rule checking for?

Every path segment isn't empty, and if not a variable - checks the value is kebab-case.

### Bad example

```yaml
paths: 
  '/iAm/not_a/valid/PATH':
    get:
      description: This is no good.
  '/hey~there/How/are//you':
    post:
      description: This is also no good.
```

### Good Example

```yaml
paths: 
  '/always/kebab-case/never-anything-else':
    get:
      description: A certain pass.
  '/this-is/a-good/example-of/kebab-case':
    post:
      description: Will always pass.
```

### How do I fix this violation?

Ensure that no path segment uses any other case, other than **kebab-case**