#!/usr/bin/env node
(async () => {
    const { log, error } = require('console')
    const { exec } = require('child_process')
    const { promisify } = require('util')
    const execPromised = promisify(exec)
    const { existsSync, mkdir } = require('fs')
    const path = require('path')
    const rootDir = path.join(__dirname, '..')
    const noderedDir = path.join(rootDir, 'node-red')
    const userDir = path.join(rootDir, '.node-red')

    await execPromised(`npm install`, { cwd: rootDir }).then(result => {
        log(' Install devDependencies ✔')
        return result
    }).catch(err => {
        throw err
    })

    if (!existsSync(path.join(userDir, 'node_modules'))) {
        if (!existsSync(userDir)) {
            await makeDir(userDir, ' Create userDir ✔')
        }
        await makeDir(path.join(userDir, 'node_modules'), ' Create userDir/node_modules ✔')
    }

    const Ora = (await import('ora')).default
    const spinner = new Ora()
    spinner.color = 'yellow'
    spinner.indent = 1

    if (!existsSync(noderedDir)) {
        await step('git clone git@github.com:node-red/node-red.git', rootDir, 'Clone Node-RED repository')
    } else {
        await step('git pull', noderedDir, 'Update local repository')
    }

    await step(`npm install`, noderedDir, 'Install Node-RED dependencies - This process may take a while on some hosts, so please be patient')

    await step(`npm run build`, noderedDir, 'Build Node-RED - This process may take a while on some hosts, so please be patient')

    await step(`npm link ./..`, userDir, 'Link theme package')

    async function step(command, workingDir, stepPrompt) {
        try {
            await runner(
                command,
                { cwd: workingDir },
                stepPrompt
            )
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
        mkdir(dir, (err) => {
            if (err) {
                error(err.toString())
                error('Aborting')
                process.exit(1)
            }
        })
    }

})()