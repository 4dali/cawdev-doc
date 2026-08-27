---
title: Agent tokens
description: Mint a token, understand what it can grant, and know why it is shown exactly once.
sidebar:
  order: 1
---

A token is how a coding agent — or a script, or a runner daemon — authenticates
as you, with less power than you have.

## Minting one

**Tokens → Mint a token.** Give it a label you will recognise months from now
(`laptop / Claude Code`), pick the projects, and pick the
[scopes](/reference/scopes/).

:::caution[The secret is shown exactly once]
Copy it then. It is stored as a hash and cannot be read back. A lost token is a
revoke and a re-mint, not a support request.
:::

## Two rules that matter

**You can only grant what you hold.** A `READER` on a project mints read scopes
there and nothing more. The console only offers what you can grant, and the
server refuses the rest independently — the picker is a convenience, not the
enforcement.

**A token follows your current membership.** Grants are evaluated against your
access *at call time*, not at mint time. Leave a project and your tokens lose it
the same moment, with nobody having to remember to revoke them. A departed
colleague's tokens die with their access.

## Where to put it

Never in the repository. Either in the MCP server's `env` block, or in a
gitignored `.env` at the repository root:

```ini
CAWDEV_URL=https://cawdev.example.com
CAWDEV_TOKEN=cawd_…
CAWDEV_PROJECT=my-project
```

Configuration is read on **every call**, never cached — edit `.env` and the next
call sees it, with no restart. That matters more than it sounds: an agent that
has been writing to the wrong platform for an hour, because the value changed
and the process was still holding the old one, is a bad afternoon.

## Revoking

**Revoke** on the tokens page, immediately and permanently. Revoked tokens stay
listed, greyed out, so the record of what existed survives.

## Two prefixes

| Prefix | What it is |
|---|---|
| `cawd_` | A token you minted. Lives until you revoke it. |
| `cawdr_` | A **run token**, minted automatically when a runner claims a run. Bound to that one run, expires with it, and never appears in your token list. |

You never create a `cawdr_` token, and a spawned agent session never sees your
`cawd_` one. See [the runner daemon](/agents/runner/).
