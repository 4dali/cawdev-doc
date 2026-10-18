---
title: Teams and sprints
description: A team is a named group of people that plans one sprint at a time across the projects shared with it.
---

A **team** is a name and its people. It exists so a group of you can share
projects and run sprints together. Sprints belong to teams, not to projects:
the cards of several projects can sit in one sprint, each staying in its own
project with that project's people and rules.

:::note[What changed in v1.2]
Before, a project had its own sprints (and a few were "joint"). Now every one
of those became a sprint of a team named after it, with the numbers kept. Old
project-sprint addresses redirect to the team sprint they became.
:::

## What a team is

- **People**, each an **owner** or a **member**. A team may have several owners.
- **Who can make one**: whoever may create projects (administrators always;
  everybody if the deployment lets any member create projects, see
  [Administration](/console/administration/#platform)). Whoever makes a team is
  its first owner.
- **Archived, never deleted.** Archiving keeps the sprints, the history and
  everyone's access; the team just plans no new sprints. It is refused while a
  sprint is active.
- **Private.** A team you are not in reads as *This team does not exist, or you
  are not in it.* Administrators are no exception.

## Where to find it

**Teams** in the rail of [All projects](/console/portfolio/) lists your teams;
`/teams` opens on the team you looked at last (or the first by name), `/teams/new`
makes one, and `/teams/<id>` is a team's page. With none, the page says *You are
not in a team yet*.

A team's page reads top to bottom:

- **The head** names the team and offers the one filled button, **New sprint**
  (a toast says *S8 created* with an **Open** button for its page), and a
  **Backlog** button for the [team backlog](/console/team-backlog/).
- **Team chips** switch team and end with a quiet *New team*.
- **Active** — the one sprint being worked: its ref (`S7`), name, goal, dates,
  days left, how many cards are done, then its cards grouped by project.
  Between sprints it says *No sprint is active*.
- **Upcoming** lists sprints in the order they start; **Completed** is history.
- **People** sits at the side (below the sprints on a phone).
- **Projects** — the table of what the team's people can do on each project;
  see [Team access and privileges](/console/team-access/).

## People

An owner adds a person **by username** (there is no directory to browse),
changes a role, removes someone, renames the team and archives it from the
menu beside the head. The last owner cannot be demoted or removed and is not
offered it. Anyone can **Leave team…** from their own row.

## Sharing a project with a team

A project is shared **by its owner**, who may share only with a live team they
belong to.

- From the project: [Project settings → People](/console/project-settings/#people)
  → **Share with a team…**.
- <!-- WAITS: R515 --> From the team: the **Projects** table on its page, which
  also covers *every project I own, including new ones*.

A share gives the team's people a role or privileges on the project, **never
ownership**. A person's access is the strongest of their own and every team's,
worked out at every request; leaving a team or stopping a share takes effect on
the next request, and with it every agent token that person minted through
that access. **Stop sharing** is refused while the team's open sprints hold the
project's cards.

## Sprints

Numbered inside the team, with a name, an optional goal and dates. States:
**Upcoming** (ordered), **Active** (at most one per team) and **Completed**.

- Any member of the team opens, edits, reorders, starts, completes and reopens
  sprints. Nothing starts by itself.
- **Start sprint** works while none is active.
- **Complete sprint…** asks where the cards that have not landed go: into the
  team's next upcoming sprint, or out of any sprint (they stay on the board).
  Landed, declined and merged cards stay as the sprint's record.
- **Reopen sprint** works only while none is active.
- There is no delete, here as everywhere.

Type `S7` or a sprint's name into ⌘K to open it from anywhere.

### A card's sprint

A card (or issue) sits in **at most one** sprint, Active or Upcoming, of a team
its project is shared with. It is written `S7` inside the team and
`Core team · S7` outside it. A Backlog card filed into a sprint enters the
pipeline on the way; taking a card to the Backlog takes it out of its sprint.
Three ways to file one:

1. The card's **Sprint** field (a select grouped by team).
2. The sprint page's **Add cards…** dialog, or the [team
   backlog](/console/team-backlog/).
3. From an agent or script: the `sprint` field, which takes `7`, `S7`,
   `"Core team · S7"`, a sprint id, or `""` to clear. See
   [Tool reference](/mcp/tools/).

Every change is a line in the card's history. A card in a sprint wears its
ref as a chip on both boards; the chip opens the sprint's page.

### The sprint page

`/teams/<id>/sprints/<n>`: the head names the sprint and offers the one act its
state allows. Under it are the goal, the dates, progress, the **estimate total**
(*estimate 13, 2 cards without one*, shown once any card has an estimate), then
the cards **grouped by project**.

**Add cards…** prepares a sprint, an empty upcoming one too, before it starts.
It is in the head, in the empty state and on each project, for anyone holding
**Edit cards** on a project the team reaches (not on a Completed sprint or an
archived team). The dialog has a **Project** picker when more than one project
is shared with the team, a search, and a checkbox per card showing its status and
*now in S7 · Core team* when it sits in another sprint (ticking it moves it).
Backlog, Considering, Planned, Confirmed and In development cards are offered; a
Backlog card leaves the backlog on the way and lands New (Considering for a
card). A row's menu has **Remove from sprint**. Adds and removes go together: if
the server refuses one, it names it and nothing moves. If you only read a
project you see its cards and nothing to change, and a Completed sprint changes
no cards. The sprint page has a **Backlog** link to the [team
backlog](/console/team-backlog/).

### A branch per project

A sprint can name the branch its cards in one project are cut from and land on.
Someone holding **Release** on that project sets it on the sprint page under
that project's cards (**Set branch…**); it is refused while a card of the sprint
in that project has an open branch, and for the project's default branch. Work
then cuts from and lands on it, and **Land the sprint branch** merges it as a
merge commit. See [Review, verdict and merge](/console/review-and-merge/).

### Sprints across teams

`/portfolio/sprints` shows the sprints of all your teams side by side, under
[All projects](/console/portfolio/).
