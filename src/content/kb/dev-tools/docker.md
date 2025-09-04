# Docker

**Update containers and restart:**

```shell
docker compose pull
docker compose up -d
docker image prune # optional cleanup
```

You can also pass `--force-recreate` to the `up` command if for some reason the container isn't being recreated properly.
