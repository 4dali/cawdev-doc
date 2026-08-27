---
title: Run states
description: Where a run can be, what moves it, and the two properties that hold everywhere.
sidebar:
  order: 3
---

| State | Means |
|---|---|
| `QUEUED` | Started, waiting for a runner to claim it |
| `STARTING` | Claimed; the working copy is being prepared |
| `RUNNING` | The agent is working |
| `WAITING_ON_USER` | It asked a question and stopped. **You** are the blocker |
| `FINISHED` | It reported `done` |
| `FAILED` | It reported `blocked`, crashed, or its runner went quiet |
| `CANCELLED` | Somebody stopped it |

## Two properties that matter more than any pair

**Anything unfinished may be cancelled.** Somebody who wants a run stopped
should never be told it is in the wrong state to stop it.

**A run that has ended goes nowhere.** Re-running means a new run, which keeps
the history of what actually happened rather than overwriting it.

## What is swept, and what is not

A run whose **runner** stops heartbeating for five minutes is failed with a
reason. Otherwise it would sit `RUNNING` forever and block the project from
starting anything else.

A run **`WAITING_ON_USER` is never swept.** That is the one state where nothing
happening is correct — it is stalled on a person, and a person may reasonably
take a day.

## Live updates

The console polls while a run is alive and stops when it settles. The inbox
badge uses a **long poll** — the same primitive the agent itself blocks on — so
a question appears the moment it is asked rather than on the next tick.
