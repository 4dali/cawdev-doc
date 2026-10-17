---
title: Environment variables
description: Every CAWDEV_* variable the CLI, the daemon, and the MCP server read, and how they rank against the config file.
---

Every one of these is optional — a fully configured machine needs none of
them. They exist for the environment-only cases: a CI job, a one-off script,
overriding a config without editing it.

## Precedence

The rule is the same everywhere it applies: **what you typed, then what the
shell says, then the config, then the built-in default.** A value read from
the environment is somebody having said which one to use, so it's never
second-guessed by a file sitting nearby.

## What you set

| Variable | Read by | What it does |
|---|---|---|
| `CAWDEV_URL` | `cawdev`, the daemon, the MCP server | Which cawdev instance to talk to. Overrides the config's `url` — see [signing in vs. being addressed](/cli/terminal-ui/#two-urls) for why those are different questions. |
| `CAWDEV_TOKEN` | The daemon, the MCP server, the roadmap/changelog scripts | The credential. For the daemon this is a `runner:operate` token; for the MCP server, whatever scopes you minted it with. |
| `CAWDEV_PROJECT` | The MCP server, the roadmap/changelog scripts | Which project to act on, when a token grants more than one. |
| `CAWDEV_RUNNER_CONFIG` | `cawdev` | An explicit path to a config file, checked before the current directory's `runner.config.json` and before `~/.cawdev/runner.config.json`. |
| `CAWDEV_RUNNER_NAME` | The daemon | Overrides the config's `name` — how this machine identifies itself. |
| `CAWDEV_AGENT_COMMAND` | The daemon | Comma-separated list of agent commands, e.g. `claude,codex`. Read **only when the config file names no agent**: the file wins, then this, then the default (`claude`). |
| `CAWDEV_PREFS_FILE` | The attached terminal | Where the terminal's own choices are kept, such as the `/agent` pick. Defaults to `~/.cawdev/terminal.json`. |
| `CAWDEV_DRIVING_DIR` | The daemon | Where it keeps the note of the runs it is driving, which the next daemon reads on boot to fail what a dead one left as `DAEMON_RESTARTED`. Defaults to `~/.cawdev/driving`. |
| `JIRA_URL`, `JIRA_EMAIL`, `JIRA_TOKEN` | `tools/jira/import.mjs` | The Jira Cloud credentials for [the importer](/cli/jira-import/). They come from the shell and never from `.env`. |
| `CAWDEV_HISTORY_FILE` | The attached terminal | Where your typed-prompt history is kept. Defaults to `~/.cawdev/history.json`. |
| `CAWDEV_RUN_DIR` | The daemon, `cawdev` | Where the control socket lives. Defaults to `~/.cawdev/run`. Only worth setting if you're running more than one daemon under different home directories. |
| `CAWDEV_ASK_TIMEOUT_SECONDS` | The MCP server | How long `ask_user` blocks before giving up. |

## Testing only

| Variable | Read by | What it does |
|---|---|---|
| `CAWDEV_STUB_SCRIPT` | `stub-agent.mjs` | Which fixed script the stand-in agent follows — see [The runner daemon](/cli/runner-daemon/#testing-without-spending-a-real-run). |
| `CAWDEV_STUB_EXIT` | `stub-agent.mjs` | Set to make the stub exit immediately on finishing, instead of holding its stdin open the way the real CLI does. |
| `CAWDEV_APPROVAL_TIMEOUT_SECONDS` | The MCP server | Makes a blocked permission request give up after this long. **Unset, it waits for ever**: how long an unanswered request really waits is the project's setting, under [Permissions](/cli/permissions-and-shield/#when-nobody-answers). |
| `CAWDEV_GATE_TIMEOUT_SECONDS` | The daemon | The same for a lifecycle stage's gate (an approval). Unset, a gate never expires. |

## Set and read by the daemon itself

| Variable | What it does |
|---|---|
| `CAWDEV_RELOAD_STATE` | Written by `/reload` so the new process comes back as you left it (advanced mode, the focused window). It is read once and removed, so nothing a session spawns inherits it. |

## Set for you, not by you

These are written into a spawned session's environment **by the daemon**, so
the MCP server running inside that session can answer without a network round
trip back to the platform. Setting them yourself outside that context has no
effect worth relying on:

| Variable | What it carries |
|---|---|
| `CAWDEV_GRANTABLE` | JSON array — this run's ceiling, for the MCP server's own copy of the tool-rules check. |
| `CAWDEV_SHIELD` | JSON object — the shield's settings for this run. |
| `CAWDEV_SKILL_SERVERS` | JSON array — which MCP servers this project turned on as a skill. |
| `CAWDEV_WORKSPACE` | The absolute path of the checkout this run is in. |

:::note
`CAWDEV_ADMIN_EMAIL` and `CAWDEV_ADMIN_PASSWORD` exist too, but they're read by
the **platform** (Spring Boot) on first boot to create the first administrator
— nothing to do with the CLI, and not something you'd set on a machine running
`cawdev`. So are `CAWDEV_HOST` and `CAWDEV_PASSKEY_ORIGIN`, which decide the
host name a [passkey](/console/your-account/) belongs to: change the host and
the old passkeys stop working, though the password keeps working throughout.
:::
