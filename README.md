# Node-RED Contrib Theme Collection

[![npm (scoped)][npm-version-badge]][npm-package]
[![Release Publish][release-publish-badge]][release-publish-workflow]
[![Project license][license-badge]][license]

A collection of themes for [Node-RED][node-red].

<a href="https://github.com/node-red-contrib-themes/theme-collection/blob/screenshots/README.md" target="_blank">📸 See the screenshots</a>

## Table of Contents

- [Installation](#installation)
  - [Install via the Palette Manager](#install-via-the-palette-manager)
  - [Install with npm](#install-with-npm)
- [Theme list](#theme-list)
- [Usage](#usage)
  - [Monaco Editor Theme](#monaco-editor-theme)
  - [Mermaid Theme](#mermaid-theme)
- [Development](#development)
- [License](#license)

## Installation

### Install via the Palette Manager

Search for @node-red-contrib-themes/theme-collection

### Install with npm

Run the following command from within the Node-RED user data directory (by default, `$HOME/.node-red`).

```shell
npm install @node-red-contrib-themes/theme-collection
```

## Theme list

<a href="https://github.com/node-red-contrib-themes/theme-collection/blob/screenshots/README.md" target="_blank">📸 See the screenshots</a>

| Name                  | Description                                                                          |
| --------------------- | ------------------------------------------------------------------------------------ |
| `aurora`              | Inspired by the [Aurora Theme for Sublime Text][theme-aurora]                        |
| `cobalt2`             | Based on the [Cobalt2 Theme for VS Code][theme-cobalt2]                              |
| `dark`                | A dark theme for Node-RED based on VS Code's Dark Modern theme                       |
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
| `tokyo-night-light`   | Based on the Tokyo Night Light theme from [Tokyo Night theme][theme-tokyo-night]     |
| `tokyo-night-storm`   | Based on the Tokyo Night Storm theme from [Tokyo Night theme][theme-tokyo-night]     |
| `totallyinformation`  | Created per request of Julian Knight \([@TotallyInformation][totally-information]\)  |
| `zenburn`             | Inspired by the [Zenburn color scheme for Vim][theme-zenburn]                        |

If you have an idea for a new theme, you can request it [here][tr], or better yet, [create one yourself][creating-a-new-theme].

## Usage

Set `theme: "<theme-name>"` in the `editorTheme` object in your `settings.js` and then restart Node-RED.

For example, this sets Node-RED to use the `midnight-red` theme.

```js
editorTheme: {
    theme: "midnight-red"
},
```

For details on the Node-RED's configuration file and its structure, please refer to the [Node-RED official documentation][node-red-doc].

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

### Mermaid Theme

Each theme in this collection comes with a pre-configured theme for the Mermaid diagramming and charting tool.

Just leave `theme` in the `mermaid` object commented out.

For example, this sets Node-RED to use the `dark` theme and its pre-configured theme for the Mermaid diagramming and charting tool.

```js
editorTheme: {
    theme: "dark",
    mermaid: {
        // theme: "",
    },
},
```

## Development

Please refer to the [`DEVELOPMENT.md`][development] file for details on how to set up a local development environment.

## License

This project is licensed under the [MIT license][license].

[creating-a-new-theme]: DEVELOPMENT.md
[development]: DEVELOPMENT.md
[license-badge]: https://img.shields.io/github/license/node-red-contrib-themes/theme-collection.svg?style=for-the-badge
[license]: LICENSE
[node-red-doc]: https://nodered.org/docs/user-guide/runtime/configuration#editor-themes
[node-red]: https://nodered.org/
[npm-package]: https://www.npmjs.com/package/@node-red-contrib-themes/theme-collection
[npm-version-badge]: https://img.shields.io/npm/v/@node-red-contrib-themes/theme-collection?logo=npm&style=for-the-badge
[release-publish-badge]: https://img.shields.io/github/actions/workflow/status/node-red-contrib-themes/theme-collection/release-publish.yml?style=for-the-badge&label=Publish
[release-publish-workflow]: https://github.com/node-red-contrib-themes/theme-collection/actions/workflows/release-publish.yml
[solarized]: https://ethanschoonover.com/solarized/
[theme-aurora]: https://github.com/expalmer/aurora-theme/
[theme-cobalt2]: https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2
[theme-dracula]: https://draculatheme.com/
[theme-espresso-libre]: https://github.com/brijeshb42/monaco-themes/blob/master/themes/Espresso%20Libre.json
[theme-github]: https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme
[theme-midnight]: https://community.home-assistant.io/t/midnight-theme/28598
[theme-monoindustrial]: https://github.com/brijeshb42/monaco-themes/blob/master/themes/monoindustrial.json
[theme-monokai-dimmed]: https://github.com/microsoft/vscode/tree/main/extensions/theme-monokai-dimmed
[theme-monokai]: https://github.com/microsoft/vscode/tree/main/extensions/theme-monokai
[theme-noctis]: https://marketplace.visualstudio.com/items?itemName=liviuschera.noctis
[theme-oceanic-next]: https://github.com/voronianski/oceanic-next-color-scheme
[theme-one-dark-pro]: https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme
[theme-tokyo-night]: https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night
[theme-zenburn]: https://github.com/jnurmine/Zenburn
[totally-information]: https://github.com/TotallyInformation
[tr]: https://github.com/node-red-contrib-themes/theme-collection/discussions/new?category=theme-request
