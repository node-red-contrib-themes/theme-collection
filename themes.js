const { existsSync, readdirSync, readFileSync } = require('fs')
const path = require('path')

module.exports = function (RED) {
    const themesPath = path.join(__dirname, 'themes')
    const themes = readdirSync(themesPath)

    themes.forEach(themeName => {
        const themePath = path.join(themesPath, themeName)
        const themeRelativePath = path.join(path.basename(themesPath), themeName)
        const type = { type: 'node-red-theme' }
        const cssArray = []
        const css = { css: cssArray }
        const themeCSS = themeName + '.min.css'
        const themeCustomCSS = themeName + '-custom.min.css'
        const scrollbarsCSS = 'common/scrollbars.min.css'
        const mermaidTheme = existsSync(path.join(themePath, `${themeName}-mermaid.json`)) ? JSON.parse(readFileSync(path.join(themePath, `${themeName}-mermaid.json`), 'utf-8')) : "dark"
        const mermaidOptions = { mermaid: { theme: mermaidTheme } }
        const monacoTheme = JSON.parse(readFileSync(path.join(themePath, `${themeName}-monaco.min.json`), 'utf-8'))
        const monacoOptions = { monacoOptions: { theme: monacoTheme } }

        if (readdirSync(themePath).length == 0) {
            console.warn('')
            console.warn(`Theme '${themeName}' not loaded. Empty directory`)
            console.warn('')
            return
        }

        if (!existsSync(path.join(themePath, themeCSS))) {
            console.warn('')
            console.warn(`Theme '${themeName}' not loaded. CSS file is missing`)
            console.warn('')
            return
        }

        cssArray.push(path.join(themeRelativePath, themeCSS))

        const cssScrollArray = cssArray.slice()
        cssScrollArray.push(scrollbarsCSS)
        const cssScroll = { css: cssScrollArray }

        cssArray.push(path.join(themeRelativePath, themeCustomCSS))
        cssScrollArray.push(path.join(themeRelativePath, themeCustomCSS))

        RED.plugins.registerPlugin(themeName, Object.assign({}, type, css, mermaidOptions, monacoOptions))
        RED.plugins.registerPlugin(themeName + '-scroll', Object.assign({}, type, cssScroll, mermaidOptions, monacoOptions))
    })
}