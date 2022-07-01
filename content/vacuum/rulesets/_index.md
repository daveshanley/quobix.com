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
showList: true
skip_nav: false
type: vacuum
layout: single
---

---

RuleSets are how to configure vacuum to know which rules to run for each specification, and how it should evaluate those rules. 

A RuleSet is a **style guide** with each rule being an individual requirement as a part of the overall guide.

## How to apply a RuleSet?

Use the `--ruleset` flag with any vacuum command, supply a path to your ruleset file. For example:

```zsh
vacuum html-report --ruleset <my-ruleset.yaml>
```

## Recommended Rules

This is the **default** mode for all linting commands, recommended rules are used when the `--ruleset` flag is not
used. [Learn more about recommended rules]({{< relref "/vacuum/rulesets/recommended" >}}).



