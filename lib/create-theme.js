const { log, error } = require('console')
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const fs = require('fs-extra')
const themeName = options.themeName

if (!themeName) {
    error('Missing argument: theme-name')
    showUsageAndExit(1)
}

if (!/(?=^.{3,}$)(?:^[a-zA-Z0-9]+(([a-zA-Z0-9]*|-)[a-zA-Z0-9]+)+$)/.test(themeName)) {
    log('')
    error('Theme name not valid')
    log('')
    log('Rules for theme names:')
    log('')
    log(`- Must only contain alphanumeric chars ('0-9', 'a-z', 'A-Z') and dash ('-')`)
    log(`- Must not begin or end with non-alphanumeric chars`)
    log(`- Must be at least three characters long`)
    log(`- Consecutive non-alphanumeric chars are also forbidden`)
    showUsageAndExit(1)
}

const rootDir = path.resolve(path.join(__dirname, '..'))
const themeSourceDir = path.join(rootDir, 'src/themes', themeName)

if (fs.existsSync(themeSourceDir)) {
    log('')
    error(`A theme named '${themeName}' already exists`)
    log('')
    log(`If you're trying to update an existing theme, run the following command:`)
    log(`npm run dev ${themeName}`)
    process.exit(1)
}

fs.copySync(path.join(rootDir, 'src/template/'), themeSourceDir)

function showUsageAndExit(exitCode) {
    log('')
    log('Usage: npm run create-theme theme-name')
    process.exit(exitCode)
}
