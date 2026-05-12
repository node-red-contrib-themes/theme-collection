# Development

This document describes the process for creating/updating themes.

Please read and follow [our contribution guidelines][contribution-guidelines].

## Getting started

[Fork][fork] and clone this project.

Enter the project directory, install the project dependencies, and initialize the development environment.

```shell
cd theme-collection
npm install
npm run init
```

> [!NOTE]  
> _This process may take a while, so please be patient._

## Creating a new theme

Rules for theme names:

- It can only contain lowercase chars ('a-z'), numbers ('0-9'), and dash ('-')
- It cannot begin or end with non-alphanumeric chars
- Must be at least three characters long
- Consecutive non-alphanumeric chars are also forbidden

From within the project directory, create the new theme.

```shell
npm run new-theme example-name
```

_Replace `example-name` with the name of the theme being created._

After creating the new theme, add its name to the ["Theme list"][theme-list] section of the `README.md` file.

> [!TIP]
> If you are creating a Node-RED theme based on a VS Code theme, this can make your life easier:
>
> 1. Load the desired theme in VS Code.
> 1. Disable all VS Code extensions to avoid cluttering your theme file with unnecessary entries.
> 1. Export the theme: <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>P</kbd>/<kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>P</kbd>, then select **Developer: Generate Color Theme From Current Settings**.
> 1. Save the exported theme as `theme-vscode.json` inside the Node-RED theme folder.
> 1. Re-enable the VS Code extensions.
> 1. Run the following command:
>
> ```shell
> npm run vscode:build example-name
> ```
>
> _Replace `example-name` with the name of the theme being created._
>
> This will create an initial version of the Node-RED theme that can be updated by following the steps below.

## Updating a theme

### Start the development environment

From within the project directory, run the following command.

```shell
npm run dev example-name
```

_Replace `example-name` with the name of the theme being updated._

This will start Node-RED on port `41880`.

[http://localhost:41880](http://localhost:41880)

Click on the link above to open it in your browser.

After updating the theme files, reload (<kbd>ctrl</kbd> + <kbd>R</kbd>/<kbd>cmd</kbd> + <kbd>R</kbd>).

### Update theme colors

Update the colors in `src/themes/example-name/theme.scss` as required.

Good practices:

- Don't use transparency on the main background and border colors. It doesn't work well with the Node-RED UI; third-party nodes may also be affected.
- Don't make changes to the following areas:
  - Fonts
    - `$primary-font`
    - `$primary-font-size`
    - `$monospace-font`
  - Workspace Buttons
    - `$workspace-button`
  - Nodes
    - `$node-*`
    - `$port-*`
  - Links
    - `$link-*`
  - Deploy Button
    - `$deploy-button-*`
  - Header
    - `$header-*`

### Theme Customizations

Update `src/themes/example-name/theme-custom.css` to set the `color-scheme` property. If additional customizations are needed, add them to the end of the file.

### Monaco Editor theme

Update `src/themes/example-name/theme-monaco.json` to customize the colors of the Monaco Editor.

The default value is `"tomorrow-night-bright"`. Replace it with the name of one of the themes in this [list][monaco-editor-builtin-themes] or with a custom Monaco theme object. See [this section][setting-a-custom-monaco-theme-from-a-json-file] of the Node-RED documentation for reference.

### Mermaid theme

Update Mermaid's theme file - `src/themes/example-name/theme-mermaid.json`.

The default value is `"dark"`. Replace it with the name of one of the themes in this [list](https://mermaid.js.org/config/theming.html#available-themes).

### Publish the changes

When finished, press <kbd>ctrl</kbd> + <kbd>C</kbd> to quit the development environment.

Create a branch `new-theme/example-name`.

```shell
git checkout -b new-theme/example-name
```

Commit and push the changes.

```shell
git add .
git commit -m "Add Example Name theme"
git push
```

[contribution-guidelines]: .github/CONTRIBUTING.md
[fork]: https://github.com/node-red-contrib-themes/theme-collection/fork
[monaco-editor-builtin-themes]: https://github.com/node-red/node-red/tree/master/packages/node_modules/%40node-red/editor-client/src/vendor/monaco/dist/theme
[setting-a-custom-monaco-theme-from-a-json-file]: https://nodered.org/docs/api/ui/themes/#setting-a-custom-monaco-theme-from-a-json-file
[theme-list]: https://github.com/node-red-contrib-themes/theme-collection/blob/dev/README.md#theme-list
