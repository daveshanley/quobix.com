---
title: "operation-4xx-response"
linkTitle: "operation-4xx-response"
date: 2022-07-17T09:23:21-04:00
draft: false
description: Operations must return at least one '4xx' error code.
severity: warn
recommended: false
ruleType: validation
functionType: openapi
functionName: oasOpErrorResponse
type: vacuum
layout: rule
formats:
  - "oas3"
  - "oas2"
---

Check every [Operation Response](https://swagger.io/docs/specification/describing-responses/) defines at least one `4xx` error code.

Consumers of your API are always going to send bad data. Unless operations return at least one **User Error** status code (`4xx`), the 
consumer of the API has no idea if they are using it correctly.

### Why did this violation appear?

There is an [Operation Response](https://swagger.io/specification/#responses-object) in your specification that isn't returning at least
one `4xx` error code.

### What is this rule checking for?

Every [Operation Response](https://swagger.io/specification/#responses-object) is checked for the following:

- **4xx** Response code


### A bad example.

```yaml
"/burger":
  get:
    responses:
      "200":
        description: All the burgers please
  post:
    responses:
      "200":
        description: Burger was created! well done    
```

### A good example.

```yaml
"/burger":
  get:
    responses:
      "200":
        description: All the burgers please
      "429":
        description: We're super busy right now, please wait.  
  post:
    responses:
      "401":
        description: This API is protected, only authorized users.
      "200":
        description: Burger was created! well done    
```

### How do I fix this violation?

Ensure all operations return at least one `4xx` response.