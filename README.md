# Node-RED Contrib Theme Collection

Collection of [Node-RED][node-red] themes published by the [Node-RED Contrib Themes][node-red-contrib-themes] team.

![screenshot](https://raw.githubusercontent.com/node-red-contrib-themes/theme-collection/master/images/screenshot.png)

## Install

### Install with npm

Run the following command from within the Node-RED user data directory (by default, `$HOME/.node-red`).

```shell
npm install @node-red-contrib-themes/theme-collection
```

## Usage

Add the following to the `editorTheme` object in your `settings.js` and then restart Node-RED.

```js
editorTheme: {
    theme: "<theme-name>"
},
```

Replace `<theme-name>` with the name of the theme you want to use. Currently available options:

- `dark`
- `dracula`
- `midnight-red`
- `oled`
- `solarized-dark`
- `solarized-light`

For details on the Node-RED's configuration file and its structure, please refer to the [Node-RED official documentation][node-red-doc].

### Themed Scrollbars (EXPERIMENTAL)

Includes the theme and changes the scrollbars to make them better fit the theme.

**NOTE**: This is ***EXPERIMENTAL*** and may not work on all browsers.

Add the following to the `editorTheme` object in your `settings.js` and then restart Node-RED.

```js
editorTheme: {
    theme: "<theme-name-scroll>"
},
```

Replace `<theme-name-scroll>` with the name of the theme you want to use. Currently available options:

- `dark-scroll`
- `dracula-scroll`
- `midnight-red-scroll`
- `oled-scroll`
- `solarized-dark-scroll`
- `solarized-light-scroll`

### Monaco Editor Theme

Each theme package in this collection comes with a pre-configured theme for the Monaco editor.

Just leave `theme` under `codeEditor` commented out in your `settings.js` and then restart Node-RED.

```js
editorTheme: {
    theme: <theme-name>,
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

## Like my work?

If you like my work please give it a GitHub ⭐️.

Also, consider supporting me with a coffee ☕.

<a href="https://www.buymeacoffee.com/mbonani" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" height="60px"></a>

[license]: LICENSE
[node-red-contrib-themes]: https://github.com/node-red-contrib-themes
[node-red-doc]: https://nodered.org/docs/user-guide/runtime/configuration#editor-themes
[node-red]: https://nodered.org/
