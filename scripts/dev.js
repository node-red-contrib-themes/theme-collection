#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const { existsSync } = require('fs')
const nodemon = require('nodemon')
const themeName = String(options.themeName.split('-scroll', 1))
const themePath = options.themeName ? path.join('themes', themeName) : ''

if (!options.themeName) {
    showUsageAndExit(1)
}

if (options.themeName && !existsSync(themePath)) {
    console.warn('')
    console.warn(`Theme path is not valid. Could not find '${themePath}'`)
    console.warn('Please create and build the theme first')
    console.warn('')
    console.warn('Example:')
    console.warn(`npm run create-theme ${themeName}`)
    console.warn(`npm run build-theme ${themeName}`)
    process.exit(2)
}

nodemon({
    exec: `node-red/packages/node_modules/node-red/red.js --port 41880 --userDir .node-red --define credentialSecret=false --define editorTheme.projects.enabled=true --define editorTheme.theme=${options.themeName} theme-dev-project`,
    ext: 'js,json,css',
    watch: [
        'common/',
        'themes/'
    ],
    restartable: false
})

function showUsageAndExit(exitCode) {
    console.log('')
    console.log('Usage: dev theme-name')
    console.log('Example: npm run dev theme-name')
    console.log('Example: node ./scripts/dev.js theme-name')
    process.exit(exitCode)
}