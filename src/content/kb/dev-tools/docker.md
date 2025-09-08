---
title: Docker
description: Big whale care advice 🐳
---

# Docker

**Update containers and restart:**

```shell
docker compose pull
docker compose up -d
docker image prune # optional cleanup
```

You can also pass `--force-recreate` to the `up` command if for some reason the container isn't being recreated
properly.

**Install Node.js in docker images (Debian):**

More info available on [NodeSource](https://nodesource.com/products/distributions)

```shell
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```
