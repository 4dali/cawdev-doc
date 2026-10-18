---
title: Administration
description: Users, Projects, Platform, Mail, Plugins, Notifications and Updates — the parts of cawdev that belong to the whole deployment, visible only to an administrator.
---

Seven sections behind `/admin`, reachable only from the account menu — there is
no row for it on any project's rail, because none of this is about a project.
The whole area sits behind an administrator guard, so being able to reach a
section at all *is* what marks it as administration.

It is drawn in the same frame as [Project settings](/console/project-settings/#the-layout)
and [Your settings](/console/your-account/): a menu on the left, one section at
a time in the pane beside it at `/admin/<section>`, and the section's name and a
sentence in the pane's head. The menu has three groups: **Users** and
**Projects**; then **Instance** (**Platform**, **Mail**, **Notifications**);
then **Software** (**Plugins**, **Updates**). On a phone the menu is a list of
its own, with a **‹ Administration** link back from a section. A section that
fails to load says so in a banner with **Try again**, and a table that has
loaded keeps its last good rows beside the error.

Saving works as it does in project settings. A **switch or a choice** (who may
create projects, every run names its machine) takes effect at once and a
message says so. A **field** (the minimum CLI version, the whole of **Mail**) is
kept until you press **Save settings** in the bar at the bottom, which counts
the changes and names the menus. A menu with changes shows a dot, you can look
at another menu meanwhile, and leaving Administration with changes asks first.

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

The version this instance runs, and when cawdev last looked for newer ones. It
looks by itself at most once an hour; **Check for updates** looks now and says
in a message whether a newer version exists. Pressing it again within a minute
returns the last answer (*Checked a moment ago*), so Docker Hub's and GitHub's
limits hold. The button is not drawn when checking is switched off
(`CAWDEV_UPDATE_CHECK=false`), and it waits while an update is under way.

**Update** installs the newest version through the updater sidecar, the one
process allowed to restart cawdev: it pulls the new images while the old ones
serve, stops the API, takes a database dump and starts the new version. The API
never holds the container socket itself. The History table lists updates and
restores together.

### Restore a previous version

**Restore a previous version** lists the database backups the updater holds, one
of which is taken before every update. Each row shows the version it is of, when
it was taken and which update it was taken for. **Restore v…** on a row asks
three times: a question, a warning, and then you type the version (`v1.2.0`)
exactly.

What a restore does, in order: the updater pulls that version while the current
one still serves, stops the API, takes a backup of the database **as it is now**
(the undo), loads the chosen backup and starts that version. If the restore
fails, or the version never answers, the undo backup goes back and the current
version is started again.

- **Everything written since that backup is lost**: projects, cards, runs, users,
  passwords, tokens and settings go back to how they were then.
- **Everybody is signed out**, you included, and signs in with the password they
  had at that time.
- **The undo.** The backup taken just before the restore appears in the same
  list, and restoring it undoes the restore. It is newer than the running
  version, and is offered the same way. The undo backup of the latest restore is
  never pruned.
- **Not offered** for a backup of the version running now, for one older than
  v1.0.12-beta (the first version that can record a restore; those are restored
  by hand), or while an update is under way. The row says why.

There is no code-only downgrade: an older API on a newer database would start,
because Flyway ignores migrations it does not know. A restore always brings the
data back with the code.

**The updater must be pulled once by hand.** Restore needs an updater from the
release that added it; an older one lists no backups. The updater does not update
itself, so on the host run:

```sh
docker compose pull updater && docker compose up -d updater
```

**How many backups are kept.** `CAWDEV_BACKUPS_KEEP` in the updater's `.env`
sets it; the default is 5.

**Restoring by hand.** For a backup older than v1.0.12-beta, or should a restore
itself fail, the backup files live in the updater's volume (named
`<compose project>_updater-state`, under `backups/`) as gzipped SQL. Stop the
API, empty the `public` schema, load the file into the database and start the API
again; the cawdev repository's `PRODUCTION-DEPLOYMENT.md` has the commands.
