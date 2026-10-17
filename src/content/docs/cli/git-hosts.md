---
title: "Git hosts: GitHub and GitLab"
description: Pull requests and merge requests are opened, found and merged by your machine with gh or glab. Which one it uses, how to set it up, and the known limits of GitLab.
---

cawdev holds no git-host credential. Everything that touches the host happens
on a machine that runs the [runner daemon](/cli/runner-daemon/), under your
own sign-in:

| Host | Command line | Sign in once with |
|---|---|---|
| GitHub | `gh` | `gh auth login` |
| GitLab | `glab` | `glab auth login --hostname <your GitLab host>` |

Install and sign in the one your project's host needs on **each machine** that
serves the project. A machine without it says so in one sentence rather than
failing quietly.

## Which host a project uses

The daemon reads it off the checkout's `origin`:

1. A host the project **declared** wins. Set **Git host** to *GitLab* or
   *GitHub* in **Project settings → Project**, beside the Git URL.
2. Otherwise a host name that contains `gitlab` (`gitlab.com`,
   `gitlab.example.com`) is GitLab.
3. Otherwise GitHub, which is what the daemon assumed before GitLab was
   supported, so a project that never set anything behaves as it always did.

A self-hosted GitLab whose address does not say `gitlab` is the case for
declaring it. *Detect* is the default and means GitHub when the URL does not
say.

## What runs on the machine

| Act in the console | GitHub | GitLab |
|---|---|---|
| Open the pull or merge request | `gh pr create` | `glab mr create`, targeting the card's base (the source branch, for a stacked card) |
| Find an existing one | `gh pr view` | the same question asked of `glab` |
| Merge | `gh pr merge <url> --squash --delete-branch` | `glab mr merge --yes --remove-source-branch` |
| Create a branch (from the Git tab, or a stacked card) | a push of the source branch tip to the new name | the same |

A request that already exists is a success, not a conflict: the rule wanted one
to exist, and one does. A merge request GitLab says has conflicts reads as a
conflict, which is what offers *Merge with an agent*; one still being checked
is waited for, as on GitHub.

:::caution[Restart the daemon after upgrading]
Creating a branch from the console (R379) is a request an older daemon does
not understand. A daemon that predates it is never handed the request, and the
refusal says to restart it.
:::

## Known limits on GitLab

- The `glab` flags were written for a current `glab` and checked against a
  fake of it, not against every real GitLab. If a merge queues an auto-merge
  instead of merging, compare `glab mr merge --help`.
- GitLab retargets a stacked merge request itself only on versions where that
  is on (the default since 15.x). On an older server the request keeps
  targeting the deleted branch.
- The daemon's periodic question *what became of this branch* asks `gh` only.
  On GitLab it falls back to plain git. The thing that moves a card the moment
  its merge request lands is [Git events](/api/git-events/).
