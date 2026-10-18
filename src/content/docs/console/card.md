---
title: A card
description: Opening a card, what it says about itself, the plan and its Done-when list, and the ways to start work on it.
---

A card is a roadmap card (`R12`) or an issue (`i15`). Opening one from any
board shows the same thing.

## Opening it

Click a card and it opens as a **side sheet** (560px) over the board, which
stays where it was. **Esc**, **Close** or the **‹ Roadmap** step in the header
returns you with your scroll and filters intact. **⌘-click** (Ctrl-click off a
Mac) opens it as a **page** in the board's place, as does **Open as a page**;
**More** holds the other two ways, the side sheet and a centred dialog. Whichever
you chose last is how the next card opens on this browser. On a phone a card is
always the whole screen.

The address is the card's in all three (`?card=R12`; `?card=SAAS-R12` across
projects), so a link opens the same card for anyone on the project. A card that
cannot be opened, because it moved or you lost access, says so where it was to
open.

## The header and the facts

The header reads left to right: the way back, the card's key, its status chips
(see [Changing the status](#changing-the-status)), its tags, then **Watch**, **Copy link**, **Open as a page** and
**More**.

## Changing the status

A card has two statuses and the header changes both.

- **Roadmap status** is a button holding the pipeline's columns. Pick one to move
  the card. *Merged*, *Declined* and *In development* ask for what they need
  (a reason, a branch) in the same dialog a drag onto that column opens.
- **Development status** appears when the card has a branch: *Ready*, *Coding*,
  *Review*, *Done* and *Not done*. It is disabled, with the reason beside it,
  while a session holds the branch, and *Done* and *Not done* are disabled
  until the branch is in *Review*. They ask for the same things as the buttons
  on the Development board; *Not done* needs a message.

Someone who only reads the project sees the chips and no button.

The facts sit beside the card, or in a **Details** fold under it when the card
is narrower than 640px:

| Fact | Notes |
|---|---|
| **Assigned to** | Always a person. Only somebody who could already work on the card can be picked |
| **Priority** | Highest to lowest; not the same as an issue's severity |
| **Section** | The heading it falls under in `ROADMAP.md` |
| **Sprint** | A team's sprint, written `S7` inside the team and `Core team · S7` outside. See [Teams and sprints](/console/teams/) |
| **Tags** | Free words |
| **Due**, **Estimate**, **Target version** | Optional |
| **Affects** | On an issue, the released versions it was found in |
| **Agent settings** | Model, effort, browser and the machine the next run goes to. Closed until you open it |

A fact you may change is a control that saves when you change it. One you may
not is text, and one nobody has set says *none* in grey. What you may change
follows your access to the project: someone who holds only **See** reads the
card and sees no controls. See [Team access and privileges](/console/team-access/).

## Start a run

Under the title there is one action bar with **one filled button**. On a card
that can take a run it is **Start a run**, with where the run will go in words
beside it (*on `r354-…` · dali-vm · the machine's default*) and **Change…**,
which opens the same dialog with its options unfolded.

Open a card that is Planned, In development or Confirmed and press it (**Fix
it** on an issue, and on a card that was sent back as not done). The dialog asks
for almost nothing:

- **Branch** is pre-filled from the project's convention (`r12-slug-of-title`).
- **Runs on** is a row for each of your machines and *Any of my machines*. The
  run is prepared in a checkout on that machine and pushes with the git
  credentials it finds there.
- **More options** is closed, and its head says the defaults in words. Inside:
  agent, model, effort (*Fast*, *Balanced*, *Thorough*, *Max*), the reviewers
  and stages this run walks, and **Let it drive the browser**, which is off
  unless the card needs one.

If the machine has uncommitted work, the dialog stops and asks, in place of the
form: **Show changes**, **Stash**, **Commit…**, **Queue for a clean checkout**
or **Start anyway**. It also asks when a machine's usage window is nearly
spent, and when the card's last run already finished (**Start again**).

A card holds **one run at a time**. If somebody else started one while your
page was open, the dialog says which run is in the way and offers **Open the
run**.

Tick several cards on a board and **Start a run…** in the bottom bar starts
them as a batch: a branch each on one machine (the default), a branch and a
machine each, or one branch in order.

Starting a run requires the **Run agents** privilege. A card you may read but
not run shows no Start button.

**Take this card** is the quiet button beside it: "this one is mine, I'll write
it". The card goes to In development on a branch, the work item to Coding, and
the card is assigned to you if nobody is. You are then shown the commands to put
the branch on your machine, with a Copy button. It needs a signed-in person
(an agent token cannot take a card), and it is refused while a run is on the
card or somebody else is coding the branch.

A card with a branch not yet cut can instead use **Create branch**, which asks a
machine of yours to cut the branch from any branch, stacked if you choose a
source other than the usual base. See [Code](/console/code/#git).

## The body

Top to bottom: **Description**, **Plan**, **Coding output**, **Runs**,
**Branch** and **Activity**, each a fold. A fold you open or close is
remembered for the next card on that board.

- **Description** is markdown. **Edit** opens the editor in place. Mention
  other cards as `R4, R7` in **Related** and they become links in both
  directions.
- **Plan** is the plan of record: who wrote it (*a plan run* when a run did),
  when, and the commit it was written against. When the default branch has moved
  since, it says so in amber. It says so and never blocks: a plan that is
  behind is still the plan, and Verify checks it. Earlier plans are a fold of
  their own.
- **Coding output** is what the card's last coding run reported, with who
  started it, when, the branch and a link to the run.
- **Runs** lists the card's runs, newest first: a status chip, a title, one line
  of facts, and one act: **Answer** (amber), **Watch it**, or **Open**.
  *Stopped* (slate) is a run that was held up and is never red.
- **Branch** is the work item: the branch and what it was cut from, where it
  stands, the pull request, and the review when one waits.
- **Activity** is the comments and the history of the card.

### The plan, and Done when

A plan run writes the plan with **Plan this card**. **Write plan** (or **Edit
plan**, once there is one) opens the plan in an editor instead. It is there on
any card you may edit (the **Edit cards** privilege), assigned or not. Saving makes a new plan of record; the one before stays
under the earlier plans.

Each `- [ ]` line under the plan's `## Done when` heading becomes an item of the
card's **Done-when checklist**, with two columns:

- **Built**, ticked by the agent while it works (the MCP tool `done_when_tick`)
  or by a person;
- **Checked**, ticked by the reviewer while the card is in review.

Both are kept. An item whose text you did not change keeps its ticks when you
edit the plan. Moving a branch to Review brings up the list for you to tick what
you built, and a reviewer's verdict brings it up first for what they confirmed.
See [Review, verdict and merge](/console/review-and-merge/).

## Discussing a card

The **Comments** tab of Activity is the discussion. The body says what was
decided; the discussion is the argument that got there. It is worth using
rather than a chat window because **agents read it**: a run on the card is
handed the discussion, and an audit that can see an idea was already talked out
stops proposing it again.

- Anyone who can read the project reads the discussion; commenting needs the
  **Edit cards** privilege.
- A comment written by an agent carries the [AI mark](#the-ai-mark), which says
  who wrote it.
- `R12` links a card and `@name` tells somebody on the project. Everyone who
  **Watches** the card is told as well.
- You can correct your own wording and the comment is marked as edited. Nobody
  can edit anybody else's, an administrator included. There is no delete.

When a discussion reaches a conclusion, put it in the body.

### History, and See more

**Activity** also keeps the card's **history**, one line for each thing that
happened to it. A line that has words behind it ends in **See more**, which
opens the text under the line (**See less** folds it). That covers:

- a Done or Not done verdict, with its note;
- a review or a comment on the branch;
- a decline, with its reason;
- a closed branch, with its reason;
- a Done-when tick, with its evidence or note.

A long note folds again behind **Read it all**. An approval reads *marked it
done*, and a sprint reads *added it to Core team · S7* or *took it out of Core
team · S7*.

## The AI mark

A small sparkle marks anything a session or an agent token wrote. What a person
wrote by hand has no mark. Hover or focus it to read who wrote it (*Planned by a
session · Claude Code · plan run*, or *Written through the token ‘laptop’*); a
session's sparkle is a link that opens that session. It sits on:

- the plan, and each Done-when tick an agent made;
- comments and history lines;
- review rows and the reviewer's report, and the review page's commits (see
  [Review, verdict and merge](/console/review-and-merge/#the-review-page));
- a branch's tile on the [Development board](/console/work/#development);
- the card's *filed by* line, and its tile on the Roadmap when an agent filed it.

Writes made through your personal agent token outside a cawdev session are
recorded too, since release R550. Rows from before that still read as the person.

## Moving a card

*Move to another project…* under the status chip needs the **Edit cards**
privilege on both projects, and is offered while there is still something to
move: not on a card that has landed or been declined, one with an open branch,
or one a run is working on. The card becomes a new one in the other project,
numbered there, with its title, body, kind, severity, priority, tags, dates,
estimate and plan. The original is **declined** with *Moved to SAAS-R5.* as the
reason, so the link survives and nobody files the idea again. Comments stay on
the original.
