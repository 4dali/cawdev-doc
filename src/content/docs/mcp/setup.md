---
title: Setting it up
description: Mint a token, wire it into .mcp.json or a .env, and give a coding agent the roadmap and changelog.
---

One file of plain Node, **zero dependencies**, speaking stdio JSON-RPC. It gives
a coding agent a project's roadmap, its issues, its changelog and — inside a
run started from the console — the tools that let it report, ask, and read its
own task. The API was built to mirror these tools one for one, so an agent gets
the same verbs a person gets in the console.

:::tip[Zero dependencies is a feature]
You are about to let this thing write to your roadmap. It should be a file you
can read in one sitting before you run it — `tools/mcp/server.mjs` in the
cawdev repository.
:::

## Mint a token

In the console, under **Agent tokens**, mint one and grant it scopes on the
project:

| Scope | Lets the token |
|---|---|
| `roadmap:read` / `roadmap:write` | Read, or read and write, the roadmap and issues |
| `changelog:read` / `changelog:write` | Read, or read and write, the changelog |
| `backlog:write` | File feedback only — not read the roadmap, not accept its own filing |

**You can only grant what you hold.** A `READER` on the project can mint read
scopes and `backlog:write`; only a `WRITER` can mint `roadmap:write` or
`changelog:write`. A token meant only to *file feedback* — a tool built beside
cawdev, say, or an agent you don't fully trust — should get `backlog:write`
alone: it can propose, but deciding what the feedback becomes is a signed-in
person's act, refused to every token.

:::note
`roadmap:write` implies `backlog:write` and `roadmap:read`; `changelog:write`
implies `changelog:read`. You don't need to grant both halves of a pair.
:::

:::tip[An application rather than an agent?]
If what you are wiring in is your own code — a support tool, a dashboard, a
bot — rather than a coding agent, mint an **API token** instead. It holds
`backlog:write`, `cards:file` and `cards:read` and nothing more, files and
reads over a versioned surface of its own, and can be told over a signed
webhook when a card moves. See the [Integration API](/api/integration/).
:::

## Wire it into a repository

Add `.mcp.json` in the repository the agent works in:

```json
{
  "mcpServers": {
    "cawdev": {
      "command": "node",
      "args": ["/path/to/cawdev/tools/mcp/server.mjs"],
      "env": {
        "CAWDEV_URL": "https://app.cawdev.com",
        "CAWDEV_TOKEN": "cawd_…"
      }
    }
  }
}
```

Or leave `env` out and put `CAWDEV_URL` / `CAWDEV_TOKEN` / `CAWDEV_PROJECT` in a
**gitignored** `.env` at the repository root. The server searches upward from
its working directory for one, so it works from a subdirectory too.

:::caution[Read on every call, never cached]
Edit `.env` and the very next tool call sees the new value — there is no
server to restart. That matters more than it sounds: an agent that has been
writing to the wrong platform for an hour, because the value changed underfoot
and the process was still holding the old one, is a bad afternoon. Cawdev
learned this the hard way on a sibling project before this rule was written
down.
:::

## Which project

A token can be scoped to one project or several. The MCP tools that touch a
project all take an optional `project` argument:

| Your token grants | What the agent must do |
|---|---|
| exactly one project | nothing — it's unambiguous |
| several projects | pass `project` per call, or set `CAWDEV_PROJECT` |

Get it wrong and the error lists exactly what the token can actually see,
rather than a bare "not found".

## When something is confusing

Call **`roadmap_where`**. It answers four questions at once — which platform
this is talking to, which token it's using, *where each of those values was
read from* (environment, `.env`, or a default), and who the platform thinks
you are, including every project you can reach and the scopes you hold on
each. Most confusion an agent runs into is one of those four being different
from what somebody assumed.

## Checking it works

Two smoke tests drive the server the way a real client would — spawned,
written to over stdin, read from stdout — rather than importing its
functions, because the transport and framing are the part most likely to
break:

```sh
CAWDEV_URL=https://app.cawdev.com CAWDEV_TOKEN=cawd_… \
  node tools/mcp/smoke.mjs scratch-project
```

**Name a scratch project.** This test creates a roadmap entry and declines it,
and entries cannot be deleted — so it refuses to guess which project you
meant.

```sh
node tools/mcp/orchestration-smoke.mjs scratch-project
```

This one starts a real run, drives it through a runner, and exercises the
`ask_user` → someone answers → the call returns path.

Or drive it by hand, one call at a time:

```sh
printf '%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{}}}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"roadmap_where","arguments":{}}}' \
  | CAWDEV_TOKEN=cawd_… node tools/mcp/server.mjs
```
