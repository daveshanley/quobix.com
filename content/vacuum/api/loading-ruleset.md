---
title: "Loading a RuleSet"
linkTitle: "Loading RuleSet"
description: Construct using code, or via a file.
date: 2022-07-04T08:39:53-04:00
strapline: Construct using code, or via a file.
draft: false
type: vacuum
menu:
  vacuum:
    parent: "Developer API"
    weight: 4
---

---

It's easy to generate a recommended RuleSet using the built-in Rules, but what if you want to load in 
a [RuleSet](/vacuum/rulesets/understanding) from a file, or perhaps construct one using code - what are the options?

## Create RuleSet from a file

Use `rulesets.CreateRuleSetFromData()` to create a new `RuleSet` pointer.

```go
    // read in a RuleSet file
    ruleSetBytes, err := ioutil.ReadFile("specific-ruleset.yaml")
    if err != nil {
        panic(err.Error())
    }

    // build and store built-in vacuum default RuleSets.
    defaultRS := rulesets.BuildDefaultRuleSets()

    // extract a custom RuleSet from our bytes.
    parsedRS, rsErr := rulesets.CreateRuleSetFromData(ruleSetBytes)

    // create a ready to run RuleSet from our parsed ruleSet.
    // this step is required to make sure extending works correctly.
    // the default rulesets are required, because custom ruleset may be
    // extending one of them, like 'all' or 'recommended' or they may
    // be set to off, so we're just enabling rules.
    customRuleSet := defaultRS.GenerateRuleSetFromSuppliedRuleSet(parsedRS)

    if rsErr != nil {
        panic(err.Error())
    }

    //... do something interesting with the RuleSet, like lint it.

    // read in an OpenAPI specification
    specBytes, err := ioutil.ReadFile("stripe.yaml")
    if err != nil {
        panic(err.Error())
    }

    // apply custom ruleset to our specification
    ruleSetResults := motor.ApplyRulesToRuleSet(&motor.RuleSetExecution{
        RuleSet: customRuleSet,
        Spec:    specBytes,
    })
    
    // print out how many violations were found.
    fmt.Printf("Linting Violations: %d", len(ruleSetResults.Results))
```

- [CreateRuleSetFromData](https://pkg.go.dev/github.com/daveshanley/vacuum/rulesets#CreateRuleSetFromData) docs.
- [GenerateRuleSetFromSuppliedRuleSe](https://pkg.go.dev/github.com/daveshanley/vacuum/rulesets#RuleSets) docs.