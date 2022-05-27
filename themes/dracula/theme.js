module.exports = function (RED) {
    RED.plugins.registerPlugin("dracula", {
        type: "node-red-theme",
        css: [
            "themes/dracula/theme.min.css"
        ],
        monacoOptions: {
            theme: "dracula"
        }
    })

    RED.plugins.registerPlugin("dracula-scroll", {
        type: "node-red-theme",
        css: [
            "themes/dracula/theme.min.css",
            "common/scrollbars.min.css"
        ],
        monacoOptions: {
            theme: "dracula"
        }
    })
}