---
title: "{{ replace .Name "-" " " | title }}"
linkTitle "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
description: 
severity: warn
recommended: false
ruleType: style
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---