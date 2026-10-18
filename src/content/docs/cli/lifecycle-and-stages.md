---
title: Lifecycle and stages
description: The five stages a coding run can walk, what each one is physically able to do, and why that's enforced rather than requested.
---

A project can turn a coding run into an ordered walk of stages rather than one
open-ended session. Each stage is its own process, can be gated on a person's
approval before it starts, and — this is the part worth understanding — is
handed a **narrower set of tools than the run's profile allows**, not merely
asked to stay within them.

:::tip[Enforcement, not a request]
A session told not to touch the code but able to is one refusal away from
touching it. A session that *cannot* has nothing to decide, and nothing to be
talked out of. Every claim on this page is a claim about which tools a stage's
process is actually spawned with.
:::

## The five stages

| Stage | May write files or run commands? | What it's for |
|---|---|---|
| `PLAN` | No (one exception, below) | Decide the approach before anything changes |
| `VERIFY` | No | Check the approach against what's actually in the repository |
| `IMPLEMENT` | Yes — the profile's tools, less `report` and `quality_get` | Do the work |
| `TEST` | Depends on the project's test mode — see below | Prove it |
| `MEMORY` | No | Write down where the work got to |

`PLAN`, `VERIFY` and `MEMORY` are filtered down to reads: `Read`, `Grep`,
`Glob`, and the handful of `git` subcommands that only look
(`diff`/`log`/show`/`status`) — never `Write`, `Edit`, a `Bash` call outside
those, or delegating to a sub-agent that has its own tools, unless every
expert it's allowed to delegate to is *itself* read-only by its own
declared tool list.

**No stage holds `report`.** `report done` ends the **run**, not the stage, so
a stage that reported "done" would end the run mid-walk and skip every stage
behind it. The run's finish is the daemon's, not any one stage's. `PLAN` and
`IMPLEMENT` also drop `quality_get`: a branch's SonarQube reading is a fact
about a tree that planning hasn't written and implementing is still writing.
The read-only stages keep cawdev's own readers (`task_current`, `roadmap_list`,
`roadmap_get`, `sprint_list`, `code_map`, `file_deps` and the rest of the
[reading tools](/mcp/tools/)), and anything else under `mcp__cawdev__` is
treated as a writer, because for a list we own, shape is the worst signal
there is.

**One named exception.** A `PLAN` stage on a run that started with no card
yet keeps exactly one platform write: creating the card it's planning. That's
the thing being planned, not a widening of what planning may do — it still
can't touch a file, run a command, or leave a comment.

## `TEST` and the testbook

`TEST` normally gets the full set of tools a coding run has, because proving
the work usually means running it. A project can flip a `TESTBOOK` switch
instead: then `TEST` may **write** as much as it wants — it has `TESTBOOK.md`
to produce — but is refused anything that could **run** something, `git`
reads aside. That's the same enforcement turned sideways: not "may this
change things" but "may this execute things," because a stage asked to
*describe* a test suite must not be able to run it.

## A stage is judged by whether its turn ended

The daemon closes a stage's input when its turn ends and, after
`sessionExitSeconds`, terminates the process group. Being forced out that way
is not failing. What *does* fail a stage is leaving work running: a turn that
ends with a background shell or an `Agent` delegation still going fails the
stage, so `/continue` re-runs it. See [The runner
daemon](/cli/runner-daemon/#a-stage-isnt-done-while-its-commands-are-running).
`IMPLEMENT` and `TEST` are told up front to wait for their commands, and `TEST`
to commit, since no stage after it writes code. After the last stage, a coding
run is committed and pushed by the daemon.

## Review has no stages of its own

A code review is its own run profile — its own prompt, nothing that can write
at all — not a sixth stage. Giving it stages would be a second description of
something that already works as one thing.

## The cross-check

Enforcement happens by never handing over the tool in the first place. A
separate check runs on every tool call anyway, on the chance that something
drifted — a stage list that grew a tool nobody meant to include, a CLI
version that stopped honoring `--allowedTools`. It never blocks anything; it
writes a note straight into the run's own transcript:

```
cawdev: the PLAN stage called Write, which it should not have been able to.
The work was not stopped — this is a note that what ran and what was
permitted have disagreed, which should not be possible and is worth
looking at.
```

A second thing that can stop a run is a second thing that can stop it
*wrongly* — so this only ever says something happened, on the one channel
the person reading the run is already looking at.

## Gates

Any stage can be configured to wait for a person's approval before it starts
— the same approval mechanism a permission request uses (see
[Permissions and the shield](/cli/permissions-and-shield/)), so there's no
second kind of "waiting for somebody" in the system. A `PLAN` stage's output
is worth gating in particular: it's an artefact you can read and disagree
with on its own, independent of whatever the session goes on to say about it
in a transcript.

A gate **never expires**: it waits for you however long that is. The
project's wait for an unanswered *permission* request is a different thing; see
[Permissions and the shield](/cli/permissions-and-shield/#when-nobody-answers).
