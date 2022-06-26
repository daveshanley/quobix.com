---
title: schema
linkTitle: schema
date: 2022-06-25T07:39:53-04:00
draft: false
description: |
    Checks that an object matches a supplied JSON Schema
type: vacuum
layout: function

---

**_schema_** is a function that takes a [JSON Schema](https://json-schema.org/) definition, and validates that
an object looked up via  **JSON Path** matches that schema. If the object does not exist, the function will trigger a 
[rule violation]({{< relref "/vacuum/rules" >}})

### How do I use this function?

This function is configured by the following `functionOptions`

|  NAME  | DESCRIPTION                     |     TYPE      | REQUIRED? |
|:------:|---------------------------------|:-------------:|:---------:|
| schema | The schema you want to evaluate | `JSON Schema` |    yes    |

#### Example [ruleset]({{< relref "vacuum/rulesets" >}}) configuration

```yaml
openapi-tags:
  description: Global tags should exist, and be an array
  type: validation
  recommended: false
  given: "$"
  then:
    field: "tags"
    function: "schema"
    functionOptions:
      schema:
        type: "array"
        items:
          type: "object"
          minItems: 1
        uniqueItems: true
```

---

[View Spectral Equivalent](https://meta.stoplight.io/docs/spectral/ZG9jOjExNg-core-functions#schema)

---

[View Function Source](https://github.com/daveshanley/vacuum/blob/main/functions/core/schema.go)