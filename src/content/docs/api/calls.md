---
title: Filing and reading cards
description: The five calls — file feedback, an issue or a roadmap card, read what became of feedback, read where a card has got to — and the one-word status vocabulary an application switches on.
---

Five calls, all under `/api/integration/v1/projects/<slug>/`, all with
`Authorization: Bearer cawa_…` (see [Tokens and
authentication](/api/integration/)). Three file, two read. The examples use
`https://app.cawdev.com` and `$TOKEN` for the secret.

| Call | Scope | Answers with |
|---|---|---|
| `POST …/feedback` | `backlog:write` | The feedback and its outcome, `PENDING` |
| `GET …/feedback/{id}` | `cards:read` | Its outcome now |
| `POST …/issues` | `cards:file` | The issue's status |
| `POST …/cards` | `cards:file` | The card's status |
| `GET …/cards/{ref}` | `cards:read` | The card's status |

## File feedback

Feedback is the lightest thing to file: a kind, a title and a body, and no
decision. It lands on the project's **Backlog** board, where a `WRITER`
accepts it as a card or refuses it with a reason.

```sh
curl -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"kind":"FEATURE","title":"Export to CSV","body":"Asked twice this week."}' \
  https://app.cawdev.com/api/integration/v1/projects/my-project/feedback
```

| Field | Required | Meaning |
|---|---|---|
| `kind` | yes | `ISSUE` (something is broken) or `FEATURE` (it should also do, or do better) — advice to the triager, not a decision |
| `title` | yes | up to 200 characters |
| `body` | yes | Markdown, up to 10 000 characters — what happens, or what it should also do, and why |

```json
{
  "id": "6f1c…",
  "kind": "FEATURE",
  "title": "Export to CSV",
  "outcome": "PENDING",
  "became": null,
  "reason": null,
  "filedAt": "2026-09-21T09:12:04Z",
  "decidedAt": null
}
```

## What became of feedback

Keep the `id` and ask later — or set a [webhook](/api/webhooks/) and be told.

```sh
curl -H "Authorization: Bearer $TOKEN" \
  https://app.cawdev.com/api/integration/v1/projects/my-project/feedback/6f1c…
```

`outcome` is one of three words:

| `outcome` | And beside it |
|---|---|
| `PENDING` | nothing yet |
| `ACCEPTED` | `became: { ref, path, url }` — the card it turned into, which you can then read with `GET …/cards/{ref}` |
| `REFUSED` | `reason`, when the writer gave one |

## File an issue

```sh
curl -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"Login loops on Safari","body":"Steps to reproduce…","severity":"MEDIUM","status":"CONFIRMED"}' \
  https://app.cawdev.com/api/integration/v1/projects/my-project/issues
```

| Field | Required | Meaning |
|---|---|---|
| `title` | yes | up to 300 characters |
| `severity` | yes | `CRITICAL`, `MEDIUM` or `MINOR` |
| `body` | | Markdown |
| `status` | | `NEW` (the default) or `CONFIRMED` — nothing else |
| `section` | | the section to file it under |
| `related` | | refs of related cards — `["R12", "i15"]` |

`NEW` is "somebody reported this"; `CONFIRMED` is "we have seen it". The
difference matters on a project with **auto-fix** switched on: an issue filed
at `CONFIRMED` there starts a fix session, exactly as it would had a person
confirmed it on the board.

## File a roadmap card

```sh
curl -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"Export to CSV","body":"Why, and for whom.","status":"PLANNED"}' \
  https://app.cawdev.com/api/integration/v1/projects/my-project/cards
```

| Field | Required | Meaning |
|---|---|---|
| `title` | yes | up to 300 characters |
| `body` | | Markdown |
| `status` | | `CONSIDERING` (the default) or `PLANNED` — nothing else |
| `section` | | the section to file it under |
| `related` | | refs of related cards |

On a project with **auto-plan** switched on, a card filed here is planned by
a session. The project's own rules apply to what you file exactly as to what
a person files.

:::caution[Four statuses, and the rest of a card's life is the project's]
An issue may be filed at `NEW` or `CONFIRMED`; a card at `CONSIDERING` or
`PLANNED`. Any other status is a `400` naming the two the call accepts.
Starting development, reviewing, merging, shipping and declining are decided
by the people and the rules on the project, never by an application.
:::

## Where a card has got to

The ref is `R12` or `12` for a roadmap card, `i15` for an issue.

```sh
curl -H "Authorization: Bearer $TOKEN" \
  https://app.cawdev.com/api/integration/v1/projects/my-project/cards/R12
```

```json
{
  "ref": "R12",
  "kind": "ROADMAP",
  "title": "Export to CSV",
  "status": "IN_DEVELOPMENT",
  "phase": "CODING",
  "work": {
    "branch": "r12-export-to-csv",
    "status": "CODING",
    "prUrl": null,
    "note": null,
    "signedOff": false
  },
  "run": {
    "id": "2b7e…",
    "profile": "CODE",
    "state": "RUNNING",
    "startedAt": "2026-09-21T10:02:41Z",
    "finishedAt": null
  },
  "path": "/projects/my-project/roadmap/12",
  "url": "https://app.cawdev.com/projects/my-project/roadmap/12",
  "updatedAt": "2026-09-21T10:02:41Z"
}
```

The same shape is what the two filing calls answer with, and what a
`card.status` webhook carries.

### `phase` — the one word to switch on

A card's own `status` says whether the project wants it; the branch says how
far it has got; the newest session says what is happening this minute. An
application that wants to draw one badge should not have to reconcile the
three, so the answer carries **`phase`**, one derived word, beside the facts
it is derived from:

| `phase` | Meaning |
|---|---|
| `CONSIDERING`, `PLANNED` | a roadmap card nobody has started on |
| `NEW`, `CONFIRMED` | an issue nobody has started on |
| `PLANNING` | a plan session is running on it |
| `READY` | in development; a branch exists, no session is on it yet |
| `CODING` | a session — or a person — is writing it |
| `REVIEW` | the branch is offered for reading |
| `DONE`, `NOT_DONE` | the branch's verdict; `work.note` says why not |
| `RUN_FAILED` | in development, and the newest session failed with nothing else running — the one to show red |
| `MERGED`, `SHIPPED`, `DECLINED` | over |

### The facts beside it

| Field | Meaning |
|---|---|
| `status` | The card's own status: `CONSIDERING`, `PLANNED`, `NEW`, `CONFIRMED`, `IN_DEVELOPMENT`, `MERGED`, `SHIPPED` or `DECLINED` |
| `work` | The open work item while the card is in development, else `null`: `branch`, its `status` (`READY`, `CODING`, `REVIEW`, `DONE`, `NOT_DONE`), `prUrl` once a pull request exists, `note` when it is `NOT_DONE`, and `signedOff` — `true` when a person gave the verdict rather than the platform |
| `run` | The newest session on the card, else `null`: `id`, `profile` (`CODE`, `PLAN`, `REVIEW`, …), `state` (`QUEUED`, `RUNNING`, `WAITING_ON_USER`, `FINISHED`, `FAILED`, …), `startedAt`, `finishedAt` |
| `path` | The card's route in the console |
| `url` | The same behind the instance's console URL — set by an administrator under **Administration → Mail** — or `null` until one is set. Show it as the link. |
| `updatedAt` | When the card last changed |

`phase` is enough for a badge. `work.prUrl` is the link to show beside
`REVIEW`; `work.note` is the sentence to show beside `NOT_DONE`; `run.state`
is what to show while `phase` is `CODING` and somebody wants to know whether
the session is actually running or waiting on a person.
