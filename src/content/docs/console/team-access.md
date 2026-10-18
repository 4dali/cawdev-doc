---
title: Team access and privileges
description: Access to a project is a set of privileges. Teams can be given six of them; the rest stay with a project's owners.
---

Access to a project is a **set of privileges**, not a single role. *Reader*,
*Writer* and *Owner* are names for common sets; a team can also be given
exactly the set it needs.

## The privileges

| Privilege | Means | A team can be given it |
|---|---|---|
| **See** | Read cards, the changelog and the sessions they start; give feedback | Yes (always included) |
| **Edit cards** | File, edit and move cards and issues; the changelog; verdicts; versions | Yes |
| **Run agents** | Start runs and answer their questions; every act on a run | Yes |
| **Merge** | Land finished work | Yes |
| **Release** | Release merged cards; set a sprint's branch | Yes |
| **Manage settings** | Change the project's settings, not its people | Yes |
| Manage people, archive and delete; read other people's sessions; import | | **No** — a project's direct owners only |

### Presets

| Name | Is |
|---|---|
| **Reader** | See |
| **Writer** | See, Edit cards, Run agents — exactly the old writer: no merge, no release |
| **Owner** | Everything; only through a direct membership |
| **Custom** | Any shareable set that includes See |

## Where your access comes from

Three sources add up:

1. your own membership of the project;
2. each team share that reaches you;
3. an owner's **All my projects, including new ones**.

The strongest of them counts, and it is worked out at every request, so leaving
a team or stopping a share takes effect on your next click. An administrator
holds nothing in a project they were not given.

### All my projects

An owner can give a team access to **every project they own now and any they
create later**, in one switch, with nothing copied. A few rules:

- One such grant per owner per team.
- It is **paused** while its owner is out of the team or disabled, and returns
  when they do. Leaving a team is never refused because of it.
- A project drops out when its owner stops owning it.
- It cannot be created for an archived team.
- For one project and one team, **the project's own row replaces the
  all-projects grant** — narrower, wider, or *No access here*.
- Turning it off, or excluding a project, is refused while that project's cards
  sit in the team's open sprints.

## The Projects table

On a team's page (`/teams/<id>`), the last block of the main column is
**Projects**, with the line *What {team}'s people can do on each project you own.
Changes wait until you save.* It replaces the old team-side Share button and
list.

- The top row, **All my projects, including new ones** ("Every project you own
  now, and each one you create later."), is a checkbox. When on, a picker at the
  right sets **Reader**, **Writer** or **Custom**. It appears only for a live
  team and only if you directly own a project.
- Other owners' grants are shown to you read-only: "Sam's projects · Writer", or
  "Paused: Sam is no longer in Core team".
- Below, one row per project: **Project** · **Access** (a checkbox) ·
  **Privileges** (the picker; *Custom* shows six checkboxes with *See* locked).
  Each row says where it stands:

| State | Means |
|---|---|
| Follows all my projects | Covered by your all-projects grant |
| Its own access | A share of its own that replaces the grant |
| No access here | Excluded from the grant |
| Shared by {name} | Another owner's share; read-only to you |
| Through {name}'s all projects | Another owner's grant; read-only to you |
| Not shared | No access |

  A row's menu offers **Follow all my projects** when it has its own access or
  exclusion.
- A changed row gets a rule on its left edge. A single save bar reads
  **{n} changes not saved · Discard · Save access**; saving is all or nothing.
- A refusal names its row, for example *Cards of {project} are in a sprint of
  {team}. Take them out before it loses access.*, and the bar says *Access was
  not saved*.
- Archived team: no all-projects row and the controls are disabled. A project
  you do not own is read-only; with no projects you see *You own no project
  yet.*
- On a phone each row is name and state on the left, the checkbox on the right
  and the picker below, full width.

The same set can also be changed per project from
[Project settings → People](/console/project-settings/#people).

## What a refusal says

A project you cannot see is a plain 404. A project you can see but lack a
privilege on is a 403 that names it: *This needs {privilege} on {project}; you can
{list}.* The console hides or disables what the API would refuse.

Merge, Release and the settings sections are offered by the privilege each
needs (*Merge*, *Release*, *Manage settings*), not to owners only.

## Tokens follow privileges

An agent or API token never holds more than its minter. Each scope maps to a
privilege, and is checked against the owner's privileges **at every call**:

| Privilege | Scopes it allows |
|---|---|
| **See** | every `:read` scope, `backlog:write`, `cards:read` |
| **Edit cards** | `roadmap:write`, `changelog:write`, `cards:file` |
| **Run agents** | `runner:operate`, `agent:report`, `agent:ask` |
| Owner only | `roadmap:import` |

A departed member's tokens die with their access. See
[Setting up MCP](/mcp/setup/) and [Your settings](/console/your-account/#agent-tokens).

## For integrators

- `GET /api/teams/{id}/access` returns the matrix; `PATCH` saves a change, all or
  nothing. Members of the team only, and session only — an agent token cannot
  reach it.
- `PUT /api/projects/{slug}/teams/{teamId}` takes `{privileges: […]}` (`{role}`
  is still accepted) or `{excluded: true}`.

The full shapes are in the API contract, `openapi.yaml`, in the cawdev
repository.
