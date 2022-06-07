module.exports = function (RED) {
    RED.plugins.registerPlugin("solarized-dark", {
        type: "node-red-theme",
        css: [
            "themes/solarized-dark/theme.min.css"
        ],
        monacoOptions: {
            theme: "solarized-dark"
        }
    })

    RED.plugins.registerPlugin("solarized-dark-scroll", {
        type: "node-red-theme",
        css: [
            "themes/solarized-dark/theme.min.css",
            "common/scrollbars.min.css"
        ],
        monacoOptions: {
            theme: "solarized-dark"
        }
    })
}