#!/usr/bin/env node
const { log, error } = require('console')
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs')
const watch = require('chokidar').watch
const { exec } = require('child_process')
const { minify } = require('csso')
const nodemon = require('nodemon')

if (!options.themeName) {
    showUsageAndExit(1)
}

const rootDir = path.resolve(path.join(__dirname, '..'))
const themeName = options.themeName
const themeSourceDir = path.join(rootDir, 'src/themes', themeName)
const themeDir = path.join(rootDir, 'themes', themeName)
const buildIn = path.join(themeSourceDir, 'theme.scss')
const buildOut = path.join(themeDir, `${themeName}.min.css`)
const buildSrc = path.join(rootDir, 'node-red')

if (options.themeName && !existsSync(themeSourceDir)) {
    error(`Theme path is not valid. Could not find '${themeSourceDir}'`)
    log('')
    log('Please create the theme first')
    log('')
    log('Example:')
    log(`npm run create-theme ${themeName}`)
    process.exit(2)
}

if(!existsSync(themeDir)) {
    mkdirSync(themeDir, { recursive: true })
}

watch([path.join(themeSourceDir, 'theme.scss')])
    .on('add', () => { buildTheme() })
    .on('change', () => { buildTheme() })

watch([path.join(themeSourceDir, 'theme-custom.css')])
    .on('add', () => { buildCustomTheme() })
    .on('change', () => { buildCustomTheme() })

watch([path.join(themeSourceDir, 'theme-mermaid.json')])
    .on('add', () => { buildThememermaidOptions() })
    .on('change', () => { buildThememermaidOptions() })

watch([path.join(themeSourceDir, 'theme-monaco.json')])
    .on('add', () => { buildThememonacoOptions() })
    .on('change', () => { buildThememonacoOptions() })

nodemon({
    exec: `${rootDir}/node-red/packages/node_modules/node-red/red.js --port 41880 --userDir ${rootDir}/.node-red --define credentialSecret=false --define editorTheme.projects.enabled=true --define editorTheme.theme=${options.themeName} theme-dev-project`,
    ext: 'js,json,css',
    watch: ['themes/'],
    restartable: false
})

function buildTheme() {
    exec(`node ${rootDir}/lib/build-theme.js --in=${buildIn} --out=${buildOut} --src=${buildSrc}`)
}

function buildCustomTheme() {
    const themeCustomCss = readFileSync(path.join(themeSourceDir, 'theme-custom.css'), 'utf-8')
    const minifiedCss = minify(themeCustomCss).css

    writeFileSync(path.join(themeDir, `${themeName}-custom.min.css`), minifiedCss)
}

function buildThememermaidOptions() {
    const mermaidOptions = JSON.parse(readFileSync(path.join(themeSourceDir, 'theme-mermaid.json'), 'utf-8'))
    const minifiedMermaidOptions = JSON.stringify(mermaidOptions)

    writeFileSync(path.join(themeDir, `${themeName}-mermaid.min.json`), minifiedMermaidOptions)
}

function buildThememonacoOptions() {
    const monacoOptions = JSON.parse(readFileSync(path.join(themeSourceDir, 'theme-monaco.json'), 'utf-8'))
    const minifiedMonacoOptions = JSON.stringify(monacoOptions)

    writeFileSync(path.join(themeDir, `${themeName}-monaco.min.json`), minifiedMonacoOptions)
}

function showUsageAndExit(exitCode) {
    log('')
    log('Usage: npm run dev theme-name')
    process.exit(exitCode)
}
