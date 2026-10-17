---
title: Feedback
description: The door in front of the Roadmap, for a remark that is not yet a card, and what a person who can write the project does with it.
---

A card is permanent: nothing in cawdev is deleted. So a person who is not sure
their remark deserves a card either writes one anyway or keeps it to
themselves. **Feedback** is the door in between, in the rail under **Plan**.

Feedback deliberately cannot decide most of what a card decides for itself: no
number, no status, no section, no severity. Those are the project's decisions.

## Filing it

Anybody who can read the project can file an item. It asks for a title, a
description and which of two things the filer thinks it is, **Issue** (something
is broken) or **Feature** (it should also do this, or do it better). The kind is
the filer's guess, and whoever triages can overrule it.

Ways to file:

- **Send feedback** in the account menu, or **File feedback** on the page;
- an agent, with the MCP tool `backlog_file`;
- an application you built beside cawdev, over the [Integration
  API](/api/integration/), with a token that holds only `backlog:write`.

**Feedback about cawdev itself.** *Avatar → Send feedback* files into the cawdev
project's feedback from anywhere in the console, whether or not you are on that
project. It is there only when an administrator has named a project under
*Administration → Platform → Feedback goes to*. The answer you get is that it
landed, not where.

### Where it came from

An item carries **source tags**: `#internal`, `#customer`, `#support` and
`#agent` on every new project, picked under *From* when you file it. An agent's
`backlog_file` tags its item `#agent` by itself, beside any source it names. The
tag row under the search narrows the list to one source. Somebody who can write
the project changes a waiting item's sources with **Change sources**, and edits
the project's list under **Sources** in the page header. The list is what is
offered, not a gate: removing a word leaves the items that carry it as they are.

## The list

One list, newest first: what is waiting, each with its source as a tag, who
filed it and how long ago. There are no columns. **Show decided** adds what has
been dealt with, each saying where it went.

## Triage

Somebody who can write the project (the **Edit cards** privilege) does one of
three things with a waiting item:

- **Accept as card** becomes a roadmap card, with the title and description as
  written, in the section you give it if any.
- **Accept as issue** becomes an issue, with the severity you pick in the row.
- **Refuse…**, with a reason that is optional. The item stays, marked *Refused:
  why*, because what was considered is part of the record.

An accepted item lands where the project's *feedback door* says: **In the
backlog** by default, or on the board. See [Where a new card
lands](/console/roadmap/#where-a-new-card-lands). Its source tags become the
card's tags, and an accepted item links to what it became. An item is dealt
with once: a second press is refused rather than filing a second permanent card.

Somebody who can only read the project sees the list and *you read only* where
the buttons would be. Triage is a signed-in person's act: every token, a run's
included, is refused it.

The Feedback row's badge is how many items are waiting. It falls to zero when
the last one is dealt with.

## Across projects

**Feedback** under [All projects](/console/portfolio/) is the same rows for
every project you are in, a section per project with how many wait and its
**Sources**. Accepting one files it in its own project.
