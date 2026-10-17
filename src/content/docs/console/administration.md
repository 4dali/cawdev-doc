---
title: Administration
description: Users, Projects, Platform, Mail, Plugins, Notifications and Updates — the parts of cawdev that belong to the whole deployment, visible only to an administrator.
---

Seven sections behind `/admin`, reachable only from the account menu — there is
no row for it on any project's rail, because none of this is about a project.
The whole area sits behind an administrator guard, so being able to reach a
section at all *is* what marks it as administration.

<!-- WAITS: R523 -->
It is drawn in the same frame as [Project settings](/console/project-settings/#the-layout)
and [Your settings](/console/your-account/): a menu on the left, one section at
a time in the pane beside it at `/admin/<section>`, a heading and a sentence on
each. On a phone the menu is a list. A section that fails to load says so in a
banner with **Try again**, and a table that has loaded keeps its last good rows
beside the error. Until that layout ships, the same sections are one at a time
beside a plain section list, or a select on a phone.

| Section | Covers |
|---|---|
| **Users** | Accounts, roles and access |
| **Projects** | Every project, archived included, and the repairs only an administrator can make |
| **Platform** | Who may create projects and teams, and whether a run must name its machine |
| **Mail** | Where outgoing mail comes from, and a test that proves it |
| **Plugins** | What is installed into cawdev |
| **Notifications** | Send an announcement to everyone, and see who has seen it |
| **Updates** | The version running, what is newer, and installing it |

**Manage.** Rows of people, projects and plugins have one **Manage** button
that opens a dialog saying what each action does before you press it. On a
phone these tables are lists of two-line rows. Roles are **administrator** or
**user**, and the Projects table's people column is **People**.

## Users

Accounts across the whole platform and their roles. An administrator holds
nothing on a project they haven't been made a member of — administering the
platform is a platform-wide power, and it stops there on purpose. It does
**not** make you an owner of every project, and it does not let you read a
project's sessions or transcripts by default.

The same holds for **teams**: an administrator who is not in a team gets the
same "does not exist" as anyone else, and cannot see or change a team's
[access table](/console/team-access/). Archiving, deleting or managing the
people of a project is allowed to an administrator for that one action, without
becoming a member. Actions on a row: *Make administrator* / *Remove
administrator*, *Disable account* / *Enable account* (a disabled account's
sessions and tokens stop on its next request), *Reset password*, and **Create
user** (the password is shown exactly once, with **Copy password** and
**Close**). A **Sign in the terminal** button is how an administrator signs the
CLI in to this instance.

## Projects

Every project on the instance, including archived ones, with its owners. **Manage** opens a dialog: **Archive** acts at once; **Add an owner** and **Delete** open a panel that asks first. This is the one place a
project whose only owner has left is fixable at all, since a person locked
out of their own project has, by definition, nobody else who could reach it.

## Platform

A short list of switches for the whole deployment, saved the moment you
change them and confirmed with a snackbar:

- **Who may create projects** — Administrators only (the default) or any
  signed-in user, who then owns what they create. The same setting decides who
  may create [teams](/console/teams/). Opening this up should be a
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
otherwise leave you believing you got one. What a plugin installs arrives **off**, and there are no switches here: nothing installed is enabled
anywhere by the act of installing it; a project still turns each capability on
for itself under [Project settings](/console/project-settings/).

## Notifications

Compose an announcement to everyone on the instance, and see who's seen it —
distinct from **Waiting on you**, which is about questions a run raised, not
platform news. Confirmed with a snackbar.

## Updates

The version this instance is running, what has been published since, and a
button to install the newest. Installing goes through the updater sidecar, the
one process allowed to restart cawdev: it pulls the new images while the old
ones serve, stops the API, takes a database dump and starts the new version.
The API never holds the container socket itself.
