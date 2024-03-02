#!/usr/bin/env node
const { log, error } = require('console')
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const { copyFileSync, existsSync, mkdirSync } = require('fs')
const rootDir = path.resolve(path.join(__dirname, '..'))
const themeSourceDir = path.join(rootDir, 'src/themes', options.themeName)

if (!options.themeName) {
	error('Missing argument: theme-name')
	showUsageAndExit(1)
}

if (!/^[a-zA-Z0-9][a-zA-Z0-9\-]{2,}$/.test(options.themeName)) {
	error('Theme name does not follow the rules')
	log('')
	log('Rules for theme names:')
	log('- at least 3 characters long')
	log('- only letters, numbers, and -')
	log('- start with a letter or number')
	showUsageAndExit(1)
}

if (existsSync(themeSourceDir)) {
	error(`A theme named '${options.themeName}' already exists`)
	showUsageAndExit(1)
}

// Create theme directory
mkdirSync(themeSourceDir)

// Copy template files to theme directory
copyFileSync(path.join(rootPath, 'src/template/theme.scss'), path.join(themeSourceDir, 'theme.scss'))
copyFileSync(path.join(rootPath, 'src/template/theme-custom.css'), path.join(themeSourceDir, 'theme-custom.css'))
copyFileSync(path.join(rootPath, 'src/template/theme-mermaid.json'), path.join(themeSourceDir, 'theme-mermaid.json'))
copyFileSync(path.join(rootPath, 'src/template/theme-monaco.json'), path.join(themeSourceDir, 'theme-monaco.json'))

function showUsageAndExit(exitCode) {
	log('')
	log('Usage: npm run create-theme theme-name')
	process.exit(exitCode)
}
