# Node-RED Contrib Theme Collection

[![npm (scoped)][npm-version-badge]][npm-package]
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

- [Installation](#installation)
  - [Install with npm](#install-with-npm)
- [Theme list](#theme-list)
- [Usage](#usage)
  - [Themed Scrollbars \[DEPRECATED\]](#themed-scrollbars-deprecated)
  - [Monaco Editor Theme](#monaco-editor-theme)
- [Contributing](#contributing)
- [License](#license)
- [Show your support](#show-your-support)

</details>

## Installation

### Install with npm

Run the following command from within the Node-RED user data directory (by default, `$HOME/.node-red`).

```shell
npm install @node-red-contrib-themes/theme-collection
```

***NOTE**: The command above installs the latest version of the theme collection, which is compatible with Node-RED 3.0 and later. For Node-RED version 2.2.X, run `npm install @node-red-contrib-themes/theme-collection@v2.2`.*

## Theme list

| Name                  | Description                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ |
| `aurora`              | Inspired by the [Aurora Theme for Sublime Text][theme-aurora]                        |
| `cobalt2`             | Based on the [Cobalt2 Theme for VS Code][theme-cobalt2]                              |
| `dark`                | A dark theme for Node-RED                                                            |
| `dracula`             | Based on the [Dracula theme][theme-dracula]                                          |
| `espresso-libre`      | Inspired by the [Espresso Libre theme for Monaco Editor][theme-espresso-libre]       |
| `github-dark`         | Based on the GitHub Dark (legacy) theme from [GitHub's VS Code themes][theme-github] |
| `github-dark-default` | Based on the GitHub Dark Default theme from [GitHub's VS Code themes][theme-github]  |
| `github-dark-dimmed`  | Based on the GitHub Dark Dimmed theme from [GitHub's VS Code themes][theme-github]   |
| `midnight-red`        | Based on the [Midnight theme for Home Assistant][theme-midnight]                     |
| `monoindustrial`      | Based on the [monoindustrial theme for Monaco Editor][theme-monoindustrial]          |
| `monokai`             | Based on the [Monokai theme for VS Code][theme-monokai]                              |
| `monokai-dimmed`      | Based on the [Monokai Dimmed theme][theme-monokai-dimmed] for VS Code                |
| `noctis`              | Inspired by the [Noctis theme][theme-noctis] for VS Code                             |
| `oceanic-next`        | Based on the [Oceanic Next Color Scheme][theme-oceanic-next]                         |
| `oled`                | A Node-RED dark theme for OLED displays                                              |
| `one-dark-pro`        | Based on the Default theme from [One Dark Pro][theme-one-dark-pro]                   |
| `one-dark-pro-darker` | Based on the Darker theme from [One Dark Pro][theme-one-dark-pro]                    |
| `solarized-dark`      | Based on the [Solarized color palette][solarized]                                    |
| `solarized-light`     | Based on the [Solarized color palette][solarized]                                    |
| `tokyo-night`         | Based on the Tokyo Night theme from [Tokyo Night theme][theme-tokyo-night]           |
| `tokyo-night-storm`   | Based on the Tokyo Night Storm theme from [Tokyo Night theme][theme-tokyo-night]     |
| `zenburn`             | Inspired by the [Zenburn color scheme for Vim][theme-zenburn]                        |

If you have an idea for a new theme, you can request it [here][tr], or better yet, [create one yourself][creating-a-new-theme].

## Usage

Set `theme: "<theme-name>"` in the `editorTheme` object in your `settings.js` and then restart Node-RED.

For example, this sets Node-RED to use the `dark` theme.

```js
editorTheme: {
    theme: "dark"
},
```

***NOTE:** For details on the Node-RED's configuration file and its structure, please refer to the [Node-RED official documentation][node-red-doc].*

### Themed Scrollbars [DEPRECATED]

***NOTE:** This feature is now deprecated and will be removed in the next major release.*

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

Please read [our contribution guidelines][contribution-guidelines], and thank you for being involved!

## License

This project is licensed under the [MIT license][license].

## Show your support

Please ⭐️ this repository if this project helped you!

<a href="https://www.buymeacoffee.com/mbonani" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" height="60px"></a>

[bug-report]: https://github.com/node-red-contrib-themes/theme-collection/issues/new?assignees=&labels=bug&template=01_bug_report.yml
[contribution-guidelines]: .github/CONTRIBUTING.md
[creating-a-new-theme]: DEVELOPMENT.md
[license-badge]: https://img.shields.io/github/license/node-red-contrib-themes/theme-collection.svg
[license]: LICENSE
[maintenance-badge]: https://img.shields.io/maintenance/yes/2023
[node-red-doc]: https://nodered.org/docs/user-guide/runtime/configuration#editor-themes
[node-red]: https://nodered.org/
[npm-package]: https://www.npmjs.com/package/@node-red-contrib-themes/theme-collection
[npm-publish-badge]: https://github.com/node-red-contrib-themes/theme-collection/actions/workflows/npm-publish.yml/badge.svg
[npm-publish-workflow]: https://github.com/node-red-contrib-themes/theme-collection/actions/workflows/npm-publish.yml
[npm-version-badge]: https://img.shields.io/npm/v/@node-red-contrib-themes/theme-collection?logo=npm
[question]: https://github.com/node-red-contrib-themes/theme-collection/discussions/new?category=q-a
[solarized]: https://ethanschoonover.com/solarized/
[theme-aurora]: https://github.com/expalmer/aurora-theme/
[theme-cobalt2]: https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2
[theme-dracula]: https://draculatheme.com/
[theme-espresso-libre]: https://github.com/brijeshb42/monaco-themes/blob/master/themes/Espresso%20Libre.json
[theme-github]: https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme
[theme-midnight]: https://community.home-assistant.io/t/midnight-theme/28598
[theme-monoindustrial]: https://github.com/brijeshb42/monaco-themes/blob/master/themes/monoindustrial.json
[theme-monokai]: https://github.com/microsoft/vscode/tree/main/extensions/theme-monokai
[theme-monokai-dimmed]: https://github.com/microsoft/vscode/tree/main/extensions/theme-monokai-dimmed
[theme-noctis]: https://marketplace.visualstudio.com/items?itemName=liviuschera.noctis
[theme-oceanic-next]: https://github.com/voronianski/oceanic-next-color-scheme
[theme-one-dark-pro]: https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme
[theme-zenburn]: https://github.com/jnurmine/Zenburn
[theme-tokyo-night]: https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night
[tr]: https://github.com/node-red-contrib-themes/theme-collection/issues/new?assignees=&labels=theme-request&template=02_theme_request.yml&title=
