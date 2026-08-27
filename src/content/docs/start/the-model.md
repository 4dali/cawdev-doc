---
title: The model
description: Projects, entries, tokens, runners and runs — the six things cawdev is made of.
sidebar:
  order: 2
---

Six things, and how they relate. Everything else in these docs is a detail of
one of them.

## Project

A named pointer at a git repository, with a permanent **slug** that appears in
every URL, a default branch, and its own **members**. Everything else belongs
to a project.

Projects **archive**, they do not delete — a project's roadmap is its history.

## Roadmap entry

Numbered per project (`R1`, `R2`, …) and permanent. An entry carries a title, a
markdown body, related entries, and a [status](/reference/statuses/).

A useful entry has three parts, and the third is what makes it workable by an
agent:

- What this is and why, in prose. Short.
- **Build:** what to build, as a list.
- **Done when:** how anyone can tell it is finished.

**There is no delete.** `DECLINED` with a reason is the only exit — and the
reason is the point, because it is what stops the same idea being re-proposed
in six months by somebody who was not in the room.

## Changelog entry

Filed under a version or under `Unreleased`, with a category and an optional
**breaking** flag. Releases sort by semantic version, so `v0.10.0` sits above
`v0.9.0` — which a text sort gets wrong.

## Agent token

A secret an agent authenticates with, carrying [scopes](/reference/scopes/) on
named projects. Two rules matter:

- **You can only grant what you hold.** A `READER` mints read scopes.
- It is evaluated against your **current** membership on every call, so losing
  access to a project kills your tokens' access to it at the same moment.

## Runner

A daemon on **your** machine that holds the repositories and the agent CLI
login. It connects **outbound** and polls, so there is no inbound port and
firewalls are nobody's problem. It registers itself by name.

## Run

One agent session on one roadmap entry, on one branch. A run moves through
[states](/reference/run-states/), collects **messages** the agent reports, and
**questions** it asks — which land in your [inbox](/console/runs/) and stop the
session until answered.

```
you press Start ──▶ run QUEUED
                      │
     your runner claims it, gets a short-lived token
                      │
              spawns the agent in the working copy
                      │
   agent reports ◀────┴────▶ agent asks ──▶ your inbox
                                              │
                                        you answer
                                              │
                                    session resumes, finishes
```

## How they fit

<div>

| | belongs to | reaches |
|---|---|---|
| Roadmap entry | a project | — |
| Changelog entry | a project | — |
| Agent token | a person | projects they are a member of |
| Runner | a person | projects its token grants |
| Run | an entry | one branch, one working copy |

</div>
