---
title: "What is vacuum?"
linkTitle: "About Vacuum"
strapline: "The world's fastest OpenAPI linter."
date: 2022-06-12T06:25:04-04:00
draft: false
menu: 
  vacuum:
    weight: 2
type: vacuum
---

---

vacuum is an **ultra-super-fast**, lightweight [OpenAPI](https://www.openapis.org/) linter and quality checking tool, inspired by
[Spectral](https://github.com/stoplightio/spectral).

It's also compatible with existing [Spectral](https://github.com/stoplightio/spectral) rulesets and generates compatible 
Spectral reports.

---

{{< info-box >}}
vacuum can suck all the lint of a 5mb OpenAPI spec in about 250ms.
{{< /info-box >}}

Designed to reliably lint [OpenAPI](https://www.openapis.org/) specifications, **very, very quickly**. Including _very large_ ones.
[Spectral](https://github.com/stoplightio/spectral). can be quite slow when used as an API and does not scale for enterprise applications.

vacuum will tell you what is wrong with your spec, why, where and how to fix it. It will work at scale and is designed as a CLI (with a UI) and a library to be consumed in other applications.



## Why does it exist?

When I worked at [VMware](https://www.vmware.com/), We needed a quality linter to start understanding just how well the API landscape held up across the company. 

There were thousands of different OpenAPI specs, across a large number of business units. It was my job to try and make sense of it all.

[Spectral](https://github.com/stoplightio/spectral) was the only credible linter available at the time to build on top of, Which is great, 
because spectral does a good job, except for one thing...

{{< error-box >}}
Spectral is really, slow against large and multiple specs.
{{< /error-box >}}



## We need a faster linter

We needed something compiled and fast, even Java would have been too slow.

I was talking to my colleague [Steve Trefethen](https://ca-17.com/) about this major pain point with our engineering capability one day, 
particularly how slow Spectral was when trying to operate it as a service.

Steve Said:

> "What we really need is a drop in replacement for Spectral"

I said: 

> "I am going to build it."

So I did. 

## World's fastest OpenAPI linter.

vacuum is much, **much** faster than both [Spectral](https://github.com/stoplightio/spectral) and [ReDocly](https://github.com/Redocly/redocly-cli).

It's faster because it's written in golang, it's multi-threaded and uses an index for complex rules.

It's also been designed as a library from the ground up.

## What makes vacuum different?

It's been designed with enterprise & large scale use, as well as having a console UI, a rad, interactive HTML report as
well as a '_vacuum sealed_' report that allows re-rendering of any report in time, without losing any fidelity or re-running
new logic that could change results.


[Check out vacuum on GitHub](https://github.com/daveshanley/vacuum)