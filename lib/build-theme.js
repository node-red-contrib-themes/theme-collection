const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const sass = require('sass')
const { minify } = require('csso')
const rootDir = path.resolve(path.join(__dirname, '..'))

async function buildTheme(themeName) {
    const themeSourceDir = path.join(rootDir, 'src/themes', themeName)
    const themeDir = path.join(rootDir, 'themes', themeName)

    if (!fs.existsSync(themeDir)) {
        fs.mkdirSync(themeDir, { recursive: true })
    }

    await buildCSS(themeName)
    await buildMermaidTheme(themeName)
    await buildMonacoTheme(themeName)

    async function buildCSS(themeName) {
        const sassDir = path.join(rootDir, 'node-red/packages/node_modules/@node-red/editor-client/src/sass/')
        const tmpDir = os.tmpdir()
        const workingDir = fs.mkdtempSync(path.join(`${tmpDir}${path.sep}`, `${themeName}-`))

        fs.copySync(sassDir, workingDir)

        fs.copyFileSync(path.join(themeSourceDir, 'theme.scss'), path.join(workingDir, 'colors.scss'))

        const compiledSass = sass.compile(path.join(workingDir, 'style-custom-theme.scss')).css
        const commonCSS = fs.readFileSync(path.join(rootDir, 'src/common/common.css'), 'utf-8')
        const themeCustomCSS = fs.readFileSync(path.join(themeSourceDir, 'theme-custom.css'), 'utf-8')
        const result = ''.concat(compiledSass, commonCSS, themeCustomCSS)
        const minifiedCSS = minify(result).css
        const nrVersion = require(path.join(rootDir, 'node-red/package.json')).version
        const now = new Date().toISOString()
        const header = `/*\n* Theme '${themeName}' generated with Node-RED ${nrVersion} on ${now}\n*/`
        const output = ''.concat(header, '\n', minifiedCSS)

        fs.writeFileSync(path.join(themeDir, `${themeName}.min.css`), output)

        fs.removeSync(workingDir)
    }

    async function buildMermaidTheme(themeName) {
        const mermaidThemeFile = path.join(themeSourceDir, 'theme-mermaid.json')
        const mermaidTheme = JSON.parse(fs.readFileSync(mermaidThemeFile, 'utf-8'))
        const mermaidThemeMinified = JSON.stringify(mermaidTheme)

        fs.writeFileSync(path.join(themeDir, `${themeName}-mermaid.min.json`), mermaidThemeMinified)
    }

    async function buildMonacoTheme(themeName) {
        const monacoThemeFile = path.join(themeSourceDir, 'theme-monaco.json')
        const monacoTheme = JSON.parse(fs.readFileSync(monacoThemeFile, 'utf-8'))

        // TODO: Update this before release
        // Source: https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors
        const monacoExposedColors = [
            'badge.background',
            'badge.foreground',
            'button.background',
            'button.foreground',
            'button.hoverBackground',
            'contrastActiveBorder',
            'contrastBorder',
            'descriptionForeground',
            'diffEditor.insertedTextBackground',
            'diffEditor.insertedTextBorder',
            'diffEditor.removedTextBackground',
            'diffEditor.removedTextBorder',
            'dropdown.background',
            'dropdown.border',
            'dropdown.foreground',
            'editor.background',
            'editor.findMatchBackground',
            'editor.findMatchHighlightBackground',
            'editor.findRangeHighlightBackground',
            'editor.foreground',
            'editor.hoverHighlightBackground',
            'editor.inactiveSelectionBackground',
            'editor.lineHighlightBackground',
            'editor.lineHighlightBorder',
            'editor.rangeHighlightBackground',
            'editor.selectionBackground',
            'editor.selectionForeground',
            'editor.selectionHighlightBackground',
            'editor.wordHighlightBackground',
            'editor.wordHighlightStrongBackground',
            'editorBracketMatch.background',
            'editorBracketMatch.border',
            'editorCodeLens.foreground',
            'editorCursor.foreground',
            'editorError.border',
            'editorError.foreground',
            'editorGutter.background',
            'editorHoverWidget.background',
            'editorHoverWidget.border',
            'editorIndentGuide.background',
            'editorInlayHint.background',
            'editorInlayHint.foreground',
            'editorLineNumber.activeForeground',
            'editorLineNumber.foreground',
            'editorLink.activeForeground',
            'editorMarkerNavigation.background',
            'editorMarkerNavigationError.background',
            'editorMarkerNavigationWarning.background',
            'editorOverviewRuler.border',
            'editorOverviewRuler.commonContentForeground',
            'editorOverviewRuler.currentContentForeground',
            'editorOverviewRuler.incomingContentForeground',
            'editorRuler.foreground',
            'editorSuggestWidget.background',
            'editorSuggestWidget.border',
            'editorSuggestWidget.foreground',
            'editorSuggestWidget.highlightForeground',
            'editorSuggestWidget.selectedBackground',
            'editorWarning.border',
            'editorWarning.foreground',
            'editorWhitespace.foreground',
            'editorWidget.background',
            'editorWidget.border',
            'errorForeground',
            'focusBorder',
            'foreground',
            'input.background',
            'input.border',
            'input.foreground',
            'input.placeholderForeground',
            'inputoptions.activeBorder',
            'inputValidation.errorBackground',
            'inputValidation.errorBorder',
            'inputValidation.infoBackground',
            'inputValidation.infoBorder',
            'inputValidation.warningBackground',
            'inputValidation.warningBorder',
            'list.activeSelectionBackground',
            'list.activeSelectionForeground',
            'list.dropBackground',
            'list.focusBackground',
            'list.focusForeground',
            'list.highlightForeground',
            'list.hoverBackground',
            'list.hoverForeground',
            'list.inactiveSelectionBackground',
            'list.inactiveSelectionForeground',
            'peekView.border',
            'peekViewEditor.background',
            'peekViewEditor.matchHighlightBackground',
            'peekViewEditorGutter.background',
            'peekViewResult.background',
            'peekViewResult.fileForeground',
            'peekViewResult.lineForeground',
            'peekViewResult.matchHighlightBackground',
            'peekViewResult.selectionBackground',
            'peekViewResult.selectionForeground',
            'peekViewTitle.background',
            'peekViewTitleDescription.foreground',
            'peekViewTitleLabel.foreground',
            'pickerGroup.border',
            'pickerGroup.foreground',
            'progressBar.background',
            'scrollbar.shadow',
            'scrollbarSlider.activeBackground',
            'scrollbarSlider.background',
            'scrollbarSlider.hoverBackground',
            'selection.background',
            'textBlockQuote.background',
            'textBlockQuote.border',
            'textCodeBlock.background',
            'textLink.activeForeground',
            'textLink.foreground',
            'textPreformat.foreground',
            'textSeparator.foreground',
            'widget.shadow'
        ]

        // Remove entries that don't match the Monaco Editor's list of exposed colors
        if (typeof monacoTheme == 'object') {
            for (const entry of Object.entries(monacoTheme.colors)) {
                const [key, value] = entry;
                if (!monacoExposedColors.includes(key)) {
                    delete monacoTheme.colors[key];
                }
            }
        }

        const monacoThemeMinified = JSON.stringify(monacoTheme)

        fs.writeFileSync(path.join(themeDir, `${themeName}-monaco.min.json`), monacoThemeMinified)
    }
}

module.exports = buildTheme
