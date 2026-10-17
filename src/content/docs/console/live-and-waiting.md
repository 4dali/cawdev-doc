---
title: Live sessions and Waiting on you
description: Every run running now, across projects, and the one page that holds everything waiting on you.
---

Two pages answer two different questions. **Live** asks *what is working right
now?* **Waiting on you** asks *what is stopped until I do something?* Both span
every project you can see, and both are reached from the top bar.

## Live

Open it from **Live** in the top bar (**See all live sessions**), or at `/live`.
A project's own **Live** page, reached from its Overview, is the same page with
that project fixed.

The head counts what is happening: working, asking you, queued, and stopped
when a run is. Each run is one row:

- its orb and a status chip;
- the project, and what the run is and where;
- the last thing it said, in mono, so you can tell whether to look without
  opening it.

The run that is **asking you** is the only amber row. It says the run stands
still until you answer, and **Answer…** takes you to the question. A queued
run says which gate refused it, and **Cancel** (asked twice) lets it go.

| Key | Does |
|---|---|
| `j` / `k` | Move between rows |
| `↵` | Watch the row you are on |
| `a` | Answer the first run that is asking you |
| `s` | Start a run |

On a window 1200px or wider, selecting a row opens its session beside the
list: the terminal, its working copy and a box to tell it something. Narrower
than that, a row opens the run's own page. The **Project** chip narrows the
list to one project. The page reads again every five seconds and stops while
the tab is hidden.

**Answer** is offered only to people who hold the **Run agents** privilege on
that project; a reader still sees the run and what it is doing. See [Team
access and privileges](/console/team-access/).

### History

Runs that are over are under **History** on the same page: every finished,
failed and cancelled run across the projects, newest first, narrowable to one
project and paged as far back as you care to go. Open one and you get what it
was asked, its whole terminal log, what it reported, the questions and the
answers, what it committed, and how it ended. Nothing is thrown away when a
run finishes. The full list, with tabs and filters, is the [Runs
page](/console/work/#runs).

## Waiting on you

Open it from the amber control in the top bar, or at `/inbox`. It has five
lists, always in this order, each with its count and a few words saying what it
is. A list with nothing in it is not drawn.

1. **Stops a run until you answer.** Questions, permission requests and plan
   gates in one list, the run that has waited longest first, so a new arrival
   always lands at the bottom and never pushes down the box you are typing in.
   Every row has the amber edge and the square corner.
2. **To review.** Finished work that needs a reader. *Mark done* and *Not
   done…* open the review, because a review is a diff and the verdict is not
   given from a list. See [Review, verdict and merge](/console/review-and-merge/).
3. **Finished for you.** Runs you started that ended: *3 findings to look at*
   for an audit, *4 cards to look at* for a scoping run, *Answered* for an ask.
   A row goes when you follow its link or press **Dismiss**. A run you
   cancelled or that failed does not put a row here.
4. **You asked someone.** Questions you handed over. A delegation nobody has
   picked up is still a stopped run, so it stays yours; **Answer it yourself**
   opens the panel in place.
5. **Someone asked you.** Your opinion, not your decision; **Say what you
   think**.

The top-bar control counts lists 1, 3 and 4. List 5 is not counted: somebody
wanting your opinion is not a stopped run and should not read like one, and a
review waits at no cost.

Each row is one line: what it is (*Question*, *Permission*, *Plan*, *Review*,
*Audit*), the project's key, the card, the stage and how long it has waited,
and then what is being asked. The thing to do is on the row, and nothing you
do there is a different act from the run page's.

The header has a segmented control, *All 5 · cawdev 3 · saasng 2*, with a
button for each project that has something here. Picking one narrows every
group to that project, and the selection is in the URL (`?project=`). The top
bar's own count does not move: it counts your stopped runs everywhere.

On a wide window, **Answer all with the first option** at the head of the first
list asks once, with the number, and answers every question that has options
with its first. **Select several** puts a checkbox on the permission rows and
one bar to allow them with a scope. Neither is the only way.

### Answering a question

A question goes to the person who started the run. They are the only one who
can answer it, plus anyone they pass it to, and only their Waiting on you shows
it. A colleague can open the run, read the question and say what they think.

A question is a panel with a square corner at its bottom left, the shape that
says a person is being asked. It shows the agent's options as rows numbered
from 1, and the last row is always **Write my own answer…**. One click on an
option is the whole answer. From the keyboard a number picks an option and
**Enter** answers; in the box, Enter answers and Shift+Enter starts a new line.
The run goes on at once. An answer reaches the agent immediately and cannot be
taken back, so there is no Undo.

When somebody else got there first, the panel folds to one line (*Bob answered:
JUnit only · 2m ago*).

The same panel is used on the run page, here, and in the home composer, so
they cannot disagree.

**A round of questions.** Some runs ask several things at once, such as a CTO
interview. They arrive as one row, with the questions numbered and a single
button that counts, *Send 2 of 3 answers*. It stays disabled until every
question is filled, because the run is waiting for all of them. *Answer this
one on its own, or pass it on…* under a question opens the ordinary panel.

### Passing a question on

**Pass on…** is one menu offering two different things. Choose one, optionally
say why you are asking, then pick the person:

- **Ask what they think.** Their opinion lands on the question where everybody
  can see it and travels with the answer. The run stays stopped and **you still
  answer**.
- **Hand it over.** It becomes theirs to answer, and the thread records them as
  the person who decided.

You can pass a question only to someone who could already have answered it. The
menu greys out anyone who cannot, with the reason beside them, usually that
they lack the **Run agents** privilege. Sharing never grants access. You can
only pass on a question that is yours.

When the person it is waiting on is not there, a project **owner** can **Take
over** a question from the run page. It stays the original owner's to answer
too; taking over adds somebody who can. It is recorded on the question.

Nothing sweeps a run that is waiting on you. A person may reasonably take a
day. What is swept is a run whose *machine* goes quiet for five minutes, which
fails with a reason saying so.
