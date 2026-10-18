---
title: The Roadmap
description: One board for roadmap cards and issues, in one pipeline, with a lane for what is new and a lane for what is planned.
---

The Roadmap is the one board where work is decided before it is built. It holds
two kinds of card: **roadmap cards** (something we intend to build, written
`R12`) and **issues** (something that is wrong right now, written `i15`). They
share one pipeline, and each keeps its own workflow inside it.

```
Backlog ▸ | New | Planned | In development | Merged | ◂ Declined
```

There is **one Roadmap, and it is across projects**: it opens at
`/portfolio/roadmap` over every project you are on, and a project has no board
of its own. Pick one project in the scope row, or follow the link on that
project's Overview, and the same board narrows to it (`?projects=<slug>`). See
[One Roadmap, across projects](#one-roadmap-across-projects) below. There is no
separate Issues page and no Issues row in the rail: `/projects/<slug>/issues`
opens the Roadmap showing issues (`?kind=ISSUE`), keeping whatever you had in
the address.

## One Roadmap, across projects

With no project picked the board shows **All projects**, a lane per project
(*Organise by → Project* is its default). Each tile leads with its project's key
and the ref (`SAAS-R12`), and a card opens over the board as `?card=SAAS-R12`.
Everything you do to a card is sent to that card's own project, and what you may
do follows your access there: a lane for a project you only read says *you read
only* and refuses a drop.

Pick **one** project and the board narrows to it (crumb `SaaS / Roadmap`) and
also shows what belongs to that project alone:

- the column **limits** (a column's menu has *Set limit…* if you hold *Manage
  settings*) and the project's **saved views**;
- **Manage sections** beside **New card**;
- the **Ready to release** link under Merged, for people who hold *Release*;
- the setup banner on an empty project, and the *Version* filter.

With several projects in view those are hidden; saved boards (see [All
projects](/console/portfolio/#choosing-the-projects)) are the views instead.
The view you had is not remembered between visits: a link or a saved board is
the standing filter.

The old project addresses still work. `/projects/<slug>/roadmap` and
`/projects/<slug>/issues` redirect in one step to the board narrowed to the
project, and `/projects/<slug>/roadmap/R12` (the link a push notification, an
email and the CLI write) opens that card over it.

## Lanes

Left to right as work moves:

| Lane | Holds |
|---|---|
| **Backlog** | A folded rail. Cards waiting to be brought in, in no sprint |
| **New** | New issues and proposed (**Considering**) cards |
| **Planned** | Confirmed issues and **Planned** cards |
| **In development** | Cards and issues somebody is building, on a branch |
| **Merged** | It landed. Waiting on a release |
| **Declined** | A folded rail. Decided against, with a reason |

**New and Planned are shared lanes.** A drop sets each kind's own status: a
card dropped on *New* becomes Considering and an issue becomes New; a card
dropped on *Planned* becomes Planned and an issue becomes Confirmed. You tell
the kinds apart by the glyph on the tile, the `R` or `i` in the number, and an
issue's severity square (a card shows its priority instead).

- Within a lane, issues sit above cards, by severity and then by rank.
- A lane has **one WIP limit**, and it counts both kinds.
- *Backlog* and *Declined* are folded rails you open from their heads.
- **There is no Shipped column.** Released work is read on the
  [Changelog](/console/code/#changelog), under the release that carried it.
  Shipped is still a status: the card's own status control offers it, a release
  sets it, and a link to a shipped card still opens it over the board.
- The head counts what is open, and under *Kind: Issues* the open issues by
  severity.

A branch that is merged outside cawdev is noticed, and its cards move to Merged
on their own; see [Review, verdict and merge](/console/review-and-merge/#merging).

## Statuses

Any status may move to any other: a status is not a step in a workflow. What
the rules are about is what a status **carries**.

| Card status | What it must carry |
|---|---|
| Backlog | nothing |
| Considering | nothing |
| Planned | nothing |
| In development | the branch name |
| Merged | the merge: a pull request, a merge commit or a sha |
| Shipped | the version, which must be a real git tag |
| Declined | a reason |

An issue has its own words: **Backlog**, **New**, **Confirmed**, then the shared
tail. Under *Kind: Issues* the lanes say **Resolved** for Merged and **Won't
fix** for Declined.

**Drag the card.** If the status you drop it on requires something, a small
dialog asks for it right there instead of refusing the drop:

| Dropping on | Asks for |
|---|---|
| In development | the branch |
| Merged | the merge |
| Declined | the reason |

Backlog, Considering and Planned require nothing and move immediately. If the
server refuses a move anyway, the board reloads to the truth rather than
leaving you looking at a lie.

:::tip[Drag is never the only way]
The card's own status chip does the same thing: the keyboard and screen-reader
path. Nothing in cawdev requires a mouse.
:::

:::note[There is no delete]
Not on the board, not in the API, not through MCP. **Declined, with a reason**
is the only exit, and the reason is the entire point: it is what stops the same
idea being re-proposed in six months.
:::

## Cards and issues

The **Kind** filter (`?kind=`) reads **Cards**, **Issues** or **Both**. Under
*Issues* the lanes hold one kind and say its words, and the head shows the open
issues by severity. The Roadmap row in the rail carries the number of issues
nobody has triaged.

An issue is a card too: its own number sequence (written `i91`), the same comments, history and development board when somebody fixes it.
What differs is the question, not *what do we intend to build* but *what is
wrong*. It has a **severity** (critical, medium, minor), which is the board's
first sort key; **priority** (highest to lowest) is how much the team wants it
done, is available on both kinds, and never moves a card. Dragging within a lane
keeps the order, and on this board a card only goes above one of its own
severity.

### Writing

**New card** and **File an issue** open one dialog. It asks **which project
first** (preselected when one project is in view, otherwise the last one you
made a card in; only projects where you may write are offered), then *Roadmap
card* or *Issue*; an issue also asks how badly, and a card can name a section of
that project. Both ask for a title and nothing else. The body is where the work is, and a good one has three parts:
what this is and why, **Build** (what to build) and **Done when** (how anyone
can tell it is finished). See [A card](/console/card/).

### Where a new card lands

A new card with no status named goes where the project's rule for its door says,
*On the board* (the first lane of its kind) or *In the backlog*:

| Door | Default |
|---|---|
| Written in the console, by a person or by a plan run asked for one, or accepted from a run's proposal | On the board |
| Filed by an agent on its own | In the backlog |
| Accepted from [Feedback](/console/feedback/), including through the Integration API | In the backlog |

A separate rule, *Issues use the backlog*, says whether an issue lands in the
backlog at all. All of these are set in [Project settings](/console/project-settings/#rules).
Giving a backlog card a sprint, or planning it, brings it onto the board; moving
a card into the backlog takes it out of its sprint. A card is in the backlog or
somewhere else, never both.

### Triage

An issue's menu (the dots on its tile) holds **Confirm with a session** and
**Confirm by hand** while it is New, and **Rank critical / medium / minor**.
Severity is somebody's judgement, open to being revised: an audit's ranking is a
claim, and triage is where a person disagrees.

Tick cards and issues together and the batch bar names the mix (*2 cards · 1
issue selected*) and offers only what is common: *Move to…*, *Assign…*,
*Sprint…*, *Decline…*, priority, due and estimate. *Set parent…* appears only
when everything ticked is a card, and *Rank…* only when everything is an issue.

## Finding things

The filter row, left to right:

- a search box (a number finds the card, `#runner` filters by tag);
- chips for **Section**, **Sprint**, **Severity**, **Tag** and **Epic**;
- **Mine**, **Updated** and **Overdue**;
- **Organise by**, which draws lanes per project (across projects), per sprint,
  by assignee or by section;
- **Board** or **List**;
- density, **Fields**, and your saved **Views**.

**Tags** are free: any short word, normalised to lower case, 12 to a card. There
is no tag list to administer. **Sections** are the headings of the generated
`ROADMAP.md`, managed from **Sections** beside **New card**. An **epic** is a
card that others name as their parent.

The **origin** pill on a tile is read off where the card came from: nothing for
a card a person wrote, *SonarQube*, *Feedback*, an integration token's own
label, or the kind of run that filed it.

On **Merged**, a pointer reads *Ready to release* and takes owners to the
[Changelog](/console/code/#changelog). The board does not start a release.
