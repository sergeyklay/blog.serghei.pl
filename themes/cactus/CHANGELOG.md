# Change log

## Added

- Add `text-size-adjust` SCSS mixin
- Add `manifest.webmanifest` support
- Add Google Tag Manager support
- Add ability to hide site title using `hide_site_title` and use only page title
- Add `transition` SCSS mixin

## Changed

- Get rid of jQuery as a dependency and rewrite `main.js` in vanilla JS
- Replace downloaded JetBrains Mono fonts font with Google fonts
- Increase font size for the overall site
- Simplified setting of language and direction for the site by using the
  `site.Language.LanguageCode` and `site.Language.LanguageDirection` variables.
- Theme now looks for custom CSS files in the `assets/css` directory instead of
  the `static/css` directory.
- Replace FontAwesome icons with Boxicons
- Reduce overall public directory size
- Rework the post action menu icons size and position making style more stable
- Increase the size of the post action menu icons
- Hide site menus and navigation on print view
- Use JetBrains Mono font for `pre`, `code`,`time`, `#header`, `#footer`,
  `#projects a` and all headings, and Nunito for the rest of content
- Change color accents fow `white` theme to be more neutral

## Removed

- Remove not used `no-select` SCSS mixin
- Remove not used `font-family-tt` variable from SCSS
- Remove dead code from HTML layouts
- Remove unused `$icon_class_name` variable from HTML layouts

## Fixed

- Fix issue: [#141](https://github.com/monkeyWzr/hugo-theme-cactus/issues/141)
  (PR [#145](https://github.com/monkeyWzr/hugo-theme-cactus/pull/145))
- Fix `text-size-adjust` CSS property for `<html>` tag
- Add missed `color-scheme` CSS property
- (PR [#135](https://github.com/monkeyWzr/hugo-theme-cactus/pull/135))
- Correct some social share links
- Correct mixins definition (order of browser prefixes)
- Fix placement of `blockquote`, `.pullquote`, and `.caption` style definition
  in SCSS
- Fix setting margin for `blockquote`'s `footer` in SCSS
