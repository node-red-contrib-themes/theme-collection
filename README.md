# Node-RED Contrib Theme Collection

[![npm (scoped)][npm-version-badge]][npm-package]
[![Release Publish][release-publish-badge]][release-publish-workflow]
[![Project license][license-badge]][license]

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

- aurora
- cobalt2
- dark
- dracula
- espresso-libre
- github-dark
- github-dark-default
- github-dark-dimmed
- midnight-red
- monoindustrial
- monokai
- monokai-dimmed
- night-owl
- noctis
- oceanic-next
- oled
- one-dark-pro
- one-dark-pro-darker
- railscasts-extended
- selenized-dark
- selenized-light
- solarized-dark
- solarized-light
- tokyo-night
- tokyo-night-light
- tokyo-night-storm
- totallyinformation
- zenburn

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
[release-publish-badge]: https://img.shields.io/github/actions/workflow/status/node-red-contrib-themes/theme-collection/release-publish.yml?style=for-the-badge
[release-publish-workflow]: https://github.com/node-red-contrib-themes/theme-collection/actions/workflows/release-publish.yml
[tr]: https://github.com/node-red-contrib-themes/theme-collection/discussions/new?category=theme-request
