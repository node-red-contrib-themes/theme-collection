const fs = require('fs')
const path = require('path')

module.exports = function (RED) {
    const themesPath = path.join(__dirname, 'themes/')
    const files = fs.readdirSync(themesPath)
    files.forEach(themeName => {
        const type = {
            type: "node-red-theme"
        }
        const css = {
            css: [
                "themes/" + themeName + "/" + themeName + ".min.css",
                "common/nr-dashboard.min.css"
            ],
        }
        const cssScroll = {
            css: [
                "themes/" + themeName + "/" + themeName + ".min.css",
                "common/nr-dashboard.min.css",
                "common/scrollbars.min.css"
            ],
        }

        function monacoOptions() {
            const file = './themes/' + themeName + '/' + themeName + '.json'
            if (fs.existsSync(path.join(__dirname, file))) {
                const themeOptions = require(file)
                return themeOptions
            }
        }

        RED.plugins.registerPlugin(themeName, Object.assign({}, type, css, monacoOptions()))

        RED.plugins.registerPlugin(themeName + "-scroll", Object.assign({}, type, cssScroll, monacoOptions()))

    })
}