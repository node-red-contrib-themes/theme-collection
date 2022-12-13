#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const { copyFileSync, existsSync, mkdirSync } = require('fs')
const rootPath = path.join(__dirname, '..')
const themePath = path.join(rootPath, 'themes', options.themeName)

if (!options.themeName) {
	showUsageAndExit(1)
}

if (!/^[a-zA-Z0-9][a-zA-Z0-9\-]{2,}$/.test(options.themeName)) {
	showUsageAndExit(1)
}

if (existsSync(themePath)) {
	console.error(`A theme named '${options.themeName}' already exists`)
	showUsageAndExit(1)
}

// Create theme directory
mkdirSync(themePath)

// Copy template files to theme directory
copyFileSync(path.join(rootPath, 'template/template.scss'), path.join(themePath, options.themeName + '.scss'))
copyFileSync(path.join(rootPath, 'template/template-monaco.json'), path.join(themePath, options.themeName + '-monaco.json'))
copyFileSync(path.join(rootPath, 'template/template-custom.css'), path.join(themePath, options.themeName + '-custom.css'))

function showUsageAndExit(exitCode) {
	console.log('')
	console.log('Usage:   create-theme theme-name')
	console.log('Example: npm run create-theme theme-name')
	console.log('Example: node ./scripts/create-theme.js theme-name')
	console.log('')
	console.log('Rules for theme names:')
	console.log('- must be at least 3 characters')
	console.log('- only letters, numbers, and -')
	console.log('- start with a letter or number')
	console.log('    e.g., theme-name or 007-theme')
	process.exit(exitCode)
}