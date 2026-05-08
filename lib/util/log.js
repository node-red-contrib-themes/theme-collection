const console = require('node:console')
const { styleText } = require('node:util')

function log(message) {
    console.log(message)
}

function warn(message) {
    console.warn(`${styleText('yellow', message)}`)
}

function error(message) {
    console.error(`${styleText('red', message)}`)
}

module.exports = {
    log,
    warn,
    error
}
