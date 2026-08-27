---
title: Generated exports
description: ROADMAP.md and CHANGELOG.md are exports. A hand edit is lost at the next one.
sidebar:
  order: 4
---

If your project keeps `ROADMAP.md` and `CHANGELOG.md` in its repository, those
files are **exports**.

```
the database  ──▶  tools/roadmap/export.mjs  ──▶  ROADMAP.md
```

:::danger[A hand edit is lost at the next export]
Change the entry in the console or through [MCP](/agents/mcp/), then regenerate
and commit the result.
:::

## Regenerating

```sh
CAWDEV_URL=https://cawdev.example.com CAWDEV_TOKEN=cawd_… \
  node tools/roadmap/export.mjs my-project

CAWDEV_URL=https://cawdev.example.com CAWDEV_TOKEN=cawd_… \
  node tools/changelog/export.mjs my-project
```

The token needs `roadmap:read` and `changelog:read` at minimum — see
[Agent tokens](/agents/tokens/).

## Why they are worth keeping

The database is the source of truth, but a roadmap that only exists behind a
login is invisible in a code review, in a `git log`, and to anyone reading the
repository on a plane.

The exports are **byte-stable**: the same data produces the same bytes, so a
regenerated file shows a diff only when the roadmap actually changed. That is
what makes committing them tolerable rather than noisy.

## Importing an existing ROADMAP.md

Going the other way — a hand-written roadmap into a fresh project — is a
one-time move:

```sh
node tools/roadmap/import.mjs my-project --file ROADMAP.md
```

It is idempotent enough to re-run after a partial failure: entries that already
exist are updated rather than duplicated. It refuses to start when preserving
entry numbers is impossible, because numbers are permanent and silently
renumbering them would break every reference to them.
