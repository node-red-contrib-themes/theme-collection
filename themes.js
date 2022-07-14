const { existsSync, readdirSync } = require('fs')
const path = require('path')

module.exports = function (RED) {
    const themesPath = path.join(__dirname, 'themes')
    const themes = readdirSync(themesPath)

    themes.forEach(themeName => {
        const themePath = path.join(themesPath, themeName)
        const themeRelativePath = path.join(path.basename(themesPath), themeName)

        if (readdirSync(themePath).length == 0) {
            console.warn('')
            console.warn(`Theme '${themeName}' not loaded. Empty directory`)
            console.warn('')
            return
        } else {
            const type = { type: 'node-red-theme' }
            const cssArray = []
            const css = { css: cssArray }
            const themeCSS = themeName + '.min.css'
            const themeCustomCSS = themeName + '-custom.min.css'
            const nrDashboard = 'common/nr-dashboard.min.css'
            const scrollbarsCSS = 'common/scrollbars.min.css'

            if (!existsSync(path.join(themePath, themeCSS))) {
                console.warn('')
                console.warn(`Theme '${themeName}' not loaded. CSS file is missing`)
                console.warn('')
                return
            }
            else {
                cssArray.push(path.join(themeRelativePath, themeCSS))

                if (existsSync(path.join(themePath, themeCustomCSS))) {
                    cssArray.push(path.join(themeRelativePath, themeCustomCSS))
                }

                cssArray.push(nrDashboard)

                const cssScrollArray = cssArray.slice()
                cssScrollArray.push(scrollbarsCSS)
                const cssScroll = { css: cssScrollArray }

                const monacoFile = path.join(themePath, themeName + '-monaco.json')
                const monacoOptions = existsSync(monacoFile) ? require(monacoFile) : {}

                RED.plugins.registerPlugin(themeName, Object.assign({}, type, css, monacoOptions))

                RED.plugins.registerPlugin(themeName + '-scroll', Object.assign({}, type, cssScroll, monacoOptions))

            }
        }
    })
}