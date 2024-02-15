# Development

This document describes the process for creating/updating themes.

Please read and follow [our contribution guidelines][contribution-guidelines].

## Getting started

1. [Fork][fork] and clone this project

1. Enter the project directory and initialize the development environment

        cd theme-collection
        npm run init

***NOTE:** This process may take a while on some hosts, so please be patient.*

## Creating a new theme

With the development environment initialized, follow these steps to create a new theme:

1. Create the new theme following these rules:

    - Must start with a letter or number
    - Must be at least 3 characters long
    - Only letters, numbers, and - are allowed

    e.g., theme, theme-name, or 007-theme

    This creates a theme named ***example-theme***, replace it with the theme name being created.

        npm run create-theme example-theme

    The result will be following directory structure.

        themes
        └── example-theme
            ├── theme.scss
            ├── theme-custom.css
            ├── theme-mermaid.json
            └── theme-monaco.json

1. Enter the theme directory and start the development environment

        cd themes/example-theme
        npm run dev example-theme

    ***NOTE:** Replace ***example-theme*** with the name of the theme being created/updated.*

1. Access Node-RED at [http://localhost:41880](http://localhost:41880)

1. Update the colors in `theme.scss` as required

1. ***(OPTIONAL)*** If additional customizations are needed, add them to `theme-custom.css`.

1. ***(OPTIONAL)*** Update `theme-monaco.json` to customize the colors of the Monaco Editor.

    The default value is `"tomorrow-night-bright"`. Replace it with the name of one of the themes in this [list][monaco-editor-builtin-themes] or with a custom Monaco theme object (see the Node-RED documentation [file example][setting-a-custom-monaco-theme-from-a-json-file] for reference).

1. ***(OPTIONAL)*** Customize Mermaid's theme file - `theme-mermaid.json`

    The default value is `"dark"`. Replace it with the name of one of the themes in this [list](https://mermaid.js.org/config/theming.html#available-themes).

1. Refresh Node-RED in the browser to preview the changes

1. Repeat steps 4 to 8 as needed. When finished, press `ctrl-D` to quit the development environment

1. Commit, push, and create a pull request

## Updating an existing theme

Follow the process above, skipping step 1.

Thanks for taking the time to contribute! 😍

[contribution-guidelines]: .github/CONTRIBUTING.md
[fork]: https://github.com/node-red-contrib-themes/theme-collection/fork
[monaco-editor-builtin-themes]: https://github.com/node-red/node-red/tree/master/packages/node_modules/%40node-red/editor-client/src/vendor/monaco/dist/theme
[setting-a-custom-monaco-theme-from-a-json-file]: https://nodered.org/docs/api/ui/themes/#setting-a-custom-monaco-theme-from-a-json-file
