---
title: "Quick Start"
linkTitle: "Quick Start"
strapline: "Value in 30 seconds, or your money back"
date: 2022-06-12T06:25:04-04:00
draft: false
menu: 
  vacuum:
    weight: 1
type: vacuum
skip_nav: true 
---

## Install vacuum via homebrew

{{< info-box >}}
This the _recommended_ approach.
{{< /info-box >}}
If you're on MacOS or Linux, the easiest way to install vacuum is via [homebrew](https://brew.sh/).


{{< terminal-window
"install"
"brew"
"install">}}brew install daveshanley/vacuum/vacuum{{< /terminal-window >}}


## Lint your OpenAPI Specification

Run the `lint` command with the `-d` (_details_)  flag set:

{{< terminal-window
"lint"
"vacuum"
"lint" "-d">}}vacuum lint -d my-openapi-specification.yaml{{< /terminal-window >}}

Learn more about the [lint](/vacuum/commands/lint) command.


## Explore the results through the console dashboard

Run the `dashboard` command:

{{< terminal-window
"explore dashboard"
"vacuum"
"dashboard">}}vacuum dashboard my-openapi-specification.yaml{{< /terminal-window >}}

Learn more about the [dashboard](/vacuum/commands/dashboard) command.


## Explore the results through an HTML report

Run the `html-report` command:

{{< terminal-window
"explore HTML Report"
"vacuum"
"html-report">}}vacuum html-report my-openapi-specification.yaml{{< /terminal-window >}}

Learn more about the [html-report](/vacuum/commands/html-report) command.

---

Ready to learn more? Check out some background behind the project:

- [About vacuum](/vacuum/about)
- [Why?](/vacuum/why)