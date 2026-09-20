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
| `IMPLEMENT` | Yes — the full profile | Do the work |
| `TEST` | Depends on the project's test mode — see below | Prove it |
| `MEMORY` | No | Write down where the work got to |

`PLAN`, `VERIFY` and `MEMORY` are filtered down to reads: `Read`, `Grep`,
`Glob`, and the handful of `git` subcommands that only look
(`diff`/`log`/show`/`status`) — never `Write`, `Edit`, a `Bash` call outside
those, or delegating to a sub-agent that has its own tools, unless every
expert it's allowed to delegate to is *itself* read-only by its own
declared tool list.

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
