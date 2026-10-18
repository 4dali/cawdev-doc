---
title: Project settings
description: One menu, one pane — how a project's runs behave, who is on it, and which teams reach it.
---

Project settings are where a project's behaviour is decided: what a run does
and in what order, what happens when it finishes, what agents may do without
asking, and who can see the project. Open them from **Project settings** in the
rail; the page lives at `/projects/<slug>/settings`, and every section has its
own address beneath it (`…/settings/rules`, `…/settings/people`).

## The layout

<!-- WAITS: R473 -->
Two columns. The **menu** is on the left and the **pane** beside it shows one
section only: choosing a menu replaces the pane, nothing else is on the page
and nothing scrolls past it. The first group holds the core sections; a second
group, headed **Advanced**, holds the rest in the same list. Because every
section has its own URL, a link (or the command palette, ⌘K) lands on exactly
the section you meant. Each pane starts with its name and one sentence saying
what it is for; many add a **Learn more** link to this page.

- **Unsaved edits.** A section with edits you have not saved gets an amber dot
  in the menu. The dots stay when you move to another section, and the edits
  with them.
- **On a phone** the menu is a list screen — a row per section, with a chevron
  and the dot — and a row opens its pane with a **‹ Project settings** link
  back.
- **Leaving.** Closing the page, or going somewhere that is not another
  settings section, while edits are pending asks first: *Leave without
  saving?* — **Stay** or **Leave without saving**. Leaving puts the edits back.
- Old addresses (`/rules`, `/versions`, `/members`, `/advanced/skills`,
  `/playbook`, `/setup?step=machine`) still work and land on the section they
  became.

Before R473 the core sections stacked on one scrolling page and each Advanced
section stood alone; if your instance has not yet been upgraded to the
release that carries the new layout, that is what you will see, with the same
sections and the same words.

### Saving

A dark bar at the foot of the pane reads **n changes not saved · Discard ·
Save settings**; on a phone it sits above the bottom bar. It covers the text
fields: the project's name and repository, the SonarQube connection, the
release procedure. A refusal is written under the field it is about.

Switches and selects do not wait for the bar. They act at once and say so in a
snackbar ("Keep a brief turned off"), and so do archiving and rotating a secret.

### Who may change what

A person's access to a project is a set of [privileges](/console/team-access/):
*See*, *Edit cards*, *Run agents*, *Merge*, *Release* and *Manage settings*, plus
the ones that stay with direct owners. Changing these settings needs **Manage
settings**. Who is on the project, sharing it with a team, archiving and
deleting it stay with the project's direct owners. Everybody else reads the
same sections as text, with a line saying so.

The API has checked privileges this way since R511. <!-- WAITS: R519 --> The
console still offers settings to owners only until it catches up; a person who
holds *Manage settings* through a role other than owner may see switches
disabled that the API would accept.

## Core sections

### Project

What the project is: name, repository URL, git host (GitHub or GitLab),
default branch, default agent, **key** (the prefix in `SAAS-R12`) and the slug,
which is permanent.

**Git events** shows the webhook URL and the project's secret. Paste both into
the repository's webhook settings and cawdev notices a merge that happened
with no runner involved; see [Git events](/api/git-events/). Generating or
rotating the secret is a project owner's act, and *Rotate secret* asks first.

Below that: **Archive**, and the **Danger zone** where an owner deletes the
project.

### Stages

What a run does, in order. A stage is a row: its name, an **On** switch, a
**Gate** switch (a gate stops the run inside the stage and waits for you), and
the **weight** (fast, balanced, heavy, max — how hard the agent thinks, shown
with the model it resolves to). A stage that is off is dimmed, not hidden.

Between the stages are the **hand-offs**: *Plan a card as soon as it is
created*, *Start building as soon as a plan is written*, and under **Issues**,
confirm an issue as soon as it is filed and fix one as soon as it is
confirmed. A hand-off is manual until you turn it on, so nothing starts by
itself on a project nobody configured. The plan itself lives on the card; a
card goes through three steps — someone writes it down, a run plans it, a run
builds it — and planning and building are separate runs, so thinking about one
card never blocks building another.

The shield appears here as one read-only row pointing at
[Permissions](#permissions), where its switches are.

### Rules

Two things that are both, at heart, permissions: what happens when a run
**finishes**, and where **new cards land**.

**When a run finishes** — five switches, every one off until an owner turns it
on, every one describing what the *runner on your machine* does. cawdev holds no
credential for your git host and never will:

| Switch | Does |
|---|---|
| **Push the branch** | Pushed as soon as the run ends. Nothing merged, nobody asked. |
| **Open a pull request** | Through the runner's own `gh` or `glab`. Implies the push. A person still merges it. |
| **Require a review** | Every finished run waits on **Waiting on you** until approved or sent back. Off, a finished run marks itself Done and nobody is asked. |
| **Merge it. Nobody reads the diff.** | The one whose consequence nothing you click afterwards undoes. Cannot be on together with *Require a review*. |
| **A resolved conflict lands by itself** | After an agent resolves a merge conflict, the merge completes without asking again. |

The last two carry the word **Risky**. Switching one on moves what it needs
(turning on the merge turns on the push and the pull request and turns off the
review) and the snackbar names everything that moved.

**Where new cards land.** Three doors, each *On the board* or *In the backlog*:

| Door | Default |
|---|---|
| Written in the console, by a person or by a plan run asked for one, or accepted from a run's proposal | On the board |
| Filed by an agent on its own | In the backlog |
| Accepted from feedback, including through the [Integration API](/api/integration/) | In the backlog |

plus **Issues use the backlog**, which says whether a filed issue waits in
Backlog or lands as New. See [The Roadmap](/console/roadmap/).

### Reviewers

Who reads finished work before a person decides. The **reviewer agent** is a
switch: it reads each branch as soon as it is waiting to be read and files what
it finds as comments; it does not decide. Whether a review is required is shown
here and changed in [Rules](#rules). There is no list of reviewers to add to: a
review goes to everybody who can see the project.

### Permissions

**What agents may run without asking** — standing tool rules in Claude Code's
own pattern syntax (`Bash(mvn *)`), because that is literally what the runner
hands the CLI. Each rule shows who granted it, when and why, with *Withdraw
rule*; withdrawn rules stay listed. A run that needs something outside the list
stops and asks a person rather than being silently denied: nothing here is a
wall, only a shortcut past a question that would otherwise be asked every time.

**When nobody answers.** How long a stopped run waits before no answer counts
as a no — 15 minutes by default, up to a day, or never. An expired request can
still be allowed from the run page.

**The shield** — two switches, both on unless you turn them off:

- **Keep a credential out of a run's log.** A run that greps a config or cats a
  `.env` puts a live token where everyone with read access can see it. Caught
  by shape, not by a label beside it — most credentials turn up unlabelled, in
  URLs and stack traces.
- **Ask before something irreversible** — `rm -rf`, a force push, a hard reset,
  `DROP TABLE`. The list is short on purpose: each is a command someone runs
  legitimately most weeks, which is why it is worth a question at three in the
  morning.

Below both, **where the work may happen**: path patterns relative to the
checkout, one per line, empty for the whole repository.

### Brief

What every run started here is told first: what the project is for, what must
never happen to it, how work is done. A switch, *This project keeps a brief*,
and the **CTO interview** that writes it. A hand-written `docs/brief/` in the
repository does the same job.

### People

Who is on the project, what each of them may do, and the teams it is shared
with. A project is **owned by people**; a team can be given access but never
ownership.

**Members.** Each row leads with the person's *access*: **Owner**, **Reader**,
**Writer**, or **Custom: see, edit cards, merge**. Beneath it, muted, comes where
it comes from — *directly*, *via Core team*, *via Core team (dali's all projects)*
or *directly · via Core team*. Only a *direct* row has a role select and a
**Remove**; someone here through a team is the team's doing, so stop the share
or ask the team's owner to take them out. See
[Team access and privileges](/console/team-access/) for how the sources add up.

**Teams it is shared with.** One row per team, as `{access} · {source}`:

| Row says | Means |
|---|---|
| Writer · its own access · shared by dali · 12 Oct | A share made for this project |
| Writer · through dali's all projects | Covered by an owner's [all-projects grant](/console/team-access/#all-my-projects) |
| No access here · switched off for this project | The grant is excluded for this project |

<!-- WAITS: R516 -->
An owner's row menu offers, by kind of row: **Change…** and **Stop sharing…**
(a share); **Give it its own access…** and **Switch off for this project** (an
all-projects grant); **Change…** and **Follow all projects** (an exclusion).
The quick ones say what they did in a snackbar with **Undo**. **Share with a
team…** opens *Share {project} with a team*: pick the team, then the access —
**Reader**, **Writer** (the default) or **Custom** with six checkboxes, *See*
always on — and press **Share project**. A refusal is a sentence in the
dialog. **Stop sharing** is refused while the team's open sprints hold this
project's cards: take them out of the sprint first.

An owner shares only with a live team they belong to. The team's own page can
do the same for every project at once; see
[team access](/console/team-access/#the-projects-table).

## Advanced sections

### Experts

Specialists a run can delegate to — a reviewer, an architect, a build-error
resolver. The owner attaches each to the **actions** it should serve; a run is
handed the experts for its own action and no others. **Require it** buys one
nudge, never a refusal: if a stage finishes without delegating to a required
expert, the run is told once and asked again. Experts arrive with a
[plugin](/console/administration/#plugins); with none installed the section
says so.

### Skills

Instructions a run reaches for when they are relevant — how this team writes
migrations, what an accessible component looks like here. A skill executes
nothing; it is context. Grouped by a free-text category.

### MCP servers

Tools a run can call that it would otherwise not know existed — a command line
that runs on the machine holding your repository, shipped by cawdev and not
addable from here: a row is code someone reviewed, not something typed into a
form.

:::caution[Turning one on is not a grant]
The machine running the run has the last word — a runner only attaches servers
named in its own config — and the run's first call still stops and asks you,
unless a [standing rule](#permissions) already covers the whole server.
:::

### Machines

Which of your machines serve this project and whether each is up. When none
does, the two commands for a machine that has never run cawdev and the config
block for one that has. Links to your own
[Machines](/console/your-account/#machines).

### Versions

The release procedure above the versions table: which files a release run may
write and which `node` commands regenerate the [exports](/console/exports/). A
version (`v1.2`) is defined here and nowhere else: a card's **Version**, the
release dialog and an agent's `targetVersion` all pick from this list. Text
fields on this section go through the save bar.

### Quality

The SonarQube connection: server URL, token (write-only — once saved it is never
shown again), project key, who filed findings are assigned to, whether
analyses cover branches, and **Prove it**, which tests the connection. Text
fields go through the save bar.

### Instincts

Rules a run is told before it starts — "never edit the generated exports",
"migrations are Flyway only". A rule with no named intents is said to every
run; one with intents is said only when the opening prompt looks like that kind
of work. **Try it** shows what a prompt you type would be told. This is half the
picture: a file called `.ai-config.md` at your repository's root is read by the
runner directly and merged with these. Neither is copied into the other, so
editing the file is enough on its own.

### Macros

One word that starts a run the way you prepared it: it gathers context, asks
every expert that applies and returns one answer. Macros are shipped, never
written here; a switch turns one on for the project, and **Read it** shows
exactly what the run would be told.

### Memory

What runs have left each other, per branch and append-only: what was tried,
what was rejected and why. The next run on a branch is handed them. Anybody who
can see the project reads them.

If you may edit cards, **Leave a note for the next session** (or **Leave a note
on this branch** on a row) opens a branch field and a markdown editor; **Save
note** appends it like a run's and says *Note saved for `<branch>`*. A note is
never edited: correct it with a newer one. Whether runs write one themselves is
the *Memory* stage under [Stages](#stages).
