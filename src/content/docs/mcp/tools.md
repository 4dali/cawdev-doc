---
title: Tool reference
description: Every tool the cawdev MCP server exposes, grouped the way the server itself groups them.
---

The server exposes its tools in four groups. The first three work on a plain
`cawd_` token; the last group — everything from `task_current` down — only
means anything **inside a run**, on the short-lived `cawdr_` token the runner
mints when it starts one. Call one of those with a plain token and you get a
refusal explaining exactly that, rather than a confusing 404.

## Orientation

| Tool | What it does |
|---|---|
| `roadmap_where` | Which platform, which token, where each was read from, and who you are. Call this first when anything is surprising. |
| `roadmap_statuses` | The roadmap statuses, what each means, and what each requires — the set differs by kind, and an issue calls two of them different words. |

## Reading the codebase

| Tool | What it does |
|---|---|
| `code_map` | The shape of a project's code: every directory, how many files it holds, and which directories depend on which. Call it before grepping around a repository you don't know — it answers "where does this live" and "what would I break" in one call, already computed. |
| `file_deps` | What one file imports, and what imports it. The second half is the blast radius of a change, which grepping for a filename doesn't reliably give you. |

Both fall back gracefully — a project no machine has mapped yet returns a
plain sentence saying so, not an error, so an agent just works as it would
have anyway.

## Roadmap

| Tool | What it does |
|---|---|
| `roadmap_list` | Entries, optionally filtered by status or by sprint. `brief` (default `true`) omits bodies, for surveying without pulling every entry's text into context. |
| `roadmap_get` | One entry in full: its body, **the plan agreed for it**, and the discussion under it. |
| `roadmap_create` | Create an entry. The platform allocates its permanent number. Lands at `CONSIDERING` unless you say otherwise; a status that requires something must be given it. |
| `roadmap_update` | Edit title, body, section, sprint, related refs, or the cards it starts coding after (`after`). Use `roadmap_set_status` to move it — this tool never changes status. |
| `roadmap_comment` | Say something *beside* the entry rather than inside it — an objection, a measurement, why an obvious approach wasn't taken. Comments cannot be deleted, by you or anyone. |
| `roadmap_set_status` | Move an entry. Any status may move to any other — the rules are about what a status must *carry* (a branch, a merge, a version, a reason), not a permitted path. |
| `roadmap_decline` | Decline with a reason. The only exit an entry has — there is no delete, and the reason is the point: it stops the same idea being proposed again in six months. |

## Issues

Issues (R85) share the roadmap's numbering but their own sequence and their
own prefix: `i91` is the ninety-first issue, and `R91` is an unrelated
roadmap card. `roadmap_get`, `roadmap_comment`, `roadmap_update` and
`roadmap_set_status` all accept an issue's ref the same way they accept a
roadmap card's.

| Tool | What it does |
|---|---|
| `issue_list` | What is broken in a project, and how badly. Statuses: `NEW`, `CONFIRMED`, `IN_DEVELOPMENT`, `MERGED` (shown as *Resolved*), `DECLINED` (shown as *Won't fix*). |
| `issue_file` | File an issue, with a required `severity` — `CRITICAL`, `MEDIUM`, or `MINOR`; it's how the issues board is ordered. Lands at `NEW` unless you say `CONFIRMED`, which claims you've already checked it. |

## Backlog — feedback, not a card

| Tool | What it does |
|---|---|
| `backlog_file` | File feedback that isn't a card yet — something you noticed that a *person* should decide about. `kind` is your opinion: `ISSUE` (broken) or `FEATURE` (should also do, or do better). A writer later accepts it as a roadmap card, accepts it as an issue, or refuses it with a reason. |

Use `backlog_file` when you're not sure something deserves a card; use
`roadmap_create` or `issue_file` when you are.

## Changelog

| Tool | What it does |
|---|---|
| `changelog_list` | The changelog, grouped by release, newest first. |
| `changelog_get` | One entry. |
| `changelog_add` | Add an entry. No `version` means it goes to *Unreleased*. Set `breaking` when the reader must act on it — that's the field they scan for. Set `entryNumber` to link it to the card or issue it describes, by ref, so a release can tell whether a card already has an entry. |
| `changelog_update` | Edit an entry, including moving it to a release when the work ships. There is no delete — correct the text instead. |

## Inside a run

These activate on a run token (`cawdr_`) only.

| Tool | What it does |
|---|---|
| `task_current` | The entry you're working on — its body, its plan, its branch, everything you've already reported and asked on this run, **and every earlier run this card has had**. Call it first, and again whenever you're unsure where you are; a resumed or confused session re-orients from this alone. |
| `report` | `progress` as often as useful; `done` when finished, naming the branch and any PR; `blocked` when a person must resolve something. `done` and `blocked` also end the run and expire your token — there's no separate step. |
| `ask_user` | Ask the person who started the run, and wait. Blocks up to ten minutes (`CAWDEV_ASK_TIMEOUT_SECONDS`, default 600); if nobody has answered by then it hands back a `question_id` for `await_answer`. |
| `await_answer` | Resume waiting for a question `ask_user` handed back. |
| `ask_group` | Ask a **round** of up to 12 questions at once, under one title, and wait for all of them. Use it when you have several things to settle together — they land in the inbox as one form instead of interrupting once per question. Blocks up to ten minutes, then hands back a `group_id`. |
| `await_group` | Resume waiting for a round `ask_group` handed back. Returns only once *every* question in the round is answered. |
| `interview_rounds` | **CTO Interview only.** Where the interview stands: rounds asked, rounds answered, how many you may still ask. |
| `await_more_rounds` | **CTO Interview only.** Call this once you've used your round budget, and wait: the person sees "I have more time" (grants three more rounds) or "finish here" (write the brief from what's already answered). Do not ask another round until this says you may. |
| `propose_entry` | **Audit and scoping runs only.** Record a finding — or a card cut from a bigger idea — as a proposal rather than an entry. See below. |
| `approve` | **Not yours to call.** Claude Code calls this itself as `--permission-prompt-tool` whenever no rule already covers a tool call you're making. Calling it yourself asks a person a question about nothing. |

### `propose_entry` in detail

Only an audit or a scoping session uses this. `kind` is your opinion —
`"issue"` (broken, unsafe, or loses data — needs a `severity`: `critical`,
`medium`, or `minor`) or `"roadmap"` (it should also do this, or do it
better — no severity). A **person** decides what actually gets filed, and may
file it the other way; you're suggesting an entry, not creating one.

A roadmap proposal must say what it starts `after`: `[]` for a card that
starts after nothing, `"#2"` to reference the second card *you* proposed in
this same run (the number the tool handed back), or `"R12"` / `"i7"` for a
card that already exists. You can only reference what's already been
proposed, so propose in build order.

:::tip
`ask_user` is for decisions that are genuinely someone else's — an
architectural choice, a trade-off with no right answer — never for checking
work you could check yourself. Every question stops the run and costs a
person's attention. When it returns unanswered, don't guess and carry on:
call `await_answer`, or `report blocked` and stop.
:::

## When a call is refused

The message is the platform's own, and it names the rule you hit — a missing
scope, a status that needs a branch it wasn't given, a project the token
can't see. Read it rather than retrying blindly: the refusal is usually
telling you something true about what you're allowed to do.

## When a tool call needs a permission that isn't `approve`

`approve` isn't something an agent decides to call — it's wired in as Claude
Code's own `--permission-prompt-tool`, so when the agent tries something no
rule already covers (running `mvn`, say), Claude Code calls `approve` on the
agent's behalf, a person is shown the request, and the original call either
proceeds or comes back refused. From inside the session it just looks like a
tool call that took a while. See [Permissions and the shield](/cli/permissions-and-shield/)
for how those rules are assembled.
