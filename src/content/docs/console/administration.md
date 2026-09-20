---
title: Administration
description: Users, Projects, Platform, Mail, Plugins and Notifications — the parts of cawdev that belong to the whole deployment, visible only to an administrator.
---

Six sections behind `/admin`, reachable only from the account menu — there's
no row for it on any project's rail, because none of this is about a project.
The whole area sits behind an administrator guard, so being able to reach a
section at all *is* what marks it as administration; nothing here needs a
second, per-page check.

| Section | Covers |
|---|---|
| **Users** | Accounts, roles and access |
| **Projects** | Every project, archived included, and the repairs only an administrator can make |
| **Platform** | Who may create projects, and whether a run must name its machine |
| **Mail** | Where outgoing mail comes from, and a test that proves it |
| **Plugins** | What's installed into cawdev |
| **Notifications** | Send an announcement to everyone, and see who's seen it |

## Users

Accounts across the whole platform and their roles. An administrator holds
nothing on a project they haven't been made a member of — administering the
platform is a platform-wide power, and it stops there on purpose. It does
**not** make you an owner of every project, and it does not let you read a
project's sessions or transcripts by default.

## Projects

Every project on the instance, including archived ones — the one place a
project whose only owner has left is fixable at all, since a person locked
out of their own project has, by definition, nobody else who could reach it.

## Platform

A short list of switches for the whole deployment, saved the moment you
change them:

- **Who may create projects** — Administrators only (the default) or any
  signed-in user, who then owns what they create. Opening this up should be a
  decision made on purpose, which is why it isn't the default.
- **Every run names its machine** — off by default, which is right for a
  one-person, one-laptop deployment where there's nothing to choose. Turn it
  on once several people share runners, so a run must say which machine it
  will use rather than any of them silently claiming it.
- **Minimum CLI version** — refuse a runner that's fallen too far behind.

## Mail

Where the platform's outgoing mail is sent from (invitations, notifications),
and a button that sends a real test message so you find out it's broken here
rather than the first time it matters.

## Plugins

cawdev's plugin marketplace: a git repository, cloned at a **pinned commit**
so "main installed twice" can never mean two different sets of files. Only
`agents/*.md` (expert agents) and `skills/*/SKILL.md` (skills) are installed
from it — anything else in the repository is refused, and the page **says so
plainly**, because a plugin whose README advertises an MCP server would
otherwise leave you believing you got one. Nothing installed here is enabled
anywhere by the act of installing it; a project still turns each capability on
for itself under [Project settings](/console/project-settings/).

## Notifications

Compose an announcement to everyone on the instance, and see who's seen it —
distinct from the per-project Inbox, which is about questions a session
raised, not platform news.
