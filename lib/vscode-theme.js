const { log, error } = require('node:console')
const commandLineArgs = require('command-line-args')
const fs = require('node:fs')
const path = require('node:path')
const chalk = require('chalk').default

const options = commandLineArgs([{ name: 'command', type: String, defaultOption: true }], { stopAtFirstUnknown: true })

if (!options.command) {
    error('Missing argument: command')
    showUsageAndExit(1)
} else if (!options._unknown) {
    error('Missing argument: theme-name')
    showUsageAndExit(1)
} else if (options._unknown.length > 1) {
    error('Too many arguments!')
    showUsageAndExit(1)
}

const themeName = options._unknown[0]
const rootDir = path.resolve(path.join(__dirname, '..'))
const themeSourceDir = path.join(rootDir, 'src/themes', themeName)
const vsCodeThemeFile = path.join(themeSourceDir, 'theme-vscode.json')

if (!fs.existsSync(vsCodeThemeFile)) {
    error(`VSCode theme file ${vsCodeThemeFile} doesn't exist.`)
    showUsageAndExit(1)
}

switch (options.command) {
    case 'clean':
        cleanVSCodeTheme()
        break
    case 'sort':
        sortVSCodeTheme()
        break
    case 'build':
        buildTheme()
        break
}

function cleanVSCodeTheme() {
    let vsCodeTheme = fs.readFileSync(vsCodeThemeFile, 'utf-8')
    vsCodeTheme = JSON.parse(vsCodeTheme.replace(/(?<!:)\/\//gm, '').replace(/(")(\n.*?")/gm, '$1,$2'))
    for (const [key, value] of Object.entries(vsCodeTheme.colors)) {
        if (value === null) {
            delete vsCodeTheme.colors[key]
        }
    }

    fs.writeFileSync(vsCodeThemeFile, `${JSON.stringify(vsCodeTheme, null, 4)}\n`)
}

function sortVSCodeTheme() {
    cleanVSCodeTheme()

    const vsCodeTheme = JSON.parse(fs.readFileSync(vsCodeThemeFile, 'utf-8'))

    vsCodeTheme.colors = sortObject(vsCodeTheme.colors)

    fs.writeFileSync(vsCodeThemeFile, `${JSON.stringify(vsCodeTheme, null, 4)}\n`)
}

function buildTheme() {
    sortVSCodeTheme()

    const vsCodeTheme = JSON.parse(fs.readFileSync(vsCodeThemeFile, 'utf-8'))
    const templateDir = path.join(rootDir, 'src/template/')

    vsCodeToCustomCSS()
    vsCodeToMermaid()
    vsCodeToMonaco()
    vsCodeToSCSS()

    function vsCodeToCustomCSS() {
        const themeCustomCSSFile = path.join(themeSourceDir, 'theme-custom.css')

        if (!fs.existsSync(themeCustomCSSFile)) {
            fs.copyFileSync(path.join(templateDir, 'theme-custom.css'), themeCustomCSSFile)
        }

        let themeCustomCSS = fs.readFileSync(themeCustomCSSFile, 'utf-8')

        if (vsCodeTheme.type === 'dark' || vsCodeTheme.type === 'hcDark') {
            themeCustomCSS = themeCustomCSS.replace(/\/\*\s(color-scheme: dark;)\s\*\//, '$1')
        } else if (vsCodeTheme.type === 'light' || vsCodeTheme.type === 'hcLight') {
            themeCustomCSS = themeCustomCSS.replace(/\/\*\s(color-scheme: light;)\s\*\//, '$1')
        }

        fs.writeFileSync(themeCustomCSSFile, themeCustomCSS)
    }

    function vsCodeToMermaid() {
        const themeMermaidFile = path.join(themeSourceDir, 'theme-mermaid.json')

        if (!fs.existsSync(themeMermaidFile)) {
            fs.copyFileSync(path.join(templateDir, 'theme-mermaid.json'), themeMermaidFile)
        }

        if (vsCodeTheme.type === 'light' || vsCodeTheme.type === 'hcLight') {
            let themeMermaid = fs.readFileSync(themeMermaidFile, 'utf-8')
            themeMermaid = themeMermaid.replace('dark', 'default')
            fs.writeFileSync(themeMermaidFile, themeMermaid)
        }
    }

    function vsCodeToMonaco() {
        // Adapted from https://gist.github.com/dizys/21db6ec6846e5650a8161152a8c6a8ee

        const monacoThemeFile = path.join(themeSourceDir, 'theme-monaco.json')

        const monacoThemeRule = []
        let monacoTheme = {
            inherit: false,
            base: 'vs-dark',
            colors: vsCodeTheme.colors,
            rules: monacoThemeRule,
            encodedTokensColors: []
        }
        vsCodeTheme.tokenColors.map((color) => {
            if (typeof color.scope === 'string') {
                const split = color.scope.split(',')
                if (split.length > 1) {
                    color.scope = split
                    evalAsArray()
                    return
                }
                monacoThemeRule.push(
                    Object.assign({}, color.settings, {
                        token: color.scope
                    })
                )
                return
            }
            evalAsArray()
            function evalAsArray() {
                color.scope.map((scope) => {
                    monacoThemeRule.push(
                        Object.assign({}, color.settings, {
                            token: scope
                        })
                    )
                })
            }
        })

        monacoTheme = sortObject(monacoTheme)
        monacoTheme.colors = sortObject(monacoTheme.colors)

        fs.writeFileSync(monacoThemeFile, `${JSON.stringify(monacoTheme, null, 4)}\n`)
    }

    function vsCodeToSCSS() {
        const themeScssFile = path.join(themeSourceDir, 'theme.scss')

        if (!fs.existsSync(themeScssFile)) {
            fs.copyFileSync(path.join(templateDir, 'theme.scss'), themeScssFile)
        }

        let scss = fs.readFileSync(themeScssFile, 'utf-8')

        const colorMap = {
            'primary-background': ['sideBar.background'],
            'secondary-background': ['editor.background'],
            'secondary-background-selected': ['list.inactiveSelectionBackground'],
            'secondary-background-inactive': ['sideBar.background'],
            'secondary-background-hover': ['list.hoverBackground'],
            'secondary-background-disabled': ['sideBar.background'],
            'tertiary-background': ['editorWidget.background'],
            'primary-text-color': ['foreground'],
            'secondary-text-color': ['icon.foreground'],
            'secondary-text-color-focus': ['list.hoverForeground', 'foreground'],
            'secondary-text-color-hover': ['list.hoverForeground', 'foreground'],
            'secondary-text-color-active': ['list.hoverForeground', 'foreground'],
            'secondary-text-color-selected': ['list.hoverForeground', 'foreground'],
            'secondary-text-color-inactive': ['tab.inactiveForeground'],
            'secondary-text-color-disabled': ['disabledForeground'],
            'tertiary-text-color': ['breadcrumb.foreground'],
            'header-text-color': ['foreground'],
            'text-color-error': ['debugConsole.errorForeground'],
            'text-color-warning': ['debugConsole.warningForeground'],
            'text-color-success': ['terminal.ansiGreen'],
            'text-color-code': ['textPreformat.foreground'],
            'text-color-link': ['textLink.foreground'],
            'primary-border-color': ['sideBar.border', 'statusBar.border', 'editorRuler.foreground'],
            'form-placeholder-color': ['input.placeholderForeground'],
            'form-input-focus-color': ['inputOption.activeBorder'],
            'form-input-border-selected-color': ['tab.activeBorderTop', 'tab.activeBorder'],
            'form-input-border-error-color': ['inputValidation.errorBorder'],
            'text-editor-gutter-color': ['editorLineNumber.foreground'],
            'text-editor-active-line-background': ['editor.lineHighlightBackground'],
            'text-editor-selection-background': ['editor.selectionHighlightBackground'],
            'diff-state-added': ['gitDecoration.addedResourceForeground'],
            'diff-state-deleted': ['gitDecoration.deletedResourceForeground'],
            'diff-state-changed': ['gitDecoration.modifiedResourceForeground'],
            'diff-state-conflict': ['gitDecoration.conflictingResourceForeground'],
            'diff-state-conflict-background': ['mergeEditor.conflictingLines.background'],
            'diff-state-added-background': ['diffEditor.insertedLineBackground'],
            'diff-state-added-header-background': [
                'diffEditorGutter.insertedLineBackground',
                'diffEditor.insertedLineBackground'
            ],
            'diff-state-deleted-background': ['diffEditor.removedLineBackground'],
            'diff-state-deleted-header-background': [
                'diffEditorGutter.removedLineBackground',
                'diffEditor.removedLineBackground'
            ],
            'debug-message-text-color-meta': ['debugTokenExpression.name'],
            'debug-message-text-color-object-key': [
                [
                    'support.type.property-name.json',
                    'support.type.property-name',
                    'support.type',
                    'support',
                    'source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json',
                    'source.json meta.structure.dictionary.json support.type.property-name.json',
                    'source.json support'
                ]
            ],
            'debug-message-text-color-msg-type-other': ['debugTokenExpression.boolean'],
            'debug-message-text-color-msg-type-string': ['debugTokenExpression.string'],
            'debug-message-text-color-msg-type-null': ['symbolIcon.nullForeground'],
            'debug-message-text-color-msg-type-meta': ['debugTokenExpression.type'],
            'debug-message-text-color-msg-type-number': ['debugTokenExpression.number']
        }

        for (const [colorMapKey, colorMapValue] of Object.entries(colorMap)) {
            const re = new RegExp(String.raw`(?<=\$${colorMapKey}:\s).*(?=;)`, 'm')
            let found = false

            if (typeof colorMapValue[0] === 'string') {
                for (const i of colorMapValue.values()) {
                    if (vsCodeTheme.colors[i]) {
                        const color = vsCodeTheme.colors[i]
                        scss = scss.replace(re, color)
                        found = true
                        break
                    }
                }
            } else if (typeof colorMapValue[0] === 'object') {
                for (const tokenName of colorMapValue[0]) {
                    for (const tokenColor of vsCodeTheme.tokenColors) {
                        if (typeof tokenColor.scope === 'string' && tokenColor.scope === tokenName) {
                            scss = scss.replace(re, tokenColor.settings.foreground)
                            found = true
                        } else if (typeof tokenColor.scope === 'object') {
                            if (tokenColor.scope.includes(tokenName) && tokenColor.settings.foreground) {
                                scss = scss.replace(re, tokenColor.settings.foreground)
                                found = true
                            }
                        }
                        if (found) {
                            break
                        }
                    }
                    if (found) {
                        break
                    }
                }
            }

            if (!found) {
                log(chalk.yellow(`A color value for $${colorMapKey} was not found`))
            }
        }

        fs.writeFileSync(themeScssFile, scss)
    }

    log('')
    log(`An initial version of the ${chalk.bold(themeName)} theme was created in ${chalk.bold(themeSourceDir)}`)
    log('')
    log('You can now run the development environment and adjust the theme as needed.')
    log('')
}

function sortObject(object) {
    return Object.keys(object)
        .sort()
        .reduce((obj, key) => {
            obj[key] = object[key]
            return obj
        }, {})
}

function showUsageAndExit(exitCode) {
    log('')
    log('Usage: npm run vscode:<command> <theme-name>')
    log('')
    log('Commands:')
    log('  clean - remove comments and entries with null values')
    log('  sort  - sort the VS Code theme file')
    log('  build - create a Node-RED theme from a given VS Code theme')
    log('')
    process.exit(exitCode)
}
