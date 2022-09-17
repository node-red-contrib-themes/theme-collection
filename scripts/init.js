#!/usr/bin/env node
(async () => {
    const { log, error } = require('console')
    const { exec } = require('child_process')
    const { promisify } = require('util')
    const execPromised = promisify(exec)
    const { existsSync, mkdir } = require('fs')
    const path = require('path')
    const rootDir = path.join(process.cwd())
    const noderedDir = path.join(rootDir, 'node-red')
    const userDir = path.join(rootDir, '.node-red')
    const projectsDir = path.join(userDir, 'projects')
    const themeDevProjectPath = path.join(projectsDir, 'theme-dev-project')

    await execPromised('npm install', { cwd: rootDir }).then(result => {
        log(' Installing dependencies ✔')
        return result
    }).catch(err => {
        throw err
    })

    if (!existsSync(path.join(userDir, 'node_modules'))) {
        await makeDir(path.join(userDir, 'node_modules'), ' Creating User directory ✔')
    }

    const Ora = (await import('ora')).default
    const spinner = new Ora()
    spinner.color = 'yellow'
    spinner.indent = 1

    if (!existsSync(noderedDir)) {
        await step('git clone git@github.com:node-red/node-red.git', rootDir, 'Cloning Node-RED repository')
    } else {
        await step('git pull', noderedDir, 'Updating Node-RED local repository')
    }

    await step('npm install', noderedDir, 'Installing Node-RED dependencies - This may take a while, please be patient')

    await step('npm run build', noderedDir, 'Building Node-RED - This may take a while, please be patient')

    if (!existsSync(projectsDir)) {
        await makeDir(projectsDir, ' Creating Projects directory ✔')
        await step('git clone git@github.com:node-red-contrib-themes/theme-dev-project.git', projectsDir, 'Cloning theme development project repository')
    } else {
        await step('git pull', themeDevProjectPath, 'Updating theme development project local repository')
    }

    await step(`npm install ${themeDevProjectPath}`, userDir, 'Installing project dependencies - This may take a while, please be patient')

    await step(`npm link ./..`, userDir, 'Linking theme package')

    async function step(command, workingDir, stepPrompt) {
        try {
            await runner(command, { cwd: workingDir }, stepPrompt)
            log(String(stepPrompt.split(" - ", 1) + ' ✔'))
        } catch (err) {
            error(err.toString())
            error(err.stderr)
            error('Aborting')
            process.exit(1)
        }
    }

    async function runner(cmd, options, prompt) {
        spinner.start(prompt)
        function complete(pass) {
            spinner.stop()
        }
        return execPromised(cmd, options).then(result => {
            complete(true)
            return result
        }).catch(err => {
            complete(false)
            throw err
        })
    }

    async function makeDir(dir, makeDirPrompt) {
        log(makeDirPrompt)
        mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                error(err.toString())
                error('Aborting')
                process.exit(1)
            }
        })
    }

})()