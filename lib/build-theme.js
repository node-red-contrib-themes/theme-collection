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

    await buildCss(themeName)
    await buildCustomCss(themeName)
    await buildMermaidTheme(themeName)
    await buildMonacoTheme(themeName)

    async function buildCss(themeName) {
        const sassDir = path.join(rootDir, 'node-red/packages/node_modules/@node-red/editor-client/src/sass/')
        const tmpDir = os.tmpdir()
        const workingDir = fs.mkdtempSync(path.join(`${tmpDir}${path.sep}`, `${themeName}-`))

        fs.copySync(sassDir, workingDir)

        fs.copyFileSync(path.join(themeSourceDir, 'theme.scss'), path.join(workingDir, 'colors.scss'))

        const result = sass.compile(path.join(workingDir, 'style-custom-theme.scss')).css
        const minifiedCss = minify(result).css
        const nrVersion = require(path.join(rootDir, 'node-red/package.json')).version
        const now = new Date().toISOString()
        const header = `/*\n* Theme '${themeName}' generated with Node-RED ${nrVersion} on ${now}\n*/`
        const output = ''.concat(header, '\n', minifiedCss)

        fs.writeFileSync(path.join(themeDir, `${themeName}.min.css`), output)

        fs.removeSync(workingDir)
    }

    async function buildCustomCss(themeName) {
        const themeCustomCSS = fs.readFileSync(path.join(themeSourceDir, 'theme-custom.css'), 'utf-8')
        const minifiedCustomCss = minify(themeCustomCSS).css

        fs.writeFileSync(path.join(themeDir, `${themeName}-custom.min.css`), minifiedCustomCss)
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
        const monacoThemeMinified = JSON.stringify(monacoTheme)

        fs.writeFileSync(path.join(themeDir, `${themeName}-monaco.min.json`), monacoThemeMinified)
    }
}

module.exports = buildTheme
