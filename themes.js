const path = require('node:path')
const fs = require('node:fs')
const pkg = require('./package.json')
const rootDir = path.resolve(__dirname)

module.exports = (RED) => {
    const themes = fs.readdirSync(`${rootDir}/themes`)

    for (const themeName of themes) {
        const themePath = `themes/${themeName}`

        RED.plugins.registerPlugin(themeName, {
            type: 'node-red-theme',
            css: [`${themePath}/${themeName}.min.css`],
            mermaid: {
                theme: require(`./${themePath}/${themeName}-mermaid.min.json`)
            },
            monacoOptions: {
                theme: require(`./${themePath}/${themeName}-monaco.min.json`)
            }
        })
    }

    RED.log.info(`Node-RED Contrib Theme Collection version: v${pkg.version}`)
}
