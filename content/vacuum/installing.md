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

```zsh
brew install daveshanley/vacuum/vacuum
```

## Install via Docker.

vacuum is available as a container, you can pull the image from
[Docker Hub](https://hub.docker.com/repository/docker/dshanley/vacuum/general).

{{< highlight zsh >}}
docker pull dshanley/vacuum
{{< /highlight >}}

To run via docker, just add `docker dshanley/vacuum` as your command, like so:

{{< highlight zsh >}}
docker dshanley/vacuum lint <your-openapi-spec.yaml>
{{< /highlight >}}

---

## Checkout from source.

{{< highlight zsh >}}
git clone https://github.com/daveshanley/vacuum.git
{{< /highlight >}}
{{< code-split >}}Then change directory into `vacuum`{{< /code-split >}}
{{< highlight zsh >}}
cd vacuum
{{< /highlight >}}


### Build the code.

{{< highlight zsh >}}
go build vacuum.go
{{< /highlight >}}

### Run the code.

{{< highlight zsh >}}
./vacuum lint <your-openapi-spec.yaml>
{{< /highlight >}}



[Check out vacuum on GitHub](https://github.com/daveshanley/vacuum)


