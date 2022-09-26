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

1. Create the new theme directory structure

        npm run create-theme <theme-name>

2. Start the development environment

        npm run dev <theme-name>

3. Access Node-RED at [`http://localhost:41880`](http://localhost:41880)

4. Update the colors in `themes/<theme-name>/<theme-name>.scss` as required & save

5. Update `themes/<theme-name>/<theme-name>-monaco.json` to customize the colors of the Monaco Editor. For details on the `monacoOptions` configuration, please refer to the [Node-RED documentation][theming-the-monaco-editor].

6. ***OPTIONAL*** - If additional customizations are needed, add them to `themes/<theme-name>/<theme-name>-custom.css`.

7. Refresh Node-RED in the browser to preview the changes

8. Repeat steps 4 to 7 as needed. When finished, press `ctrl-D` to quit the development environment.

9. Commit, push, and create a pull request.

***NOTE:** Replace `<theme-name>` with the name of the theme you are working on.*

## Updating an existing theme

Follow the process above, skipping step 1.

Thanks for taking the time to contribute! 😍

[fork]: https://github.com/node-red-contrib-themes/theme-collection/fork
[theming-the-monaco-editor]: https://nodered.org/docs/api/ui/themes/#theming-the-monaco-editor
