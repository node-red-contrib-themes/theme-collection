#!/usr/bin/env node
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([{ name: 'themeName', type: String, defaultOption: true }])
const path = require('path')
const { copyFile, existsSync, mkdirSync } = require('fs')

if (!options.themeName) {
	showUsageAndExit(1)
}

if (! /^[a-zA-Z0-9][a-zA-Z0-9\-]{2,}$/.test(options.themeName)) {
	showUsageAndExit(1)
}

const themeDir = path.join('themes/', options.themeName)

// Create theme directory
if (!existsSync(themeDir)) {
	mkdirSync(themeDir)
}
else {
	console.warn(`A theme named '${options.themeName}' already exists`)
	showUsageAndExit(1)
}

// Copy template files to theme directory
copyFile('template/template.scss', path.join(themeDir, options.themeName + '.scss'), (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
})
copyFile('template/template-monaco.json', path.join(themeDir, options.themeName + '-monaco.json'), (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
})

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