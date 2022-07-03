---
title: oas2-valid-schema-example
linkTitle: oas2-valid-schema-example
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
  Examples must be present and valid for operations and definitions
severity: warn
recommended: true
ruleType: validation
functionType: openapi
functionName: oasExample
type: vacuum
layout: rule
formats:
  - "oas2"
---

[Examples](https://swagger.io/docs/specification/adding-examples/) are really important. When defining an OpenAPI specification, it's critical that every operation
request and response have examples defined for them. The same applies to definitions defined as references.

[Examples](https://swagger.io/docs/specification/adding-examples/) help consumers of your API understand what real data should actually look like when sending requests, 
or listening for responses. 

Good examples are particularly valuable when data is complex, deep, nested or contains special formatting.

## Why did this violation appear?

The specification is missing examples in one or more areas. Examples need to be added *everywhere* for this rule to pass.

## What is this rule checking for?

The rule looks through the spec at the following elements, and checks that examples have been clearly defined for each.

- Operation Responses
- Operation Parameters
- Global Definitions
- Global Parameters 
- Example Schema Check
- Use of value/externalValue

## Validating the schema.

If the operation or component implementing an example is an object (not a primitive), then vacuum will
validate the example matches the schema defined.

## Checking  value/externalValue

Examples can have an `externalValue` or a `value`, but they **cannot have both**.

## What does a good example look like?

In OpenAPI 2.0, there is no way to include examples for a [RequestBody](https://swagger.io/docs/specification/describing-request-body/), unlike in OpenAPI 3. 
This means that examples can only be added to [Responses](https://swagger.io/docs/specification/2-0/describing-responses/), [Definitions](https://swagger.io/specification/v2/) or
[Parameters](https://swagger.io/docs/specification/2-0/describing-parameters/)

A good example, of a [Response](https://swagger.io/docs/specification/2-0/describing-responses/) example looks like this:

{{< highlight yaml >}}
"/pet":
  post:
    produces:
    - application/json
    parameters:
    - in: body
      name: body
      description: Pet object that needs to be added to the store
      required: true
      schema:
        "$ref": "#/definitions/Pet"
    responses:
      '200':
        description: New pet was added
        examples:
          application/json:
            id: 12345
            name: My New Pet
            color: Brown
            type: Dog
{{< /highlight >}}

## How do I fix this violation?

Examples are critical for consumers to be able to understand schemas and models defined by the spec.

Without examples, developers can't understand the type of data the API will return in real life. Examples are turned into mocks
and can provide a rich testing capability for APIs. Add detailed examples everywhere!

Add examples!
