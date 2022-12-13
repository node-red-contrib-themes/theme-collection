#!/usr/bin/env node
const path = require('path')
const { readFileSync, readdirSync, writeFileSync } = require('fs')
const { exec } = require('child_process')
const { minify } = require('csso')
const themesPath = path.join(__dirname, '../themes')
const themes = readdirSync(themesPath)

themes.forEach(themeName => {

    const themePath = path.join('themes', themeName)
    const buildIn = path.join(themePath, themeName + '.scss')
    const buildOut = path.join(themePath, themeName + '.min.css')
    const buildSrc = './node-red'

    exec(`node ./scripts/build-theme.js --in=${buildIn} --out=${buildOut} --src=${buildSrc}`)

    const themeCustomCss = readFileSync(path.resolve(themePath, themeName + '-custom.css'), 'utf-8')
    const minifiedCss = minify(themeCustomCss).css

    writeFileSync(path.resolve(themePath, themeName + '-custom.min.css'), minifiedCss)

    const monacoOptions = JSON.parse(readFileSync(path.resolve(themePath, themeName + '-monaco.json'), 'utf-8'))
    const minifiedMonacoOptions = JSON.stringify(monacoOptions)

    writeFileSync(path.resolve(themePath, themeName + '-monaco.min.json'), minifiedMonacoOptions)
})