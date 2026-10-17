---
title: Git events from GitHub and GitLab
description: Let GitHub or GitLab tell cawdev when a pull request merges or a branch is pushed, so a card follows its branch with no runner involved.
---

A project no machine serves never has its repository read, so its cards cannot
notice a merge. **Git events** is the other way round: GitHub or GitLab calls
cawdev when a pull request (merge request) merges or a branch is pushed, and a
card taken by hand follows its branch on its own.

It uses a **project secret**, not a token, and the secret opens this one door
and nothing else.

## Set it up

An **owner** of the project, on **Project settings → Project**, finds the *Git
events* block. It shows the address to give the host. Press *Generate secret*.
The secret is **shown once**, so copy it before you leave. *Rotate secret*
makes a new one and the old one stops verifying at once.

The address is:

```
POST https://app.cawdev.com/api/integration/v1/projects/<slug>/git-events
```

- **GitHub:** the repository's *Settings → Webhooks → Add webhook*. *Payload
  URL* is the address, *Content type* `application/json`, *Secret* is the
  secret. Under *Which events*, pick *Let me select individual events*, then
  *Pull requests* and *Pushes*.
- **GitLab:** the project's *Settings → Webhooks*. *URL* is the address, *Secret
  token* is the secret, and tick *Merge request events* and *Push events*.

GitHub's default `application/x-www-form-urlencoded` is accepted as well.

## How a delivery is checked

There is no session and no token. The credential is the secret:

| Host | Header | Checked as |
|---|---|---|
| GitHub | `X-Hub-Signature-256` | `sha256=` HMAC of the raw body, verified before anything is parsed |
| GitLab | `X-Gitlab-Token` | the secret itself, compared in constant time |

Every refusal is the same `401`, so a caller cannot tell a wrong secret from a
project that has none. A body over **1 MiB** is a `413`.

## What it does

- **A merged pull request** whose branch is the branch of an open card, merged
  into that card's base branch, moves the card to `MERGED` naming the pull
  request. Its discussion says *Merged outside cawdev: `r12-…` reached its base
  in #34, seen by GitHub* (*!34* for GitLab).
- **A push** whose commit messages name a card (`R12`, `i7`) adds *mentioned it
  in `abc1234`* to that card's history. It is attributed to the person on the
  project whose email is the commit's author, otherwise to whoever has the
  card. It never moves the card.

cawdev reads only the branch, the merge sha, the pull request's address and
the commit messages. It holds no credentials for your repository.

## The last ten deliveries

Listed under the *Git events* block with what became of each. The call answers
with the same word:

| Outcome | Meaning |
|---|---|
| `MERGED` | A card moved |
| `MENTIONED` | A push left a mention |
| `IGNORED` | Understood and deliberately not acted on. The detail says why: no open card on that branch, merged into some other branch, a pull request from a fork, a ping, an event cawdev does not use. Answered `200`, so the host does not mark the hook as failing |
| `DUPLICATE` | The host sent the same delivery again. It does nothing |
| `REJECTED` | The signature was wrong or missing, or the body was over 1 MiB. Nothing moved. A burst of refusals is recorded up to twenty a minute |
| `FAILED` | cawdev hit an error. It answers `500`, so the host retries |

:::note[Who may do what]
Only a project owner can generate or rotate the secret. Rotating is a
project-management act, so a person who can edit cards cannot do it.
:::

On GitLab this is also what moves a card the moment its merge request lands,
since the daemon's periodic check asks `gh` only. See [Git
hosts](/cli/git-hosts/).
