# Node-RED Contrib Theme Collection

A collection of themes for [Node-RED][node-red].

## Installation

### Install via the Palette Manager

Search for `@node-red-contrib-themes/theme-collection`

### Install with npm

Run the following command from within the Node-RED user data directory (by default, `$HOME/.node-red`).

```shell
npm install @node-red-contrib-themes/theme-collection
```

## Theme list

<a href="https://github.com/node-red-contrib-themes/theme-collection/blob/screenshots/README.md" target="_blank">📸 Screenshots</a>

| Name                  | Inspiration                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| `aurora`              | [Aurora Theme for Sublime Text][theme-aurora]                           |
| `cobalt2`             | [Cobalt2 Theme for VS Code][theme-cobalt2]                              |
| `dark`                | [Default Dark Modern VS Code theme][theme-dark-modern]                  |
| `dracula`             | [Dracula theme][theme-dracula]                                          |
| `espresso-libre`      | [Espresso Libre theme for Monaco Editor][theme-espresso-libre]          |
| `github-dark`         | [GitHub Dark (legacy) VS Code theme][theme-github]                      |
| `github-dark-default` | [GitHub Dark Default VS Code theme][theme-github]                       |
| `github-dark-dimmed`  | [GitHub Dark Dimmed VS Code theme][theme-github]                        |
| `midnight-red`        | [Midnight theme for Home Assistant][theme-midnight]                     |
| `monoindustrial`      | [Monoindustrial theme for Monaco Editor][theme-monoindustrial]          |
| `monokai`             | [Monokai theme for VS Code][theme-monokai]                              |
| `monokai-dimmed`      | [Monokai Dimmed theme for VS Code][theme-monokai-dimmed]                |
| `night-owl`           | [Night Owl theme for VS Code][theme-night-owl]                          |
| `noctis`              | [Noctis theme collection for VS Code][theme-noctis]                     |
| `noctis-azureus`      | [Noctis theme collection for VS Code][theme-noctis]                     |
| `noctis-bordo`        | [Noctis theme collection for VS Code][theme-noctis]                     |
| `noctis-minimus`      | [Noctis theme collection for VS Code][theme-noctis]                     |
| `noctis-obscuro`      | [Noctis theme collection for VS Code][theme-noctis]                     |
| `noctis-sereno`       | [Noctis theme collection for VS Code][theme-noctis]                     |
| `noctis-uva`          | [Noctis theme collection for VS Code][theme-noctis]                     |
| `noctis-viola`        | [Noctis theme collection for VS Code][theme-noctis]                     |
| `oceanic-next`        | [Oceanic Next Color Scheme][theme-oceanic-next]                         |
| `oled`                | [Tomorrow Night Bright for VS Code][theme-tomorrow-night-bright]        |
| `one-dark-pro`        | [One Dark Pro theme][theme-one-dark-pro]                                |
| `one-dark-pro-darker` | [One Dark Pro Darker theme][theme-one-dark-pro]                         |
| `railscasts-extended` | [Railscasts Extended theme for Sublime Text][theme-railscasts-extended] |
| `selenized-dark`      | [Selenized for VS Code][theme-selenized]                                |
| `selenized-light`     | [Selenized for VS Code][theme-selenized]                                |
| `solarized-dark`      | [Solarized color palette][theme-solarized]                              |
| `solarized-light`     | [Solarized color palette][theme-solarized]                              |
| `tokyo-night`         | [Tokyo Night theme][theme-tokyo-night]                                  |
| `tokyo-night-light`   | [Tokyo Night Light theme][theme-tokyo-night]                            |
| `tokyo-night-storm`   | [Tokyo Night Storm theme][theme-tokyo-night]                            |
| `totallyinformation`  | [Julian Knight's (@TotallyInformation) creation][totally-information]   |
| `zenburn`             | [Zenburn color scheme for Vim][theme-zenburn]                           |
| `zendesk-garden`      | [Garden design system by Zendesk][theme-zendesk-garden]                 |

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
[license]: LICENSE
[node-red-doc]: https://nodered.org/docs/user-guide/runtime/configuration#editor-themes
[node-red]: https://nodered.org/
[theme-aurora]: https://github.com/expalmer/aurora-theme/
[theme-cobalt2]: https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2
[theme-dark-modern]: https://github.com/microsoft/vscode/blob/main/extensions/theme-defaults/themes/dark_modern.json
[theme-dracula]: https://draculatheme.com/
[theme-espresso-libre]: https://github.com/brijeshb42/monaco-themes/blob/master/themes/Espresso%20Libre.json
[theme-github]: https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme
[theme-midnight]: https://community.home-assistant.io/t/midnight-theme/28598
[theme-monoindustrial]: https://github.com/brijeshb42/monaco-themes/blob/master/themes/monoindustrial.json
[theme-monokai-dimmed]: https://github.com/microsoft/vscode/tree/main/extensions/theme-monokai-dimmed
[theme-monokai]: https://github.com/microsoft/vscode/tree/main/extensions/theme-monokai
[theme-night-owl]: https://marketplace.visualstudio.com/items?itemName=sdras.night-owl
[theme-noctis]: https://marketplace.visualstudio.com/items?itemName=liviuschera.noctis#noctis
[theme-oceanic-next]: https://github.com/voronianski/oceanic-next-color-scheme
[theme-one-dark-pro]: https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme
[theme-railscasts-extended]: https://github.com/jzelenkov/sublime-railscasts-extended
[theme-selenized]: https://marketplace.visualstudio.com/items?itemName=santoso-wijaya.helios-selene
[theme-solarized]: https://ethanschoonover.com/solarized/
[theme-tokyo-night]: https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night
[theme-tomorrow-night-bright]: https://github.com/microsoft/vscode-themes/blob/main/tomorrow/themes/Tomorrow_Night_Bright.tmTheme
[theme-zenburn]: https://github.com/jnurmine/Zenburn
[theme-zendesk-garden]: https://garden.zendesk.com
[totally-information]: https://github.com/TotallyInformation
[tr]: https://github.com/node-red-contrib-themes/theme-collection/discussions/new?category=theme-request
