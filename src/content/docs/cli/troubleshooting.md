---
title: Troubleshooting
description: What the CLI's own error messages mean, and what to do about each one.
---

Most of this CLI's errors are written to be the fix, not just the symptom.
This page is for the ones that need a sentence more.

## "No runner token for `<url>`"

Either nobody has signed in and minted one on this machine, or a token exists
but was filed under a **different** URL than the daemon is looking under —
the fix in both cases is the same:

```sh
cawdev
```

It signs you in through the browser and mints a `runner:operate` token for
whatever this config already serves. If a token exists for a different
instance, the message names it — worth checking whether that's actually the
same cawdev reached through a different door (development's console vs. API
ports are the common case), in which case the fix is pointing `url` in the
config at the one the token is filed under, not minting a second one.

## "session expired — /login to sign in again"

The platform stopped honouring your browser session: it expired, you signed out
in the console, or your account was disabled. The terminal drops to watching
only. Type `/login` and approve the code in your browser. The polls pick up on
their own afterwards.

## "No projects configured"

The config's `projects` map is empty. Add at least one slug → path, or run
`cawdev --setup` to be walked through cloning one.

## "`<path>` has uncommitted changes"

The daemon refuses to start a run on top of somebody's uncommitted work by
accident. Commit or stash it, or start the run again from the console and
choose explicitly to build on top of what's there — see
[The runner daemon](/cli/runner-daemon/#the-one-hard-refusal-a-dirty-working-copy).

## "More than one runner here"

Two daemons are answering on this machine — normal if you deliberately run
more than one. Name which: `cawdev --runner <name>`.

## "This CLI is below what `<url>` requires"

The platform has a minimum CLI version and this one is under it. The daemon
refuses to start until you update; `cawdev --version` shows both numbers.

## A session sits there saying nothing

Nothing is wrong by itself — check the transcript for the idle note ("this
session has said nothing for N minutes"). It's not a failure state, just a
flag that the checkout is being held by something that might be stuck. If it
genuinely is stuck, `x` twice in the attached terminal cancels it.

## A run says it hit a usage limit

It moves to `USAGE_LIMITED`, holding no process, and keeps its checkout. It is
picked back up automatically once the window resets **only if the machine has
auto-resume on**. Auto-resume is per machine and off by default, set under
**Your settings → Machines**; without it, *Carry on* from the run page restarts
it. A `PAUSED` run, by contrast, is never picked up by auto-resume: a person
stopped it, and only a person starts it.

## A hand-off's patch didn't apply

The run's briefing says exactly where the `.patch` file landed and gives you
the `git apply --3way` command to run it by hand. Check `git status`
afterwards before trusting the tree — a three-way apply that partially
succeeds leaves conflict markers, not a clean failure.

## `M` isn't offered on a permission request

`M` (always, on this machine) only appears when the config has
`"acceptsRulesFromConsole": true`. Pressing it anyway tells you what to add.
See [Permissions and the shield](/cli/permissions-and-shield/#the-ceiling)
for what turning that on actually means before you do.

## Every run fails immediately

Check that the coding agent itself is signed in **on this machine** —
`claude`, `agy` or `codex`, run once by hand. `cawdev --setup` asks this up
front for exactly this reason: a runner whose agent isn't signed in boots
perfectly and fails every single run, which is a much worse way to find out
than a question.

## "ssh needed to ask you something" during a clone

An ssh URL whose key has a passphrase, or a host being trusted for the first
time, needs ssh to ask a question on the terminal directly — something the
attached screen can't hand over mid-draw, so it clones in batch mode instead
and fails at once rather than hanging. Add the key to your agent once
(macOS: `ssh-add --apple-use-keychain ~/.ssh/id_ed25519`) and try again, or
run `cawdev config add-project` from a plain shell, which can ask.

## The workspace folder is missing (`spawn … ENOENT`)

A project's checkout path in the config no longer exists on disk (moved,
deleted, an unmounted drive). The run queues and says so rather than failing at
spawn. Restore the folder, or point the project at a new path with `cawdev
config`, and the run goes on. `cawdev config remove-project <slug>` stops
serving it without touching the files.

## The daemon was restarted (`DAEMON_RESTARTED`)

A run failed with this because the daemon driving it was killed and started
again: by systemd, by `cawdev`, by hand. The new daemon fails what the old one
was driving at once and holds the checkout, so *Carry on* picks the run up. With
auto-resume on it does so once by itself; a second restart on the same run waits
for you.

On a small Linux box the usual cause is memory: a test suite grows until the
kernel's OOM killer picks the biggest process, which is sometimes the daemon.
`journalctl -k | grep -i "killed process"` says so. Set `sessionMemoryMax` (for
example `"6G"`) in the [config file](/cli/config-file/) so a runaway session is
killed on its own and the daemon stays up, give the daemon `OOMScoreAdjust=-800`
in its systemd unit, and add swap.

## Codex or Antigravity was refused

A run of theirs that writes code is refused before it starts unless the machine
accepts rules from the console (`cawdev config rules on`) **and** has *Allow
everything* ticked under **Your settings → Machines**. The refusal says which of
the two is missing. See [Agents](/cli/agents/).

## `report done` was refused

On a coding run, `report done` is refused while the checkout has uncommitted
files or commits the remote hasn't seen. The answer names them. The session
commits what belongs to the work, discards what doesn't, pushes, and reports
again. If it can't (a push the remote refuses, a file that looks like a
credential), the run fails with the reason and the checkout held. Then *Carry
on*, *Commit* or *Discard* decide.

## A stage failed for background commands

The stage's turn ended with a background shell or an `Agent` still running, or
one that finished and was never read, so its result was lost. The failure names
the commands. `/continue` in the terminal, or *Carry on* in the console,
re-runs the stage, told to run them in the foreground.

## `gh` or `glab` not found

Opening, finding and merging a pull or merge request happens on your machine
with the host's own tool, and a machine without it says so in one sentence.
Install and sign in `gh` for GitHub or `glab` for GitLab. See [Git
hosts](/cli/git-hosts/). A daemon too old to know a request the console makes
(creating a branch, for one) is never handed it, and the refusal says to restart
the daemon.

## Still stuck

`cawdev config show` prints this machine's config with the token redacted —
the first thing worth pasting into a bug report. The daemon's own log is one
key away in the attached terminal: `g` or `/log`.
