---
title: "Plan: Roadmap, Issues, Backlog, Sprints"
description: The four boards where work is decided before it's built — what we intend, what's broken, what's merely suggested, and what's grouped together.
---

Four boards, and four different questions. A roadmap card is something we've
decided to build; an issue is something reported broken; a backlog item is
neither yet — just feedback someone filed; a sprint is a named, numbered set of
cards, nothing more.

## Roadmap

Cards grouped by status, in the order work moves through them: **Considering**
→ **Planned** → **In development** → **Merged** → **Shipped**, with
**Declined** off to the side. Any card may move to any status — these aren't a
pipeline diagram, just what each status requires before it can hold that card.

**Drag the card.** If the status you drop it on requires something, a small
dialog asks for it right there instead of just refusing the drop:

| Dropping on | Asks for |
|---|---|
| In development | the branch |
| Merged | the merge (a PR, a commit, or a sha) |
| Shipped | the version — must be a real git tag |
| Declined | the reason |

Considering and Planned require nothing, and move immediately. If the server
refuses a move anyway, the board reloads to the truth rather than leaving you
looking at a lie.

:::tip[Drag is never the only way]
The card's own page keeps a status control that does the same thing — the
keyboard and screen-reader path. Nothing in cawdev requires a mouse.
:::

**Writing a card** asks only for a title and a starting status; the body is
where the work is, in markdown. Mention another card as `R4` or `i7` in
**Related** and it becomes a link in both directions.

:::note[There is no delete]
Not on the board, not in the API, not through MCP. **Declined, with a reason**
is the only exit, and the reason is the entire point — it's what stops the same
idea being re-proposed in six months.
:::

Open a card and its **graph** view draws what the rest of the corpus already
says about it — every other card, run and person it's connected to, laid out
in rings rather than a force simulation so the same graph always draws the
same picture. It's computed fresh on each visit rather than stored anywhere,
so editing a card changes its edges with no re-index to wait for.

## Issues

The same underlying cards, a different `kind`, and a genuinely different
board. An issue has a **severity** (Critical, Medium, Minor) instead of a
phase, is **triaged** before anyone works it, and is drawn by severity first —
scanning a column by number would bury a critical defect behind six minor ones
filed after it.

An issue starts **New** — filed, unlooked-at — and moves to **Confirmed** once
somebody agrees it's real, then follows the same shared middle as a roadmap
card: **In development**, **Merged**, **Shipped**, or **Won't fix** (the same
status as Declined, worded for a defect rather than a plan).

Triage is confirm-and-re-rank: an audit or a person's own report is a *claim*
that something is broken, and severity is somebody's judgement call, open to
being revised.

## Backlog

Feedback that isn't a card yet, and deliberately can't decide most of what a
card decides for itself: no number, no status machine, no section, no
severity. Whoever files it says only which of two things they think it is —
**Issue** (something's broken) or **Feature** (it should also do this, or do
it better) — and someone who can write the project deals with it once:
**accept** (it becomes a card, of the matching kind) or **refuse** (kept, with
an optional reason — nothing here is deleted, including what was considered
and turned down).

The badge counts what's still **pending** — the same "falls to zero when
someone deals with it" rule every attention badge follows.

## Sprints

A numbered, named set of cards a person opens, fills and closes — `S1
Notifications`. Numbered per project, so S1 here is nothing on another
project. A card belongs to at most one sprint at a time, and a sprint is *not*
a section — sections are the roadmap export's phase headings, and stay what
they were.

A sprint has exactly two states, **Open** (taking cards) and **Closed**, and
closing isn't final — a closed sprint reopens. There's no delete here either;
the one way a sprint disappears is an owner deleting the whole project.

No badge on this row: "3 open sprints" is a fact, not a queue that needs
working down to zero.
