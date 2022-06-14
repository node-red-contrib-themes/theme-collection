# Node-RED Contrib Theme Collection

![npm (scoped)][npm-version-badge]
[![NPM Publish][npm-publish-badge]][npm-publish-workflow]
![Maintenance][maintenance-badge]
[![Project license][license-badge]][license]

A collection of themes for [Node-RED][node-red].

[Report a Bug][bug-report]
·
[Request a Theme][tr]
·
[Ask a Question][question]

<details open="open">
<summary>Table of Contents</summary>

- [Theme list](#theme-list)
- [Installation](#installation)
  - [Install with npm](#install-with-npm)
- [Usage](#usage)
  - [Themed Scrollbars](#themed-scrollbars)
  - [Monaco Editor Theme](#monaco-editor-theme)
- [Contributing](#contributing)
- [License](#license)
- [Show your support](#show-your-support)

</details>

## Theme list

|Name|Description|
|---|---|
|`cobalt2`|Based on the [Cobalt2 Theme for VS Code][theme-cobalt2] by [Wes Bos][wes-bos]|
|`dark`|A dark theme for Node-RED|
|`dracula`|Based on the [Dracula theme][theme-dracula] by [Zeno Rocha][zeno-rocha]|
|`midnight-red`|Based on the [Midnight theme][theme-midnight] for [Home Assistant][home-assistant]|
|`oled`|A Node-RED dark theme for OLED displays|
|`solarized-dark`|Based on the [Solarized color palette][solarized] by [Ethan Schoonover][schoonover]|
|`solarized-light`|Based on the [Solarized color palette][solarized] by [Ethan Schoonover][schoonover]|

If you have an idea for a new theme, you can [suggest it][tr] or even [create it yourself](.github/CONTRIBUTING.md).

## Installation

### Install with npm

Run the following command from within the Node-RED user data directory (by default, `$HOME/.node-red`).

```shell
npm install @node-red-contrib-themes/theme-collection
```

***NOTE**: The command above installs the latest version of the theme collection, which is compatible with Node-RED 3.0. For Node-RED version 2.2.X, run `npm install @node-red-contrib-themes/theme-collection@v2.2`.*

## Usage

Set `theme: "<theme-name>"` in the `editorTheme` object in your `settings.js` and then restart Node-RED.

For example, this sets Node-RED to use the `dark` theme.

```js
editorTheme: {
    theme: "dark"
},
```

***NOTE:** For details on the Node-RED's configuration file and its structure, please refer to the [Node-RED official documentation][node-red-doc].*

### Themed Scrollbars

Includes the theme and changes the scrollbars to make them better fit the theme.

Add `-scroll` to the name of the theme you chose.

For example, this sets Node-RED to use the `midnight-red` theme with themed scrollbars.

```js
editorTheme: {
    theme: "midnight-red-scroll"
},
```

### Monaco Editor Theme

Each theme in this collection comes with a pre-configured theme for the Monaco editor.

Just leave `theme` in the `codeEditor` object commented out.

For example, this sets Node-RED to use the `dracula` theme and its pre-configured theme for the Monaco editor.

```js
editorTheme: {
    theme: "dracula",
    codeEditor: {
        lib: "monaco",
        options: {
            // theme: "",
        },
    },
},
```

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Please read [our contribution guidelines](./.github/CONTRIBUTING.md), and thank you for being involved!

## License

This project is licensed under the [MIT license][license].

## Show your support

Please ⭐️ this repository if this project helped you!

<a href="https://www.buymeacoffee.com/mbonani" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" height="60px"></a>

[bug-report]: https://github.com/node-red-contrib-themes/theme-collection/issues/new?assignees=&labels=bug&template=01_bug_report.yml
[home-assistant]: https://home-assistant.io
[license-badge]: https://img.shields.io/github/license/node-red-contrib-themes/theme-collection.svg
[license]: LICENSE
[maintenance-badge]: https://img.shields.io/maintenance/yes/2022
[node-red-doc]: https://nodered.org/docs/user-guide/runtime/configuration#editor-themes
[node-red]: https://nodered.org/
[npm-publish-badge]: https://github.com/node-red-contrib-themes/theme-collection/actions/workflows/npm-publish.yml/badge.svg
[npm-publish-workflow]: https://github.com/node-red-contrib-themes/theme-collection/actions/workflows/npm-publish.yml
[npm-version-badge]: https://img.shields.io/npm/v/@node-red-contrib-themes/theme-collection?logo=npm
[question]: https://github.com/node-red-contrib-themes/theme-collection/discussions/new?category=general
[schoonover]: https://ethanschoonover.com
[solarized]: https://ethanschoonover.com/solarized/
[theme-cobalt2]: https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2
[theme-dracula]: https://draculatheme.com/
[theme-midnight]: https://community.home-assistant.io/t/midnight-theme/28598
[tr]: https://github.com/node-red-contrib-themes/theme-collection/issues/new?assignees=&labels=theme-request&template=02_theme_request.yml&title=
[wes-bos]: http://www.wesbos.com/
[zeno-rocha]: https://zenorocha.com/
