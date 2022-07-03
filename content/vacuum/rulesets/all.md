---
title: All Rules
linkTitle: All Rules
date: 2022-07-02T05:30:17-04:00
strapline: All the rules!
draft: false
description: |
  All the rules available in vacuum.
type: vacuum
menu:
  vacuum:
    parent: "RuleSets"
    weight: 2
---

---

Want to throw the kitchen sink at your OpenAPI specification? Use **[All the rules!]({{< relref "/vacuum/rules" >}})**

To configure all the rules, you can simply use the same mechanism [Spectral](https://meta.stoplight.io/docs/spectral/01baf06bdd05a-rulesets)
uses for extending a ruleset.

Create a new file (something like _all-rules.yaml_) and add the following YAML to it:

```yaml
extends: [[spectral:oas, all]]
```
This creates a ruleset that extends '**all**' rules. You can find this ruleset in the **rulesets/examples** directory,
and it's named [all-ruleset.yaml](https://github.com/daveshanley/vacuum/blob/main/rulesets/examples/all-ruleset.yaml)

Now you can run any vacuum command that supports a ruleset.

```zsh
vacuum <command> --ruleset all-rules.yaml my-openapi-spec.yaml
```

---

## Generating complete RuleSet.

To generate a complete RuleSet of every rule and all the configurations used, vacuum contains a `generate-ruleset` command
that accepts an '**all**' option. This command only generates YAML files.

```zsh
vacuum generate-ruleset all my-ruleset
```

Will generate '**my-ruleset-all.yaml**' and will be a complete listing of every rule available.

