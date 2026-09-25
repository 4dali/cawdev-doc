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

It moves to `USAGE_LIMITED`, holding no process, and is picked back up
automatically once the window resets — nothing to do. A `PAUSED` run,
by contrast, waits for a person; `carryOn`/resume it from the console.

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

## Still stuck

`cawdev config show` prints this machine's config with the token redacted —
the first thing worth pasting into a bug report. The daemon's own log is one
key away in the attached terminal: `g` or `/log`.
