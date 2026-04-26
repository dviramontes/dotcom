---
title: 'Self-Hosted Analytics with Plausible and exe.dev'
excerpt: 'How I stood up a privacy-friendly analytics stack for my personal sites — Plausible CE on an exe.dev VM, with TLS handled by the proxy.'
coverImage: '/assets/blog/self-hosted-analytics/plausible-ce.png'
date: '2026-04-26T18:00:00.000Z'
author:
  name: David Viramontes
  picture: '/assets/blog/authors/davm.png'
ogImage:
  url: '/assets/blog/self-hosted-analytics/plausible-ce.png'
---

I've been wanting to collect basic analytics on this blog and the other small
sites I've deployed for personal use. Nothing fancy — just enough to know what
people read and where they come from. The two requirements: I don't want to
hand my visitors over to an ad network, and I don't want to babysit
infrastructure.

This is a good use case for [exe.dev](https://exe.dev/) — paired with
[Plausible Community Edition](https://github.com/plausible/community-edition),
it took less than an hour to put together.

## Why not Google Analytics?

The short answer: when something online is free,
[you are usually the product](https://plausible.io/blog/remove-google-analytics).
Google Analytics is free because the data it collects is valuable to Google.
For a personal blog with a few hundred visitors a month, that trade-off makes
no sense. Plausible is open source, GDPR-friendly, doesn't use cookies, and
the dashboard tells me exactly what I want to know without a 30-tab
configuration UI. If you're curious what that dashboard looks like, Plausible
hosts a public one for their own site at
[plausible.io/plausible.io](https://plausible.io/plausible.io).

## Why exe.dev?

[exe.dev](https://exe.dev/) gives me a small VM with an HTTPS proxy
that handles TLS termination and DNS for me. I don't have to provision a
certificate, point a domain, or run Caddy/nginx in front of anything. The
proxy hands me an `*.exe.xyz` hostname and that's the public address of the
service. For a side-project analytics box, that's the entire ops story.

The canonical setup docs live in the
[plausible/community-edition](https://github.com/plausible/community-edition)
repo — the steps below are the exe.dev-flavored version of those, with the
proxy and TLS bits filled in.

## Prerequisites

- Docker and Docker Compose installed on the VM
- SSH key registered with exe.dev (`ssh-keygen -t ed25519` + `ssh exe.dev` to register)

## Step 1: Clone the repository

```bash
git clone -b v3.2.0 --single-branch https://github.com/plausible/community-edition plausible-ce
cd plausible-ce
```

## Step 2: Create the environment file

```bash
touch .env
echo "BASE_URL=https://example.exe.xyz" >> .env
echo "SECRET_KEY_BASE=$(openssl rand -base64 48)" >> .env
```

A couple of things that are easy to get wrong here:

- `BASE_URL` must match the exe.dev proxy hostname, not `localhost`. Plausible's
  origin check will reject requests otherwise.
- `SECRET_KEY_BASE` must be at least 64 bytes — the `-base64 48` flag gives you 64.

## Step 3: Expose port 8000

Create a `compose.override.yml` so Docker maps the Plausible HTTP port out to
the VM:

```yaml
services:
  plausible:
    ports:
      - 8000:8000
```

Plausible listens on 8000 by default, and the exe.dev proxy will forward
HTTPS traffic to it.

## Step 4: Configure the exe.dev proxy

Point the proxy at port 8000:

```bash
ssh exe.dev share port example 8000
```

By default, the proxy is private — visitors get bounced to an exe.dev login
page. That's the right default for most things, but it's wrong here: the
tracker script and event endpoint need to be reachable by unauthenticated
browsers on the sites I'm tracking. So the proxy has to be public:

```bash
ssh exe.dev share set-public example
```

If you skip this step, requests to `/js/script.js` and `/api/event` get
redirected to the login page and no analytics data is collected. Plausible
has its own dashboard auth, so the data behind the dashboard is still
protected even with the proxy public.

## Step 5: Start the services

```bash
docker compose up -d
```

This starts three containers:

- **`plausible`** (`ghcr.io/plausible/community-edition:v3.2.0`) — the web app
  and analytics ingestion endpoint.
- **`plausible_db`** (`postgres:16-alpine`) — stores users, sites, and settings.
- **`plausible_events_db`** (`clickhouse/clickhouse-server:24.12-alpine`) —
  stores the analytics events themselves.

Migrations run automatically on first start.

## Step 6: Create your account

Visit `https://example.exe.xyz/register` and create the first user.
That account becomes the admin.

## Adding the tracker to your site

Once Plausible is up, registering a site in the dashboard gives you a
snippet. Drop it into the `<head>` of any page you want to track — a static
HTML file, a templated page, or whatever your framework uses to add tags
there:

```html
<script defer src="https://example.exe.xyz/js/script.js"></script>
<script>
  ;(window.plausible =
    window.plausible ||
    function () {
      ;(plausible.q = plausible.q || []).push(arguments)
    }),
    (plausible.init =
      plausible.init ||
      function (i) {
        plausible.o = i || {}
      })
  plausible.init()
</script>
```

That's it. Pageviews start showing up in the dashboard within a few seconds.

If you'd rather pull in a framework-specific wrapper, there are
[a handful of npm packages](https://www.npmjs.com/search?q=plausible) for
React, Next.js, Vue, Svelte, and friends. They mostly wrap the same snippet
above with conveniences like route-change tracking — pick whichever fits
your stack.

## Useful commands

```bash
# Check service status
docker compose ps

# View Plausible logs
docker compose logs plausible --tail 50

# Restart Plausible (e.g. after changing .env)
docker compose up -d --force-recreate plausible

# Stop everything
docker compose down

# Stop and remove all data
docker compose down -v
```

## Notes and gotchas

- **Email**: SMTP isn't configured, so Plausible can't send verification or
  report emails. The app still works without it — see the
  [configuration wiki](https://github.com/plausible/community-edition/wiki/configuration#email)
  if you need it.
- **TLS**: Handled entirely by the exe.dev proxy. No certificate config on the VM.
- **Data persistence**: All data lives in Docker volumes (`db-data`, `event-data`,
  `event-logs`, `plausible-data`). Back those up if the data matters to you.
- **Public proxy means public dashboard login**: Anyone on the internet can
  reach the login page and try to send events. Plausible's own auth is what
  keeps the data safe. If that's not good enough, put a reverse proxy in
  front that only allows public access to `/js/*` and `/api/event`, and
  requires auth for everything else.

## Wrap-up

This is the kind of project exe.dev makes really easy to deploy. No DNS, no
certificates, no nginx config — just a VM, a Docker compose file, and a
hostname that works. I get analytics I actually own, and my visitors don't
get tracked across the web, respecting their privacy.

---

_Cover image generated using Nano Banana 2._
