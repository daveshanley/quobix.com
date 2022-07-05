---
title: "API Quick Start"
linkTitle: "API Quick Start"
date: 2022-07-03T07:39:53-04:00
description: Download, plug-in and start linting!
strapline: "Download, plug-in and start linting!"
draft: false
type: vacuum
menu:
  vacuum:
    parent: "Developer API"
    weight: 1
---

---

vacuum has been designed to work as an API from the ground up. This was actually one of the [motivators]({{< relref "/vacuum/why" >}})
behind the development of the tool.

If you're a **golang** developer, and you want to lint **OpenAPI** specs using a **library**, then **_look no further_**.

## Install vacuum

```bash
go get github.com/daveshanley/vacuum
```
{{< terminal-window "install vacuum" "go" "get">}}go get github.com/daveshanley/vacuum{{< /terminal-window >}}



## Lint an OpenAPI Spec

This simple quick start code will read in an OpenAPI, generate a RuleSet from the built-in defaults, Then it will
apply the rules to the spec, filter the results by a category, and then print them out to the console.

```go
package main

import (
    "fmt"
    "github.com/daveshanley/vacuum/model"
    "github.com/daveshanley/vacuum/motor"
    "github.com/daveshanley/vacuum/rulesets"
    "io/ioutil"
)

func main() {

    // read in an OpenAPI Spec to a byte array
    specBytes, err := ioutil.ReadFile("your-openapi-spec.yaml")
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

    // sort results by line number (so they are not all jumbled)
    resultSet.SortResultsByLineNumber()

    //.. do something interesting with the results
    // print only the results from the 'schemas' category
    schemasResults := resultSet.GetRuleResultsForCategory("schemas")

    // for every rule that is violated, it contains a list of violations.
    // so first iterate through the schemas sesults
    for _, ruleResult := range schemasResults.RuleResults {

        // print out which rule was violated
        fmt.Printf("Rule: %s\n", ruleResult.Rule.Id)

        // iterate over each violation of this rule
        for _, violation := range ruleResult.Results {

            // print out the start line, column, violation message.
            fmt.Printf(" - [%d:%d] %s\n", violation.StartNode.Line,
                violation.StartNode.Column, violation.Message)
        }
    }
}
```

## Now try something else

Why not check out [using the index]({{< relref "/vacuum/api/spec-index">}}) or using the 
[RuleResultSet]({{< relref "/vacuum/api/rule-resultset" >}}) APIs.
