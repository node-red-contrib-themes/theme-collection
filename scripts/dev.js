#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const { existsSync, readFileSync, watch, writeFileSync } = require('fs')
const { exec } = require('child_process')
const { minify } = require('csso')
const nodemon = require('nodemon')
const themeName = String(options.themeName.split('-scroll', 1))
const rootPath = path.join(__dirname, '..')
const themePath = path.join(rootPath, 'themes', themeName)
const buildIn = path.join(themePath, themeName + '.scss')
const buildOut = path.join(themePath, themeName + '.min.css')
const buildSrc = path.join(rootPath, 'node-red')

if (!options.themeName) {
    showUsageAndExit(1)
}
if (options.themeName && !existsSync(themePath)) {
    console.warn('')
    console.warn(`Theme path is not valid. Could not find '${themePath}'`)
    console.warn('Please create the theme first')
    console.warn('')
    console.warn('Example:')
    console.warn(`npm run create-theme ${themeName}`)
    process.exit(2)
}

watch(path.join(themePath, themeName + '.scss'), () => {
    exec(`node ${rootPath}/scripts/build-theme.js --in=${buildIn} --out=${buildOut} --src=${buildSrc}`)
})

watch(path.join(themePath, themeName + '-custom.css'), () => {
    const themeCustomCss = readFileSync(path.join(themePath, themeName + '-custom.css'), 'utf-8')
    const minifiedCss = minify(themeCustomCss).css

    writeFileSync(path.join(themePath, themeName + '-custom.min.css'), minifiedCss)
})

watch(path.join(themePath, themeName + '-monaco.json'), () => {
    const monacoOptions = JSON.parse(readFileSync(path.join(themePath, themeName + '-monaco.json'), 'utf-8'))
    const minifiedMonacoOptions = JSON.stringify(monacoOptions)

    writeFileSync(path.join(themePath, themeName + '-monaco.min.json'), minifiedMonacoOptions)
})

nodemon({
    exec: `${rootPath}/node-red/packages/node_modules/node-red/red.js --port 41880 --userDir ${rootPath}/.node-red --define credentialSecret=false --define editorTheme.projects.enabled=true --define editorTheme.theme=${options.themeName} theme-dev-project`,
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