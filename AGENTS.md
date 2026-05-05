# AGENTS.md

## Project Overview

- Personal static site for `caseylawrence.dev`, built with Eleventy plus an npm-script asset pipeline.
- The site has two main pages: the home page using the Particle theme and `/resume/` using a customized Modern Resume theme.

## Commands

- Install: `nvm use` then `npm install`; CI uses `npm ci`.
- Dev server: `npm run serve`.
- Full build: `npm run build`.
- Build assets only: `npm run build:assets`.
- Build Eleventy only: `npm run build:eleventy`.
- Build CSS: `npm run build:css`.
- Build JS: `npm run build:js`.
- Build images: `npm run build:img`.
- Test: no automated test suite is configured; use `npm run build` as the primary validation.
- Lint/typecheck: none configured.

## Working Rules

- Use Node 22 (`.nvmrc` and GitHub Actions both pin Node 22).
- Do not edit `_site/`; it is generated output.
- Do not hand-edit generated files in `assets/`; update `src/` and run the relevant build script.
- Treat `_data/*.yml` as the source of site/resume content:
  - Edit work history in `_data/experience.yml`.
  - Edit portfolio projects in `_data/projects.yml`.
  - Edit skill highlights in `_data/skills.yml`.
  - Edit education in `_data/education.yml`.
  - Edit about copy in `_data/about.yml`.
  - Edit site-wide identity/social metadata in `_data/site.yml`.
- Keep templates responsible for structure, not resume/project prose.
- Preserve the two-page shape unless explicitly asked to redesign routing:
  - `index.html` is front matter only and renders through `_layouts/default.html`.
  - `resume.html` is standalone and writes to `/resume/`.
- `npm run serve` watches Eleventy templates/data, but it does not rebuild Sass, JS, fonts, vendor JS, or optimized images.
- After Sass/JS/image/font/vendor changes, run the specific asset build or `npm run build` before checking the site.
- GitHub Pages deploys from GitHub Actions on pushes to `master`; Pages settings must use "GitHub Actions" as the source.

## Codebase Structure

- `eleventy.config.mjs`:
  - Registers YAML data support through `js-yaml`.
  - Passes through `assets/`, `favicon.ico`, and `CNAME`.
  - Defines `markdownify` and `cgi_escape` filters.
- `_data/`: YAML content and site metadata consumed as top-level Liquid variables.
- `_layouts/default.html`: home page shell.
- `_includes/home/`: home page sections and partials.
- `_includes/resume/`: resume sections and layout partials.
- `src/styles/main.scss`: home page Sass entry.
- `src/styles/resume/resume.scss`: resume Sass entry.
- `src/js/app.js`: bundled/minified home page JS entry.
- `src/js/vendor/`: copied to `assets/js/`.
- `src/fonts/`: copied to `assets/fonts/`.
- `src/img/`: optimized by `scripts/optimize-images.mjs` into `assets/img/`.
- `.github/workflows/deploy.yml`: `npm ci`, `npm run build`, upload `_site`.

## Code Style & Conventions

- Eleventy templates use LiquidJS, not Jekyll Liquid.
- Use quoted include paths: `{% include "home/about.html" %}`.
- Pass include variables with colon syntax: `{% include "home/project.html", item: project %}`.
- Included variables are accessed directly (`item`, `href`, `class`), not through `include.item`.
- For dynamic includes, assign the path to a variable first: `{% assign f = var | prepend: "..." %}{% include f, key: val %}`.
- Data files are top-level variables in templates (`about`, `projects`, `experience`, `site`), not `site.data.*`.
- Use `markdownify` for YAML strings that intentionally contain markdown.
- Use `cgi_escape` plus `escape` for social/profile URL path segments.
- Match existing Sass organization with partial imports; do not migrate `@import` piecemeal.
- Sass deprecation warnings from `@import` are expected; fix by a coordinated `@use`/`@forward` migration, not by hiding warnings.
- Match local JS style by file: config/scripts use single quotes; legacy browser particle config uses its existing quoted object style.

## Testing Expectations

- Run `npm run build` before handing off changes that affect templates, data, assets, or config.
- For content-only YAML changes, still build to catch malformed YAML, missing fields, and Liquid rendering errors.
- For Sass changes, verify both `assets/css/main.css` and `assets/resume.css` build.
- For JS changes, verify `npm run build:js` and check the home page because `src/js/app.js` depends on global `SweetScroll` and `particlesJS`.
- For image changes, put source files in `src/img/` and run `npm run build:img`.
- Manually inspect home and `/resume/` after meaningful layout/content changes.

## Project-Specific Pitfalls

- `assets/` and `_site/` are ignored; CI rebuilds them and deploys `_site`.
- `eleventy.config.mjs` input is repo root (`.`), so root HTML files are real templates.
- `CNAME` and `favicon.ico` are passthrough files; do not move them without updating Eleventy config.
- `resume/a.html` prepends `//` to links that do not start with `http`; pass full URLs when protocol-specific behavior matters.
- Resume entries support either `job_title`/`dates` or a `jobs:` list; preserve the existing shape for multi-title companies.
- `projects.yml` image paths should point at `/assets/img/...`, but source images belong in `src/img/`.
- The resume theme and home theme have separate Sass trees; changes to one usually do not affect the other.
- Do not assume Jekyll filters or include semantics work here; this is Eleventy 3 with LiquidJS.
- The deploy branch is `master`, not `main`.

## Code review

When performing a review:

- Follow `.ai/code_review.md`
- Write results to `.ai/reviews/current.md`
- Overwrite the file each run
- Only include actionable issues (no summaries or praise)
- Group findings by severity
