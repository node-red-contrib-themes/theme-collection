;(async () => {
    const { log, error } = require('node:console')
    const { promisify } = require('node:util')
    const exec = promisify(require('node:child_process').exec)
    const process = require('node:process')
    const fs = require('node:fs')
    const path = require('node:path')
    const chalk = (await import('chalk')).default
    const ora = (await import('ora')).default
    const rootDir = path.resolve(path.join(__dirname, '..'))
    const noderedDir = path.join(rootDir, 'node-red')
    const userDir = path.join(rootDir, '.node-red')
    const projectsDir = path.join(userDir, 'projects')
    const themeDevProjectDir = path.join(projectsDir, 'theme-dev-project')
    const spinner = new ora()

    if (fs.existsSync(noderedDir)) {
        fs.rmSync(noderedDir, { recursive: true, force: true })
    }

    await runner(
        'git clone --depth=1 --no-tags https://github.com/node-red/node-red.git',
        rootDir,
        'Cloning Node-RED repository'
    )

    await runner('npm install', noderedDir, 'Installing Node-RED dependencies')

    await runner('npm run build', noderedDir, 'Building Node-RED')

    if (fs.existsSync(userDir)) {
        fs.rmSync(userDir, { recursive: true, force: true })
    }

    fs.mkdirSync(projectsDir, {
        recursive: true
    })
    fs.mkdirSync(path.join(userDir, 'node_modules'), {
        recursive: true
    })

    await runner(
        'git clone --depth=1 --no-tags https://github.com/node-red-contrib-themes/theme-dev-project.git',
        projectsDir,
        'Cloning theme development project repository'
    )

    await runner(`npm install "${themeDevProjectDir}"`, userDir, 'Installing project dependencies')

    await runner('npm install ./..', userDir, 'Installing theme package')

    async function runner(cmd, workingDir, prompt) {
        try {
            spinner.start(prompt)
            const timeout = setTimeout(() => {
                spinner.suffixText = `- ${chalk.yellow('This may take a while, please be patient')}`
            }, 5000)

            await exec(cmd, { cwd: workingDir })

            spinner.suffixText = ''
            clearTimeout(timeout)
            spinner.succeed(prompt)
        } catch (err) {
            spinner.fail(prompt)
            log('')
            error(err.toString())
            log('')
            log('Aborting')
            process.exit(1)
        }
    }
})()
