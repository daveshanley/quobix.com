---
title: "Installing vacuum"
linkTitle: "Installing"
strapline: "Get up and running in no-time."
date: 2022-06-12T06:25:04-04:00
draft: false
menu:
  vacuum:
    parent: "main"
---

---

[Check out vacuum on GitHub](https://github.com/daveshanley/vacuum)

## Check out the code

{{< highlight zsh >}}
git clone https://github.com/daveshanley/vacuum.git  
{{< /highlight >}}

### Change directory into 'vacuum'

{{< highlight zsh >}}
cd vacuum
{{< /highlight >}}

## Build the code

{{< highlight zsh >}}
go build vacuum.go
{{< /highlight >}}

## Run the code

{{< highlight zsh >}}
./vacuum lint <your-openapi-spec.yaml>
{{< /highlight >}}

## Running vacuum via Docker

vacuum is available as a container, you can pull the image from
[Docker Hub](https://hub.docker.com/repository/docker/dshanley/vacuum/general)

{{< highlight zsh >}}
docker pull dshanley/vacuum
{{< /highlight >}}
