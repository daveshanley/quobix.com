---
title: "The Index"
linkTitle: "Spec Index"
date: 2022-07-03T07:39:53-04:00
description: The reason behind the speed.
strapline: The reason behind the speed.
draft: false
type: vacuum
menu:
  vacuum:
    parent: "Developer API"
    weight: 2
---

---

The first iteration of vacuum had no index. Every rule would walk through the specification nodes, looking for what ever it is the 
function does. This worked great, except.. it didn't. 

vacuum would slow way down on complex rules like [oas3-valid-schema-example]({{< relref "/vacuum/rules/examples/oas3-valid-schema-example" >}}).

It slowed down to the point where it was taking **seconds** to run on very large specs. This was **_no good_**.

After a re-think and many prototypes, I designed a simple index that will seek out everything in the specification and hold a reference.
After running through all the rules, I found just about everything.

Look-ups cost nothing via the index, vs the exponential complexity of recursive searching.

---

## Create an Index

```go
package main

import (
    "fmt"
    "github.com/daveshanley/vacuum/model"
    "io/ioutil"
)

func main() {

    // read in an OpenAPI Spec to a byte array
    specBytes, err := ioutil.ReadFile("my-openapi-spec.yaml")
    if err != nil {
        panic(err.Error())
    }

    // extract specification information into SpecInfo
    specInfo, err := model.ExtractSpecInfo(specBytes)
    if err != nil || specInfo == nil {
        panic(err.Error())
    }

    // create an index using the root node of the document
    index := model.NewSpecIndex(specInfo.RootNode)

    //.. do something interesting with the index
    // get a map of all the schemas found in the specification
    schemas := index.GetAllSchemas()

    // iterate over every schema reference.
    for refLocation, schemaReference := range schemas {

        // print line number, name of the schema, and where it's located
        fmt.Printf("[%d]: %s  (ref: %s)\n", schemaReference.Node.Line,
            schemaReference.Name, refLocation)
    }
}
```

Full documentation for `SpecIndex` [can be found at go.dev](https://pkg.go.dev/github.com/daveshanley/vacuum/model#SpecIndex)
