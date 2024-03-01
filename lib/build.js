#!/usr/bin/env node
const path = require('path')
const { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } = require('fs')
const { exec } = require('child_process')
const { minify } = require('csso')
const rootDir = path.resolve(path.join(__dirname, '..'))
const themesSourceDir = path.join(rootDir, 'src/themes')
const themesDir = path.join(rootDir, 'themes')
const themes = readdirSync(themesSourceDir)

for (const themeName of themes) {
    const themeSourceDir = path.join(themesSourceDir, themeName)
    const themeDir = path.join(themesDir, themeName)
    const buildIn = path.join(themeSourceDir, 'theme.scss')
    const buildOut = path.join(themeDir, `${themeName}.min.css`)
    const buildSrc = path.join(rootDir, 'node-red')
    
    if(!existsSync(themeDir)) {
        mkdirSync(themeDir, { recursive: true })
    }
    
    exec(`node ${rootDir}/lib/build-theme.js --in=${buildIn} --out=${buildOut} --src=${buildSrc}`)

    const themeCustomCss = readFileSync(path.resolve(themeSourceDir, 'theme-custom.css'), 'utf-8')
    const minifiedCss = minify(themeCustomCss).css

    writeFileSync(path.resolve(themeDir, `${themeName}-custom.min.css`), minifiedCss)

    const mermaidOptions = JSON.parse(readFileSync(path.resolve(themeSourceDir, 'theme-mermaid.json'), 'utf-8'))
    const minifiedMermaidOptions = JSON.stringify(mermaidOptions)

    writeFileSync(path.resolve(themeDir, `${themeName}-mermaid.min.json`), minifiedMermaidOptions)

    const monacoOptions = JSON.parse(readFileSync(path.resolve(themeSourceDir, 'theme-monaco.json'), 'utf-8'))
    const minifiedMonacoOptions = JSON.stringify(monacoOptions)

    writeFileSync(path.resolve(themeDir, `${themeName}-monaco.min.json`), minifiedMonacoOptions)
}
