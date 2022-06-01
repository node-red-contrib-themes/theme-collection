const fs = require('fs')
const path = require('path')

module.exports = function (RED) {
    const srcPath = path.join(__dirname, 'themes/');
    fs.readdir(srcPath, (err, files) => {
        files.forEach(fname => {
            let themeName = fname.replace('.min.css', '')

            RED.plugins.registerPlugin(themeName, {
                type: "node-red-theme",
                css: [
                    "themes/" + themeName + ".min.css",
                    "common/nr-dashboard.min.css"
                ],
                monacoOptions: {
                    theme: themeName
                }
            })
        
            RED.plugins.registerPlugin(themeName + "-scroll", {
                type: "node-red-theme",
                css: [
                    "themes/" + themeName + ".min.css",
                    "common/nr-dashboard.min.css",
                    "common/scrollbars.min.css"
                ],
                monacoOptions: {
                    theme: themeName
                }
            })
        })
    })
}
