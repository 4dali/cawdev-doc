---
title: Accounts and roles
description: Creating accounts, platform administrators, project roles, and who may create projects.
sidebar:
  order: 2
---

## Accounts

**Users → Create user.** There is no signup and no password-reset-by-email: you
set a password and hand it over.

:::caution[Shown exactly once]
The password appears once, when it is created or reset. It cannot be read back.
:::

**Disabling an account ends its live sessions on the next request**, not on the
next login — and its tokens stop working at the same moment.

## Two levels of role

**Platform-wide**, a user is an administrator or not. Administrators manage
accounts and deployment settings, and can reach every project.

**Per project:**

| Role | Can |
|---|---|
| `READER` | Read the roadmap and changelog |
| `WRITER` | Write them, answer agent questions, start runs |
| `OWNER` | The above, plus the project's settings and its members |

Roles are ordered, so "at least `WRITER`" is one comparison rather than a table
of cases that can disagree with itself.

## 404, not 403

A non-member asking for a project gets **404**, not 403. A URL should not let
somebody discover which projects exist — the difference between "no such
project" and "not yours" is itself information.

This is why a new user sees an empty project list rather than an error: they are
not a member of anything yet.

## Who may create projects

**Administrators only**, by default. It can be opened to any signed-in user, who
then owns what they create.

Opening it up should be a decision somebody makes on purpose, which is exactly
why it is not the default.

## Archiving

Projects **archive**; they do not delete. A project's roadmap is its history,
and history is the thing this platform exists to keep. Archived projects drop
out of the switcher and are hidden behind a toggle in the list.
