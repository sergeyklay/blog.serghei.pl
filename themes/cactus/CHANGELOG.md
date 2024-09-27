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
- Split config into small parts and convert it to a human-readable yaml
- Increase font size for the article sidebar
- Simplified setting of language and direction for the site by using the
  `site.Language.LanguageCode` and `site.Language.LanguageDirection` variables.
- Theme now looks for custom CSS files in the `assets/css` directory instead of
  the `static/css` directory.
- Replace FontAwesome icons with Boxicons
- Reduce overall public directory size
- Rework the post action menu icons size and position making style more stable
- Increase the size of the post action menu icons
- Hide site menus and navigation on print view

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
- Use JetBrains Mono font only for `pre` and `code`, and Inconsolate for the rest
