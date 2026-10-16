# Enable wiki caching and compression on Synology

The GitHub workflow copies the built site to `/volume1/Docker/dnd-wiki/site`. It does not configure the nginx server that serves those files. The live site had no compression or cache headers when checked on 2026-10-16.

1. Find the nginx instance that serves the wiki. In DSM, inspect the destination port of the `dnd.borm.no` reverse proxy rule, then find the service or container on that port. For a container, inspect its volume mounts to locate the nginx configuration.
2. Back up that configuration. Merge `nginx-performance.conf` into the existing wiki `server` block, or include it from a mounted file. Replace overlapping `location`, `expires`, and `gzip` directives instead of duplicating them. Preserve the existing document root, clean URL rules, headers, and reverse proxy settings.
3. Run `nginx -t` in that nginx instance. After validation succeeds, reload that instance with `nginx -s reload`.
4. Check the public responses with the commands below. HTML must return `Content-Encoding: gzip` and `Cache-Control: no-cache`. Hashed assets must return `Cache-Control: max-age=31536000`. Fonts and banners must return `Cache-Control: max-age=604800`.

```sh
curl -sSI -H 'Accept-Encoding: gzip' https://dnd.borm.no/
curl -sSI https://dnd.borm.no/party-banner-1280.webp
curl -sSI https://dnd.borm.no/fonts/cinzel-v26-normal-latin.woff2
```

Do not paste this fragment into DSM's generated reverse proxy files. DSM can overwrite those files. Apply it to the nginx instance that serves the static wiki files.

The fragment retains inherited security headers by using `expires` rather than location-specific `add_header` directives. Hashed assets are cached for a year. Assets without content hashes expire sooner. HTML must revalidate so a new deployment can reference its new asset hashes.

This fragment has not been applied to the NAS. A wiki content deployment alone does not activate it. The serving nginx configuration and access to its runtime are required to validate and enable it.
