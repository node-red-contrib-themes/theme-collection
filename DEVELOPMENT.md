# Development

This document describes the process for creating/updating themes.

Please read and follow [our contribution guidelines][contribution-guidelines].

## Getting started

[Fork][fork] and clone this project.

Enter the project directory, install the project dependencies, and initialize the development environment.

    cd theme-collection
    npm install
    npm run init

_**NOTE:** This process may take a while, so please be patient._

## Creating a new theme

From within the project directory, create the new theme.

<details>
<summary>Rules for theme names</summary>

- Must only contain alphanumeric chars ('0-9', 'a-z', 'A-Z') and dash ('-')
- Must not begin or end with non-alphanumeric chars
- Must be at least three characters long
- Consecutive non-alphanumeric chars are also forbidden

</details>

    cd theme-collection
    npm run create-theme example-theme

_**NOTE:** Replace `example-theme` with the name of the theme being created._

## Changing a theme

1.  From within the project directory, start the development environment.

        cd theme-collection
        npm run dev example-theme

    _**NOTE:** Replace `example-theme` with the name of the theme being updated._

1.  Access Node-RED at [http://localhost:41880](http://localhost:41880).

1.  Update the colors in `src/themes/example-theme/theme.scss` as required.

    <details>
    <summary>Good practices</summary>

    - Don't use opacity, especially on background and border colors. It can cause issues in Node-RED and also with third-party nodes.
    - Don't make changes in the following areas:
      - Fonts `$primary-font`, `$primary-font-size`, and `$monospace-font`
      - Workspace Buttons `$workspace-button`
      - Nodes `$node-*` and `$port-*`
      - Links `$link-*`
      - Deploy Button `$deploy-button-*`
      - Header `$header-*`

    </details>

1.  _**(OPTIONAL)**_ If additional customizations are needed, add them to `src/themes/example-theme/theme-custom.css`.

1.  _**(OPTIONAL)**_ Update `src/themes/example-theme/theme-monaco.json` to customize the colors of the Monaco Editor.

    The default value is `"tomorrow-night-bright"`. Replace it with the name of one of the themes in this [list][monaco-editor-builtin-themes] or with a custom Monaco theme object. See [this section][setting-a-custom-monaco-theme-from-a-json-file] of the Node-RED documentation for reference.

1.  _**(OPTIONAL)**_ Customize Mermaid's theme file - `src/themes/example-theme/theme-mermaid.json`.

    The default value is `"dark"`. Replace it with the name of one of the themes in this [list](https://mermaid.js.org/config/theming.html#available-themes).

1.  Refresh Node-RED in the browser to preview the changes.

1.  Repeat steps 3 to 7 as needed. When finished, press `ctrl-D` to quit the development environment.

1.  Commit, push, and create a pull request.

Thanks for taking the time to contribute! 😍

[contribution-guidelines]: .github/CONTRIBUTING.md
[fork]: https://github.com/node-red-contrib-themes/theme-collection/fork
[monaco-editor-builtin-themes]: https://github.com/node-red/node-red/tree/master/packages/node_modules/%40node-red/editor-client/src/vendor/monaco/dist/theme
[setting-a-custom-monaco-theme-from-a-json-file]: https://nodered.org/docs/api/ui/themes/#setting-a-custom-monaco-theme-from-a-json-file
