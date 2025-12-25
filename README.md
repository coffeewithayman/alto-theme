# Alto

A clean, minimalist [Ghost](https://github.com/TryGhost/Ghost) theme featuring a light and dark mode. Launch your online publications with flair.

**Demo: https://alto.ghost.io**

# Instructions

1. [Download this theme](https://github.com/TryGhost/Alto/archive/main.zip)
2. Log into Ghost, and go to the `Design` settings area to upload the zip file

# Development

Styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# Install
yarn

# Run build & watch for changes
yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/alto.zip`, which you can then upload to your site.

```bash
yarn zip
```

# Changelog

## Version 1.1.0 - Author Display Removal (2025-12-25)

### Changed
- **Removed author name displays across the theme** to provide a cleaner, more focused reading experience
  - Removed author box section from single post template (`post.hbs`)
  - Added CSS rules to hide author names in Ghost bookmark cards (when referencing posts with `@article`)
  - Hidden all author-related elements including author boxes, bylines, and metadata

### Technical Details
- Modified `post.hbs` to remove conditional author box rendering
- Updated `assets/css/misc/utilities.css` with comprehensive author-hiding CSS rules
- Targets multiple selectors: `.kg-bookmark-author`, `.author-box`, `.author`, `.post-author`, `.article-author`, `.byline-author`

### Why This Change?
This modification is ideal for publications that want to:
- Maintain a minimalist, content-first approach
- Remove individual attribution in favor of collective/brand identity
- Create a cleaner visual hierarchy without author metadata

### Upgrading
Simply download and install this version. No configuration needed - author names are automatically hidden throughout the theme.

## Version 1.0.0 - Initial Release
- Clean, minimalist design with light and dark mode support
- Featured posts carousel
- Customizable navigation layouts
- Font customization options
- Author boxes and related posts (configurable)

# Contribution

This repo is synced automatically with [TryGhost/Themes](https://github.com/TryGhost/Themes) monorepo. If you're looking to contribute or raise an issue, head over to the main repository [TryGhost/Themes](https://github.com/TryGhost/Themes) where our official themes are developed.

# Copyright & License

Copyright (c) 2013-2025 Ghost Foundation - Released under the [MIT license](LICENSE).
