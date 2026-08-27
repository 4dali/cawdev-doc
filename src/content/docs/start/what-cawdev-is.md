---
title: What cawdev is
description: A self-hosted platform holding the roadmap and changelog of many projects, reachable by both people and coding agents.
sidebar:
  order: 1
---

cawdev is a **self-hosted platform** that holds the **roadmap** and
**changelog** of many projects at once, gives **coding agents** access to both
over MCP with tokens you mint yourself, and lets you **start a Claude Code
session on a roadmap entry from the console** — watching it report and
answering its questions while it works.

It is one deployment for one team.

## The problem it solves

A roadmap that lives in a markdown file is honest, versioned, and completely
invisible to the agent working from it. A roadmap that lives in a project
tracker is visible to people and awkward for agents — it means scraping a web
UI or wiring up a third-party API for something that should be four verbs.

cawdev keeps both halves:

- The **database is the source of truth**.
- `ROADMAP.md` and `CHANGELOG.md` are **generated exports** that stay committed
  and readable in the repository.
- The **MCP server** gives an agent the same verbs a person gets in the
  console, because the API was built to mirror them one for one.

## What it is not

- **Not an issue tracker.** There are no assignees, sprints, or story points. A
  roadmap entry says what to build and how you will know it is done.
- **Not multi-tenant SaaS.** One deployment, one team, no open signup — an
  administrator creates accounts.
- **Not a place your credentials go.** Repositories and agent CLI logins stay
  on the machine running the [runner daemon](/agents/runner/). The platform
  holds neither.

## Where the documentation is

| You want to | Read |
|---|---|
| Understand the pieces | [The model](/start/the-model/) |
| Use the console | [Your first ten minutes](/start/first-ten-minutes/) |
| Give an agent the roadmap | [The MCP server](/agents/mcp/) |
| Run sessions from the console | [The runner daemon](/agents/runner/) |
| Deploy and administer it | [Deploying](/admin/deploying/) |
