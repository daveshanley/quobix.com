---
title: Recommended Rules
linkTitle: Recommended Rules
date: 2022-07-01T05:30:17-04:00
strapline: Default rules for everyone.
draft: false
description: |
  Rules that are run when no --ruleset flat is used.
type: vacuum
menu:
  vacuum:
    parent: "RuleSets"
    weight: 3
---
---

Want to check against recommended rules?

Recommended rules are the default behavior from vacuum. If there is no ruleset supplied, vacuum will always run 
recommended rules only.

To explicitly define a 'recommended only' ruleset that can be customized, it's easy to extend a ruleset the same way that
[Spectral](https://meta.stoplight.io/docs/spectral/01baf06bdd05a-rulesets) does.

Create a new file (something like _recommended-rules.yaml_) and add the following YAML to it:

```yaml
extends: [[spectral:oas, recommended]]
```
This creates a ruleset that extends '**recommended**' rules. You can find this ruleset in the **rulesets/examples** directory,
and it's named [recommended-ruleset.yaml](https://github.com/daveshanley/vacuum/blob/main/rulesets/examples/recommended-ruleset.yaml)

Now you can run any vacuum command that supports a ruleset.

```zsh
vacuum <command> --ruleset recommended-rules.yaml my-openapi-spec.yaml
```

---

## Generating complete RuleSet.

To generate a complete RuleSet of every recommended rule and all the configurations used, vacuum contains a `generate-ruleset` command
that accepts an '**recommended**' option. This command only generates YAML files.

```zsh
vacuum generate-ruleset recommended my-ruleset
```

Will generate '**my-ruleset-recommended.yaml**' and will be a complete listing of every recommended rule available.
