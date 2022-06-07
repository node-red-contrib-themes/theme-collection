module.exports = function (RED) {
    RED.plugins.registerPlugin("midnight-red", {
        type: "node-red-theme",
        css: [
            "themes/midnight-red/theme.min.css"
        ],
        monacoOptions: {
            theme: "tomorrow-night-bright"
        }
    })

    RED.plugins.registerPlugin("midnight-red-scroll", {
        type: "node-red-theme",
        css: [
            "themes/midnight-red/theme.min.css",
            "common/scrollbars.min.css"
        ],
        monacoOptions: {
            theme: "tomorrow-night-bright"
        }
    })
}