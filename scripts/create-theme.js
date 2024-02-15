#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const { copyFileSync, existsSync, mkdirSync } = require('fs')
const rootPath = path.join(__dirname, '..')
const themePath = path.join(rootPath, 'themes', options.themeName)

if (!options.themeName) {
	console.error('Missing argument: theme-name')
	showUsageAndExit(1)
}

if (!/^[a-zA-Z0-9][a-zA-Z0-9\-]{2,}$/.test(options.themeName)) {
	console.error('Theme name does not follow the rules')
	console.log('')
	console.log('Rules for theme names:')
	console.log('- at least 3 characters long')
	console.log('- only letters, numbers, and -')
	console.log('- start with a letter or number')
	showUsageAndExit(1)
}

if (existsSync(themePath)) {
	console.error(`A theme named '${options.themeName}' already exists`)
	showUsageAndExit(1)
}

// Create theme directory
mkdirSync(themePath)

// Copy template files to theme directory
copyFileSync(path.join(rootPath, 'template/theme.scss'), path.join(themePath, 'theme.scss'))
copyFileSync(path.join(rootPath, 'template/theme-custom.css'), path.join(themePath, 'theme-custom.css'))
copyFileSync(path.join(rootPath, 'template/theme-mermaid.json'), path.join(themePath, 'theme-mermaid.json'))
copyFileSync(path.join(rootPath, 'template/theme-monaco.json'), path.join(themePath, 'theme-monaco.json'))

function showUsageAndExit(exitCode) {
	console.log('')
	console.log('Usage: npm run create-theme theme-name')
	process.exit(exitCode)
}