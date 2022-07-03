---
title: "RuleResultSet"
linkTitle: "RuleResultSet"
date: 2022-07-03T08:39:53-04:00
strapline: The easiest way to make sense of linting results.
draft: false
type: vacuum
menu:
  vacuum:
    parent: "Developer API"
    weight: 3
---

---

vacuum will return a slice of [model.RuleFunctionResult](https://pkg.go.dev/github.com/daveshanley/vacuum/model#RuleFunctionResult)
structs as a linting result. The data list is unstructured and unsorted. If you're game to try and sift through all that
then _good luck_! 

However, most of us want a simpler way to sort, group and search that data. 

This is where [RuleResultSet](https://pkg.go.dev/github.com/daveshanley/vacuum/model#RuleResultSet) comes in.

---

## Creating a new RuleResultSet

Use `model.NewRuleResultSet()` to create a new `RuleResultSet` pointer.

```go
    // read in an OpenAPI Spec to a byte array
    specBytes, err := ioutil.ReadFile("myspec.yaml")
    if err != nil {
        panic(err.Error())
    }

    // build and store built-in vacuum default RuleSets.
    defaultRS := rulesets.BuildDefaultRuleSets()

    // generate the 'recommended' RuleSet
    recommendedRS := defaultRS.GenerateOpenAPIRecommendedRuleSet()

    // apply the rules in the ruleset to the specification
    lintingResults := motor.ApplyRulesToRuleSet(
        &motor.RuleSetExecution{
            RuleSet: recommendedRS,
            Spec:    specBytes,
        })

    // create a new model.RuleResultSet from the results.
    // structure allows categorization, sorting and searching
    // in a simple and consistent way.
    resultSet := model.NewRuleResultSet(lintingResults.Results)
    
    //.. do something interesting with resultSet
```

Now you can use `resultSet` to sort all the results by category, order by line number and much more.

Full documentation for `RuleResultSet` [can be found at go.dev](https://pkg.go.dev/github.com/daveshanley/vacuum/model#RuleResultSet)
