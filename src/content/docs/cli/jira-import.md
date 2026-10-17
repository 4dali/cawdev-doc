---
title: Importing from Jira
description: Copy a Jira Cloud project's issues, epics, sprints and comments into cawdev, repeatably, so a team can run both for a sprint before cutting over.
---

`tools/jira/import.mjs` copies a Jira Cloud project's issues, epics, sprints
and comments into a cawdev project. It can be run again and again without
making a second copy of anything, which is what lets a team run both systems
for a sprint before it stops using Jira.

The importer lives in the cawdev repository and is run from a checkout of it.
It is not part of the published `cawdev-cli` package.

## 1. Mint a token

A project **owner**, under **Your settings → Agent tokens**, mints a token
with the `roadmap:import` scope on the project. Nobody else can: the importer
writes in other people's names, with the times Jira recorded. The scope covers
nothing and nothing covers it, not even `roadmap:write`, so the grant has to be
asked for, and only an agent token can hold it. See [Setting up the MCP
server](/mcp/setup/).

## 2. Write the mapping

Copy `tools/jira/mapping.example.json` to `tools/jira/mapping.json` and edit
it. It is git-ignored because it holds Jira account ids. It maps:

- Jira status to cawdev status;
- issue type to a card or an issue;
- priority to priority;
- Jira account id to a cawdev username;
- a released fixVersion to a git tag.

Defaults cover the standard names. **`IN_DEVELOPMENT` is never a target**,
because that status means a cawdev branch with a run on it. *In Progress*
becomes `PLANNED` for a card and `CONFIRMED` for a bug. *Done* becomes
`MERGED` with `jira:PROJ-123` as the evidence, since no branch is demanded, and
a released fixVersion makes it `SHIPPED`. *Won't Do* and *Duplicate* become
`DECLINED`, with the reason naming the original.

## 3. Dry-run until nothing is unmapped

The Jira credentials come from the shell, never from `.env`:

```sh
export JIRA_URL=https://your-team.atlassian.net JIRA_EMAIL=you@example.com JIRA_TOKEN=…
export CAWDEV_URL=https://app.cawdev.com CAWDEV_TOKEN=cawd_…
node tools/jira/import.mjs my-project --jira-project PROJ --dry-run
```

It prints every issue with what it would become, and an **unmapped** column:

- a status nobody mapped;
- a person with no username (Jira Cloud often hides email, so the table prints
  the account id to put in `users`);
- a label that is not a valid tag;
- a node of rich text it cannot convert.

The server is asked too, with the real rules and nothing written, so a refusal
appears here and not halfway through the real run. The command exits non-zero
while anything is unmapped.

A person who is not on the project is not an error. What they wrote is credited
to whoever ran the import, under a first line saying *Originally by Jane Doe in
Jira (PROJ-7)*, and an unknown assignee leaves the card unassigned.

## 4. Run it

The same command without `--dry-run`. Epics go first, so their children are
filed under them.

| Flag | Does |
|---|---|
| `--jira-project KEY` | Which Jira project (required) |
| `--dry-run` | Print and ask the server, write nothing |
| `--mapping FILE` | A mapping other than `tools/jira/mapping.json` |
| `--since YYYY-MM-DD` | Only issues changed since then, for the nightly run |
| `--subtasks=cards` | A sub-task becomes a child card. The default, `checklist`, makes it a checklist line in its parent's body |
| `--into-nonempty` | Import into a project that already has cards, none from Jira. Without it that project is refused, since one rebuilt from `ROADMAP.md` would get every issue twice |
| `--team <team id>` | The team the Jira sprints open in. Sprints belong to teams, so this names one the project is shared with at writer level. Without it the project's one writer team is used, and a project shared with several refuses each sprint, naming them |

## 5. Run both for one sprint

Run again each night with `--since YYYY-MM-DD`. Jira is the source of truth
until the cutover:

- **An edit made in cawdev to a field the import carries (title, body, tags,
  priority, assignee, sprint) is overwritten by the next run.**
- Comments are only ever appended. A comment edited in Jira after its first
  import does not come across, and an imported comment cannot be edited in
  cawdev either.
- A card somebody has started coding in cawdev is never moved out of
  development by a run, and a card that has landed is never moved back. The run
  says so in its warnings.

## 6. Cut over

Make Jira read-only, run once more, and tell the team that cawdev finds a card
by its Jira key: typing `PROJ-123` in the search palette (⌘K) opens it.

There is no URL for a search result today, so an old `browse/PROJ-123` link
cannot be sent to the card itself. Send those links to the project, and the key
does the rest once someone is in:

```nginx
location ~ ^/browse/ { return 301 https://app.cawdev.com/projects/my-project; }
```

## Two things to know first

:::caution[A webhook may be flooded]
A project-scoped [webhook](/api/webhooks/) may get a `card.status` delivery per
imported card. Point it elsewhere before the first real run if that would be a
flood.
:::

- The **Insights** "filed" series counts imported cards on the day Jira filed
  them. That is the true date, and it makes the chart look as if the team had
  always used cawdev.
- Sprints keep Jira's name and close date. The date a sprint was *opened* is
  today's.
