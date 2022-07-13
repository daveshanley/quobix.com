---
title: "Understanding RuleSets"
linkTitle: "Understanding RuleSets"
date: 2022-06-19T07:39:53-04:00
strapline: "A style guide for your API."
draft: false
menu:
  vacuum:
    parent: "RuleSets"
    weight: 1
showList: false
type: vacuum
layout: single
---
---

RuleSets are how to configure vacuum to know which rules to run for each specification, and how it should evaluate those rules.

A RuleSet is a **style guide** with each rule being an individual requirement as a part of the overall guide.

## What does a RuleSet look like?

vacuum has based RuleSet configuration on the [Spectral Ruleset](https://meta.stoplight.io/docs/spectral/01baf06bdd05a-rulesets)
model. This means Spectral RuleSets are **100% compatible** with vacuum[^1]

{{< info-box >}}
vacuum has added an `id` value to the rule (which Spectral does not), this to allow backwards compatibility, and the freedom
to rename and add new names to new vacuum only content.
{{< /info-box >}}

RuleSets contain a list of rules that should be run, and are configured using YAML or JSON, and look something like this:

```yaml
 ...
 rules:
   my-vacuum-rule:
     description: Tags must have a description.
     given: $.tags[*]
     severity: error
     then:
       field: description
       function: truthy
 ...
```

vacuum has [built-in core functions]({{< relref "/vacuum/functions/core" >}}) such as [casing]({{< relref "/vacuum/functions/core/casing" >}}),
[truthy]({{< relref "/vacuum/functions/core/truthy" >}}) and [pattern]({{< relref "/vacuum/functions/core/pattern" >}}) which
can be used to power rules.

Rules target a section of the OpenAPI document using [JSON Path](http://jsonpath.com/) via the `given` keyword.

The example above is a single rule that looks at all the `tags` object which is on the root level. The [truthy]({{< relref "/vacuum/functions/core/truthy" >}})
function will check if the `description` field has been set or not.

## How to apply a RuleSet?

Use the `--ruleset` flag with any vacuum command, supply a path to your ruleset file. For example:

```zsh
vacuum html-report --ruleset <my-ruleset.yaml>
```

## Recommended only? or all rules?

vacuum comes with two RuleSets out of the box. '**Recommanded**' and '**All**'

Recommended is the **default** mode for all linting commands, recommended rules are used when the `--ruleset` flag is not
used. [Learn more about recommended rules]({{< relref "/vacuum/rulesets/recommended" >}}).

'**All Rules**' is just that, [all OpenAPI Rules]({{< relref "/vacuum/rules" >}}). Everything is applied.
[Learn more about all rules]({{< relref "/vacuum/rulesets/all" >}}).



[^1]: Except custom JS functions don't work, they're incompatible (for now) as vacuum is written in golang not JS. vacuum will support custom functions soon.
I have a few ideas about running JS code using something like [otto](https://github.com/robertkrimen/otto).