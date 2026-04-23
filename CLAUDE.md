# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i                 # install Node dependencies (Jekyll must be installed separately)
npm run build         # build the Jekyll site to _site/
npm run serve         # serve the site with Jekyll's built-in server
gulp                  # compile assets + launch browser-sync with live reload (preferred for development)
gulp sass             # compile and minify Sass only
gulp js               # bundle and minify JavaScript only
gulp imagemin         # optimize images only
```

Jekyll must be installed as a Ruby gem (`gem install jekyll bundler`) — it is not managed by npm.

## Architecture

This is a Jekyll static site with a Gulp asset pipeline. There are two distinct pages: `index.html` (home/particle theme) and `resume.html` (resume theme), each with their own set of `_includes/`.

**Content lives entirely in `_data/` as YAML files** — editing content means editing these files, not HTML:
- `experience.yml` — work history, supports multiple job titles per company
- `projects.yml` — portfolio projects
- `skills.yml` — skill categories and items
- `education.yml` — education history
- `about.yml` — about section content

**Asset pipeline (Gulp → `assets/`):**
- `src/styles/**/*.scss` → compiled and minified → `assets/css/`
- `src/js/**/*.js` → concatenated into `main.js` and minified → `assets/js/`
- `src/fonts/` → copied to `assets/fonts/`
- `src/img/` → optimized → `assets/img/`

Compiled `assets/` files are committed to the repo (required for GitHub Pages).

**Deployment:** GitHub Actions automatically deploys to GitHub Pages on push to the main branch. The site is served at caseylawrence.dev via the `CNAME` file.

**`_site/` is the build output** — never edit files there directly.
