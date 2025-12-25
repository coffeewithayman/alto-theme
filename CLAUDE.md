# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Alto is a Ghost theme featuring a clean, minimalist design with light and dark mode support. Built for Ghost v5.0+, it uses Gulp for build automation and PostCSS for CSS processing.

## Development Commands

```bash
# Install dependencies
yarn

# Build and watch for changes (runs Gulp default task: build, serve, watch)
yarn dev

# Run theme validation
yarn test

# Create distribution package (builds and creates dist/alto.zip)
yarn zip
```

## Build System

The theme uses Gulp with the following tasks:

- **Default task** (`gulp` or `yarn dev`): Builds CSS/JS, starts LiveReload server, and watches for changes
- **Build task** (`gulp build`): Compiles CSS and JS without watching
- **Zip task** (`gulp zip` or `yarn zip`): Creates distribution package

### CSS Build Process

- Entry point: `assets/css/screen.css`
- Uses PostCSS with `postcss-easy-import`, `autoprefixer`, and `cssnano`
- Output: `assets/built/screen.css` (with source maps)
- CSS is organized into modules imported from `screen.css`:
  - `general/` - fonts and CSS variables
  - `site/` - header, layout, navigation
  - `blog/` - post, pagination, featured, author, related
  - `misc/` - utilities, dark mode, owl carousel

### JS Build Process

- Entry point: `assets/js/main.js`
- Concatenates files from `@tryghost/shared-theme-assets` and local JS
- Uses `gulp-uglify` for minification
- Output: `assets/built/main.min.js` (with source maps)
- Main features: dark mode toggle, Owl Carousel for featured posts

## Theme Architecture

### Template Structure

- **default.hbs**: Base layout with header, footer, and navigation
- **index.hbs**: Homepage post feed
- **post.hbs**: Single post view with author box and related posts
- **page.hbs**: Static page template
- **author.hbs**: Author archive
- **tag.hbs**: Tag archive

### Key Partials

- `partials/loop.hbs`: Post card used in feeds
- `partials/featured.hbs`: Featured posts carousel (homepage only)
- `partials/pagination.hbs`: Pagination controls
- `partials/author-box.hbs`: Author bio on single posts
- `partials/related.hbs`: Related posts on single posts
- `partials/icons/`: SVG icon components

### Custom Theme Settings

Configurable via Ghost Admin (defined in `package.json` config.custom):

- **navigation_layout**: "Logo on the left" | "Logo in the middle" | "Stacked"
- **title_font**: "Modern sans-serif" | "Elegant serif"
- **body_font**: "Modern sans-serif" | "Elegant serif"
- **color_scheme**: "Light" | "Dark"
- **white_logo_for_dark_mode**: Image upload for dark mode logo
- **show_featured_posts**: Toggle featured carousel on homepage
- **show_author**: Toggle author box on posts
- **show_related_posts**: Toggle related posts on posts

### Dark Mode Implementation

- Dark mode class `.dark-mode` applied to `<html>` element
- Can be set via theme settings or toggled by user via `.toggle-track` button
- User preference stored in localStorage as `alto_dark`
- Dark mode styles in `assets/css/misc/dark.css`

## Handlebars Context

The theme uses Ghost's Handlebars helpers:

- `{{#is "home"}}` - Conditional for homepage
- `{{#match @custom.* "value"}}` - Match custom settings
- `{{#get "posts" filter="featured:true"}}` - Fetch featured posts
- `{{navigation}}` and `{{navigation type="secondary"}}` - Navigation menus
- `{{@site.*}}` - Site-wide data (title, logo, members_enabled, etc.)
- `{{@custom.*}}` - Custom theme settings
- `{{@member}}` - Current logged-in member

## Key Files to Edit

- **Styles**: Edit files in `assets/css/`, which compile to `assets/built/screen.css`
- **JavaScript**: Edit `assets/js/main.js`, which compiles to `assets/built/main.min.js`
- **Templates**: Edit `.hbs` files in root or `partials/` directory
- **Theme Config**: Edit `package.json` config section

## Important Notes

- Always run `yarn dev` during development for live reloading
- Built files in `assets/built/` are generated - edit source files instead
- Theme requires Ghost >= 5.0.0
- Uses jQuery 3.5.1 (loaded from CDN in default.hbs)
- Featured posts carousel uses Owl Carousel library


# Instructions

Whenever asked to make a change, see if the change is possible by editing the code injection portion of the website. Either editing the Site Header or Site footer. If you are 95% confident that it is possible, then go ahead and suggest the change. If not, then suggest the edit in the theme.