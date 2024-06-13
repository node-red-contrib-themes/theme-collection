const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const sass = require('sass')
const { minify } = require('csso')
const { Readable } = require('stream')
const { finished } = require('stream/promises');
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
        const jQueryCss = await jQueryAssets(compiledSass)
        const themeCustomCSS = fs.readFileSync(path.join(themeSourceDir, 'theme-custom.css'), 'utf-8')
        const result = ''.concat(compiledSass, commonCSS, jQueryCss, themeCustomCSS)
        const minifiedCSS = minify(result).css
        const nrVersion = require(path.join(rootDir, 'node-red/package.json')).version
        const now = new Date().toISOString()
        const header = `/*\n* Theme '${themeName}' generated with Node-RED ${nrVersion} on ${now}\n*/`
        const output = ''.concat(header, '\n', minifiedCSS)

        fs.writeFileSync(path.join(themeDir, `${themeName}.min.css`), output)

        fs.removeSync(workingDir)

        async function jQueryAssets(compiledSass) {
            const khroma = (await import('khroma'))
            const jQueryAssetColorHover = khroma.toHex(khroma.opacify(compiledSass.match(/secondary-text-color-hover: (.*);/)[1], 1)).replace('#', '')
            const jQueryAssetColorActive = khroma.toHex(khroma.opacify(compiledSass.match(/secondary-text-color-active: (.*);/)[1], 1)).replace('#', '')
            const jQueryAssetColor = khroma.toHex(khroma.opacify(compiledSass.match(/form-text-color: (.*);/)[1], 1)).replace('#', '')
            const jQueryAssetsColors = new Set([jQueryAssetColorHover, jQueryAssetColorActive, jQueryAssetColor])
            const jQueryAssetsDir = path.join(rootDir, 'assets/img/jquery')

            if (!fs.existsSync(jQueryAssetsDir)) {
                fs.mkdirSync(jQueryAssetsDir, { recursive: true })
            }

            for (const color of jQueryAssetsColors) {
                const jQueryAssetFile = path.join(jQueryAssetsDir, `ui-icons_${color}_256x240.png`)
                if (!fs.existsSync(jQueryAssetFile)) {
                    await jQueryAssetDownload(color, jQueryAssetFile)
                }
            }

            return await jQueryAssetToBase64()

            async function jQueryAssetDownload(color, jQueryAssetFile) {
                const stream = fs.createWriteStream(jQueryAssetFile)
                const { body } = await fetch(`https://download.jqueryui.com/themeroller/images/ui-icons_${color}_256x240.png`)
                await finished(Readable.fromWeb(body).pipe(stream))
            }

            async function jQueryAssetToBase64() {
                const jQueryAssetColorHoverBase64 = fs.readFileSync(path.join(jQueryAssetsDir, `ui-icons_${jQueryAssetColorHover}_256x240.png`)).toString('base64')
                const jQueryAssetColorActiveBase64 = fs.readFileSync(path.join(jQueryAssetsDir, `ui-icons_${jQueryAssetColorActive}_256x240.png`)).toString('base64')
                const jQueryAssetColorBase64 = fs.readFileSync(path.join(jQueryAssetsDir, `ui-icons_${jQueryAssetColor}_256x240.png`)).toString('base64')
                return `.ui-state-hover .ui-icon,
                .ui-state-focus .ui-icon,
                .ui-button:hover .ui-icon,
                .ui-button:focus .ui-icon {
                    background-image: url(data:image/png;base64,${jQueryAssetColorHoverBase64});
                }

                .ui-state-active .ui-icon,
                .ui-button:active .ui-icon {
                    background-image: url(data:image/png;base64,${jQueryAssetColorActiveBase64});
                }

                .ui-button .ui-icon {
                    background-image: url(data:image/png;base64,${jQueryAssetColorBase64});
                }`
            }
        }
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
