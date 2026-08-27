---
title: The changelog
description: Releases newest first, categories, breaking flags, and why v0.10.0 sorts above v0.9.0.
sidebar:
  order: 2
---

The changelog is grouped by release, newest first, with **Unreleased** above
them.

## Adding an entry

**Add entry** takes a version, a category, the text, and whether the change is
**breaking**. Leave the version blank to file it under `Unreleased` — which is
where most entries start.

Categories follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/):
`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.

## Breaking changes are flagged twice

Once on the entry, and again on the **release heading**. Somebody deciding
whether an upgrade will hurt should not have to read every line to find out.

## Versions sort by semver

`v0.10.0` sits above `v0.9.0`, because releases are ordered as semantic
versions rather than as text. A text sort gets this exactly wrong, and gets it
wrong precisely when a project starts having enough releases to care.

## The release ritual

Every release updates **both** documents. A fix without a roadmap entry is
normal; a shipped feature without one is not.

1. Move the shipped entries to `SHIPPED` naming the version — **in the
   platform**, not in the file.
2. Write the changelog entries, moved from `Unreleased` to the version.
3. Tag the version in git. A `SHIPPED` status must name a **real tag**, and
   cawdev's own validator checks exactly that.
4. [Regenerate the exports](/console/exports/).
