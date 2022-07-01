---
title: "Core Concepts"
linkTitle: "Concepts"
strapline: "What are all the things? What do they mean?"
date: 2022-07-01T12:20:04-04:00
draft: false
menu: 
  vacuum:
    weight: 4
type: vacuum

---

---

There are three core concepts when it comes to vacuum.

- Function
- Rule
- RuleSet

{{< inline-figure-path "/images/vacuum/concepts.svg" "Functions power Rules and Rules make up RuleSets" "Image of functions, rules and rulesets" >}}


---

## What are Rules?

**Rules** are filters that define a set of target values you want to check against. Rules define what to look up, 
where to find it and what to check for. Those options are then sent to a function that will execute that logic.

{{< info-box >}}
Rules enforce a company or product **API style guide**.
{{< /info-box >}}

There are [built-in rules]({{< relref "/vacuum/rules">}}) which can be used out of the box, 
custom rules can easily be added.

Rules are made up of (they can call) multiple functions.

## What are Functions?

**Functions** are blocks of golang business logic that perform a certain validation on an OpenAPI specification. 
They iterate through different nodes, or perform a lookup for a specific item, and perform the actual validation. 

There are a collection of simple [built-in core functions]({{< relref "/vacuum/functions/core">}}) that can be used to create
any number of custom rules, without writing any code.

There are also a number of [built-in OpenAPI functions]({{< relref "/vacuum/functions/openapi">}}) available that already perform a ton of custom validation.

Functions can serve multiple rules.

## What are RuleSets?

A RuleSet a collection of rules to be used when linting a specification. RuleSets allow you to create different types of validations for different specifications.
Depending on need. 

RuleSets can override the [built-in RuleSets]({{< relref "/vacuum/rulesets" >}}) with different severity levels or function options.

RuleSets are what vacuum uses to know what to look for when linting an OpenAPI specification.

