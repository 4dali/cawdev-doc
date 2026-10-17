---
title: "Agents: Claude Code, Codex, Antigravity"
description: Which coding agent a run uses, how a machine gets another one, why the model follows the agent, and what Codex and Antigravity cannot do.
---

The runner daemon can spawn three coding agents. A machine spawns only the
ones it lists, and that is Claude Code alone until you add another.

| Agent | Command | Sign in once with |
|---|---|---|
| Claude Code | `claude` | `claude`, then follow the sign-in |
| Codex CLI | `codex` | `codex login` |
| Antigravity CLI | `agy` | the CLI's own sign-in |

The platform never holds any of these logins. The spawned session
authenticates exactly the way your own terminal does, so a machine whose agent
is signed out boots perfectly and fails every run. That is why
[`cawdev --setup`](/cli/installing/) asks about it.

## Adding an agent to a machine

```sh
cawdev config agent enable codex
cawdev config agent disable codex
```

Or press `c` in the [attached terminal](/cli/terminal-ui/) and pick *Enable
codex*. Both write `agentCommands` in [the config file](/cli/config-file/), and
`agentCommands` is hot-swappable: a running daemon picks it up with no
restart.

## Which agent does a run

The first of these that answers:

1. **The run's own choice.** *Agent* in the composer's *More* pill, where an
   agent the selected machine does not spawn is greyed out. In the terminal,
   `--claude`, `--codex` or `--agy` on a `/new` or `/develop`; `/agent codex`
   makes it the choice for every `/new` after it, kept across launches in
   `~/.cawdev/terminal.json`, and `/agent default` hands the choice back.
2. **The project's default agent**, under **Project settings → Project**.
3. **Your default agent**, under **Your settings → Defaults**.
4. Claude Code.

A name no machine spawns is refused. It is never quietly run as Claude Code
instead. In advanced mode each window says which agent and model actually ran
(`Codex · GPT-5-codex`).

## The model follows the agent

A card can name a model, and you have a default model for each agent. A run
takes the card's model, then your default **for that agent**. A default set
for a different agent is never carried across: a Codex run is not handed
`sonnet` because the card or your Claude default says so, because Codex
refuses `--model sonnet` at spawn. It gets your Codex default, or Codex's own.
The same holds for a stage that has no route of its own.

A model name cawdev cannot place (not Claude's, not GPT or Codex's, not
Gemini's) is passed on exactly as typed.

## What Codex and Antigravity cannot do

Neither asks permission one command at a time, so the things cawdev builds on
that are not available to them:

- **Writing needs a machine that allows everything.** A Codex or Antigravity
  run that changes code is refused before anything is spawned unless the
  machine accepts rules from the console (`cawdev config rules on`) **and** has
  *Allow everything* ticked under **Your settings → Machines**. The refusal says
  which of the two is missing, on the run's transcript as well as its summary.
- **Project tool rules, the permission prompt and the shield's command half
  do not apply.** Those are Claude Code's `--allowedTools` grammar and its
  `approve` handler. The half of the shield that takes secrets out of a
  result runs in the daemon, so it still applies. See [Permissions and the
  shield](/cli/permissions-and-shield/).
- **Experts are not reachable**, and a live follow-up prompt is not either:
  the process ends with its turn, and a follow-up is a resumed run.

## Codex specifics

Codex runs once per turn as `codex exec --json`, under the sandbox the
operating system enforces:

| Run | Codex is spawned with |
|---|---|
| One that must change nothing: ask, audit, scope, review, plan, and the plan, verify and memory stages of any run | `--sandbox read-only`. The shell reads and cannot write, and it needs nothing from the machine. |
| One that writes: code, interview, merge, release | `--dangerously-bypass-approvals-and-sandbox`, **only** on a machine that allows everything. Writing runs must commit and push, which the sandbox refuses. |

So a Codex plan, review or question needs neither setting, and Antigravity,
which has no such sandbox, needs both for every run. Codex uses the sign-in
from `codex login` and **not** your `~/.codex/config.toml`
(`--ignore-user-config`), so a model or MCP server you configured for yourself
never reaches a run. The run's token reaches cawdev's server through the
environment, never the command line, and is blanked for the model's own
commands. No usage windows are read for Codex, because it has no `-p /usage`.

:::note
The same stage rules apply to every agent: plan and verify are spawned with
nothing that can write. See [Lifecycle and stages](/cli/lifecycle-and-stages/).
:::
