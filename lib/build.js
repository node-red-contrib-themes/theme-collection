(async () => {
    const { log } = require('console')
    const path = require('path')
    const fs = require('fs')
    const chalk = (await import('chalk')).default
    const ora = (await import('ora')).default
    const buildTheme = require('./build-theme')
    const rootDir = path.resolve(path.join(__dirname, '..'))
    const themes = fs.readdirSync(path.join(rootDir, 'src/themes'))

    log(`${chalk.yellow('Building themes')}`)
    for (const themeName of themes) {

        await runner(
            buildTheme,
            `${themeName}`
        )
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
