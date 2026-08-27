---
title: Token scopes
description: What each scope lets an agent do, and the minimum role that may grant it.
sidebar:
  order: 2
---

| Scope | Lets the holder | Grantable by |
|---|---|---|
| `roadmap:read` | Read entries | `READER` |
| `roadmap:write` | Create, edit, move and decline entries | `WRITER` |
| `changelog:read` | Read the changelog | `READER` |
| `changelog:write` | Write changelog entries | `WRITER` |
| `runner:operate` | Register a runner, claim queued runs, report their lifecycle | `WRITER` |

## Some scopes imply others

| Holding | Also grants |
|---|---|
| `roadmap:write` | `roadmap:read` |
| `changelog:write` | `changelog:read` |
| `runner:operate` | `roadmap:read` |

A runner has to read the runs it drives and the entries they are for; without
that it can claim a run and then never notice the run was cancelled.

## Two scopes you cannot grant

`agent:report` and `agent:ask` are **not user-grantable**. They only mean
anything bound to a run, so they are minted with the run's own `cawdr_` token
and refused to anyone minting by hand.

A hand-minted token carrying them could report on *any* run in the project,
which is a different and much larger thing than reporting on your own.

## You can only grant what you hold

The minimum role in the table above is both the role needed to **grant** a scope
and the role needed to **exercise** it. A `READER` mints read-only tokens.

Grants are checked against your **current** membership on every call, not on the
membership you had when you minted. Losing access to a project revokes your
tokens' access to it at the same instant.
