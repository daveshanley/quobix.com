---
title: oas3-valid-schema-example
linkTitle: oas3-valid-schema-example
date: 2022-06-19T07:39:53-04:00
draft: false
description: |
  Examples must be present and valid for operations and components
severity: warn
recommended: true
ruleType: validation
type: vacuum
layout: rule
formats:
  - "oas3"
---

[Examples](https://swagger.io/docs/specification/adding-examples/) are really important. When defining an OpenAPI specification, it's critical that every operation
request and response have examples defined for them. The same applies to definitions defined as references.

[Examples](https://swagger.io/docs/specification/adding-examples/) help consumers of your API understand what real data should actually look like when sending requests,
or listening for responses.

Good examples are particularly valuable when data is complex, deep, nested or contains special formatting.

### Why did this violation appear?

The specification is missing examples in one or more areas. Examples need to be added *everywhere* for this rule to pass.

### What is this rule checking for?

The rule looks through the spec at the following elements, and checks that examples have been clearly defined for each.

- Operation Requests
- Operation Responses
- Operation Parameters
- Global Components
- Global Parameters

### What does a good example look like?

In OpenAPI 3.0, we should include examples for each [RequestBody](https://swagger.io/docs/specification/describing-request-body/).
We should also include examples for [Responses](https://swagger.io/docs/specification/describing-responses/), [Components](https://swagger.io/docs/specification/components/) or
[Parameters](hhttps://swagger.io/docs/specification/describing-parameters/)

A good example, of a [RequestBody](https://swagger.io/docs/specification/describing-request-body/) and [Response](https://swagger.io/docs/specification/describing-responses/) example looks like this:

{{< highlight yaml >}}
paths:
  /burgers:
    post:
      operationId: createBurger
      tags:
        - "Burgers"
      summary:  Create a new burger
      description: A new burger for our menu, yummy yum yum.
      requestBody:
        description: Give us the new burger!
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Burger'
            examples:
              pbjBurger:
                summary: A horrible, nutty, sticky mess.
                value:
                  name: Peanut And Jelly
                  numPatties: 3
              cakeBurger:
                summary: A sickly, sweet, atrocity
                value:
                  name: Chocolate Cake Burger
                  numPatties: 5
      responses:
        "200":
          description: A tasty burger for you to eat.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Burger'
              examples:
                quarterPounder:
                  summary: A yummy tasty two patty burger.
                  value:
                    name: Quarter Pounder with Cheese
                    numPatties: 1
                filetOFish:
                  summary: A Cripsy Fish Sammich filled with ocean goodness.
                  value:
                    name: Filet-O-Fish
                    numPatties: 1
{{< /highlight >}}

### How do I fix this violation?

Examples are critical for consumers to be able to understand schemas and models defined by the spec.

Without examples, developers can't understand the type of data the API will return in real life. Examples are turned into mocks
and can provide a rich testing capability for APIs. Add detailed examples everywhere!

Add examples!