---
title: "Installing vacuum"
linkTitle: "Installing"
strapline: "Get up and running in no-time."
date: 2022-06-12T06:25:04-04:00
draft: false
menu: 
  vacuum:
    weight: 1
type: vacuum

---

## Install via homebrew.

{{< info-box >}}
This the _recommended_ approach.
{{< /info-box >}}
If you're on MacOS or Linux, the easiest way to install vacuum is via [homebrew](https://brew.sh/).


{{< terminal-window
"install"
"brew"
"install">}}brew install daveshanley/vacuum/vacuum{{< /terminal-window >}}

## Install via Docker.

vacuum is available as a container, you can pull the image from
[Docker Hub](https://hub.docker.com/repository/docker/dshanley/vacuum/general).

{{< terminal-window
"docker"
"docker" 
"pull">}}docker pull dshanley/vacuum{{< /terminal-window >}}

To run via docker, just add `docker dshanley/vacuum` as your command, like so:

{{< terminal-window
"docker"
"dshanley/vacuum"
"lint">}}docker dshanley/vacuum lint &lt;your-openapi-spec.yaml&gt;{{< /terminal-window >}}

---

## Checkout from source.

{{< terminal-window
"git"
"git"
"clone">}}git clone https://github.com/daveshanley/vacuum.git{{< /terminal-window >}}
Then change directory into `vacuum`

{{< terminal-window
"git"
"cd">}}cd vacuum{{< /terminal-window >}}


### Build the code.

{{< terminal-window
"go"
"go" "build">}}go build vacuum.go{{< /terminal-window >}}

### Run the code.

{{< terminal-window
"vacuum lint"
"./vacuum" "lint">}}./vacuum lint &lt;my-openapi-spec.yaml>{{< /terminal-window >}}

---

## Next Steps

[Read more about the linting command]({{< relref "/vacuum/commands/lint" >}}).

---

[Check out vacuum on GitHub](https://github.com/daveshanley/vacuum)


