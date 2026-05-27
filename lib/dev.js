;(async () => {
    const { log, error } = require('./util/log')
    const commandLineArgs = require('command-line-args')
    const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
    const path = require('node:path')
    const fs = require('node:fs')
    const buildTheme = require('./build-theme')
    const { watch } = require('chokidar')
    const { spawn } = require('node:child_process')

    if (!options.themeName) {
        error('Missing argument: theme-name')
        showUsageAndExit(1)
    }

    const themeName = options.themeName
    const rootDir = path.resolve(path.join(__dirname, '..'))
    const themeSourceDir = path.join(rootDir, 'src/themes', themeName)
    const sassFile = path.join(themeSourceDir, 'theme.scss')
    const mermaidThemeFile = path.join(themeSourceDir, 'theme-mermaid.json')
    const monacoThemeFile = path.join(themeSourceDir, 'theme-monaco.json')

    if (!fs.existsSync(themeSourceDir)) {
        error(`Theme path is not valid. Could not find '${themeSourceDir}'`)
        log('')
        log('Please create the theme first')
        log('')
        log('Example:')
        log(`npm run new-theme ${themeName}`)
        process.exit(2)
    }

    await buildTheme(themeName)

    watch([sassFile, mermaidThemeFile, monacoThemeFile]).on('change', async () => {
        await buildTheme(themeName)
    })

    spawn(
        `node \
        --watch-path='${rootDir}/themes/${themeName}' \
        --watch-preserve-output \
        '${rootDir}/node-red/packages/node_modules/node-red/red.js' \
        --port 41880 \
        --userDir .node-red \
        --define credentialSecret=false \
        --define editorTheme.projects.enabled=true \
        --no-telemetry \
        --define editorTheme.theme=${themeName} \
        theme-dev-project`,
        {
            shell: true,
            stdio: 'inherit'
        }
    )

    function showUsageAndExit(exitCode) {
        log('')
        log('Usage: npm run dev theme-name')
        process.exit(exitCode)
    }
})()
