# Node-RED Contrib Theme Collection

A collection of themes for [Node-RED][node-red].

## Theme list

|Name|Description
|---|---
|`cobalt2`|Based on the [Cobalt2 Theme for VS Code][theme-cobalt2] by [Wes Bos][wes-bos]
|`dark`|A dark theme for Node-RED
|`dracula`|Based on the [Dracula theme][theme-dracula] by [Zeno Rocha][zeno-rocha]
|`midnight-red`|Based on the [Midnight theme][theme-midnight] for [Home Assistant][home-assistant]
|`oled`|A Node-RED dark theme for OLED displays
|`solarized-dark`|Based on the [Solarized color palette][solarized] by [Ethan Schoonover][schoonover]
|`solarized-light`|Based on the [Solarized color palette][solarized] by [Ethan Schoonover][schoonover]

## Install

### Install with npm

Run the following command from within the Node-RED user data directory (by default, `$HOME/.node-red`).

```shell
npm install @node-red-contrib-themes/theme-collection
```

## Usage

Set `theme: "<theme-name>"` in the `editorTheme` object in your `settings.js` and then restart Node-RED.

For example, this sets Node-RED to use the `dark` theme.

```js
editorTheme: {
    theme: "dark"
},
```

For details on the Node-RED's configuration file and its structure, please refer to the [Node-RED official documentation][node-red-doc].

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

## License

This project is licensed under the [MIT license][license].

## Show your support

Please ⭐️ this repository if this project helped you!

<a href="https://www.buymeacoffee.com/mbonani" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" height="60px"></a>

[home-assistant]: https://home-assistant.io
[license]: LICENSE
[node-red-doc]: https://nodered.org/docs/user-guide/runtime/configuration#editor-themes
[node-red]: https://nodered.org/
[schoonover]: https://ethanschoonover.com
[solarized]: https://ethanschoonover.com/solarized/
[theme-cobalt2]: https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2
[theme-dracula]: https://draculatheme.com/
[theme-midnight]: https://community.home-assistant.io/t/midnight-theme/28598
[wes-bos]: http://www.wesbos.com/
[zeno-rocha]: https://zenorocha.com/
