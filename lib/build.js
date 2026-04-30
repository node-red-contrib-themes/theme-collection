;(async () => {
    const { log } = require('node:console')
    const path = require('node:path')
    const fs = require('node:fs')
    const { styleText } = require('node:util')
    const ora = (await import('ora')).default
    const buildTheme = require('./build-theme')
    const rootDir = path.resolve(path.join(__dirname, '..'))
    const themes = fs.readdirSync(path.join(rootDir, 'src/themes'))

    log(styleText('yellow', 'Building themes'))
    for (const themeName of themes) {
        const spinner = ora().start(themeName)

        try {
            await buildTheme(themeName)
            spinner.succeed(themeName)
        } catch (err) {
            spinner.fail(err.toString())
            log('')
            log('Aborting')
            process.exit(1)
        }
    }
})()
