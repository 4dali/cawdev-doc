---
title: Finding your way around
description: The rail, the top bar, the Live menu, the Inbox, and the composer that starts work without picking a page first.
---

Every page sits inside one shell: a top bar carrying where you are, and — once
you are inside a project — a rail down the left with every page that project
has.

## The rail

The rail is a table, not a set of pages that happened to accumulate: every row
answers a different question, and the headings group rows that answer related
ones.

| Group | Rows | Answers |
|---|---|---|
| *(no heading)* | Overview | The project at a glance |
| **Plan** | Roadmap, Issues, Backlog, Sprints | What we intend to build, and what's broken |
| **Work** | Development, Sessions, Insights | What's in flight, and what it costs |
| **Code** | Git overview, Codemap, Changelog | What's actually in the repository |
| **Project settings** | General, Rules, Playbook, Expert agents, Skills, MCP servers, Collaborators | How this project's sessions behave, and who can see it |

Collapse it to icons only from the toggle at its foot — the console remembers
the choice. Below about 56rem of width it becomes a drawer instead, opened from
a handle in the top bar.

A row can carry a badge, and a badge means exactly one of two things:

- **Attention** (a number that falls to zero when someone deals with it) — an
  untriaged issue, pending backlog feedback, a branch waiting on you.
- **Live** (something running right now) — a session in progress.

A badge never means "how many exist" — Roadmap would sit at forty forever and
nobody would read it. Every badge is read from the project's own overview and
is a link to the board it counts, so it can never disagree with what you find
there.

## The top bar

- **Project switcher** — jump between the projects you belong to.
- **Live** — a dot that turns while any of your sessions is actually working
  (not merely queued), opening a menu of every session running right now,
  grouped by what it's waiting on.
- **Inbox** — questions stalled on you, across every project. The badge counts
  what's genuinely stopped: your own questions, ones passed to you, and
  permission requests. It does not count things that merely want your opinion
  — those aren't stalled sessions.
- **⌘K** — the command palette. It reaches any page, in any project, without
  the rail.
- **Account menu** — your settings, and sign out.

## Starting work without a page

The home page (and a floating button everywhere else, or **⌘⇧↵** /
**Ctrl+⇧+↵**) opens the composer — the same box whichever way you reach it, so
there's exactly one place its behaviour can drift.

It offers five things to do, and what you type becomes a session with the
matching profile:

| Mode | What it does | Needs a card? |
|---|---|---|
| **Plan** | Plans a card, or — for something new — writes the card first, then plans it | Optional |
| **Ask about a card** | A question about one specific card | Required |
| **Audit** | Reads the code and proposes entries you choose from, rather than filing them itself | No |
| **Scope your idea** | An idea too big for one card: reads the code and cuts it into cards you accept one at a time | No |
| **Ask something else** | Anything else about the projects you've picked | No |

Starting a coding session on a specific card happens from that card, or from
the Development board — not from the composer, because by then you already
know which branch you mean.

## The project overview

The project's own front door: three strips of numbers, and every single one
links to the board it came from. A dashboard whose figures can't be acted on is
a report, and nobody reads a report twice — so nothing here is computed twice
either. If a project has no code yet, or no runner has read it, the overview
says so and offers the setup walk instead of a blank dashboard.

## The project list

Every project you belong to, with an **Overview** row across all of them on
your own home page — sorted by what needs you, since the badges that decide
that are the same ones the rail reads.
