;(async () => {
    const { log, error } = require('console')
    const commandLineArgs = require('command-line-args')
    const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
    const path = require('path')
    const fs = require('fs')
    const buildTheme = require('./build-theme')
    const { watch } = require('chokidar')
    const nodemon = require('nodemon')

    if (!options.themeName) {
        log('')
        error('Missing argument: theme-name')
        showUsageAndExit(1)
    }

    const themeName = options.themeName
    const rootDir = path.resolve(path.join(__dirname, '..'))
    const themeSourceDir = path.join(rootDir, 'src/themes', themeName)
    const sass = path.join(themeSourceDir, 'theme.scss')
    const customCSS = path.join(themeSourceDir, 'theme-custom.css')
    const mermaidTheme = path.join(themeSourceDir, 'theme-mermaid.json')
    const monacoTheme = path.join(themeSourceDir, 'theme-monaco.json')
    const commonCss = path.join(rootDir, 'src/common/common.css')

    if (!fs.existsSync(themeSourceDir)) {
        error(`Theme path is not valid. Could not find '${themeSourceDir}'`)
        log('')
        log('Please create the theme first')
        log('')
        log('Example:')
        log(`npm run create-theme ${themeName}`)
        process.exit(2)
    }

    await buildTheme(themeName)

    watch([sass, customCSS, mermaidTheme, monacoTheme, commonCss]).on('change', () => {
        buildTheme(themeName)
    })

    nodemon({
        exec: `${rootDir}/node-red/packages/node_modules/node-red/red.js --port 41880 --userDir .node-red --define credentialSecret=false --define editorTheme.projects.enabled=true --define editorTheme.theme=${themeName} theme-dev-project`,
        ext: 'min.css,min.json',
        watch: [`themes/${themeName}/`],
        restartable: false
    })

    function showUsageAndExit(exitCode) {
        log('')
        log('Usage: npm run dev theme-name')
        process.exit(exitCode)
    }
})()
