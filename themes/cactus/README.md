# Cactus 2

A Modern Take on the Cactus Theme for Hugo.

## Overview

This project is a complete reimplementation of the
[Cactus Theme](https://github.com/monkeyWzr/hugo-theme-cactus), initially
created by [Zeran Wu](https://github.com/monkeyWzr) for Hugo. The original
theme has not been actively maintained for over five years, with issues
unresolved and pull requests ignored. Given the lack of updates and the
evolving needs of modern web development, I have decided to rebuild this
theme from scratch while preserving its core design ethos.

This version introduces significant improvements in terms of performance,
maintainability, and new features, all while maintaining the aesthetic and
structure that made the original theme popular.

All credit for the original design and inspiration goes to
[Zeran Wu](https://github.com/monkeyWzr). This project is not affiliated with
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
`assets/css/custom.css`. The original theme used the `static/css` directory, but
this has been changed to `assets/css` to align with Hugo’s asset management
system. Please note that the path is relative to the root of your project.

This allows you to override or extend the theme’s default styles with your own
customizations.

### Integrating Analytics with Cactus 2

Cactus 2 provides seamless integration options to harness the power of Google
Analytics and Google Tag Manager, ensuring you can monitor the performance and
user engagement of your site effortlessly. To activate these services, a few
configurations must be set up within your Hugo project’s configuration file.
This section guides you through the process, highlighting the nuances and
preferences within Cactus’ theme.

#### Setting Up Google Analytics

To enable Google Analytics, you first need to obtain your tracking ID from the
Google Analytics dashboard. Once you have it, add the following to your
configuration file:

~~~ toml
[services]
  [services.googleAnalytics]
    ID = 'G-MEASUREMENT_ID'
~~~

This snippet tells Hugo to include the Google Analytics tracking code in your
site. However, merely providing the ID is not enough. You must also explicitly
enable Google Analytics by modifying the privacy settings:

~~~ toml
[privacy]
  [privacy.googleAnalytics]
    disable = false
~~~

For a more privacy-conscious implementation, you can configure Ed to respect
users' “Do Not Track” browser settings. This ensures that visitors who prefer
not to be tracked are excluded from analytics data:

~~~ toml
[privacy]
  [privacy.googleAnalytics]
    disable = false
    respectDoNotTrack = true
~~~

When `respectDoNotTrack` is set to `true`, Cactus 2 will honor the user's
preference, making your site more respectful of user privacy choices.

#### Configuring Google Tag Manager

If you prefer to use Google Tag Manager instead of Google Analytics, Cactus 2
has built-in support for it as well. Google Tag Manager offers more flexibility,
allowing you to manage various tags — such as conversion tracking, remarketing,
and more — through a single platform.

To configure Google Tag Manager, add your container ID in the following format:

~~~ toml
[params]
  [params.services]
    [params.services.googleTagManager]
      id = 'GTM-MEASUREMENT_ID'
~~~

As with Google Analytics, simply adding the ID does not enable tracking by
itself. You must adjust the corresponding privacy settings to activate it:

~~~ toml
[params]
  [params.privacy]
    [params.privacy.googleTagManager]
      disable = false
      respectDoNotTrack = true
~~~

Here, setting `disable` to `false` activates Google Tag Manager, while the
`respectDoNotTrack` option enables the same privacy-conscious behavior as
described for Google Analytics.

#### Important Considerations

- **Mutual Exclusivity of Services:** Cactus 2 only supports activating _either_
  Google Analytics _or_ Google Tag Manager, but not both simultaneously. This is
  by design — Google Tag Manager, when enabled, forwards data to Google
  Analytics internally. Therefore, enabling both services would result in
  redundant tracking and could potentially skew your metrics.
- **Configuration File Locations:** Note that the configuration structures
  differ slightly:
    - Google Analytics settings reside under the root configuration sections.
    - Google Tag Manager settings are nested within the `[params]` section of
      your configuration file.

When both configurations are present, Ed prioritizes Google Tag Manager,
bypassing the Google Analytics settings entirely. This makes your setup simpler
and more robust, avoiding conflicting tracking scripts.

#### Making the Choice

So, which should you choose? It depends on your needs:

- **Google Analytics** is ideal for straightforward tracking and reporting
  without additional complexity.
- **Google Tag Manager** is recommended if you need advanced tag management,
  custom events, or multiple analytics integrations.

When you decide, set up the configurations accordingly and let Ed handle the rest.
