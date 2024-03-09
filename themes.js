const fs = require('fs')
const package = require('./package.json')

module.exports = function (RED) {
    const themes = fs.readdirSync('./themes')

    for (const themeName of themes) {
        const themePath = `themes/${themeName}`

        RED.plugins.registerPlugin(
            themeName,
            {
                type: 'node-red-theme',
                css: [`${themePath}/${themeName}.min.css`],
                mermaid: { theme: require(`./${themePath}/${themeName}-mermaid.min.json`) },
                monacoOptions: { theme: require(`./${themePath}/${themeName}-monaco.min.json`) }
            }
        )
    }

    RED.log.info(`Node-RED Contrib Theme Collection version: v${package.version}`)

}
