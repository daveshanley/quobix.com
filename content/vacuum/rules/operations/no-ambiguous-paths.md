---
title: no-ambiguous-paths
linkTitle: no-ambiguous-paths
date: 2022-07-17T11:53:17-04:00
draft: false
description: |
 Check tags used in operations are defined in the global context of the specification
severity: error
recommended: true
ruleType: validation
functionType: openapi
functionName: ambiguousPaths
type: vacuum
layout: rule
formats:
 - "oas3"
 - "oas2"
---

Every path in an OpenAPI specification, should be unambiguous and clearly resolvable. What this essentially means
is that each path should be able to be resolved independently when using variables in path segments.

For example '**/burgers/{burgerId}**' and '**/{foodType}/burgers**' are ambiguous, they can't be resolved and either
could trigger a different operation.

### Why did this violation appear?

Ambiguous paths were detected, paths that can't be used together in the same specification.

### What is this rule checking for?

Every path needs to be unique and not conflict with other paths through ambiguity. 

### Bad example

```yaml
paths: 
  '/{id}/ambiguous':
    get:
      description: Something that could be something else.
  '/ambiguous/{id}':
    get:
      description: Another thing that could be something else.
```

### Good Example

```yaml
paths: 
  '/something/{id}':
    get:
      description: A certain thing.
  '/another-thing/{id}':
    get:
      description: Another thing of some kind.
```

### How do I fix this violation?

Ensure all paths can be uniquely resolved, the report will indicate which paths are ambiguous - they need to be changed.
