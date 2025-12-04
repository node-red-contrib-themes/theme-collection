;(async () => {
    const { log } = require('node:console')
    const path = require('node:path')
    const fs = require('node:fs')
    const chalk = (await import('chalk')).default
    const ora = (await import('ora')).default
    const buildTheme = require('./build-theme')
    const rootDir = path.resolve(path.join(__dirname, '..'))
    const themes = fs.readdirSync(path.join(rootDir, 'src/themes'))

    log(`${chalk.yellow('Building themes')}`)
    for (const themeName of themes) {
        await runner(buildTheme, `${themeName}`)
    }

    async function runner(cmd, themeName) {
        const spinner = ora().start(themeName)

        try {
            await cmd(themeName)
            spinner.succeed(themeName)
        } catch (err) {
            spinner.fail(err.toString())
            log('')
            log('Aborting')
            process.exit(1)
        }
    }
})()
