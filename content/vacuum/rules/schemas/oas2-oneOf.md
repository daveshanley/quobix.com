---
title: oas2-oneOf
linkTitle: oas2-oneOf
date: 2022-06-29T08:53:17-04:00
draft: false
description: |
  Check for invalid use of 'oneOf' 
severity: warn
recommended: true
ruleType: validation
functionType: openapi
functionName: oas2PolymorphicOneOf
type: vacuum
layout: rule
formats:
 - "oas2"
---

Polymorphism is a concept that exists in [JSON Schema](https://json-schema.org/). OpenAPI is a **superset** of 
[JSON Schema](https://json-schema.org/) which means it can inherit (or abandon) what ever it likes.

[oneOf](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof) is a keyword that was not [introduced](https://swagger.io/docs/specification/data-models/oneof-anyof-allof-not/) 
into OpenAPI until version 3.0.

It's a common mistake when working on specifications, reading newer docs and mixing and matching capabilities. This 
rule checks for those mistakes.

{{< card "A note on Polymorphism" >}}
We would recommend against using '**oneOf**' in general. It might make things easier to build complex models, but it does not translate well 
when tools like code generators try and create polymorphic structures, and the target language doesn't support inheritance; (like golang).

Think of it this way: As a consumer of this API, '**oneOf**' means my application is getting a number of different types of objects back. My application
would have to build logic to cater to each different variation of response combinations. 

[It could be meat, could be cake, it could be meat-cake!](https://www.youtube.com/watch?v=aVgUzvxw7dk). 

It's not a great [DX]({{<  relref "/articles/experience-engineering" >}}). 

Make your API definitions **explicit** in nature.
{{< /card >}}

## Why did this violation appear?

The specification is a [swagger](https://swagger.io/docs/specification/2-0/basic-structure/) specification (OpenAPI 2). vacuum 
found references to [oneOf](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof) in the specification, 
that should not be there. 

### Bad example

```yaml
swagger: 2.0
paths:
 /mystery:
  post:
    parameters:
      - in: body
        name: whatCouldItBe
        schema:
          oneOf:
            - $ref: "#/shared-components/schemas/Meat"
            - $ref: "#/shared-components/schemas/Cake" 
          ...
```
### Good Example

```yaml
openapi: 3.1
/pets:
  post:
    requestBody:
      content:
        application/json:
          schema:
            oneOf:
              - $ref: "#/shared-components/schemas/Meat"
              - $ref: "#/shared-components/schemas/Cake"
```

## How do I fix this violation?

Don't use **oneOf** with a Swagger/OpenAPI 2 spec. It's not compatible.

## Spectral Equivalent

The rule is equivalent to [oas2-oneOf](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#oas2-oneof)