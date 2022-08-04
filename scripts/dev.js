#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const { existsSync } = require('fs')
const nodemon = require('nodemon')

if (!options.themeName) {
    nodemon({
        exec: `node-red/packages/node_modules/node-red/red.js --port 41880 --userDir .node-red`,
        ext: 'js,json,css',
        watch: [
            "common/",
            "themes/"
        ],
    })
} else {
    const themeDir = path.join('themes', String(options.themeName.split("-scroll", 1)))
    if (!existsSync(themeDir)) {
        console.warn('')
        console.warn(`Theme path is not valid. Could not find '${themeDir}'`)
        console.warn('Please create and build the theme first')
        console.warn('')
        console.warn('Example:')
        console.warn(`npm run create-theme ${options.themeName}`)
        console.warn(`npm run build-theme ${options.themeName}`)
        process.exit(2)
    }

    nodemon({
        exec: `node-red/packages/node_modules/node-red/red.js --port 41880 --userDir .node-red --define editorTheme.theme=${options.themeName}`,
        ext: 'js,json,css',
        watch: [
            "common/",
            "themes/"
        ],
    })
}