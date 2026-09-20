---
title: Project settings
description: General, Rules, Playbook, Expert agents, Skills, MCP servers, Collaborators — how a project's sessions behave, and who can see it.
---

Seven pages, and each answers a distinct question — a session's *permissions*
sit beside what happens when it finishes, a session's *standing behaviour*
sits on its own page, and what it may *delegate to* or *call* are two more
questions again.

## General

What this project is and where its code lives: the repository URL, and the
brief a [CTO Interview](#the-brief) or a hand-written `docs/brief/` produces.
Also where the project is archived, or — for an owner — deleted.

## Rules

Two things that are both, at heart, permissions, and deliberately kept on one
page rather than split: what an agent may **run**, and what happens when it
**finishes**.

**When a run finishes** — four switches, every one off by default, and every
one describing what the *runner on your own machine* does. cawdev holds no
credential for your git host and never will:

| Switch | Does |
|---|---|
| **Push the branch** | Pushed as soon as the run ends. Nothing merged, nobody asked. |
| **Open a pull request** | Through the runner's own `gh`. Implies the push. A person still merges it. |
| **Require a review** | Every finished run waits in everyone's inbox until approved or sent back; its branch sits in Review until then. Off, a finished run marks itself Done and nobody is asked. |
| **Auto-merge** | The one whose consequence can't be undone by clicking something afterward — mutually exclusive with Require a review, so the two switches never disagree about whether a person reads the work. |

**What agents may run without asking** — standing tool rules, in Claude Code's
own pattern syntax (`Bash(mvn *)`), because that's literally what the runner
hands the CLI. A session that needs something outside this list stops and
asks a person rather than being silently denied — nothing here is a wall, only
a shortcut past a question that would otherwise be asked every time.

## Playbook

How this project's sessions work: what they're told, what they do and in what
order, what stops them, and what they remember. Four sections.

**The lifecycle.** A card goes through three steps: someone **writes it
down**, a session **plans it**, and a session **builds it** — planning and
building are separate runs, so thinking about one card never blocks building
another, and a plan lives on the card, which is why cancelling a run no longer
throws it away. Each hand-off between steps is yours to set: **automatic**, or
**gated**, where the session stops and waits for you the same way a permission
request does. An issue's equivalent lifecycle is shorter — a confirm session
walks the planning stages, a fix session walks the build stages, and a fix
waiting to be read shows up under Review.

**Instincts.** Rules a session is told *before it starts* — "never edit the
generated exports", "migrations are Flyway only." A rule with no named intents
is said to every session; one with intents is said only when the opening
prompt looks like that kind of work. This is only half the picture: a file
called `.ai-config.md` at your repository's root is read by the runner
directly and merged with these — neither is copied into the other, so editing
the file is enough on its own.

**The shield.** Two things your Rules page can't see: what comes *back* from a
call, and where work may happen. Both on by default.

- **Stop a credential reaching the transcript** — a session that greps a
  config or cats a `.env` puts a live token where everyone with read access
  can see it. Caught structurally, not by looking for a label next to it —
  most credentials show up unlabelled, in URLs and stack traces.
- **Ask before something irreversible** — `rm -rf`, a force push, a hard
  reset, `DROP TABLE`. The list is short on purpose: every one of these is a
  command someone runs legitimately most weeks, which is exactly why it's
  worth a question at three in the morning.

Below both, **where the work may happen** — path patterns relative to the
checkout, empty for the whole repository.

**Macros.** One word that gathers context, asks every expert agent that
applies, and returns one answer. The fan-out costs nothing extra: the experts
run *inside* the session rather than as sessions of their own, so there's no
cap on how many a macro can call.

## Expert agents

Specialists a session can delegate to — a reviewer, an architect, a
build-error resolver. Each one declares which of cawdev's actions it serves,
and a session is handed only the experts for *its own* action: a code reviewer
in an Ask session is context nobody asked for. Two actions read a little wider
on purpose — a Plan session is also handed Roadmap's and Code's experts, and a
Release session Review's.

**Require it** buys one nudge, never a refusal: if a stage finishes without
delegating to a required expert, the session is told once and asked again.
Only stage-walking sessions (planning and coding) have an ending to nudge at —
an Ask, Roadmap or Audit session stays open for a person, so there the setting
is wording in the prompt rather than a check.

## Skills

Instructions a session reaches for when they're relevant — how this team
writes migrations, what an accessible component looks like here, how to
design an endpoint. A skill executes nothing; it's context. What a session can
*run* is [MCP servers](#mcp-servers), next door. Grouped by a free-text
category since a skill can genuinely belong to several.

## MCP servers

Tools a session can call that it would otherwise have no idea existed — a
command line that runs on the machine holding your repository, seeded by
cawdev and not addable from here: a row is code someone reviewed, not
something typed into a form.

:::caution[Turning one on is not a grant]
The machine running the session has the last word — a runner only attaches
servers named in its own config — and the session's first call still stops
and asks you, unless a [standing rule](#rules) already covers the whole
server.
:::

## Collaborators

Who can see this project, and who can change it — members and their roles.
`ProjectAccess` evaluates every check against someone's *current* membership,
so removing somebody here takes effect immediately, including on any token
they'd minted.
