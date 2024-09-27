# Cactus 2 - A Modern Take on the Cactus Theme for Hugo

A hugo theme for personal blog.

## Overview

This project is a complete reimplementation of the
[Cactus Theme](https://github.com/monkeyWzr/hugo-theme-cactus), initially
created by [monkeyWzr](https://github.com/monkeyWzr) for Hugo. The original
theme has not been actively maintained for over five years, with issues
unresolved and pull requests ignored. Given the lack of updates and the
evolving needs of modern web development, I have decided to rebuild this
theme from scratch while preserving its core design ethos.

This version introduces significant improvements in terms of performance,
maintainability, and new features, all while maintaining the aesthetic and
structure that made the original theme popular.

All credit for the original design and inspiration goes to
[monkeyWzr](https://github.com/monkeyWzr). This project is not affiliated with
them and should be considered an independent evolution of their work.

## Changes from the Original Theme

For details on the changes from the original theme, please refer to the
[CHANGELOG](CHANGELOG.md).

## Configuration

### Color themes

To change the main color theme, you can use the `colorTheme` configuration
parameter, as shown below:

```yaml
params:
  colorTheme: dark
```

The demo site uses a feature that splits configuration into separate files,
so if your project follows the same structure, the `colorTheme` parameter should
be located in the `params.yaml` file, simply at the root, like this:

```yaml
colorTheme: light
```

The currently supported themes are: dark, light, white, and classic.

If no value is provided, or if you remove the `colorTheme` parameter altogether,
the theme defaults to white.

### Custom CSS

At the moment, the theme does not support arbitrary changes to fonts, custom
colors, or other visual elements beyond those predefined by the theme. However,
the theme provides a way for you to add your own custom styles to your project.

To do this, add the following to your project configuration:

```yaml
params:
  css:
    - css/custom.css
```

You can add multiple custom stylesheets which will be loaded after the main
theme css. For example, the above line will load the CSS-file placed at
`assets/css/custom.css`.

This allows you to override or extend the theme’s default styles with your own
customizations.
