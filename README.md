# cawdev-website

The user documentation for [cawdev](https://github.com/4dali/cawdev-cli), built with
[Astro Starlight](https://starlight.astro.build).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

## What is here

| Section | Covers |
|---|---|
| **CLI & configuration** | Installing and signing in, `runner.config.json`, environment variables, the attached terminal, the runner daemon, lifecycle and stages, permissions and the shield, troubleshooting |
| **MCP server** | Setting it up, the full tool reference, the working method it teaches an agent |
| **Integration API** | API tokens for an application built beside cawdev: the five calls under `/api/integration/v1/`, the one-word status vocabulary, and the signed webhook |
| **Web console** | Finding your way around, the Plan boards (Roadmap/Issues/Backlog/Sprints), Work (Development/Sessions), Code, project settings, your account, administration, generated exports |

Deployment docs (deploying cawdev itself, accounts and roles) were dropped in
the rewrite rather than carried forward stale — they can come back as a
section of their own when someone writes them against current behaviour.

## Conventions

**The example URL is `https://app.cawdev.com`.** That's cawdev's own hosted
instance and the CLI's real default when nothing is configured — not a
placeholder. A team self-hosting its own copy of these docs should replace it
with their own address, the same plain find-and-replace across
`src/content/docs/` as before; `localhost:4200`/`:8091` still show up where a
page is specifically describing local development.

**Pages that use Starlight components must be `.mdx`.** A `<Steps>` block or a
`<Card>` in a `.md` file leaks its import line into the page as prose instead of
rendering. Asides (`:::note`) are directives and work in plain `.md`.

**Set `site` in `astro.config.mjs` before deploying.** The sitemap integration
needs it, and skips itself with a warning until it has one.

## Where the content comes from

The source of truth for behaviour is the cawdev repository — `GUIDE.md`,
`README.md`, `DEVELOPING.md`, and the READMEs under `tools/`. When cawdev
changes how something works, that repository is what changes first; these pages
follow.
