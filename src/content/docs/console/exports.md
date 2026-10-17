---
title: Generated exports
description: ROADMAP.md, ISSUES.md and CHANGELOG.md are exports. A hand edit is lost at the next one.
---

If your project keeps `ROADMAP.md`, `ISSUES.md` and `CHANGELOG.md` in its
repository, those files are **exports**.

```
the database  ──▶  tools/roadmap/export.mjs  ──▶  ROADMAP.md
the database  ──▶  tools/roadmap/export.mjs --issues  ──▶  ISSUES.md
the database  ──▶  tools/changelog/export.mjs  ──▶  CHANGELOG.md
```

:::danger[A hand edit is lost at the next export]
Change the entry in the console or through [MCP](/mcp/setup/), then regenerate
and commit the result.
:::

**Two files from one export script, because they're two questions.**
`ROADMAP.md` holds the cards whose kind is `ROADMAP`, filed by phase.
`ISSUES.md` holds the cards whose kind is `ISSUE`, filed by status rather than
by phase — a defect doesn't belong to "Phase 3", it belongs to *open* or
*fixed*.

## What a card's block holds

Each card is a heading and a few lines under it, written only when there is
something to say:

| Line | Holds |
|---|---|
| `Status:` | The card's status, as the file writes it (`IN PROGRESS`) |
| `Priority:` | highest, high, medium, low or lowest |
| `Branch:` | The branch its work is on |
| `Related:` / `After:` | Other cards, as `R12` or `i7` |
| `Parent:` | The epic it belongs to |
| `Tags:` | Free `#tags`, sorted |
| `Assignee:` | The assignee's username — only when somebody is assigned |
| `Origin:` | Where it came from (feedback, an agent, a Jira import…) |
| `Sprint:` | The team sprint, written `Core team · S7 Name` |

<!-- WAITS: v1.2 release -->
**Sprints are a team's.** The line names the team as well as the number, so
`Sprint: Core team · S7 Boards across projects` is unambiguous when a project
is shared with several teams. The parser still reads the older
`Sprint: S7 Name`; on import cawdev sends `Core team · S7`, or the bare number
when the file names no team.

**Where Backlog cards print.** `ROADMAP.md` files cards by phase, except three
statuses that get a section of their own, in this order: **Backlog — waiting to
be brought in**, **Considering — wanted, not settled** and **Declined — decided
against, with the reason**. `ISSUES.md` is filed by status: New, Confirmed,
Backlog, In development, Resolved, Released and Won't fix.

## Regenerating

```sh
CAWDEV_URL=https://app.cawdev.com CAWDEV_TOKEN=cawd_… \
  node tools/roadmap/export.mjs my-project

CAWDEV_URL=https://app.cawdev.com CAWDEV_TOKEN=cawd_… \
  node tools/roadmap/export.mjs my-project --issues

CAWDEV_URL=https://app.cawdev.com CAWDEV_TOKEN=cawd_… \
  node tools/changelog/export.mjs my-project
```

The token needs `roadmap:read` and `changelog:read` at minimum — see
[Agent tokens](/console/your-account/#agent-tokens).

## Why they're worth keeping

The database is the source of truth, but a roadmap that only exists behind a
login is invisible in a code review, in `git log`, and to anyone reading the
repository on a plane.

The exports are **byte-stable**: the same data produces the same bytes, so a
regenerated file shows a diff only when the roadmap actually changed — export
→ import → export is a fixed point, and that's what's tested. That's what
makes committing them tolerable rather than noisy.

## Importing an existing ROADMAP.md

Going the other way — a hand-written roadmap into a fresh project — is a
one-time move:

```sh
node tools/roadmap/import.mjs my-project --file ROADMAP.md
```

The export script also takes `--out FILE` to write somewhere other than standard output.

It's idempotent enough to re-run after a partial failure: entries that
already exist are updated rather than duplicated. It refuses to start when
preserving entry numbers is impossible, because numbers are permanent and
silently renumbering them would break every reference to them.
