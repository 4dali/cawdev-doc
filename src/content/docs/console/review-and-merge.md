---
title: Review, verdict and merge
description: Asking an agent to read a branch, giving the verdict, merging, resolving a conflict, and landing a sprint's branch.
---

A branch on the [Development board](/console/work/#development) moves from
Review to Done by a person's word, and from Done to Merged by a merge that a
machine of yours carries out. This page is that path.

## Review

A card in **Review** carries **Ask an agent**. It starts a run that reads the
branch against what the card asked for and files what it found. It writes
nothing, not the code and not the card's status, because Done is the reviewer's
word and the one column no machine can supply. It asks you for nothing either:
the model is whatever the card or your account defaults to, and it runs on the
machine already holding that branch's checkout, because that is the only place
the diff exists. The button is off while anything else is running on the branch.

### The review page

A branch's review is a page of its own, at *Development › R318*
(`/projects/<slug>/development/review/<itemId>`). It is reached from **Open
review** on the run bar and on the tile (**See the review** once it is decided),
and from the *To review* list on [Waiting on you](/console/live-and-waiting/).

The title is the branch's card with the Review chip, and **Open PR #531** is at
the top right when the branch has a pull request. Under the run bar it has two
columns: the verdict on one side (the evidence, the buttons, and **Done when**
as a fold) and the reviewer's report with the commits as rows on the other. On a
phone it is one column and the verdict comes first. It draws every state:
waiting for you, *Reading*, decided by you, decided by somebody else, and
*Finished. This project does not require a review.*

### The verdict

When a run's review is waiting, the panel asks **Is this done?** with the
evidence in front of you: Done when *n of m*, the tests (the test stage's state
and the first line of its report; there is no test count), the commits and the
pull request, the quality gate, and the project's rules. **See the diff** opens
the pull request or the commits.

| Button | Does |
|---|---|
| **Mark done** | Records the verdict. Under the buttons one sentence says what it triggers: *Done merges and deletes the branch* in a project that merges by itself, *Done opens a pull request* where it opens one, otherwise *Done records it; merging is yours* |
| **Not done…** | Opens a note in place, *Not done because*, which is **required**: **Send it back** stays disabled while it is empty |

**Not done starts a fix run.** Send it back records the verdict, then starts a
coding run on the same branch with your note, on the machine the branch last
used (*R318 sent back · a fix run is queued on dali-vm*, with **Watch it**). The
note is what the next run is handed *instead of* the card's original text. If
the run could not be started, the message says why and offers **Start the fix
run…**; the verdict stands either way.

A verdict cannot be undone. It folds to one line (*Done · marked done by you ·
just now*), and if somebody else got there first the panel says *Moez marked
this done 3m ago. Nothing to decide.*

From **Not done** there are two explicit ways out: **Fix it** starts a run on the
same branch carrying the note, and **Close** ends the work and asks where its
cards go, back to **Considering** (the approach needs rethinking) or **Declined**
(the idea is not going ahead, and the reason you give is the decline's own).
Neither is Planned.

### The Done-when popup

The card's [Done-when checklist](/console/card/#the-plan-and-done-when) comes up
at both moments. When you move a branch to Review yourself, a popup shows the
checklist alone for you to tick what you **built**. When a reviewer presses Done
or Not done, it comes first, for them to tick what they **confirmed**, and its
button carries on to the verdict. Every tick is saved as it is made, so Cancel
keeps the ticks and drops only the verdict. A card with no checklist moves with
no popup.

## Merging

**Merge** is on a tile in Done. cawdev holds no git credentials, so the merge
runs on a machine of yours: it runs `gh pr merge --squash --delete-branch` (or
the `glab` equivalent for GitLab, see [Git hosts](/cli/git-hosts/)). When the
machine reports the pull request landed, every card on the branch moves to
**Merged** naming it, and the work item closes behind them. The card moves
minutes later, not instantly.

Tick several Done tiles and the bar at the bottom merges them in one press, with
one answer per branch; a branch with no pull request comes back refused by name
rather than taking the others down.

**One branch at a time per project.** Whatever is merging, a plain merge or an
agent's, holds the project's one slot until it is over, and everything else
waits in the order it was asked. Pressing **Merge** on a second card is accepted,
not refused: it reads *Queued to merge, behind `branch`*, and runs by itself
when the first is over. A landing that `gh` refuses ends its train and says so
on the card in `gh`'s words.

**A merge outside cawdev is noticed.** A pull request merged on GitHub, or a
`git merge` by hand, is seen the next time a machine of yours reads the branch,
or the moment GitHub or GitLab tells cawdev when [git
events](/api/git-events/) are set up. Every card still In development on it
moves to Merged, and the card's discussion says *Merged outside cawdev*. A card
you had already moved is left where you put it.

### Merge with an agent

When a merge fails on a conflict, the card shows what the machine said and grows
**Merge with an agent**. That starts one run that merges your default branch
*into* the branch and resolves the conflict, and nothing else. It can write only
the files git put conflict markers in, it has no `gh`, and it is told to stop
and say so rather than guess. It is offered on a conflict and nowhere else: not
for a missing pull request, a permission refusal or an unreachable host, because
an agent cannot fix those.

**A resolved conflict lands by itself** is a project rule, **off** by default
(see [Project settings → Rules](/console/project-settings/#rules)). Off, the run
pushes the branch and asks you on Waiting on you what it chose; answering lands
it. On, the pull request merges the moment the run pushes. Either way the
resolution is written onto the card: which files conflicted, and what was chosen
in each.

A batch of ticked branches merges in order, one at a time, and stops at the
first it cannot resolve. What landed, what was refused and what was never
reached are three different things, and the board says them separately. Before
you press it, the bar tells you which of the ticked branches are planned against
each other's files.

## Sprint branches

A team sprint may have a branch of its own in each project it touches, such as
`s1-notifications`. When a project has one, that project's cards of the sprint
land there first:

- a card started in that sprint is **cut from** the sprint's branch;
- its pull request **targets** it;
- **Merge** lands it into the sprint's branch, and the card reads Merged when it
  has landed *there*, not on `main`.

The tile says so with `→ s1-notifications` after the branch name. A card with no
sprint, a sprint with no branch, and a card started before its sprint's branch
was set are cut from the default and land there, as before. The base is copied
onto the branch's work item when it is opened, so setting a sprint's branch
tomorrow moves nothing started today. A branch has exactly one base: a card of
another sprint, or of none, cannot join it.

The branch is named in the **Branch** panel under each project's cards on the
team sprint page (see [Teams and sprints](/console/teams/)), by someone who
holds **Release** on that project. Because cawdev cannot put a branch on origin
itself, it asks a machine of yours to cut it from the default's tip, and the
sprint says *branch not on origin yet* until that machine answers. A card of the
sprint cannot be started until it has.

### Landing the sprint

Once the branch is on origin, the sprint's branch is a **tile of its own** in
Done, titled *S1 Notifications · the sprint branch*, with one line instead of a
card list: *7 of 9 cards landed on it, 2 branches still open*. No run is ever
started on it, and nothing moves it by hand.

The path a change takes is **card branch → sprint branch → `main`**. The first
hop squashes, as every card does. The second is **Merge** on the sprint's tile,
or **Land the sprint branch** in the Branch panel, which is the same press. It
is refused, naming the branches, while any card of the sprint is still on an open
branch. When taken, a machine opens the pull request from the sprint's branch to
`main` (an existing one is found, not duplicated) and merges it with a **merge
commit**, not a squash, so the card squashes stay separate commits on `main`.

Landing moves no card, because they were Merged already. The sprint records when
and where it landed, its tile closes, and each card gets a comment: *S1's branch
landed on main in #N*.

A card's Merged means landed on its base. A **release** reads the other meaning:
a Merged card of a sprint whose branch has not landed on `main` is not on `main`,
and releasing it is refused until the sprint's branch has landed. A card that
started before its sprint had a branch landed on `main` directly and releases
normally.

## Who may

| Act | Needs |
|---|---|
| Give a verdict, **Close**, move a tile | **Edit cards** |
| **Ask an agent**, **Fix it** | **Run agents** |
| **Merge**, **Merge with an agent**, **Land the sprint branch** | **Merge** |
| Release merged cards, name a sprint's branch | **Release** |

The API enforces these, and the console follows: a control you lack is not drawn,
and a line says why where you would otherwise wonder. See [Team access and
privileges](/console/team-access/).
