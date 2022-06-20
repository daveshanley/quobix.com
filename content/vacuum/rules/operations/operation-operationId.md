---
title: operation-operationId
linkTitle: operation-operationId
date: 2022-06-20T15:53:17-04:00
draft: false
description: |
    Check every operation for an operationId
severity: warn
recommended: true
ruleType: validation
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---

Check every operation for an operationId. Every operation must have an `operationId`