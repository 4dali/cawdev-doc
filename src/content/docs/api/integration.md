---
title: Tokens and authentication
description: Mint an API token for an application you build beside cawdev, and what it may and may not do on the projects it holds.
---

An agent token is for a coding agent. An **API token** is for an application
*you* build beside cawdev — a support tool that files what customers report, a
product dashboard that shows where a card has got to, a bot that opens an
issue when a health check fails. It reaches a small, versioned surface of its
own under `/api/integration/v1/`, and it is deliberately narrower than an
agent token: **it files and it reads, and it can do nothing else** on the
projects it holds. It cannot decline a card, move a status, rename a section
or write a plan, whoever minted it.

The section has three pages. This one is the token; [Filing and reading
cards](/api/calls/) is the five calls and the status vocabulary;
[Webhooks](/api/webhooks/) is how the platform tells your application when
something moves, so it never has to poll.

:::tip[Why not an agent token?]
Before API tokens, an application had to hold `roadmap:write` to file an
issue or a card — which also let it decline cards, move statuses and write
plans — and to read a card's status it got the console's thirty-field view
with nothing telling it when that view changed. An API token is the credential
that fits the job: three scopes, compact shapes, and a webhook.
:::

## Mint one

**Settings → API tokens → Mint a token.** Give it a label and tick the
projects. There is no scope picker: each project ticked gets every one of the
three scopes the token may hold that *you* may grant there —

| Scope | Lets the application | Who may grant it |
|---|---|---|
| `backlog:write` | File feedback | a `READER` |
| `cards:file` | File an issue at `NEW` or `CONFIRMED`, or a roadmap card at `CONSIDERING` or `PLANNED` — and nothing after that | a `WRITER` |
| `cards:read` | Read one card's status, and what became of feedback | a `READER` |

— so a token you mint on a project where you are a `READER` holds the first
and the last, and one minted where you are a `WRITER` holds all three.

The secret starts `cawa_` and is **shown once**. Put it in your application's
configuration, never in its repository. The `cawa_` prefix is what lets you
tell an application's token from an agent's `cawd_` in a log line.

:::note[The rule every token is under]
A token never exceeds the account that minted it, evaluated against your
membership at the moment it is *used*, not the moment it was minted. Leave a
project and every token you minted for it loses that project the same moment.
Revoking the token stops the API and its webhook both.
:::

Live tokens are listed on the page; revoked ones sit behind a disclosure.
Agent tokens are listed on their own section and never here, so nothing
appears twice.

## Authenticate

Send the secret as a bearer token on every call:

```
Authorization: Bearer cawa_…
```

Every path is under `https://app.cawdev.com/api/integration/v1/projects/<slug>/`
— replace the host with your instance. The surface is **versioned**, unlike the
console's own API, because strangers are on it: what `v1` answers today it
will answer tomorrow.

An API token reaches these paths, the plain backlog filing path (`POST
/api/projects/{slug}/backlog`, the same act as `POST …/feedback` here), and
`GET /api/agent/whoami`. **Every other path answers `403`**, naming the scope
it would have needed — `GET /api/projects/{slug}/roadmap` with an API token is
a `403` naming `roadmap:read`, which an API token can never hold.

## What comes back when something is wrong

| Status | Meaning |
|---|---|
| `400` | The request is malformed, or names a status the call does not accept. The body names what was wrong — a filing at `IN_DEVELOPMENT` is refused naming the two statuses the call takes. |
| `401` | No token, or a revoked one. |
| `403` | The token holds no scope for this call on this project, named in the body. |
| `404` | A project the token does not reach, or a card or feedback id that does not exist there — deliberately not `403`, so a token cannot enumerate projects it was not granted. |
| `429` | The filing cap, below. `error: rate_limited`. |

## The filing cap

The three filing calls — feedback, issues, cards — are capped at **60 per
token per rolling minute**, answered `429` with `error: rate_limited`. Reads
are not capped. The cap is per API instance and resets when it restarts; it is
a guard against a loop in your code, not accounting.

## What the token cannot do

- It cannot **decide** anything. Feedback it files stays `PENDING` until a
  signed-in `WRITER` accepts or refuses it on the Backlog board; a card it
  files at `PLANNED` goes into development only when a person, or the
  project's own rules, take it there.
- It cannot **manage its own webhook**. The URL, the secret and the scope are
  set by the token's owner in the console — a token that could point its own
  deliveries somewhere would be a credential turning itself into a feed.
- It cannot **read the roadmap**, only one card at a time by ref, and only
  what the compact view carries.

The whole contract, with every schema, is the `integration` tag in the cawdev
repository's `openapi.yaml`.
