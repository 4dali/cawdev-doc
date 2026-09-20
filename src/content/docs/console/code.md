---
title: "Code: Git overview, Codemap, Changelog"
description: What's actually in the repository, as opposed to what's planned for it.
---

Plan and Work are about intent and effort. Code is about the repository
itself, read by a runner rather than typed into a form — cawdev holds no git
credentials of its own.

## Git overview

Commits on the default branch, open branches, and branches that are merged or
gone — each one linked back to the card behind it where cawdev can tell. Every
number here is a **runner's own reading**, dated: the page says whose machine
looked and when, rather than pretending to a live connection cawdev doesn't
have.

## Codemap

The codebase drawn as nested boxes, sized by what they hold — a **treemap**,
not a force-directed graph. A few hundred files in a spring simulation is a
hairball; a treemap of the same files is still readable, because area, not
position, carries the information. Imports fold up to whatever's currently
visible, so zooming into one part of the tree doesn't drag the whole graph's
edges along with it.

This is cawdev's own map of *your* code — distinct from a third-party MCP
server that might also call itself something similar; nothing here reaches
outside the repository a runner has read.

## Changelog

Released history, grouped by version. It sits under Code rather than under
Plan for the same reason Work isn't Plan: released history is a record of what
happened, not a plan of what's intended, and it belongs beside the other
record of what's actually in the repository.

Like the roadmap, there's no delete — an entry's text can be corrected, but
never removed. See [Generated exports](/console/exports/) for how this and the
roadmap board relate to `CHANGELOG.md` in the repository itself.
