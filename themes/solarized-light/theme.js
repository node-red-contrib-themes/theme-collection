module.exports = function (RED) {
    RED.plugins.registerPlugin("solarized-light", {
        type: "node-red-theme",
        css: [
            "themes/solarized-light/theme.min.css"
        ],
        monacoOptions: {
            theme: "solarized-light"
        }
    })

    RED.plugins.registerPlugin("solarized-light-scroll", {
        type: "node-red-theme",
        css: [
            "themes/solarized-light/theme.min.css",
            "common/scrollbars.min.css"
        ],
        monacoOptions: {
            theme: "solarized-light"
        }
    })
}