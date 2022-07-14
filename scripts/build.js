#!/usr/bin/env node

/**
 * Copyright 2022 FlowForge Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

// The original version of this script can be found at
// 
// https://github.com/flowforge/flowforge-nr-theme/blob/main/build.js
// 

// This script can be used to build custom colour-scheme css files.
//
// 1. Create a copy of packages/node_modules/@node-red/editor-client/src/sass/colors.scss
//    and change the values to the desired colours.
//
// 2. Run this script, providing the path to the custom file using the --in option
//    and the output will be written to the location specified by the --out option
//

const os = require('os')
const nopt = require('nopt')
const path = require('path')
const fs = require('fs-extra')
const sass = require('sass')
const sassDir = '/packages/node_modules/@node-red/editor-client/src/sass/'

const knownOpts = {
    help: Boolean,
    long: Boolean,
    in: [path],
    out: [path],
    src: [path]
}
const shortHands = {
    '?': ['--help']
}
nopt.invalidHandler = function (k, v, t) {}
const parsedArgs = nopt(knownOpts, shortHands, process.argv, 2)
const argSrc = process.env.npm_config_src || parsedArgs.src
const argIn = process.env.npm_config_in || parsedArgs.in
const argOut = process.env.npm_config_out || parsedArgs.out
const argLong = !!(process.env.npm_config_long || parsedArgs.long)
const ruleRegex = /(\$.*?) *: *(\S[\S\s]*?);/g
const customColors = {}
let match

console.log('')

if (parsedArgs.help) {
    showUsageAndExit(0)
}
if (!argOut) {
    console.warn('Missing variable: out')
    showUsageAndExit(1)
}
if (!argSrc) {
    console.warn('Missing variable: src')
    showUsageAndExit(1)
}
if (!fs.existsSync(argSrc)) {
    console.warn(`Node-RED directory '${argSrc}' not found`)
    showUsageAndExit(1)
}
if (!fs.existsSync(path.join(argSrc, '/package.json'))) {
    console.warn(`Node-RED path is not valid. Could not find '${path.join(argSrc, '/package.json')}'`)
    showUsageAndExit(2)
}
if (!fs.existsSync(path.join(argSrc, sassDir))) {
    console.warn(`Node-RED path is not valid. Could not find '${path.join(argSrc, sassDir)}'`)
    showUsageAndExit(3)
}

// load custom colours
if (argIn && fs.existsSync(argIn)) {
    const customColorsFile = fs.readFileSync(argIn, 'utf-8')
    while ((match = ruleRegex.exec(customColorsFile)) !== null) {
        customColors[match[1]] = match[2]
    }
}

// Load base colours
const colorsFile = fs.readFileSync(path.join(argSrc, sassDir, 'colors.scss'), 'utf-8')
const updatedColors = []

while ((match = ruleRegex.exec(colorsFile)) !== null) {
    updatedColors.push(match[1] + ': ' + (customColors[match[1]] || match[2]) + ';')
}

(async function () {
    const tmpDir = os.tmpdir()
    const workingDir = await fs.mkdtemp(`${tmpDir}${path.sep}`)
    await fs.copy(path.join(argSrc, sassDir), workingDir)
    await fs.writeFile(path.join(workingDir, 'colors.scss'), updatedColors.join('\n'))
    const result = sass.compile(path.join(workingDir, 'style-custom-theme.scss'), { outputStyle: 'expanded' })
    const css = result.css.toString()
    const lines = css.split('\n')
    const colorCSS = []
    const nonColorCSS = []

    lines.forEach(l => {
        if (/font/.test(l)) {
            nonColorCSS.push(l)
        } else {
            colorCSS.push(l)
        }
    })

    const nrPkg = require(path.join(argSrc, 'package.json'))
    const now = new Date().toISOString()

    const header = `/*
* Theme generated with Node-RED ${nrPkg.version} on ${now}
*/`

    const output = sass.compileString(colorCSS.join('\n'), { style: argLong ? 'expanded' : 'compressed' })
    if (argOut) {
        await fs.writeFile(argOut, header + '\n' + output.css)
    } else {
        console.log(header)
        console.log(output.css.toString())
    }
    await fs.remove(workingDir)
})()

function showUsageAndExit (exitCode) {
    console.log('')
    console.log('Usage:   build [-?] [--in=FILE] [--out=FILE] [--src=PATH]')
    console.log('Example: npm run build --src=../src/node-red')
    console.log('Example: node build.js --in=colors.scss --out=compiled.css --src=../src/node-red')
    console.log('')
    console.log('Options:')
    console.log('  --in         FILE  Custom colors sass file')
    console.log('  --out        FILE  Where you write the result')
    console.log('  --src        PATH  Path to src of node-red')
    console.log('  --long       Do not compress the colors.scss file')
    console.log('  -?, --help   Show this help')
    console.log('')
    process.exit(exitCode == null ? (parsedArgs.help ? 0 : 1) : exitCode)
}
