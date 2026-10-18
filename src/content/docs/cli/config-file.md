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
| `agentCommands` | string[] | `["claude"]` | Which coding agent(s) this machine spawns for a run — `claude` (Claude Code), `agy` (Antigravity CLI) and/or `codex` (Codex CLI), told apart by the command name itself. See [Agents](/cli/agents/). The file wins: `CAWDEV_AGENT_COMMAND` (comma-separated) is read only when the file names no agent. Hot-swappable. |
| `agentArgs` | string[] | Claude Code's own flags — see below | Replaces the **whole** default argument list. Add permissions with `allowedTools`, not by copying this and editing it. |
| `allowedTools` | string[] | `[]` | Extra permissions, **added to** the defaults rather than replacing them — the whole reason this exists apart from `agentArgs`. |
| `grantable` | string[] | `[]` | This machine's ceiling on what a *stored* rule (from a project, or from the console) may grant with nobody watching. Empty means safe: a machine that declares nothing still works, it just asks every time. |
| `acceptsRulesFromConsole` | boolean | `false` | Whether this machine applies permission rules set on the web page. See [Permissions and the shield](/cli/permissions-and-shield/) — turning this on is a real decision about what an unattended agent may do here. Together with *Allow everything* in the console, it is also what lets Codex or Antigravity write. |
| `browser` | boolean | `false` | Whether a run here may drive Claude in Chrome — *your* Chrome, your cookies, your mail. Off, and it has to be. A project entry's own `browser` overrides this in **either** direction, so one project can allow it on a machine that otherwise does not, and the reverse. A run that asks and is refused is not failed; it runs without a browser and says so on its transcript. Turning it on does not pre-allow it: the first call still asks. |
| `autoWorkspaces` | number | `0` | How many checkouts per project this machine may **clone by itself** when a coding run would otherwise wait for a free one — named `<project>-auto-<n>`, found again by name on restart, removed by [`/drop`](/cli/terminal-ui/#advanced-mode) in the attached terminal. `0` means none: a clone spends disk and time, so it's switched on, never on by default. Hot-swappable. |
| `skillCache` | string \| null | `null` | Where a skill's shared, per-repository index lives, outside every checkout. `null` leaves it unset — indexing still works, just re-done more often. |
| `skillPrepareSeconds` | number | `300` | How long to spend building that index before giving up. A session starts without it rather than hanging. |
| `idleSeconds` | number | `1200` | How long a session may say nothing before the daemon notes it in the transcript. It never kills anything — see [The runner daemon](/cli/runner-daemon/). `0` turns it off. |
| `sessionExitSeconds` | number | `30` | How long a stage gets to leave after its input is closed before a `SIGTERM`, and again before a `SIGKILL`. |
| `sessionMemoryMax` | string | *(none)* | Linux only. Spawns each agent session under `systemd-run --scope -p MemoryMax=…` (`6G`, `512M`, `75%`), so a session that runs a test suite out of memory is killed on its own and the daemon stays up. It needs a systemd manager for your user (`loginctl enable-linger <user>` on a box with nobody logged in) or a daemon running as root; the daemon probes once at boot and says in its log whether it applied. Needs a restart. See [Troubleshooting](/cli/troubleshooting/#the-daemon-was-restarted-daemon_restarted). |
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
  `allowedTools` / `grantable`, layered **on top of** the machine's own, and
  `browser`, which **replaces** the machine's value for that project.
- An object with `workspaces` gives a project several checkouts. Concurrency
  for a project *is* the number of workspaces — a run that has no free one
  queues rather than fails, which is the truth rather than a proxy for it.
  `cawdev config add-workspace` adds one to an existing project.
- Either object shape may carry a `quality` block, `{ "command": "sonar-scanner",
  "tokenEnv": "SONAR_TOKEN" }` (both keys have those defaults, so `"quality": {}`
  is enough), which scans each coding run's branch with SonarQube after its TEST
  stage. `cawdev config quality on <slug>` writes it and `off` removes it.

A session that has no branch of its own (a plan, a verify, an ask) takes no
checkout. It reads in a **reading copy** beside the project's first checkout,
`<first>-read`, a detached worktree kept at `origin/<default branch>`. See [The
runner daemon](/cli/runner-daemon/#reading-copy).

## Changing it without editing it

Most changes are smaller than a whole setup walk. Each of these writes
`runner.config.json` and nothing else:

```
cawdev config                          a menu
cawdev config add-project              serve one more project, or create one
cawdev config add-workspace            another checkout for a project already served
cawdev config remove-project <slug>    stop serving a project; its checkouts stay on disk
cawdev config agent enable|disable <claude|agy|codex>
cawdev config rules on|off             accept permission rules from the console
cawdev config quality on|off <slug>    scan this project's branches with SonarQube
cawdev config show                     this machine's config, token redacted
```

Inside the [attached terminal](/cli/terminal-ui/#configuring-this-machine-without-leaving),
`c` is the same menu. *Add a project* widens the machine's existing token in
place rather than minting a second one, and asks you to `/login` first if
needed.

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

## What takes effect when

Four keys are **hot-swappable**: `agentCommands`, `grantable`,
`acceptsRulesFromConsole` and `autoWorkspaces`. The daemon reads them fresh on
every use, so a change applies at once. Everything else (`projects` and their
workspaces, `url`, `name`, the token, `browser`, `sessionMemoryMax`, the
tuning numbers) is read once at boot.

Every change made through `cawdev config` or the `c` screen ends the same way:
the running daemon is sent a `SIGHUP`, re-reads the file, applies what it can,
and **says what it could not**. The command repeats the daemon's own verdict:
*applied, no restart needed*, or *needs a restart to pick up `projects`*.

While a restart is pending, the attached terminal pins a row in its footer:

```
! config changed: projects — restart to apply (q, then cawdev)
```

It is compared against the file the daemon **booted** with, so an edit
reverted by hand clears it, and a change made in an editor with nobody
signalling anything reaches the footer within thirty seconds. A notice, never
a restart: the daemon says, a person decides.
