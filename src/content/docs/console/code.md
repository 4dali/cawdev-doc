---
title: "Code: Quality, Git, Map, Changelog"
description: What is actually in the repository, as opposed to what is planned for it, and the Changelog where merged work is released.
---

Plan and Work are about intent and effort. **Code** is about the repository
itself, read by a machine of yours rather than typed into a form, because cawdev
holds no git credentials of its own. The rail has two rows: **Code** and
**Changelog**.

**Code** is one page with three tabs, **Quality**, **Git** and **Map**. Each tab
is a page of its own (`/quality`, `/git`, `/codegraph`, so every link you have
kept still opens) under the same header: the title, the default branch, a line
saying when a machine or the server last read it, and the page's buttons. The
Quality tab carries the gate as a chip (*Gate passed* or *Gate failed*) and the
Git tab the number of open branches.

## Quality

The Quality tab shows what SonarQube makes of the default branch: bugs,
vulnerabilities, security hotspots, code smells, coverage and duplication as six
tiles over their own history (30 or 90 days), and the four ratings as squares
with their words (*Fine*, *Warning*, *Critical*). A line says when the server
analysed the branch and when the platform read that: every ten minutes, or the
moment a writer presses **Refresh**.

When the gate failed, a red banner says so first (*The quality gate on main
failed: reliability E, security D.*). It says that a branch marked Done still
merges, because the gate is a reading and not a rule, and offers **Make it a
rule** ([Project settings → Rules](/console/project-settings/#rules)) and, to a
person who can run agents, **Start a run to fix the critical findings**.

It is a reading, not a live view: a read that failed keeps the last numbers on
screen under a sentence saying it failed and when, so an old green gate never
passes for a current one. A project that is not connected gets one sentence and
**Connect SonarQube** (**Project settings → Quality**) for an owner. *Open in
SonarQube* opens the project on its own server.

**Findings** lists the open bugs, vulnerabilities and security hotspots, worst
first: severity, rule, file and line, and *Open in SonarQube*. Kind, severity
and open or no-longer-reported are chips whose picks are in the address, so a
link to *Critical bugs* is a link. A person who can edit cards presses **File as
issue** on one, keeps or changes the severity the server suggested, and **File
issue** puts a New issue on the board with the rule, the place and the link in its
body. The row then shows the card's ref, and a finding is filed once. A row struck
through is one SonarQube stopped listing, and says *false positive*, *accepted*
or *fixed* when the server said why. When the team marked a filed finding false
positive or accepted on the server, its still-open card gets one comment saying
so.

**Gate history** lists the analyses where the gate changed, newest first, with
the measures that moved. It does not say which card or pull request moved them,
because an analysis does not record one. Setting the connection up is in
[Project settings](/console/project-settings/).

## Git

What a machine of yours last saw in the repository, in three sections of one
scroll: *Landed on main*, *Open branches* (each with the card behind it) and
*Merged and gone*. Every number is a runner's own reading, dated, and the page
says whose machine looked and when. A card's *See the Git tab* link scrolls to
the section it means. The repository is right and this page is stale; a project
no machine has read yet says so and links to Machines.

The tab's one filled button is **Create a branch**. It asks a machine of yours to
put a branch on origin, cut from any branch, with no card involved (a card has
its own **Create branch**). **Branches asked for** lists each request until the
next reading lists the branch: requested, created, or refused with the machine's
own sentence. It needs a machine of yours with a checkout and a runner daemon
new enough to take the request; an older one is never handed it, and the refusal
says to restart it.

## Map

The codebase drawn as nested boxes, sized by what they hold: a **treemap**, not a
force-directed graph. A few hundred files in a spring simulation is a hairball;
a treemap of the same files stays readable, because area, not position, carries
the information. Imports fold up to whatever is currently visible, so zooming
into one part does not drag the whole graph's edges along with it.

It is drawn on a fixed canvas, from one pass over the repository by a machine of
yours; **Re-read** asks for another. Every coding run is handed the same map, so
it does not grep its way around the code. On a phone the tab says it needs a
wider screen.

## Changelog

Released history, grouped by version. It sits under Code rather than Plan because
released history is a record of what happened, and belongs beside the other record
of what is in the repository.

The header has the title and **Add an entry** for people who can edit cards, the
one filled button. Adding or correcting an entry opens a dialog; leave the version
blank to file it under `Unreleased`. Below, top to bottom:

1. a warning when a release still has no tag;
2. **Ready to release** (for people who hold the **Release** privilege);
3. one section per release, newest first, with `Unreleased` above them.

A release's head has its version in mono, the date it was recorded, how many
entries it has and how many are breaking, and **Latest** on the newest. Older
releases are folded to their head; **Show** unfolds one. A release that contains
breaking changes says so in a banner and marks each such entry **Breaking**.
Releases are ordered by **semantic version**, not alphabetically, so `v0.10.0`
comes above `v0.9.0`.

**Versions** sit beside the releases (under them on a phone): each version the
project knows, how many cards aim at it, and whether it has shipped, with
**Define a version**. It is the same table as under *Project settings →
Versions*.

### Releasing

The **Ready to release** panel lists every merged card and merged issue, one row
each with its own tick and a **Merged** chip; its head says *n merged, not
released*. Tick them, or tick a whole sprint, or **Select all n**, then press
**Release n cards…**. The button stays off, with the hint *Tick a card to release
it*, until you tick one. The Roadmap's Merged lane points here; neither board
starts a release itself. The dialog shows the **last version and where that
number came from** before the field for the new one.

Two buttons differ in who writes the prose:

- **Release** takes a version from the ones the project has defined and not yet
  released into, and each card gets a changelog entry generated from its title,
  as an editable draft with a category you can change. Nothing is written until you
  press it. A card that already has an unreleased entry has *that one* stamped with
  the version.
- **Release with an agent** starts a run that reads each card, its plan and what
  actually merged, writes the entry a person would have written, and carries out
  the release: bump, regenerate the exports, commit, tag, push. It costs a run.

A card that cannot be released comes back named, with a reason, without stopping
the others. A card of a team sprint whose branch has not landed on `main` is
refused until it has; see [Sprint
branches](/console/review-and-merge/#sprint-branches).

**The tag is confirmed by one of your machines, not by cawdev.** A release is
recorded with its tag *outstanding*, and the page says so in a warning with a
**Check for the tag** button. A machine answers with the tag's sha from the remote
and the release reads confirmed. What the machine said last is folded behind *Last
try*. "Not confirmed yet" is the normal state for as long as a release takes,
because the changelog has to be in the commit that gets tagged.

Like the roadmap, there is no delete: an entry's text can be corrected, but never
removed. See [Generated exports](/console/exports/) for how this relates to
`CHANGELOG.md` in the repository.
