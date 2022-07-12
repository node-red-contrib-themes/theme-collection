#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const path = require('path')
const { existsSync } = require('fs')
const { exec } = require('child_process')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const themeDir = path.join('themes', options.themeName)
const buildIn = path.join(themeDir, options.themeName + '.scss')
const buildOut = path.join(themeDir, options.themeName + '.min.css')
const buildSrc = './node-red'

if (!options.themeName) {
    showUsageAndExit(1)
}

if (!existsSync(themeDir)) {
    console.warn('')
    console.warn(`Theme path is not valid. Could not find '${themeDir}'`)
    console.warn('Please create the theme first')
    console.warn('')
    console.warn(`Example: npm run create-theme ${options.themeName}`)
    process.exit(2)
}

exec(`node ./scripts/build.js --in=${buildIn} --out=${buildOut} --src=${buildSrc}`)

function showUsageAndExit(exitCode) {
    console.log('')
    console.log('Usage: build-theme theme-name')
    console.log('Example: npm run build-theme theme-name')
    console.log('Example: node ./scripts/build-theme.js theme-name')
    process.exit(exitCode)
}