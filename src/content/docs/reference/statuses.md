---
title: Roadmap statuses
description: The six statuses, what each means, and what each one must carry.
sidebar:
  order: 1
---

| Status | Means | Must carry |
|---|---|---|
| <span class="status status-considering">CONSIDERING</span> | Wanted, but the design is not settled. List the open questions. | — |
| <span class="status status-planned">PLANNED</span> | Agreed, and specified enough to start. | — |
| <span class="status status-in-progress">IN PROGRESS</span> | Started: being designed or investigated. No branch yet. | — |
| <span class="status status-coding">CODING</span> | A branch exists, and the entry names it. | **branch** |
| <span class="status status-shipped">SHIPPED</span> | Released. | **version** — must be a real git tag |
| <span class="status status-declined">DECLINED</span> | Decided against. | **reason** |

## Any status may move to any other

There is no transition diagram. An entry really can go from `CONSIDERING`
straight to `SHIPPED` if that is what happened.

**The rules are about what a status carries, not the path it took.** That is why
the console asks for a branch when you drop a card on `CODING` and does not care
where the card came from.

## Who moves an entry to CODING

The **agent** does, naming the branch, before its first commit — not the console
when you start a run.

If the platform moved it for you, `CODING` would mean "somebody queued this"
rather than "somebody is working on this". The distinction is the whole value of
the status.

## Which statuses can start a run

`PLANNED`, `IN PROGRESS`, and `CODING`.

`CODING` is included because a failed run leaves the entry there, and refusing
to start another would mean moving the entry backwards by hand first.
`CONSIDERING` is excluded: an entry still being argued about is not something to
point an agent at.
