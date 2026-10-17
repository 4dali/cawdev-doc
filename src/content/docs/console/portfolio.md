---
title: All projects
description: The same boards, drawn over every project you are on, with the projects you pick in the address.
---

Every board in the console belongs to one project. **All projects** puts the same
boards over every project you are on, the way a Jira board spans projects.

## Opening it

**All projects** is last in the project switcher's menu (the arrow beside the
project's name in the top bar), and `⌘K` finds it as "across projects". It opens
on `/portfolio/overview`. On a page across projects the crumb reads `All projects /
Roadmap`.

## Its own rail

The rail has the shape of a project's: **Overview**, **Plan** (Roadmap,
Feedback, **Sprints**), **Work** (Development, Runs, Insights). It adds two
groups of its own:

- **Projects**: one row per project of yours that is not archived, with its key
  and name, and a number when something is waiting on you there. The numbers are
  the top bar's count taken apart, so they add up to it. A row opens that
  project's overview.
- **Teams**: the teams you are in. See [Teams and sprints](/console/teams/).

| Page | What it shows |
|---|---|
| **Overview** | Waiting on you across the projects in view, **Live** (an orb for every run running), **Added up** (Roadmap, Issues, Development, Runs this week) and **The projects**, a table led by what needs you. Every number opens the page across projects it counts |
| **Roadmap** | Every project's cards and issues on one board, one lane per project. `/portfolio/issues` opens it showing issues |
| **Feedback** | What is waiting to be triaged, project by project |
| **Sprints** | Your teams' active sprints, and what is in none. See below |
| **Development** | Every open branch, a lane per project, with batch merges per project |
| **Runs** | Every run in the projects in view, newest first, with the project's key on every row |
| **Insights** | Each median is worked out over all the runs together, never a median of each project's medians |

## Choosing the projects

The **scope row** under the heading, labelled *Projects*, picks them. *All
projects* is pressed when none is picked; each project is a chip with its key.
The choice is in the address (`?projects=alpha,beta`), so a link shows the same
board. With none picked you see every project of yours that is not archived.

The same row holds the **Saved board** chip and **Save as board…**. A saved board
keeps the projects you picked and every filter in the bar under a name, the way
a Jira board is a saved filter. **Shared** boards are visible to everyone in at
least one of their projects, each person seeing only the projects they are in.
Only the person who saved a board can update, share or delete it.

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
limits and saved views stay on a project's own pages, because they are one
project's.

**Making a card across projects.** *New card*, *File an issue* and *File
feedback* ask which project first, offering only the projects in view you may
file in, then the same fields as the project's own dialog. A column's quick add
creates the card in the chosen project.

You only ever see projects you are on. Naming a project you are not in shows
nothing for it, and an administrator sees no more here than anybody else.

## Sprints across teams

**All projects → Sprints** answers "which team's sprint". The row at the top is
*Teams*: *All teams* and a chip for each team you are in (`?teams=`). Each team
has one panel with its active sprint: the team, the sprint's name and ref
(`S7`), when it ends, a progress bar, the goal, and its cards grouped by project
with each ref written with its project's key. The panel's menu holds *Complete
sprint…* and links to the sprint and the team. A team with no active sprint is a
line under *Between sprints*.

**Not in a sprint** lists the planned cards and confirmed issues of those teams'
projects that are in no sprint. Drag one onto a team's panel to put it in that
sprint. If the card's project is not shared with that team the page says so and
moves nothing; a card you only read cannot be dragged. *New sprint* asks which
team first. You see only the part of a sprint in projects you can see.
