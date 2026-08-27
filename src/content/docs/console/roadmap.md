---
title: The roadmap
description: The board, moving entries by drag, and writing an entry an agent can actually work from.
sidebar:
  order: 1
---

The board groups a project's entries by status, in the order work moves through
them.

## Moving an entry

**Drag the card.** Pull it into another column and it moves.

If the target status **carries a requirement**, a small dialog asks for it right
there:

| Dropping on | Asks for | Pre-filled with |
|---|---|---|
| `CODING` | the branch | the branch name the working method would propose — `r12-slug-of-title` |
| `SHIPPED` | the version | the entry's existing version, if it has one |
| `DECLINED` | the reason | nothing — this one is worth typing |

Statuses that carry nothing move immediately. If the server refuses a move, the
board reloads to the truth rather than leaving you looking at a lie.

:::tip[Drag is never the only way]
The entry page keeps a status control that does the same thing, which is also
the keyboard and screen-reader path. Nothing in cawdev requires a mouse.
:::

## Writing an entry

**New entry** on the board asks only for a title and a starting status. The body
is where the work is, and it is markdown.

An entry that an agent can build from has three parts:

```markdown
Short prose: what this is, and why it is worth doing.

**Build:**
- The first thing to build.
- The second, with any constraint that matters.

**Done when:** the observable condition that settles it — a test that passes,
a page that renders, a command that exits zero.
```

**"Done when" is the leverage.** An agent working from the entry reads it as its
definition of done; a vague one produces vague work. Everything else in the
entry is context for that sentence.

Mention other entries as `R4, R7` in the **Related** field and they become
links in both directions.

:::note[Bodies are rendered by cawdev's own markdown]
Agent-written bodies are not a source you hand raw to a browser, so the console
escapes first and renders after. Some exotic markdown will not render — that is
the trade, and it is the right one.
:::

## There is no delete

Not in the console, not in the API, not in the MCP tools.

`DECLINED` **with a reason** is the only exit an entry has, and the reason is
the entire point: it is what stops the same idea being proposed again in six
months. The same applies to the changelog — correct the text, never remove the
record.

## Filtering

The status filter narrows the board to one column, which is mostly useful on a
project with a long `SHIPPED` list. `⌘K` reaches any single entry faster than
filtering does.
