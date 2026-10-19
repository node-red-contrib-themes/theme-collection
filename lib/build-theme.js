const path = require('node:path')
const fs = require('node:fs')
const os = require('node:os')
const sass = require('sass-embedded')
const rootDir = path.resolve(path.join(__dirname, '..'))
const cleanMonacoTheme = require('./util/clean-monaco-theme')

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

        if (typeof monacoTheme === 'object') {
            monacoTheme.colors = cleanMonacoTheme(monacoTheme.colors)
        }

        const monacoThemeMinified = JSON.stringify(monacoTheme)

        await fs.promises.writeFile(path.join(themeDir, `${themeName}-monaco.min.json`), monacoThemeMinified)
    }
}

module.exports = buildTheme
