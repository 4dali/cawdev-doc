---
title: All projects
description: The same boards, drawn over every project you are on, with the projects you pick in the address.
---

**There is one Roadmap and one Development board, and both are across
projects.** A project has no board of its own: **All projects** puts the boards
over every project you are on, the way a Jira board spans projects, and picking
one project narrows the same board to it.

## Opening it

**All projects** is last in the project switcher's menu (the arrow beside the
project's name in the top bar), and `⌘K` finds it as "across projects". It opens
on `/portfolio/overview`. On a page across projects the crumb reads `All projects /
Roadmap`.

## Its own rail

**Overview**, **Plan** (Roadmap, Feedback, **Sprints**) and **Work**
(Development, Runs, Insights). Roadmap carries the issues nobody has triaged and
Development the reviews and stopped work waiting on you, each added up over your
projects. A project's own rail has no Roadmap or Development row. The rail adds
two groups of its own:

- **Projects**: one row per project of yours that is not archived, with its key
  and name, and a number when something is waiting on you there. The numbers are
  the top bar's count taken apart, so they add up to it. A row opens that
  project's overview.
- **Teams**: the teams you are in. See [Teams and sprints](/console/teams/).

| Page | What it shows |
|---|---|
| **Overview** | Waiting on you across the projects in view, **Live** (an orb for every run running), **Added up** (Roadmap, Issues, Development, Runs this week) and **The projects**, a table led by what needs you. Every number opens the page across projects it counts |
| **Roadmap** | Every project's cards and issues on one board, one lane per project. `/portfolio/issues` opens it showing issues. See [The Roadmap](/console/roadmap/#one-roadmap-across-projects) |
| **Feedback** | What is waiting to be triaged, project by project |
| **Sprints** | One team at a time: its Backlog and its sprints, as a list or a board. See below |
| **Development** | Every open branch, a lane per project, with batch merges per project. See [Development](/console/work/#development) |
| **Runs** | Every run in the projects in view, newest first, with the project's key on every row |
| **Insights** | Each median is worked out over all the runs together, never a median of each project's medians |

## Choosing the projects

The **scope row** under the heading, labelled *Projects*, picks them. *All
projects* is pressed when none is picked; each project is a chip with its key.
The choice is in the address (`?projects=alpha,beta`), so a link shows the same
board. With none picked you see every project of yours that is not archived.

Pick exactly one project (or follow a link from its Overview) and the board
also shows that project's own settings: column limits, saved views, **Manage
sections**, the *Ready to release* link and the setup banner. The crumb names the
project (`SaaS / Roadmap`). With none or several picked, those are hidden.
Project chips show the project's name, not its slug.

The same row holds the **Saved board** chip and **Save as board…**. A saved board
keeps the projects you picked and every filter in the bar under a name, the way
a Jira board is a saved filter. **Shared** boards are visible to everyone in at
least one of their projects, each person seeing only the projects they are in.
Only the person who saved a board can update, share or delete it.

## Where the project boards went

The old addresses redirect, each in one step, onto the board narrowed to the
project with the card open:

| Old address | Lands on |
|---|---|
| `/projects/<slug>/roadmap` | `/portfolio/roadmap?projects=<slug>` |
| `/projects/<slug>/development` | `/portfolio/development?projects=<slug>` |
| `/projects/<slug>/issues` | the Roadmap, `?projects=<slug>&kind=ISSUE` |
| `/projects/<slug>/roadmap/R12`, `…/development/R12` | the card over the board, `?card=KEY-R12` |
| A card's old graph link, `/projects/<slug>/roadmap/<n>/graph` | the card over the board, `?card=KEY-R12` |

A card's own link, `/projects/<slug>/roadmap/R12`, is still what pushes, emails,
SonarQube and the CLI write, and it keeps working. A branch's review page
(`…/development/review/<id>`) is still a page of its own. A card's old graph
link opens the card over the board.

## Lanes per project

The Roadmap and Development boards group by **Organise by → Project**: a lane
for each project, an empty one too. A lane head says what is open in that
project, and says *you read only* where you cannot change anything there: a card
dropped into that lane is refused, with a reason. What you may do in a lane
follows your access to *that* project, so a lane you can edit and a lane you only
see sit side by side. See [Team access and privileges](/console/team-access/).

Tiles lead with the project's key and the ref (`SAAS-R12`). A card opens over the
board as `?card=SAAS-R12`, and closing it leaves the board as it was.

## Everything happens in the card's own project

Dragging a card moves it there, Done and Not done are posted there, feedback
accepted here becomes a card there, and a backlog card can only be filed into a
sprint of a team its own project is shared with. Batch acts (priority, due date,
estimate, **Start a run…**, batch merge) run one project at a time. Column
limits, saved views and **Manage sections** are one project's, so they appear
only when one project is in view.

**Making a card across projects.** *New card*, *File an issue* and *File
feedback* ask which project first, offering only the projects in view you may
file in, then the card's fields (and, for a card, that project's sections). A column's quick add
creates the card in the chosen project.

You only ever see projects you are on. Naming a project you are not in shows
nothing for it, and an administrator sees no more here than anybody else.

## Sprints

**All projects → Sprints** (`/portfolio/sprints`) is one page for **one team at
a time**: the team's Backlog and its sprints, as a *List* or a *Board*. There is
no separate *Active sprints* page and no separate backlog page any more;
`/portfolio/sprints/backlog`, the old page's `?teams=` and `/teams/<id>/backlog`
all land here. The *Team* row names each team with its active sprint (*Core
S7*), and *Open {team}* opens the team's page. See [Sprints and the
backlog](/console/team-backlog/) for the whole page.

A card is planned into a sprint only if its project is shared with the team; a
card you only read cannot be moved. You see only the part of a sprint in
projects you can see.
