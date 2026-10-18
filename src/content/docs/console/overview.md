---
title: Finding your way around
description: The rail, the top bar, Live and Waiting on you, the palette, and the composer that starts work without picking a page first.
---

Every page sits inside one shell: a top bar carrying where you are, and, once
you are inside a project, a rail down the left with every page that project
has. On a phone the rail becomes a bottom bar.

## The rail

The rail is a table, not a set of pages that happened to accumulate: every row
answers a different question, and the headings group rows that answer related
ones.

| Group | Rows | Badge |
|---|---|---|
| *(no heading)* | Overview | none |
| **Plan** | [Feedback](/console/feedback/) | Feedback: pieces still pending |
| **Work** | [Runs](/console/work/#runs), [Insights](/console/work/#insights) | Runs: running now |
| **Code** | [Code](/console/code/) (Quality, Git and Map are its tabs), [Changelog](/console/code/#changelog) | none |
| **Settings** | [Project settings](/console/project-settings/) | none |

There is no Roadmap or Development row inside a project: those two boards are
[across projects](/console/portfolio/), and the project's Overview links to
each, narrowed to the project. The rail across projects carries them, with the
untriaged issues on Roadmap and the reviews and stopped work waiting on you on
Development, added up over your projects. There is no Issues row either: issues
are cards on the Roadmap. Project settings is one row that stays lit on every
one of its sections.

A badge means exactly one of two things:

- **Attention** (amber): a number that falls to zero when someone deals with it,
  such as an untriaged issue or a branch waiting for your verdict.
- **Live** (violet): something running right now.

A badge never means "how many exist". Zero draws nothing. Every badge is read
from the project's own overview and links to the board it counts, so it can
never disagree with what you find there.

The rail changes shape with the window:

| Width | The rail |
|---|---|
| 1200px and wider | 224px, with the words. **Collapse** at its foot folds it to icons, and the browser remembers |
| 840 to 1199px | Always icons. Resting on one shows its name, and what its number means, as a tooltip |
| Narrower | No rail beside the page. The menu button (on a phone, **More** in the bottom bar) opens the same rows as a drawer |

## The top bar

A 48px bar, left to right:

- **The crumb**, `project / Page`. The name goes to that project's Overview;
  the arrow beside it is the **project switcher**, listing every project you
  are on and, last, **All projects** (see [All projects](/console/portfolio/)).
  On a phone only the arrow is left, as a project icon.
- **Search or jump to… ⌘K**, the [command palette](#the-command-palette).
- **Waiting on you**, the amber control. It counts the questions, permission
  requests and finished work waiting on you across every project, and the
  questions you have passed to a colleague. It opens over the page you are on
  as a side sheet (a full-height bottom sheet on a phone), with *Open as a
  page* in its head. At zero it goes quiet and reads *No questions waiting*. The
  route is still `/inbox`. Everything about it is on
  [Live sessions and Waiting on you](/console/live-and-waiting/).
- **Live**, the runs running right now in every project you can see, each with
  the tail of what its session is doing. The glyph moves, and its number counts
  what is running, only while something is. The menu ends with **See all live
  sessions**.
- **The bell**, your unread notifications in a panel, with a badge for what you
  have not read plus announcements you have not seen. A row shows who did what,
  to which card, in which project and how long ago, with an avatar for a person
  and the sparkle for a session or an agent token. Clicking a row marks it read
  and takes you to the thing itself. **Mark all read** clears the list and
  **Open notification centre** goes to the [page](/console/your-account/#the-bell-and-the-notification-centre).
  On a phone the bell is a plain link to that page.
- **The avatar**, your account menu: **Settings**, **Administration**
  (administrators only), **Documentation**, **Send feedback**, the theme (dark,
  light, or follow the system; the console is dark-first) and sign out.

Dates are written the British way on the 24-hour clock (*15 Oct, 15:04*), and
recent ones as *3h ago*, with the full time on hover.

### On a phone

The bottom bar is on every page you are signed in to, and always has five
items. **Waiting** comes first, with the number in amber. Inside a project the
rest are **Board** (the Roadmap narrowed to that project), **Runs** and
**Overview**, with Development in **More**; anywhere else they are
**Home**, **Live** and **Roadmap** across your projects. **More** is last and
opens the drawer.

## The command palette

**⌘K** (Ctrl+K off a Mac) from anywhere. It is one panel near the top of the
window, with results grouped under a heading and a count (*Pages 12*).

- It finds every project, every page of the project you are in, and its cards:
  `rdm` finds Roadmap, and a number finds the card.
- It finds team sprints by their ref (`S7`), and a card by its project-keyed
  ref (`SAAS-R12`) when you are on that project.
- With nothing typed it shows *Recently*; where one list mixes kinds, each row
  names what it is.
- ↑ and ↓ move, ↵ goes. Backspace, then Esc, steps back out of a scope; Esc
  again closes it.
- Inside a project, a search with no match offers to search every project.

## Starting work without a page

The floating **Start a run** button on every page, the key `c`, and
**⌘⇧↵** / **Ctrl+⇧+↵** open the composer from anywhere. The home page,
[All projects](/console/portfolio/), has no composer of its own. On a card the button opens the
start dialog for that card instead; see [A card](/console/card/#start-a-run).

The composer offers five things to do, as chips, one at a time (**⌘/** walks
them without leaving the prompt). What you type becomes a run with the matching
profile:

| Mode | What it does | Needs a card? |
|---|---|---|
| **Plan** | Plans a card, or, for something new, writes the card first and then plans it | Optional |
| **Ask about a card** | A question about one specific card | Required |
| **Audit** | Reads the code and proposes cards or issues you choose from | No |
| **Scope an idea** | An idea too big for one card: reads the code and cuts it into cards, in build order, that you accept one at a time | No |
| **Ask anything** | Anything about the projects you picked | No |

Choose the project first (one or several; the first is where the answer is
filed), then the card when the mode wants one. **⌘↵** sends; plain Enter is a
newline.

**More** is one pill holding the machine, the agent, the model and the
effort, and its label says where they stand in words (*More · dali-vm · Opus ·
High*). Nothing in it is required. See [Which agent does a
run](/cli/agents/) for the agents.

If the machine that would run it has uncommitted work, the composer says so
before anything starts: which files, on which machine. **Show changes**,
**Stash**, **Commit…** or **Start anyway**. None of the five modes cuts a
branch or writes code.

The run then goes on **in place**, under the composer: its state, *Open the
run*, its terminal, any question it stops to ask (the same panel as the run
page), and what it reported. A finished Ask, Audit or Plan offers **Ask a
follow-up…**, and the same run picks up with everything already said in it. A
plan that already ran for a card asks before it plans again.

Starting a coding run on a specific card happens from that card or the
Development board, not from the composer, because by then you already know
which branch you mean.

## The home page

Home reads top to bottom, in one column on a phone and in two on a wide window:

1. **Waiting on you**, with the question rows drawn as on its own page and the
   answer inline. When nothing waits the section is not there.
2. **Ask an agent**, the composer.
3. **Your projects**, one row each with the one that needs you first: its key,
   your role, *n waiting on you*, *n cards in play*, *n critical issues*, a
   running pulse and the quality gate (or *quiet*). **All projects on one
   board** opens [the board across projects](/console/portfolio/); **New
   project** is there only if your administrator lets you make one.

The aside is **Running now**, **Finished today** and **Your machines** (live or
away).

If you see no projects at all, you are not on any. cawdev answers 404 rather
than 403 for a project you cannot see, so a URL cannot be used to discover which
projects exist. Ask an owner to add you.

## The project overview

Opening a project shows its state, in the order your question comes in: does
anything need me, what is running, how are the numbers, how has the pace been.

- **Banners** come first and only when they apply: *No machine serves this
  project yet*, *This project has no brief yet*, the setup banner, and, while a
  CTO interview is running, a banner that says where its questions arrive.
- **Waiting on you** is this project's share: the first three open questions,
  answerable right there.
- **Live** is one thinking orb per run running on the project.
- **The project at a glance** is four strips and every number is a link into
  the page it counts: **Roadmap**, **Issues**, **Development**, and, for a
  project connected to SonarQube, **Code quality** (the gate first).
- **Activity** is one bar a day over the window you chose (**7 days / 14 days /
  30 days**): *Cards moved*, *Runs* and *Issues filed*, each with its total and
  the change against the window before.

The one filled button is **Start a run**. The strips refresh every ten seconds
and the orbs every five, and both rest while the tab is hidden.

## Project keys

Every project has a short key, such as `SAAS` or `CAWDEV`, read off its name
when it is made and changed by an owner in **Project settings → Project**. Two
projects both have an `R1`; across projects they read `SAAS-R1` and
`CAWDEV-R1`. A project's own pages keep the plain `R12`.
