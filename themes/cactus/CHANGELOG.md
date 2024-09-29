# Change log

## Added

- Add `text-size-adjust`, `transition`, and `border-radius` SCSS mixins
- Add `manifest.webmanifest` support
- Add Google Tag Manager support
- Add ability to hide site title using `hide_site_title` and use only page title

## Changed

- Get rid of jQuery as a dependency and rewrite `main.js` in vanilla JS
- Replace downloaded JetBrains Mono fonts font with Google fonts
- Use JetBrains Mono font for `pre`, `code`,`time`, `#header`, `#footer`,
  `#projects a` and all headings, and Nunito font for the rest of content
- Increase font size for the overall site
- Simplified setting of language and direction for the site by using the
  `site.Language.LanguageCode` and `site.Language.LanguageDirection` variables.
- Theme now looks for custom CSS files in the `assets/css` directory instead of
  the `static/css` directory.
- Replace FontAwesome downloaded icons with Boxicons and use CDN for them
- Reduce size of built public directory by five times
- Rework the post actions menu icons size and position making style more stable
- Hide site menus and navigation on print view
- Change color accents fow `white` theme to be more neutral
- Rework pagination style to be more consistent
- Rework defining of the author's name in the post layout

## Removed

- Remove not used `no-select` SCSS mixin
- Remove not used `$font-family-tt` variable from SCSS
- Remove dead code from HTML layouts
- Remove unused `$icon_class_name` variable from HTML layouts
- Remove custom pagination layout and use Hugo's default pagination layout

## Fixed

- Fix issue: [#141](https://github.com/monkeyWzr/hugo-theme-cactus/issues/141)
  (PR [#145](https://github.com/monkeyWzr/hugo-theme-cactus/pull/145))
- Fix `text-size-adjust` CSS property for `<html>` tag
- Add missed `color-scheme` CSS property
  (PR [#135](https://github.com/monkeyWzr/hugo-theme-cactus/pull/135))
- Correct some social share links
- Correct mixins definition (order of browser prefixes)
- Fix placement of `blockquote`, `.pullquote`, and `.caption` style definition
  in SCSS
- Fix setting margin for `blockquote`'s `footer` in SCSS
