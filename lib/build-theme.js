const path = require('node:path')
const fs = require('node:fs')
const os = require('node:os')
const sass = require('sass-embedded')
const rootDir = path.resolve(path.join(__dirname, '..'))

async function buildTheme(themeName) {
    const themeSourceDir = path.join(rootDir, 'src/themes', themeName)
    const themeDir = path.join(rootDir, 'themes', themeName)

    if (!fs.existsSync(themeDir)) {
        await fs.promises.mkdir(themeDir, { recursive: true })
    }

    await buildCSS(themeName)
    await buildMermaidTheme(themeName)
    await buildMonacoTheme(themeName)

    async function buildCSS(themeName) {
        const sassDir = path.join(rootDir, 'src/sass/')
        const tmpDir = os.tmpdir()
        const workingDir = await fs.promises.mkdtemp(path.join(`${tmpDir}${path.sep}`, `${themeName}-`))

        await fs.promises.cp(sassDir, workingDir, { recursive: true })

        await fs.promises.copyFile(path.join(themeSourceDir, 'theme.scss'), path.join(workingDir, 'colors.scss'))

        const minifiedCSS = await sass.compileAsync(path.join(workingDir, 'style.scss'), {
            functions: {
                'encodeBase64($color)': async function (args) {
                    const color = args[0].toString().toLowerCase()
                    const url = `https://download.jqueryui.com/themeroller/images/ui-icons_${color}_256x240.png`
                    const jQueryAssetsDir = path.join(rootDir, 'assets/img/jquery')

                    if (!fs.existsSync(jQueryAssetsDir)) {
                        await fs.promises.mkdir(jQueryAssetsDir, { recursive: true })
                    }

                    const jQueryAssetFile = path.join(jQueryAssetsDir, url.split('/').pop())

                    if (!fs.existsSync(jQueryAssetFile)) {
                        const res = await fetch(url)
                        const buffer = Buffer.from(await res.arrayBuffer(), 'binary')

                        await fs.promises.writeFile(jQueryAssetFile, buffer)
                    }

                    const jQueryAsset = await fs.promises.readFile(jQueryAssetFile)
                    const base64 = jQueryAsset.toString('base64')

                    return new sass.SassString(`data:image/png;base64,${base64}`)
                }
            },
            style: 'compressed'
        })

        const nrVersion = require(path.join(rootDir, 'node-red/package.json')).version
        const now = new Date().toISOString()
        const header = `/*\n* Theme '${themeName}' generated with Node-RED ${nrVersion} on ${now}\n*/`
        const output = ''.concat(header, '\n', minifiedCSS.css)

        await fs.promises.writeFile(path.join(themeDir, `${themeName}.min.css`), output)

        await fs.promises.rm(workingDir, { recursive: true })
    }

    async function buildMermaidTheme(themeName) {
        const mermaidThemeFile = path.join(themeSourceDir, 'theme-mermaid.json')
        const mermaidTheme = JSON.parse(await fs.promises.readFile(mermaidThemeFile, 'utf-8'))
        const mermaidThemeMinified = JSON.stringify(mermaidTheme)

        await fs.promises.writeFile(path.join(themeDir, `${themeName}-mermaid.min.json`), mermaidThemeMinified)
    }

    async function buildMonacoTheme(themeName) {
        const monacoThemeFile = path.join(themeSourceDir, 'theme-monaco.json')
        const monacoTheme = JSON.parse(await fs.promises.readFile(monacoThemeFile, 'utf-8'))

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
            'inputOption.activeBorder',
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

        if (typeof monacoTheme === 'object') {
            for (const entry of Object.entries(monacoTheme.colors)) {
                const [key, value] = entry
                if (!monacoExposedColors.includes(key) || value === null) {
                    delete monacoTheme.colors[key]
                }
            }
        }

        const monacoThemeMinified = JSON.stringify(monacoTheme)

        await fs.promises.writeFile(path.join(themeDir, `${themeName}-monaco.min.json`), monacoThemeMinified)
    }
}

module.exports = buildTheme
