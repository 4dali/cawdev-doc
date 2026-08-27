---
title: Troubleshooting
description: A symptom, and what it usually is.
sidebar:
  order: 5
---

## In the console

| What you see | What it usually is |
|---|---|
| **No projects at all** | You are not a member of any. Ask an owner to add you. |
| **404 on a project someone linked you** | The same thing. cawdev answers 404 rather than 403 so a URL cannot be used to discover which projects exist. |
| **The API dot is red** | The API is down or the deployment is misconfigured. Not something you can fix from the console — tell whoever runs it. |
| **Your `ROADMAP.md` edit vanished** | It is a [generated export](/console/exports/). Change the entry, then regenerate. |
| **A move was refused** | The target status carries something it was not given — a branch, a version, or a reason. See [statuses](/reference/statuses/). |

## Runs

| What you see | What it usually is |
|---|---|
| **The run sits `QUEUED`** | No runner is live for that project, or the one that was has stopped. The runs page shows which are alive. |
| **`FAILED` saying the tree is dirty** | Commit or stash in that working copy. The runner will not let an agent loose in it. |
| **`FAILED` on its own** | Its runner stopped heartbeating for five minutes. Check the daemon is still up. |
| **Starting is refused** | The project already has a live run. Runs share a working copy, so the rest queue. |
| **The agent stopped and did nothing** | Look in your **Inbox**. It is probably waiting on you — and a waiting run is never swept. |
| **Cancel did nothing** | It reaches the daemon on its next poll, within a few seconds. If it truly does nothing, check the daemon's log. |

## Tokens and agents

| What you see | What it usually is |
|---|---|
| **Your token stopped working** | It was revoked, or you lost access to the project. Tokens follow your **current** membership. |
| **"No such project"** on a write | The token has no grant there at all. A token that *can* see the project but lacks the scope gets a 403 naming the missing scope instead. |
| **The agent cannot find the project** | A multi-project token needs `project` per call or `CAWDEV_PROJECT` set. The error lists what the token can see. |
| **The agent is confused about where it is** | Have it run `roadmap_where` — it reports the URL, the token, **where each value came from**, and who the platform thinks it is. |
| **A run-only tool refuses** | Those activate on a `cawdr_` run token. A plain `cawd_` token gets a refusal saying what is missing. |

## The runner

| What you see | What it usually is |
|---|---|
| **`bad option: --mcp-config`** | The stub agent is being launched via `node`. Point `agentCommand` at `stub-agent.mjs` directly, by absolute path, with no `agentArgs`. |
| **The session did nothing and reported blocked** | It hit a permission it could not ask about. A spawned agent has no terminal — see [permissions](/agents/runner/#permissions). |
| **It claims a run then goes quiet** | Check the daemon's log for the spawn line; it prints the exact command it ran. |

## Deployment

| What you see | What it usually is |
|---|---|
| **The API refuses to boot naming a variable** | That is by design. Set it — the message says where. |
| **It refuses naming `CAWDEV_ADMIN_EMAIL`** | The user table is empty and it needs a first administrator. See [deploying](/admin/deploying/#the-first-administrator). |
| **Nobody can sign in** | If the user table is not empty, the admin bootstrap variables are ignored — an existing administrator has to reset the password. |
