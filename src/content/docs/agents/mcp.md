---
title: The MCP server
description: Drop cawdev into any repository's .mcp.json and your agent gets the roadmap and changelog.
sidebar:
  order: 2
---

One file of plain Node, **zero dependencies**, speaking stdio JSON-RPC. It gives
a coding agent a project's roadmap and changelog — the same verbs a person gets
in the console, because the API was built to mirror these tools one for one.

:::tip[Zero dependencies is a feature]
You are about to let this thing write to your roadmap. It should be a file you
can read in one sitting before you run it.
:::

## Setting it up

Mint a [token](/agents/tokens/) with `roadmap:write` and `changelog:write` on
the project. Then, in the repository the agent works in, add `.mcp.json`:

```json
{
  "mcpServers": {
    "cawdev": {
      "command": "node",
      "args": ["/path/to/cawdev/tools/mcp/server.mjs"],
      "env": {
        "CAWDEV_URL": "https://cawdev.example.com",
        "CAWDEV_TOKEN": "cawd_…"
      }
    }
  }
}
```

Or leave `env` out and put the values in a **gitignored** `.env` at the
repository root — the server searches upward from its working directory.

## Which project

| Your token grants | What the agent must do |
|---|---|
| exactly one project | nothing — it is unambiguous |
| several projects | pass `project` per call, or set `CAWDEV_PROJECT` |

Get it wrong and the error lists what the token can actually see, rather than
saying no.

## The tools

**Orientation**

| Tool | What it does |
|---|---|
| `roadmap_where` | Which platform, which token, **where each value was read from**, and who the platform thinks you are |
| `roadmap_statuses` | The statuses and what each one requires |

**Roadmap**

| Tool | What it does |
|---|---|
| `roadmap_list` | Entries, filterable by status |
| `roadmap_get` | One entry in full |
| `roadmap_create` | A new entry |
| `roadmap_update` | Title, body, related |
| `roadmap_set_status` | Move it, carrying whatever the status requires |
| `roadmap_decline` | The only exit an entry has |

**Changelog**

`changelog_list`, `changelog_get`, `changelog_add`, `changelog_update`.

**Run-only** — these activate on a `cawdr_` run token and refuse a plain one:

| Tool | What it does |
|---|---|
| `task_current` | The entry, its branch, and everything already said on this run |
| `report` | `progress`, `done` or `blocked`. `done` and `blocked` end the run |
| `ask_user` | Ask, and **block** until answered |
| `await_answer` | Resume waiting on a question `ask_user` handed back |

## When an agent is confused

Tell it to run **`roadmap_where`**. Most confusion is one of four things being
different from what somebody assumed: the URL, the token, where those values
were read from, or which identity the platform sees.

## What the server teaches the agent

`tools/mcp/README.md` is written to be read by the agent as well as by you. It
teaches the working method — branch first, `CODING` names the branch **before**
the first commit, `roadmap_where` when in doubt, and that there is no delete.

An agent that reads it behaves noticeably better than one that only has the
tool descriptions.
