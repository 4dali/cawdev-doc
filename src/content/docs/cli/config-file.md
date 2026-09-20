---
title: The config file
description: Every key runner.config.json understands, what it defaults to, and the three shapes a project entry can take.
---

`runner.config.json` is what a daemon boots from — deliberately the smallest
file that works. A generated one has a URL, a token, a name, and one path per
project; everything else below has a default, and a file that wrote every
default out would be one nobody dared edit afterwards, because you couldn't
tell what was chosen from what you were handed.

`cawdev --setup` writes one for you. This page is the reference for editing it
by hand.

## Top level

| Key | Type | Default | What it does |
|---|---|---|---|
| `url` | string | `https://app.cawdev.com` | The platform this machine talks to. `CAWDEV_URL` overrides it; it's also the key the token is filed under. |
| `token` | string | *(none)* | A `runner:operate` token, if you're keeping it in the config rather than in the token store. `CAWDEV_TOKEN` wins over this; this wins over the store. |
| `tokenId` | string | *(none)* | The token's public id, so `cawdev config add-project` can widen it in place instead of minting a second one. Written by `--setup`; safe to omit on an older config. |
| `name` | string | hostname, `.local` stripped | How this machine identifies itself — in the console's runner list, and as the key its token is registered under. Registration is idempotent by (owner, name), so restarting the daemon doesn't create a second entry. |
| `projects` | object | *(required)* | Slug → checkout. See [project entries](#project-entries) below — the one key with no usable default. |
| `agentCommands` | string[] | `["claude"]` | Which coding agent(s) this machine spawns for a run. `CAWDEV_AGENT_COMMAND` (comma-separated) overrides it. |
| `agentArgs` | string[] | Claude Code's own flags — see below | Replaces the **whole** default argument list. Add permissions with `allowedTools`, not by copying this and editing it. |
| `allowedTools` | string[] | `[]` | Extra permissions, **added to** the defaults rather than replacing them — the whole reason this exists apart from `agentArgs`. |
| `grantable` | string[] | `[]` | This machine's ceiling on what a *stored* rule (from a project, or from the console) may grant with nobody watching. Empty means safe: a machine that declares nothing still works, it just asks every time. |
| `acceptsRulesFromConsole` | boolean | `false` | Whether this machine applies permission rules set on the web page. See [Permissions and the shield](/cli/permissions-and-shield/) — turning this on is a real decision about what an unattended agent may do here. |
| `browser` | boolean | `false` | Whether a run here may drive Claude in Chrome — *your* Chrome, your cookies, your mail. Off, and it has to be; a project entry can only narrow it further, never widen it. |
| `skillCache` | string \| null | `null` | Where a skill's shared, per-repository index lives, outside every checkout. `null` leaves it unset — indexing still works, just re-done more often. |
| `skillPrepareSeconds` | number | `300` | How long to spend building that index before giving up. A session starts without it rather than hanging. |
| `idleSeconds` | number | `1200` | How long a session may say nothing before the daemon notes it in the transcript. It never kills anything — see [The runner daemon](/cli/runner-daemon/). `0` turns it off. |
| `sessionExitSeconds` | number | `30` | How long a stage gets to leave after its input is closed before a `SIGTERM`, and again before a `SIGKILL`. |
| `pollSeconds` | number | `25` | How often the daemon asks the platform for work. |
| `heartbeatSeconds` | number | `30` | How often it tells the platform it's still alive. |
| `workspacePollSeconds` | number | `3` | How often it checks for a person's Show/Stash/Commit/Reset request on a checkout — fast, because this sits behind a button somebody is watching. |
| `gitSurveySeconds` | number | `300` | How often it re-reads each served repository for the project's Git tab. Slow on purpose — this runs `git fetch`. |
| `usageSeconds` | number | `600` | How often it asks the CLI what's left of your usage window. `0` turns it off. |

:::note[The default URL]
A machine with no `url` set talks to cawdev's own hosted instance at
`https://app.cawdev.com`. A self-hosted deployment says so in its config —
one line, and the thing configs are for.
:::

## Project entries

Three shapes, all accepted, because most projects only need a path:

```json
{
  "projects": {
    "cawdev": "/Users/you/code/cawdev",

    "dycrypt": {
      "path": "/Users/you/code/dycrypt",
      "allowedTools": ["Bash(mvn *)"],
      "grantable": ["Bash(mvn *)"],
      "browser": false
    },

    "big-repo": {
      "workspaces": ["/Users/you/code/big-repo", "/Users/you/code/big-repo-2"]
    }
  }
}
```

- A bare **string** is one checkout — one workspace, exactly what every config
  meant before workspaces existed.
- An object with `path` names one checkout and adds per-project
  `allowedTools` / `grantable` / `browser`, each layered **on top of** the
  machine's own.
- An object with `workspaces` gives a project several checkouts. Concurrency
  for a project *is* the number of workspaces — a run that has no free one
  queues rather than fails, which is the truth rather than a proxy for it.
  `cawdev config add-workspace` adds one to an existing project.

## A complete example

```json
{
  "url": "https://app.cawdev.com",
  "name": "dali-laptop",
  "tokenId": "tok_8f2a…",
  "agentCommands": ["claude"],
  "projects": {
    "cawdev": "/Users/dali/code/cawdev",
    "dycrypt": {
      "path": "/Users/dali/code/dycrypt",
      "allowedTools": ["Bash(mvn *)"]
    }
  },
  "grantable": ["Bash(npm *)"],
  "acceptsRulesFromConsole": false,
  "browser": true,
  "idleSeconds": 900
}
```

The token itself isn't here — it's in `~/.cawdev/token.json`, which is not a
file people commit. See [Installing and signing in](/cli/installing/).

:::caution[Not hot-swappable]
Adding a project or a workspace with `cawdev config` only writes the file. A
daemon already running keeps the config it booted with; it needs a restart (or
a `SIGHUP`, which `cawdev config` sends automatically when it can) to serve
the new entry.
:::
