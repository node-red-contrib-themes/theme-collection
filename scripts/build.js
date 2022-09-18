#!/usr/bin/env node
const path = require('path')
const { readdirSync } = require('fs')
const { exec } = require('child_process')
const themesPath = path.join(process.cwd(), 'themes')
const themes = readdirSync(themesPath)

themes.forEach(themeName => {

    const themePath = path.join('themes', themeName)
    const buildIn = path.join(themePath, themeName + '.scss')
    const buildOut = path.join(themePath, themeName + '.min.css')
    const buildSrc = './node-red'

    exec(`node ./scripts/build-theme.js --in=${buildIn} --out=${buildOut} --src=${buildSrc}`)
})