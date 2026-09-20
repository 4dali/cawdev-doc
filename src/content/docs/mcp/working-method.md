---
title: The working method it teaches
description: Branch first, name the branch before the first commit, read the plan, there is no delete — what an agent that has read the MCP README does differently.
---

`tools/mcp/README.md`, in the cawdev repository, is written to be read by an
agent as well as by you. An agent that has read it behaves noticeably better
than one that only sees the individual tool descriptions — the tools tell it
*what it can do*, and this teaches it *how work happens here*.

## How work starts

The sequence is fixed, and the second step is the one people — and agents —
skip:

1. Branch off an up-to-date default branch, named after the entry (`r4-roadmap-entries`).
2. **Move the entry to its in-development status naming the branch, before the first commit** — via `roadmap_set_status`, not after. The roadmap should be able to answer "what is being worked on right now" without asking anyone.
3. Build to the entry's "Done when" list.
4. Finish with a pull request. Never push straight to the default branch.
5. When the PR merges, move the entry to `MERGED` naming it. The branch may then be deleted — the in-development status is for work somebody is doing, not work that's done.

## The body is what we want; the plan is how; the comments are the argument

`roadmap_get` returns all three, and `task_current` returns them for whatever
entry the current run is on.

**Read the plan before doing any of the work.** It was written by a plan
phase and agreed by somebody, and it names the files. If carrying it out
turns out to be wrong, say so and stop rather than improvising a different
change — what was approved was *that* plan, and a different one hasn't been.

There's no tool that writes a plan, and none that starts a plan phase. The
first is the platform's own job — it stores what a plan phase reports when
it ends, so a session that must not write isn't handed a writer to do its
own bookkeeping with. The second is refused outright: an agent cannot start
another agent.

**Read the discussion before proposing anything.** It's where an objection
was already answered and where an obvious-looking approach was already ruled
out, with a reason. Re-proposing what was talked through three months ago is
exactly what the discussion exists to prevent.

Use `roadmap_comment` for the argument — what you measured, what you tried,
why you didn't take the route someone would expect. Use `roadmap_update`
once the discussion reaches a conclusion: the body is where the settled
answer goes, so the next reader doesn't have to reconstruct it from the
thread. A comment is attributed to the run as well as to the person whose
token minted it, so a colleague can tell an agent's reading from a human
one.

## Read what earlier sessions did before repeating it

`task_current` lists every run the current card has already had — how each
ended, on what branch, with what model, whether the work was pushed, and the
commits it made by subject. A card that failed twice on the same branch is
telling you something its status alone doesn't, and the session most in need
of that history is the one about to try again.

No transcripts come with it, on purpose — the terminal log lives on the
run's own page in the console, and nine of them would fill the context this
call exists to save. If you need that level of detail, the discussion under
the entry is where a previous session should have written down what it
learned, and where the current one should too.

## There is no delete

Not in these tools, not in the API. `roadmap_decline` with a reason is the
only exit a roadmap entry has, and the reason is the point — it's what stops
the same idea being proposed again in six months. The same is true of
changelog entries: correct the text, don't remove the record. And of
comments: nothing removes one, and the most anyone can do to their own is
correct its wording.

## Ids are permanent, and a card is named by its ref

An entry's number never changes and is never reused. Commit messages and
code comments point at it directly. A roadmap card and an issue each count
on their own sequence, so `R91` and `i91` are two different cards —
wherever a tool takes a number, `related`, `after`, or an `entryNumber`,
pass the ref (`"i91"` for an issue), and a bare `91` is read as the roadmap
card, which is what a bare number has always meant.

:::tip[The one thing worth internalizing]
When anything is surprising, call `roadmap_where` before anything else. Most
confusion is one of four things being different from what was assumed: the
URL, the token, where either value was actually read from, or which
identity the platform sees you as.
:::
