---
title: The team backlog
description: Plan sprints with the cards waiting beside them, at /teams/<id>/backlog.
---

The **Backlog** of a team (`/teams/<id>/backlog`, from the **Backlog** button in
the team's head and in a sprint's head) is one page to plan sprints from. It
shows, top to bottom:

1. the team's **Active** sprint,
2. its **Upcoming** sprints, in the order they start,
3. the **Backlog**: every card and issue of the projects shared with the team
   that is not finished and is in no open sprint of any team.

Each section says how many cards it holds and their estimate, and folds (the
page remembers which). A card in a Completed sprint is back in the Backlog. Only
projects you can see are drawn, and a card stays in its own project.

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
*New* (an issue stays New, a card is Considering), which is where a sprint starts
to work on it. Neither has an *Undo*: move the card again.
:::

**Start sprint**, **Complete sprint…** and **New sprint** are on the section's
head, with the rules of [the team page](/console/teams/). There is no order inside
a section: rank belongs to a project's own board.

## Filters

A search over the ref, title or status, the project (by name, when the backlog
spans two or more) and *All / Cards / Issues*. They live in the address.

## Who sees what

A reader of the team reads the page and changes nothing. An archived team says so
and moves nothing.

Feedback you accept says where it landed (*Feedback accepted as R14, in the
backlog*, with **Open**); from here it is planned into a sprint. See
[Feedback](/console/feedback/#triage).
