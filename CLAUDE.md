# CLAUDE.md

The user documentation site for cawdev: Astro Starlight (`astro.config.mjs`
holds the sidebar), content under `src/content/docs/`.

- Build: `npm install`, then `npm run build` (output in `dist/`; the build is the
  test, it fails on bad frontmatter or a sidebar slug with no page). `npm run dev`
  serves http://localhost:4321.
- Deploys on Cloudflare Pages from `main`. Branch and open a PR; never push to `main`.
- The docs mirror the cawdev repository (`GUIDE.md`, READMEs under `tools/`,
  `openapi.yaml`); that repo is the source of truth and the site follows it.
- Conventions are in `README.md`: example URL `https://app.cawdev.com`; a page
  using a Starlight component (`<Steps>`, `<Card>`) must be `.mdx`.
- Mark text waiting on unbuilt product work with `<!-- WAITS: R123 -->` so
  `grep -rn 'WAITS:' src/` finds it before release.
