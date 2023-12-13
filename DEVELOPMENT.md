# Development

This document describes the process for creating/updating themes.

## Getting started

1. [Fork][fork] and clone this project
1. Enter the project directory and initialize the development environment

        cd theme-collection
        npm run init

***NOTE:** This process may take a while on some hosts, so please be patient.*

## Creating a new theme

With the development environment initialized, follow these steps to create a new theme:

***NOTE:** Replace `<theme-name>` with the name of the theme you are working on.*

1. Create the new theme directory structure

        npm run create-theme <theme-name>

2. Start the development environment

        npm run dev <theme-name>

3. Access Node-RED at [`http://localhost:41880`](http://localhost:41880)

4. Update the colors in `themes/<theme-name>/<theme-name>.scss` as required & save

5. ***(OPTIONAL)*** If additional customizations are needed, add them to `themes/<theme-name>/<theme-name>-custom.css`.

6. ***(OPTIONAL)*** Update `themes/<theme-name>/<theme-name>-monaco.json` to customize the colors of the Monaco Editor. This file can be configured in two different ways:

   - Built-in theme - Add `"<monaco-theme-name>"` to the file. Replace `"<monaco-theme-name>"` with the name of one of the themes in this [list][monaco-editor-builtin-themes].
   - Custom Monaco theme object - See the [`my-custom-theme-monaco-theme.json` file example][setting-a-custom-monaco-theme-from-a-json-file] in the Node-RED documentation for reference.

7. ***(OPTIONAL)*** Customize Mermaid's theme by adding `"<mermaid-theme-name>"` to `themes/<theme-name>/<theme-name>-mermaid.json`. Replace `<mermaid-theme-name>` with the name of one of the themes in this [list](https://mermaid.js.org/config/theming.html#available-themes). If the file doesn't exist, the value `"dark"` is used by default.

8. Refresh Node-RED in the browser to preview the changes

9. Repeat steps 4 to 7 as needed. When finished, press `ctrl-D` to quit the development environment.

10. Commit, push, and create a pull request.

## Updating an existing theme

Follow the process above, skipping step 1.

Thanks for taking the time to contribute! 😍

[fork]: https://github.com/node-red-contrib-themes/theme-collection/fork
[monaco-editor-builtin-themes]: https://github.com/node-red/node-red/tree/master/packages/node_modules/%40node-red/editor-client/src/vendor/monaco/dist/theme
[setting-a-custom-monaco-theme-from-a-json-file]: https://nodered.org/docs/api/ui/themes/#setting-a-custom-monaco-theme-from-a-json-file
