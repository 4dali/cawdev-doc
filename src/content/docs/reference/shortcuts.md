---
title: Keyboard shortcuts
description: The command palette, and getting around without a mouse.
sidebar:
  order: 4
---

## The command palette

| Key | Does |
|---|---|
| `⌘K` / `Ctrl+K` | Open the palette — or close it if it is open |
| `↑` `↓` | Move through the matches |
| `↵` | Go |
| `esc` | Close |

Type a few letters of what you want. The matcher works on **subsequences**, so
`rdm` finds `roadmap` and `cwd` finds `cawdev` — matches at the start of a word
and longer runs of consecutive letters rank higher.

## What it can reach

| Kind | What is listed |
|---|---|
| `go` | Projects, Inbox, Tokens, Users |
| `do` | Toggle the theme |
| `project` | Every project you can see |
| `page` | Every project's Roadmap, Runs, Changelog and Settings |
| `entry` | Every roadmap entry in the project you are currently in |

Entries are limited to the current project on purpose: they are what you reach
for mid-thought, and a flat list of every entry in every project is neither fast
nor how anyone thinks.

:::tip
`cawdev runs` works from anywhere, not just from inside `cawdev`. Project pages
are always listed.
:::

## Elsewhere

The roadmap board can be driven entirely from the keyboard by opening an entry
and using its status control — [drag](/console/roadmap/) is an addition, never
the only way to move a card.
