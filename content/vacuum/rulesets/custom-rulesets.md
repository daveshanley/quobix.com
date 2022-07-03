---
title: Custom RuleSets
linkTitle: Custom RuleSets
date: 2022-07-01T05:30:17-04:00
strapline: At some-point, we all want to specialize.
draft: false
description: |
  How to define custom RuleSets
type: vacuum
menu:
  vacuum:
    parent: "RuleSets"
    weight: 4
---
---

Most of the time, just customizing the [built-in OpenAPI Rules]({{< relref "/vacuum/rules" >}}) will get about
90% of the job done, most of the time.

At some point however, there comes a time to customize the rules and perhaps add some new ones using 
[built-in core functions]({{< relref "/vacuum/functions/core" >}}).

---

## Don't design APIs in a wiki.

Most big companies are guaranteed to have wiki pages in Confluence (or similar), that have HTTP REST APIs that are
inconsistently documented, invalid and out-of-date. Nobody reads this content, it's mostly a waste of time.

This is a **terrible way to operate**.

## Use a RuleSet!

Using a RuleSet will ensure that your APIs are always consistent, valid, clean and useful. RuleSets are a **style guide** 
that has been codified into logic.

## Adding Rules

To create a RuleSet, you simply need to start a new `ruleset.yaml` (you can call the file what ever you want) and then
create a new rule under a `rules` node at the root of the document. For example:

```yaml
rules:
  my-new-rule:
    description: "check the title is exactly 'hello world'"
    given: $.info.title
    severity: error
    then:
      function: pattern
      functionOptions:
        match: "^hello world$"
```

Now it's possible to run this new RuleSet against any vacuum command. 

`lint` example:

```zsh
vacuum lint -r ruleset.yaml my-openapi-spec.yaml
```

`html-report` example:

```zsh
vacuum html-report -r ruleset.yaml my-openapi-spec.yaml
```

Every single OpenAPI spec on the planet, should fail this rule; unless the title really is '_hello world_'.

## Anatomy of a Rule

vacuum is compatible with [Spectral Rule Properties](https://meta.stoplight.io/docs/spectral/e5b9616d6d50c-custom-rulesets).

### Given

The `given` property is a selector. It's a [JSONPath](http://jsonpath.com/) value that identifies where in the 
document the node can be found.

It's similar to XPath, but uses slightly different syntax. [JSONPath](http://jsonpath.com/) is not a standard yet, so 
there are varying implementations of it.

vacuum uses YAML deep down, and to find things using JSONPath, it converts that into YAMLPath using a neat library from
my old employer called [yaml-jsonpath](https://github.com/vmware-labs/yaml-jsonpath).
To learn more about the syntax vacuum supports, check it out.

Need some help checking a path is valid? Use the [JSONPath Evaluator](http://jsonpath.com/) for help to get it right.

### Severity

The `severity` property is optional, it can be one of the following: `error`, `warn`, `info` or `hint`. If left blank
the default is `warn`.

### Resolved

Before we discuss what this is, let's take a quick look at what a _resolver_ is:

{{< card "What is a resolver? What does it do?" >}}
What does _resolved_ actually mean? [JSONSchema](https://json-schema.org/) allows **$ref** properties. These properties
'point' to another schema definition. It allows us to re-use schemas. 

These references can be local (in the same file), or they can be remote (another file). Remote can mean both on a 
completely different file system, or the same file system.

A resolver is responsible for looking up each reference, and then 'pulling in' those referenced schemas in-place of 
the **$ref** value that has been presented.
{{< /card >}}

A _resolved_ document, is one that has no **$ref** values anymore, they have all been replaced with the referenced schemas.

#### But I need an un-resolved document

Sometimes, and for some use cases you do. A good example of this is the [no-$ref-siblings]({{< relref "/vacuum/rules/schemas/no-ref-siblings">}}) Rule
that cannot operate correctly if all **$ref** values have been removed.

If a rule needs to access the raw **$ref** reference values, set `resolved` to  `false` allowing the rule to receive 
the raw un-resolved version of the spec.

If you leave `resolved` blank, it will default to `true`.

> Generally, **resolved** documents are going to be what you want to use.

### Then

This is the fun part, `then` defines what [function]({{< relref "/vacuum/functions" >}}) to run against the JSONPath 
defined by [`given`](#given).

```yaml
given: $.servers[*].url
then:
  function: truthy
```

There is one required keyword: `function`. `field` is _optional_. It's generally only used for 
[core functions]({{< relref "/vacuum/functions/core" >}}).

{{< info-box >}}
If you omit the `field` value, the path defined by `given` will be the node value used.
{{< /info-box >}}

Some core functions like [pattern]({{< relref "/vacuum/functions/core/pattern" >}}), 
[schema]({{< relref "/vacuum/functions/core/schema" >}})and [enumeration]({{< relref "/vacuum/functions/core/enumeration" >}}) 
accept arguments via the `functionOptions` property.

#### Function Options

`functionOptions` presents arguments to the function defined to handle the rule. 

The [pattern]({{< relref "/vacuum/functions/core/pattern" >}}) function accepts `match` or `notMatch` arguments, for example:

```yaml
check-host-rule:
  description: "Host URL should not contain a trailing slash"
  given: $.servers[*]
  then:
    field: url
    function: pattern
    functionOptions:
      notMatch: "/$"
```

## Modifying Rules

If your custom RuleSet is the [recommended]({{< relref "/vacuum/rulesets/recommended" >}}) or [all]({{< relref "/vacuum/rulesets/all" >}}) 
RuleSet, you can replace a rule that has already been defined with your own custom rule, or you can **'override'** 
individual properties.

For example, to modify the existing [oas3-host-host-example]({{< relref "/vacuum/rules/information/oas3-host-not-example" >}}) 
rule, to look for something other than 'example.com', you could add this rule configuration to your custom RuleSet.

```yaml
extends: [[spectral:oas, recommended]]
rules:
  oas3-host-not-example:
    description: "check server URL is not testy.mctest-face.com"
    given: $.servers[*].url
    then:
      function: pattern
      functionOptions:
        notMatch: "testy\\.mctest-face\\.com"
```

If you just want the severity of the rule, there is a **shortcut**.

## Changing Rule Severity

If you want to use [recommended]({{< relref "/vacuum/rulesets/recommended" >}}) or [all]({{< relref "/vacuum/rulesets/all" >}}) 
RuleSets, but you want to change a rule's severity from a `error` to a `warn` to trigger a warning, instead of an error.

In this case, you don't need to re-declare the rule, you can simply add the [severity](#severity) value to the rule name. 
For example, to change the severity of [operation-operationId] from an _error_ to a _warning_:

```yaml
extends: [[spectral:oas, recommended]]
rules:
  operation-operationId: warn
```

## Disabling Rules

To turn the rule off completely: use `off` as the severity, for example:

```yaml
extends: [[spectral:oas, recommended]]
rules:
  operation-operationId: off
```

## Enabling Rules

If you already have an existing OpenAPI specification, and you run it through vacuum, chances are that you're going to 
see a number of warnings and perhaps some errors. 

This overload of data can be a bit much. So the next thing you will probably want to do, turn of all the rules, and enable
just the ones you want, as you slowly improve the quality of your specification.

vacuum has a built in [no rules]({{< relref "/vacuum/rulesets/no-rules" >}}) RuleSet that turns off everything, (it's an empty
RuleSet). This will allow individual rules to be turned on/enabled.

For example, to enable just the [operation-operationId]({{< relref "/vacuum/rules/operations/operation-operationId" >}})
and [info-contact]({{< relref "/vacuum/rules/information/info-contact" >}}) Rules, then your RuleSet would look like this:

```yaml
extends: [[spectral:oas, off]]
rules:
  operation-operationId: true
  info-contact: true
```

## Documentation URL

If you're going to share your RuleSet (awesome!), you might want to fill out the `documentationUrl` properties for 
your RuleSet. This is used by vacuum to render links to more details about **why** the ruleset exists, and what its purpose is.

Often, a description is not enough, and we need docs, use the `documentationUrl` property.

```yaml
extends: [[spectral:oas, off]]
documentationUrl: "https://quobix.com/vacuum/rulesets/custom-rulesets#documentation-url"
rules:
  operation-operationId: true
  info-contact: true
```

You can also add the URL to your rules as well, so there is more granular access to specific docs:

```yaml
extends: [[spectral:oas, off]]
documentationUrl: "https://quobix.com/vacuum/rulesets/custom-rulesets"
rules:
  oas3-host-not-example:
    documentationUrl: "https://quobix.com/vacuum/rules/information"
    description: "check server URL is not testy.mctest-face.com"
    given: $.servers[*].url
    then:
      function: pattern
      functionOptions:
        notMatch: "testy\\.mctest-face\\.com"
```

## How To Fix

vacuum adds a new property called `howToFix`. This is a string explanation of how to fix the problem when a rule
is violated. The fix is rendered in the console UI and html-report functions.

```yaml
extends: [[spectral:oas, off]]
rules:
  oas3-host-not-example:
    howToFix: "Make sure the host name is not example.com, change it!"
    ...
```









