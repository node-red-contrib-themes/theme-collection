module.exports = function (RED) {
    RED.plugins.registerPlugin("dark", {
        type: "node-red-theme",
        css: [
            "themes/dark/theme.min.css"
        ],
        monacoOptions: {
            theme: "tomorrow-night-bright"
        }
    })

    RED.plugins.registerPlugin("dark-scroll", {
        type: "node-red-theme",
        css: [
            "themes/dark/theme.min.css",
            "common/scrollbars.min.css"
        ],
        monacoOptions: {
            theme: "tomorrow-night-bright"
        }
    })
}