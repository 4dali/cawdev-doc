---
title: Sprints and the backlog
description: One page to plan a team's sprints with the cards waiting beside them, at /portfolio/sprints.
---

**Sprints** (`/portfolio/sprints`, under [All projects](/console/portfolio/)) is
one page to plan sprints from, for **one team at a time**. The *Backlog* button
in a team's head and in a sprint's head opens it on that team, and the old
addresses (`/portfolio/sprints/backlog`, `/teams/<id>/backlog`, and the old
*Active sprints* page's `?teams=`) land here. It shows, top to bottom:

1. the team's **Active** sprint,
2. its **Upcoming** sprints, in the order they start,
3. the **Backlog**: every card and issue of the projects shared with the team
   that is not finished and is in no open sprint of any team.

Each section says how many cards it holds and their estimate, and folds (the
page remembers which). A card in a Completed sprint is back in the Backlog. Only
projects you can see are drawn, and a card stays in its own project.

## The rows at the top

- **Team** is always drawn: a chip per team, each carrying its active sprint
  (*Core S7*, nothing between sprints). The page opens on the team you opened
  last, else the first by name. Changing team keeps your search, kind and layout
  and drops the project filter. *Open {team}* at the end opens the team's page.
- **Projects** is a row of its own: *All projects* and a chip per project, when
  the backlog spans two or more.
- **Show** is a separate switch, *Both | Cards | Issues*, so cards and issues are
  never read as projects. A search over the ref, title or status sits with them.
  The filters live in the address.

## List or Board

A *List | Board* switch at the right end of the filters chooses the layout.
*List* stacks the sections: the sprints, the Backlog last. *Board* puts them side
by side, the **Backlog first**, then the Active sprint, then the Upcoming ones,
each column with the same head and its cards as small tiles; the columns scroll
sideways. Drag, *Move to* and ticking work the same in both. The choice is in the
address (`?layout=board`, which wins) and the browser remembers it; the default
is List. A phone has no switch and always shows the List.

## A sprint's head

Each sprint head shows its name and state, dates, progress (*6 of 10 done*), its
goal, and under it what each project has in it, with **Start** or **Complete**.

## What the Backlog holds

Cards at *Backlog*, *Considering*, *New*, *Confirmed*, *Planned* or *In
development*. The list is wider than the *Backlog* status on purpose: a Planned
card nobody has put in a sprint waits here too. Merged, shipped and declined
cards are not shown.

## Moving cards

- **Drag** a row onto another section, or open its menu and pick **Move to** (the
  only way on a phone, where drag is off).
- **Tick several** rows in one section and use **Move to** in the bar that
  appears to move them together.
- Every move is one write, all or none. Moving takes **Edit cards** in the card's
  project; a card you cannot edit has no checkbox and no *Move to*.

:::note[Taking a card out of a sprint keeps its status]
**Move to Backlog** puts it back in the list; it does not turn its status to
*Backlog*. Bringing a card whose status *is* Backlog into a sprint moves it to
*Considering* (an issue, *New*), which is where a sprint starts
to work on it. Neither has an *Undo*: move the card again.
:::

**Start sprint**, **Complete sprint…** and **New sprint** are on the section's
head, with the rules of [the team page](/console/teams/). There is no order inside
a section: rank belongs to a project's own board.

## Create

At the foot of every sprint and of the Backlog, **+ Create** takes a title and
Enter. With one project you can make cards in, it is made at once; with several,
the *New card* dialog asks which project (and Card or Issue, which *Show* picks to
begin with). In a sprint the card is filed in that sprint, at *Considering* (an
issue at *New*). In the Backlog a card is filed at *Backlog*, so **no planning
session is started** for it, and an issue lands where the project puts its
issues. The project's phase hand-off applies as for any card in a sprint. A
reader sees no *Create*.

## Who sees what

A reader of the team reads the page and changes nothing. An archived team says so
and moves nothing.

Feedback you accept says where it landed (*Feedback accepted as R14, in the
backlog*, with **Open**); from here it is planned into a sprint. See
[Feedback](/console/feedback/#triage).
