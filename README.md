# cawdev-website

The user documentation for [cawdev](https://github.com/4dali/cawdev), built with
[Astro Starlight](https://starlight.astro.build).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

## What is here

| Section | Covers |
|---|---|
| **Start here** | What cawdev is, the model it is built from, and the first ten minutes in the console |
| **Using the console** | The roadmap board, the changelog, runs and the inbox, the generated exports |
| **Working with agents** | Minting tokens, the MCP server, the runner daemon |
| **Running a deployment** | Deploying, the first administrator, accounts and roles |
| **Reference** | Statuses, scopes, run states, keyboard shortcuts, troubleshooting |

## Conventions

**The deployment URL is a placeholder.** Pages say `https://cawdev.example.com`
throughout. A team hosting its own copy of these docs should replace it with
their own address — it is a plain find-and-replace across `src/content/docs/`.

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
