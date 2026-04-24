# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node 22 is required (see `.nvmrc`). Run `nvm use` before npm commands.

```bash
npm install              # install Node dependencies (use npm ci for a clean, lockfile-strict install — what CI runs)
npm run build            # build assets + run Eleventy → _site/
npm run build:assets     # compile CSS, JS, copy fonts/vendor, optimize images only
npm run build:eleventy   # run Eleventy only (templates → _site/)
npm run serve            # Eleventy dev server with live reload
npm run build:css        # compile both Sass files (main + resume)
npm run build:js         # bundle and minify JS with esbuild
npm run build:img        # optimize images with sharp (src/img/ → assets/img/)
```

## Architecture

This is an Eleventy (11ty) static site with an npm-scripts asset pipeline. There are two pages: `index.html` (home/particle theme, uses `default` layout) and `resume.html` (standalone resume, no layout).

**Content lives entirely in `_data/` as YAML files** — editing content means editing these files, not HTML:
- `experience.yml` — work history, supports multiple job titles per company
- `projects.yml` — portfolio projects
- `skills.yml` — skill highlights (title + markdown content block)
- `education.yml` — education history
- `about.yml` — about section content
- `site.yml` — site-wide config (name, email, social links, etc.)

**Asset pipeline (npm scripts → `assets/`):**
- `src/styles/main.scss` → Sass CLI → `assets/css/main.css`
- `src/styles/resume.scss` → Sass CLI (load-path `_sass/`) → `assets/resume.css`
- `src/js/app.js` → esbuild (minify) → `assets/js/main.js`
- `src/js/vendor/` → cpx2 → `assets/js/`
- `src/fonts/` → cpx2 → `assets/fonts/`
- `src/img/` → sharp (optimize) → `assets/img/`

Compiled `assets/` files are NOT committed to the repo — they are built by CI.

**Eleventy config** is in `eleventy.config.mjs`. Key additions:
- YAML data extension (`js-yaml`) — required since Eleventy v3 has no built-in YAML support
- `markdownify` filter (markdown-it) — renders markdown strings to HTML
- `cgi_escape` filter — URI-encodes strings

**Templates** use Liquid (LiquidJS via Eleventy). Key differences from Jekyll Liquid:
- Include syntax: `{% include "file.html" %}` (with quotes)
- Include with variables: `{% include "file.html", key: value %}` (not `key=value`)
- Variables from `include` are local (not `include.key`): use `key` directly
- Dynamic includes: `{% assign f = var | prepend: "..." %} {% include f, key: val %}`
- Data accessed as top-level: `about.content`, `projects`, `experience` (not `site.data.*`)
- Site config accessed as `site.*` from `_data/site.yml`

**Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) builds on push to `master` and deploys to GitHub Pages via artifact upload. The Pages source must be set to "GitHub Actions" in the repo settings.

**Dev loop:** `npm run serve` only watches Eleventy templates/data; it does not re-run the asset pipeline. After editing Sass or JS, re-run `npm run build:css` or `npm run build:js` in another terminal.

**Sass deprecation warnings:** `@import` is deprecated in Dart Sass, but the partials and the third-party resume theme in `_sass/` still use it. The warnings are intentionally not suppressed — a full migration to `@use`/`@forward` is the fix, not flag-hiding.

**`_site/` is the build output** — never edit files there directly.
